import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import * as d3 from 'd3';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProjectExperienceDialogComponent } from './projectExperienceDialog/projectExperienceDialog.component';
@Component({
  selector: 'app-resume-timeline',
  standalone: true,
  templateUrl: './resume-timeline.component.html',
  styleUrls: ['./resume-timeline.component.scss'],
  imports: [CommonModule, MatDialogModule], // Make sure it's here

})
export class ResumeTimelineComponent implements OnInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private dialog: MatDialog) { }
  private timelineLineX: number = 0;
  private currentOpenNode: SVGGElement | null = null;


  private data = [
    {
      id: 1, name: "exl services", year: 2025, title: 'UI Lead Assistant Manager', desc: 'EXL Services, USA', icon: '../../../../assets/image/JPG/my-services/exlservices.png', color: '#fd853a',
      "project_experience": [
        {
          "project_no": 1,
          "project_title": "Insurance Employee Dashboard (Web)",
          "role_and_responsibilities": [
            "Developed a comprehensive Employee Dashboard for Insurance company using React.js, enabling internal employees to access, manage, and monitor company-wide insurance data, client interactions, claims statuses, and internal analytics.",
            "The dashboard streamlines the workflow for employees by providing a real-time, user-friendly interface with essential tools and data for efficient management.",
            "Using React.js for the frontend, .NET (C#) for the backend, and Azure for cloud hosting and services, this dashboard enables employees to manage insurance policies, claims, customer information, and internal analytics with ease.",
            "Secure login system with JWT authentication for employee access.",
            "Role-based access control (RBAC) to provide different levels of access for various employee roles (e.g., Admin, Claims Manager, Sales, Customer Support).",
            "Session management to ensure secure access and prevent unauthorized actions.",
            "A dynamic, customizable homepage showing an overview of company metrics, current claims, policies in progress, and employee-specific data.",
            "Real-time data updates for key performance indicators (KPIs), such as claim approval rates, policy renewals, and customer interactions.",
            "Ability for employees to view and manage insurance claims, track claim statuses, and review claim details (pending, approved, rejected).",
            "Automated notifications for any claim updates (e.g., new claim submissions, approvals, rejections).",
            "Option to mark claims for follow-up, escalate issues, or assign them to different departments.",
            "Employee access to view, modify, and manage active insurance policies, including customer details, coverage levels, and policy status.",
            "Real-time updates to policy details as they are modified by customers or other employees.",
            "Integration with the CRM system to view and manage customer interactions, sales activities, and communications.",
            "Track customer feedback and service issues directly from the dashboard for follow-up or escalation.",
            "Data visualizations (using Chart.js or Recharts) to display various company metrics such as claim approval rates, policies sold, and overall insurance performance.",
            "Generate and download reports for claims, policies, and sales performance for internal auditing and decision-making.",
            "In-app alerts for important events such as claim escalations, policy renewals, or missed deadlines.",
            "Email and push notifications for employees to ensure timely actions and responses.",
            "Advanced search functionality for quickly finding claims, policies, and customer records based on various criteria (e.g., policy type, claim status, customer name).",
            "Filters for sorting claims, policies, and employees by status, type, or priority.",
            "Employees can create, assign, and track internal tasks related to policies, claims, and customer follow-ups.",
            "Task prioritization and due date management to ensure deadlines are met.",
            "Fully responsive interface for accessing the employee dashboard from desktops, tablets, and mobile devices.",
            "Use of Material-UI for fast, flexible, and responsive design components."
          ],
          "environment": [
            "React.js: A JavaScript library for building the user interface. React helps create dynamic, single-page applications with a component-based architecture.",
            "React Router: For client-side routing to handle different views (e.g., Claims, Policies, Analytics).",
            "Material-UI: A popular UI component library to ensure a modern, responsive, and consistent design.",
            "Axios: For making API requests to fetch and post data to the backend.",
            "highcharts.js: For visualizing performance data and creating reports.",
            ".NET (C#): The backend is developed using .NET Core (or ASP.NET Core), a robust framework for building scalable and high-performance APIs.",
            "Entity Framework Core: An Object-Relational Mapping (ORM) framework to interact with the database using C# objects.",
            "SQL Server or Azure SQL Database: For storing employee, client, policy, claim, and other organizational data.",
            "JWT (JSON Web Tokens): Used for stateless, secure authentication and authorization between the frontend and backend.",
            "OAuth/OpenID: Integration with Azure Active Directory for single sign-on (SSO) and secure role-based access.",
            "Azure App Services: Host both the backend API (ASP.NET Core) and React frontend with managed services, providing scalability and security.",
            "Azure Active Directory (AAD): For user authentication and role-based access control. Employees are authenticated via OAuth and access is secured based on roles (Admin, Claims Manager, Customer Support, etc.).",
            "Deployed frontend on Netlify for continuous deployment.",
            "Backend deployed on Azure."
          ]
        }
      ]
    },
    {
      id: 2, name: "topcoder", year: 2022, title: 'Freelance Ui Developer', desc: 'Wipro (Topcoder), Global', icon: '../../../../assets/image/JPG/my-services/wiprotopcoder.jpg', color: '#fd853a',
      "project_experience": [
        {
          "project_no": 1,
          "project_title": "S4 Portal ABB (Web)",
          "role_and_responsibilities": [
            "Service and Consulting Solutions Application Suite consists of business applications available to Hitachi Energy users. They consist of 4 categories: engagement, partnership, consulting, and sustainability.",
            "Provides a unified architecture and platform across applications. Core functionality includes role-based access control, project and task management, model execution management, prepare-execute-collect results, sync and async model execution, user dashboards.",
            "Developed the application in module-wise structure like Critical Spare Parts (CSP), Harmonic Impedance Scanning (HIS), and Cost Configurator.",
            "Built the application using HTML5, XHTML, CSS3, JavaScript, Angular 13, jQuery, AJAX, JSON, Bootstrap, and Lodash.",
            "Designed and developed front-end using Angular Reactive Forms for authentication and validation. Data displayed in table format using Angular Material.",
            "Integrated RESTful APIs for POST, PUT, DELETE, and GET operations.",
            "Used frameworks and plugins for additional features like custom table data, Angular Material, Angular Bootstrap UI, ngx-daterangepicker-material, and Moment.js.",
            "Utilized Git for version control and team collaboration."
          ],
          "environment": [
            "HTML", "CSS", "SCSS", "Bootstrap", "Angular 13", "JavaScript", "jQuery", "JSON",
            "NPM", "Karma", "Bower", "Git", "SVN", "Node.js", "Angular Material", "Lodash"
          ]
        },
        {
          "project_no": 2,
          "project_title": "RelCare Hitachi ABB (Web)",
          "role_and_responsibilities": [
            "RelCare is a digital partnership agreement combining asset management software with Hitachi Energy expertise.",
            "Enables asset managers to optimize system performance and protect crucial power assets. Location tracing and signal range detection using OpenStreetMap, Canvas, SVG, and GoJS.",
            "Service performance is visualized using graphs like pie charts and bar charts via D3.js.",
            "Built the application using HTML5, XHTML, CSS3, JavaScript, Angular 12, jQuery, AJAX, JSON, Bootstrap, and Lodash.",
            "Designed responsive UI with Angular Reactive Forms, Angular Material, Bootstrap, and other modern web technologies.",
            "Created mobile-friendly, responsive pages using Bootstrap 4, Media Queries, Flex Layout, Grid, Tables, Toolbars, and Panels.",
            "Implemented RESTful service calls (POST, PUT, DELETE, GET).",
            "Used frameworks and plugins like GoJS, D3.js, custom table features, Angular Material, ngx-daterangepicker-material, and Moment.js.",
            "Utilized Git for version control and team collaboration."
          ],
          "environment": [
            "HTML", "CSS", "SCSS", "Bootstrap", "Angular 12", "JavaScript", "jQuery", "OpenStreetMap", "JSON",
            "NPM", "Karma", "Bower", "D3.js", "Git", "SVN", "GoJS", "Jasmine", "Node.js",
            "AngularJS Material", "EaselJS", "TweenJS", "Lodash", "Three.js", "Leaflet.js"
          ]
        }
      ]
    },
    {
      id: 3, name: "reliance jio", year: 2018, title: 'Deputy Manager Ui Developer', desc: 'Reliance Jio, India', icon: '../../../../assets/image/JPG/my-services/Reliance_Jio.png', color: '#fd853a',
      "project_experience": [
        {
          "project_no": 1,
          "project_title": "Reliance JIO Cognitive Platform JCP3.0 (Mobile & Web)",
          "role_and_responsibilities": [
            "Jio cognitive platform developed for telecom employees and admin to find the signal tower coverage range.",
            "Used maps, canvas, SVG, and Leaflet for tracing tower locations and signal ranges.",
            "Visualized service performance through Highcharts.",
            "Built the application using HTML5, XHTML, CSS3, JavaScript, Angular 9, jQuery, AJAX, JSON, and Bootstrap.",
            "Collaborated with UX designers to build static content using HTML5, CSS3, SCSS.",
            "Developed user interactive UI using Angular 9, Angular Material, Bootstrap.",
            "Built responsive web pages using Bootstrap 4, media queries, Flex-layout, Grids, Toolbars, Panels.",
            "Used form-based authentication with Angular 9, JavaScript, and SCSS.",
            "Created modular, reusable Angular 9 components and implemented shared models with lazy loading.",
            "Called RESTful APIs for CRUD operations.",
            "Used Ag-Grid, Highcharts, ngx-daterangepicker-material, Moment.js, Angular Material, and other plugins.",
            "Used Git for version control and team collaboration.",
            "Led the project from scratch, later enhanced it with new features and responsiveness.",
            "Application enhancement based on mockups and verbal discussions."
          ],
          "environment": [
            "HTML", "CSS", "SCSS", "Bootstrap", "Angular 9", "JavaScript", "jQuery", "Highchart", "JSON",
            "NPM", "Karma", "Bower", "D3.js", "Git", "SVN", "Ag-Grid", "Jasmine", "Node.js",
            "AngularJS Material", "EaselJS", "TweenJS", "Underscore", "Three.js", "Leaflet.js"
          ]
        },
        {
          "project_no": 2,
          "project_title": "Net Velocity Speed Test (Mobile & Web)",
          "role_and_responsibilities": [
            "Internet speed test application to measure download/upload speed between home network and Jio broadband.",
            "Gauge meter and animated waves display speed; detailed info shown in tables with history view.",
            "Built using HTML5, XHTML, CSS3, JavaScript, Angular 8, TypeScript, jQuery, AJAX, JSON, Bootstrap, Highchart, and Siri Wave JS (kopiro).",
            "Worked with UX designers and static content integration using HTML5, CSS3, SCSS.",
            "Developed Angular 8 based UI with Angular Material and Bootstrap.",
            "Responsive design implemented for both web and mobile using media queries, grid, toolbars, etc.",
            "Designed modular Angular 8 components and shared models for API integration.",
            "Used Git for version control with team collaboration."
          ],
          "environment": [
            "HTML5", "CSS3", "SCSS", "Angular 8", "Highchart", "Siri Wave JS", "Bootstrap", "TypeScript",
            "JavaScript", "jQuery", "AJAX", "JSON", "NPM", "Git", "Jasmine", "Karma"
          ]
        },
        {
          "project_no": 3,
          "project_title": "NBIoT Dashboard",
          "role_and_responsibilities": [
            "IoT project focusing on data transmission without human interaction.",
            "Built using HTML5, XHTML, CSS3, JavaScript, Angular 7, jQuery, AJAX, JSON, Bootstrap.",
            "Worked with UX designers for static content development.",
            "Developed responsive UI using Angular 7, Angular Material, Bootstrap.",
            "Form-based authentication using Angular 7, TypeScript, SCSS.",
            "Created modular Angular 7 components with shared API models.",
            "RESTful API integration for CRUD.",
            "Used plugins like Ag-Grid, Highcharts, Angular Material, DateTimePicker.",
            "Followed Agile Scrum methodology for UI development.",
            "Ensured cross-browser compatibility across Chrome, Safari, Firefox, IE, and Opera."
          ],
          "environment": [
            "HTML5", "CSS3", "SCSS", "Angular 7", "Bootstrap", "TypeScript", "JavaScript",
            "jQuery", "AJAX", "JSON", "NPM", "Git", "Jasmine", "Karma"
          ]
        },
        {
          "project_no": 4,
          "project_title": "Reliance JIO Coverage Platform JCP2.0 (Web)",
          "role_and_responsibilities": [
            "Platform to trace signal tower locations and signal coverage for telecom employees.",
            "Used Google Maps, canvas, SVG, and Leaflet for location tracing.",
            "Highcharts used for performance graphs.",
            "Handled large datasets using AG-Grid and JSON for dummy performance data.",
            "Used AngularJS, HTML, CSS, and jQuery for forms.",
            "Implemented drag & drop using dndLists and dragula plugins.",
            "Customized rich text editor with textAngular plugins.",
            "Implemented ion.rangeslider and slick-carousel for UI elements.",
            "Worked on various internal modules like performance, dashboard, configuration, etc.",
            "Enhancements based on mockups and verbal requirements."
          ],
          "environment": [
            "HTML", "CSS", "SCSS", "Bootstrap", "AngularJS", "JavaScript", "jQuery", "Highchart", "JSON",
            "NPM", "Karma", "Bower", "D3.js", "Git", "SVN", "Ag-Grid", "Jasmine", "Node.js",
            "AngularJS Material", "EaselJS", "TweenJS", "Underscore", "Three.js", "Leaflet.js"
          ]
        },
        {
          "project_no": 5,
          "project_title": "Reliance JIO Coverage Platform JCP1.0 (Web)",
          "role_and_responsibilities": [
            "Developed to help telecom employees trace signal tower coverage.",
            "Used Google Maps, canvas, SVG, and Leaflet for mapping.",
            "Used Highcharts to display performance data.",
            "Large record display handled using DataTable with JSON dummy data.",
            "Forms developed using Bootstrap, HTML, CSS, jQuery.",
            "Functionality implemented with JavaScript and Advanced JavaScript.",
            "Worked on internal modules like dashboard, feedback, configuration, work orders, etc."
          ],
          "environment": [
            "HTML", "CSS", "SCSS", "Bootstrap", "JavaScript", "jQuery", "Highchart", "JSON", "D3.js",
            "Git", "SVN", "DataTable", "EaselJS", "TweenJS", "Underscore", "Leaflet.js"
          ]
        }
      ]
    },
    {
      id: 4, name: "usense innovative solutions", year: 2017, title: 'Jr Ui Developer', desc: 'Usense Innovative Solutions Pvt. Ltd, India', icon: '../../../../assets/image/JPG/my-services/usense.jpeg', color: '#fd853a',
      "project_experience": [
        {
          "project_no": 1,
          "project_title": "Reliance JIO Coverage Platform JCP2 (Client)",
          "role_and_responsibilities": [
            "Developed a platform for telecom employees and admins to trace signal tower coverage.",
            "Used Google Maps, canvas, SVG, and Leaflet to trace tower locations and coverage range.",
            "Visualized performance data using Highcharts.",
            "Handled large data using AG-Grid and displayed dummy performance data via JSON.",
            "Developed forms using Angular Material, HTML, CSS, jQuery.",
            "Implemented core functionality using JavaScript and AngularJS.",
            "Worked on internal modules including performance, feedback, fault, dashboard, configuration, administer, and work order."
          ],
          "environment": [
            "HTML", "CSS", "SCSS", "Bootstrap", "AngularJS", "JavaScript", "jQuery", "Highchart", "JSON",
            "NPM", "Karma", "Bower", "D3.js", "Git", "SVN", "Ag-Grid", "Jasmine", "Node.js",
            "AngularJS Material", "EaselJS", "TweenJS", "Underscore", "Three.js", "Leaflet.js"
          ]
        },
        {
          "project_no": 2,
          "project_title": "Saudi Government Hospital (Medusense) (Client)",
          "role_and_responsibilities": [
            "Developed a full-stack hospital management system for both frontend and backend.",
            "Designed modular AngularJS controllers for SPA architecture.",
            "Integrated forms using Angular Material, HTML, CSS, jQuery with custom CSS and business logic.",
            "Built core functionality using JavaScript and AngularJS.",
            "Worked on internal modules like Dental, Optical, Doctor, Receptionist, Pharmacist, Sales & Purchase, Administer, and Work Order.",
            "Enhanced the application experience based on client mockups and verbal feedback.",
            "Developed reusable internal modules including performance, dashboard, and work order handling."
          ],
          "environment": [
            "HTML", "CSS", "SCSS", "Bootstrap", "AngularJS", "JavaScript", "jQuery", "JSON", "NPM",
            "Karma", "Bower", "D3.js", "Git", "SVN", "Ag-Grid", "Jasmine", "Node.js",
            "AngularJS Material", "EaselJS", "Bitbucket", "Underscore", "REST API"
          ]
        }
      ]
    },
    {
      id: 5, name: "elutus info technology", year: 2016, title: 'Web Developer', desc: 'Elutus Info Technology Pvt Ltd, India', icon: '../../../../assets/image/JPG/my-services/elutus.png', color: '#fd853a',
      "project_experience": [
        {
          "project_no": 1,
          "project_title": "Pix Transmissions Ltd",
          "project_url": "http://www.pixtrans.com/",
          "role_and_responsibilities": [
            "Planned structure and design as per client requirements.",
            "Designed and coded multiple web pages.",
            "Performed manual testing for the site.",
            "Prepared test case documentation according to the development process.",
            "Worked on various internal modules and sub-modules."
          ],
          "environment": [
            "JavaScript", "PHP", "MySQL", "Bootstrap", "HTML5", "CSS3", "jQuery", "Manual Testing", "XAMPP Server"
          ]
        },
        {
          "project_no": 2,
          "project_title": "Hire4Hotel",
          "project_url": "http://www.hire4hotel.com",
          "role_and_responsibilities": [
            "Designed and developed responsive web pages for the site.",
            "Planned and designed structure based on client needs.",
            "Performed coding and testing, including manual testing.",
            "Prepared test case documentation according to the development cycle.",
            "Focused on enhancing user experience through improvements based on mockups and client feedback.",
            "Worked on various internal modules and sub-modules."
          ],
          "environment": [
            "JavaScript", "PHP", "MySQL", "Bootstrap", "HTML5", "CSS3", "jQuery", "Manual Testing", "XAMPP Server"
          ]
        },
        {
          "project_no": 3,
          "project_title": "Xovient Technology Pvt Ltd",
          "project_url": "https://www.xovient.com",
          "role_and_responsibilities": [
            "Designed and coded responsive web pages.",
            "Collaborated on structure planning and designing as per client requirements.",
            "Enhanced the application for better user experience.",
            "Performed continuous improvements based on mockups and client discussions.",
            "Worked on various internal modules and sub-modules."
          ],
          "environment": [
            "JavaScript", "PHP", "MySQL", "Bootstrap", "HTML5", "CSS3", "jQuery", "Manual Testing", "XAMPP Server"
          ]
        }
      ]
    }
  ];

  @ViewChild('timeline', { static: true }) timelineContainer!: ElementRef;

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // this.drawTimeline();
      this.drawHorizontalTimeline();
    }
  }

  // private drawTimeline(): void {
  //   const container = this.timelineContainer.nativeElement;
  //   const width = container.offsetWidth + 200;
  //   const topPadding = 60;
  //   const height = this.data.length * 180 + topPadding;

  //   const svg = d3.select(container)
  //     .append('svg')
  //     .attr('width', '100%')
  //     .attr('height', height)
  //     .attr('viewBox', `0 0 ${width} ${height}`)
  //     .attr('preserveAspectRatio', 'xMidYMin meet');

  //   this.timelineLineX = width / 2;
  //   const timelineLineX = this.timelineLineX;

  //   // Main vertical line
  //   svg.append('line')
  //     .attr('x1', timelineLineX)
  //     .attr('y1', topPadding)
  //     .attr('x2', timelineLineX)
  //     .attr('y2', topPadding)
  //     .attr('stroke', '#ccc')
  //     .attr('stroke-width', 3)
  //     .transition()
  //     .duration(1000)
  //     .attr('y2', height);
  //   const self = this;
  //   const nodes = svg.selectAll('.event')
  //     .data(this.data)
  //     .enter()
  //     .append('g')
  //     .attr('class', 'event')
  //     .attr('opacity', 0)
  //     .attr('transform', (d, i) => `translate(0, ${i * 180 + topPadding})`)
  //     // .on('click', (event, d) => this.openPopup(d)) // 👈 Click handler
  //     .on('click', function (event, d) {
  //       self.handleNodeClick(event, d, this); // 'this' is the SVG element (SVGGElement)
  //     })
  //     .transition()
  //     .delay((d, i) => i * 300)
  //     .duration(500)
  //     .attr('opacity', 1);

  //   const eventGroups = svg.selectAll('.event');

  //   // Year Dots with 3D effect
  //   eventGroups.append('circle')
  //     .attr('cx', timelineLineX)
  //     .attr('cy', 0)
  //     .attr('r', 0)
  //     .attr('fill', (d: any) => d.color)
  //     .transition()
  //     .delay((d, i) => i * 300)
  //     .duration(600)
  //     .attr('r', 8)
  //     .style('filter', 'drop-shadow(0px 2px 10px rgba(0, 0, 0, 0.5))');

  //   // Year Labels Box with 3D effect
  //   eventGroups.append('path')
  //     .attr('d', (d, i) => {
  //       const x = i % 2 === 0 ? timelineLineX - 40 : timelineLineX - 35;
  //       const y = 70;
  //       const w = 80;
  //       const h = 40;
  //       const r = 10; // curvature
  //       return `
  //         M${x},${y + r}
  //         Q${x},${y} ${x + r},${y}
  //         H${x + w - r}
  //         Q${x + w},${y} ${x + w},${y + r}
  //         L${x + w},${y + h - r}
  //         Q${x + w},${y + h} ${x + w - r},${y + h}
  //         H${x + r}
  //         Q${x},${y + h} ${x},${y + h - r}
  //         Z
  //       `;
  //     })
  //     .attr('fill', (d: any) => d.color)
  //     .attr('stroke', '#fff')
  //     .attr('stroke-width', 1.5)
  //     .style('filter', 'drop-shadow(4px 4px 6px rgba(0, 0, 0, 0.3))')
  //     .style('opacity', 0)
  //     .transition()
  //     .delay((d, i) => i * 300 + 300)
  //     .duration(500)
  //     .style('opacity', 1);

  //   // Year Labels with smooth fade in
  //   eventGroups.append('text')
  //     .attr('x', (d, i) => i % 2 === 0 ? timelineLineX : timelineLineX - 5)
  //     .attr('y', 97)
  //     .attr('text-anchor', 'middle')
  //     .attr('fill', '#fff')
  //     .attr('font-size', '18px')
  //     .style('opacity', 0)
  //     .text((d: any) => d.year)
  //     .transition()
  //     .delay((d, i) => i * 300 + 400)
  //     .duration(500)
  //     .style('opacity', 1);

  //   // White border circle (slightly larger, behind the main one)
  //   eventGroups.append('circle')
  //     .attr('cx', (d, i) => i % 2 === 0 ? timelineLineX - 90 : timelineLineX + 90)
  //     .attr('cy', 90)
  //     .attr('r', 0)
  //     .attr('fill', '#fff')
  //     .style('filter', 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2))')
  //     .transition()
  //     .delay((d, i) => i * 300 + 400)
  //     .duration(600)
  //     .attr('r', 66); // Slightly larger than main circle (60 + stroke-width)

  //   // Main icon circle (on top, with stroke and shadow)
  //   eventGroups.append('circle')
  //     .attr('cx', (d, i) => i % 2 === 0 ? timelineLineX - 90 : timelineLineX + 90)
  //     .attr('cy', 90)
  //     .attr('r', 0)
  //     .attr('fill', '#fff')
  //     .attr('stroke', (d: any) => d.color)
  //     .attr('stroke-width', 12)
  //     .style('filter', 'drop-shadow(4px 4px 6px rgba(0, 0, 0, 0.3))')
  //     .transition()
  //     .delay((d, i) => i * 300 + 500)
  //     .duration(600)
  //     .attr('r', 60)
  //     .style('opacity', 1);


  //   // Icon Image with fade-in animation
  //   eventGroups.append('image')
  //     .attr('xlink:href', (d: any) => d.icon)
  //     .attr('x', (d, i) => i % 2 === 0 ? timelineLineX - 115 : timelineLineX + 65)
  //     .attr('y', 65)
  //     .attr('width', 50)
  //     .attr('height', 50)
  //     .style('opacity', 0)
  //     .transition()
  //     .delay((d, i) => i * 300 + 600)
  //     .duration(400)
  //     .style('opacity', 1);

  //   // Title Text with smooth fade-in animation
  //   eventGroups.append('text')
  //     .attr('data-type', 'title')
  //     .attr('x', (d, i) => i % 2 === 0 ? timelineLineX + 90 : timelineLineX - 260)
  //     .attr('y', 80)
  //     .attr('font-size', '16px')
  //     .attr('fill', (d: any) => d.color)
  //     .style('opacity', 0)
  //     .text((d: any) => d.title)
  //     .transition()
  //     .delay((d, i) => i * 300 + 700)
  //     .duration(400)
  //     .style('opacity', 1);

  //   // Description Text with fade-in
  //   eventGroups.append('text')
  //     .attr('data-type', 'desc')
  //     .attr('x', (d, i) => i % 2 === 0 ? timelineLineX + 90 : timelineLineX - 260)
  //     .attr('y', 100)
  //     .attr('font-size', '14px')
  //     .attr('fill', '#667085')
  //     .style('opacity', 0)
  //     .each(function (d: any, i) {
  //       const textEl = d3.select(this);
  //       const words = d.desc.split(/\s+/);
  //       const lineHeight = 14; // approx line height in px
  //       const maxWidth = 180;

  //       let line: string[] = [];
  //       let lineNumber = 0;
  //       let tspan = textEl.append('tspan')
  //         .attr('x', i % 2 === 0 ? timelineLineX + 90 : timelineLineX - 260)
  //         .attr('y', 100)
  //         .attr('dy', '0em');

  //       for (let word of words) {
  //         line.push(word);
  //         tspan.text(line.join(' '));

  //         if (tspan.node()!.getComputedTextLength() > maxWidth) {
  //           line.pop();
  //           tspan.text(line.join(' '));
  //           line = [word];
  //           lineNumber++;

  //           tspan = textEl.append('tspan')
  //             .attr('x', i % 2 === 0 ? timelineLineX + 90 : timelineLineX - 260)
  //             .attr('y', 100)
  //             .attr('dy', `${lineHeight}px`)
  //             .text(word);
  //         }
  //       }
  //     })
  //     .transition()
  //     .delay((d, i) => i * 300 + 800)
  //     .duration(400)
  //     .style('opacity', 1);

  // }

  private drawHorizontalTimeline(): void {
    const container = this.timelineContainer.nativeElement;
    const padding = 0;
    const spacing = 280;
    const width = this.data.length * spacing + padding * 2;
    const height = 400;

    const svg = d3.select(container)
      .append('svg')
      .attr('width', '100%')
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet');

    const centerY = height / 2;

    // Horizontal Line
    svg.append('line')
      .attr('x1', padding)
      .attr('x2', padding)
      .attr('y1', centerY)
      .attr('y2', centerY)
      .attr('stroke', '#ccc')
      .attr('stroke-width', 3)
      .transition()
      .duration(1000)
      .attr('x2', width - padding);

    const groups = svg.selectAll('.event')
      .data(this.data)
      .enter()
      .append('g')
      .attr('class', 'event')
      .attr('transform', (d, i) => `translate(${i * spacing + padding + 140}, ${centerY})`)
      .style('opacity', 0)
      .on('click', (event, d) => this.handleNodeClick(event, d, event.currentTarget))
      .transition()
      .delay((_, i) => i * 300)
      .duration(500)
      .style('opacity', 1);

    // // Append dot
    // svg.selectAll('.event')
    //   .append('circle')
    //   .attr('r', 0)
    //   .attr('fill', (d: any) => d.color)
    //   .transition()
    //   .duration(600)
    //   .attr('r', 14)
    //   .style('filter', 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.5))');

    // Year label box
    svg.selectAll('.event')
      .append('rect')
      .attr('x', -76)
      .attr('y', -25)
      .attr('width', 150)
      .attr('height', 50)
      .attr('rx', 8)
      .attr('fill', (d: any) => d.color)
      .attr('stroke', '#fff')
      .style('filter', 'drop-shadow(2px 2px 6px rgba(0, 0, 0, 0.3))')
      .style('opacity', 0)
      .transition()
      .delay((_, i) => i * 300 + 300)
      .duration(400)
      .style('opacity', 1);

    // Year text
    svg.selectAll('.event')
      .append('text')
      .attr('x', 0)
      .attr('y', 10)
      .attr('text-anchor', 'middle')
      .attr('fill', '#fff')
      .attr('font-size', '32px')
      .text((d: any) => d.year)
      .style('opacity', 0)
      .transition()
      .delay((_, i) => i * 300 + 400)
      .duration(400)
      .style('opacity', 1);

    // Image icon circle (border)
    svg.selectAll('.event')
      .append('circle')
      .attr('cx', 0)
      // .attr('cy', -160)
      .attr('cy', (d, i) => (i % 2 === 0 ? -180 : 180)) // left/right from center
      .attr('r', 0)
      .attr('fill', '#fff')
      .attr('stroke', (d: any) => d.color)
      .attr('stroke-width', 10)
      .style('filter', 'drop-shadow(3px 3px 6px rgba(0,0,0,0.2))')
      .transition()
      .delay((_, i) => i * 300 + 500)
      .duration(500)
      .attr('r', 100);

    // Image icon inside
    svg.selectAll('.event')
      .append('image')
      .attr('xlink:href', (d: any) => d.icon)
      .attr('x', -50)
      // .attr('y', 105)
      .attr('y', (d, i) => (i % 2 === 0 ? -230 : 140)) // left/right from center
      .attr('width', 100)
      .attr('height', 100)
      .style('opacity', 0)
      .transition()
      .delay((_, i) => i * 300 + 600)
      .duration(400)
      .style('opacity', 1);

    // // Title
    // svg.selectAll('.event')
    //   .append('text')
    //   .attr('x', 0)
    //   // .attr('y', 320)
    //   .attr('y', (d, i) => (i % 2 === 0 ? 230 : -140)) // left/right from center
    //   .attr('width', '200px')
    //   .attr('text-anchor', 'middle')
    //   .attr('font-size', '32px')
    //   .attr('fill', (d: any) => d.color)
    //   .text((d: any) => d.title)
    //   .style('opacity', 0)
    //   .transition()
    //   .delay((_, i) => i * 300 + 700)
    //   .duration(400)
    //   .style('opacity', 1);

    //   // Description
    //   svg.selectAll('.event')
    //     .append('text')
    //     .attr('x', 0)
    //     // .attr('y', 380)
    //     .attr('width', '200px')
    //     .attr('y', (d, i) => (i % 2 === 0 ? 230 : -140)) // left/right from center
    //     .attr('text-anchor', 'middle')
    //     .attr('font-size', '28px')
    //     .attr('fill', '#667085')
    //     .each(function (d: any) {
    //       const text = d3.select(this);
    //       const words = d.desc.split(' ');
    //       const lineHeight = 15;
    //       const maxWidth = 200;
    //       let line: string[] = [];
    //       let tspan: d3.Selection<SVGTSpanElement, any, SVGTextElement, unknown> | any = null;

    //       words.forEach((word: any, i: any) => {
    //         line.push(word);
    //         if (!tspan) {
    //           tspan = text.append('tspan')
    //             .attr('x', 0)
    //             .attr('dy', i === 0 ? 0 : `${lineHeight}px`)
    //             .text(line.join(' '));
    //         } else {
    //           tspan.text(line.join(' '));
    //           if (tspan.node()!.getComputedTextLength() > maxWidth) {
    //             line.pop();
    //             tspan.text(line.join(' '));
    //             line = [word];
    //             tspan = text.append('tspan')
    //               .attr('x', 0)
    //               .attr('dy', `${lineHeight}px`)
    //               .text(word);
    //           }
    //         }
    //       });
    //     })

    //     .style('opacity', 0)
    //     .transition()
    //     .delay((_, i) => i * 300 + 800)
    //     .duration(400)
    //     .style('opacity', 1);

    const maxWidth = 220;
    const lineHeight = 32; // px

    // TITLE
    svg.selectAll('.event')
      .append('text')
      .attr('class', 'event-title')
      .attr('x', 0)
      .attr('y', (d, i) => (i % 2 === 0 ? 125 : -200)) // Adjust vertical placement
      .attr('text-anchor', 'middle')
      .attr('font-size', '28px')
      .attr('fill', (d: any) => d.color)
      .style('opacity', 0)
      .each(function (d: any) {
        const text = d3.select(this);
        const words = d.title.split(/\s+/);
        const lineHeight = 32;
        const maxWidth = 220;
        let line: string[] = [];
        let tspan = text.append('tspan')
          .attr('x', 0)
          .attr('dy', '0em');

        words.forEach((word: any) => {
          line.push(word);
          tspan.text(line.join(' '));
          if (tspan.node()!.getComputedTextLength() > maxWidth) {
            line.pop();
            tspan.text(line.join(' '));
            line = [word];
            tspan = text.append('tspan')
              .attr('x', 0)
              .attr('dy', `${lineHeight}px`)
              .text(word);
          }
        });
      })
      .transition()
      .delay((_, i) => i * 300 + 700)
      .duration(400)
      .style('opacity', 1);



    // DESCRIPTION
    svg.selectAll('.event')
      .append('text')
      .attr('class', 'event-desc')
      .attr('x', 0)
      .attr('y', (d, i) => (i % 2 === 0 ? 200 : -130)) // Below title
      .attr('text-anchor', 'middle')
      .attr('font-size', '20px')
      .attr('fill', '#667085')
      .style('opacity', 0)
      .each(function (d: any) {
        const text = d3.select(this);
        const words = d.desc.split(/\s+/);
        const lineHeight = 28;
        const maxWidth = 220;
        let line: string[] = [];
        let tspan = text.append('tspan')
          .attr('x', 0)
          .attr('dy', '0em');

        words.forEach((word: any) => {
          line.push(word);
          tspan.text(line.join(' '));
          if (tspan.node()!.getComputedTextLength() > maxWidth) {
            line.pop();
            tspan.text(line.join(' '));
            line = [word];
            tspan = text.append('tspan')
              .attr('x', 0)
              .attr('dy', `${lineHeight}px`)
              .text(word);
          }
        });
      })
      .transition()
      .delay((_, i) => i * 300 + 800)
      .duration(400)
      .style('opacity', 1);






  }


  private handleNodeClick(event: PointerEvent, d: any, target: SVGGElement): void {
    this.dialog.open(ProjectExperienceDialogComponent, {
      data: d,
      panelClass: 'custom-popup-panel',
      backdropClass: 'custom-popup-backdrop',
      // disableClose: true
    });

  }




}
