import { toast } from 'react-toastify';

export const ToastDuration = 6000;
export const ToastPosition = toast.POSITION.TOP_RIGHT;

export interface IToastProperty {
  description: string;
  type?: any;
}
