import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InventoryModel } from '../../model/inventory.model';
import { Observable } from 'rxjs';
import { INVENTORY_MAKE_PURCHASE } from '../../constant/url';

@Injectable({
  providedIn: 'root'
})
export class InventoryServices {

  constructor(private http:HttpClient) { }

  purchaseProduct(data:InventoryModel):Observable<InventoryModel>{
    return this.http.post<InventoryModel>(INVENTORY_MAKE_PURCHASE,data);
  }
}
