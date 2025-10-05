import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Title } from "../../sub_component/title/title";
import { TimesheetBaseNav } from "../../sub_component/timesheet-base-nav/timesheet-base-nav";
import { format } from 'path';
import { CommonModule } from '@angular/common';
import { TimeSheetService } from '../../Services/timesheet/time-sheet.service';
import { TimeSheet } from '../../model/timesheet.model';
import { RecentWorks } from "../../sub_component/recent-works/recent-works";
import { NotFound } from "../../sub_component/not-found/not-found";

@Component({
  selector: 'app-time-sheet-week-view',
  imports: [Title, TimesheetBaseNav, CommonModule, RecentWorks],
  templateUrl: './time-sheet-week-view.html',
  styleUrl: './time-sheet-week-view.css'
})
export class TimeSheetWeekView implements OnInit {
  currentWeekStart = new Date();
  weekTotal = 0;
  weekdays: string[] = [];
  dateRange!: string;
  timesheet?: TimeSheet[];
  constructor(
    private timeSheetServices: TimeSheetService,
    private cd: ChangeDetectorRef,
  ) { }
  ngOnInit(): void {
    this.getWeekDays();
  }
  getWeekDays() {
    const today = this.currentWeekStart;
    const currentDay = today.getDay();
    const diff = today.getDate() - currentDay + (currentDay === 0 ? -6 : 1);
    const monday = new Date(today.setDate(diff));

    this.weekdays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(monday);
      day.setDate(monday.getDate() + i);
      this.weekdays.push(day.toISOString().split('T')[0]);
    }
    console.log(this.weekdays);
    this.assignValue(this.weekdays[0], this.weekdays[6]);
    this.formatDateRange(this.weekdays[0], this.weekdays[6]);
  }
  setCurrentWeek(): void {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    this.currentWeekStart = new Date(today);
    this.currentWeekStart.setDate(today.getDate() + mondayOffset);
    this.currentWeekStart.setHours(0, 0, 0, 0);

  }


  previousWeek(): void {
    this.currentWeekStart.setDate(this.currentWeekStart.getDate() - 7);
    this.getWeekDays();
  }

  nextWeek(): void {
    this.currentWeekStart.setDate(this.currentWeekStart.getDate() + 7);
    this.getWeekDays();
  }
  formatDateRange(start: string, end: string) {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    const year = endDate.getFullYear();

    const startFormatted = startDate.toLocaleDateString('en-US', options);
    const endFormatted = endDate.toLocaleDateString('en-US', options);

    this.dateRange = `${startFormatted} – ${endFormatted}, ${year}`;

  }
  formateDate(date: string): string {
    const x = new Date(date);

    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    const dateFormatted = x.toLocaleDateString('en-US', options);
    return `${dateFormatted}`;
  }
  assignValue(start: string, end: string) {
    this.timeSheetServices.getAllWeek(start, end).subscribe((res) => {
      this.timesheet = res;
      console.log(this.timesheet)
      this.cd.markForCheck()
    })
  }
  // dateFilter(date: string) {
  //   return this.timesheet?.filter(s => {
  //     const d1 = new Date(s.date);
  //     const d2 = new Date(date);
  //     console.log(d2)
  //     console.log(d1)
  //     return d1.toISOString().split('T')[0] === d2.toISOString().split('T')[0];
  //   });
  // }
  dateFilter(date: string): TimeSheet[] {
  return this.timesheet?.filter(s => {
    const d1 = new Date(s.date);
    const d2 = new Date(date);

    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  }) || [];
}
calculateHr(date:string):number{
  var sec=0;
    const d2 = new Date(date);
  this.timesheet?.map((value)=>{
    const d1 = new Date(value.date);
    if(  d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()){
        sec=sec+parseInt(value.total_hours.toString());
      }
  })
  return sec/3600;
}
}
