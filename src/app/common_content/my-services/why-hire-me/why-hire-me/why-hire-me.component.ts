import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-why-hire-me',
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
