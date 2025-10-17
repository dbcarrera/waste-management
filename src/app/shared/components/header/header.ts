import { Component } from '@angular/core';
import { COMPANY_NAME } from '../../../constants/company.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  readonly companyName = COMPANY_NAME;

  constructor(private router: Router) {}

  redirectHome() {
    this.router.navigate(['/']);
  }
}
