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
    const container = this.svgWrapperRef.nativeElement;
    const svgEl = this.svgRef.nativeElement;
    const baseWidth = container.offsetWidth;
    const margin = { top: 0, right: 40, bottom: 0, left: 40 };

    // Device-specific configuration
    const config = {
      widthPadding: device === 'mobile' ? 0 : device === 'tablet' ? 100 : 200,
      topPadding: 60,
      block: {
        width: device === 'mobile' ? 175 : device === 'tablet' ? 210 : 350,
        height: device === 'mobile' ? 90 : device === 'tablet' ? 100 : 90
      },
      font: {
        titleSize: device === 'mobile' ? '14px' : device === 'tablet' ? '16px' : '18px',
        descSize: device === 'mobile' ? '12px' : device === 'tablet' ? '14px' : '16px',
        lineHeight: device === 'mobile' ? 12 : device === 'tablet' ? 14 : 16
      },
      headSize: device === 'mobile' ? 150 : device === 'tablet' ? 250 : 400,
      nodeDistance: device === 'mobile' ? 60 : device === 'tablet' ? 160 : 180,
      linkStroke: device === 'mobile' ? 1 : device === 'tablet' ? 1.5 : 2,
      scaleFactor: device === 'mobile' ? 0.7 : device === 'tablet' ? 0.85 : 1,
      yOffset: device === 'mobile' ? -60 : device === 'tablet' ? -20 : 0
    };

    const width = baseWidth + config.widthPadding;
    // const height = this.treeData.children.length * 180 + config.topPadding;

    const nodeHeight = device === 'mobile' ? 120 : device === 'tablet' ? 150 : 120;
    const extraBuffer = device === 'mobile' ? 100 : device === 'tablet' ? 150 : 200;

    const height = this.treeData.children.length * nodeHeight + config.topPadding + extraBuffer;
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

    const treeLayout = d3.tree().size([
      height - margin.top - margin.bottom,
      device === 'mobile' ? 300 : device === 'tablet' ? 400 : 500
    ]);

    const linkGenerator = d3.linkHorizontal()
      .x((d: any) => d.y)
      .y((d: any) => d.x);

    let i = 0;

    const update = (source: D3HierarchyCustomNode) => {
      const treeData = treeLayout(root);
      const nodes = treeData.descendants();
      const links = treeData.links();


      // Adjust vertical node spacing (y-axis) based on depth
      nodes.forEach((d: any) => {
        d.y = d.depth * (device === 'mobile' ? 100 : device === 'tablet' ? 140 : config.nodeDistance) + 80;
      });


      const minY = d3.min(nodes, d => d.y) ?? 0;
      const maxY = d3.max(nodes, d => d.y) ?? 0;
      const layoutWidth = maxY - minY;
      const centerShiftX = width / 2 - (minY + layoutWidth / 2);

      const minX = d3.min(nodes, d => d.x) ?? 0;
      const maxX = d3.max(nodes, d => d.x) ?? 0;
      const layoutHeight = maxX - minX;
      const centerShiftY = height / 2 - (minX + layoutHeight / 2);

      g.transition()
        .duration(600)
        .attr('transform', `translate(${centerShiftX}, ${centerShiftY - 20})`);


      // Head (root node)
      const headNode = g.selectAll('g.root-head').data([root]);
      const headOffset = config.headSize / 2;

      const headEnter: any = headNode.enter()
        .append('g')
        .attr('class', 'root-head')
        .attr('transform', d => `translate(${d.y0},${d.x0})`)
        .on('click', () => {
          if (!root.children && root._children) {
            root.children = root._children;
            root._children = undefined;
          } else {
            root._children = root.children;
            root.children = undefined;
          }
          update(root);
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

      // Links & Nodes
      const linkGroups = g.selectAll('g.link-node-group')
        .data(links, (d: any) => d.target.id || (d.target.id = ++i));

      const groupEnter = linkGroups.enter()
        .append('g')
        .attr('class', 'link-node-group')
        .attr(
          'transform',
          `translate(${source?.y0 ?? 0}, ${(source?.x0 ?? 0) + config.yOffset}) scale(${config.scaleFactor})`
        );

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

        node.append('text')
          .attr('x', paddingX)
          .attr('y', 22)
          .attr('fill', '#fff')
          .attr('font-size', config.font.titleSize)
          .attr('font-weight', 'bold')
          .text(dNode.data.name);

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

      const groupUpdate = groupEnter.merge(linkGroups as any);
      groupUpdate.transition().duration(600).attr('transform', (d: any) => {
        const shiftX = device === 'desktop' ? -50 : 0;
        return `translate(${shiftX}, 0)`;
      });

      groupUpdate.select('path.link')
        .transition().duration(600)
        .attr('stroke-width', config.linkStroke)
        .attr('d', (d: any) => linkGenerator(d));

      groupUpdate.select('g.node')
        .transition().duration(600)
        .attr('transform', d => `translate(${d.target.y},${d.target.x})`);

      linkGroups.exit().transition().duration(600).remove();

      nodes.forEach((d: any) => {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    };

    // Initial collapsed state
    root._children = root.children;
    root.children = undefined;
    update(root);
  }


  // drawTheSkill(device: 'mobile' | 'tablet' | 'desktop') {
  //   const container = this.svgWrapperRef.nativeElement;
  //   const svgEl = this.svgRef.nativeElement;
  //   const baseWidth = container.offsetWidth;
  //   const margin = { top: 0, right: 40, bottom: 0, left: 40 };

  //   let width = baseWidth + (device === 'mobile' ? 0 : device === 'tablet' ? 100 : 200);
  //   const topPadding = 60;
  //   const height = this.treeData.children.length * 180 + topPadding;

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

  //   const treeLayout = d3.tree().size([height - margin.top - margin.bottom, device === 'mobile' ? 300 : device === 'tablet' ? 400 : 500]);
  //   const linkGenerator = d3.linkHorizontal().x((d: any) => d.y).y((d: any) => d.x);

  //   let i = 0;

  //   const update = (source: D3HierarchyCustomNode) => {
  //     const treeData = treeLayout(root);
  //     const nodes = treeData.descendants();
  //     const links = treeData.links();

  //     nodes.forEach((d: any) => d.y = d.depth * (device === 'mobile' ? 120 : device === 'tablet' ? 160 : 180) + 100);

  //     const minY = d3.min(nodes, d => d.y) ?? 0;
  //     const maxY = d3.max(nodes, d => d.y) ?? 0;
  //     const layoutWidth = maxY - minY;
  //     const centerShiftX = width / 2 - (minY + layoutWidth / 2);
  //     g.transition().duration(600).attr('transform', `translate(${centerShiftX}, 0)`);

  //     const headNode = g.selectAll('g.root-head').data([root]);
  //     const headSize = device === 'mobile' ? 150 : device === 'tablet' ? 250 : 400;
  //     const headOffset = headSize / 2;

  //     const headEnter: any = headNode.enter()
  //       .append('g')
  //       .attr('class', 'root-head')
  //       .attr('transform', d => `translate(${d.y0},${d.x0})`)
  //       .on('click', () => {
  //         if (!root.children && root._children) {
  //           root.children = root._children;
  //           root._children = undefined;
  //         } else {
  //           root._children = root.children;
  //           root.children = undefined;
  //         }
  //         update(root);
  //       });

  //     headEnter.append('image')
  //       .attr('href', '../../../../../assets/image/SVG/humeheadcropped.svg')
  //       .attr('x', -headOffset)
  //       .attr('y', -headOffset)
  //       .attr('width', headSize)
  //       .attr('height', headSize);

  //     headNode.merge(headEnter)
  //       .transition().duration(600)
  //       .attr('transform', (d: any) => `translate(${d.y - headOffset + 30},${d.x})`);

  //     const linkGroups = g.selectAll('g.link-node-group')
  //       .data(links, (d: any) => d.target.id || (d.target.id = ++i));

  //     // const groupEnter = linkGroups.enter()
  //     //   .append('g')
  //     //   .attr('class', 'link-node-group')
  //     //   .attr('transform', d => `translate(${source.y0},${source.x0})`);

  //     const scaleFactor = device === 'mobile' ? 0.7 : device === 'tablet' ? 0.85 : 1;
  //     const yOffset = device === 'mobile' ? -60 : device === 'tablet' ? -20 : 0;

  //     const safeX0 = source?.x0 ?? 0;
  //     const safeY0 = source?.y0 ?? 0;

  //     const groupEnter = linkGroups.enter()
  //       .append('g')
  //       .attr('class', 'link-node-group')
  //       .attr('transform', `translate(${safeY0}, ${safeX0 + yOffset}) scale(${scaleFactor})`);



  //     groupEnter.append('path')
  //       .attr('class', 'link')
  //       .attr('fill', 'none')
  //       .attr('stroke', (d: any) => d.target.data.color || '#ccc')
  //       .attr('stroke-width', device === 'mobile' ? 1 : device === 'tablet' ? 1.5 : 2)
  //       .attr('d', (d: any) => linkGenerator(d));

  //     const nodeEnter = groupEnter.append('g')
  //       .attr('class', 'node');

  //     nodeEnter.each(function (d: any) {
  //       const node = d3.select(this);
  //       const dNode = d.target;

  //       const blockWidth = device === 'mobile' ? 175 : device === 'tablet' ? 210 : 350;
  //       const blockHeight = device === 'mobile' ? 90 : device === 'tablet' ? 100 : 90;
  //       const paddingX = 20;
  //       const textMaxWidth = blockWidth - paddingX * 2;
  //       const lineHeight = device === 'mobile' ? 12 : device === 'tablet' ? 14 : 16;

  //       node.append('path')
  //         .attr('d', `M0,0 H${blockWidth - 20} L${blockWidth},${blockHeight / 2} L${blockWidth - 20},${blockHeight} H0 Z`)
  //         .attr('fill', dNode.data.color);

  //       node.append('text')
  //         .attr('x', paddingX)
  //         .attr('y', 22)
  //         .attr('fill', '#fff')
  //         .attr('font-size', device === 'mobile' ? '14px' : device === 'tablet' ? '16px' : '18px')
  //         .attr('font-weight', 'bold')
  //         .text(dNode.data.name);

  //       const descGroup = node.append('text')
  //         .attr('x', paddingX)
  //         .attr('y', 42)
  //         .attr('fill', '#fff')
  //         .attr('font-size', device === 'mobile' ? '12px' : device === 'tablet' ? '14px' : '16px');

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
  //             .attr('dy', lineHeight)
  //             .text(word);
  //         }
  //       }
  //     });

  //     const groupUpdate = groupEnter.merge(linkGroups as any);
  //     groupUpdate.transition().duration(600).attr('transform', (d: any) => {
  //       const shiftX = device === 'mobile' ? 0 : device === 'tablet' ? 0 : -50;
  //       return `translate(${shiftX}, 0)`;
  //     });

  //     groupUpdate.select('path.link')
  //       .transition().duration(600)
  //       .attr('stroke-width', device === 'mobile' ? 1 : device === 'tablet' ? 1.5 : 2)
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


  //   (root as D3HierarchyCustomNode)._children = root.children;
  //   root.children = undefined;
  //   update(root);
  // }
}