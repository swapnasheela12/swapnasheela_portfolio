import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import * as d3 from 'd3';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProjectExperienceDialogComponent } from './projectExperienceDialog/projectExperienceDialog.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
@Component({
  selector: 'app-resume-timeline',
  standalone: true,
  templateUrl: './resume-timeline.component.html',
  styleUrls: ['./resume-timeline.component.scss'],
  imports: [CommonModule, MatDialogModule], // Make sure it's here

})
export class ResumeTimelineComponent implements OnInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private dialog: MatDialog, private breakpointObserver: BreakpointObserver) { }
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
          "project_link": "https://login.microsoftonline.com/372ee9e0-9ce0-4033-a64a-c07073a91ecd/saml2?SAMLRequest=jVLBbtswDP0VQ3fbipzEjRAHyBIMC9B1RpP1sBsj06kAWfJEOd3%2Bfq6Sod1hQS86UI%2FvPT5ySdAZ0cv1EJ7tI%2F4ckELyqzOW5OWnYoO30gFpkhY6JBmU3K%2B%2F3kuRcdl7F5xyhiVrIvRBO7txloYO%2FR79WSv8%2FnhfsecQepJ5DsdjRpd6at1LplyXWzj3cMKscSzZjurawivNW5NxJ22zTivvyLXBWaMtxtaiFIgL5OlCjc%2BUF0UK8ymkipe8LGAxQdXkcQyWfHZeYZyyYi0YQpbsthXbP2xwOpvzu9kERMuhVXdNybEoy0Lgoh35yxFINRDpM761Eg24sxTAhooJLmYpn6ZCHLiQnEsxz%2Baz4gdL6ms%2Bn7RttD3dDvN4AZH8cjjUaf1tf4gEZ92gfxjRH8%2FxCT3FDEdatlrGCGT07N8v97Yd%2BLtRtrqhu8zfs1%2B1evnqd7etndHqd7I2xr1sPEIYZwh%2BwLiODsL%2FDUyySazoJm0jVA6WelS61diwfHWV%2FfdwV38A&RelayState=https%3A%2F%2Fabb.service-now.com%2Fmyservices%3Fid%3Dmyis",
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
          "project_link": "https://login.microsoftonline.com/7831e6d9-dc6c-4cd1-9ec6-1dc2b4133195/resume?ctx=rQQIARAAjZHPa9NwAMXzXbeuFlyrgu6gUKSIONP8_lWo2HVzS20T1t-tB0mTb5q0aZIlabsW_wBPspOIJxUPMhgMUZBd9LzTjuJhTLzIDmN42kns_gPh8eA9eJfPi4apFMmn8HshMoWnkwwLeZqhOZQUcAWlIU6gAlQIFOdIUqE4rQ15yrsajWeevARy7cGzz8jpfnK-BHfAbSMIXD-NYarjpgwzUFTDhDb0OuOU6vQxZRAYXwA4BOA3ADszSZwQWKZNaSjDMjTKKTSLTgsB5WlOoygoEApF_ZiJydnpjrwwxzMn8M9MRPeUTh_aweuQC8d5t5UTWbGb3ZIrTaLZlXqFSpWU1pqBNJlmkzAkUpwU6s2RtFIdtVaWreJaqVfMib7YJyxtbdWUbd9U6gzeauSNJlVy2yRThY1lS-w6ptqv9ZRG3mpSG6bewDMfQ0mOpwjIagKqqayK0qp2wUdlUUJTyTZNUBQhMAehW44LbVNLuJ6jmxZMOLpumTZ8qqgq9P3vIXA4C05mr0dC8ZuLSAK5ewefS0ci0XhscT6BnM-Cd3NTxAur77-e_T16-Gm3jJz8uoEczGHVcqdY2Gi5vUk-y3sBafe2YC2rS4oh05XhuuTkCl7T6ZdUDM8waWI7DLbD1w7Csb6vWKmun2p7zsiH3lkYPJ9H9i_9x2WvomAnuiRKOd4ctvjqsMxpWXu8MZJYsVzRaWL4SO4UJzrZkVk71-FcdS8Kvl1Gzhd2X_x8--bD8en6Sez-cAmzMb-2aWFDfLBc3yTyMp9VBoPOuEpaXZ4f1h9jan_VJaVsZi-OHE91BfkH0",
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
          "project_link": "https://jcp.jioconnect.com/jcpnewbeta/",
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
          "project_link": "https://play.google.com/store/apps/details?id=com.inn.nvengineer&pcampaignid=web_share",
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
          "project_link": "https://jcp.jioconnect.com/jcpnewbeta/",
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
          "project_link": "https://jcp.jioconnect.com/jcpnewbeta/",
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
          "project_link": "https://jcp.jioconnect.com/jcpnewbeta/",
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
          "project_link": "http://www.pixtrans.com/",
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
          "project_link": "http://www.hire4hotel.com",
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
          "project_link": "https://www.xovient.com",
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
    console.log('isPlatformBrowser:', isPlatformBrowser(this.platformId));

    if (isPlatformBrowser(this.platformId)) {


      this.breakpointObserver.observe([
        Breakpoints.Handset,      // mobile
        Breakpoints.Tablet,       // tablet
        Breakpoints.Web           // desktop
      ]).subscribe(result => {

        // 🔁 Clear existing SVG
        d3.select(this.timelineContainer.nativeElement).selectAll('*').remove();

        // 🔁 Redraw based on matched breakpoint
        const breakpoints = result.breakpoints;
        if (breakpoints[Breakpoints.HandsetPortrait] || breakpoints[Breakpoints.HandsetLandscape]) {
          console.log('Mobile matched');
          this.drawTimeline('mobile');
        } else if (breakpoints[Breakpoints.TabletPortrait] || breakpoints[Breakpoints.TabletLandscape]) {
          console.log('Tablet matched');
          this.drawTimeline('tablet');
        } else if (breakpoints[Breakpoints.WebPortrait] || breakpoints[Breakpoints.WebLandscape]) {
          console.log('Desktop matched');
          this.drawHorizontalTimeline();
        } else {
          console.log('Fallback');
          this.drawTimeline('desktop');
        }
      });


    }
  }

  private drawTimeline(device: 'mobile' | 'tablet' | 'desktop' = 'desktop'): void {
    const container = this.timelineContainer.nativeElement;
    // const width = container.offsetWidth + 200;
    let baseWidth = container.offsetWidth;

    // 🔧 Adjust internal drawing width based on device
    let width: number;
    switch (device) {
      case 'mobile':
        width = baseWidth; // full width for stacking
        break;
      case 'tablet':
        width = baseWidth + 100;
        break;
      case 'desktop':
      default:
        width = baseWidth + 200;
        break;
    }

    const topPadding = 60;
    const height = this.data.length * 180 + topPadding;
    console.log('Device:', device, '| Container width:', baseWidth, '| SVG viewBox width:', width);

    const svg = d3.select(container)
      .append('svg')
      .attr('width', '100%')
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMin meet');

    this.timelineLineX = width / 2;
    const timelineLineX = this.timelineLineX;

    // Main vertical line
    svg.append('line')
      .attr('x1', timelineLineX)
      .attr('y1', topPadding)
      .attr('x2', timelineLineX)
      .attr('y2', topPadding)
      .attr('stroke', '#ccc')
      .attr('stroke-width', 3)
      .transition()
      .duration(1000)
      .attr('y2', height);
    const self = this;
    const nodes = svg.selectAll('.event')
      .data(this.data)
      .enter()
      .append('g')
      .attr('class', 'event')
      .attr('opacity', 0)
      .attr('transform', (d, i) => `translate(0, ${i * 180 + topPadding})`)
      // .on('click', (event, d) => this.openPopup(d)) // 👈 Click handler
      .on('click', function (event, d) {
        self.handleNodeClick(event, d, this); // 'this' is the SVG element (SVGGElement)
      })
      .transition()
      .delay((d, i) => i * 300)
      .duration(500)
      .attr('opacity', 1);

    const eventGroups = svg.selectAll('.event');

    // Year Dots with 3D effect
    eventGroups.append('circle')
      .attr('cx', timelineLineX)
      .attr('cy', 0)
      .attr('r', 0)
      .attr('fill', (d: any) => d.color)
      .transition()
      .delay((d, i) => i * 300)
      .duration(600)
      .attr('r', 8)
      .style('filter', 'drop-shadow(0px 2px 10px rgba(0, 0, 0, 0.5))');

    // Year Labels Box with 3D effect
    eventGroups.append('path')
      .attr('d', (d, i) => {
        const x = i % 2 === 0 ? timelineLineX - 40 : timelineLineX - 35;
        const y = 70;
        const w = 80;
        const h = 40;
        const r = 10; // curvature
        return `
          M${x},${y + r}
          Q${x},${y} ${x + r},${y}
          H${x + w - r}
          Q${x + w},${y} ${x + w},${y + r}
          L${x + w},${y + h - r}
          Q${x + w},${y + h} ${x + w - r},${y + h}
          H${x + r}
          Q${x},${y + h} ${x},${y + h - r}
          Z
        `;
      })
      .attr('fill', (d: any) => d.color)
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .style('filter', 'drop-shadow(4px 4px 6px rgba(0, 0, 0, 0.3))')
      .style('opacity', 0)
      .transition()
      .delay((d, i) => i * 300 + 300)
      .duration(500)
      .style('opacity', 1);

    // Year Labels with smooth fade in
    eventGroups.append('text')
      .attr('x', (d, i) => i % 2 === 0 ? timelineLineX : timelineLineX - 5)
      .attr('y', 97)
      .attr('text-anchor', 'middle')
      .attr('fill', '#fff')
      .attr('font-size', '18px')
      .style('opacity', 0)
      .text((d: any) => d.year)
      .transition()
      .delay((d, i) => i * 300 + 400)
      .duration(500)
      .style('opacity', 1);



    const layoutConfig = {
      mobile: { offset: 60, iconRadius: 40, borderRadius: 44, iconSize: 40, textMaxWidth: 130 },
      tablet: { offset: 80, iconRadius: 50, borderRadius: 54, iconSize: 50, textMaxWidth: 200 },
      desktop: { offset: 90, iconRadius: 60, borderRadius: 66, iconSize: 50, textMaxWidth: 220 },
    }[device];
    eventGroups.append('circle') // White border behind
      .attr('cx', (d, i) => i % 2 === 0 ? timelineLineX - (layoutConfig.offset + 8) : timelineLineX + layoutConfig.offset)
      .attr('cy', 90)
      .attr('r', 0)
      .attr('fill', '#fff')
      .style('filter', 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2))')
      .transition()
      .delay((d, i) => i * 300 + 400)
      .duration(600)
      .attr('r', layoutConfig.borderRadius);

    eventGroups.append('circle') // Foreground circle with stroke
      .attr('cx', (d, i) => i % 2 === 0 ? timelineLineX - (layoutConfig.offset + 8) : timelineLineX + layoutConfig.offset)
      .attr('cy', 90)
      .attr('r', 0)
      .attr('fill', '#fff')
      .attr('stroke', (d: any) => d.color)
      .attr('stroke-width', 12)
      .style('filter', 'drop-shadow(4px 4px 6px rgba(0, 0, 0, 0.3))')
      .transition()
      .delay((d, i) => i * 300 + 500)
      .duration(600)
      .attr('r', layoutConfig.iconRadius)
      .style('opacity', 1);

    eventGroups.append('image') // Company logo
      .attr('xlink:href', (d: any) => d.icon)
      .attr('x', (d, i) => i % 2 === 0
        ? timelineLineX - (layoutConfig.offset + 8) - layoutConfig.iconSize / 2
        : timelineLineX + layoutConfig.offset - layoutConfig.iconSize / 2)
      .attr('y', 90 - layoutConfig.iconSize / 2)
      .attr('width', layoutConfig.iconSize)
      .attr('height', layoutConfig.iconSize)
      .style('opacity', 0)
      .transition()
      .delay((d, i) => i * 300 + 600)
      .duration(400)
      .style('opacity', 1);

    const layoutConfigTxt = {
      mobile: { offset: 60, textMaxWidth: 100 },
      tablet: { offset: 80, textMaxWidth: 200 },
      desktop: { offset: 90, textMaxWidth: 220 },
    }[device];


    function wrapText(
      textEl: d3.Selection<SVGTextElement, any, any, any>,
      textString: string,
      x: number,
      y: number,
      maxWidth: number,
      lineHeight: number
    ): void {
      const words = textString.split(/\s+/);
      let line: string[] = [];
      let lineNumber = 0;

      let tspan = textEl.append('tspan')
        .attr('x', x)
        .attr('y', y)
        .attr('dy', '0em');

      for (const word of words) {
        line.push(word);
        tspan.text(line.join(' '));

        if (tspan.node()!.getComputedTextLength() > maxWidth) {
          line.pop();
          tspan.text(line.join(' '));
          line = [word];
          lineNumber++;

          tspan = textEl.append('tspan')
            .attr('x', x)
            .attr('y', y)
            .attr('dy', `${lineNumber * lineHeight}px`)
            .text(word);
        }
      }
    }

    eventGroups.append('text')
      .attr('data-type', 'title')
      .attr('font-size', '16px')
      .attr('fill', (d: any) => d.color)
      .style('opacity', 0)
      .each(function (d: any, i) {
        const isLeft = i % 2 === 0;
        const x = isLeft
          ? timelineLineX + (layoutConfigTxt.offset + 10)
          : timelineLineX - (layoutConfigTxt.offset - 25) - layoutConfigTxt.textMaxWidth;
        const y = 80;

        const text = d3.select(this)
          .attr('x', x)
          .attr('y', y)
          .attr('text-anchor', 'start');

        wrapText(text, d.title, x, y, layoutConfigTxt.textMaxWidth, 18);
      })
      .transition()
      .delay((d, i) => i * 300 + 700)
      .duration(400)
      .style('opacity', 1);

    eventGroups.append('text')
      .attr('data-type', 'desc')
      .attr('font-size', '14px')
      .attr('fill', '#667085')
      .style('opacity', 0)
      .each(function (d: any, i) {
        const isLeft = i % 2 === 0;
        const x = isLeft
          ? timelineLineX + layoutConfigTxt.offset + 10
          : timelineLineX - (layoutConfigTxt.offset - 25) - layoutConfigTxt.textMaxWidth;
        const baseY = 80;

        const parentGroup = d3.select(this.parentNode as SVGGElement);
        const titleLines = parentGroup.select('[data-type="title"]').selectAll('tspan').size();
        const y = baseY + titleLines * 18 + 8;

        const text = d3.select(this)
          .attr('x', x)
          .attr('y', y)
          .attr('text-anchor', 'start');

        wrapText(text, d.desc, x, y, layoutConfigTxt.textMaxWidth, 16);
      })
      .transition()
      .delay((d, i) => i * 300 + 800)
      .duration(400)
      .style('opacity', 1);


  }

  private drawHorizontalTimeline(device: 'mobile' | 'tablet' | 'desktop' = 'desktop'): void {
    const container = this.timelineContainer.nativeElement;
    const padding = 0;
    // const spacing = 280;
    const spacing = device === 'mobile' ? 180 : device === 'tablet' ? 240 : 280;
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
      .attr('stroke-width', 15)
      .style('filter', 'drop-shadow(6px 6px 9px rgba(0,0,0,0.2))')
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
