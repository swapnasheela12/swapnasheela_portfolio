import { Component, OnInit } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-discuss-project',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './discuss-project.component.html',
  styleUrls: ['./discuss-project.component.scss']
})
export class DiscussProjectComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
