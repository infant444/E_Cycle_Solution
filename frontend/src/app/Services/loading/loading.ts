import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  constructor(private ngZone: NgZone) {
    this.isLoadingSubject=new BehaviorSubject<boolean>(false);
  }

  showLoading() {
    console.log('SHOW loading');
    this.isLoadingSubject.next(true);
  }
  hideLoading() {
    console.log('HIDE loading');
    this.isLoadingSubject.next(false);
  }
  get isLoading() {
    return this.isLoadingSubject.asObservable();
  }
}
