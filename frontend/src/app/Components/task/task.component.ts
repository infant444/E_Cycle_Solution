import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Title } from "../../sub_component/title/title";
import { ProjectServices } from '../../Services/project/project.services';

@Component({
  selector: 'app-task.component',
  imports: [CommonModule, RouterModule, Title],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit {
  display = 'none';
  type = '';

  constructor(
    private projectServices:ProjectServices,
  ){}
  ngOnInit(): void {

  }
  dis(){
    if(this.display=='none'){
      this.display='flex';
    }else{
      this.display='none';
    }
  }
}
