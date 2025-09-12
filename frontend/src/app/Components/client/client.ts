import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Title } from "../../sub_component/title/title";
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ClientInfo } from "../../sub_component/client-info/client-info";
import { ClientModel } from '../../model/client.model';
import { AddClient } from "../../sub_component/add-client/add-client";
import { ClientServices } from '../../Services/client/client';
import { NotFound } from "../../sub_component/not-found/not-found";

@Component({
  selector: 'app-client',
  imports: [Title, MatIconModule, CommonModule, FormsModule, ClientInfo, AddClient, CurrencyPipe, NotFound],
  templateUrl: './client.html',
  styleUrl: './client.css'
})
export class Client implements OnInit {

  name = "";
  type = "";
  active = '';
  totalActive = 0;
  totalValue = 0;
  totalCollection = 0;
  totalCount!: number;
  display = "none";
  clients?: ClientModel[] = [];
  sample?: ClientModel[] = [];
  editClient!:ClientModel;
  constructor(private clientServices: ClientServices, private cd: ChangeDetectorRef) {

  }
  ngOnInit(): void {
    this.clientServices.getAllClient().subscribe((res) => {
      this.clients = res;
      this.sample = res;
      this.totalCount = res.length;
      for (let r of this.clients) {
        if (r.is_current_project) {
          this.totalActive += 1;
        }
        if (r.total_collection) {
          this.totalCollection += parseInt(r.total_collection.toString());
        }
        if (r.value) {
          this.totalValue += parseInt(r.value.toString());
        }

      }
      // console.log(this.clients);
      this.cd.detectChanges();
    })
  }
  search() {
    if (this.name.length > 2) {
      this.clients=this.sample?.filter(s=>s.name.toLowerCase().includes(this.name.toLowerCase()))
    } else {
      this.getAll();
    }
  }
  typeChange() {
    if (this.type != "") {
      this.clients = this.sample?.filter(s => s.type === this.type);
    } else {
      this.getAll();
    }
  }
  activeChange() {
    if (this.active === "active") {
      this.clients = this.sample?.filter(s => s.is_current_project);
    } else if (this.active === "inactive") {
      this.clients = this.sample?.filter(s => !s.is_current_project);
    } else {
      this.getAll();
    }
  }
  getAll() {
    this.clients = this.sample;
  }
  dis() {
    if (this.display == 'none') {
      this.display = 'flex';
      this.type="add";
      this.editClient=new ClientModel;
    } else {
      this.display = 'none';
      this.reAssign()
    }
  }
  edit(x:ClientModel){
    if (this.display == 'none') {
      this.display = 'flex';
      this.type="edit";
      this.editClient=x;
    } else {
      this.display = 'none';
      this.reAssign()
    }
  }
  reAssign() {
    this.clientServices.getAllClient().subscribe((res) => {
      this.clients = res;
      console.log(this.clients);
      this.cd.detectChanges();
    })
  }
}
