import { Component, OnInit } from '@angular/core';
import { Title } from "../../sub_component/title/title";
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ClientInfo } from "../../sub_component/client-info/client-info";
import { ClientModel } from '../../model/client.model';
import { AddClient } from "../../sub_component/add-client/add-client";
import { ClientServices } from '../../Services/client/client';

@Component({
  selector: 'app-client',
  imports: [Title, MatIconModule, CommonModule, FormsModule, ClientInfo, AddClient],
  templateUrl: './client.html',
  styleUrl: './client.css'
})
export class Client implements OnInit {

  name = "";
  type = "";
  active = "";
  display="none";
  clients?: ClientModel[] = [];
  constructor(private clientServices:ClientServices) {

  }
  ngOnInit(): void {
    this.clientServices.getAllClient().subscribe((res)=>{
this.clients=res;
console.log(this.clients);
    })
  }
  search() {
    if (this.name.length > 2) {

    } else {
      this.getAll();
    }
  }
  typeChange() {
    if (this.type != "") {

    } else {
      this.getAll();
    }
  }
  activeChange() {
    if (this.active != "") {

    } else {
      this.getAll();
    }
  }
  getAll() {

  }
  dis() {
    if(this.display=='none'){
      this.display='flex';
    }else{
      this.display='none'
    }
}
}
