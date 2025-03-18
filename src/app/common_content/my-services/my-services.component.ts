import { animate, state, style, transition, trigger } from '@angular/animations';
import { provideRouter, withViewTransitions } from '@angular/router';

import { Component } from '@angular/core';
import { DiscussProjectComponent } from './discuss-project/discuss-project.component';
import { MatButtonModule } from '@angular/material/button';
import { WhyHireMeComponent } from './why-hire-me/why-hire-me/why-hire-me.component';
import { Work_experinceComponent } from './work_experince/work_experince.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-my-services',
  standalone: true,
  imports: [
    MatButtonModule,
    WhyHireMeComponent,
    DiscussProjectComponent,
    Work_experinceComponent
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



