import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import axios from 'axios';
import { MeetingService } from '../../Services/meeting/meeting.service';
import { Title } from "../../sub_component/title/title";
import { MeetingModel } from '../../model/meeting.model';
import { AddMeetingComponent } from "../../sub_component/add-meeting/add-meeting.component";
import { UserServices } from '../../Services/user/user';
import { User } from '../../model/user.model';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-meeting.component',
  imports: [CommonModule, FullCalendarModule, Title, AddMeetingComponent],
  standalone: true,
  templateUrl: './meeting.component.html',
  styleUrl: './meeting.component.css'
})
export class MeetingComponent implements OnInit {
  calendarOptions!: CalendarOptions;
  events: any[] = [];
  display = 'none';
  type = 'add';
  editMeeting!: MeetingModel;
  meeting?: MeetingModel[];
  user?: User[];
  constructor(
    private meetingServices: MeetingService,
    private cd: ChangeDetectorRef,
    private userServices: UserServices,
    private router: Router,
    private activateRouter:ActivatedRoute,
  ) {

  }
  ngOnInit() {
        this.activateRouter.params.subscribe((params) => {
      if (params.id) {
        this.meetingServices.getMeetingById(params.id).subscribe((res) => {
          this.edit(res);
          this.cd.markForCheck()
        })
      }
    })


    this.userServices.getAll().subscribe((res) => {
      this.user = res;
      this.cd.markForCheck()
    })
    this.calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      selectable: true,
      editable: true,
      selectMirror: true,
      dayMaxEvents: true,
      eventColor: '#3788d8',
      eventTextColor: '#ffffff',
      eventDisplay: 'block',
      dateClick: this.onDateClick.bind(this),
      eventClick: this.onEventClick.bind(this),
      eventDidMount: (info) => {
        info.el.setAttribute('title', info.event.title);
      },
      eventMouseEnter: (info) => {
        info.el.style.borderColor = 'yellow';
        info.el.style.cursor = 'pointer';
      },
      eventMouseLeave: (info) => {
        info.el.style.borderColor = '';
      },
      height: 'auto',
    };
    if (this.userServices.currentUser.role === 'admin') {
      this.meetingServices.getAllMeeting().subscribe((res) => {
        console.log(res);
        this.meeting = res;
        if (this.meeting.length > 0) {
          this.events = this.meeting.map(event => {
            return {
              id: event.id,
              title: event.title,
              start: `${new Date(event.start_date).toISOString().split('T')[0]}T${event.start_time || '00:00:00'}`,
              end: `${new Date(event.end_date).toISOString().split('T')[0]}T${event.end_time || '23:59:59'}`,
              backgroundColor: this.getEventColor(event.type),
              borderColor: this.getEventColor(event.type),
              extendedProps: {
                description: event.description,
                type: event.type,
                staffName: this.getUser(event.staff)?.name,
                staffAvatar: this.getUser(event.staff)?.profile == '' ? "./assets/images/profile_pic.png" : this.getUser(event.staff)?.profile,
              }
            };
          });
          this.cd.markForCheck();
          this.calendarOptions = {
            plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
            initialView: 'dayGridMonth',
            headerToolbar: {
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            },
            selectable: true,
            editable: true,
            selectMirror: true,
            dayMaxEvents: true,
            eventColor: '#3788d8',
            eventTextColor: '#ffffff',
            eventDisplay: 'block',
            events: this.events,
            eventContent: (arg) => {
              const staffName = arg.event.extendedProps.staffName;
              const staffAvatar = arg.event.extendedProps.staffAvatar;
              const title = arg.event.title;
              const type = arg.event.extendedProps.type;
              return {
                html: `
        <div style="display:flex; align-items:center;overflow:hidden;">
          <img src="${staffAvatar}" style="width:30px; height:30px; border-radius:50%; margin-right:5px;"  />
          <div>
            <div style="font-weight:bold; font-size:12px;text-overflow:ellipsis;">${title}</div>
            <div style="font-size:10px;">${staffName}</div>
            <div style="font-size:10px;">${type}</div>
          </div>
        </div>
      `
              };
            },
            dateClick: this.onDateClick.bind(this),
            eventClick: this.onEventClick.bind(this),
            eventDidMount: (info) => {
              info.el.setAttribute('title', info.event.title);
            },
            eventMouseEnter: (info) => {
              info.el.style.borderColor = 'yellow';
              info.el.style.cursor = 'pointer';
            },
            eventMouseLeave: (info) => {
              info.el.style.borderColor = '';
            },
            height: 'auto',
          };
          this.cd.markForCheck()
        }

      })
    } else if(this.userServices.currentUser.role=='staff') {
      this.meetingServices.getUserMeeting(this.userServices.currentUser.id).subscribe((res) => {
        console.log(res);
        this.meeting = res;
        if (this.meeting.length > 0) {
          this.events = this.meeting.map(event => {
            return {
              id: event.id,
              title: event.title,
              start: `${new Date(event.start_date).toISOString().split('T')[0]}T${event.start_time || '00:00:00'}`,
              end: `${new Date(event.end_date).toISOString().split('T')[0]}T${event.end_time || '23:59:59'}`,
              backgroundColor: this.getEventColor(event.type),
              borderColor: this.getEventColor(event.type),
              extendedProps: {
                description: event.description,
                type: event.type,
              }
            };
          });
          this.cd.markForCheck();
          this.calendarOptions = {
            plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
            initialView: 'dayGridMonth',
            headerToolbar: {
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            },
            selectable: true,
            editable: true,
            selectMirror: true,
            dayMaxEvents: true,
            eventColor: '#3788d8',
            eventTextColor: '#ffffff',
            eventDisplay: 'block',
            events: this.events,
            eventContent: (arg) => {
              const title = arg.event.title;
              const type = arg.event.extendedProps.type;
              return {
                html: `
        <div style="display:flex; align-items:center;overflow:hidden;">
          <div>
            <div style="font-weight:bold; font-size:12px;text-overflow:ellipsis;">${title}</div>
            <div style="font-size:10px;">${type}</div>
          </div>
        </div>
      `
              };
            },
            dateClick: this.onDateClick.bind(this),
            eventClick: this.onEventClick.bind(this),
            eventDidMount: (info) => {
              info.el.setAttribute('title', info.event.title);
            },
            eventMouseEnter: (info) => {
              info.el.style.borderColor = 'yellow';
              info.el.style.cursor = 'pointer';
            },
            eventMouseLeave: (info) => {
              info.el.style.borderColor = '';
            },
            height: 'auto',
          };
          this.cd.markForCheck()
        }

      })
    }

  }
  getEventColor(type: string): string {
    switch (type) {
      case "collection": return '#8000FF'; // blue
      case "client_meeting": return '#FF69B4'; // red
      case "office_meeting": return '#33C3FF';
      case "Project": return '#32CD32';
      case "task": return '#FF4500';

      default: return '#007BFF'; // default
    }
  }
  getUser(id: string) {
    return this.user?.find(s => s.id === id)
  }
  onDateClick(info: any) {
    console.log(info.date);

    if (this.display == 'none') {
      const x: MeetingModel = {
        id: '',
        title: '',
        description: '',
        status: '',
        type: '',
        staff: '',
        start_date: new Date(info.date).toISOString().split('T')[0],
        start_time: new Date(info.date).toISOString(),
        end_date: new Date(info.date).toISOString().split('T')[0],
        end_time: this.endDate(info.date)
      }
      console.log(x);
      this.editMeeting = x;
      this.display = 'flex';
      this.type = 'add';
      this.cd.markForCheck()
    } else {
      this.display = 'none';
      this.reAssign()
    }
  }

  onEventClick(info: any) {
    this.router.navigateByUrl("/meeting/view/" + info.event.id);
  }
  dis() {
    if (this.display == 'none') {
      const x: MeetingModel = {
        id: '',
        title: '',
        description: '',
        status: '',
        type: '',
        staff: '',
        start_date: new Date().toISOString().split('T')[0],
        start_time: new Date().toISOString(),
        end_date: new Date().toISOString().split('T')[0],
        end_time: this.endDate()
      }
      this.editMeeting = x;
      this.display = 'flex';
      this.type = 'add';
    } else {
      this.display = 'none';
      this.reAssign()
    }
  }
 edit(meeting:MeetingModel) {
    if (this.display == 'none') {

      this.editMeeting = meeting;
      this.display = 'flex';
      this.type = 'edit';
    } else {
      this.display = 'none';
      this.reAssign()
    }
  }
  reAssign() {
    this.meetingServices.getAllMeeting().subscribe((res) => {
      console.log(res);
      this.meeting = res;
      if (this.meeting.length > 0) {
        this.events = this.meeting.map(event => {
          return {
            id: event.id,
            title: event.title,
            start: `${new Date(event.start_date).toISOString().split('T')[0]}T${event.start_time || '00:00:00'}`,
            end: `${new Date(event.end_date).toISOString().split('T')[0]}T${event.end_time || '23:59:59'}`,
            backgroundColor: this.getEventColor(event.type),
            borderColor: this.getEventColor(event.type),
            extendedProps: {
              description: event.description,
              type: event.type,
              staffName: this.getUser(event.staff)?.name,
              staffAvatar: this.getUser(event.staff)?.profile == '' ? "./assets/images/profile_pic.png" : this.getUser(event.staff)?.profile,
            }
          };
        });
        this.cd.markForCheck();
        this.calendarOptions = {
          plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
          initialView: 'dayGridMonth',
          headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
          },
          selectable: true,
          editable: true,
          selectMirror: true,
          dayMaxEvents: true,
          eventColor: '#3788d8',
          eventTextColor: '#ffffff',
          eventDisplay: 'block',
          events: this.events,
          eventContent: (arg) => {
            const staffName = arg.event.extendedProps.staffName;
            const staffAvatar = arg.event.extendedProps.staffAvatar;
            const title = arg.event.title;
            const type = arg.event.extendedProps.type;
            return {
              html: `
        <div style="display:flex; align-items:center;overflow:hidden;">
          <img src="${staffAvatar}" style="width:30px; height:30px; border-radius:50%; margin-right:5px; overflow:hidden"  />
          <div>
            <div style="font-weight:bold; font-size:12px;text-overflow:ellipsis;">${title}</div>
            <div style="font-size:10px;">${staffName}</div>
            <div style="font-size:10px;">${type}</div>
          </div>
        </div>
      `
            };
          },
          dateClick: this.onDateClick.bind(this),
          eventClick: this.onEventClick.bind(this),
          eventDidMount: (info) => {
            info.el.setAttribute('title', info.event.title);
          },
          eventMouseEnter: (info) => {
            info.el.style.borderColor = 'yellow';
            info.el.style.cursor = 'pointer';
          },
          eventMouseLeave: (info) => {
            info.el.style.borderColor = '';
          },
          height: 'auto',
        };
        this.cd.markForCheck()
      }

    })
  }
  formatTime = (date: Date) => {
    return date.getHours().toString().padStart(2, '0') + ":" +
      date.getMinutes().toString().padStart(2, '0');
  }
  endDate(date: string = new Date().toISOString()): string {
    const startDate = new Date(date);
    const endDate = new Date(startDate.getTime() + 1.5 * 60 * 60 * 1000);
    return endDate.toISOString();
  }
}
