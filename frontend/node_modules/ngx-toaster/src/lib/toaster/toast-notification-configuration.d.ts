import { ToastType } from './toast-type.enum';
export interface ToastNotificationConfiguration {
    id?: string;
    message?: string;
    displayDuration?: number;
    autoHide?: boolean;
    showCloseButton?: boolean;
    toastType?: ToastType;
}
