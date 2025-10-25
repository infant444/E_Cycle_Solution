import { ChangeDetectorRef, Component } from '@angular/core';
import { NotificationService } from '../../Services/notification/notification.service';
import { UserServices } from '../../Services/user/user';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification',
  imports: [CommonModule],
  templateUrl: './notification.html',
  styleUrl: './notification.css'
})
export class Notification {
 notifications: any[] = [];

  constructor(private notificationService: NotificationService,private userServices:UserServices,private cd:ChangeDetectorRef,private router:Router) {}

  ngOnInit(): void {
    this.notificationService.getAll().subscribe((res)=>{
      this.notifications=res;
      console.log(this.notifications)
      this.cd.markForCheck()
    })
  }
  makeRead(id:string,is_read:boolean,redirect:string){
    if(!is_read){
      this.notificationService.makeRead(id).subscribe((res)=>{
        this.router.navigateByUrl(redirect);
      })
    }else{
        this.router.navigateByUrl(redirect);
    }
  }
}
