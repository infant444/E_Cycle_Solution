import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InventoryModel } from '../../model/inventory.model';
import { Observable } from 'rxjs';
import { INVENTORY_MAKE_PURCHASE, INVENTORY_STATE } from '../../constant/url';
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
  purchaseProduct(data:InventoryModel):Observable<InventoryModel>{
    return this.http.post<InventoryModel>(INVENTORY_MAKE_PURCHASE,data);
  }
  InventoryState():Observable<any>{
    return this.http.get<any>(INVENTORY_STATE);
  }
}
