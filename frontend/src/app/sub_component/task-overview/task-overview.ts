import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task-overview',
  imports: [CommonModule],
  templateUrl: './task-overview.html',
  styleUrl: './task-overview.css'
})
export class TaskOverview {
  @Input()
  items:any[]=[];
}
