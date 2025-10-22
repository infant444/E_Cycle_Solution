import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-inventory-status',
  imports: [CommonModule],
  templateUrl: './inventory-status.html',
  styleUrl: './inventory-status.css'
})
export class InventoryStatus {
  @Input()
  items:any[]=[];
}
