import { Component } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
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
  }
}
