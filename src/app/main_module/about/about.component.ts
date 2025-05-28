import { RouterLink, RouterLinkActive } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-about',
  imports: [MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    RouterLink,
    RouterLinkActive
  ],
  standalone: true,
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class AboutComponent {
  services = [
    {
      title: 'Front-End Development',
      content: 'Building high-performance, scalable, and pixel-perfect web applications.'
    },
    {
      title: 'UI/UX Design Implementation',
      content: 'Bringing designs to life with functional and visually appealing interfaces.'
    },
    {
      title: 'Responsive Web Design',
      content: 'Crafting seamless user experiences across all devices.'
    },
    {
      title: 'Performance Optimization',
      content: 'Improving loading speeds and accessibility.'
    }
  ];
}
