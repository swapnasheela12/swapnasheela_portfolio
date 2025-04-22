import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-projectExperienceDialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule // 👈 this is required for <mat-icon>
  ],
  templateUrl: './projectExperienceDialog.component.html',
  styleUrls: ['./projectExperienceDialog.component.scss']
})
export class ProjectExperienceDialogComponent implements OnInit {
  isVisible = true;


  constructor(public dialogRef: MatDialogRef<ProjectExperienceDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  trackByFn(index: number, item: any): any {
    return item.project_no; // or item.id if available
  }

  onClose(): void {
    this.dialogRef.close();
  }


}
