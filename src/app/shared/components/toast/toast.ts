import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast';
import { LucideAngularModule, CircleCheck, CircleX, Info } from 'lucide-angular';

@Component({
  selector: 'app-toast',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast {
  private toastService = inject(ToastService);

  toasts = this.toastService.toasts;

  readonly CircleCheck = CircleCheck;
  readonly CircleX = CircleX;
  readonly Info = Info;

  remove(id: string) {
    this.toastService.remove(id);
  }
}
