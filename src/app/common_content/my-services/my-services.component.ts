import { trigger, transition, style, animate, state } from '@angular/animations';
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withViewTransitions } from '@angular/router';
import { routes } from '../../app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@Component({
  selector: 'app-my-services',
  standalone: true,
  imports: [

  ],
  templateUrl: './my-services.component.html',
  styleUrl: './my-services.component.scss',

})
export class MyServicesComponent {
  items = [
    { src: 'https://unsplash.it/600/360?image=533', caption: 'Image - 533' },
    { src: 'https://unsplash.it/600/360?image=623', caption: 'Image - 623' },
    { src: 'https://unsplash.it/600/360?image=419', caption: 'Image - 419' },
    { src: 'https://unsplash.it/600/360?image=490', caption: 'Image - 490' },
    { src: 'https://unsplash.it/600/360?image=695', caption: 'Image - 695' },
    { src: 'https://unsplash.it/600/360?image=458', caption: 'Image - 458' },
    { src: 'https://unsplash.it/600/360?image=702', caption: 'Image - 702' }
  ];

  onNextSlide() {
    const firstItem = this.items.shift();
    if (firstItem) {
      this.items.push(firstItem);
    }
  }
}



