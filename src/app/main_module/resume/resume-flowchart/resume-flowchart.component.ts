import * as d3 from 'd3';

import { AfterViewInit, Component, ElementRef, OnChanges, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-resume-flowchart',
  standalone: true,
  templateUrl: './resume-flowchart.component.html',
  styleUrls: ['./resume-flowchart.component.scss']
})
export class ResumeFlowchartComponent implements AfterViewInit, OnChanges {

  @ViewChild('treeContainer', { static: false }) private chartContainer: ElementRef | undefined;
  private rootData: any;

  constructor() { }

  ngOnInit(): void {
    // Any initialization that doesn't require DOM interaction
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Handle changes if necessary
  }

  ngAfterViewInit() {
    this.createTreeChart(); // Ensure chart is created after view is initialized
  }

  private createTreeChart() {
    // Example data for the tree
    this.rootData = {
      name: 'Parent',
      children: [
        {
          name: 'Child 1',
          children: [{ name: 'Grandchild 1.1' }, { name: 'Grandchild 1.2' }]
        },
        { name: 'Child 2' },
      ]
    };

    const width = 600;
    const height = 400;
    const margin = { top: 10, right: 90, bottom: 30, left: 90 };

    // Ensure the chart is drawn only once
    if (this.chartContainer?.nativeElement && !this.chartContainer.nativeElement.querySelector('svg')) {
      const svg = d3.select(this.chartContainer.nativeElement)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      const root = d3.hierarchy(this.rootData);
      const treeLayout = d3.tree().size([height, width - 160]);

      treeLayout(root);

      // Links
      svg.selectAll('.link')
        .data(root.links())
        .enter().append('line')
        .attr('class', 'link')
        .attr('x1', (d: any) => d.source.y)
        .attr('y1', (d: any) => d.source.x)
        .attr('x2', (d: any) => d.target.y)
        .attr('y2', (d: any) => d.target.x)
        .attr('stroke', '#ccc')
        .attr('stroke-width', 2);

      // Nodes
      const node = svg.selectAll('.node')
        .data(root.descendants())
        .enter().append('g')
        .attr('class', 'node')
        .attr('transform', (d: any) => `translate(${d.y},${d.x})`)
        .on('click', (event, d) => this.onNodeClick(event, d));

      node.append('circle')
        .attr('r', 10)
        .attr('fill', '#69b3a2');

      node.append('text')
        .attr('dx', 12)
        .attr('dy', 3)
        .text((d: any) => d.data.name);
    } else {
      console.error('Tree container is not available or SVG already exists!');
    }
  }

  private onNodeClick(event: any, d: any) {
    // Prevent event propagation
    event.stopPropagation();

    // Toggle the node expansion
    if (d.children) {
      // Collapse node
      d._children = d.children;
      d.children = null;
    } else {
      // Expand node
      d.children = d._children;
      d._children = null;
    }

    // Re-render the tree
    this.createTreeChart();
  }
}
