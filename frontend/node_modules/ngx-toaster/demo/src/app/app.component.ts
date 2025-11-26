import { Component } from '@angular/core';
import { ToasterService, ToastNotificationConfiguration, ToastType } from '../../../src/toaster';

@Component({
  selector: 'ngx-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  toastNotificationConfig: ToastNotificationConfiguration = {
    message: 'Some Toast message',
    displayDuration: 1000,
    autoHide: false,
    showCloseButton: true,
    toastType: ToastType.INFORMATION
  };

  constructor(private toastNotificationService: ToasterService) { }

  toastClosed(toastNotificationConfig: ToastNotificationConfiguration) {
    console.log(toastNotificationConfig);
  }

  startToastNotification() {
    this.toastNotificationService.showToastMessage(this.toastNotificationConfig);
    let someOtherConfig = Object.assign({}, this.toastNotificationConfig);
    someOtherConfig.toastType = ToastType.SUCCESS;
    someOtherConfig.message = 'Success';
    someOtherConfig.autoHide = false;
    this.toastNotificationService.showToastMessage(someOtherConfig);
  }
  hideToastNotification() {
    this.toastNotificationService.clearAllToastMessages();
  }

}
