import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserServices } from '../../Services/user/user';
import { User } from '../../model/user.model';
import { Dashboard } from "../dashboard/dashboard";
import { StaffDashboard } from "../staff-dashboard/staff-dashboard";

@Component({
  selector: 'app-home',
  imports: [CommonModule, Dashboard, StaffDashboard],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  user!:User;
constructor(userServices:UserServices){
  this.user=userServices.currentUser;
}
}
