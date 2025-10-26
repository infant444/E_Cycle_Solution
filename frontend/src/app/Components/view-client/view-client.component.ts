import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ClientServices } from '../../Services/client/client';
import { ProjectServices } from '../../Services/project/project.services';
import { CommonModule,Location } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ClientModel } from '../../model/client.model';
import { MatIconModule } from '@angular/material/icon';
import { ProjectModel } from '../../model/project.model';
import { InventoryModel, Products } from '../../model/inventory.model';
@Component({
  selector: 'app-view-client',
  imports: [CommonModule, RouterModule, MatIconModule ],
  templateUrl: './view-client.component.html',
  styleUrl: './view-client.component.css'
})
export class ViewClientComponent  implements OnInit{
  client!:ClientModel;
  display='none';
  projects?:ProjectModel[];
  collection?:InventoryModel[];
  product?:Products[];
  task:any;
  constructor(
    private clientService:ClientServices,
    private projectServices:ProjectServices,
    private activateRouter:ActivatedRoute,
    private cd:ChangeDetectorRef,
    private router:Router,
    public location:Location
  ){}
  ngOnInit(): void {
    this.activateRouter.params.subscribe((param)=>{
      if(param.clientId){
        this.clientService.getClientById(param.clientId).subscribe((res)=>{
          this.client=res;
          this.getProjectInfo(res.id);
          this.cd.markForCheck()
        })
        this.clientService.getClientCollectionDetail(param.clientId).subscribe((res)=>{
          this.collection=res;
          console.log(res);
          this.cd.markForCheck()
        })
          this.clientService.getClientProductDetail(param.clientId).subscribe((res)=>{
          this.product=res;
          console.log(res);

          this.cd.markForCheck()
        })
          this.clientService.getClientTaskDetail(param.clientId).subscribe((res)=>{
          this.task=res;
          console.log(res);

          this.cd.markForCheck()
        })
      }
    })
  }
  reAssign(){
     this.activateRouter.params.subscribe((param)=>{
      if(param.clientId){
        this.clientService.getClientById(param.clientId).subscribe((res)=>{
          this.client=res;
          this.cd.markForCheck()
        })
      }
    })
  }
  edit(id:string){
    this.router.navigateByUrl("/client/edit/"+id);
  }
    delete(id: string) {
    const confirmed = window.confirm("Are you sure you want to delete this client?");
    if (confirmed) {
      this.clientService.deleteClientById(id).subscribe(_ => {
    this.router.navigateByUrl("/client");

      })
    }

  }
  getProjectInfo(id:string){
    this.projectServices.getProjectByClientId(id).subscribe((res)=>{
      this.projects=res;
      this.cd.markForCheck()
    })
  }
    calculateDate(x:string){
  const dueDate = new Date(x).getTime();   // convert to ms
  const today = new Date().getTime();      // current time in ms
  const diffMs = dueDate - today;          // difference in ms
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  return diffDays;
  }
}
