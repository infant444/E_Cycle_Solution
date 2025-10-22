import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LucideAngularModule, } from 'lucide-angular';
@Component({
  selector: 'app-admin-dashboard-states',
  imports: [CommonModule,LucideAngularModule],
  templateUrl: './admin-dashboard-states.html',
  styleUrl: './admin-dashboard-states.css'
})
export class AdminDashboardStates {
  @Input() title!: string;
  @Input() value!: string | number;
  @Input() icon?: any;
  @Input() color!:string;
}
