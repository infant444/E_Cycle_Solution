import { Component, OnInit } from '@angular/core';
import { Title } from "../../sub_component/title/title";
import { TimesheetBaseNav } from "../../sub_component/timesheet-base-nav/timesheet-base-nav";

@Component({
  selector: 'app-time-sheet-week-view',
  imports: [Title, TimesheetBaseNav],
  templateUrl: './time-sheet-week-view.html',
  styleUrl: './time-sheet-week-view.css'
})
export class TimeSheetWeekView implements OnInit{
  currentWeekStart=new Date();
  weekTotal = 0;
  ngOnInit(): void {
    // console.log(this.getWeekDays())
  }
getWeekDays() {
    const today = this.currentWeekStart;
    const currentDay = today.getDay();
    const diff = today.getDate() - currentDay + (currentDay === 0 ? -6 : 1);
    const monday = new Date(today.setDate(diff));

    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(monday);
      day.setDate(monday.getDate() + i);
      weekDays.push(day);
    }
    console.log(weekDays)
    return  weekDays
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

}
