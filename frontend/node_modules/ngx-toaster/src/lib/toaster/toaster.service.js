"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
var lodash_1 = require("lodash");
var notification_command_enum_1 = require("./notification-command.enum");
var ToasterService = (function () {
    function ToasterService() {
        this.emitter = new Subject_1.Subject();
    }
    // to trigger the toast notifiaction
    ToasterService.prototype.showToastMessage = function (toastMessageConfig) {
        var clonedToastMessageConfiguration = lodash_1.cloneDeep(toastMessageConfig);
        clonedToastMessageConfiguration.id = Math.random().toString(36).substring(3);
        this.emitter.next({ command: notification_command_enum_1.NotificationCommand.SET, notification: clonedToastMessageConfiguration });
    };
    // to close out the toast notification and clear the notifications array
    ToasterService.prototype.clearOneToastMessage = function (toastMessageConfig) {
        this.emitter.next({ command: notification_command_enum_1.NotificationCommand.CLEAR, notification: toastMessageConfig });
    };
    // closes all the toast messages
    ToasterService.prototype.clearAllToastMessages = function () {
        this.emitter.next({ command: notification_command_enum_1.NotificationCommand.CLEAR_ALL });
    };
    // shares the Subject emitter
    ToasterService.prototype.getEmitter = function () {
        return this.emitter;
    };
    ToasterService = __decorate([
        core_1.Injectable()
    ], ToasterService);
    return ToasterService;
}());
exports.ToasterService = ToasterService;
//# sourceMappingURL=toaster.service.js.map