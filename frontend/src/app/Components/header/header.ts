import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { UserServices } from '../../Services/user/user';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-header',
  imports: [MatIconModule,CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit{
  user!:User;
constructor(private router:Router,private userServices:UserServices){

}
ngOnInit(): void {
  this.user=this.userServices.currentUser;
}
home(){
  this.router.navigateByUrl("/");
}
logout(){
  this.userServices.logout();
}
}
