import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Title } from "../../sub_component/title/title";
import { AddProject } from "../../sub_component/add-project/add-project";
import { LucideAngularModule, FileIcon } from 'lucide-angular';
import { ProjectInfo } from "../../sub_component/project-info/project-info";
import { ProjectModel } from '../../model/project.model';
import { ProjectServices } from '../../Services/project/project.services';
import { UserServices } from '../../Services/user/user';
import { User } from '../../model/user.model';
import { ClientServices } from '../../Services/client/client';
import { ClientModel } from '../../model/client.model';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { NotFound } from "../../sub_component/not-found/not-found";
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-project',
  imports: [CommonModule, Title, AddProject,
    LucideAngularModule, ProjectInfo, MatIconModule, FormsModule, NotFound],
  templateUrl: './project.html',
  styleUrl: './project.css'
})
export class Project implements OnInit {
  readonly FileIcon = FileIcon;
  display = 'none';
  type = '';
  name = "";
  active = '';
  projects: ProjectModel[] = [];
  projectX: ProjectModel[] = [];
  total_project: number = 0;
  manged_project: number = 0;
  value_project: number = 0;
  user!: User;
  client: ClientModel[] = [];
  allUser: User[] = [];
  editProject!: ProjectModel;
  constructor(
    private projectServices: ProjectServices,
    private userServices: UserServices,
    private clientServices: ClientServices,
    private cd: ChangeDetectorRef,
    private router: Router,
    private activateRouter:ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.activateRouter.params.subscribe((params)=>{
      if(params.projectid){
        this.projectServices.getProjectById(params.projectid).subscribe((res)=>{
          this.editProject=res;
          this.edit(res);
        })
      }
    })
    this.userServices.userObservable.subscribe((res) => {
      this.user = res;
      this.cd.markForCheck();

    })
    this.clientServices.getAllClient().subscribe((res) => {
      this.client = res;
      this.cd.markForCheck();
    });
    this.userServices.getAll().subscribe((res) => {
      this.allUser = res;
      this.cd.markForCheck();
    })
    this.projectServices.getProject().subscribe(
      (res) => {
        this.projects = res;
        this.projectX = res;
        this.total_project = this.projects.length;
        for (let i = 0; i < this.projects.length; i++) {
          if (this.projects[i].manager_id === this.user.id) {
            this.manged_project += 1;
          }
          this.value_project += parseInt(this.projects[i].budget.toString());
        }
        this.cd.markForCheck();
      }

    )

  }

  getClient(id: string): string {
    return this.client.filter(s => s.id === id)[0].name;
  }
  getUser(id: string): string {
    return this.allUser.filter(s => s.id === id)[0].name;
  }
  dis() {

    if (this.display == 'none') {
      this.editProject = new ProjectModel();
      this.display = 'flex';
    } else {
      this.display = 'none';
      this.reAssign()
    }
  }
  edit(x: ProjectModel) {
    if (this.display == 'none') {
      this.display = 'flex';
      this.type = "edit";
      this.editProject = x;
    } else {
      this.display = 'none';
      this.reAssign()
    }
  }
  reAssign() {
    this.projectServices.getProject().subscribe(
      (res) => {
        this.projects = res;
        console.log(this.projects)
        this.total_project = this.projects.length;
        for (let i = 0; i < this.projects.length; i++) {
          if (this.projects[i].manager_id === this.user.id) {
            this.manged_project += 1;
          }
          this.value_project += parseInt(this.projects[i].budget.toString());
        }
        this.cd.markForCheck()
      }

    )
  }

  search() {
    if (this.name.length > 1) {
      this.projects = this.projectX.filter(s => s.project_name.toLowerCase().includes(this.name.toLowerCase()));
    } else {
      this.projects = this.projectX;
    }
  }
  activeChange() {
    if (this.active == "") {
      this.projects = this.projectX;

    } else {
      this.projects = this.projectX.filter(s => s.status == this.active);

    }
  }
  view(id: string) {
    this.router.navigateByUrl("/project/view/" + id);
  }
  calculateDate(x: string) {
    const dueDate = new Date(x).getTime();   // convert to ms
    const today = new Date().getTime();      // current time in ms
    const diffMs = dueDate - today;          // difference in ms
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    return diffDays;
  }
}

