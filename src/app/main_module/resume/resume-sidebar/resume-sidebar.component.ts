import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-resume-sidebar',
  standalone: true,
  templateUrl: './resume-sidebar.component.html',
  styleUrls: ['./resume-sidebar.component.scss'],
  animations: [
    trigger('fadeSlideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-30px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class ResumeSidebarComponent implements OnInit {
  languages = [
    { id: 1, name: 'Marathi', level: '100%' },
    { id: 2, name: 'English', level: '80%' },
    { id: 3, name: 'Hindi', level: '100%' }
  ];

  skills = [
    { "id": 1, "name": "HTML", "level": "90%" },
    { "id": 2, "name": "CSS / SCSS / LESS", "level": "85%" },
    { "id": 3, "name": "Bootstrap", "level": "85%" },
    { "id": 4, "name": "JavaScript", "level": "80%" },
    { "id": 5, "name": "TypeScript", "level": "80%" },
    { "id": 6, "name": "jQuery", "level": "80%" },
    { "id": 7, "name": "AngularJS", "level": "85%" },
    { "id": 8, "name": "Angular (2+ to 13+)", "level": "90%" },
    { "id": 9, "name": "React.js", "level": "80%" },
    { "id": 10, "name": "Material-UI / Angular Material", "level": "85%" },
    { "id": 11, "name": "Node.js", "level": "75%" },
    { "id": 12, "name": "PHP", "level": "70%" },
    { "id": 13, "name": "Core Java", "level": "70%" },
    { "id": 14, "name": "SQL / MySQL", "level": "75%" },
    { "id": 15, "name": "Ag Grid", "level": "75%" },
    { "id": 16, "name": "Highcharts / Chart.js", "level": "80%" },
    { "id": 17, "name": "D3.js", "level": "70%" },
    { "id": 18, "name": "GoJS", "level": "70%" },
    { "id": 19, "name": "EaselJS / TweenJS", "level": "65%" },
    { "id": 20, "name": "Leaflet.js", "level": "70%" },
    { "id": 21, "name": "Three.js", "level": "60%" },
    { "id": 22, "name": "AJAX / JSON", "level": "85%" },
    { "id": 23, "name": "Axios", "level": "80%" },
    { "id": 24, "name": "OAuth / JWT", "level": "75%" },
    { "id": 25, "name": "Azure Services / Azure AD", "level": "75%" },
    { "id": 26, "name": "Netlify", "level": "70%" },
    { "id": 27, "name": "Git / SVN / Bitbucket / Phabricator", "level": "80%" },
    { "id": 28, "name": "Visual Studio Code / Atom / Eclipse", "level": "75%" },
    { "id": 29, "name": "XAMPP / WAMP", "level": "70%" },
    { "id": 30, "name": "OS: Windows / MacOS / Ubuntu", "level": "80%" }
  ];
  constructor() { }

  ngOnInit() {
  }

  downloadCV(): void {
    const fileUrl = '../../../../assets/files/Swapnasheela_Khandagale_Resume.docx';
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = 'Swapnasheela_Khandagale_Resume.docx';
    link.target = '_blank'; // optional: opens in new tab before downloading
    link.click();
  }

}


