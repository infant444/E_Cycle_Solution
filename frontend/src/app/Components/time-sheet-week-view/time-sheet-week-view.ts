import { Component, OnInit } from '@angular/core';
import { Title } from "../../sub_component/title/title";
import { TimesheetBaseNav } from "../../sub_component/timesheet-base-nav/timesheet-base-nav";
import { format } from 'path';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-time-sheet-week-view',
  imports: [Title, TimesheetBaseNav,CommonModule],
  templateUrl: './time-sheet-week-view.html',
  styleUrl: './time-sheet-week-view.css'
})
export class TimeSheetWeekView implements OnInit{
  currentWeekStart=new Date();
  weekTotal = 0;
  weekdays: string[] = [];
  dateRange!:string;
  ngOnInit(): void {
    this.getWeekDays();
  }
getWeekDays() {
    const today = this.currentWeekStart;
    const currentDay = today.getDay();
    const diff = today.getDate() - currentDay + (currentDay === 0 ? -6 : 1);
    const monday = new Date(today.setDate(diff));

    this.weekdays= [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(monday);
      day.setDate(monday.getDate() + i);
      this.weekdays.push(day.toISOString().split('T')[0]);
    }
    console.log(this.weekdays);
    this.formatDateRange(this.weekdays[0],this.weekdays[6]);
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
 formatDateRange(start: string, end: string){
    const startDate = new Date(start);
  const endDate = new Date(end);

  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  const year = endDate.getFullYear();

  const startFormatted = startDate.toLocaleDateString('en-US', options);
  const endFormatted = endDate.toLocaleDateString('en-US', options);

  this.dateRange= `${startFormatted} – ${endFormatted}, ${year}`;

}
formateDate(date:string):string{
  const x=new Date(date);

  const options: Intl.DateTimeFormatOptions = {weekday: 'short', month: 'short', day: 'numeric' };
    const dateFormatted = x.toLocaleDateString('en-US', options);
    return `${dateFormatted}`;
}
}
