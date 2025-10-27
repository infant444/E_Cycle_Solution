import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Title } from '../../sub_component/title/title';
import { InventoryModel } from '../../model/inventory.model';
import { AddInventoryComponent } from "../../sub_component/add-inventory.component/add-inventory.component";
import { InventoryServices } from '../../Services/inventory/inventory';
import { AdminDashboardStates } from "../../sub_component/admin-dashboard-states/admin-dashboard-states";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NotFound } from "../../sub_component/not-found/not-found";
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventory',
  imports: [Title, AddInventoryComponent, AdminDashboardStates, CommonModule, FormsModule, ReactiveFormsModule, MatIconModule, NotFound],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css'
})
export class Inventory implements OnInit {
  state!:any
  display:string='none';
  edit!:InventoryModel;
  type='add';
  name:string='';
  active:string='';
  inventory?:InventoryModel[];
  defaultInventory?:InventoryModel[];
  constructor(
    private inventoryServices:InventoryServices,
    private cd:ChangeDetectorRef,
    public router:Router
  ){

  }
  ngOnInit(): void {
    this.inventoryServices.InventoryState().subscribe((res)=>{
      this.state=this.inventoryServices.getStats(res.totalCollection,res.totalProductPurchase,res.totalProductSales,res.profit,res.totalProduct,res.totalCollectionCompleted);
      this.cd.markForCheck()
    })
    this.inventoryServices.getAll().subscribe((res)=>{
      this.inventory=res;
      this.defaultInventory=res;
      console.log(this.inventory)
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
      this.reassing()
    }
  }
  reassing(){
    this.inventoryServices.InventoryState().subscribe((res)=>{
      this.state=this.inventoryServices.getStats(res.totalCollection,res.totalProductPurchase,res.totalProductSales,res.profit,res.totalProduct,res.totalCollectionCompleted);
      this.cd.markForCheck()
    })
    this.inventoryServices.getAll().subscribe((res)=>{
      this.inventory=res;
      this.defaultInventory=res;
      console.log(this.inventory)
      this.cd.markForCheck()
    })
  }
  search(){
    if(this.name.length>2){
      this.inventory=this.defaultInventory?.filter(s=>s.collection_name.toLowerCase().includes(this.name.toLowerCase()));
    }else{
      this.inventory=this.defaultInventory;
    }
    this.cd.markForCheck();
  }
  activeChange(){
    if(this.active!=''){
      this.inventory=this.defaultInventory?.filter(s=>s.status===this.active);
    }else{
      this.inventory=this.defaultInventory;
    }
    this.cd.markForCheck();

  }
}
