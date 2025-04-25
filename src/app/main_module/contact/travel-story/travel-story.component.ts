import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
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
  @ViewChild('mapContainer') mapContainerRef!: ElementRef;
  @ViewChild('yearLabel') yearLabelRef!: ElementRef;
  private map: any;
  private svgLayer: any;
  private planeMarker: any;
  private isBrowser: boolean;
  private currentPlaneLatLng: any = null; // 🌟 Add this


  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  travelSegments = [
    { from: 'Mumbai', to: 'Pune', coords: [[19.076, 72.8777], [18.5204, 73.8567]], color: '#e53935', year: 2021 },
    { from: 'Pune', to: 'Atlanta', coords: [[18.5204, 73.8567], [33.7490, -84.3880]], color: '#8e24aa', year: 2022 },
    { from: 'Atlanta', to: 'Virginia', coords: [[33.7490, -84.3880], [37.4316, -78.6569]], color: '#3949ab', year: 2023 },
    { from: 'Virginia', to: 'Mumbai', coords: [[37.4316, -78.6569], [19.076, 72.8777]], color: '#039be5', year: 2024 },
    { from: 'Mumbai', to: 'Pune', coords: [[19.076, 72.8777], [18.5204, 73.8567]], color: '#43a047', year: 2025 },
    { from: 'Pune', to: 'New Jersey', coords: [[18.5204, 73.8567], [40.0583, -74.4057]], color: '#fdd835', year: 2026 }
  ];

  async ngAfterViewInit() {
    if (!this.isBrowser) return;

    const { default: L } = await import('leaflet');

    this.initMap(L);
    this.addPathsAndAnimate(L);
  }

  @HostListener('window:resize')
  onResize() {
    if (this.map) this.map.invalidateSize();
  }

  private initMap(L: any): void {
    const mapContainer = this.mapContainerRef.nativeElement;

    this.map = L.map(mapContainer, {
      center: [20, 0],
      zoom: 3,
      worldCopyJump: true,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    this.svgLayer = L.svg();
    this.svgLayer.addTo(this.map);
  }

  private addPathsAndAnimate(L: any): void {
    const svg = d3.select(this.map.getPanes().overlayPane).select('svg');
    const g = svg.append('g').attr('class', 'leaflet-zoom-hide');

    const planeIcon = L.icon({
      iconUrl: '../../../../assets/image/PNG/airplane.png',
      iconSize: [40, 40],
    });

    const startLatLng = this.travelSegments[0].coords[0] as [number, number];
    this.planeMarker = L.marker(startLatLng, { icon: planeIcon }).addTo(this.map);

    const pathGenerator = d3.line()
      .x((d: any) => this.map.latLngToLayerPoint([d[0], d[1]]).x)
      .y((d: any) => this.map.latLngToLayerPoint([d[0], d[1]]).y)
      .curve(d3.curveCatmullRom.alpha(0.5)); // smooth modern curve

    const redraw = () => {
      g.selectAll('*').remove();
      this.travelSegments.forEach(segment => {
        g.append('path')
          .datum(segment.coords)
          .attr('d', (d: any) => pathGenerator(d))
          .attr('stroke', segment.color)
          .attr('stroke-width', 2.5)
          .attr('fill', 'none')
          .attr('class', 'travel-path');
      });
    };

    this.map.on('zoomend', redraw);
    redraw();

    this.map.on('move zoom', () => {
      if (this.currentPlaneLatLng) {
        this.planeMarker.setLatLng(this.currentPlaneLatLng);
      }
    });

    this.animatePlaneD3(g, pathGenerator);
  }

  private animatePlaneD3(g: any, pathGenerator: any): void {
    let segmentIndex = 0;

    const flyNextSegment = () => {
      if (segmentIndex >= this.travelSegments.length) return;

      const segment = this.travelSegments[segmentIndex];
      const coords = segment.coords;
      const path = g.append('path')
        .datum(coords)
        .attr('d', (d: any) => pathGenerator(d))
        .attr('stroke', 'transparent')
        .attr('fill', 'none');

      const pathEl = path.node();
      const totalLength = pathEl.getTotalLength();
      const duration = 8000; // 8 seconds per segment

      if (this.yearLabelRef) {
        this.yearLabelRef.nativeElement.textContent = `Year: ${segment.year}`;
      }

      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const t = Math.min(1, d3.easeCubicInOut(elapsed / duration));
        const point = pathEl.getPointAtLength(t * totalLength);

        // 🌟 Save logical LatLng
        this.currentPlaneLatLng = this.map.layerPointToLatLng([point.x, point.y]);

        // 🌟 Always update plane marker based on latest position
        this.planeMarker.setLatLng(this.currentPlaneLatLng);

        if (t < 1) {
          requestAnimationFrame(animate);
        } else {
          segmentIndex++;
          flyNextSegment();
        }
      };

      animate();
    };

    flyNextSegment();
  }

}


