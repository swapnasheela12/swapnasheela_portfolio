import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as d3 from 'd3';

@Component({
  selector: 'app-resume-timeline',
  standalone: true,
  templateUrl: './resume-timeline.component.html',
  styleUrls: ['./resume-timeline.component.scss']
})
export class ResumeTimelineComponent implements OnInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  private data = [
    { id: 1, year: 2025, title: 'UI Lead Assistant Manager', desc: 'EXL Services, USA', icon: '../../../../assets/image/JPG/my-services/exlservices.png', color: '#fd853a' },
    { id: 2, year: 2022, title: 'Freelance Ui Developer', desc: 'Wipro (Topcoder), Global', icon: '../../../../assets/image/JPG/my-services/wiprotopcoder.jpg', color: '#fd853a' },
    { id: 3, year: 2018, title: 'Deputy Manager Ui Developer', desc: 'Reliance Jio, India', icon: '../../../../assets/image/JPG/my-services/Reliance_Jio.png', color: '#fd853a' },
    { id: 4, year: 2017, title: 'Jr Ui Developer', desc: 'Usense Innovative Solutions Pvt. Ltd, India', icon: '../../../../assets/image/JPG/my-services/usense.jpeg', color: '#fd853a' },
    { id: 5, year: 2016, title: 'Web Developer', desc: 'Elutus Info Technology Pvt Ltd, India', icon: '../../../../assets/image/JPG/my-services/elutus.png', color: '#fd853a' }
  ];

  @ViewChild('timeline', { static: true }) timelineContainer!: ElementRef;

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.drawTimeline();
    }
  }

  private drawTimeline(): void {
    const container = this.timelineContainer.nativeElement;
    const width = container.offsetWidth;
    const topPadding = 60;
    const height = this.data.length * 180 + topPadding;

    const svg = d3.select(container)
      .append('svg')
      .attr('width', '100%')
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMin meet');

    const timelineLineX = width / 2;

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

    const nodes = svg.selectAll('.event')
      .data(this.data)
      .enter()
      .append('g')
      .attr('class', 'event')
      .attr('opacity', 0)
      .attr('transform', (d, i) => `translate(0, ${i * 180 + topPadding})`)
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

    // White border circle (slightly larger, behind the main one)
    eventGroups.append('circle')
      .attr('cx', (d, i) => i % 2 === 0 ? timelineLineX - 90 : timelineLineX + 90)
      .attr('cy', 90)
      .attr('r', 0)
      .attr('fill', '#fff')
      .style('filter', 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2))')
      .transition()
      .delay((d, i) => i * 300 + 400)
      .duration(600)
      .attr('r', 66); // Slightly larger than main circle (60 + stroke-width)

    // Main icon circle (on top, with stroke and shadow)
    eventGroups.append('circle')
      .attr('cx', (d, i) => i % 2 === 0 ? timelineLineX - 90 : timelineLineX + 90)
      .attr('cy', 90)
      .attr('r', 0)
      .attr('fill', '#fff')
      .attr('stroke', (d: any) => d.color)
      .attr('stroke-width', 12)
      .style('filter', 'drop-shadow(4px 4px 6px rgba(0, 0, 0, 0.3))')
      .transition()
      .delay((d, i) => i * 300 + 500)
      .duration(600)
      .attr('r', 60)
      .style('opacity', 1);


    // Icon Image with fade-in animation
    eventGroups.append('image')
      .attr('xlink:href', (d: any) => d.icon)
      .attr('x', (d, i) => i % 2 === 0 ? timelineLineX - 115 : timelineLineX + 65)
      .attr('y', 65)
      .attr('width', 50)
      .attr('height', 50)
      .style('opacity', 0)
      .transition()
      .delay((d, i) => i * 300 + 600)
      .duration(400)
      .style('opacity', 1);

    // Title Text with smooth fade-in animation
    eventGroups.append('text')
      .attr('x', (d, i) => i % 2 === 0 ? timelineLineX + 90 : timelineLineX - 260)
      .attr('y', 80)
      .attr('font-size', '16px')
      .attr('fill', (d: any) => d.color)
      .style('opacity', 0)
      .text((d: any) => d.title)
      .transition()
      .delay((d, i) => i * 300 + 700)
      .duration(400)
      .style('opacity', 1);

    // Description Text with fade-in
    eventGroups.append('text')
      .attr('x', (d, i) => i % 2 === 0 ? timelineLineX + 90 : timelineLineX - 260)
      .attr('y', 100)
      .attr('font-size', '14px')
      .attr('fill', '#667085')
      .style('opacity', 0)
      .each(function (d: any, i) {
        const textEl = d3.select(this);
        const words = d.desc.split(/\s+/);
        const lineHeight = 14; // approx line height in px
        const maxWidth = 180;

        let line: string[] = [];
        let lineNumber = 0;
        let tspan = textEl.append('tspan')
          .attr('x', i % 2 === 0 ? timelineLineX + 90 : timelineLineX - 260)
          .attr('y', 100)
          .attr('dy', '0em');

        for (let word of words) {
          line.push(word);
          tspan.text(line.join(' '));

          if (tspan.node()!.getComputedTextLength() > maxWidth) {
            line.pop();
            tspan.text(line.join(' '));
            line = [word];
            lineNumber++;

            tspan = textEl.append('tspan')
              .attr('x', i % 2 === 0 ? timelineLineX + 90 : timelineLineX - 260)
              .attr('y', 100)
              .attr('dy', `${lineHeight}px`)
              .text(word);
          }
        }
      })
      .transition()
      .delay((d, i) => i * 300 + 800)
      .duration(400)
      .style('opacity', 1);

  }
}
