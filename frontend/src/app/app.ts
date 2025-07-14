import { Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./Components/header/header";
import { Navbar } from "./Components/navbar/navbar";
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { UserServices } from './Services/user/user';
import { User } from './model/user.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Navbar,MatIconModule,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected title = 'E Cycle Solution';
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
  private userService:UserServices
){}
  navSize:string="250px"
  navSizex:string="250px"
  show:boolean = true;
  user!:User;
  @ViewChild(Navbar) child!: Navbar;
  ngOnInit(): void {
     if (isPlatformBrowser(this.platformId)) {
      if(window.innerWidth<1049){
        this.navSizex="200px"
      }}
      this.user=this.userService.currentUser;
      if(this.user.email){
        this.navSize=this.navSizex;
      }else{
        this.navSize="0px";
      }
  }
  smallNavbar(){
    this.child.showx();
    if(this.show){
      this.show=false;
      this.navSize="75px";
    }else{
this.show=true;
      this.navSize=this.navSizex;
    }
  }
}
