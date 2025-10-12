import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimeSheet } from '../../model/timesheet.model';
import { Observable } from 'rxjs';
import { ADD_TIME_SHEET, GET_ALL_TIME_SHEET_MANAGER, GET_ALL_TIME_SHEET_STAFF, GET_ALL_TIME_SHEET_WEEK, GET_MONTH_TASK_REPORT, GET_TIME_SHEET_ID, GET_TIME_TASK_REPORT, GET_TODAY_HOUR, GET_TODAY_TASK_REPORT, GET_WEEK_HOUR, GET_WEEK_HOUR_REPORT, UPDATE_TIME_SHEET_STATUS } from '../../constant/url';

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
  getTotalHourWeek(start:string,end:string):Observable<any>{
    return this.http.get<any>(GET_WEEK_HOUR+`?start=${start}&end=${end}`);
  }
    getTotalHourToday():Observable<any>{
    return this.http.get<any>(GET_TODAY_HOUR);
  }
  getReportWeek():Observable<any[]>{
    return this.http.get<any[]>(GET_WEEK_HOUR_REPORT);
  }
  getReportToday():Observable<any[]>{
    return this.http.get<any[]>(GET_TODAY_TASK_REPORT);
  }
   getReportMonth():Observable<TimeSheet[]>{
    return this.http.get<TimeSheet[]>(GET_MONTH_TASK_REPORT);
  }
  getTimeSheetManager():Observable<TimeSheet[]>{
    return this.http.get<TimeSheet[]>(GET_ALL_TIME_SHEET_MANAGER);
  }
  getTimeBaseReport(id:string,duration:string):Observable<any>{
    return this.http.get<any>(GET_TIME_TASK_REPORT+`?id=${id}&duration=${duration}`)
  }
  updateStatus(id:string,status:string):Observable<TimeSheet>{
    return this.http.put<TimeSheet>(UPDATE_TIME_SHEET_STATUS+id,{'status':status})
  }




  // function

}
