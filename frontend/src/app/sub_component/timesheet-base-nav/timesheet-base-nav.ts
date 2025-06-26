import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-timesheet-base-nav',
  imports: [MatIconModule,CommonModule,RouterModule],
  templateUrl: './timesheet-base-nav.html',
  styleUrl: './timesheet-base-nav.css'
})
export class TimesheetBaseNav {

}
