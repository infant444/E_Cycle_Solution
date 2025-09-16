import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Package,FolderOpen } from 'lucide-angular';
import { UserServices } from '../../Services/user/user';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule,RouterModule,MatIconModule,
    LucideAngularModule,
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit{

show:boolean = true;
readonly package=Package;
readonly FolderOpen=FolderOpen;
user!:User;
constructor(private userServices:UserServices){

}

ngOnInit(): void {
  this.userServices.userObservable.subscribe((res)=>{
    this.user=res;
  })
}
showx(){
  this.show = !this.show;
  console.log(this.show);}

}
