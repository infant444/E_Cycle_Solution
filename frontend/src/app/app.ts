import { Component, Inject, OnChanges, OnInit, PLATFORM_ID, SimpleChanges, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./Components/header/header";
import { Navbar } from "./Components/navbar/navbar";
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { UserServices } from './Services/user/user';
import { User } from './model/user.model';
import { Loading } from "./sub_component/loading/loading";
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Navbar, MatIconModule, CommonModule, Loading, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
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
       this.userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    })
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
