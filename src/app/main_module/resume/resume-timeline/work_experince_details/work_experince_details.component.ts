import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-work_experince_details',
  standalone: true,
  templateUrl: './work_experince_details.component.html',
  styleUrls: ['./work_experince_details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Work_experince_detailsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<Work_experince_detailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  close(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
