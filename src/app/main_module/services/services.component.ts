import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

import { CommonModule } from '@angular/common';
import { ServicesChartComponent } from './services-chart/services-chart.component';

@Component({
    selector: 'app-services',
    imports: [CommonModule, ServicesChartComponent],
    standalone: true,
    templateUrl: './services.component.html',
    styleUrls: ['./services.component.scss'],
    animations: [
        trigger('fadeIn', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('800ms ease-in', style({ opacity: 1 }))
            ])
        ]),
        trigger('slideInUp', [
            transition(':enter', [
                style({ transform: 'translateY(30px)', opacity: 0 }),
                animate('600ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
            ])
        ])
    ]
})
export class ServicesComponent implements OnInit {
    services = [
        { icon: '🔹', title: 'Front-End Development', description: 'I specialize in building high-performance, scalable, and interactive web applications using Angular 18, TypeScript, and Bootstrap. My goal is to create smooth and engaging user experiences.' },
        { icon: '🎨', title: 'UI/UX Design', description: 'Transforming designs into functional and aesthetic interfaI transform design mockups from Figma, Adobe XD, or Sketch into pixel-perfect, fully functional websites. I focus on consistency, usability, and accessibility to enhance user interaction.' },
        { icon: '📱', title: 'Responsive Design', description: 'With expertise in Bootstrap and SCSS, I ensure that websites are fully responsive across all devices—desktops, tablets, and mobiles—without compromising performance or aesthetics.Ensuring mobile-friendly and cross-browser compatibility.' },
        { icon: '⚡', title: 'Performance Optimization', description: 'I optimize loading speed, animations, and browser performance to provide seamless user interactions. Techniques include: ✔️ Minifying CSS & JavaScript✔️ Lazy Loading & Image Optimization✔️ Caching Strategies' },
        { icon: '🔗', title: 'API Integration', description: 'I seamlessly integrate RESTful APIs to ensure dynamic data handling and real-time updates in web applications. This includes:✔️ Fetching & displaying data efficiently✔️ Secure authentication handling✔️ Optimized state management' },
        { icon: '🛠️', title: 'Tech Stack', description: '✅ Languages & Frameworks: Angular, TypeScript, JavaScript, HTML5, CSS3, SCSS, Bootstrap✅ Tools & Platforms: Git, GitHub, VS Code, Figma, Firebase✅ Performance & SEO: Lighthouse Audits, Web Vitals, Accessibility Compliance' }
    ];
    constructor() { }

    ngOnInit() {
    }

}
