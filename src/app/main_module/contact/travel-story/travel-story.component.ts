import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  NgZone,
  PLATFORM_ID,
  ViewChild,
  HostListener
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as d3 from 'd3';

@Component({
  selector: 'app-travel-story',
  templateUrl: './travel-story.component.html',
  styleUrls: ['./travel-story.component.scss']
})
export class TravelStoryComponent implements AfterViewInit {
  @ViewChild('mapContainer', { static: true }) mapContainerRef!: ElementRef;
  private map: any;
  private svgLayer: any;
  private planeMarker: any;
  private currentPlaneLatLng: any = null;
  private isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  travelSegments = [
    { from: 'Mumbai', to: 'Pune', coords: [[19.076, 72.8777], [18.5204, 73.8567]], color: '#e53935', year: 2010 },
    { from: 'Pune', to: 'Atlanta', coords: [[18.5204, 73.8567], [33.7490, -84.3880]], color: '#8e24aa', year: 2013 },
    { from: 'Atlanta', to: 'Virginia', coords: [[33.7490, -84.3880], [37.4316, -78.6569]], color: '#3949ab', year: 2014 },
    { from: 'Virginia', to: 'Mumbai', coords: [[37.4316, -78.6569], [19.076, 72.8777]], color: '#039be5', year: 2015 },
    { from: 'Mumbai', to: 'Pune', coords: [[19.076, 72.8777], [18.5204, 73.8567]], color: '#43a047', year: 2020 },
    { from: 'Pune', to: 'New Jersey', coords: [[18.5204, 73.8567], [40.0583, -74.4057]], color: '#fdd835', year: 2022 }
  ];

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => this.initializeMapFlow(), 0);
    });
  }

  private async initializeMapFlow() {
    const { default: L } = await import('leaflet');

    // Clean up in case map was already initialized (refresh scenario)
    const mapContainer = this.mapContainerRef.nativeElement;
    mapContainer.innerHTML = '';

    this.map = L.map(mapContainer, {
      center: [20, 0],
      zoom: 3,
      zoomControl: true,
      worldCopyJump: true
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    this.map.whenReady(() => {
      setTimeout(() => this.map.invalidateSize(), 200);
    });

    this.svgLayer = L.svg();
    this.svgLayer.addTo(this.map);

    this.renderFlightPathsAndAnimate(L);
  }

  @HostListener('window:resize')
  onResize(): void {
    if (this.map) this.map.invalidateSize();
  }

  private renderFlightPathsAndAnimate(L: any): void {
    const svg = d3.select(this.map.getPanes().overlayPane).select('svg');
    const g = svg.append('g').attr('class', 'leaflet-zoom-hide');

    const planeIcon = L.icon({
      iconUrl: '../../../../assets/image/PNG/airplane.png',
      iconSize: [80, 80]
    });

    this.planeMarker = L.marker(this.travelSegments[0].coords[0], { icon: planeIcon }).addTo(this.map);

    const pathGenerator = d3.line<[number, number]>()
      .x(d => this.map.latLngToLayerPoint(d).x)
      .y(d => this.map.latLngToLayerPoint(d).y)
      .curve(d3.curveCatmullRom.alpha(0.5));

    const redrawPaths = () => {
      g.selectAll('*').remove();
      this.travelSegments.forEach(segment => {
        g.append('path')
          .datum(segment.coords)
          .attr('d', (d: any) => pathGenerator(d)!)
          .attr('stroke', segment.color)
          .attr('stroke-width', 2.5)
          .attr('stroke-dasharray', '5,5')
          .attr('fill', 'none');
      });
    };

    this.map.on('zoomend', redrawPaths);
    this.map.on('move zoom', () => {
      if (this.currentPlaneLatLng) {
        this.planeMarker.setLatLng(this.currentPlaneLatLng);
      }
    });

    redrawPaths();
    this.animatePlaneWithYearAndPins(L, g, pathGenerator);
  }
  private animatePlaneWithYearAndPins(L: any, g: any, pathGenerator: any): void {
    let segmentIndex = 0;

    const flyNextSegment = () => {
      if (segmentIndex >= this.travelSegments.length) {
        if (this.map._yearPopup) this.map.removeLayer(this.map._yearPopup);
        return;
      }

      const segment = this.travelSegments[segmentIndex];
      const [startCoords, endCoords] = segment.coords;

      // Step 1: Zoom/pan the map first before doing anything else
      const bounds = L.latLngBounds(segment.coords);
      this.map.flyToBounds(bounds.pad(0.4), {
        duration: 1.2,
        animate: true,
        easeLinearity: 0.25
      });

      const onMoveEnd = () => {
        this.map.off('moveend', onMoveEnd);

        // Step 2: Now place plane at segment start point
        const startLatLng = L.latLng(startCoords[0], startCoords[1]);
        this.currentPlaneLatLng = startLatLng;
        this.planeMarker.setLatLng(startLatLng);

        // Step 3: Draw the invisible path for animation
        const path = g.append('path')
          .datum(segment.coords)
          .attr('d', (d: any) => pathGenerator(d)!)
          .attr('stroke', 'transparent')
          .attr('fill', 'none');

        const pathEl = path.node();
        const totalLength = pathEl.getTotalLength();
        const duration = 6000;
        const startTime = Date.now();

        const animate = () => {
          const elapsed = Date.now() - startTime;
          const t = Math.min(1, d3.easeCubicInOut(elapsed / duration));
          const point = pathEl.getPointAtLength(t * totalLength);
          const latLng = this.map.layerPointToLatLng([point.x, point.y]);

          this.currentPlaneLatLng = latLng;
          this.planeMarker.setLatLng(latLng);

          if (this.map._yearPopup) this.map.removeLayer(this.map._yearPopup);
          this.map._yearPopup = L.marker(latLng, {
            icon: L.divIcon({
              className: 'year-popup-label',
              html: `<div class="leaflet-year-box">Year: ${segment.year}</div>`,
              iconSize: [80, 20],
              iconAnchor: [40, -10]
            }),
            interactive: false
          }).addTo(this.map);

          if (t < 1) {
            requestAnimationFrame(animate);
          } else {
            // Drop pin at destination
            L.marker(endCoords, {
              icon: L.divIcon({
                className: 'custom-pin',
                html: `<div class="pin-dot"></div><div class="pin-label">${segment.to}</div>`,
                iconSize: [20, 20],
                iconAnchor: [10, 10]
              })
            }).addTo(this.map);

            segmentIndex++;
            flyNextSegment();
          }
        };

        animate();
      };

      this.map.on('moveend', onMoveEnd);
    };

    flyNextSegment();
  }


}

