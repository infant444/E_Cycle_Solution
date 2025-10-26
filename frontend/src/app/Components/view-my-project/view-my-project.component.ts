import { CommonModule, Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ClientServices } from '../../Services/client/client';
import { ProjectServices } from '../../Services/project/project.services';
import { ActivatedRoute, Router, RouterModule, } from '@angular/router';
import { ProjectModel } from '../../model/project.model';
import { User } from '../../model/user.model';
import { UserServices } from '../../Services/user/user';
import { ClientModel } from '../../model/client.model';
import { MatIconModule } from '@angular/material/icon';
import { Task } from '../../model/task.model';
@Component({
  selector: 'app-view-my-project.component',
  imports: [CommonModule,RouterModule,MatIconModule],
  templateUrl: './view-my-project.component.html',
  styleUrl: './view-my-project.component.css'
})
export class ViewMyProjectComponent {
project!:ProjectModel;
  projectMember?:User[];
  projectManager!:User;
  projectClient!:ClientModel;
  task?:Task[];
  completedTask!:number;
  constructor(
    private clientServices:ClientServices,
    private projectService:ProjectServices,
    private userServices:UserServices,
    private activateRouter:ActivatedRoute,
    private cd:ChangeDetectorRef,
    private router:Router,
    public location:Location
  ){}
  ngOnInit(): void {
      this.activateRouter.params.subscribe((params)=>{
        if(params.projectid){
          this.projectService.getProjectById(params.projectid).subscribe((res)=>{
            this.project=res;
            if (res.team_member) {
              console.log(res.team_member);
              this.getProjectMember(res.team_member);
              this.getProjectManager(res.manager_id);
              this.getClient(res.client_id);
              this.getTask(res.id);
            }
            this.cd.markForCheck();
          })
        }
      })
  }
  calculateDate(x:string){
  const dueDate = new Date(x).getTime();   // convert to ms
  const today = new Date().getTime();      // current time in ms
  const diffMs = dueDate - today;          // difference in ms
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  return diffDays;
  }
  getProjectMember(x:string[]){
    this.userServices.getProjectMemberId(x).subscribe((user)=>{
      this.projectMember=user;
            this.cd.markForCheck();
    })
  }
  getProjectManager(id:string){
    this.userServices.getById(id).subscribe((user)=>{
      this.projectManager=user;
            this.cd.markForCheck();
    })
  }
  getClient(id:string){
    this.clientServices.getClientById(id).subscribe((client)=>{
      this.projectClient=client;
            this.cd.markForCheck();


    })
  }
  getTask(id:string){
    this.projectService.getTask(id).subscribe((res)=>{
      this.task=res;
    })
  }

}
