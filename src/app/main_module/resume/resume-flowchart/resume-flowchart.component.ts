import * as d3 from 'd3';

import { AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-resume-flowchart',
  templateUrl: './resume-flowchart.component.html',
  styleUrls: ['./resume-flowchart.component.scss']
})
export class ResumeFlowchartComponent implements AfterViewInit {
  @ViewChild('treeContainer1', { static: false }) treeContainer1!: ElementRef;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Tree container available, creating tree...');
      this.createTree();
    }
  }
  createTree() {
    const data = {
      "name": "Swapnasheela",
      "current_designation": "Lead Assistant Manager",
      "Stream": "Front End Developer",
      "children": [{
        "name": "Technical Skill",
        "icon": "💬",
        "color": "#2B87C6",
        "children": [{
          "name": "Front-End Technologies",
          "children": [{
            "name": "HTML & HTML5",
            "size": 3812
          }, {
            "name": "CSS,CSS3,SCSS",
            "size": 3812
          }, {
            "name": "BootStrap & Material UI",
            "size": 3812
          }, {
            "name": "Angular Js & Angular above version",
            "size": 3812
          }, {
            "name": "Javascript, TypeScripts & Jquery",
            "size": 3812
          }, {
            "name": "React Js",
            "size": 3812
          }]
        }, {
          "name": "Frameworks & Libraries",
          "children": [{
            "name": "Underscore.js & Lodash",
            "size": 3534
          }, {
            "name": "Ag grid and Data Table",
            "size": 5731
          }, {
            "name": "Leaflet Js, Google Maps & Cesium JS",
            "size": 7840
          }, {
            "name": "Three js",
            "size": 5914
          }, {
            "name": "Highcharts, D3 Js & Chart.js",
            "size": 3416
          }, {
            "name": "RxJS, NgRx & Redux",
            "size": 3534
          }]
        }, {
          "name": "UI/UX Design & Implementation",
          "children": [{
            "name": "Responsive Web Design",
            "size": 7074
          }, {
            "name": "Cross-browser Compatibility",
            "size": 7074
          }, {
            "name": "Figma, Adobe XD, Sketch",
            "size": 7074
          }, {
            "name": "SEO Best Practices",
            "size": 7074
          }]
        }, {
          "name": "Performance Optimization",
          "children": [{
            "name": "Lazy Loading, Code Splitting",
            "size": 7074
          }, {
            "name": "Lighthouse Audits",
            "size": 7074
          }, {
            "name": "DOM Virtualization",
            "size": 7074
          }, {
            "name": "Caching, Minification",
            "size": 7074
          }]
        }, {
          "name": "Build Tools & Package Managers",
          "children": [{
            "name": "Webpack, Vite, Gulp",
            "size": 7074
          }, {
            "name": "npm, yarn",
            "size": 7074
          }]
        }, {
          "name": "Version Control & Collaboration",
          "children": [{
            "name": "Git, GitHub, GitLab, Bitbucket",
            "size": 7074
          }, {
            "name": "Agile/Scrum workflows",
            "size": 7074
          }, {
            "name": "Jira",
            "size": 7074
          }]
        }, {
          "name": "Testing & Debugging",
          "children": [{
            "name": "Chrome DevTools, ESLint",
            "size": 7074
          }, {
            "name": "Unit testing, Karma and Jasmine",
            "size": 7074
          }]
        }, {
          "name": "Back-End Basics",
          "children": [{
            "name": "REST APIs",
            "size": 7074
          }, {
            "name": "Node.js",
            "size": 7074
          }, {
            "name": "Firebase",
            "size": 7074
          }, {
            "name": "Oracle SQL",
            "size": 7074
          }, {
            "name": "Python Basics",
            "size": 7074
          }, {
            "name": "Core Java",
            "size": 7074
          }, {
            "name": "PHP",
            "size": 7074
          }]
        }, {
          "name": "Deployment & CI/CD",
          "children": [{
            "name": "Azure DevOps, AWS Amplify",
            "size": 7074
          }, {
            "name": "Netlify",
            "size": 7074
          }, {
            "name": "GitHub Pages",
            "size": 7074
          }, {
            "name": "Docker (basic)",
            "size": 7074
          }]
        }]
      }, {
        "name": "Work Experience",
        "icon": "📈",
        "color": "#3DBBC6",
        "children": [{
          "name": "Easing",
          "size": 17010
        }, {
          "name": "FunctionSequence",
          "size": 5842
        }, {
          "name": "interpolate",
          "children": [{
            "name": "ArrayInterpolator",
            "size": 1983
          }, {
            "name": "ColorInterpolator",
            "size": 2047
          }, {
            "name": "DateInterpolator",
            "size": 1375
          }, {
            "name": "Interpolator",
            "size": 8746
          }, {
            "name": "MatrixInterpolator",
            "size": 2202
          }, {
            "name": "NumberInterpolator",
            "size": 1382
          }, {
            "name": "ObjectInterpolator",
            "size": 1629
          }, {
            "name": "PointInterpolator",
            "size": 1675
          }, {
            "name": "RectangleInterpolator",
            "size": 2042
          }]
        }, {
          "name": "ISchedulable",
          "size": 1041
        }, {
          "name": "Parallel",
          "size": 5176
        }, {
          "name": "Pause",
          "size": 449
        }, {
          "name": "Scheduler",
          "size": 5593
        }, {
          "name": "Sequence",
          "size": 5534
        }, {
          "name": "Transition",
          "size": 9201
        }, {
          "name": "Transitioner",
          "size": 19975
        }, {
          "name": "TransitionEvent",
          "size": 1116
        }, {
          "name": "Tween",
          "size": 6006
        }]
      }, {
        "name": "Education Summary",
        "icon": "⚙️",
        "color": "#F3A433",
        "children": [{
          "name": "converters",
          "children": [{
            "name": "Converters",
            "size": 721
          }, {
            "name": "DelimitedTextConverter",
            "size": 4294
          }, {
            "name": "GraphMLConverter",
            "size": 9800
          }, {
            "name": "IDataConverter",
            "size": 1314
          }, {
            "name": "JSONConverter",
            "size": 2220
          }]
        }, {
          "name": "DataField",
          "size": 1759
        }, {
          "name": "DataSchema",
          "size": 2165
        }, {
          "name": "DataSet",
          "size": 586
        }, {
          "name": "DataSource",
          "size": 3331
        }, {
          "name": "DataTable",
          "size": 772
        }, {
          "name": "DataUtil",
          "size": 3322
        }]
      }, {
        "name": "Personal Details",
        "icon": "📊",
        "color": "#872B8E",
        "children": [{
          "name": "DirtySprite",
          "size": 8833
        }, {
          "name": "LineSprite",
          "size": 1732
        }, {
          "name": "RectSprite",
          "size": 3623
        }, {
          "name": "TextSprite",
          "size": 10066
        }]
      }]
    };
    const width = 800;
    const height = 600;
    let i = 0;
    const svg = d3.select(this.treeContainer1.nativeElement)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const g = svg.append("g");

    const root: any = d3.hierarchy(data);
    root.x0 = width / 2;
    root.y0 = 0;

    const treeLayout = d3.tree().size([width, height]);

    const zoom: any = d3.zoom()
      .scaleExtent([0.5, 2])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);

    // Collapse all children except root
    root.children?.forEach(collapse);

    update(root);

    function collapse(d: any) {
      if (d.children) {
        d._children = d.children;
        d._children.forEach(collapse);
        d.children = null;
      }
    }

    function update(source: any) {
      treeLayout(root);

      const nodes = root.descendants();
      const links = root.links();

      // Normalize depth spacing
      nodes.forEach((d: any) => d.y = d.depth * 120);

      // JOIN NODES
      const node = g.selectAll("g.node")
        .data(nodes, (d: any) => d.id || (d.id = ++i));

      const nodeEnter = node.enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", (d: any) => `translate(${source.x0},${source.y0})`)
        .on("click", (event, d: any) => {
          // Collapse all nodes except this one
          root.children?.forEach((child: any) => {
            if (child !== d) collapse(child);
          });

          if (d.children) {
            d._children = d.children;
            d.children = null;
          } else {
            d.children = d._children;
            d._children = null;
          }
          update(d);
        });

      nodeEnter.append("circle")
        .attr("r", (d: any) => d.depth === 0 ? 45 : 25)
        .attr("fill", (d: any) => d.data.color || "#d9534f")
        .attr("stroke", "#fff")
        .attr("stroke-width", 2);

      nodeEnter.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em")
        .style("fill", "#fff")
        .style("font-size", (d: any) => d.depth === 0 ? "20px" : "16px")
        .text((d: any) => d.data.icon || "👥");

      const nodeUpdate = nodeEnter.merge(node as any)
        .transition()
        .duration(300)
        .attr("transform", (d: any) => `translate(${d.x},${d.y})`);

      node.exit()
        .transition()
        .duration(300)
        .attr("transform", (d: any) => `translate(${source.x},${source.y})`)
        .remove();

      // JOIN LINKS
      const link = g.selectAll("path.link")
        .data(links, (d: any) => d.target.id);

      const linkEnter = link.enter()
        .insert("path", "g")
        .attr("class", "link")
        .attr("fill", "none")
        .attr("stroke", "#ccc")
        .attr("d", (d: any) => {
          const o = { x: source.x0, y: source.y0 };
          return diagonal({ source: o, target: o });
        });

      linkEnter.merge(link as any)
        .transition()
        .duration(300)
        .attr("d", diagonal);

      link.exit()
        .transition()
        .duration(300)
        .attr("d", (d: any) => {
          const o = { x: source.x, y: source.y };
          return diagonal({ source: o, target: o });
        })
        .remove();

      // Save current positions for transition
      nodes.forEach((d: any) => {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }

    function diagonal(d: any) {
      return d3.linkVertical()
        .x((d: any) => d.x)
        .y((d: any) => d.y)(d);
    }


  }



}
