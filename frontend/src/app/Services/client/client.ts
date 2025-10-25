import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientModel } from '../../model/client.model';
import { Observable } from 'rxjs';
import { ADD_CLIENT, DELETE_BY_ID_CLIENT, GET_ALL_CLIENT, GET_CLIENT_BY_ID, GET_CLIENT_COLLECTION_DETAIL, GET_CLIENT_PRODUCT_DETAIL, GET_CLIENT_TASK_DETAIL, UPDATE_CLIENT } from '../../constant/url';
import { InventoryModel, Products } from '../../model/inventory.model';

@Injectable({
  providedIn: 'root'
})
export class ClientServices {

  constructor(private http: HttpClient) { }

  addClient(x: ClientModel): Observable<ClientModel> {
    return this.http.post<ClientModel>(ADD_CLIENT, x);
  }
  getAllClient(): Observable<ClientModel[]> {
    return this.http.get<ClientModel[]>(GET_ALL_CLIENT);
  }
  getClientById(id: string): Observable<ClientModel> {
    return this.http.get<ClientModel>(GET_CLIENT_BY_ID + id);
  }
  getClientCollectionDetail(id:string):Observable<InventoryModel[]>{
    return this.http.get<InventoryModel[]>(GET_CLIENT_COLLECTION_DETAIL+id)
  }
    getClientProductDetail(id:string):Observable<Products[]>{
    return this.http.get<Products[]>(GET_CLIENT_PRODUCT_DETAIL+id)
  }
  getClientTaskDetail(id:string):Observable<any>{
    return this.http.get<any>(GET_CLIENT_TASK_DETAIL+id);

  }
  updateClient(client: ClientModel, id: string): Observable<ClientModel> {
    return this.http.put<ClientModel>(UPDATE_CLIENT + id, client);
  }

  deleteClientById(id: string) {
    return this.http.delete(DELETE_BY_ID_CLIENT + id);
  }
}
