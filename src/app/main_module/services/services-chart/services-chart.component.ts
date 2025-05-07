// import * as Highcharts from 'highcharts';
// import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
// import { CommonModule, isPlatformBrowser } from '@angular/common';
// import { HighchartsChartModule } from 'highcharts-angular';

// @Component({
//   selector: 'app-services-chart',
//   standalone: true,
//   imports: [CommonModule, HighchartsChartModule],
//   templateUrl: './services-chart.component.html',
//   styleUrls: ['./services-chart.component.scss']
// })
// export class ServicesChartComponent implements OnInit {
//   Highcharts: typeof Highcharts = Highcharts;

//   chartOptions: Highcharts.Options = {
//     chart: {
//       type: 'column',
//       backgroundColor: 'transparent'
//     },
//     title: {
//       text: 'Front-End Developer Services'
//     },
//     xAxis: {
//       categories: [
//         'Responsive Design', 'Angular/React Dev', 'Data Viz', 'UI/UX',
//         'Performance', 'Git & CI/CD', 'Map & Animation', 'Component Styling'
//       ],
//       labels: {
//         style: {
//           fontSize: '13px'
//         }
//       }
//     },
//     yAxis: {
//       title: {
//         text: 'Expertise Level'
//       },
//       max: 10
//     },
//     tooltip: {
//       pointFormat: '<b>{point.y}/10</b> - {point.customDetail}'
//     },
//     series: [{
//       name: 'Proficiency',
//       type: 'column',
//       colorByPoint: true,
//       data: [
//         { y: 9, customDetail: 'Responsive, Mobile-first layouts' } as any,
//         { y: 9, customDetail: 'Angular 19+, React.js apps' } as any,
//         { y: 8, customDetail: 'D3.js, Highcharts, SVGs' } as any,
//         { y: 7, customDetail: 'Figma to code, animations' } as any,
//         { y: 8, customDetail: 'Lighthouse, lazy loading' } as any,
//         { y: 9, customDetail: 'GitHub, GitLab CI/CD' } as any,
//         { y: 8, customDetail: 'Leaflet, animated flights' } as any,
//         { y: 9, customDetail: 'Material, Bootstrap, SCSS' } as any
//       ]
//     }]
//   };

//   constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

//   ngOnInit(): void {
//     // Optional: put logic here if needed, but chartOptions is already set
//     // if (isPlatformBrowser(this.platformId)) { ... }
//   }
// }



import * as Highcharts from 'highcharts';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'app-services-chart',
  standalone: true,
  imports: [CommonModule, HighchartsChartModule],
  templateUrl: './services-chart.component.html',
  styleUrls: ['./services-chart.component.scss']
})
export class ServicesChartComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {}; // initialize with empty object

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.chartOptions = {
        chart: {
          type: 'column',
          backgroundColor: 'transparent'
        },
        title: {
          text: 'Front-End Developer Services'
        },
        xAxis: {
          categories: [
            'Responsive Design', 'Angular/React Dev', 'Data Viz', 'UI/UX',
            'Performance', 'Git & CI/CD', 'Map & Animation', 'Component Styling'
          ],
          labels: {
            style: {
              fontSize: '13px'
            }
          }
        },
        yAxis: {
          title: {
            text: 'Expertise Level'
          },
          max: 10
        },
        tooltip: {
          pointFormat: '<b>{point.y}/10</b> - {point.customDetail}'
        },
        series: [{
          name: 'Proficiency',
          type: 'column',
          colorByPoint: true,
          data: [
            { y: 9, customDetail: 'Responsive, Mobile-first layouts' } as any,
            { y: 9, customDetail: 'Angular 19+, React.js apps' } as any,
            { y: 8, customDetail: 'D3.js, Highcharts, SVGs' } as any,
            { y: 7, customDetail: 'Figma to code, animations' } as any,
            { y: 8, customDetail: 'Lighthouse, lazy loading' } as any,
            { y: 9, customDetail: 'GitHub, GitLab CI/CD' } as any,
            { y: 8, customDetail: 'Leaflet, animated flights' } as any,
            { y: 9, customDetail: 'Material, Bootstrap, SCSS' } as any
          ]
        }]
      };
    }
  }
}
