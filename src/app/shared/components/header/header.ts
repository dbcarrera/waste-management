import { Component, inject } from '@angular/core';
import { COMPANY_NAME } from '../../../constants/company.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private router = inject(Router);
  readonly companyName = COMPANY_NAME;

  redirectHome() {
    this.router.navigate(['/']);
  }
}
