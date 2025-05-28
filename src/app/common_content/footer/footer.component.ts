import { CommonModule, ViewportScroller } from '@angular/common';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { inject } from '@angular/core';

'@angular/material/snack-bar';

@Component({
    selector: 'app-footer',
    imports: [MatButtonModule,
        MatExpansionModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        RouterLink,
        RouterLinkActive,
        CommonModule,
        ReactiveFormsModule,
        MatSnackBarModule,
    ],
    standalone: true,
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss'
})
export class FooterComponent {
    emailControl = new FormControl('', [Validators.required, Validators.email]);

    constructor(private firestore: Firestore, private snackBar: MatSnackBar) { }
    async submitEmail() {
        if (this.emailControl.invalid) {
            this.snackBar.open('Please enter a valid email address.', 'Close', {
                duration: 6000,
                panelClass: ['orange-snackbar']
            });
            return;
        }

        try {
            const email = this.emailControl.value;
            const docRef = await addDoc(collection(this.firestore, 'newsletter_emails'), {
                email,
                timestamp: new Date(),
            });

            this.snackBar.open('Thanks! You’ll now receive updates.', 'Close', {
                duration: 6000,
                panelClass: ['orange-snackbar']
            });
            this.emailControl.reset();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            this.snackBar.open('Oops! Something went wrong. Try again later.', 'Close', {
                duration: 6000,
                panelClass: ['orange-snackbar']
            });
        }
    }



}
