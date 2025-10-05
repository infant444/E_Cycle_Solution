import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { LucideAngularModule, UserCheck, UserX } from 'lucide-angular';

@Component({
  selector: 'app-employee-info',
  imports: [MatIconModule,LucideAngularModule,],
  templateUrl: './employee-info.component.html',
  styleUrl: './employee-info.component.css'
})
export class EmployeeInfoComponent {
readonly UserCheck=UserCheck;
readonly userX=UserX;

@Input()
total_employee:number=0;

@Input()
active_employee:number=0;

@Input()
inactive_employee:number=0;
}
