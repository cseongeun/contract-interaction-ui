import { toast } from 'react-toastify';

export const ToastDuration = 6000;
export const ToastPosition = toast.POSITION.BOTTOM_CENTER;

export interface IToastProperty {
  description: string;
  type?: any;
  position?: any;
}
