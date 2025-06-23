import { Component, NgZone, OnInit } from '@angular/core';
import { Title } from '../../sub_component/title/title';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-time-sheet',
  standalone: true,
  imports: [Title, CommonModule, MatIconModule, RouterModule, FormsModule,ReactiveFormsModule],
  templateUrl: './time-sheet.html',
  styleUrls: ['./time-sheet.css']
})

export class TimeSheet implements OnInit{
  timeSheetForm!:FormGroup;
 countdown!:any;
  constructor(private formBuilder:FormBuilder,private ngZone: NgZone){}
  ngOnInit(): void {

  }

}
