import { Component, OnInit } from '@angular/core';
import { Title } from '../../sub_component/title/title';

@Component({
  selector: 'app-inventory',
  imports: [Title],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css'
})
export class Inventory implements OnInit {

  constructor(){

  }
  ngOnInit(): void {

  }
}
