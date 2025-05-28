import { Component, OnInit } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-discuss-project',
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule, MatButtonModule],
  standalone: true,
  templateUrl: './discuss-project.component.html',
  styleUrls: ['./discuss-project.component.scss']
})
export class DiscussProjectComponent implements OnInit {

  ngOnInit() {
  }
  emailControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(private firestore: Firestore, private snackBar: MatSnackBar) { }

  async sendEmail() {
    if (this.emailControl.invalid) {
      this.snackBar.open('Please enter a valid email address.', 'Close', {
        duration: 3000,
        panelClass: ['orange-snackbar']
      });
      return;
    }

    try {
      const docRef = await addDoc(collection(this.firestore, 'letDiscussProjectEmails'), {
        email: this.emailControl.value,
        timestamp: new Date()
      });
      this.snackBar.open('Email saved successfully!', 'Close', {
        duration: 3000,
        panelClass: ['orange-snackbar']
      });
      this.emailControl.reset();
    } catch (error) {
      this.snackBar.open('Error saving email. Try again later.', 'Close', {
        duration: 3000,
        panelClass: ['orange-snackbar']
      });
    }
  }
}
