
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

@Component({
  selector: 'app-infographic-d3',
  standalone: true,
  templateUrl: './infographic-d3.component.html',
  styleUrls: ['./infographic-d3.component.scss']
})
export class InfographicD3Component implements AfterViewInit {
  @ViewChild('infographicSvg', { static: true }) svgRef!: ElementRef<SVGSVGElement>;
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.ngAfterViewInit(); // or extract layout logic into a reusable function
  }
  treeData = {
    name: 'Technical Skills',
    color: '#1E88E5',
    children: [
      {
        name: 'Web Languages',
        desc: 'HTML, CSS, Bootstrap, AngularJS & Angular 8 to 13, JavaScript, jQuery, Typescripts',
        color: '#FDD835'
      },
      {
        name: 'Languages',
        desc: 'Core JAVA, PHP',
        color: '#FB8C00'
      },
      {
        name: 'Database Version',
        desc: 'SQL, MYSQL, Node Js',
        color: '#E53935'
      },
      {
        name: 'Tools',
        desc: 'Visual Studio Code, Atom, Eclipse, SVN, Git, Phabricator, bitbucket',
        color: '#43A047'
      },
      {
        name: 'Server',
        desc: 'Xamp, Wamp',
        color: '#00ACC1'
      },
      {
        name: 'Operating System',
        desc: 'Windows XP, 7,10 and MacOS, Ubuntu',
        color: '#1E88E5'
      }
    ]
  };


  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }
  ngAfterViewInit(): void {
    // if (!isPlatformBrowser(this.platformId)) return;

    // const svg = d3.select(this.svgRef.nativeElement);
    // const width = 945;
    // const height = 600;
    // const margin = { top: 0, right: 40, bottom: 0, left: 40 };

    if (!isPlatformBrowser(this.platformId)) return;

    const container = this.svgRef.nativeElement.parentElement;
    const bounding = container?.getBoundingClientRect();
    const width = bounding?.width || 945;
    const height = 600;
    const margin = { top: 0, right: 40, bottom: 0, left: 40 };

    const svg = d3.select(this.svgRef.nativeElement);
    svg.selectAll('*').remove(); // Clear before rendering

    svg
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .style('width', '100%')
      .style('height', 'auto');

    // Create main group
    const g = svg
      .attr('width', width)
      .attr('height', height)
      .style('overflow', 'visible')
      .append('g');

    // Initial root node (only Human Head)
    let root: any = d3.hierarchy({ ...this.treeData, children: [] });
    root.x0 = height / 2;
    root.y0 = width / 2;

    const treeLayout = d3.tree().size([height - margin.top - margin.bottom, 800]);
    const linkGenerator = d3.linkHorizontal()
      .x((d: any) => d.y)
      .y((d: any) => d.x);

    let i = 0;
    let treeInitialized = false;

    const update = (source: any) => {
      const treeData = treeLayout(root);
      const nodes = treeData.descendants();
      const links = treeData.links();
      nodes.forEach((d: any) => d.y = d.depth * 180);

      // Center logic: measure bounds and center horizontally
      const minY = d3.min(nodes, d => d.y) ?? 0;
      const maxY = d3.max(nodes, d => d.y) ?? 0;
      const layoutWidth = maxY - minY;
      const centerShiftX = width / 2 - (minY + layoutWidth / 2);

      g.transition().duration(600).attr('transform', `translate(${centerShiftX}, 0)`);

      // === HEAD NODE ===
      const headNode = g.selectAll('g.root-head').data([root]);
      const headEnter: any = headNode.enter()
        .append('g')
        .attr('class', 'root-head')
        .attr('transform', d => `translate(${d.y0},${d.x0})`)
        .on('click', () => {
          if (!treeInitialized) {
            root = d3.hierarchy(this.treeData, (d: any) => d.children);
            root.x0 = width / 2;
            root.y0 = 0;
            treeInitialized = true;
          } else {
            if (root.children) {
              root._children = root.children;
              root.children = null;
            } else {
              root.children = root._children;
              root._children = null;
            }
          }
          update(root);
        });

      headEnter.append('image')
        .attr('href', '../../../../../assets/image/SVG/humeheadcropped.svg')
        .attr('x', -100)
        .attr('y', -100)
        .attr('width', 400)
        .attr('height', 400);

      headNode.merge(headEnter)
        .transition().duration(600)
        .attr('transform', d => `translate(${d.y - 130},${d.x})`);

      // === LINK + NODE GROUPS ===
      const linkGroups = g.selectAll('g.link-node-group')
        .data(links, (d: any) => d.target.id || (d.target.id = ++i));

      const groupEnter = linkGroups.enter()
        .append('g')
        .attr('class', 'link-node-group')
        .attr('transform', d => `translate(${source.y0},${source.x0})`);

      groupEnter.append('path')
        .attr('class', 'link')
        .attr('fill', 'none')
        .attr('stroke', (d: any) => d?.target?.data?.color || '#ccc')
        .attr('stroke-width', 2)
        .attr('d', (d: any) => {
          try {
            return linkGenerator(d);
          } catch {
            return '';
          }
        });

      const nodeEnter = groupEnter.append('g')
        .attr('class', 'node')
        .on('click', (event, d: any) => {
          if (d.target.children) {
            d.target._children = d.target.children;
            d.target.children = null;
          } else {
            d.target.children = d.target._children;
            d.target._children = null;
          }
          update(d.target);
        });

      nodeEnter.each(function (d: any) {
        const node = d3.select(this);
        const dNode = d.target;

        const blockWidth = 350;
        const blockHeight = 80;
        const paddingX = 20;
        const textMaxWidth = blockWidth - paddingX * 2;

        // Custom shaped block
        node.append('path')
          .attr('d', `M0,0 H${blockWidth - 20} L${blockWidth},${blockHeight / 2} L${blockWidth - 20},${blockHeight} H0 Z`)
          .attr('fill', dNode.data.color);

        // Title text
        node.append('text')
          .attr('x', paddingX)
          .attr('y', 22)
          .attr('fill', '#fff')
          .attr('font-size', '16px')
          .attr('font-weight', 'bold')
          .text(dNode.data.name);

        // Description with wrapping
        const descGroup = node.append('text')
          .attr('x', paddingX)
          .attr('y', 42)
          .attr('fill', '#fff')
          .attr('font-size', '12px');

        const words = dNode.data.desc.split(' ');
        let line: string[] = [];
        let lineNumber = 0;
        const lineHeight = 14;

        let tspan = descGroup.append('tspan')
          .attr('x', paddingX)
          .attr('dy', 0);

        words.forEach((word: any, index: any) => {
          line.push(word);
          tspan.text(line.join(' '));

          const currentLength = (tspan.node() as SVGTextContentElement).getComputedTextLength();
          if (currentLength > textMaxWidth) {
            line.pop(); // Remove last word (it caused overflow)
            tspan.text(line.join(' ')); // Re-render previous line

            line = [word]; // Start new line with this word
            tspan = descGroup.append('tspan')
              .attr('x', paddingX)
              .attr('dy', lineHeight)
              .text(word); // Directly render the new line
          }
        });
      });



      const groupUpdate = groupEnter.merge(linkGroups as any);
      groupUpdate.transition().duration(600)
        .attr('transform', d => `translate(0,0)`);

      groupUpdate.select('path.link')
        .transition().duration(600)
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

    // === INITIAL HEAD CENTERED ===
    const headNode = g.selectAll('g.root-head').data([root]);
    const headEnter: any = headNode.enter()
      .append('g')
      .attr('class', 'root-head')
      .attr('transform', d => `translate(${root.y0},${root.x0})`)
      .on('click', () => {
        if (!treeInitialized) {
          root = d3.hierarchy(this.treeData, (d: any) => d.children);
          root.x0 = (width / 2);
          root.y0 = 0;
          treeInitialized = true;
        } else {
          if (root.children) {
            root._children = root.children;
            root.children = null;
          } else {
            root.children = root._children;
            root._children = null;
          }
        }
        update(root);
      });

    headEnter.append('image')
      .attr('href', '../../../../../assets/image/SVG/humeheadcropped.svg')
      .attr('x', -180)
      .attr('y', -200)
      .attr('width', 400)
      .attr('height', 400);

    headNode.merge(headEnter)
      .transition().duration(600)
      .attr('transform', d => `translate(${d.y0},${d.x0})`);
  }

}