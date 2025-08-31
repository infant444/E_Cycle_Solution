import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoadingService } from '../../Services/loading/loading';
import { CommonModule } from '@angular/common';
import { LottieComponent,AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-loading',
  imports: [CommonModule,LottieComponent],
  templateUrl: './loading.html',
  styleUrl: './loading.css',
})
export class Loading implements OnInit{
    options: AnimationOptions = {
    path: './assets/images/loading.json',
    loop:true,
    autoplay:true

  };
   isLoading!:boolean;
  constructor(private loadingService:LoadingService,private cdRef: ChangeDetectorRef){

  }
  ngOnInit(): void {
 this.loadingService.isLoading.subscribe((isLoadingX)=>{
      this.isLoading=isLoadingX;
      this.cdRef.markForCheck();

    })
  }
}
