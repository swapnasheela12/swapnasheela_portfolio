import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SocketService } from '../../services/socket.service';
import { TravelStoryComponent } from './travel-story/travel-story.component';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    TravelStoryComponent
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private firestore: Firestore) {
    // this.socketService.on('some-event', data => console.log(data));
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  sendMessage() {
    const data = this.contactForm.value;
    const contactRef = collection(this.firestore, 'contacts');
    addDoc(contactRef, data).then(() => {

    }).catch(error => {
      console.error("Error:", error);
    });

    emailjs.send(
      'service_burl1cq',    // Replace with your actual service ID
      'template_yw5qbpl',   // Replace with your actual template ID
      {
        name: data.name,
        email: data.email,
        title: data.subject,
        message: data.message,
      },
      'FOTJJ6JL7WZtaIy2m'     // Replace with your actual public key
    ).then(() => {

      if (this.contactForm.invalid) {
        this.snackBar.open('Please fill all fields correctly.', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['orange-snackbar']
        });
        return;
      }
      console.log(this.contactForm.value); // Or send to backend
      this.snackBar.open('Message sent successfully!', 'Close', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['orange-snackbar']
      });

      this.contactForm.reset();
    }).catch((error) => {
      console.error('EmailJS error:', error);
      this.snackBar.open('Failed to send email. Please try again later.', 'Close', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['orange-snackbar']
      });
    });
  }

}

