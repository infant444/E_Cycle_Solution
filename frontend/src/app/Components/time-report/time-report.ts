import { Component, OnInit } from '@angular/core';
import { Title } from "../../sub_component/title/title";
import { TimesheetBaseNav } from "../../sub_component/timesheet-base-nav/timesheet-base-nav";
import { CommonModule } from '@angular/common';
import {Chart, registerables} from 'chart.js'
// Chart.register(...registerables);
@Component({
  selector: 'app-time-report',
  imports: [Title, TimesheetBaseNav,CommonModule,],
  templateUrl: './time-report.html',
  styleUrl: './time-report.css'
})
export class TimeReport implements OnInit {
  ngOnInit(): void {

  }

}
