import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MeetingModel } from '../../model/meeting.model';
import { Router } from '@angular/router';
import { CalendarClock, LucideAngularModule, } from 'lucide-angular';

@Component({
  selector: 'app-upcomming-schedules',
  imports: [CommonModule,LucideAngularModule],
  templateUrl: './upcomming-schedules.html',
  styleUrl: './upcomming-schedules.css'
})
export class UpcommingSchedules  {

 @Input()
 items:MeetingModel[]=[];
 icon=CalendarClock
  constructor(
    public router:Router
  ){}
    calculateDate(x: string) {
    const dueDate = new Date(x).getTime();   // convert to ms
    const today = new Date().getTime();      // current time in ms
    const diffMs = dueDate - today;          // difference in ms
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    return diffDays;
  }
}
