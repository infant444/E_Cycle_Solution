import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { UserServices } from '../../Services/user/user';
import { User } from '../../model/user.model';
import { NotificationService } from '../../Services/notification/notification.service';
import { Notification } from "../notification/notification";

@Component({
  selector: 'app-header',
  imports: [MatIconModule, CommonModule, Notification],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {
  user!: User;
  constructor(private router: Router, private userServices: UserServices, private notificationService: NotificationService,) {

  }
  notifications!: any;
  show=false;
  ngOnInit(): void {

      this.userServices.userObservable.subscribe((newUser) => {
        this.user = newUser;

      })
      this.notificationService.getCount().subscribe((res)=>{
        this.notifications=res;
        console.log(res);
      })



  }
  home() {
    this.router.navigateByUrl("/");
  }
  logout() {
    this.userServices.logout();
  }
  showNotify(){
    this.show=!this.show;
  }
}
