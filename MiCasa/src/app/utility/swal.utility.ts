import { getSweetAlert } from './js-libraries';

var Swal = getSweetAlert();

export const fireError = (
  title: string,
  message?: string,
  showCloseButton: boolean = false
) => {
  Swal.fire({
    title: title,
    icon: 'error',
    html: message,
  });
};

export const fireSuccess = (
  title: string,
  message?: string,
  showCloseButton: boolean = false
) => {
  Swal.fire({
    title: title,
    icon: 'success',
    html: message,
  });
};

export const fireWarning = (
  title: string,
  message?: string,
  showCloseButton: boolean = false
) => {
  Swal.fire({
    title: title,
    icon: 'warning',
    html: message,
  });
};

export const fireInfo = (
  title: string,
  message?: string,
  showCloseButton: boolean = false
) => {
  Swal.fire({
    title: title,
    icon: 'info',
    html: message,
  });
};
