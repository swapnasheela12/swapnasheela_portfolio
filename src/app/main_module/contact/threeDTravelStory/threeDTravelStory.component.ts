import * as Cesium from 'cesium';

import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-threeDTravelStory',
  templateUrl: './threeDTravelStory.component.html',
  styleUrls: ['./threeDTravelStory.component.scss']
})
export class ThreeDTravelStoryComponent implements OnInit {

  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef<HTMLElement>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }
  ngOnInit(): void {

  }

  async ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0MjU5MTNiYS1lNTA5LTQyN2ItOWNkNC1lMWU1MzM0YzRkYTgiLCJpZCI6Mjk3MDkwLCJpYXQiOjE3NDU1NTQ4NjZ9.cf34B9RyoozobKiHXElfPvbHz1DRzYrDRwvbwC47sWk';
    const terrainProvider = await Cesium.createWorldTerrainAsync();

    const viewer = new Cesium.Viewer(this.mapContainer.nativeElement, {
      terrainProvider,
      animation: false,
      timeline: false,
    });

    const travelPath = [
      { lat: 19.076, lon: 72.8777 }, // Mumbai
      { lat: 18.5204, lon: 73.8567 }, // Pune
      { lat: 37.4316, lon: -78.6569 }, // Virginia
      { lat: 19.076, lon: 72.8777 }, // Mumbai
      { lat: 18.5204, lon: 73.8567 }, // Pune
      { lat: 40.0583, lon: -74.4057 } // New Jersey
    ];

    const positions = travelPath.map(p =>
      Cesium.Cartesian3.fromDegrees(p.lon, p.lat, 100000)
    );

    viewer.entities.add({
      polyline: {
        positions,
        width: 5,
        material: Cesium.Color.RED.withAlpha(0.8),
        clampToGround: false
      }
    });

    viewer.camera.flyTo({
      destination: positions[0],
      duration: 3
    });
  }
}
