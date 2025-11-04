import { CommonModule ,Location} from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { InventoryServices } from '../../Services/inventory/inventory';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { InventoryModel, Transaction } from '../../model/inventory.model';
import { MatIconModule } from '@angular/material/icon';
import { AdminDashboardStates } from "../../sub_component/admin-dashboard-states/admin-dashboard-states";
import { ClientModel } from '../../model/client.model';
import { ClientServices } from '../../Services/client/client';
import { UserServices } from '../../Services/user/user';
import { User } from '../../model/user.model';
import { MakeSales } from "../../sub_component/make-sales/make-sales";

@Component({
  selector: 'app-view-inventory.component',
  imports: [CommonModule, MatIconModule, RouterModule, AdminDashboardStates, MakeSales],
  templateUrl: './view-inventory.component.html',
  styleUrl: './view-inventory.component.css'
})
export class ViewInventoryComponent implements OnInit {
  inventory!:InventoryModel;
  state!:any[];
  transaction!:Transaction[];
  purchase:number=0;
  sale:number=0;
  total=0
  user!:User[];
  disable=false;

  constructor(
    private inventoryServices:InventoryServices,
    private activateRouter:ActivatedRoute,
    private cd:ChangeDetectorRef,
    public location:Location,
    private userServices:UserServices
  ){}

  ngOnInit(): void {
    this.activateRouter.params.subscribe((pars)=>{
      if(pars.id){
        this.userServices.getAll().subscribe((res)=>{
          this.user=res;
          this.cd.markForCheck();
        })
        this.inventoryServices.getById(pars.id).subscribe((res)=>{
          this.inventory=res;
          this.cd.markForCheck();
          console.log(this.inventory);
        })
        this.inventoryServices.getPaticularInventoryState(pars.id).subscribe((res)=>{
          this.state=this.inventoryServices.getPaticularStats(res.CurrentStock,res.totalProductPurchase,res.totalProductSales,res.profit);
          this.cd.markForCheck()
        });
        this.inventoryServices.getTransactionForParticularInventory(pars.id).subscribe((res)=>{
          this.transaction=res;
          console.log(this.transaction);
          if(this.transaction.length){
            for (let x of this.transaction){
              if(x.type=='Purchase'){
                this.purchase+=parseInt(x.quantity.toString())
              }else if(x.type=='Sale'){
                this.sale+=parseInt(x.quantity.toString())
              }
            }
          }
          this.cd.markForCheck()
        })
      }
    })

  }
  edit(id:string){

  }
  exportX(){

  }
  addSales(){
    this.disable=!this.disable
    this.reassign()
    this.cd.markForCheck()
  }
  reassign(){
    this.total=0;
        this.activateRouter.params.subscribe((pars)=>{
      if(pars.id){
        this.userServices.getAll().subscribe((res)=>{
          this.user=res;
          this.cd.markForCheck();
        })
        this.inventoryServices.getById(pars.id).subscribe((res)=>{
          this.inventory=res;
          this.cd.markForCheck();
          console.log(this.inventory);
        })
        this.inventoryServices.getPaticularInventoryState(pars.id).subscribe((res)=>{
          this.state=this.inventoryServices.getPaticularStats(res.CurrentStock,res.totalProductPurchase,res.totalProductSales,res.profit);
          this.cd.markForCheck()
        });
        this.inventoryServices.getTransactionForParticularInventory(pars.id).subscribe((res)=>{
          this.transaction=res;
          console.log(this.transaction);
          if(this.transaction.length){
            for (let x of this.transaction){
              if(x.type=='Purchase'){
                this.purchase+=parseInt(x.total_amount.toString())
              }else if(x.type=='Sale'){
                this.sale+=parseInt(x.total_amount.toString())
              }
            }
          }
          this.cd.markForCheck()
        })
      }
    })

  }
  getUser(id:string){
    return this.user.find(s=>s.id===id);
  }
  getProduct(id:string){
    return this.inventory.product?.find(s=>s.id===id)?.product_name;
  }
  calPur(x:number){
    this.total-=parseInt(x.toString());
    console.log(this.total)
    const y=this.total;
    return y;
  }
  calSal(x:number){
    this.total+=parseInt(x.toString());
    console.log(this.total)
      const y=this.total;
    return y;
  }
}
