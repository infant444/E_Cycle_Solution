import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-client-info',
  imports: [MatIconModule,CurrencyPipe],
  templateUrl: './client-info.html',
  styleUrl: './client-info.css'
})
export class ClientInfo {
@Input()
total_client:number=0;

@Input()
active_client:number=0;

@Input()
collection:number=0;

@Input()
value:number=0;
}
