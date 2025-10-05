import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TimeSheetService } from '../../Services/timesheet/time-sheet.service';
import { TimeSheet } from '../../model/timesheet.model';
import { ProjectModel } from '../../model/project.model';
import { ProjectServices } from '../../Services/project/project.services';
import { UserServices } from '../../Services/user/user';
import { User } from '../../model/user.model';
import { Title } from "../../sub_component/title/title";
import { NotFound } from "../../sub_component/not-found/not-found";
import { trigger, state, style, transition, animate } from '@angular/animations';
@Component({
  selector: 'app-admin-time-sheet.component',
  imports: [CommonModule, MatIconModule, RouterModule, FormsModule, Title, NotFound],
  templateUrl: './admin-time-sheet.component.html',
  styleUrl: './admin-time-sheet.component.css',
   animations: [
    trigger('expandCollapse', [
      state('collapsed', style({
        height: '0px',
        opacity: 0,
        overflow: 'hidden',
        padding: '0'
      })),
      state('expanded', style({
        height: '*',
        opacity: 1,
        padding: '*'
      })),
      transition('collapsed <=> expanded', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class AdminTimeSheetComponent implements OnInit {

  timeSheet: TimeSheet[] = [];
  DefaultTimeSheet: TimeSheet[] = [];
  project: ProjectModel[] = [];
  date: string = '';
  status: string = '';
  projectId: string = '';
  user?:User[];
  expandedIndex: number | null = null;
  constructor(
    private timeSheetServices: TimeSheetService,
    private projectService: ProjectServices,
    private userService:UserServices,
    private cd:ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe((res)=>{
      this.user=res;
    })
    this.projectService.getProjectByMangerId().subscribe((res)=>{
      this.project=res;
    })
    this.timeSheetServices.getTimeSheetManager().subscribe((res) => {
      this.DefaultTimeSheet = res;
      this.timeSheet = res;
      console.log(res)
      this.cd.markForCheck();
    })
  }
  getBaseProject() {
    if (this.projectId == '') {
      this.timeSheet = this.DefaultTimeSheet;
    } else {
      this.timeSheet=this.DefaultTimeSheet.filter(s=>s.project===this.projectId);

    }
    this.cd.markForCheck();
  }
  getBaseDate() {
    if (this.date == '') {
      this.timeSheet = this.DefaultTimeSheet;
    } else {
this.timeSheet = this.DefaultTimeSheet.filter(s => {
  const d1 = new Date(s.date);
  const d2 = new Date(this.date);
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
});    }
    this.cd.markForCheck();
  }
  getBaseStatus() {
    if (this.status == '') {
      this.timeSheet = this.DefaultTimeSheet;
    } else {
      this.timeSheet=this.DefaultTimeSheet.filter(s=>s.status===this.status)
    }
    this.cd.markForCheck();
  }
  getUser(id:string){
    return this.user?.filter(s=>s.id===id)[0];
  }
   secToHr(x:string){
  return (parseInt(x) / 3600)
 }
  getTime(dateStr: string): Date {
  const today = new Date();
  const [hours, minutes] = dateStr.split(':').map(Number);
  today.setHours(hours, minutes, 0);
  return today;
}
  toggleView(index: number) {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }
  updateStatus(id:string,status:string){
    this.timeSheetServices.updateStatus(id,status).subscribe((res)=>{
      this.reAssign()
    })
  }
  reAssign(){
   this.timeSheetServices.getTimeSheetManager().subscribe((res) => {
      this.DefaultTimeSheet = res;
      this.timeSheet = res;
      this.cd.markForCheck();
    })
  }
}
