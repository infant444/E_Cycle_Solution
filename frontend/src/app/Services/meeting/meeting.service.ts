import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MeetingModel } from '../../model/meeting.model';
import { Observable } from 'rxjs';
import { ADD_MEETING, DELETE_BY_ID_MEETING, GET_ALL_MEETING, GET_ALL_MEETING_UPCOMING, GET_BY_MEETING_ID, GET_BY_MEETING_MY_UPCOMING, GET_BY_MEETING_STAFF, GET_BY_MEETING_STAFF_UPCOMING, UPDATE_MEETING_DETAIL, UPDATE_MEETING_STATUS } from '../../constant/url';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  constructor(private http:HttpClient) { }

  addMeeting(data:MeetingModel):Observable<MeetingModel>{
    return this.http.post<MeetingModel>(ADD_MEETING,data);
  }
  getAllMeeting():Observable<MeetingModel[]>{
    return this.http.get<MeetingModel[]>(GET_ALL_MEETING);
  }
  getAllMeetingUpcoming():Observable<MeetingModel[]>{
    return this.http.get<MeetingModel[]>(GET_ALL_MEETING_UPCOMING);
  }
  getUserMeeting(id:string):Observable<MeetingModel[]>{
    return this.http.get<MeetingModel[]>(GET_BY_MEETING_STAFF+id);
  }
  getUserMeetingUpcoming(id:string):Observable<MeetingModel[]>{
    return this.http.get<MeetingModel[]>(GET_BY_MEETING_STAFF_UPCOMING+id);
  }
  getMeetingById(id:string):Observable<MeetingModel>{
    return this.http.get<MeetingModel>(GET_BY_MEETING_ID+id);
  }
  getMyMeetingUpcoming():Observable<MeetingModel[]>{
    return this.http.get<MeetingModel[]>(GET_BY_MEETING_MY_UPCOMING);
  }
  updateMeetingDetail(id:string,data:MeetingModel):Observable<any>{
    return this.http.put<any>(UPDATE_MEETING_DETAIL+id,data);
  }
    updateMeetingStatus(id:string,status:string):Observable<any>{
    return this.http.put<any>(UPDATE_MEETING_STATUS+id,{"status":status});
  }
  deleteMeeting(id:string):Observable<any>{
    return this.http.delete<any>(DELETE_BY_ID_MEETING);

  }
}
