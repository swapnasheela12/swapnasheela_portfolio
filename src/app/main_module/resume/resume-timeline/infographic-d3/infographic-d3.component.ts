import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as d3 from 'd3';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-infographic-d3',
  standalone: true,
  templateUrl: './infographic-d3.component.html',
  styleUrls: ['./infographic-d3.component.scss']
})
export class InfographicD3Component implements AfterViewInit {
  @ViewChild('svgWrapper', { static: true }) svgWrapperRef!: ElementRef<HTMLElement>;
  @ViewChild('infographicSvg', { static: true }) svgRef!: ElementRef<SVGSVGElement>;

  @HostListener('window:resize')
  onResize() {
    this.ngAfterViewInit();
  }

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private breakpointObserver: BreakpointObserver
  ) { }

  treeData = {
    name: 'Technical Skills',
    color: '#1E88E5',
    children: [
      { name: 'Web Languages', desc: 'HTML, CSS, Bootstrap, AngularJS & Angular 8 to 13, JavaScript, jQuery, Typescripts', color: '#FDD835' },
      { name: 'Languages', desc: 'Core JAVA, PHP', color: '#FB8C00' },
      { name: 'Database Version', desc: 'SQL, MYSQL, Node Js', color: '#E53935' },
      { name: 'Tools', desc: 'Visual Studio Code, Atom, Eclipse, SVN, Git, Phabricator, bitbucket', color: '#43A047' },
      { name: 'Server', desc: 'Xamp, Wamp', color: '#00ACC1' },
      { name: 'Operating System', desc: 'Windows XP, 7,10 and MacOS, Ubuntu', color: '#1E88E5' }
    ]
  };

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    setTimeout(() => {
      this.breakpointObserver.observe([
        Breakpoints.HandsetPortrait,
        Breakpoints.HandsetLandscape,
        Breakpoints.TabletPortrait,
        Breakpoints.TabletLandscape,
        Breakpoints.WebPortrait,
        Breakpoints.WebLandscape
      ]).subscribe(result => {
        if (result.breakpoints[Breakpoints.HandsetPortrait] || result.breakpoints[Breakpoints.HandsetLandscape]) {
          this.drawTheSkill('mobile');
        } else if (result.breakpoints[Breakpoints.TabletPortrait] || result.breakpoints[Breakpoints.TabletLandscape]) {
          this.drawTheSkill('tablet');
        } else {
          this.drawTheSkill('desktop');
        }
      });
    });
  }

  drawTheSkill(device: 'mobile' | 'tablet' | 'desktop') {
    const CONFIG_MAP = {
      mobile: {
        widthPadding: 0,
        topPadding: 50,
        block: { width: 140, height: 100 },
        font: { titleSize: '12px', descSize: '10px', lineHeight: 12 },
        headSize: 180,
        nodeDistance: 30,
        linkStroke: 1,
        scaleFactor: 0.7,
        yOffset: -70,
        nodeHeight: 120,
        extraBuffer: 100,
        treeWidth: Math.max(400, this.treeData.children.length * 160),
        linkGroupShiftX: 40 // 👈 shift right for small screens
      },
      // mobile: {
      //   widthPadding: 0,
      //   topPadding: 50,
      //   block: { width: 115, height: 95 },
      //   font: { titleSize: '12px', descSize: '10px', lineHeight: 12 },
      //   headSize: 180,
      //   nodeDistance: 30,
      //   linkStroke: 1,
      //   scaleFactor: 0.7,
      //   yOffset: -70,
      //   nodeHeight: 120,
      //   extraBuffer: 100,
      //   treeWidth: 850
      // },
      tablet: {
        widthPadding: 100,
        topPadding: 60,
        block: { width: 200, height: 100 },
        font: { titleSize: '16px', descSize: '14px', lineHeight: 14 },
        headSize: 250,
        nodeDistance: 120,
        linkStroke: 1.5,
        scaleFactor: 0.85,
        yOffset: -40,
        nodeHeight: 150,
        extraBuffer: 150,
        treeWidth: 400
      },
      desktop: {
        widthPadding: 200,
        topPadding: 60,
        block: { width: 350, height: 90 },
        font: { titleSize: '18px', descSize: '16px', lineHeight: 16 },
        headSize: 400,
        nodeDistance: 180,
        linkStroke: 2,
        scaleFactor: 1,
        yOffset: 0,
        nodeHeight: 120,
        extraBuffer: 200,
        treeWidth: 500
      }
    } as const;

    const config: any = CONFIG_MAP[device];
    const container = this.svgWrapperRef.nativeElement;
    const svgEl = this.svgRef.nativeElement;
    const baseWidth = container.offsetWidth;
    const width = baseWidth + config.widthPadding;
    const height = this.treeData.children.length * config.nodeHeight + config.topPadding + config.extraBuffer;

    const svg = d3.select(svgEl);
    svg.selectAll('*').remove();
    svg
      .attr('width', '100%')
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet');

    const g = svg.append('g').style('overflow', 'visible');

    type D3HierarchyCustomNode = d3.HierarchyNode<any> & {
      x0?: number;
      y0?: number;
      _children?: typeof root.children;
    };

    const root = d3.hierarchy(this.treeData) as D3HierarchyCustomNode;
    root.x0 = height / 2;
    root.y0 = width / 2;
    root._children = root.children;
    root.children = undefined;

    const treeLayout = d3.tree().size([
      height - 100,
      config.treeWidth
    ]);

    const linkGenerator = d3.linkHorizontal()
      .x((d: any) => d.y)
      .y((d: any) => d.x);

    let i = 0;

    const update = (source: D3HierarchyCustomNode) => {
      const treeData = treeLayout(root);
      const nodes = treeData.descendants();
      const links = treeData.links();

      nodes.forEach((d: any) => {
        d.y = d.depth * config.nodeDistance + 80;
      });

      const minY = d3.min(nodes, d => d.y) ?? 0;
      const maxY = d3.max(nodes, d => d.y) ?? 0;
      const centerShiftX = width / 2 - ((minY + (maxY - minY) / 2));
      const minX = d3.min(nodes, d => d.x) ?? 0;
      const maxX = d3.max(nodes, d => d.x) ?? 0;
      const centerShiftY = height / 2 - ((minX + (maxX - minX) / 2));

      g.transition()
        .duration(600)
        .attr('transform', `translate(${centerShiftX}, ${centerShiftY - 20})`);

      const headOffset = config.headSize / 2;

      const headNode = g.selectAll('g.root-head').data([root]);

      const headEnter: any = headNode.enter()
        .append('g')
        .attr('class', 'root-head')
        .attr('transform', d => `translate(${d.y0 + (config.deviceShiftX || 0)},${d.x0})`)
        // .attr('transform', d => `translate(${d.y0},${d.x0})`)
        .on('click', () => {
          root.children = root.children ? undefined : root._children;
          update(root);
          // drawBubble(root.children ? 'Click to collapse' : 'Click to expand again!');
          // Remove the speech bubble when expanded
          if (root.children) {
            d3.selectAll('.speech-foreign').remove();
          } else {
            drawBubble('Click to expand again!');
          }
        });

      headEnter.append('image')
        .attr('href', '../../../../../assets/image/SVG/humeheadcropped.svg')
        .attr('x', -headOffset)
        .attr('y', -headOffset)
        .attr('width', config.headSize)
        .attr('height', config.headSize);

      headNode.merge(headEnter)
        .transition().duration(600)
        .attr('transform', (d: any) => `translate(${d.y - headOffset + 30},${d.x})`);

      // BUBBLE on initial render
      const drawBubble = (text: string) => {
        d3.selectAll('.speech-foreign').remove();

        const bubble = g.select('g.root-head')
          .append('foreignObject')
          .attr('class', 'speech-foreign')
          .attr('x', headOffset + 20)
          .attr('y', -headOffset / 2)
          .attr('width', 180)
          .attr('height', 100)
          .style('opacity', 0);

        bubble.transition().duration(600).style('opacity', 1);

        bubble.append('xhtml:div')
          .attr('class', 'speech-bubble')
          .style('font-family', 'Segoe UI, sans-serif')
          .style('color', '#fff')
          .style('background', '#388e3c')
          .style('padding', '10px 12px')
          .style('border-radius', '12px')
          .style('box-shadow', '0 4px 10px rgba(0,0,0,0.2)')
          .style('font-size', '12px')
          .html(text);
      };

      drawBubble('Click to expand!');

      // Render Links + Nodes
      const linkGroups = g.selectAll('g.link-node-group')
        .data(links, (d: any) => d.target.id || (d.target.id = ++i));

      const groupEnter = linkGroups.enter()
        .append('g')
        .attr('class', 'link-node-group')
        .attr('transform', `translate(${(source?.y0 ?? 0) + (config.linkGroupShiftX || 0)}, ${(source?.x0 ?? 0) + config.yOffset}) scale(${config.scaleFactor})`);
      // .attr('transform', `translate(${source?.y0 ?? 0}, ${(source?.x0 ?? 0) + config.yOffset}) scale(${config.scaleFactor})`);

      groupEnter.append('path')
        .attr('class', 'link')
        .attr('fill', 'none')
        .attr('stroke', (d: any) => d.target.data.color || '#ccc')
        .attr('stroke-width', config.linkStroke)
        .attr('d', (d: any) => linkGenerator(d));

      const nodeEnter = groupEnter.append('g').attr('class', 'node');

      nodeEnter.each(function (d: any) {
        const node = d3.select(this);
        const dNode = d.target;
        const paddingX = 20;
        const textMaxWidth = config.block.width - paddingX * 2;

        node.append('path')
          .attr('d', `M0,0 H${config.block.width - 20} L${config.block.width},${config.block.height / 2} L${config.block.width - 20},${config.block.height} H0 Z`)
          .attr('fill', dNode.data.color);

        // node.append('text')
        //   .attr('x', paddingX)
        //   .attr('y', 22)
        //   .attr('fill', '#fff')
        //   .attr('font-size', config.font.titleSize)
        //   .attr('font-weight', 'bold')
        //   .text(dNode.data.name);

        const titleGroup = node.append('text')
          .attr('x', paddingX)
          .attr('y', 22)
          .attr('fill', '#fff')
          .attr('font-size', config.font.titleSize)
          .attr('font-weight', 'bold');

        const titleWords = dNode.data.name.split(' ');
        let titleLine: string[] = [];
        let tspanTitle = titleGroup.append('tspan')
          .attr('x', paddingX)
          .attr('dy', 0);

        for (const word of titleWords) {
          titleLine.push(word);
          tspanTitle.text(titleLine.join(' '));

          if ((tspanTitle.node() as SVGTextContentElement).getComputedTextLength() > textMaxWidth) {
            titleLine.pop();
            tspanTitle.text(titleLine.join(' '));
            titleLine = [word];
            tspanTitle = titleGroup.append('tspan')
              .attr('x', paddingX)
              .attr('dy', config.font.lineHeight)
              .text(word);
          }
        }



        const descGroup = node.append('text')
          .attr('x', paddingX)
          .attr('y', 42)
          .attr('fill', '#fff')
          .attr('font-size', config.font.descSize);

        const words = dNode.data.desc.split(' ');
        let line: string[] = [];
        let tspan = descGroup.append('tspan').attr('x', paddingX).attr('dy', 0);

        for (const word of words) {
          line.push(word);
          tspan.text(line.join(' '));
          if ((tspan.node() as SVGTextContentElement).getComputedTextLength() > textMaxWidth) {
            line.pop();
            tspan.text(line.join(' '));
            line = [word];
            tspan = descGroup.append('tspan')
              .attr('x', paddingX)
              .attr('dy', config.font.lineHeight)
              .text(word);
          }
        }
      });

      groupEnter.merge(linkGroups as any)
        .transition().duration(600)
        // .attr('transform', (d: any) => `translate(${-50}, 0)`);
        .attr('transform', (d: any) => `translate(${(config.linkGroupShiftX || 0) - 50}, 0)`);


      groupEnter.merge(linkGroups as any).select('path.link')
        .transition().duration(600)
        .attr('stroke-width', config.linkStroke)
        .attr('d', (d: any) => linkGenerator(d));

      groupEnter.merge(linkGroups as any).select('g.node')
        .transition().duration(600)
        .attr('transform', d => `translate(${d.target.y},${d.target.x})`);

      linkGroups.exit().transition().duration(600).remove();

      nodes.forEach((d: any) => {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    };

    update(root);
  }

}








// drawTheSkill(device: 'mobile' | 'tablet' | 'desktop') {
//   const CONFIG_MAP = {
//     mobile: {
//       widthPadding: 0,
//       topPadding: 60,
//       block: { width: 135, height: 95 },
//       font: { titleSize: '12px', descSize: '10px', lineHeight: 12 },
//       headSize: 150,
//       nodeDistance: 30,
//       linkStroke: 1,
//       scaleFactor: 0.7,
//       yOffset: -70,
//       nodeHeight: 120,
//       extraBuffer: 100,
//       treeWidth: 300
//     },
//     tablet: {
//       widthPadding: 100,
//       topPadding: 60,
//       block: { width: 200, height: 100 },
//       font: { titleSize: '16px', descSize: '14px', lineHeight: 14 },
//       headSize: 250,
//       nodeDistance: 120,
//       linkStroke: 1.5,
//       scaleFactor: 0.85,
//       yOffset: -40,
//       nodeHeight: 150,
//       extraBuffer: 150,
//       treeWidth: 400
//     },
//     desktop: {
//       widthPadding: 200,
//       topPadding: 60,
//       block: { width: 350, height: 90 },
//       font: { titleSize: '18px', descSize: '16px', lineHeight: 16 },
//       headSize: 400,
//       nodeDistance: 180,
//       linkStroke: 2,
//       scaleFactor: 1,
//       yOffset: 0,
//       nodeHeight: 120,
//       extraBuffer: 200,
//       treeWidth: 500
//     }
//   } as const;

//   const config = CONFIG_MAP[device];
//   const container = this.svgWrapperRef.nativeElement;
//   const svgEl = this.svgRef.nativeElement;
//   const baseWidth = container.offsetWidth;
//   const margin = { top: 0, right: 40, bottom: 0, left: 40 };

//   const width = baseWidth + config.widthPadding;
//   const height = this.treeData.children.length * config.nodeHeight + config.topPadding + config.extraBuffer;

//   const svg = d3.select(svgEl);
//   svg.selectAll('*').remove();
//   svg
//     .attr('width', '100%')
//     .attr('height', height)
//     .attr('viewBox', `0 0 ${width} ${height}`)
//     .attr('preserveAspectRatio', 'xMidYMid meet');

//   const g = svg.append('g').style('overflow', 'visible');

//   type D3HierarchyCustomNode = d3.HierarchyNode<any> & {
//     x0?: number;
//     y0?: number;
//     _children?: typeof root.children;
//   };

//   const root = d3.hierarchy(this.treeData) as D3HierarchyCustomNode;
//   root.x0 = height / 2;
//   root.y0 = width / 2;

//   const treeLayout = d3.tree().size([
//     height - margin.top - margin.bottom,
//     config.treeWidth
//   ]);

//   const linkGenerator = d3.linkHorizontal()
//     .x((d: any) => d.y)
//     .y((d: any) => d.x);

//   let i = 0;

//   const update = (source: D3HierarchyCustomNode) => {
//     const treeData = treeLayout(root);
//     const nodes = treeData.descendants();
//     const links = treeData.links();

//     nodes.forEach((d: any) => {
//       d.y = d.depth * config.nodeDistance + 80;
//     });

//     const minY = d3.min(nodes, d => d.y) ?? 0;
//     const maxY = d3.max(nodes, d => d.y) ?? 0;
//     const centerShiftX = width / 2 - ((minY + (maxY - minY) / 2));

//     const minX = d3.min(nodes, d => d.x) ?? 0;
//     const maxX = d3.max(nodes, d => d.x) ?? 0;
//     const centerShiftY = height / 2 - ((minX + (maxX - minX) / 2));

//     g.transition()
//       .duration(600)
//       .attr('transform', `translate(${centerShiftX}, ${centerShiftY - 20})`);

//     // Head (root node)
//     const headNode = g.selectAll('g.root-head').data([root]);
//     const headOffset = config.headSize / 2;

//     const headEnter: any = headNode.enter()
//       .append('g')
//       .attr('class', 'root-head')
//       .attr('transform', d => `translate(${d.y0},${d.x0})`)
//       .on('click', () => {
//         root.children = root.children ? undefined : root._children;
//         update(root);
//       });

//     headEnter.append('image')
//       .attr('href', '../../../../../assets/image/SVG/humeheadcropped.svg')
//       .attr('x', -headOffset)
//       .attr('y', -headOffset)
//       .attr('width', config.headSize)
//       .attr('height', config.headSize);

//     headNode.merge(headEnter)
//       .transition().duration(600)
//       .attr('transform', (d: any) => `translate(${d.y - headOffset + 30},${d.x})`);

//     // Links & Nodes
//     const linkGroups = g.selectAll('g.link-node-group')
//       .data(links, (d: any) => d.target.id || (d.target.id = ++i));

//     const groupEnter = linkGroups.enter()
//       .append('g')
//       .attr('class', 'link-node-group')
//       .attr('transform', `translate(${source?.y0 ?? 0}, ${(source?.x0 ?? 0) + config.yOffset}) scale(${config.scaleFactor})`);

//     groupEnter.append('path')
//       .attr('class', 'link')
//       .attr('fill', 'none')
//       .attr('stroke', (d: any) => d.target.data.color || '#ccc')
//       .attr('stroke-width', config.linkStroke)
//       .attr('d', (d: any) => linkGenerator(d));

//     const nodeEnter = groupEnter.append('g').attr('class', 'node');

//     nodeEnter.each(function (d: any) {
//       const node = d3.select(this);
//       const dNode = d.target;
//       const paddingX = 20;
//       const textMaxWidth = config.block.width - paddingX * 2;

//       node.append('path')
//         .attr('d', `M0,0 H${config.block.width - 20} L${config.block.width},${config.block.height / 2} L${config.block.width - 20},${config.block.height} H0 Z`)
//         .attr('fill', dNode.data.color);

//       node.append('text')
//         .attr('x', paddingX)
//         .attr('y', 22)
//         .attr('fill', '#fff')
//         .attr('font-size', config.font.titleSize)
//         .attr('font-weight', 'bold')
//         .text(dNode.data.name);

//       const descGroup = node.append('text')
//         .attr('x', paddingX)
//         .attr('y', 42)
//         .attr('fill', '#fff')
//         .attr('font-size', config.font.descSize);

//       const words = dNode.data.desc.split(' ');
//       let line: string[] = [];
//       let tspan = descGroup.append('tspan').attr('x', paddingX).attr('dy', 0);

//       for (const word of words) {
//         line.push(word);
//         tspan.text(line.join(' '));
//         if ((tspan.node() as SVGTextContentElement).getComputedTextLength() > textMaxWidth) {
//           line.pop();
//           tspan.text(line.join(' '));
//           line = [word];
//           tspan = descGroup.append('tspan')
//             .attr('x', paddingX)
//             .attr('dy', config.font.lineHeight)
//             .text(word);
//         }
//       }
//     });

//     const groupUpdate = groupEnter.merge(linkGroups as any);
//     groupUpdate.transition().duration(600).attr('transform', (d: any) => {
//       const shiftX = device === 'desktop' ? -50 : 0;
//       return `translate(${shiftX}, 0)`;
//     });

//     groupUpdate.select('path.link')
//       .transition().duration(600)
//       .attr('stroke-width', config.linkStroke)
//       .attr('d', (d: any) => linkGenerator(d));

//     groupUpdate.select('g.node')
//       .transition().duration(600)
//       .attr('transform', d => `translate(${d.target.y},${d.target.x})`);

//     linkGroups.exit().transition().duration(600).remove();

//     nodes.forEach((d: any) => {
//       d.x0 = d.x;
//       d.y0 = d.y;
//     });
//   };

//   root._children = root.children;
//   root.children = undefined;
//   update(root);
// }