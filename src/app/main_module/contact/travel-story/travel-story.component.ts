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
  private currentPathEl: SVGPathElement | null = null;
  private segmentIndex: number = 0;
  private isAnimating: boolean = false;
  private isZooming: boolean = false;
  private isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  // Define travel segments
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
      // Wait until browser has completed painting
      requestAnimationFrame(() => {
        setTimeout(() => {
          this.initializeMapFlow();
        }, 200); // Slight delay to make DOM + CSS fully stable
      });
    });
  }


  private async initializeMapFlow() {
    const { default: L } = await import('leaflet');

    // Reset map container
    const mapContainer = this.mapContainerRef.nativeElement;
    mapContainer.innerHTML = '';

    // Create Leaflet map
    this.map = L.map(mapContainer, {
      center: [20, 0],
      zoom: 3,
      zoomControl: true,
      worldCopyJump: true
    });

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    // Fix tile stretching issue
    this.map.whenReady(() => {
      setTimeout(() => this.map.invalidateSize(), 200);
    });

    // Create SVG overlay layer for D3
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

    // Airplane marker icon
    const planeIcon = L.icon({
      iconUrl: '../../../../assets/image/PNG/airplane.png',
      iconSize: [80, 80]
    });

    // Create airplane marker at first location
    this.planeMarker = L.marker(this.travelSegments[0].coords[0], { icon: planeIcon }).addTo(this.map);

    // Path generator using latLngToLayerPoint
    const pathGenerator = () =>
      d3.line<[number, number]>()
        .x(d => this.map.latLngToLayerPoint(d).x)
        .y(d => this.map.latLngToLayerPoint(d).y)
        .curve(d3.curveCatmullRom.alpha(0.5));

    // Redraw all dashed paths
    const redrawPaths = () => {
      g.selectAll('*').remove();
      this.travelSegments.forEach(segment => {
        g.append('path')
          .datum(segment.coords)
          .attr('d', (d: any) => pathGenerator()(d)!)
          .attr('stroke', segment.color)
          .attr('stroke-width', 2.5)
          .attr('stroke-dasharray', '5,5')
          .attr('fill', 'none');
      });
    };

    this.map.on('zoomend', redrawPaths);

    // When user zooms/moves, plane repositions
    this.map.on('move zoom', () => {
      if (this.currentPlaneLatLng) {
        this.planeMarker.setLatLng(this.currentPlaneLatLng);
        if (this.map._yearPopup) {
          this.map._yearPopup.setLatLng(this.currentPlaneLatLng);
        }
      }

      // Recreate path if zoom during animation
      if (this.isAnimating && this.currentPathEl) {
        const segment = this.travelSegments[this.segmentIndex];
        const svg = d3.select(this.map.getPanes().overlayPane).select('svg').select('g');
        svg.selectAll('path').remove();

        const newPath = svg.append('path')
          .datum(segment.coords)
          .attr('d', (d: any) => pathGenerator()(d)!)
          .attr('stroke', 'transparent')
          .attr('fill', 'none');

        this.currentPathEl = newPath.node();
      }
    });

    // Mark zooming status
    this.map.on('zoomstart movestart', () => {
      this.isZooming = true;
    });

    this.map.on('zoomend moveend', () => {
      this.isZooming = false;
    });

    // Draw initial paths
    redrawPaths();
    // Start airplane travel animation
    this.animatePlaneWithYearAndPins(L, g, pathGenerator);
  }

  private animatePlaneWithYearAndPins(L: any, g: any, pathGenerator: any): void {
    const flyNextSegment = () => {
      if (this.segmentIndex >= this.travelSegments.length) {
        if (this.map._yearPopup) this.map.removeLayer(this.map._yearPopup);
        return;
      }

      const segment = this.travelSegments[this.segmentIndex];
      const [startCoords, endCoords] = segment.coords;

      this.isZooming = true;

      const bounds = L.latLngBounds(segment.coords);
      this.map.flyToBounds(bounds.pad(0.4), {
        duration: 1.2,
        animate: true,
        easeLinearity: 0.25
      });

      const onMoveEnd = () => {
        this.map.off('moveend', onMoveEnd);

        const startLatLng = L.latLng(startCoords[0], startCoords[1]);
        this.currentPlaneLatLng = startLatLng;
        this.planeMarker.setLatLng(startLatLng);

        const svg = d3.select(this.map.getPanes().overlayPane).select('svg').select('g');
        svg.selectAll('path').remove();

        const path = svg.append('path')
          .datum(segment.coords)
          .attr('d', (d: any) => pathGenerator()(d)!)
          .attr('stroke', 'transparent')
          .attr('fill', 'none');

        this.currentPathEl = path.node();
        const totalLength = this.currentPathEl?.getTotalLength() || 0;

        const duration = 6000;
        const startTime = Date.now();
        this.isAnimating = true;
        this.isZooming = false;

        const animate = () => {
          if (this.isZooming || !this.currentPathEl) {
            requestAnimationFrame(animate);
            return;
          }

          const elapsed = Date.now() - startTime;
          const t = Math.min(1, d3.easeCubicInOut(elapsed / duration));
          const totalLength = this.currentPathEl.getTotalLength();

          if (totalLength === 0 || isNaN(totalLength)) {
            console.warn('Invalid totalLength during animation.');
            this.isAnimating = false;
            this.segmentIndex++;
            flyNextSegment();
            return;
          }

          // const point = this.currentPathEl.getPointAtLength(t * totalLength);

          // if (!point || isNaN(point.x) || isNaN(point.y)) {
          //   console.warn('Invalid point coordinates.');
          //   this.isAnimating = false;
          //   this.segmentIndex++;
          //   flyNextSegment();
          //   return;
          // }

          // const latLng = this.map.layerPointToLatLng([point.x, point.y]);
          // if (!latLng || isNaN(latLng.lat) || isNaN(latLng.lng)) {
          //   console.warn('Invalid LatLng generated.');
          //   this.isAnimating = false;
          //   this.segmentIndex++;
          //   flyNextSegment();
          //   return;
          // }

          const lengthAtT = t * totalLength;

          if (isNaN(lengthAtT) || !this.currentPathEl) {
            console.warn('Invalid path length or path element is missing.');
            this.isAnimating = false;
            this.segmentIndex++;
            flyNextSegment();
            return;
          }

          let point: any;
          try {
            point = this.currentPathEl.getPointAtLength(lengthAtT);
          } catch (err) {
            console.warn('Error getting point at length:', err);
            this.isAnimating = false;
            this.segmentIndex++;
            flyNextSegment();
            return;
          }

          if (!point || isNaN(point.x) || isNaN(point.y)) {
            console.warn('Invalid point from getPointAtLength:', point);
            this.isAnimating = false;
            this.segmentIndex++;
            flyNextSegment();
            return;
          }

          let latLng;
          try {
            latLng = this.map.layerPointToLatLng([point.x, point.y]);
          } catch (err) {
            console.warn('Error converting to LatLng:', err);
            this.isAnimating = false;
            this.segmentIndex++;
            flyNextSegment();
            return;
          }

          if (!latLng || isNaN(latLng.lat) || isNaN(latLng.lng)) {
            console.warn('Invalid LatLng result:', latLng);
            this.isAnimating = false;
            this.segmentIndex++;
            flyNextSegment();
            return;
          }


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
            this.isAnimating = false;

            // Drop final pin at destination
            L.marker(endCoords, {
              icon: L.divIcon({
                className: 'custom-pin',
                html: `
                  <div class="pin-container">
                    <div class="pin-dot"></div>
                    <div class="pin-label">${segment.to}</div>
                  </div>
                `,
                iconSize: [80, 40],        // Give enough size for dot + label
                iconAnchor: [40, 10]        // ⭐ Anchor point: center horizontally, slightly above dot
              })
            }).addTo(this.map);

            // L.marker(endCoords, {
            //   icon: L.divIcon({
            //     className: 'custom-pin',
            //     html: `<div class="pin-dot"></div><div class="pin-label">${segment.to}</div>`,
            //     iconSize: [20, 20],
            //     iconAnchor: [10, 10]
            //   })
            // }).addTo(this.map);

            // Now zoom to next start location
            this.isZooming = true;
            const endLatLng = L.latLng(endCoords[0], endCoords[1]);
            this.map.flyTo(endLatLng, 5, { duration: 1.2, animate: true, easeLinearity: 0.25 });

            const onZoomEnd = () => {
              this.map.off('moveend', onZoomEnd);
              this.isZooming = false;
              this.segmentIndex++;
              flyNextSegment();
            };
            this.map.on('moveend', onZoomEnd);
          }
        };

        animate();
      };

      this.map.on('moveend', onMoveEnd);
    };

    flyNextSegment();
  }

}

