import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientModel } from '../../model/client.model';
import { Observable } from 'rxjs';
import { ADD_CLIENT, GET_ALL_CLIENT } from '../../constant/url';

@Injectable({
  providedIn: 'root'
})
export class ClientServices {

  constructor(private http:HttpClient) { }

  addClient(x:ClientModel):Observable<ClientModel>{
    return this.http.post<ClientModel>(ADD_CLIENT,x);
  }
  getAllClient():Observable<ClientModel[]>{
    return this.http.get<ClientModel[]>(GET_ALL_CLIENT);
  }
}
