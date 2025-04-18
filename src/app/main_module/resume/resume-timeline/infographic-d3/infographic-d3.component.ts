// import * as d3 from 'd3';

// // infographic-d3.component.ts
// import {
//   AfterViewInit,
//   Component,
//   ElementRef,
//   ViewChild
// } from '@angular/core';

// @Component({
//   selector: 'app-infographic-d3',
//   standalone: true,
//   templateUrl: './infographic-d3.component.html',
//   styleUrls: ['./infographic-d3.component.scss']
// })
// export class InfographicD3Component implements AfterViewInit {
//   @ViewChild('infographicSvg', { static: true }) svgRef!: ElementRef<SVGSVGElement>;

//   infographicData = [
//     { id: 1, number: '01', title: 'INFOGRAPHIC', desc: 'Lorem ipsum dolor sit amet...', color: '#FDD835' },
//     { id: 2, number: '02', title: 'INFOGRAPHIC', desc: 'Lorem ipsum dolor sit amet...', color: '#FB8C00' },
//     { id: 3, number: '03', title: 'INFOGRAPHIC', desc: 'Lorem ipsum dolor sit amet...', color: '#E53935' },
//     { id: 4, number: '04', title: 'INFOGRAPHIC', desc: 'Lorem ipsum dolor sit amet...', color: '#43A047' },
//     { id: 5, number: '05', title: 'INFOGRAPHIC', desc: 'Lorem ipsum dolor sit amet...', color: '#00ACC1' },
//     { id: 6, number: '06', title: 'INFOGRAPHIC', desc: 'Lorem ipsum dolor sit amet...', color: '#1E88E5' }
//   ];

//   ngAfterViewInit(): void {
//     const svg = d3.select(this.svgRef.nativeElement);
//     const width = 950;
//     const height = this.infographicData.length * 80;
//     const bandHeight = 80;
//     const chevronWidth = 40;
//     const headWidth = 300;

//     svg.attr('width', width).attr('height', height);

//     // Draw Head Image (to left side)
//     svg.append('image')
//       .attr('href', '../../../../../assets/image/SVG/humehead.svg')
//       .attr('x', 0)
//       .attr('y', 0)
//       .attr('width', headWidth)
//       .attr('height', height)
//       .attr('opacity', 0.9);

//     const groups = svg.selectAll('g.band')
//       .data(this.infographicData)
//       .enter()
//       .append('g')
//       .attr('class', 'band')
//       .attr('transform', (d, i) => `translate(${headWidth}, ${i * bandHeight})`)
//       .style('opacity', 0)
//       .transition()
//       .delay((d, i) => i * 200)
//       .duration(600)
//       .style('opacity', 1);

//     const bandGroups = svg.selectAll('g.band');

//     // CURVED CONNECTORS using path instead of line
//     svg.selectAll('path.connector')
//       .data(this.infographicData)
//       .enter()
//       .append('path')
//       .attr('class', 'connector')
//       .attr('fill', 'none')
//       .attr('stroke', d => d.color)
//       .attr('stroke-width', 3)
//       .attr('stroke-linecap', 'round')
//       .attr('d', (d, i) => {
//         const y = i * bandHeight + bandHeight / 2;
//         const x1 = headWidth - 10;
//         const x2 = headWidth;
//         const x3 = headWidth + 30;
//         const x4 = headWidth + 60;
//         return `M${x1},${y} C${x2},${y} ${x3},${y} ${x4},${y}`;
//       })
//       .attr('opacity', 0)
//       .transition()
//       .delay((d, i) => i * 250)
//       .duration(600)
//       .attr('opacity', 1);

//     bandGroups
//       .append('path')
//       .attr('d', `M0,0 L${width - headWidth - chevronWidth},0 L${width - headWidth},${bandHeight / 2} L${width - headWidth - chevronWidth},${bandHeight} L0,${bandHeight} Z`)
//       .attr('fill', (d: any) => d.color);

//     bandGroups
//       .append('text')
//       .attr('x', 20)
//       .attr('y', 28)
//       .attr('class', 'band-number')
//       .style('fill', '#fff')
//       .style('font-size', '20px')
//       .style('font-weight', 'bold')
//       .text((d: any) => d.number);

//     bandGroups
//       .append('text')
//       .attr('x', 80)
//       .attr('y', 28)
//       .attr('class', 'band-title')
//       .style('fill', '#fff')
//       .style('font-size', '16px')
//       .style('font-weight', 'bold')
//       .text((d: any) => d.title);

//     bandGroups
//       .append('text')
//       .attr('x', 80)
//       .attr('y', 48)
//       .attr('class', 'band-desc')
//       .style('fill', '#fff')
//       .style('font-size', '13px')
//       .text((d: any) => d.desc);
//   }
// }

import * as d3 from 'd3';

