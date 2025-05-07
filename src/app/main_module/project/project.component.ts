import * as d3 from 'd3';

import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
  @ViewChild('gallerySvg') svgRef!: ElementRef<SVGSVGElement>;
  @ViewChild('galleryWrapper') wrapperRef!: ElementRef<HTMLElement>;

  selectedImage: string | null = null;

  tiles = [
    { image: '../../../assets/image/PNG/myServices/hitachi-ABB.png', title: 'LOREM IPSUM', desc: 'sed do eiusmod tempor incididunt ut labore' },
    { image: '../../../assets/image/PNG/myServices/dashbord-jio.png', title: 'LOREM IPSUM', desc: 'sed do eiusmod tempor incididunt ut labore' },
    { image: '../../../assets/image/PNG/myServices/pixtran.png', title: 'LOREM IPSUM', desc: 'sed do eiusmod tempor incididunt ut labore' },
    { image: '../../../assets/image/PNG/myServices/hire4hotel.png', title: 'LOREM IPSUM', desc: 'sed do eiusmod tempor incididunt ut labore' },
    { image: '../../../assets/image/PNG/myServices/100pro.png', title: 'LOREM IPSUM', desc: 'sed do eiusmod tempor incididunt ut labore' },
    { image: '../../../assets/image/PNG/myServices/xovient.png', title: 'LOREM IPSUM', desc: 'sed do eiusmod tempor incididunt ut labore' },
    { image: '../../../assets/image/PNG/myServices/hitachi-ABB.png', title: 'LOREM IPSUM', desc: 'sed do eiusmod tempor incididunt ut labore' },
    { image: '../../../assets/image/PNG/myServices/dashbord-jio.png', title: 'LOREM IPSUM', desc: 'sed do eiusmod tempor incididunt ut labore' },
    { image: '../../../assets/image/PNG/myServices/pixtran.png', title: 'LOREM IPSUM', desc: 'sed do eiusmod tempor incididunt ut labore' },
    { image: '../../../assets/image/PNG/myServices/hire4hotel.png', title: 'LOREM IPSUM', desc: 'sed do eiusmod tempor incididunt ut labore' },
    { image: '../../../assets/image/PNG/myServices/100pro.png', title: 'LOREM IPSUM', desc: 'sed do eiusmod tempor incididunt ut labore' },
    { image: '../../../assets/image/PNG/myServices/xovient.png', title: 'LOREM IPSUM', desc: 'sed do eiusmod tempor incididunt ut labore' }
  ];

  ngAfterViewInit(): void {
    this.renderGallery();
  }

  @HostListener('window:resize')
  onResize() {
    d3.select(this.svgRef.nativeElement).selectAll('*').remove();
    this.renderGallery();
  }

  openLightbox(image: string) {
    this.selectedImage = image;
  }

  closeLightbox() {
    this.selectedImage = null;
  }

  renderGallery(): void {
    const svg = d3.select(this.svgRef.nativeElement);
    const wrapper = this.wrapperRef.nativeElement;
    const wrapperWidth = wrapper.clientWidth;
    const wrapperHeight = wrapper.clientHeight;

    const tileSize = Math.min(wrapperWidth, wrapperHeight) / 3.5;
    const padding = tileSize * 0.4;
    const rows = 3;

    const g = svg.append('g').attr('transform', 'translate(0, 0)');
    const totalCols = Math.ceil(this.tiles.length / rows);
    const totalWidth = totalCols * (tileSize + padding) + tileSize;

    svg.attr('height', rows * (tileSize + padding)).attr('width', wrapperWidth);

    // Add drop shadow filter
    const defs = svg.append('defs');
    const filter = defs.append('filter')
      .attr('id', 'dropShadow')
      .attr('height', '130%');
    filter.append('feDropShadow')
      .attr('dx', 0)
      .attr('dy', 4)
      .attr('stdDeviation', 4)
      .attr('flood-color', '#000')
      .attr('flood-opacity', 0.4);

    this.tiles.forEach((tile, i) => {
      const row = i % rows;
      const col = Math.floor(i / rows);
      const stagger = (row === 1) ? tileSize / 1.6 : 0;
      const x = col * (tileSize + padding) + stagger;
      const y = row * (tileSize + padding);



      const group = g.append('g')
        .attr('transform', `translate(${x + tileSize / 2}, ${y + tileSize / 2}) rotate(45)`)
        .style('cursor', 'pointer')
        .on('click', () => this.openLightbox(tile.image))
        .on('mouseenter', function () {
          d3.select(this).raise().transition().duration(200)
            .attr('transform', `translate(${x + tileSize / 2}, ${y + tileSize / 2}) rotate(45) scale(1.07)`)
            .select('rect')
            .attr('filter', 'url(#dropShadow)');
        })
        .on('mouseleave', function () {
          d3.select(this).transition().duration(200)
            .attr('transform', `translate(${x + tileSize / 2}, ${y + tileSize / 2}) rotate(45) scale(1)`)
            .select('rect')
            .attr('filter', null);
        });

      // Background diamond tile
      group.append('rect')
        .attr('x', -tileSize / 2)
        .attr('y', -tileSize / 2)
        .attr('width', tileSize)
        .attr('height', tileSize)
        .attr('fill', '#4ec3dc')
        .attr('stroke', 'white')
        .attr('stroke-width', tileSize * 0.08)
        .attr('rx', tileSize * 0.1);

      // Reverse rotation for upright content
      const content = group.append('g');

      // ✅ Image inside background tile
      const imagePadding = tileSize * 0.1;
      const imageYOffset = tileSize * 0.15; // adjust upward by 5% of tile height
      content.append('image')
        .attr('href', tile.image)
        .attr('x', -tileSize / 2 + imagePadding)
        .attr('y', -tileSize / 2 + imagePadding - imageYOffset) // shifted upward
        .attr('width', tileSize - imagePadding * 2)
        .attr('height', tileSize - imagePadding * 2)
        .attr('preserveAspectRatio', 'xMidYMid meet');

      // ✅ Text background box
      const textBoxHeight = tileSize * 0.35;
      content.append('rect')
        .attr('x', -tileSize / 2 + imagePadding)
        .attr('y', tileSize / 2 - textBoxHeight - imagePadding)
        .attr('width', tileSize - imagePadding * 2)
        .attr('height', textBoxHeight)
        .attr('fill', 'rgba(0, 0, 0, 0.6)')
        .attr('rx', tileSize * 0.04)
        .attr('transform', 'rotate(0)');

      // ✅ Title
      content.append('text')
        .attr('x', 0)
        .attr('y', tileSize / 2 - textBoxHeight + tileSize * 0.07)
        .attr('fill', 'white')
        .attr('font-size', tileSize * 0.07)
        .attr('font-weight', 'bold')
        .attr('text-anchor', 'middle')
        .attr('font-family', 'sans-serif')
        .text(tile.title)
        .attr('transform', 'rotate(0)');

      // ✅ Short description
      content.append('text')
        .attr('x', 0)
        .attr('y', tileSize / 2 - textBoxHeight + tileSize * 0.14)
        .attr('fill', 'white')
        .attr('font-size', tileSize * 0.055)
        .attr('text-anchor', 'middle')
        .attr('font-family', 'sans-serif')
        .text(tile.desc.slice(0, 30))
        .attr('transform', 'rotate(0)');



    });

    svg.on('mousemove', (event: any) => {
      const { width } = this.svgRef.nativeElement.getBoundingClientRect();
      const mouseX = event.offsetX;
      const scrollRatio = mouseX / width;
      const maxOffset = totalWidth - wrapperWidth;
      const translateX = -scrollRatio * maxOffset;
      g.transition().duration(100).attr('transform', `translate(${translateX}, 0)`);
    });
  }
}

