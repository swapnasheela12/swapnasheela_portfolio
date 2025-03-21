import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  contact = { name: '', email: '', message: '' };

  sendMessage() {
    console.log("Message Sent:", this.contact);
    alert("Your message has been sent!");
    this.contact = { name: '', email: '', message: '' };
  }
}
