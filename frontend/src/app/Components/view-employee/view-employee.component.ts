import { CommonModule ,Location} from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../model/user.model';
import { UserServices } from '../../Services/user/user';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { TimeSheetService } from '../../Services/timesheet/time-sheet.service';
import { NotFound } from "../../sub_component/not-found/not-found";
import { TimeSheet } from '../../model/timesheet.model';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ProjectServices } from '../../Services/project/project.services';
import { Task } from '../../model/task.model';
import { ProjectModel } from '../../model/project.model';
import { RecentWorks } from "../../sub_component/recent-works/recent-works";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-employee.component',
  imports: [CommonModule, FormsModule, MatIconModule, RouterModule, NotFound, RecentWorks],
  templateUrl: './view-employee.component.html',
  styleUrl: './view-employee.component.css',
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
export class ViewEmployeeComponent implements OnInit {
  tab = 'overview';
  period = 'all';
  employee!: User;
  totalHours!: number;
  complete_task!: number;
  total_task!: number;
  percentage_complete!: number;
  avg_working_hours!: number;
  timeSheet?: TimeSheet[];
  expandedIndex: number | null = null;
  userTask?: Task[];
  ResentTask?: Task[];
  resentTimeSheet?: TimeSheet[];
  allProject?: ProjectModel[];

  constructor(
    private userServices: UserServices,
    private activateRouter: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private timeSheetServices: TimeSheetService,
    private projectServices: ProjectServices,
    private router: Router,
    private toastServices:ToastrService,
    public location:Location,
  ) { }
  ngOnInit(): void {
    this.activateRouter.params.subscribe((prams) => {
      if (prams.id) {
        this.userServices.getById(prams.id).subscribe((res) => {
          this.employee = res;
          this.projectServices.getByParticularStaffId(prams.id).subscribe((res) => {
            this.allProject = res;
          })
          this.getAllReport()
          this.cd.detectChanges()
        })


      }
    })
  }

  getAllReport() {
    this.timeSheetServices.getTimeBaseReport(this.employee.id, this.period).subscribe((res) => {
      console.log(res)
      this.totalHours = parseInt(res.totalHours) / 3600;
      this.complete_task = parseInt(res.completeTask);
      this.total_task = parseInt(res.totalTask);
      this.percentage_complete = parseInt(((this.complete_task / this.total_task) * 100).toString())
      const length = res.getWorkHours.length;
      this.avg_working_hours = this.totalHours / length;
      this.timeSheet = res.timeSheet;
      this.userTask = res.task;
      this.resentTimeSheet = res.timeSheet.slice(0, 3);
      this.ResentTask = res.task.slice(0, 3);
      this.cd.markForCheck();
    })
  }

  secToHr(x: string) {
    return (parseInt(x) / 3600)
  }
  getTime(dateStr: string): Date {
    const today = new Date();
    const [hours, minutes] = dateStr.split(':').map(Number);
    today.setHours(hours, minutes, 0);
    return today;
  }
  getTaskProcessed() {
    return this.userTask?.filter(s => s.status === 'processed').length;
  }
  getPending() {
    return this.userTask?.filter(s => (s.status == 'pending' || s.status == 'accepted')).length;

  }
  toggleView(index: number) {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }
  viewTask(id: string) {
    this.router.navigateByUrl("/task/view/" + id);
  }
  calculateDate(x: string) {
    const dueDate = new Date(x).getTime();   // convert to ms
    const today = new Date().getTime();      // current time in ms
    const diffMs = dueDate - today;          // difference in ms
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    return diffDays;
  }
  edit(id:string){
    this.router.navigateByUrl("/employee/edit/"+id);
  }
  delete(id:string){
    const confirmed = window.confirm("Are you sure you want to delete this Employee?");
  if (confirmed) {
    this.userServices.delete(id).subscribe((res)=>{
      this.router.navigateByUrl("/employee");
    });
  }
  }
  lock(id:string){
    const confirmed = window.confirm("Are you sure you want to Locked this Employee?");
  if (confirmed) {
    this.userServices.lockedStaff(id,!this.employee.lock).subscribe(_=>{
      this.toastServices.success("Successfully update lock Status")
    })
  }
  }
  reassignPassword(id:string){
    this.userServices.resetPassword(id).subscribe((res)=>{
      this.toastServices.success("successfully reset password");
    })
  }
}
