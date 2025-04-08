import * as d3 from 'd3';
import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, Inject, PLATFORM_ID, AfterViewChecked } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-resume-flowchart',
  standalone: true,
  templateUrl: './resume-flowchart.component.html',
  styleUrls: ['./resume-flowchart.component.scss']
})
export class ResumeFlowchartComponent implements OnInit, AfterViewInit, OnChanges, AfterViewChecked {
  @Input() data: any = {
    name: "Resume",
    children: [
      {
        name: "Education",
        children: [
          {
            name: "Bachelor's Degree",
            children: [
              {
                name: "University of XYZ",
                children: [
                  { name: "Graduation: 2022" }
                ]
              }
            ]
          },
          {
            name: "Master's Degree",
            children: [
              { name: "University of ABC" },
              { name: "Graduation: 2024" }
            ]
          }
        ]
      },
      {
        name: "Work Experience",
        children: [
          {
            name: "Software Engineer",
            children: [
              {
                name: "Company XYZ",
                children: [
                  { name: "Jan 2022 - Present" }
                ]
              }
            ]
          },
          {
            name: "Intern",
            children: [
              {
                name: "Company ABC",
                children: [
                  { name: "June 2021 - Aug 2021" }
                ]
              }
            ]
          }
        ]
      },
      {
        name: "Skills",
        children: [
          { name: "JavaScript" },
          { name: "TypeScript" },
          { name: "Angular" },
          { name: "D3.js" }
        ]
      }
    ]
  };

  svg: any;
  treeLayout: any;
  g: any;
  duration = 750;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Wait for the browser environment and initialize the SVG and tree layout
      this.createSvg();
      this.createTreeLayout();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (isPlatformBrowser(this.platformId) && changes['data'] && this.data) {
      setTimeout(() => {
        this.update(this.data);
      }, 100);
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Manually trigger change detection if necessary
      this.cdr.detectChanges();
    }
  }

  ngAfterViewChecked(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Ensure the flowchart is drawn after view is checked
      this.update(this.data);
    }
  }

  createSvg(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Check if SVG already exists, if not, create a new one
      const container = d3.select('#tree-container');
      if (!this.svg) {
        this.svg = container.append('svg')
          .attr('width', '100%')
          .attr('height', 500)
          .style('border', '1px solid black');  // Added border for visibility

        this.g = this.svg.append('g')
          .attr('transform', 'translate(50, 50)');
      }
    }
  }

  createTreeLayout(): void {
    if (isPlatformBrowser(this.platformId) && !this.treeLayout) {
      this.treeLayout = d3.tree().size([400, 400]);
    }
  }

  update(sourceData: any): void {
    if (isPlatformBrowser(this.platformId)) {
      const treeData = d3.hierarchy(sourceData);
      treeData.descendants().forEach((d: any) => {
        d._children = d.children;
        if (d.depth !== 0 && !d.children) {  // Collapse non-root nodes
          d.children = null;
        }
      });

      const treeNodes = this.treeLayout(treeData);
      const nodes = treeNodes.descendants();
      const links = treeNodes.links();

      // Create or update nodes
      const node = this.g.selectAll('.node')
        .data(nodes, (d: any) => d.id || (d.id = d.data.name));

      const nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr('transform', (d: any) => `translate(${sourceData.y0 || 0}, ${sourceData.x0 || 0})`)
        .on('click', (event: any, d: any) => {
          this.toggleChildren(d);  // Toggle on click
        });

      nodeEnter.append('circle')
        .attr('r', 10)
        .style('fill', '#fff')
        .style('stroke', 'steelblue')
        .style('stroke-width', '3px');

      nodeEnter.append('text')
        .attr('x', (d: any) => d.children || d._children ? -15 : 15)
        .attr('dy', '.35em')
        .attr('text-anchor', (d: any) => d.children || d._children ? 'end' : 'start')
        .text((d: any) => d.data.name);

      const nodeUpdate = nodeEnter.merge(node);
      nodeUpdate.transition()
        .duration(this.duration)
        .attr('transform', (d: any) => `translate(${d.y}, ${d.x})`);

      // Create or update links
      const link = this.g.selectAll('.link')
        .data(links, (d: any) => d.target.id);

      const linkEnter = link.enter().insert('path', '.node')
        .attr('class', 'link')
        .attr('d', (d: any) => {
          const o = { x: sourceData.x0 || 0, y: sourceData.y0 || 0 };
          return `M${o.y},${o.x}C${o.y + 50},${o.x} ${o.y + 50},${o.x} ${d.target.y},${d.target.x}`;
        });

      linkEnter.merge(link)
        .transition()
        .duration(this.duration)
        .attr('d', (d: any) => {
          return `M${d.source.y},${d.source.x}C${(d.source.y + d.target.y) / 2},${d.source.x} ${(d.source.y + d.target.y) / 2},${d.target.x} ${d.target.y},${d.target.x}`;
        });

      node.exit().transition()
        .duration(this.duration)
        .attr('transform', (d: any) => `translate(${sourceData.y}, ${sourceData.x})`)
        .remove();

      link.exit().transition()
        .duration(this.duration)
        .attr('d', (d: any) => {
          const o = { x: sourceData.x, y: sourceData.y };
          return `M${o.y},${o.x}C${o.y + 50},${o.x} ${o.y + 50},${o.x} ${o.y},${o.x}`;
        })
        .remove();

      nodes.forEach((d: any) => {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }
  }

  toggleChildren(d: any): void {
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }

    this.update(d);
  }
}
