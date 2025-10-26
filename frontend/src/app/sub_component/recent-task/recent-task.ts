import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FileCheck2, LucideAngularModule } from 'lucide-angular';
import { Task } from '../../model/task.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recent-task',
  imports: [CommonModule,LucideAngularModule],
  templateUrl: './recent-task.html',
  styleUrl: './recent-task.css'
})
export class RecentTask {
@Input()
items:Task[]=[]
  constructor(
    public router:Router
  ){}
icon=FileCheck2
}
