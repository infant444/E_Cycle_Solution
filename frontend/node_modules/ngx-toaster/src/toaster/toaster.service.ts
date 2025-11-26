import { Injectable } from '@angular/core';
import { ToastNotificationEvent } from './toast-notification-event';
import { Subject } from 'rxjs/Subject';
import { ToastNotificationConfiguration } from './toast-notification-configuration';
import { cloneDeep } from 'lodash';
import { NotificationCommand } from './notification-command.enum';

@Injectable()
export class ToasterService {
  private emitter = new Subject<ToastNotificationEvent>();

  // to trigger the toast notifiaction
  showToastMessage(toastMessageConfig: ToastNotificationConfiguration) {
    let clonedToastMessageConfiguration: ToastNotificationConfiguration = cloneDeep(toastMessageConfig);
    clonedToastMessageConfiguration.id = Math.random().toString(36).substring(3);
    this.emitter.next({ command: NotificationCommand.SET, notification: clonedToastMessageConfiguration });
  }

  // to close out the toast notification and clear the notifications array
  clearOneToastMessage(toastMessageConfig: ToastNotificationConfiguration) {
    this.emitter.next({ command: NotificationCommand.CLEAR, notification: toastMessageConfig });
  }
  // closes all the toast messages
  clearAllToastMessages() {
    this.emitter.next({ command: NotificationCommand.CLEAR_ALL });
  }
  // shares the Subject emitter
  getEmitter() {
    return this.emitter;
  }
}
