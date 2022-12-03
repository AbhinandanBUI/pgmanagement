import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  Toast: any;
  constructor() {
    this.Toast = Swal.mixin({
      toast: true,
      position: 'top-right',
      iconColor: 'white',
      customClass: {
        popup: 'colored-toast'
      },
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true
    })
  }

  success(title: string) {
    this.Toast.fire({
      icon: 'success',
      title: title
    })
  }

  error(title: string) {
    this.Toast.fire({
      icon: 'error',
      title: title
    })
  }

  warning(title: string) {
    this.Toast.fire({
      icon: 'warning',
      title: title
    })
  }

  info(title: string) {
    this.Toast.fire({
      icon: 'info',
      title: title
    })
  }
}
