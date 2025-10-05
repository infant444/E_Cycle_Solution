
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Title } from "../../sub_component/title/title";
import { ProjectServices } from '../../Services/project/project.services';
import { AddTaskComponent } from "../../sub_component/add-task/add-task.component";
import { Task } from '../../model/task.model';
import { MatIconModule } from '@angular/material/icon';
import { NotFound } from "../../sub_component/not-found/not-found";
import { ProjectModel } from '../../model/project.model';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UserServices } from '../../Services/user/user';
import { User } from '../../model/user.model';
@Component({
  selector: 'app-task.component',
  imports: [CommonModule, RouterModule, Title, AddTaskComponent, MatIconModule, NotFound,FormsModule, MatProgressBarModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit {
  display = 'none';
  type = 'add';
  editTask!:Task;
  task?:Task[];
  defaultTask?:Task[];
  projects!:ProjectModel[];
  selectStatus='';
  selectProject='';
  staff?:User[];
  constructor(
    private projectServices:ProjectServices,
    private cd:ChangeDetectorRef,
    private userServices:UserServices,
    private router:Router
  ){}
  ngOnInit(): void {
    this.projectServices.getProjectByMangerId().subscribe((res)=>{
      this.projects=res;
     this.cd.markForCheck()

    })
    this.projectServices.getAllTaskByManager().subscribe((res)=>{
      this.task=res;
     this.defaultTask=res;
     console.log(this.task)
     this.cd.detectChanges()
    })
    this.userServices.getAll().subscribe((res)=>{
      this.staff=res;
      this.cd.detectChanges();
    })
  }
  dis() {
    if (this.display == 'none') {
      this.editTask = new Task();
      this.display = 'flex';
    } else {
      this.display = 'none';
      this.reAssign()
    }
    console.log(this.display)
  }
  reAssign(){
    this.projectServices.getAllTaskByManager().subscribe((res)=>{
      this.task=res;
     this.defaultTask=res;
     console.log(this.task)
     this.cd.detectChanges()
    })
  }
  edit(x:Task){
        if (this.display == 'none') {
      this.editTask = x;
      this.display = 'flex';
      this.type='edit'
      this.cd.detectChanges()
    } else {
      this.display = 'none';
      this.reAssign()
    }
  }
  view(id:string){
    this.router.navigateByUrl("/task/view/"+id);
  }
  assignStatus(){
    if(this.selectStatus==''){
      this.task=this.defaultTask;
    }
    else{
    this.task=this.defaultTask?.filter(s=>s.status==this.selectStatus);
    }
  }
  assignProject(){
    if(this.selectProject==''){
      this.task=this.defaultTask;
    }else{
    this.task=this.defaultTask?.filter(s=>s.project==this.selectProject);

    }
  }
  getUser(id:string):string{
    return this.staff?.filter(s=>s.id===id)[0].name ||'';
  }
  calculateDate(x: string) {
    const dueDate = new Date(x).getTime();   // convert to ms
    const today = new Date().getTime();      // current time in ms
    const diffMs = dueDate - today;          // difference in ms
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    return diffDays;
  }
}
