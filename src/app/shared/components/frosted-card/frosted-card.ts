import { Component, input } from '@angular/core';

@Component({
  selector: 'app-frosted-card',
  imports: [],
  templateUrl: './frosted-card.html',
  styleUrl: './frosted-card.css',
})
export class FrostedCard {
  class = input<string>('');
}
