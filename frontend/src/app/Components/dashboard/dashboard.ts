import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Title } from "../../sub_component/title/title";
import { Clock, IndianRupee, LucideAngularModule, Package, TriangleAlert, UserCheck, Users } from 'lucide-angular';
import { AdminDashboardStates } from "../../sub_component/admin-dashboard-states/admin-dashboard-states";
import { DashboardService } from '../../Services/dashboard/dashboard.service';
import { TaskOverview } from "../../sub_component/task-overview/task-overview";
import { InventoryStatus } from "../../sub_component/inventory-status/inventory-status";
import { ClientOverview } from "../../sub_component/client-overview/client-overview";
import { Router } from '@angular/router';
import { RecentInventory } from "../../sub_component/recent-inventory/recent-inventory";
import { TopClients } from "../../sub_component/top-clients/top-clients";
import { PendingTimesheets } from "../../sub_component/pending-timesheets/pending-timesheets";
import { TimeSheet } from '../../model/timesheet.model';
import { ClientModel } from '../../model/client.model';
import { Products } from '../../model/inventory.model';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MatIconModule, Title, LucideAngularModule, AdminDashboardStates, TaskOverview, InventoryStatus, ClientOverview, RecentInventory, TopClients, PendingTimesheets],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit{

  state:any;
  taskOverView:any;
  clientOverView:any;
  inventoryOverView:any;
  recentInventory:Products[]=[];
  topClient:ClientModel[]=[];
  pendingTimesheet:TimeSheet[]=[];
  constructor(
    private dashboardServices:DashboardService,
    private cd:ChangeDetectorRef,
    public router:Router,
  ){}
  ngOnInit(): void {
    this.dashboardServices.getStates().subscribe((res)=>{
    this.state=this.dashboardServices.getStats(res.totalUsers,this.secToHr(res.todayWorkHours),res.inventoryItemsLastMonth,res.inventoryValueLastMonth,res.totalClients,res.processedProjects);
    this.cd.markForCheck();
    })
    this.dashboardServices.getTaskStatus().subscribe((res)=>{
      this.taskOverView=res;
      this.cd.markForCheck();
    })
    this.dashboardServices.getClientType().subscribe((res)=>{
      this.clientOverView=res;
      this.cd.markForCheck();
    });
    this.dashboardServices.getInventoryStatus().subscribe((res)=>{
      this.inventoryOverView=res;
      console.log(res)
      this.cd.markForCheck();
    });
    this.dashboardServices.getTopClient().subscribe((res)=>{
      this.topClient=res;
      this.cd.markForCheck();

    });
    this.dashboardServices.getRecentProduct().subscribe((res)=>{
      this.recentInventory=res;
      this.cd.markForCheck();

    })
    this.dashboardServices.getPendingTimeSheet().subscribe((res)=>{
      this.pendingTimesheet=res;
      this.cd.markForCheck();

    })
  }
   secToHr(x:string){
  return (parseInt(x) / 3600)+" Hr"
 }
}
