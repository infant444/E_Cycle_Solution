import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Products } from '../../model/inventory.model';

@Component({
  selector: 'app-recent-inventory',
  imports: [CommonModule],
  templateUrl: './recent-inventory.html',
  styleUrl: './recent-inventory.css'
})
export class RecentInventory {
@Input()
items:Products[]=[]
}
