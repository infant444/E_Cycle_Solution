// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor,
//   HttpEventType
// } from '@angular/common/http';
// import { finalize, Observable, tap } from 'rxjs';
// import { LoadingService } from '../../Services/loading/loading';
// var pendingRequest=0;

// @Injectable()
// export class LoadingInterceptor implements HttpInterceptor {

//   constructor(private loading:LoadingService) {}

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     this.loading.showLoading();
//     pendingRequest=pendingRequest+1;
//     return next.handle(request).pipe(
//       tap({
//         next:(event)=>{
//           if(event.type===HttpEventType.Response){
//             this.handlhide();
//           }
//         },
//         error:(_)=>
//         {
//           this.handlhide();
//         }
//       }),
//       finalize(() => this.handlhide())
//     );
//   }
//   handlhide(){
//     pendingRequest=pendingRequest-1;
//     if(pendingRequest==0)
//     {
//       this.loading.hideLoading();
//     }
//   }
// }

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { Observable, finalize, tap } from 'rxjs';
import { LoadingService } from '../../Services/loading/loading';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private pendingRequests = 0;

  constructor(private loading: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.pendingRequests++;
    if (this.pendingRequests === 1) {
      this.loading.showLoading();
    }

    return next.handle(request).pipe(
      tap({
        next: (event) => {
          if (event.type === HttpEventType.Response) {
            this.handleHide();
          }
        },
        error: () => this.handleHide()
      }),
      finalize(() => this.handleHide())
    );
  }

  private handleHide() {
    this.pendingRequests--;
    if (this.pendingRequests === 0) {
      this.loading.hideLoading();
    }
  }
}
