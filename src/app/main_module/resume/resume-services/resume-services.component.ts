import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-resume-services',
    imports: [CommonModule], // <-- Add CommonModule in the imports
    templateUrl: './resume-services.component.html',
    styleUrls: ['./resume-services.component.scss']
})
export class ResumeServicesComponent implements OnInit {
  services = [
    { title: 'Web Development', description: 'Blog, E-Commerce', icon: 'assets/icons/web.svg' },
    { title: 'UI/UX Design', description: 'Mobile App, Website Design', icon: 'assets/icons/uiux.svg' },
    { title: 'Sound Design', description: 'Voice Over, Beat Making', icon: 'assets/icons/sound.svg' },
    { title: 'Game Design', description: 'Character Design, Props', icon: 'assets/icons/game.svg' },
    { title: 'Photography', description: 'Portrait, Product Photography', icon: 'assets/icons/photo.svg' },
    { title: 'Advertising', description: 'Marketing & Promotion', icon: 'assets/icons/ad.svg' }
  ];
  constructor() { }

  ngOnInit() {
  }

}
