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
    { year: 2025, title: 'UI Lead Assistant Manager', desc: 'EXL Services, USA', icon: '../../../../assets/image/JPG/my-services/exlservices.png', color: '#f44336' },
    { year: 2022, title: 'Freelance Ui Developer', desc: 'Wipro (Topcoder), Global', icon: '../../../../assets/image/JPG/my-services/wiprotopcoder.jpg', color: '#0674bc' },
    { year: 2018, title: 'Deputy Manager Ui Developer', desc: 'Reliance Jio, India', icon: '../../../../assets/image/JPG/my-services/Reliance_Jio.png', color: '#00bcd4' },
    { year: 2017, title: 'Jr Ui Developer', desc: 'Usense Innovative Solutions Pvt. Ltd, India', icon: '../../../../assets/image/JPG/my-services/usense.jpeg', color: '#4caf50' },
    { year: 2016, title: 'Web Developer', desc: 'Elutus Info Technology Pvt Ltd, India', icon: '../../../../assets/image/JPG/my-services/elutus.png', color: '#ff9800' }
  ];

  @ViewChild('timeline', { static: true }) timelineContainer!: ElementRef;

  ngOnInit(): void {
    // Don't access ViewChild here!
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.drawTimeline();
    }
  }
  private drawTimeline(): void {
    const container = this.timelineContainer.nativeElement;
    const width = container.offsetWidth;
    const topPadding = 60; // or 80 depending on your layout
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
      .attr('y2', topPadding) // start at top
      .attr('stroke', '#ccc')
      .attr('stroke-width', 3)
      .transition()
      .duration(1000)
      .attr('y2', height); // animate line growth

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

    // Re-select nodes to apply child transitions
    const eventGroups = svg.selectAll('.event');

    // Year Dots
    eventGroups.append('circle')
      .attr('cx', timelineLineX)
      .attr('cy', 0)
      .attr('r', 0)
      .attr('fill', (d: any) => d.color)
      .transition()
      .delay((d, i) => i * 300)
      .duration(600)
      .attr('r', 12);

    // Year Labels Box
    eventGroups.append('rect')
      .attr('x', timelineLineX - 25)
      .attr('y', 70)
      .attr('width', 50)
      .attr('height', 30)
      .attr('rx', 5)
      .attr('fill', (d: any) => d.color)
      .style('opacity', 0)
      .transition()
      .delay((d, i) => i * 300 + 300)
      .duration(500)
      .style('opacity', 1);

    eventGroups.append('text')
      .attr('x', timelineLineX)
      .attr('y', 90)
      .attr('text-anchor', 'middle')
      .attr('fill', '#fff')
      .attr('font-size', '14px')
      .style('opacity', 0)
      .text((d: any) => d.year)
      .transition()
      .delay((d, i) => i * 300 + 400)
      .duration(500)
      .style('opacity', 1);

    // Icon Circle
    eventGroups.append('circle')
      .attr('cx', (d, i) => i % 2 === 0 ? timelineLineX - 70 : timelineLineX + 70)
      .attr('cy', 85)
      .attr('r', 0)
      .attr('fill', '#fff')
      .attr('stroke', (d: any) => d.color)
      .attr('stroke-width', 9)
      .transition()
      .delay((d, i) => i * 300 + 500)
      .duration(600)
      .attr('r', 50);

    // // Icon Text
    // eventGroups.append('text')
    //   .attr('x', (d, i) => i % 2 === 0 ? timelineLineX - 70 : timelineLineX + 70)
    //   .attr('y', 100)
    //   .attr('text-anchor', 'middle')
    //   .attr('font-size', '38px')
    //   .style('opacity', 0)
    //   .text((d: any) => d.icon)
    //   .transition()
    //   .delay((d, i) => i * 300 + 600)
    //   .duration(400)
    //   .style('opacity', 1);

    // Icon Image
    eventGroups.append('image')
      .attr('xlink:href', (d: any) => d.icon) // use icon as image path
      .attr('x', (d, i) => i % 2 === 0 ? timelineLineX - 90 : timelineLineX + 50) // centered inside 100x100 circle
      .attr('y', 65)
      .attr('width', 40)
      .attr('height', 40)
      .style('opacity', 0)
      .transition()
      .delay((d, i) => i * 300 + 600)
      .duration(400)
      .style('opacity', 1);

    // Title Text
    eventGroups.append('text')
      .attr('x', (d, i) => i % 2 === 0 ? timelineLineX + 90 : timelineLineX - 160)
      .attr('y', 80)
      .attr('font-size', '16px')
      .attr('fill', (d: any) => d.color)
      .style('opacity', 0)
      .text((d: any) => d.title)
      .transition()
      .delay((d, i) => i * 300 + 700)
      .duration(400)
      .style('opacity', 1);

    // Description Text
    eventGroups.append('text')
      .attr('x', (d, i) => i % 2 === 0 ? timelineLineX + 90 : timelineLineX - 160)
      .attr('y', 100)
      .attr('font-size', '12px')
      .attr('fill', '#ccc')
      .style('opacity', 0)
      .text((d: any) => d.desc)
      .transition()
      .delay((d, i) => i * 300 + 800)
      .duration(400)
      .style('opacity', 1);
  }

  // private drawTimeline(): void {
  //   const container = this.timelineContainer.nativeElement;
  //   const width = container.offsetWidth;
  //   const height = this.data.length * 180;

  //   const svg = d3.select(container)
  //     .append('svg')
  //     .attr('width', '100%') // responsive width
  //     .attr('height', height)
  //     .attr('viewBox', `0 0 ${width} ${height}`) // for scaling
  //     .attr('preserveAspectRatio', 'xMidYMin meet');

  //   const timelineLineX = width / 2;

  //   // Main vertical line
  //   svg.append('line')
  //     .attr('x1', timelineLineX)
  //     .attr('y1', 0)
  //     .attr('x2', timelineLineX)
  //     .attr('y2', height)
  //     .attr('stroke', '#ccc')
  //     .attr('stroke-width', 3);

  //   const nodes = svg.selectAll('.event')
  //     .data(this.data)
  //     .enter()
  //     .append('g')
  //     .attr('class', 'event')
  //     .attr('transform', (d, i) => `translate(0, ${i * 180})`);



  //   // Year dots
  //   nodes.append('circle')
  //     .attr('cx', timelineLineX)
  //     .attr('cy', 0)
  //     .attr('r', 12)
  //     .attr('fill', d => d.color);

  //   // Year rect
  //   nodes.append('rect')
  //     // .attr('x', timelineLineX)
  //     .attr('x', (d, i) => i % 2 === 0 ? timelineLineX - 20 : timelineLineX - 20)
  //     .attr('y', 70)
  //     .attr('width', 50)
  //     .attr('height', 30)
  //     .attr('rx', 5)
  //     .attr('fill', d => d.color);

  //   // Year Labels
  //   nodes.append('text')
  //     .attr('x', timelineLineX)
  //     .attr('y', 90)
  //     .attr('text-anchor', 'middle')
  //     .attr('fill', '#fff')
  //     .attr('font-size', '14px')
  //     .text(d => d.year);

  //   // // Timeline content blocks
  //   // nodes.append('rect')
  //   //   .attr('x', (d, i) => i % 2 === 0 ? timelineLineX - 280 : timelineLineX + 40)
  //   //   .attr('y', 10)
  //   //   .attr('width', 240)
  //   //   .attr('height', 100)
  //   //   .attr('fill', d => d.color)
  //   //   .attr('rx', 20);

  //   // Icon Circles
  //   nodes.append('circle')
  //     // .attr('cx', (d, i) => i % 2 === 0 ? timelineLineX - 40 : timelineLineX + 320)
  //     .attr('cx', (d, i) => i % 2 === 0 ? timelineLineX - 70 : timelineLineX + 80)
  //     .attr('cy', 85)
  //     .attr('r', 50)
  //     .attr('fill', '#fff')
  //     .attr('stroke', d => d.color)
  //     .attr('stroke-width', 9);

  //   // Icons
  //   nodes.append('text')
  //     // attr('x', (d, i) => i % 2 === 0 ? timelineLineX - 40 : timelineLineX + 320)
  //     .attr('x', (d, i) => i % 2 === 0 ? timelineLineX - 70 : timelineLineX + 80)
  //     .attr('y', 100)
  //     .attr('text-anchor', 'middle')
  //     .attr('font-size', '38px')
  //     .text(d => d.icon);

  //   // Titles
  //   nodes.append('text')
  //     // .attr('x', (d, i) => i % 2 === 0 ? timelineLineX - 260 : timelineLineX + 60)
  //     // .attr('x', (d, i) => i % 2 === 0 ? timelineLineX + 60 : timelineLineX - 260)
  //     .attr('x', (d, i) => i % 2 === 0 ? timelineLineX + 100 : timelineLineX - 160) // 160px away from center
  //     .attr('y', 80)
  //     .attr('font-size', '16px')
  //     .attr('fill', d => d.color)
  //     .text(d => d.title);

  //   // Descriptions
  //   nodes.append('text')
  //     // .attr('x', (d, i) => i % 2 === 0 ? timelineLineX - 260 : timelineLineX + 60)
  //     // .attr('x', (d, i) => i % 2 === 0 ? timelineLineX + 60 : timelineLineX - 260)
  //     .attr('x', (d, i) => i % 2 === 0 ? timelineLineX + 100 : timelineLineX - 160) // 160px away from center
  //     .attr('y', 100)
  //     .attr('font-size', '12px')
  //     .attr('fill', '#ccc')
  //     .text(d => d.desc);
  // }

}
