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
    {
      group: "Frontend Technologies",
      technologies: [
        { name: "HTML", level: "90%" },
        { name: "CSS / SCSS / LESS", level: "85%" },
        { name: "Bootstrap", level: "85%" },
        { name: "JavaScript", level: "80%" },
        { name: "TypeScript", level: "80%" },
        { name: "jQuery", level: "80%" },
        { name: "AngularJS", level: "85%" },
        { name: "Angular (2+ to 13+)", level: "90%" },
        { name: "React.js", level: "80%" }
      ]
    },
    {
      group: "UI Libraries & Frameworks",
      technologies: [
        { name: "Material-UI / Angular Material", level: "85%" },
        { name: "Ag Grid", level: "75%" }
      ]
    },
    {
      group: "Charts and Visualizations",
      technologies: [
        { name: "Highcharts / Chart.js", level: "80%" },
        { name: "D3.js", level: "70%" },
        { name: "GoJS", level: "70%" },
        { name: "EaselJS / TweenJS", level: "65%" }
      ]
    },
    {
      group: "Backend & Programming Languages",
      technologies: [
        { name: "Node.js", level: "75%" },
        { name: "PHP", level: "60%" },
        { name: "Paython", level: "70%" },
        { name: "Core Java", level: "70%" },
        { name: "SQL / MySQL", level: "75%" }
      ]
    },
    {
      group: "APIs and Communication",
      technologies: [
        { name: "AJAX / JSON", level: "85%" },
        { name: "Axios", level: "80%" },
        { name: "OAuth / JWT", level: "75%" }
      ]
    },
    {
      group: "Platforms & Hosting",
      technologies: [
        { name: "Firebase", level: "80%" },
        { name: "EmailJS", level: "80%" },
        { name: "Azure Services / Azure AD", level: "75%" },
        { name: "Netlify", level: "70%" }
      ]
    },
    {
      group: "Development Tools",
      technologies: [
        { name: "Git / SVN / Bitbucket / Phabricator", level: "80%" },
        { name: "Visual Studio Code / Atom / Eclipse", level: "75%" },
        { name: "XAMPP / WAMP", level: "70%" }
      ]
    },
    {
      group: "Miscellaneous",
      technologies: [
        { name: "Leaflet.js", level: "70%" },
        { name: "Three.js", level: "60%" },
        { name: "OS: Windows / MacOS / Ubuntu", level: "80%" }
      ]
    }
  ];


  // skills = [
  //   // === Frontend Technologies ===
  //   { "id": 1, "name": "HTML", "level": "90%" },
  //   { "id": 2, "name": "CSS / SCSS / LESS", "level": "85%" },
  //   { "id": 3, "name": "Bootstrap", "level": "85%" },
  //   { "id": 4, "name": "JavaScript", "level": "80%" },
  //   { "id": 5, "name": "TypeScript", "level": "80%" },
  //   { "id": 6, "name": "jQuery", "level": "80%" },
  //   { "id": 7, "name": "AngularJS", "level": "85%" },
  //   { "id": 8, "name": "Angular (2+ to 13+)", "level": "90%" },
  //   { "id": 9, "name": "React.js", "level": "80%" },

  //   // === UI Libraries & Frameworks ===
  //   { "id": 10, "name": "Material-UI / Angular Material", "level": "85%" },
  //   { "id": 11, "name": "Ag Grid", "level": "75%" },

  //   // === Charts and Visualizations ===
  //   { "id": 12, "name": "Highcharts / Chart.js", "level": "80%" },
  //   { "id": 13, "name": "D3.js", "level": "70%" },
  //   { "id": 14, "name": "GoJS", "level": "70%" },
  //   { "id": 15, "name": "EaselJS / TweenJS", "level": "65%" },

  //   // === Backend / Programming Languages ===
  //   { "id": 16, "name": "Node.js", "level": "75%" },
  //   { "id": 17, "name": "PHP", "level": "60%" },
  //   { "id": 18, "name": "Paython", "level": "70%" },
  //   { "id": 19, "name": "Core Java", "level": "70%" },
  //   { "id": 20, "name": "SQL / MySQL", "level": "75%" },

  //   // === APIs and Communication ===
  //   { "id": 21, "name": "AJAX / JSON", "level": "85%" },
  //   { "id": 22, "name": "Axios", "level": "80%" },
  //   { "id": 23, "name": "OAuth / JWT", "level": "75%" },

  //   // === Platforms & Hosting ===
  //   { "id": 24, "name": "Firebase", "level": "80%" },
  //   { "id": 25, "name": "EmailJS", "level": "80%" },
  //   { "id": 26, "name": "Azure Services / Azure AD", "level": "75%" },
  //   { "id": 27, "name": "Netlify", "level": "70%" },

  //   // === Dev Tools ===
  //   { "id": 28, "name": "Git / SVN / Bitbucket / Phabricator", "level": "80%" },
  //   { "id": 29, "name": "Visual Studio Code / Atom / Eclipse", "level": "75%" },
  //   { "id": 30, "name": "XAMPP / WAMP", "level": "70%" },

  //   // === Miscellaneous ===
  //   { "id": 31, "name": "Leaflet.js", "level": "70%" },
  //   { "id": 32, "name": "Three.js", "level": "60%" },
  //   { "id": 33, "name": "OS: Windows / MacOS / Ubuntu", "level": "80%" }
  // ];

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


