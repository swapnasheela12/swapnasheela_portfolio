import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './image-dialog.component.html',
  styleUrl: './image-dialog.component.scss',
})
export class ImageDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { image: string; title: string }) { }
  disableRightClick(event: MouseEvent) {
    event.preventDefault();
  }
}
