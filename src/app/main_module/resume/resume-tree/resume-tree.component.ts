import * as d3 from 'd3';

import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-resume-tree',
  template: `<div #treeContainer class="tree-container"></div>`,
  styleUrls: ['./resume-tree.component.scss']
})
export class ResumeTreeComponent implements AfterViewInit {
  @ViewChild('treeContainer', { static: false }) treeContainer!: ElementRef;

  ngAfterViewInit(): void {
    if (typeof document !== 'undefined') {
      // this.createTree();
    }
  }


  createTree() {
    const data = {
      "name": "Swapnasheela",
      "current_designation": "Lead Assistant Manager",
      "Stream": "Front End Developer",
      "children": [{
        "name": "Technical Skill",
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

    const margin = { top: 20, right: 120, bottom: 20, left: 120 };
    const width = 600 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;
    const rectW = 60;
    const rectH = 30;
    const zoom: any = d3.zoom().on("zoom", (event) => {
      svg.attr("transform", event.transform);
    });

    const diagonal: any = d3.linkVertical()
      .x((d: any) => d.x + rectW / 2)
      .y((d: any) => d.y + rectH / 2);

    const svg = d3.select(this.treeContainer.nativeElement)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      // .attr('transform', `translate(${width / 2},100)`)
      // .call(zoom) // Attach zoom behavior to the SVG
      .append("g");


    // Calculate the center position of the SVG (half of width and height)
    const centerX = (width + margin.left + margin.right) / 2;
    const centerY = (height + margin.top + margin.bottom) / 2;


    // Set an initial translation to position the view
    // svg.call(zoom.transform, d3.zoomIdentity.translate(centerX, centerY)); // Apply translation after zoom setup

    const treeLayout = d3.tree().size([height, width]);
    let i = 0;
    const duration = 750;

    const root: any = d3.hierarchy(data);// 'data' is your hierarchical structure
    root.x0 = 0;
    root.y0 = height / 2;

    function collapse(d: any) {
      if (d.children) {
        d._children = d.children;
        d._children.forEach(collapse);
        d.children = null;
      }
    }

    root.children?.forEach(collapse);
    update(root);
    function update(source: any) {
      const treeData = treeLayout(root); // Compute the new tree layout
      const nodes = treeData.descendants(); // Get all nodes
      const links = treeData.links(); // Get all links

      // Assign unique ID and initialize x and y for each node
      nodes.forEach((d: any, index: number) => {
        d.id = d.id || index; // Assign ID if it doesn't exist
        d.y = d.depth * 180; // Set y position based on depth
      });

      links.forEach((d: any) => {
        d.source.id = d.source.id || `source-${Math.random()}`;
        d.target.id = d.target.id || `target-${Math.random()}`;
      });

      // Nodes
      const node = svg.selectAll('g.node')
        .data(nodes, (d: any) => d.id);

      const nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr('transform', (d: any) => `translate(${source.x0 || 0},${source.y0 || 0})`) // Use source.x0 and source.y0 as fallback
        .on('click', (event: any, d: any) => {
          // Toggle children visibility
          if (d.children) {
            d._children = d.children;
            d.children = null;
          } else {
            d.children = d._children;
            d._children = null;
          }
          update(d);
        });

      nodeEnter.append("rect")
        .attr("width", rectW)
        .attr("height", rectH)
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .style("fill", function (d: any) {
          return d._children ? "lightsteelblue" : "#fff";
        });

      nodeEnter.append("text")
        .attr("x", rectW / 2)
        .attr("y", rectH / 2)
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .each(function (d: any) {
          const text: any = d3.select(this);
          const textWidth = text.node().getBBox().width; // Get the width of the text

          // Scale font size to fit the rectangle
          const scaleFactor = Math.min(rectW / textWidth, 1); // Keep scale factor <= 1
          const fontSize = Math.max(10, scaleFactor * 14); // Avoid font being too small

          text.attr("font-size", fontSize);  // Apply dynamic font size

          // Reposition text vertically to account for any scaling
          text.attr("y", rectH / 2 + (fontSize / 2) * 0.35);  // Adjust vertical positioning after scaling
        })
        .text(function (d: any) {
          return d.data.name;
        });

      const nodeUpdate = nodeEnter.merge(node as any)
        .transition()
        .duration(duration)
        .attr('transform', (d: any) => `translate(${d.x},${d.y})`); // Update the position based on the new x and y

      nodeUpdate.select("rect")
        .attr("width", rectW)
        .attr("height", rectH)
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .style("fill", function (d: any) {
          return d._children ? "lightsteelblue" : "#fff";
        });

      nodeUpdate.select('text')
        .style('fill-opacity', 1);

      const nodeExit = node.exit()
        .transition()
        .duration(duration)
        .attr('transform', (d: any) => `translate(${source.x},${source.y})`)
        .remove();

      // Links
      const link = svg.selectAll('path.link')
        .data(links, (d: any) => d.target.id);

      const linkEnter = link.enter().insert('path', "g")
        .attr('class', 'link')
        .attr('d', (d: any) => {
          const o = { x: source.x, y: source.y }; // Start at the source position
          return diagonal({ source: o, target: o });
        })
        .style("stroke-width", 1.5)  // Make link line thinner
        .style("stroke", "#ccc")  // Set a light color for the links, if desired
        .style("fill", "none");    // Ensure there is no fill color;

      linkEnter.merge(link as any)
        .transition()
        .duration(duration)
        .attr('d', d => diagonal(d)) // Ensure the link follows the correct path
        .attr('transform', (d: any) => `translate(${d.x},${d.y})`)
        .style("stroke-width", 1.5)  // Apply thin line style
        .style("stroke", "#ccc")    // Light grey color
        .style("fill", "none");     // No fill;

      link.exit().transition().duration(duration)
        .attr('d', d => {
          const o = { x: source.x, y: source.y };
          return diagonal({ source: o, target: o });
        }).remove();

      // Save the positions for the next update
      nodes.forEach((d: any) => {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }


  }
}
