import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Title } from "../../sub_component/title/title";
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../Services/dashboard/dashboard.service';
import { UserServices } from '../../Services/user/user';
import { User } from '../../model/user.model';
import { AdminDashboardStates } from "../../sub_component/admin-dashboard-states/admin-dashboard-states";

@Component({
  selector: 'app-staff-dashboard',
  imports: [Title, CommonModule, AdminDashboardStates],
  templateUrl: './staff-dashboard.html',
  styleUrl: './staff-dashboard.css'
})
export class StaffDashboard implements OnInit {
  user!:User;
  state:any;
  constructor(
    private dashboardServices:DashboardService,
    private userServices:UserServices,
    private cd:ChangeDetectorRef,
  ){
  }
  ngOnInit(): void {
    this.user=this.userServices.currentUser;
    this.dashboardServices.getUserStates().subscribe((res)=>{
      this.state=this.dashboardServices.getStaffStats(this.secToHr(res.total_hours),res.complete_task,res.processed_task,res.inventory,res.totalClient,res.project);
      this.cd.markForCheck();
    })
  }
     secToHr(x:string){
  return (parseInt(x)||0 / 3600)+" Hr"
 }
}
