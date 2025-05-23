// import bootstrap from '../../../main.server';
import * as bootstrap from 'bootstrap'; // for TypeScript type support and access

import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { ContactComponent } from '../../main_module/contact/contact.component';

@Component({
  selector: 'app-toolbar',
  imports: [RouterLink, RouterLinkActive],
  standalone: true,
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  @ViewChild('navbarCollapse', { static: false }) navbarCollapseRef!: ElementRef;

  // Function to handle the active state
  setActive(event: any) {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');

    // Remove active class from all links
    navLinks.forEach((link) => {
      link.classList.remove('active');
    });

    // Add active class to the clicked link
    event.target.classList.add('active');


    const navbarCollapseEl = this.navbarCollapseRef.nativeElement;


    // Collapse the navbar if it's shown (only on small screens)
    if (navbarCollapseEl.classList.contains('show')) {
      const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapseEl) ||
        new bootstrap.Collapse(navbarCollapseEl);
      bsCollapse.hide();
    }



  }
}
