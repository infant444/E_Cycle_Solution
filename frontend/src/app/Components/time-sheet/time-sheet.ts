import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { Title } from '../../sub_component/title/title';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { interval, Subscription } from 'rxjs';
import { describe } from 'node:test';
import { RecentWorks } from "../../sub_component/recent-works/recent-works";
import { TimesheetBaseNav } from "../../sub_component/timesheet-base-nav/timesheet-base-nav";
import { ClientServices } from '../../Services/client/client';
import { UserServices } from '../../Services/user/user';
import { ProjectServices } from '../../Services/project/project.services';
import { ProjectModel } from '../../model/project.model';
import { Task } from '../../model/task.model';
import { TimeSheet } from '../../model/timesheet.model';
import { TimeSheetService } from '../../Services/timesheet/time-sheet.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-time-sheet',
  standalone: true,
  imports: [Title, CommonModule, MatIconModule, RouterModule, FormsModule, ReactiveFormsModule, RecentWorks, RecentWorks, TimesheetBaseNav],
  templateUrl: './time-sheet.html',
  styleUrls: ['./time-sheet.css']
})

export class TimeSheetComponent implements OnInit {
  timeSheetForm!: FormGroup;
  countdown!: any;
  isSubmitted: boolean = false;
  project?: ProjectModel[];
  task?: Task[];
  resentTimeSheet?: TimeSheet[];
  today = new Date().toISOString().split('T')[0];
  weekHour!: number;
  todayHour!: number;
  assignedTask!: number;
  currentWeekStart = new Date();
  weekTotal = 0;
  weekdays: string[] = [];
  dateRange!: string;
  start!: string;
  end!: string;

  constructor(private formBuilder: FormBuilder,
    private client: ClientServices,
    private user: UserServices,
    private projectServices: ProjectServices,
    private cd: ChangeDetectorRef,
    private timeSheetService: TimeSheetService,
    private toasterServices: ToastrService,
  ) { }
  ngOnInit(): void {
    this.getWeekDays()
    this.projectServices.getByStaff().subscribe((res) => {
      this.project = res;
      this.cd.markForCheck()
    })
    this.timeSheetService.getTotalHourWeek(this.start, this.end).subscribe((res) => {
      this.weekHour = (parseInt(res.week_hour.toString()) / 3600)
      this.cd.markForCheck()
    })
    this.timeSheetService.getTotalHourToday().subscribe((res) => {
      this.todayHour = (parseInt(res.today_hour.toString()) / 3600)
      this.cd.markForCheck()
    })
    this.projectServices.getTaskCount().subscribe((res) => {
      this.assignedTask = res.task_count;
      this.cd.markForCheck()

    })
    this.timeSheetForm = this.formBuilder.group({
      project: ["", [Validators.required]],
      task: ["", [Validators.required]],
      describe: [""],
      date: ["", Validators.required],
      start_time: ["", Validators.required],
      end_time: ["", Validators.required],
    });
    this.timeSheetService.getAllStaff().subscribe((res) => {
      this.resentTimeSheet = res.reverse().slice(0, 3);
      this.cd.markForCheck()

    })
  }
  get FC() {
    return this.timeSheetForm.controls;
  }
  change() {
    this.projectServices.getTaskOfUser(this.FC.project.value).subscribe((res) => {
      this.task = res;
      console.log(this.task);
      this.cd.markForCheck();
    })
  }
  getSecondsDiff(t1: string, t2: string): number {
    const time1 = new Date(`1970-01-01T${t1}:00`);
    const time2 = new Date(`1970-01-01T${t2}:00`);

    const diff = Math.abs((time2.getTime() - time1.getTime()) / 1000); // ms → sec
    return diff;
  }
  getWeekDays() {

    const today = this.currentWeekStart;
    const currentDay = today.getDay();
    const diff = today.getDate() - currentDay + (currentDay === 0 ? -6 : 1);
    const monday = new Date(today.setDate(diff));

    this.weekdays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(monday);
      day.setDate(monday.getDate() + i);
      this.weekdays.push(day.toISOString().split('T')[0]);
    }
    this.start = this.weekdays[0];
    this.end = this.weekdays[6];
  }
  add() {
    if (this.timeSheetForm.invalid) {
      return;
    }
    const fv = this.timeSheetForm.value;
    const timeSheet: TimeSheet = {
      id: '',
      staff: this.user.currentUser.id,
      task: fv.task,
      project: fv.project,
      task_name: this.task?.filter(s => s.id === fv.task)[0].task || '',
      project_name: this.task?.filter(s => s.id === fv.task)[0].project_name || '',
      description: fv.describe,
      date: fv.date,
      start_time: fv.start_time,
      end_time: fv.end_time,
      total_hours: this.getSecondsDiff(fv.start_time, fv.end_time),
      status: 'pending'
    }
    this.timeSheetService.addTimeSheet(timeSheet).subscribe(
      (res) => {
        this.toasterServices.success("add successfully");
        this.FC.project.setValue('');
        this.FC.task.setValue('');
        this.FC.describe.setValue('');
        this.FC.date.setValue('');
        this.FC.start_time.setValue('');
        this.FC.end_time.setValue('');
        this.reAssign();
      }, (err) => {
        this.toasterServices.error(err.message);
      }
    )

  }
  reAssign() {
    this.getWeekDays()
    this.projectServices.getByStaff().subscribe((res) => {
      this.project = res;
      this.cd.markForCheck()
    })
    this.timeSheetService.getTotalHourWeek(this.start, this.end).subscribe((res) => {
      this.weekHour = (parseInt(res.week_hour.toString()) / 3600)
      this.cd.markForCheck()
    })
    this.timeSheetService.getTotalHourToday().subscribe((res) => {
      this.todayHour = (parseInt(res.today_hour.toString()) / 3600)
      this.cd.markForCheck()
    })
    this.projectServices.getTaskCount().subscribe((res) => {
      this.assignedTask = res.task_count;
      this.cd.markForCheck()

    })
    this.timeSheetService.getAllStaff().subscribe((res) => {
      this.resentTimeSheet = res.reverse().slice(0, 3);
      this.cd.markForCheck()

    })
  }
}
