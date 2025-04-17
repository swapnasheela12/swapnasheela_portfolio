import * as d3 from 'd3';

// infographic-d3.component.ts
import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-infographic-d3',
  standalone: true,
  templateUrl: './infographic-d3.component.html',
  styleUrls: ['./infographic-d3.component.scss']
})
export class InfographicD3Component implements AfterViewInit {
  @ViewChild('infographicSvg', { static: true }) svgRef!: ElementRef<SVGSVGElement>;

  infographicData = [
    { id: 1, number: '01', title: 'INFOGRAPHIC', desc: 'Lorem ipsum dolor sit amet...', color: '#FDD835' },
    { id: 2, number: '02', title: 'INFOGRAPHIC', desc: 'Lorem ipsum dolor sit amet...', color: '#FB8C00' },
    { id: 3, number: '03', title: 'INFOGRAPHIC', desc: 'Lorem ipsum dolor sit amet...', color: '#E53935' },
    { id: 4, number: '04', title: 'INFOGRAPHIC', desc: 'Lorem ipsum dolor sit amet...', color: '#43A047' },
    { id: 5, number: '05', title: 'INFOGRAPHIC', desc: 'Lorem ipsum dolor sit amet...', color: '#00ACC1' },
    { id: 6, number: '06', title: 'INFOGRAPHIC', desc: 'Lorem ipsum dolor sit amet...', color: '#1E88E5' }
  ];

  ngAfterViewInit(): void {
    const svg = d3.select(this.svgRef.nativeElement);
    const width = 950;
    const height = this.infographicData.length * 80;
    const bandHeight = 80;
    const chevronWidth = 40;
    const headWidth = 300;

    svg.attr('width', width).attr('height', height);

    // Draw Head Image (to left side)
    svg.append('image')
      .attr('href', '../../../../../assets/image/SVG/humehead.svg')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', headWidth)
      .attr('height', height)
      .attr('opacity', 0.9);

    const groups = svg.selectAll('g.band')
      .data(this.infographicData)
      .enter()
      .append('g')
      .attr('class', 'band')
      .attr('transform', (d, i) => `translate(${headWidth}, ${i * bandHeight})`)
      .style('opacity', 0)
      .transition()
      .delay((d, i) => i * 200)
      .duration(600)
      .style('opacity', 1);

    const bandGroups = svg.selectAll('g.band');

    bandGroups
      .append('path')
      .attr('d', `M0,0 L${width - headWidth - chevronWidth},0 L${width - headWidth},${bandHeight / 2} L${width - headWidth - chevronWidth},${bandHeight} L0,${bandHeight} Z`)
      .attr('fill', (d: any) => d.color);

    bandGroups
      .append('text')
      .attr('x', 20)
      .attr('y', 28)
      .attr('class', 'band-number')
      .style('fill', '#fff')
      .style('font-size', '20px')
      .style('font-weight', 'bold')
      .text((d: any) => d.number);

    bandGroups
      .append('text')
      .attr('x', 80)
      .attr('y', 28)
      .attr('class', 'band-title')
      .style('fill', '#fff')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .text((d: any) => d.title);

    bandGroups
      .append('text')
      .attr('x', 80)
      .attr('y', 48)
      .attr('class', 'band-desc')
      .style('fill', '#fff')
      .style('font-size', '13px')
      .text((d: any) => d.desc);
  }
}