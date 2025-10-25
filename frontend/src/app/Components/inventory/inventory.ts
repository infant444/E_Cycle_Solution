import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Title } from '../../sub_component/title/title';
import { InventoryModel } from '../../model/inventory.model';
import { AddInventoryComponent } from "../../sub_component/add-inventory.component/add-inventory.component";
import { InventoryServices } from '../../Services/inventory/inventory';
import { AdminDashboardStates } from "../../sub_component/admin-dashboard-states/admin-dashboard-states";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventory',
  imports: [Title, AddInventoryComponent, AdminDashboardStates,CommonModule],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css'
})
export class Inventory implements OnInit {
  state!:any
  display:string='none';
  edit!:InventoryModel;
  type='add';
  constructor(
    private inventoryServices:InventoryServices,
    private cd:ChangeDetectorRef,
  ){

  }
  ngOnInit(): void {
    this.inventoryServices.InventoryState().subscribe((res)=>{
      console.log(res)
      this.state=this.inventoryServices.getStats(res.totalCollection,res.totalProductPurchase,res.totalProductSales,res.profit,res.totalProduct,res.totalCollectionCompleted);
      this.cd.markForCheck()
    })
  }
  dis(){
    if(this.display=='none'){
      this.display='block';
      this.type='add';
      this.edit=new InventoryModel();
    }else{
      this.display='none';
      this.edit=new InventoryModel();
    }
  }
}
