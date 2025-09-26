import { Component } from '@angular/core';
import { COMPANY_NAME } from '../../../constants/company.constants';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  readonly companyName = COMPANY_NAME;
}
