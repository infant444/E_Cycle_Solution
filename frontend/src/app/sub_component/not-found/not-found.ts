import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

@Component({
  selector: 'app-not-found',
  imports: [CommonModule,LottieComponent],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css'
})
export class NotFound implements OnInit{
            options: AnimationOptions = {
    path: './assets/animation/empty.json',
    loop:true,
    autoplay:true

  };
  ngOnInit(): void {

  }
}
