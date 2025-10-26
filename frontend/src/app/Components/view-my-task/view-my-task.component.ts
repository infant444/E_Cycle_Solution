import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Task } from '../../model/task.model';
import { ProjectServices } from '../../Services/project/project.services';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule ,Location} from '@angular/common';
import { User } from '../../model/user.model';
import { UserServices } from '../../Services/user/user';
import { ProjectModel } from '../../model/project.model';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-view-my-task.component',
  imports: [
    MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatProgressBarModule, CommonModule, RouterModule],
  templateUrl: './view-my-task.component.html',
  styleUrl: './view-my-task.component.css'
})
export class ViewMyTaskComponent implements OnInit {
 task!: Task;
  user!: User;
  project!:ProjectModel;
  constructor(
    private taskServices: ProjectServices,
    private cd: ChangeDetectorRef,
    private activateRouter: ActivatedRoute,
    private userService: UserServices,
    private router:Router,
    private toasterServices:ToastrService,
    public location:Location
  ) {

  }
  ngOnInit(): void {
    this.activateRouter.params.subscribe((param) => {
      if (param.taskId) {
        this.taskServices.getTaskById(param.taskId).subscribe((res) => {
          this.task = res;
          if(this.task.staff){
            this.getUser();
            this.getProject();
          }
          this.cd.detectChanges()
        })

      }
    })
  }
  calculateDate(x: string) {
    const dueDate = new Date(x).getTime();   // convert to ms
    const today = new Date().getTime();      // current time in ms
    const diffMs = dueDate - today;          // difference in ms
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    return diffDays;
  }
  getUser() {
    this.userService.getById(this.task.staff).subscribe((res) => {
      this.user = res
      this.cd.markForCheck()
    })
  }
  getProject(){
    this.taskServices.getProjectById(this.task.project).subscribe((res)=>{
      this.project=res;
      this.cd.markForCheck()
    })
  }
  sub(a:string,b:string):number{
    console.log(parseInt(b))
    return (parseInt(b)-parseInt(a));
  }
  updateStatus(status:string){
    this.taskServices.updateTaskStatus(this.task.id,status).subscribe((res)=>{
      this.toasterServices.success("successfully update status")
    })
  }
  back(){
      this.router.navigateByUrl("/task/myTask")
  }
  move(){
      this.router.navigateByUrl("/time-sheet")

  }
}
