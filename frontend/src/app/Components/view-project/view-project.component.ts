import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ClientServices } from '../../Services/client/client';
import { ProjectServices } from '../../Services/project/project.services';
import { ActivatedRoute, Router, RouterModule, } from '@angular/router';
import { ProjectModel } from '../../model/project.model';
import { User } from '../../model/user.model';
import { UserServices } from '../../Services/user/user';
import { ClientModel } from '../../model/client.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-view-project',
  imports: [CommonModule,RouterModule,MatIconModule],
  templateUrl: './view-project.component.html',
  styleUrl: './view-project.component.css'
})
export class ViewProjectComponent implements OnInit {
  project!:ProjectModel;
  projectMember?:User[];
  projectManager!:User;
  projectClient!:ClientModel;

  constructor(
    private clientServices:ClientServices,
    private projectService:ProjectServices,
    private userServices:UserServices,
    private activateRouter:ActivatedRoute,
    private cd:ChangeDetectorRef,
    private router:Router
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
  delete(id:string){
    this.projectService.deleteProject(id).subscribe((res)=>{
      this.router.navigateByUrl("/project")
    })

  }
  edit(id:string){
      this.router.navigateByUrl("/project/edit/"+id);
    }
}
