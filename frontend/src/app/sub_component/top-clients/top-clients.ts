import { Component, Input } from '@angular/core';
import { ClientModel } from '../../model/client.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-clients',
  imports: [CommonModule],
  templateUrl: './top-clients.html',
  styleUrl: './top-clients.css'
})
export class TopClients {
@Input()
items:ClientModel[]=[];
constructor(
  public router:Router
){

}
}
