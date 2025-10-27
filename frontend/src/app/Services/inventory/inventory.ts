import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InventoryModel, Products, Transaction } from '../../model/inventory.model';
import { Observable } from 'rxjs';
import { ADD_SALES_ON_INVENTORY, GET_ALL_INVENTORY, GET_INVENTORY_BY_ID, GET_PRODUCT_BY_CLIENT, GET_PRODUCT_BY_STAFF, GET_PRODUCT_FROM_PARTICULAR_INVENTORY, GET_TRANSACTION_FROM_PARTICULAR_INVENTORY, INVENTORY_MAKE_PURCHASE, INVENTORY_STATE, PARTICULAR_INVENTORY_STATE } from '../../constant/url';
import { CheckLine, Clock, FolderCheck, IndianRupee, Package, Package2, TrendingUp, TriangleAlert, Trophy, UserCheck, Users } from 'lucide-angular';


@Injectable({
  providedIn: 'root'
})
export class InventoryServices {

  constructor(private http:HttpClient) { }
  getStats(tc: number, tpp: string, tps: number, pro: number, cs: number, cc: number) {
    return [
      { title: 'Total Collection', value: tc, icon: FolderCheck, color: '#8eaff5' },
      { title: 'Total Product Purchase', value: tpp, icon: Package, color: '#40b46b' },
      { title: 'Total Product sell', value: tps, icon: Package2 , color: '#9333ea' },
      { title: 'Profit', value: `₹${pro}`, icon: TrendingUp, color: '#40b46b' },
      { title: 'Current stock', value: cs, icon: Package, color: '#8eaff5' },
      { title: 'Completed Collection', value: cc, icon: Clock, color: '#ea580c' }
    ];
  }
    getPaticularStats(tc: number, tpp: string, tps: number, pro: number,) {
    return [
      { title: 'Current Stock', value: tc, icon: Trophy, color: '#8eaff5' },
      { title: 'Total Product Purchase', value: tpp, icon: Package, color: '#40b46b' },
      { title: 'Total Product sell', value: tps, icon: Package2 , color: '#9333ea' },
      { title: 'Profit', value: `₹${pro}`, icon: TrendingUp, color: '#40b46b' },
    ];
  }
  purchaseProduct(data:InventoryModel):Observable<InventoryModel>{
    return this.http.post<InventoryModel>(INVENTORY_MAKE_PURCHASE,data);
  }
  SaleProduct(data:Transaction[]):Observable<any>{
    return this.http.post<any>(ADD_SALES_ON_INVENTORY,data);
  }
  InventoryState():Observable<any>{
    return this.http.get<any>(INVENTORY_STATE);
  }
    getPaticularInventoryState(id:string):Observable<any>{
    return this.http.get<Products[]>(PARTICULAR_INVENTORY_STATE+id);

  }
  getAll():Observable<InventoryModel[]>{
    return this.http.get<InventoryModel[]>(GET_ALL_INVENTORY);
  }
  getById(id:string):Observable<InventoryModel>{
    return this.http.get<InventoryModel>(GET_INVENTORY_BY_ID+id);
  }
  getProductByClientId(id:String):Observable<Products[]>{
    return this.http.get<Products[]>(GET_PRODUCT_BY_CLIENT+id);
  }
    getProductByStaff():Observable<Products[]>{
    return this.http.get<Products[]>(GET_PRODUCT_BY_STAFF);
  }
getTransactionForParticularInventory(id:string):Observable<Transaction[]>{
  return this.http.get<Transaction[]>(GET_TRANSACTION_FROM_PARTICULAR_INVENTORY+id);
}
getProductForParticularInventory(id:string):Observable<Products[]>{
  return this.http.get<Products[]>(GET_PRODUCT_FROM_PARTICULAR_INVENTORY+id);
}
}
