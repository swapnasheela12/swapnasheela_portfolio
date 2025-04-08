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
      this.createTree();
    }
  }


  createTree() {
    const data = {
      "name": "flare",
      "children": [{
        "name": "analytics",
        "children": [{
          "name": "cluster",
          "children": [{
            "name": "AgglomerativeCluster",
            "size": 3938
          }, {
            "name": "CommunityStructure",
            "size": 3812
          }, {
            "name": "HierarchicalCluster",
            "size": 6714
          }, {
            "name": "MergeEdge",
            "size": 743
          }]
        }, {
          "name": "graph",
          "children": [{
            "name": "BetweennessCentrality",
            "size": 3534
          }, {
            "name": "LinkDistance",
            "size": 5731
          }, {
            "name": "MaxFlowMinCut",
            "size": 7840
          }, {
            "name": "ShortestPaths",
            "size": 5914
          }, {
            "name": "SpanningTree",
            "size": 3416
          }]
        }, {
          "name": "optimization",
          "children": [{
            "name": "AspectRatioBanker",
            "size": 7074
          }]
        }]
      }, {
        "name": "animate",
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
        "name": "data",
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
        "name": "display",
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
      }, {
        "name": "flex",
        "children": [{
          "name": "FlareVis",
          "size": 4116
        }]
      }, {
        "name": "physics",
        "children": [{
          "name": "DragForce",
          "size": 1082
        }, {
          "name": "GravityForce",
          "size": 1336
        }, {
          "name": "IForce",
          "size": 319
        }, {
          "name": "NBodyForce",
          "size": 10498
        }, {
          "name": "Particle",
          "size": 2822
        }, {
          "name": "Simulation",
          "size": 9983
        }, {
          "name": "Spring",
          "size": 2213
        }, {
          "name": "SpringForce",
          "size": 1681
        }]
      }]
    };

    const margin = { top: 20, right: 120, bottom: 20, left: 120 };
    const width = 960 - margin.left - margin.right;
    const height = 800 - margin.top - margin.bottom;
    const rectW = 60;
    const rectH = 30;
    const zoom: any = d3.zoom().on("zoom", (event) => {
      g.attr("transform", event.transform);
    });

    const diagonal: any = d3.linkVertical()
      .x((d: any) => d.x + rectW / 2)
      .y((d: any) => d.y + rectH / 2);

    const svg = d3.select(this.treeContainer.nativeElement)
      .append("svg")
      // .attr("width", 1000)
      // .attr("height", 1000)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .call(zoom) // Attach zoom behavior to the SVG
      .append("g")
      .attr("transform", "translate(" + 350 + "," + 20 + ")");

    const g = svg.append("g");

    // Set an initial translation to position the view
    svg.call(zoom.transform, d3.zoomIdentity.translate(350, 20)); // Apply translation after zoom setup

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

      nodes.forEach((d: any, index: number) => {
        d.id = d.id || index; // Assign ID if it doesn't exist
      });

      links.forEach((d: any) => {
        d.source.id = d.source.id || `source-${Math.random()}`;
        d.target.id = d.target.id || `target-${Math.random()}`;
      });

      nodes.forEach(d => d.y = d.depth * 180); // Adjust horizontal positioning

      // Nodes
      const node = g.selectAll('g.node')
        .data(nodes, (d: any) => d.id);

      const nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr('transform', d => `translate(${source.x},${source.y})`) // Position nodes based on the source
        .on('click', (event: any, d: any) => {
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
        .attr("color", "black")
        .text(function (d) {
          return d.name;
        });

      const nodeUpdate = nodeEnter.merge(node as any)
        .transition()
        .duration(duration)
        .attr('transform', d => `translate(${d.x},${d.y})`); // Update position of nodes

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
        .attr('transform', d => `translate(${source.x},${source.y})`)
        .remove();

      // Links
      const link = g.selectAll('path.link')
        .data(links, (d: any) => d.target.id);



      const linkEnter = link.enter().insert('path', "g")
        .attr('class', 'link')
        .attr('d', (d: any) => {
          const o = { x: source.x, y: source.y }; // Start at the source position
          return diagonal({ source: o, target: o });
        });

      linkEnter.merge(link as any)
        .transition()
        .duration(duration)
        .attr('d', d => diagonal(d)) // Make sure the link follows the correct path
        .attr('transform', (d: any) => `translate(${d.x},${d.y})`); // Make sure links are also positioned at the correct coordinates

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
