import { ToastNotificationEvent } from './toast-notification-event';
import { Subject } from 'rxjs/Subject';
import { ToastNotificationConfiguration } from './toast-notification-configuration';
export declare class ToasterService {
    private emitter;
    showToastMessage(toastMessageConfig: ToastNotificationConfiguration): void;
    clearOneToastMessage(toastMessageConfig: ToastNotificationConfiguration): void;
    clearAllToastMessages(): void;
    getEmitter(): Subject<ToastNotificationEvent>;
}
