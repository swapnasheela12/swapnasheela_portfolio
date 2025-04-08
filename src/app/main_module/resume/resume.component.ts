import { animate, style, transition, trigger } from '@angular/animations';

import { Component } from '@angular/core';
import { ResumeFlowchartComponent } from './resume-flowchart/resume-flowchart.component';
import { ResumeHeroComponent } from './resume-hero/resume-hero.component';
import { ResumeServicesComponent } from './resume-services/resume-services.component';
import { ResumeSidebarComponent } from './resume-sidebar/resume-sidebar.component';
import { ResumeTreeComponent } from './resume-tree/resume-tree.component';

@Component({
  selector: 'app-resume',
  imports: [ResumeSidebarComponent, ResumeHeroComponent, ResumeServicesComponent, ResumeFlowchartComponent, ResumeTreeComponent],
  standalone: true,
  animations: [
    trigger('fadeIn', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(1000, style({ opacity: 1 }))
      ])
    ])
  ],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss'
})
export class ResumeComponent {
  services = [
    { title: 'Web Development', description: 'Blog, E-Commerce', icon: 'assets/icons/web.svg' },
    { title: 'UI/UX Design', description: 'Mobile App, Website Design', icon: 'assets/icons/uiux.svg' },
    { title: 'Sound Design', description: 'Voice Over, Beat Making', icon: 'assets/icons/sound.svg' },
    { title: 'Game Design', description: 'Character Design, Props', icon: 'assets/icons/game.svg' },
    { title: 'Photography', description: 'Portrait, Product Photography', icon: 'assets/icons/photo.svg' },
    { title: 'Advertising', description: 'Marketing & Promotion', icon: 'assets/icons/ad.svg' }
  ];
}
