import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  text = input<string>('');
  type = input<'primary' | 'secondary'>('primary');
  disabled = input<boolean>(false);
  click = output<void>();

  onClick() {
    if (!this.disabled) {
      this.click.emit();
    }
  }
}
