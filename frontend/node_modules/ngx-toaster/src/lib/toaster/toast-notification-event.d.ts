import { ToastNotificationConfiguration } from './toast-notification-configuration';
import { NotificationCommand } from './notification-command.enum';
export interface ToastNotificationEvent {
    command: NotificationCommand;
    notification?: ToastNotificationConfiguration;
}
