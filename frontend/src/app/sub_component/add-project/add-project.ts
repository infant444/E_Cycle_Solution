import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-project',
  imports: [],
  templateUrl: './add-project.html',
  styleUrl: './add-project.css'
})
export class AddProject  implements OnInit{

  @Input()
  display:string="none";
  ngOnInit(): void {

  }
}
