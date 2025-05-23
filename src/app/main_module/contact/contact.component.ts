import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ThreeDTravelStoryComponent } from './threeDTravelStory/threeDTravelStory.component';
import { TravelStoryComponent } from './travel-story/travel-story.component';
@Component({
  selector: 'app-contact',
  imports: [FormsModule, GoogleMapsModule, TravelStoryComponent, MatSnackBarModule],
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {


  title = 'google-maps-demo';

  // Set the center of the map (latitude, longitude)
  center = { lat: 40.31, lng: -74.32 }; // San Francisco, for example

  // Set zoom level
  zoom = 12;

  // Set a marker on the map
  markerPosition = { lat: 40.31, lng: -74.32 }; // San Francisco
  contact = { name: '', email: '', message: '' };
  constructor(public snackBar: MatSnackBar) { }
  sendMessage() {
    this.snackBar.open('Message sent', 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });

    this.contact = { name: '', email: '', message: '' };

  }
}
