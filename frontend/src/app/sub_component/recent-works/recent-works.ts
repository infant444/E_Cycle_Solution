import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recent-works',
  imports: [CommonModule],
  templateUrl: './recent-works.html',
  styleUrl: './recent-works.css'
})
export class RecentWorks  {

 @Input()
 project_name!:string;

 @Input()
 task_name!:string;

 @Input()
 start_time!:string;

 @Input()
 end_time!:string;

 @Input()
 hr!:string;
 @Input()
 type:string='timeSheet'

 @Input()
 description!:string;

 @Input()
 status!:string;

 secToHr(x:string){
  return (parseInt(x) / 3600)
 }
 getTime(dateStr: string): Date {
  const today = new Date();
  const [hours, minutes] = dateStr.split(':').map(Number);
  today.setHours(hours, minutes, 0);
  return today;
}
}
