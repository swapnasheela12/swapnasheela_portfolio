import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-education_details',
  standalone: true,
  imports: [CommonModule], // ✅ Add this
  templateUrl: './education_details.component.html',
  styleUrls: ['./education_details.component.scss'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class Education_detailsComponent implements OnInit {
  // steps = [
  //   {
  //     id: 1,
  //     title: 'Step One',
  //     number: '01',
  //     desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  //     icon: 'fas fa-puzzle-piece',
  //     color: '#1E88E5'
  //   },
  //   {
  //     id: 2,
  //     title: 'Step Two',
  //     number: '02',
  //     desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  //     icon: 'fas fa-chart-pie',
  //     color: '#F9A825'
  //   },
  //   {
  //     id: 3,
  //     title: 'Step Three',
  //     number: '03',
  //     desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  //     icon: 'fas fa-users',
  //     color: '#00ACC1'
  //   },
  //   {
  //     id: 4,
  //     title: 'Step Four',
  //     number: '04',
  //     desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  //     icon: 'fas fa-chart-bar',
  //     color: '#C62828'
  //   }
  // ];

  steps = [
    {
      id: 1,
      year: '2013',
      title: 'BSC IT',
      desc: 'Bachelor of Science (Information Technology)',
      institute: 'Karmaveer Bhaurao Patil College, Mumbai University',
      location: 'Navi Mumbai',
      color: '#fd853a'
    },
    {
      id: 2,
      year: '2009',
      title: 'Diploma CO',
      desc: 'Diploma in Computer Engineering',
      institute: 'Dr. D.Y. Patil Polytechnic Institute, Mumbai University',
      location: 'Navi Mumbai',
      color: '#fd853a'
    },
    {
      id: 3,
      year: '2005',
      title: 'H.S.C',
      desc: 'Higher Secondary in Science',
      institute: 'Bharati Vidyapeeth, Mumbai University',
      location: 'Navi Mumbai',
      color: '#fd853a'
    }
  ];


  constructor() { }

  ngOnInit() {
  }

}
