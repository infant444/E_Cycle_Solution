import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimeSheet } from '../../model/timesheet.model';
import { Observable } from 'rxjs';
import { ADD_TIME_SHEET, GET_ALL_TIME_SHEET_STAFF, GET_ALL_TIME_SHEET_WEEK, GET_TIME_SHEET_ID, UPDATE_TIME_SHEET_STATUS } from '../../constant/url';

@Injectable({
  providedIn: 'root'
})
export class TimeSheetService {

  constructor(private http:HttpClient) { }

  addTimeSheet(data:TimeSheet):Observable<TimeSheet>{
    return this.http.post<TimeSheet>(ADD_TIME_SHEET,data);
  }
  getAllWeek(start:string,end:string):Observable<TimeSheet[]>{
    return this.http.get<TimeSheet[]>(GET_ALL_TIME_SHEET_WEEK+`?start=${start}&end=${end}`);
  }
  getAllStaff():Observable<TimeSheet[]>{
    return this.http.get<TimeSheet[]>(GET_ALL_TIME_SHEET_STAFF);
  }
  getById(id:string):Observable<TimeSheet>{
    return this.http.get<TimeSheet>(GET_TIME_SHEET_ID+id)
  }
  updateStatus(id:string,status:string):Observable<TimeSheet>{
    return this.http.put<TimeSheet>(UPDATE_TIME_SHEET_STATUS+id,{'status':status})
  }
}
