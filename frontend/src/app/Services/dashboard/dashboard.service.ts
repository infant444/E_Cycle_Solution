import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CheckLine, Clock, IndianRupee, Package, TriangleAlert, Trophy, UserCheck, Users } from 'lucide-angular';
import { Observable } from 'rxjs';
import { GET_CLIENT_GROUP, GET_INVENTORY_GROUP, GET_PENDING_TIMESHEET, GET_RECENT_PRODUCT, GET_STAFF_STATES, GET_STATES, GET_TASK_STATUS_GROUP, GET_TOP_CLIENT } from '../../constant/url';
import { Products } from '../../model/inventory.model';
import { ClientModel } from '../../model/client.model';
import { TimeSheet } from '../../model/timesheet.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private http: HttpClient,
  ) { }
  getStats(te: number, ht: string, ii: number, iv: number, ac: number, pp: number) {
    return [
      { title: 'Total Employees', value: te, icon: Users, color: '#8eaff5' },
      { title: 'Hours Today', value: ht, icon: Clock, color: '#40b46b' },
      { title: 'Inventory Items', value: ii, icon: Package, color: '#9333ea' },
      { title: 'Inventory Value', value: `₹${iv}`, icon: IndianRupee, color: '#40b46b' },
      { title: 'Active Clients', value: ac, icon: UserCheck, color: '#8eaff5' },
      { title: 'Processing Project', value: pp, icon: TriangleAlert, color: '#ea580c' }
    ];
  }
  getStaffStats(hourWeek: string, completeTask: string, inProcessed: number, itemProcessed: number, activeClient: number, processingProject: number) {
    return [
      { title: 'Hours This Week', value: hourWeek, icon: Clock, color: '#8eaff5' },
      { title: 'Completed Tasks', value: completeTask, icon: Trophy, color: '#40b46b' },
      { title: 'In Progress', value: inProcessed, icon: CheckLine, color: '#8eaff5' },
      { title: 'Item Processed', value: itemProcessed, icon: Package, color: '#9333ea' },
      { title: 'Active Clients', value: activeClient, icon: UserCheck, color: '#8eaff5' },
      { title: 'Processing Project', value: processingProject, icon: TriangleAlert, color: '#ea580c' }
    ];
  }
  getStates(): Observable<any> {
    return this.http.get<any>(GET_STATES);
  }
  getTaskStatus(): Observable<any> {
    return this.http.get<any>(GET_TASK_STATUS_GROUP);
  }
  getClientType(): Observable<any> {
    return this.http.get<any>(GET_CLIENT_GROUP);
  }
  getInventoryStatus(): Observable<any> {
    return this.http.get<any>(GET_INVENTORY_GROUP);
  }
  getRecentProduct(): Observable<Products[]> {
    return this.http.get<Products[]>(GET_RECENT_PRODUCT);
  }
  getTopClient(): Observable<ClientModel[]> {
    return this.http.get<ClientModel[]>(GET_TOP_CLIENT);
  }
  getPendingTimeSheet(): Observable<TimeSheet[]> {
    return this.http.get<TimeSheet[]>(GET_PENDING_TIMESHEET);
  }
  getUserStates(): Observable<any> {
    return this.http.get<any>(GET_STAFF_STATES);
  }
}
