import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { UserServices } from '../../Services/user/user';

@Component({
  selector: 'app-header',
  imports: [MatIconModule,CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit{
constructor(private router:Router,private userServices:UserServices){

}
ngOnInit(): void {

}
home(){
  this.router.navigateByUrl("/");
}
logout(){
  this.userServices.logout();
}
}
