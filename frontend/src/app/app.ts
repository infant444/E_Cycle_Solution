import { Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./Components/header/header";
import { Navbar } from "./Components/navbar/navbar";
import { isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Navbar,MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected title = 'E Cycle Solution';
  constructor(@Inject(PLATFORM_ID) private platformId: Object){}
  navSize:string="250px"
  navSizex:string="250px"
  show:boolean = true;
  @ViewChild(Navbar) child!: Navbar;
  ngOnInit(): void {
     if (isPlatformBrowser(this.platformId)) {
      if(window.innerWidth<1049){
        this.navSizex="200px"
      }}
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
