import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-why-hire-me',
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
  templateUrl: './why-hire-me.component.html',
  styleUrls: ['./why-hire-me.component.scss']
})
export class WhyHireMeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  projectCount = 14;
  buttonText = 'Hire Me';

  // Define full styling properties
  buttonStyle: { color: string; border: string; backgroundColor?: string } = {
    color: '#344054',
    border: '2px solid #344054',
  };

  onHover() {
    this.buttonStyle = {
      ...this.buttonStyle,
      backgroundColor: '#fd853a',
      color: 'white',
    };
  }

  onLeave() {
    this.buttonStyle = {
      color: '#344054',
      border: '2px solid #344054',
    };
  }
}
