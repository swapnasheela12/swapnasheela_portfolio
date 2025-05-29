import * as d3 from 'd3';

import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

import { AwardsRecognitionComponent } from "./awards-recognition/awards-recognition.component";
import { CommonModule } from '@angular/common';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';
import { ImageSliderComponent } from "./image-slider/image-slider.component";
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, AwardsRecognitionComponent],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
  @ViewChild('slider', { static: true }) slider!: ElementRef;
  constructor(private dialog: MatDialog) { }
  cards = [
    { image: './../../../assets/image/PNG/myServices/hitachi-ABB.png', title: 'Hitachi ABB', description: 'Hitachi Energy Relcare cost configurator' },
    { image: '../../../assets/image/PNG/myServices/dashbord-jio.png', title: 'Reliance Jio', description: 'JCP (Jio cognitive platform)' },
    { image: '../../../assets/image/PNG/myServices/pixtran.png', title: 'PIX Transmissions', description: ' Power Transmission Products site' },
    { image: '../../../assets/image/PNG/myServices/hire4hotel.png', title: 'Hire4hotel', description: 'Hotel industry career search' },
    { image: '../../../assets/image/PNG/myServices/Medusense.png', title: 'Medusense', description: 'Saudi Government Hospital (Medusense)' },
    { image: '../../../assets/image/PNG/myServices/xovient.png', title: 'Xovient', description: 'xovient services' },
    { image: '../../../assets/image/PNG/myServices/hitachi-ABB.png', title: 'Hitachi ABB', description: 'Hitachi Energy critical spare parts' },
    { image: '../../../assets/image/PNG/myServices/jio_nbiot.png', title: 'Jio NB-IOT', description: 'Reliance Jio NB-IOT' },
    { image: '../../../assets/image/PNG/myServices/pixtran.png', title: 'LOREM IPSUM', description: 'sed do eiusmod tempor incididunt ut labore' },

    { image: '../../../assets/image/PNG/myServices/hitachi-ABB.png', title: 'Hitachi ABB', description: 'Hitachi Energy Relcare cost configurator' },
    { image: '../../../assets/image/PNG/myServices/dashbord-jio.png', title: 'Reliance Jio', description: 'JCP (Jio cognitive platform)' },
    { image: '../../../assets/image/PNG/myServices/pixtran.png', title: 'PIX Transmissions', description: ' Power Transmission Products site' },
  ];

  currentIndex = 0;

  nextSlide() {
    const sliderEl = this.slider.nativeElement as HTMLElement;
    sliderEl.scrollBy({ left: sliderEl.offsetWidth * 0.9, behavior: 'smooth' });
  }

  prevSlide() {
    const sliderEl = this.slider.nativeElement as HTMLElement;
    sliderEl.scrollBy({ left: -sliderEl.offsetWidth * 0.9, behavior: 'smooth' });
  }

  openImageDialog(card: any) {
    this.dialog.open(ImageDialogComponent, {
      data: card,
      panelClass: 'image-dialog-panel',
    });
  }

  disableRightClick(event: MouseEvent) {
    event.preventDefault();
  }

}

