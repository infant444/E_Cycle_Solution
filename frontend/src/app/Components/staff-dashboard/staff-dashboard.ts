import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Title } from "../../sub_component/title/title";
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../Services/dashboard/dashboard.service';
import { UserServices } from '../../Services/user/user';
import { User } from '../../model/user.model';
import { AdminDashboardStates } from "../../sub_component/admin-dashboard-states/admin-dashboard-states";
import { ProjectServices } from '../../Services/project/project.services';
import { MeetingComponent } from '../meeting/meeting.component';
import { MeetingService } from '../../Services/meeting/meeting.service';
import { MeetingModel } from '../../model/meeting.model';
import { Task } from '../../model/task.model';
import { Products } from '../../model/inventory.model';
import { InventoryServices } from '../../Services/inventory/inventory';
import { RecentInventory } from "../../sub_component/recent-inventory/recent-inventory";
import { Router } from '@angular/router';
import { RecentTask } from "../../sub_component/recent-task/recent-task";
import { UpcommingSchedules } from "../../sub_component/upcomming-schedules/upcomming-schedules";

@Component({
  selector: 'app-staff-dashboard',
  imports: [Title, CommonModule, AdminDashboardStates, RecentInventory, RecentTask, UpcommingSchedules],
  templateUrl: './staff-dashboard.html',
  styleUrl: './staff-dashboard.css'
})
export class StaffDashboard implements OnInit {
  user!: User;
  state: any;
  meeting!:MeetingModel[];
  task!:Task[];
  product!:Products[];
  constructor(
    private dashboardServices: DashboardService,
    private userServices: UserServices,
    private projectServices:ProjectServices,
    private meetingServices:MeetingService,
    private inventoryServices:InventoryServices,
    private cd: ChangeDetectorRef,
    public router:Router
  ) {
  }
  ngOnInit(): void {
    this.user = this.userServices.currentUser;
    this.dashboardServices.getUserStates().subscribe((res) => {
      const x = this.secToHr(res.total_hours.toString());
      this.state = this.dashboardServices.getStaffStats(x, res.complete_task, res.processed_task, res.inventory, res.totalClient, res.project);
      this.cd.markForCheck();
    })
    this.projectServices.getTaskByStaff().subscribe((res)=>{
      this.task=res;
      this.cd.markForCheck();
    });
    this.meetingServices.getMyMeetingUpcoming().subscribe((res)=>{
      this.meeting=res;
      this.cd.markForCheck();
    });
    this.inventoryServices.getProductByStaff().subscribe((res)=>{
      this.product=res;
      console.log(this.product)
      this.cd.markForCheck();
    })

  }
  secToHr(x: string) {
    return ((parseInt(x) || 0) / 3600) + " Hr"
  }
}
