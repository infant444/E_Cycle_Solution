import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TimeSheet } from '../../model/timesheet.model';
import { UserServices } from '../../Services/user/user';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-pending-timesheets',
  imports: [CommonModule],
  templateUrl: './pending-timesheets.html',
  styleUrl: './pending-timesheets.css'
})
export class PendingTimesheets implements OnInit {
  user?:User[];
  @Input()
  items: TimeSheet[] = [];
  constructor(private userServices:UserServices){}
  secToHr(x: any) {
    return (x / 3600)
  }
  ngOnInit(): void {
      this.userServices.getAll().subscribe((res)=>{
        this.user=res;
      })
  }
  getProfile(id:string){
    return this.user?.find(s=>s.id===id)?.profile;
  }
}
