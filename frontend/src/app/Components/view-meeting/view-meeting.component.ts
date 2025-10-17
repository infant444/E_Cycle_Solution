import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MeetingService } from '../../Services/meeting/meeting.service';
import { MeetingModel } from '../../model/meeting.model';
import { MatIconModule } from '@angular/material/icon';
import { UserServices } from '../../Services/user/user';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-view-meeting.component',
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './view-meeting.component.html',
  styleUrl: './view-meeting.component.css'
})
export class ViewMeetingComponent implements OnInit {

  meeting!: MeetingModel;
  user!: User;
  constructor(
    private meetingServices: MeetingService,
    private activateRouter: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private router: Router,
    private userService: UserServices
  ) { }
  ngOnInit(): void {
    this.activateRouter.params.subscribe((params) => {
      if (params.id) {
        this.meetingServices.getMeetingById(params.id).subscribe((res) => {
          this.meeting = res;
          this.userService.getById(this.meeting.staff).subscribe((res1) => {
            this.user = res1;
            this.cd.markForCheck()

          })
          this.cd.markForCheck()
        })
      }
    })
  }

  edit(id: string) {
    this.router.navigateByUrl("/meeting/edit/" + id)
  }
  delete(id: string) {
    this.meetingServices.deleteMeeting(id).subscribe(_ => {
      this.router.navigateByUrl("/meeting");
    })
  }
  back() {
    this.router.navigateByUrl("/meeting");
  }
  getTime(dateStr: string): Date {
    const today = new Date();
    const [hours, minutes] = dateStr.split(':').map(Number);
    today.setHours(hours, minutes, 0);
    return today;
  }
  calculateDate(x: string) {
    const dueDate = new Date(x).getTime();   // convert to ms
    const today = new Date().getTime();      // current time in ms
    const diffMs = dueDate - today;          // difference in ms
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    return diffDays;
  }
}
