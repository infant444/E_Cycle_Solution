
import { animate, Component, EventEmitter, OnInit, Output, state, style, transition, trigger } from '@angular/core';
import { ToastType } from './toast-type.enum';
import { ToasterService } from './toaster.service';
import { ToastNotificationConfiguration } from './toast-notification-configuration';
import { remove } from 'lodash';
import { NotificationCommand } from './notification-command.enum';

@Component({
    selector: 'ngx-toast-notification',
    template: `
        <div *ngFor ="let toastNotification of arrayOfNotifications">
        <ng-container *ngIf="toastNotification">
            <div [@scaleInOut]="animation"
                 id="overlay">
                <div [id]="toastNotification.id" class="alert alert-{{toastNotification?.toastType}}" role="alert">
                    <i class="fa message-icon" [ngClass]="{'fa-times-circle': toastNotification?.toastType === 'danger',
                    'fa-exclamation-triangle': toastNotification?.toastType === 'warning',
                    'fa-info-circle': toastNotification?.toastType === 'info',
                    'fa-check-circle': toastNotification?.toastType === 'success'}">
                    </i>
                    <button *ngIf="toastNotification?.showCloseButton"
                            class="close" aria-label="Close" (click)="hide(toastNotification)">
                        <span class="fa fa-times" aria-hidden="true"></span>
                    </button>
                    <div class="inline message-block" [innerHTML]="toastNotification?.message"></div>
                </div>
            </div>
        </ng-container>
        </div>`,
    animations: [
        trigger('scaleInOut', [
            state('scale', style({ opacity: 1, transform: 'scale(1)' })),
            transition('* => scale', [
                style({ opacity: 0, transform: 'scale(0)' }),
                animate('300ms ease-in-out')
            ]),
            state('scaleOut', style({ opacity: 0, transform: 'scale(0)' })),
            transition('scale => scaleOut', [
                style({ opacity: 1, transform: 'scale(1)' }),
                animate('300ms ease-in-out')
            ])
        ])
    ],
    styles: [`
            toast-notifications {
                    position: fixed;
                    z-index: 1000;
                    top: 80px;
                    left: 0;
                    right: 0;
                    // Set the width and center it
                    margin-right: auto;
                    margin-left: auto;
                    width: 360px;
                    ngx-toast-notification {
                        #overlay {
                            width: 100%;
                            margin-bottom: 10px;
                            .alert {
                                // override bootstrap
                                margin-bottom: 0;
                                position: relative;
                                box-shadow: 0 3px 9px rgba(0, 0, 0, .5); // copied to match bootstrap's modals (modals.less)
                                .progress {
                                    position: absolute;
                                    top: -1px;
                                    left: 2px; // accounts for rounded corners
                                    right: 2px;
                                    height: 2px;
                                    margin-bottom: 0;
                                }
                            }
                            .inline {
                                display: inline-block;
                            }
                        }
                    }
                }
        `]
})

export class ToasterComponent implements OnInit {
    arrayOfNotifications: Array<ToastNotificationConfiguration> = [];
    // emit event for sending tne deletion info to parent toast-notifications
    @Output() onDestroy: EventEmitter<ToastNotificationConfiguration> = new EventEmitter<ToastNotificationConfiguration>();
    constructor(private toasterService: ToasterService) { }

    ngOnInit() {
        this.toasterService.getEmitter().subscribe(notificationEvent => {
            if (notificationEvent.command === NotificationCommand.SET) {
                if (notificationEvent.notification.autoHide) {
                    // if the autoHide property is set to true clearOneToastMessage automatically based on the displayDuration
                    setTimeout(() => {
                        this.toasterService.clearOneToastMessage(notificationEvent.notification);
                    }, notificationEvent.notification.displayDuration);
                }
                // pushing each notification into array
                this.arrayOfNotifications.push(notificationEvent.notification);
            } else if (notificationEvent.command === NotificationCommand.CLEAR) {
                this.onDestroy.emit(notificationEvent.notification);
                remove(this.arrayOfNotifications, this.arrayOfNotifications.find((not) => not === notificationEvent.notification));
                // this.arrayOfNotifications.splice(this.arrayOfNotifications.find(notificationEvent.notification, 1);
            } else if (notificationEvent.command === NotificationCommand.CLEAR_ALL) {
                this.arrayOfNotifications = [];
            }
        });
    }

    // hiding the toast after the displayDuration property of the configuration
    hide(toastNotification: ToastNotificationConfiguration) {
        this.toasterService.clearOneToastMessage(toastNotification);
    }

}
