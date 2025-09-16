import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-project-info',
  imports: [MatIconModule,CurrencyPipe],
  templateUrl: './project-info.html',
  styleUrl: './project-info.css'
})
export class ProjectInfo {
@Input()
total_project:number=0;

@Input()
my_project:number=0;


@Input()
value:number=0;
}
