import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Title } from '../title/title'
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Project } from '../../Components/project/project';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule, FormArray } from '@angular/forms';
import { ClientServices } from '../../Services/client/client';
import { ClientModel } from '../../model/client.model';
import { ProjectModel } from '../../model/project.model';
import { User } from '../../model/user.model';
import { UserServices } from '../../Services/user/user';
import { ProjectServices } from '../../Services/project/project.services';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-project',
  imports: [Title, MatIconModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-project.html',
  styleUrl: './add-project.css'
})
export class AddProject implements OnInit, OnChanges {


  @Input()
  display: string = "none";
  @Input()
  type: string = "add";

  @Input()
  Project!: ProjectModel;

  clientData?: ClientModel[];
  projectForm!: FormGroup;
  user?: User[];
  manager?: User[];
  team?: User[];
  teamX?: User[];
  isSubmitted = false;
  today = new Date();
  now = this.today.toISOString().split('T')[0];
  search: string = "";
  newTag: string = '';

  constructor(private project: Project,
    private formBuilder: FormBuilder,
     private clientServices: ClientServices,
     private userServices: UserServices,
     private projectServices:ProjectServices,
     private toastServices:ToastrService,
     private router:Router

  ) { }

  ngOnInit(): void {
    this.clientServices.getAllClient().subscribe((res) => {
      this.clientData = res;
    })
    this.userServices.getAll().subscribe((res) => {
      this.user = res;
      this.team = this.user.filter(s => s.role == 'staff');
      this.teamX = this.team;
      console.log(this.teamX)
      this.manager = this.user.filter(s => s.role == 'admin');
    })
    this.projectForm = this.formBuilder.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      client: ["", Validators.required],
      manager: ["", Validators.required],
      due_date: ["", Validators.required],
      priority: [""],
      budget: [0, Validators.required],
      team: this.formBuilder.array([]),
      tag: this.formBuilder.array([], Validators.required)
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['Project']) {
      this.changeValue();
    }
  }
  get selectedMembers(): FormArray {
    return this.projectForm.get('team') as FormArray;
  }
  get tags(): FormArray {
    return this.projectForm.get('tag') as FormArray;
  }
  get FC() {
    return this.projectForm.controls;
  }
  onCheckboxChange(event: any, member: any) {
      if (event.target.checked) {
    const exists = this.selectedMembers.controls.some(x => x.value === member.id);
    if (!exists) {
      this.selectedMembers.push(this.formBuilder.control(member.id));
    }
  } else {
    const index = this.selectedMembers.controls.findIndex(x => x.value === member.id);
    if (index !== -1) {
      this.selectedMembers.removeAt(index);
    }
  }
  }

  addTag() {
    const value = this.newTag.trim();
    if (value) {
      this.tags.push(this.formBuilder.control(value));
      this.newTag = ''; // clear input
    }
  }

  removeTag(index: number) {
    this.tags.removeAt(index);
  }

  changeValue() {
    this.selectedMembers.clear();
    this.tags.clear();
    this.FC.name.setValue(this.Project?.project_name || '');
    this.FC.description.setValue(this.Project?.description || '');
    this.FC.client.setValue(this.Project?.client_id || "");
    this.FC.manager.setValue(this.Project?.manager_id || "");
    this.FC.due_date.setValue(this.Project?.due_date ? new Date(this.Project.due_date).toISOString().split('T')[0] : '');
    this.FC.budget.setValue(this.Project.budget || "");
    this.FC.priority.setValue(this.Project.priority || "");
    (this.Project.team_member || []).forEach((member: any) => {
      this.selectedMembers.push(this.formBuilder.control(member));
    });
    (this.Project.tags || []).forEach((tag: string) => {
      this.tags.push(this.formBuilder.control(tag));
    });
  }

  submit() {
    this.isSubmitted = true;
    if (this.projectForm.invalid) {
      return;
    }
    const fv=this.projectForm.value;
    const pro:ProjectModel={
      id: '',
      project_name: fv.name,
      description: fv.description,
      manager_id: fv.manager,
      client_id: fv.client,
      due_date: fv.due_date,
      status: '',
      priority: parseInt(fv.priority),
      budget: fv.budget,
      level_complete: 0,
      no_task: 0,
      completed_task: 0,
      tags:fv.tag,
      team_member:fv.team
    }
    if(this.type=='edit'){
      this.projectServices.updateProject(this.Project.id,pro).subscribe(
         (res)=>{
        this.toastServices.success("Successfully Updated");
               this.project.dis();
               this.router.navigateByUrl("/project/view/"+res.id)
      },(error)=>{
        this.toastServices.error(error.message)
      }
      )
    }
    else{
    this.projectServices.addProject(pro).subscribe(
      (res)=>{
        this.toastServices.success("Successfully add");
        this.project.dis();
      },(error)=>{
        this.toastServices.error(error.message)
      }
    )
    }

  }
  searchTeam() {
    if (this.search.length >= 2) {
      this.teamX = this.team?.filter(s => s.name.toLowerCase().includes(this.search));
    } else {
      this.teamX = this.team;
    }
  }

  close() {
    this.project.dis()
  }

}
