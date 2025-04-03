import * as d3 from 'd3';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-resume-flowchart',
  standalone: true,
  templateUrl: './resume-flowchart.component.html',
  styleUrls: ['./resume-flowchart.component.scss']
})
export class ResumeFlowchartComponent implements OnInit {
  @ViewChild('chart', { static: true }) private chartContainer!: ElementRef;

  private data = {
    name: 'Root',
    children: [
      {
        name: 'Child 1',
        children: [
          { name: 'Grandchild 1' },
          { name: 'Grandchild 2' }
        ]
      },
      { name: 'Child 2' }
    ]
  };

  private svg: any;
  private treeLayout: any;
  private nodes: any;
  private links: any;

  constructor() { }

  ngOnInit(): void {
    this.createChart();
    this.updateChart(this.data);
  }
  createChart(): void {
    const element = this.chartContainer.nativeElement;
    const width = 600;
    const height = 400;

    this.svg = d3
      .select(element)
      .append('svg') // Append an SVG inside the container
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(50,20)'); // Add margin

    this.treeLayout = d3.tree().size([height - 40, width - 100]);
  }
  updateChart(data: any): void {
    const root = d3.hierarchy(data);
    this.nodes = this.treeLayout(root);
    this.links = this.nodes.links();

    // Remove previous elements before updating
    this.svg.selectAll('.link').remove();
    this.svg.selectAll('.node').remove();

    // Draw Links
    this.svg
      .selectAll('.link')
      .data(this.links)
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('fill', 'none')
      .attr('stroke', '#ccc')
      .attr('d', d3.linkHorizontal()
        .x((d: any) => d.target.y)
        .y((d: any) => d.target.x)
      );

    // Draw Nodes
    const node = this.svg
      .selectAll('.node')
      .data(this.nodes.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', (d: any) => `translate(${d.y},${d.x})`)
      .on('click', this.click);

    node.append('circle')
      .attr('r', 10)
      .attr('fill', '#fff')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2);

    node.append('text')
      .attr('dy', '.35em')
      .attr('x', 15)
      .text((d: any) => d.data.name);
  }
  click = (event: any, d: any) => {
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
    this.updateChart(this.data);
  };

}
