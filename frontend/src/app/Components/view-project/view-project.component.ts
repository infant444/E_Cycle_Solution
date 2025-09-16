import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ClientServices } from '../../Services/client/client';
import { ProjectServices } from '../../Services/project/project.services';

@Component({
  selector: 'app-view-project',
  imports: [CommonModule],
  templateUrl: './view-project.component.html',
  styleUrl: './view-project.component.css'
})
export class ViewProjectComponent {
  constructor(
    private clientServices:ClientServices,
    private projectService:ProjectServices,
  ){}

}
