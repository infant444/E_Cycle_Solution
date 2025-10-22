import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-unauthorized.component',
  imports: [CommonModule,LottieComponent],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.css'
})
export class UnauthorizedComponent {
 options: AnimationOptions = {
    path: './assets/animation/Error.json',
    loop:true,
    autoplay:true

  };
}
