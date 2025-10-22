import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-client-overview',
  imports: [CommonModule],
  templateUrl: './client-overview.html',
  styleUrl: './client-overview.css'
})
export class ClientOverview {
  @Input()
  items:any[]=[];
}
