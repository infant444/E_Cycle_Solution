import { Component, NgZone, OnInit } from '@angular/core';
import { Title } from '../../sub_component/title/title';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { interval, Subscription } from 'rxjs';
import { describe } from 'node:test';
import { RecentWorks } from "../../sub_component/recent-works/recent-works";
import { TimesheetBaseNav } from "../../sub_component/timesheet-base-nav/timesheet-base-nav";

@Component({
  selector: 'app-time-sheet',
  standalone: true,
  imports: [Title, CommonModule, MatIconModule, RouterModule, FormsModule, ReactiveFormsModule, RecentWorks, RecentWorks, TimesheetBaseNav],
  templateUrl: './time-sheet.html',
  styleUrls: ['./time-sheet.css']
})

export class TimeSheet implements OnInit{
  timeSheetForm!:FormGroup;
 countdown!:any;
 isSubmitted:boolean=false;
 today = new Date().toISOString().split('T')[0];
  constructor(private formBuilder:FormBuilder,private ngZone: NgZone){}
  ngOnInit(): void {
    this.timeSheetForm=this.formBuilder.group({
      project:["",[Validators.required]],
      task:["",[Validators.required]],
      describe:[""],
      date:["",Validators.required],
      start_time:["",Validators.required],
      end_time:["",Validators.required],
    });
  }
  get FC(){
    return this.timeSheetForm.controls;
  }
  add(){
    if(this.timeSheetForm.invalid){
      console.error("error")

      return;
    }
    console.log("no error")
  }
}
