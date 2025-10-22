import { Component, OnInit } from '@angular/core';
import { Title } from "../../sub_component/title/title";
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../Services/dashboard/dashboard.service';

@Component({
  selector: 'app-staff-dashboard',
  imports: [Title,CommonModule],
  templateUrl: './staff-dashboard.html',
  styleUrl: './staff-dashboard.css'
})
export class StaffDashboard implements OnInit {
  constructor(
    private dashboardServices:DashboardService
  ){

  }
  ngOnInit(): void {

  }
}
