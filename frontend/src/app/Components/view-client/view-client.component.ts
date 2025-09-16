import { Component, OnInit } from '@angular/core';
import { ClientServices } from '../../Services/client/client';
import { ProjectServices } from '../../Services/project/project.services';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ClientModel } from '../../model/client.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-view-client',
  imports: [CommonModule,RouterModule,MatIconModule],
  templateUrl: './view-client.component.html',
  styleUrl: './view-client.component.css'
})
export class ViewClientComponent  implements OnInit{
  client!:ClientModel
  constructor(
    private clientService:ClientServices,
    private projectServices:ProjectServices,
    private activateRouter:ActivatedRoute
  ){}
  ngOnInit(): void {
    this.activateRouter.params.subscribe((param)=>{
      if(param.clientId){
        this.clientService.getClientById(param.clientId).subscribe((res)=>{
          this.client=res;
        })
      }
    })
  }
}
