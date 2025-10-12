import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Task } from '../../model/task.model';
import { CommonModule } from '@angular/common';
import { Route, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectServices } from '../../Services/project/project.services';
import { UserServices } from '../../Services/user/user';
import { MatIconModule } from '@angular/material/icon';
import { TaskComponent } from '../../Components/task/task.component';
import { User } from '../../model/user.model';
import { ProjectModel } from '../../model/project.model';
import { Title } from '../title/title';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-task',
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule,Title,MatIconModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent implements OnInit, OnChanges{

    @Input()
    display: string = "none";
    @Input()
    type: string = "add";
    @Input()
    task!: Task;

    TaskForm!:FormGroup;
    isSubmitted=false;
    projects!:ProjectModel[];
    staffs?:User[];
  today = new Date();
  now = this.today.toISOString().split('T')[0];

    constructor(
      private taskComponent:TaskComponent,
      private formBuilder:FormBuilder,
      private projectServices:ProjectServices,
      private staffServices:UserServices,
      private cd:ChangeDetectorRef,
      private toasterServices:ToastrService,
      private router:Router
    ){
    }


ngOnInit(): void {

  this.TaskForm=this.formBuilder.group({
    task:['',[Validators.required]],
    description:[''],
    project:['',[Validators.required]],
    staff_id:['',Validators.required],
    priority:['',Validators.required],
    due:['',Validators.required],
    estimate_time:[0,Validators.required]
    });
    this.projectServices.getProjectByMangerId().subscribe((res)=>{
      this.projects=res;
    })
      if(this.type=='edit'){
    this.changeValue();
    this.projectChange();
  }
}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task']) {
      console.log("jsj")
      this.changeValue();
    this.projectChange();

    }
  }
get FC(){
  return this.TaskForm.controls;
}
  changeValue() {
    this.FC.task.setValue(this.task.task || '');
    this.FC.description.setValue(this.task.description || '');
    this.FC.project.setValue(this.task.project || "");
    this.FC.staff_id.setValue(this.task.staff || "");
   this.FC.due.setValue(this.task?.due ? new Date(this.task.due).toISOString().split('T')[0] : '');
    console.log(this.task?.estimate_time)
    this.FC.estimate_time.setValue(this.task?.estimate_time || 0);
    this.FC.priority.setValue(this.task.priority || "");
  }
  projectChange(){
    const project = this.projects.filter(s => s.id === this.FC.project.value)[0];
    const data = project && project.team_member ? project.team_member : [];
    this.staffServices.getProjectMemberId(data).subscribe((res) => {
      this.staffs = res;
      this.cd.detectChanges();
    });
  }
close(){
  this.taskComponent.dis();
}
submit(){
  this.isSubmitted=true;
  if(this.TaskForm.invalid){
    return;
  }
      const fx=this.TaskForm.value;
    const task:Task={
      id: '',
      task: fx.task,
      project: fx.project,
      description: fx.description,
      staff: fx.staff_id,
      project_name: this.projects.filter(s => s.id === fx.project)[0].project_name,
      status: 'pending',
      priority: fx.priority,
      due: fx.due,
      estimate_time: fx.estimate_time,
      actual_time: '',
      complete_time: '',
      created_at: '',
      updated_at: ''
    }
    console.log(task)
  if(this.type=='add'){

    this.projectServices.addTask(task).subscribe(
      (res)=>{
        this.toasterServices.success("Add successfully");
        this.isSubmitted=false;
        this.close();
    },
    (err)=>{
      this.toasterServices.error(err.message)

    }
  )
  }else{
    console.log(task);
    this.projectServices.updateTask(this.task.id,task).subscribe((res)=>{
        this.toasterServices.success("Updates successfully")
        this.isSubmitted=false;

        this.close();

               this.router.navigateByUrl("/task/view/"+res.id)

    },
    (err)=>{
      this.toasterServices.error(err.message)

    })
  }

}
}
