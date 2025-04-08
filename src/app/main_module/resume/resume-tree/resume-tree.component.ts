import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core'; // Import PLATFORM_ID
import * as d3 from 'd3';

@Component({
  selector: 'app-resume-tree',
  templateUrl: './resume-tree.component.html',
  styleUrls: ['./resume-tree.component.scss']
})
export class ResumeTreeComponent implements OnInit, AfterViewInit {
  @ViewChild('treeContainer') private treeContainer: ElementRef | undefined;

  private data = {
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

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    // No D3 code here, as the container is not available yet
  }

  ngAfterViewInit(): void {
    // Ensure this runs only in the browser
    if (isPlatformBrowser(this.platformId)) {
      // Ensure treeContainer is available
      if (this.treeContainer) {
        this.createTree();
      } else {
        console.error('Tree container is not defined!');
      }
    }
  }

  createTree() {
    // Specify the charts’ dimensions. The height is variable, depending on the layout.
    const width = 928;
    const marginTop = 10;
    const marginRight = 120;
    const marginBottom = 10;
    const marginLeft = 120;

    const root: any = d3.hierarchy(this.data);
    const dx = 10;
    const dy = (width * 2 - marginRight - marginLeft) / (1 + root.height);

    // Define the tree layout and the shape for links.
    const tree = d3.tree().size([dx, dy]);
    const diagonal: any = d3.linkHorizontal().x((d: any) => d.y).y((d: any) => d.x);

    // Create the SVG container, a layer for the links and a layer for the nodes.
    const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", dx)
      .attr("viewBox", [-marginLeft, -marginTop, width, dx])
      .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif; user-select: none;");

    const gLink = svg.append("g")
      .attr("fill", "none")
      .attr("stroke", "#555")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1.5);

    const gNode = svg.append("g")
      .attr("cursor", "pointer")
      .attr("pointer-events", "all");

    function update(event: any, source: any) {
      const duration = event?.altKey ? 2500 : 250;
      const nodes = root.descendants().reverse();
      const links = root.links();

      // Compute the new tree layout.
      tree(root);

      let left = root;
      let right = root;
      root.eachBefore((node: any) => {
        if (node.x < left.x) left = node;
        if (node.x > right.x) right = node;
      });

      const height = right.x - left.x + marginTop + marginBottom;

      const transition: any = svg.transition()
        .duration(duration)
        .attr("height", height)
        .attr("viewBox", `${-marginLeft} ${left.x - marginTop} ${width} ${height}`);

      const node = gNode.selectAll("g")
        .data(nodes, (d: any) => d.id);

      const nodeEnter: any = node.enter().append("g")
        .attr("transform", d => `translate(${source.y0},${source.x0})`)
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0)
        .on("click", (event: any, d: any) => {
          d.children = d.children ? null : d._children;
          update(event, d);
        });

      nodeEnter.append("circle")
        .attr("r", 2.5)
        .attr("fill", (d: any) => d._children ? "#555" : "#999")
        .attr("stroke-width", 10);

      nodeEnter.append("text")
        .attr("dy", "0.31em")
        .attr("x", (d: any) => d._children ? -6 : 6)
        .attr("text-anchor", (d: any) => d._children ? "end" : "start")
        .text((d: any) => d.data.name)
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 3)
        .attr("stroke", "white")
        .attr("paint-order", "stroke");

      const nodeUpdate = node.merge(nodeEnter).transition(transition)
        .attr("transform", (d: any) => `translate(${d.y},${d.x})`)
        .attr("fill-opacity", 1)
        .attr("stroke-opacity", 1);

      const nodeExit = node.exit().transition(transition).remove()
        .attr("transform", d => `translate(${source.y},${source.x})`)
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0);

      const link: any = gLink.selectAll("path")
        .data(links, (d: any) => d.target.id);

      const linkEnter = link.enter().append("path")
        .attr("d", (d: any) => {
          const o = [source.y0, source.x0];
          return diagonal({ source: o, target: o });
        });

      link.merge(linkEnter).transition(transition)
        .attr("d", diagonal);

      link.exit().transition(transition).remove()
        .attr("d", (d: any) => {
          const o = [source.y, source.y];
          return diagonal({ source: o, target: o });
        });

      root.eachBefore((d: any) => {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }

    root.x0 = dy / 2;
    root.y0 = 0;
    root.descendants().forEach((d: any, i: any) => {
      d.id = i;
      d._children = d.children;
      if (d.depth && d.data.name.length !== 7) d.children = null;
    });

    update(null, root);

    // Append the svg node to the container element
    this.treeContainer?.nativeElement.appendChild(svg.node());
  }
}