// infographic-d3.component.ts
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-infographic-d3',
  standalone: true,
  templateUrl: './infographic-d3.component.html',
  styleUrls: ['./infographic-d3.component.scss']
})
export class InfographicD3Component implements AfterViewInit {
  @ViewChild('infographicSvg', { static: true }) svgRef!: ElementRef<SVGSVGElement>;

  treeData = {
    name: 'Human Head',
    color: '#1E88E5',
    children: [
      { name: '01 INFOGRAPHIC', desc: 'Lorem ipsum dolor sit amet...', color: '#FDD835' },
      { name: '02 INFOGRAPHIC', desc: 'Lorem ipsum dolor sit amet...', color: '#FB8C00' },
      { name: '03 INFOGRAPHIC', desc: 'Lorem ipsum dolor sit amet...', color: '#E53935' },
      { name: '04 INFOGRAPHIC', desc: 'Lorem ipsum dolor sit amet...', color: '#43A047' },
      { name: '05 INFOGRAPHIC', desc: 'Lorem ipsum dolor sit amet...', color: '#00ACC1' },
      { name: '06 INFOGRAPHIC', desc: 'Lorem ipsum dolor sit amet...', color: '#1E88E5' }
    ]
  };
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }
  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const svg = d3.select(this.svgRef.nativeElement);
    const width = 1000;
    const height = 600;

    const margin = { top: 20, right: 90, bottom: 30, left: 120 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const root: any = d3.hierarchy(this.treeData);
    root.x0 = innerHeight / 2;
    root.y0 = 0;

    const treeLayout = d3.tree().size([innerHeight, innerWidth]);

    const linkGenerator = d3.linkHorizontal()
      .x((d: any) => d.y)
      .y((d: any) => d.x);

    const update = (source: any) => {
      const treeData = treeLayout(root);
      const nodes = treeData.descendants();
      const links = treeData.links();

      nodes.forEach((d: any) => (d.y = d.depth * 180));

      const node = g.selectAll('g.node')
        .data(nodes, (d: any) => d.id || (d.id = ++i));

      const nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr('transform', d => `translate(${source.y0},${source.x0})`)
        .on('click', (event, d: any) => {
          d.children = d.children ? null : d._children;
          update(d);
        });

      nodeEnter.each(function (d: any) {
        const node = d3.select(this);

        if (!d.parent) {
          // Root node → add SVG image instead of circle and text
          node.append('image')
            .attr('href', '../../../../../assets/image/SVG/humehead.svg')
            .attr('x', -30)
            .attr('y', -30)
            .attr('width', 60)
            .attr('height', 60);
        } else {

          // CHILD NODE → Add infographic block
          const blockWidth = 300;
          const blockHeight = 60;

          // Add background block with arrow
          node.append('path')
            .attr('d', `M0,0 H${blockWidth - 20} L${blockWidth},${blockHeight / 2} L${blockWidth - 20},${blockHeight} H0 Z`)
            .attr('fill', d.data.color);

          // Step Number
          node.append('text')
            .attr('x', 20)
            .attr('y', 22)
            .attr('fill', '#fff')
            .attr('font-size', '16px')
            .attr('font-weight', 'bold')
            .text(d.data.name.split(' ')[0]); // "01"

          // Title
          node.append('text')
            .attr('x', 80)
            .attr('y', 22)
            .attr('fill', '#fff')
            .attr('font-size', '14px')
            .attr('font-weight', 'bold')
            .text(d.data.name.split(' ').slice(1).join(' ')); // "INFOGRAPHIC"

          // Description
          node.append('text')
            .attr('x', 80)
            .attr('y', 42)
            .attr('fill', '#fff')
            .attr('font-size', '12px')
            .text(d.data.desc);
        }
      });


      nodeEnter.merge(node as any)
        .transition().duration(500)
        .attr('transform', d => `translate(${d.y},${d.x})`);

      node.exit().transition().duration(500)
        .attr('transform', d => `translate(${source.y},${source.x})`)
        .remove()
        .select('circle').attr('r', 1e-6);

      const link: any = g.selectAll('path.link')
        .data(links, (d: any) => d.target.id);

      const linkEnter: any = link.enter().insert('path', 'g')
        .attr('class', 'link')
        .attr('fill', 'none')
        .attr('stroke', (d: any) => d.target.data.color)
        .attr('stroke-width', 2)
        .attr('d', (d: any) => linkGenerator({ source: d.source, target: d.source } as any))
        .transition().duration(500)
        .attr('d', linkGenerator);

      linkEnter.merge(link as any)
        .transition().duration(500)
        .attr('d', linkGenerator);

      link.exit().transition().duration(500)
        .attr('d', (d: any) => linkGenerator({ source: d.source, target: d.source } as any))
        .remove();

      nodes.forEach((d: any) => {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    };

    let i = 0;
    update(root);
  }
}
