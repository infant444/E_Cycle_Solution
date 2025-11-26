import { EventEmitter, OnInit } from '@angular/core';
import { ToasterService } from './toaster.service';
import { ToastNotificationConfiguration } from './toast-notification-configuration';
export declare class ToasterComponent implements OnInit {
    private toasterService;
    arrayOfNotifications: Array<ToastNotificationConfiguration>;
    onDestroy: EventEmitter<ToastNotificationConfiguration>;
    constructor(toasterService: ToasterService);
    ngOnInit(): void;
    hide(toastNotification: ToastNotificationConfiguration): void;
}
