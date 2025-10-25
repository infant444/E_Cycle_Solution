import { Component, OnInit } from '@angular/core';
import { Title } from '../../sub_component/title/title';
import { InventoryModel } from '../../model/inventory.model';
import { AddInventoryComponent } from "../../sub_component/add-inventory.component/add-inventory.component";

@Component({
  selector: 'app-inventory',
  imports: [Title, AddInventoryComponent],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css'
})
export class Inventory implements OnInit {

  display:string='none';
  edit!:InventoryModel;
  type='add';
  constructor(){

  }
  ngOnInit(): void {

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
