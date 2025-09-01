import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Title } from "../../sub_component/title/title";
import { AddProject } from "../../sub_component/add-project/add-project";

@Component({
  selector: 'app-project',
  imports: [CommonModule, Title, AddProject],
  templateUrl: './project.html',
  styleUrl: './project.css'
})
export class Project implements OnInit{

  display='none';

  constructor(){}
  ngOnInit(): void {

  }

    dis() {
    if (this.display == 'none') {
      this.display = 'flex';
    } else {
      this.display = 'none';
      // this.reAssign()
    }
  }
}
