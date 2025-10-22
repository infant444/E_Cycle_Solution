import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MeetingService } from '../../Services/meeting/meeting.service';
import { MeetingComponent } from '../../Components/meeting/meeting.component';
import { Title } from "../title/title";
import { MeetingModel } from '../../model/meeting.model';
import { User } from '../../model/user.model';
import { UserServices } from '../../Services/user/user';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-meeting',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatIconModule, Title],
  templateUrl: './add-meeting.component.html',
  styleUrl: './add-meeting.component.css'
})
export class AddMeetingComponent implements OnInit, OnChanges {
  @Input()
  display: string = "none";
  @Input()
  type: string = "add";
  @Input()
  meeting!: MeetingModel;
  employee?: User[];
  meetingForm!: FormGroup;
  isSubmitted = false;
  today = new Date();
  userX!:User;
  now = this.today.toISOString().split('T')[0];
  constructor(
    private meetingServices: MeetingService,
    private meetingComponent: MeetingComponent,
    private formBuilder: FormBuilder,
    private userServices: UserServices,
    private toasterServices:ToastrService,
    private router:Router
  ) { }
  ngOnInit(): void {
    this.userServices.getAll().subscribe((res) => {
      this.employee = res;
    })
    this.userX=this.userServices.currentUser;
    this.meetingForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
      staff: ['',],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
    })
  }
  get FC() {
    return this.meetingForm.controls;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['meeting']) {
      console.log("jsj")
      this.changeValue();
    }
  }
  changeValue() {
    if (this.display == 'flex') {
      this.FC.title.setValue(this.meeting.title || '');
      this.FC.description.setValue(this.meeting.description || '');
      this.FC.type.setValue(this.meeting.type || '');
      this.FC.staff.setValue(this.meeting.staff || '');
      this.FC.start_date.setValue(this.meeting?.start_date
        ? new Date(this.meeting.start_date).toLocaleDateString('en-CA')
        : '');
      this.FC.start_time.setValue(this.meeting?.start_time
        ? this.formatTime(this.meeting.start_time)
        : '');

      this.FC.end_date.setValue(this.meeting?.end_date
        ? new Date(this.meeting.end_date).toLocaleDateString('en-CA')
        : '');

      this.FC.end_time.setValue(this.meeting?.end_time
        ? this.formatTime(this.meeting.end_time)
        : '');
        if(this.userX.role!='admin' && this.type=='add'){
          this.FC.staff.setValue(this.userX.id || '');
        }
    }
  }
  formatTime(time: string | Date): string {
    const d = new Date(time);
    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  close() {
    this.meetingComponent.dis();
  }
  submit() {
    if(this.meetingForm.invalid){
      return;
    }
    const fv=this.meetingForm.value;
    const data:MeetingModel={
      id: '',
      title: fv.title,
      description: fv.description,
      status: 'assigned',
      type: fv.type,
      staff: fv.staff,
      start_date: fv.start_date,
      start_time: fv.start_time,
      end_date: fv.end_date,
      end_time: fv.end_time
    }
    if(this.type=='edit'){
      this.meetingServices.updateMeetingDetail(this.meeting.id,data).subscribe((res)=>{
        this.toasterServices.success("Successfully update")
        this.router.navigateByUrl("/meeting/view/"+this.meeting.id)
      })
    }else{
      this.meetingServices.addMeeting(data).subscribe(
        (res)=>{
        this.toasterServices.success("Successfully Added")
        this.close()
      },(err)=>{
        this.toasterServices.error(err)

      })
    }
    this.isSubmitted=false;
  }
}
