"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var toaster_service_1 = require("./toaster.service");
var lodash_1 = require("lodash");
var notification_command_enum_1 = require("./notification-command.enum");
var ToasterComponent = (function () {
    function ToasterComponent(toasterService) {
        this.toasterService = toasterService;
        this.arrayOfNotifications = [];
        // emit event for sending tne deletion info to parent toast-notifications
        this.onDestroy = new core_1.EventEmitter();
    }
    ToasterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.toasterService.getEmitter().subscribe(function (notificationEvent) {
            if (notificationEvent.command === notification_command_enum_1.NotificationCommand.SET) {
                if (notificationEvent.notification.autoHide) {
                    // if the autoHide property is set to true clearOneToastMessage automatically based on the displayDuration
                    setTimeout(function () {
                        _this.toasterService.clearOneToastMessage(notificationEvent.notification);
                    }, notificationEvent.notification.displayDuration);
                }
                // pushing each notification into array
                _this.arrayOfNotifications.push(notificationEvent.notification);
            }
            else if (notificationEvent.command === notification_command_enum_1.NotificationCommand.CLEAR) {
                _this.onDestroy.emit(notificationEvent.notification);
                lodash_1.remove(_this.arrayOfNotifications, _this.arrayOfNotifications.find(function (not) { return not === notificationEvent.notification; }));
                // this.arrayOfNotifications.splice(this.arrayOfNotifications.find(notificationEvent.notification, 1);
            }
            else if (notificationEvent.command === notification_command_enum_1.NotificationCommand.CLEAR_ALL) {
                _this.arrayOfNotifications = [];
            }
        });
    };
    // hiding the toast after the displayDuration property of the configuration
    ToasterComponent.prototype.hide = function (toastNotification) {
        this.toasterService.clearOneToastMessage(toastNotification);
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ToasterComponent.prototype, "onDestroy", void 0);
    ToasterComponent = __decorate([
        core_1.Component({
            selector: 'ngx-toast-notification',
            template: "\n        <div *ngFor =\"let toastNotification of arrayOfNotifications\">\n        <ng-container *ngIf=\"toastNotification\">\n            <div [@scaleInOut]=\"animation\"\n                 id=\"overlay\">\n                <div [id]=\"toastNotification.id\" class=\"alert alert-{{toastNotification?.toastType}}\" role=\"alert\">\n                    <i class=\"fa message-icon\" [ngClass]=\"{'fa-times-circle': toastNotification?.toastType === 'danger',\n                    'fa-exclamation-triangle': toastNotification?.toastType === 'warning',\n                    'fa-info-circle': toastNotification?.toastType === 'info',\n                    'fa-check-circle': toastNotification?.toastType === 'success'}\">\n                    </i>\n                    <button *ngIf=\"toastNotification?.showCloseButton\"\n                            class=\"close\" aria-label=\"Close\" (click)=\"hide(toastNotification)\">\n                        <span class=\"fa fa-times\" aria-hidden=\"true\"></span>\n                    </button>\n                    <div class=\"inline message-block\" [innerHTML]=\"toastNotification?.message\"></div>\n                </div>\n            </div>\n        </ng-container>\n        </div>",
            animations: [
                core_1.trigger('scaleInOut', [
                    core_1.state('scale', core_1.style({ opacity: 1, transform: 'scale(1)' })),
                    core_1.transition('* => scale', [
                        core_1.style({ opacity: 0, transform: 'scale(0)' }),
                        core_1.animate('300ms ease-in-out')
                    ]),
                    core_1.state('scaleOut', core_1.style({ opacity: 0, transform: 'scale(0)' })),
                    core_1.transition('scale => scaleOut', [
                        core_1.style({ opacity: 1, transform: 'scale(1)' }),
                        core_1.animate('300ms ease-in-out')
                    ])
                ])
            ],
            styles: ["\n            toast-notifications {\n                    position: fixed;\n                    z-index: 1000;\n                    top: 80px;\n                    left: 0;\n                    right: 0;\n                    // Set the width and center it\n                    margin-right: auto;\n                    margin-left: auto;\n                    width: 360px;\n                    ngx-toast-notification {\n                        #overlay {\n                            width: 100%;\n                            margin-bottom: 10px;\n                            .alert {\n                                // override bootstrap\n                                margin-bottom: 0;\n                                position: relative;\n                                box-shadow: 0 3px 9px rgba(0, 0, 0, .5); // copied to match bootstrap's modals (modals.less)\n                                .progress {\n                                    position: absolute;\n                                    top: -1px;\n                                    left: 2px; // accounts for rounded corners\n                                    right: 2px;\n                                    height: 2px;\n                                    margin-bottom: 0;\n                                }\n                            }\n                            .inline {\n                                display: inline-block;\n                            }\n                        }\n                    }\n                }\n        "]
        }),
        __metadata("design:paramtypes", [toaster_service_1.ToasterService])
    ], ToasterComponent);
    return ToasterComponent;
}());
exports.ToasterComponent = ToasterComponent;
//# sourceMappingURL=toaster.component.js.map