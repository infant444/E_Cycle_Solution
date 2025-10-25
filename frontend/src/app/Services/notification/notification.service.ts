import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { GET_ALL_NOTIFICATION, GET_NOT_READ_NOTIFICATION, MAKE_IT_READ } from '../../constant/url';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private http:HttpClient){}
  getAll():Observable<any[]>{
    return this.http.get<any[]>(GET_ALL_NOTIFICATION);
  }
  getCount():Observable<any>{
    return this.http.get<any>(GET_NOT_READ_NOTIFICATION);
  }
  makeRead(id:string):Observable<any>{
    return this.http.get<any>(MAKE_IT_READ+id)
  }
}
