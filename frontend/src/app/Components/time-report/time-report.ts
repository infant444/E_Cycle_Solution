import { Component } from '@angular/core';
import { Title } from "../../sub_component/title/title";
import { TimesheetBaseNav } from "../../sub_component/timesheet-base-nav/timesheet-base-nav";

@Component({
  selector: 'app-time-report',
  imports: [Title, TimesheetBaseNav],
  templateUrl: './time-report.html',
  styleUrl: './time-report.css'
})
export class TimeReport {

}
