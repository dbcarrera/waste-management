import { Injectable, signal } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts = signal<Toast[]>([]);

  show(message: string, type: 'success' | 'error' | 'info' = 'info', duration = 5000) {
    const id = uuidv4();
    const toast: Toast = { id, message, type };

    this.toasts.update((toasts) => [...toasts, toast]);

    setTimeout(() => {
      this.remove(id);
    }, duration);
  }

  success(message: string, duration = 5000) {
    this.show(message, 'success', duration);
  }

  error(message: string, duration = 5000) {
    this.show(message, 'error', duration);
  }

  info(message: string, duration = 5000) {
    this.show(message, 'info', duration);
  }

  remove(id: string) {
    this.toasts.update((toasts) => toasts.filter((toast) => toast.id !== id));
  }
}
