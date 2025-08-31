import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserServices } from '../../Services/user/user';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userServices:UserServices) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const user=this.userServices.currentUser;
    if(user.token)
    {
      request=request.clone({
        setHeaders:{
          access_token:user.token
        }
      })
    }
    return next.handle(request);
  }
}
