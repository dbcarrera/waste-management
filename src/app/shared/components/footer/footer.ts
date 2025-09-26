import { Component } from '@angular/core';
import { COMPANY_NAME } from '../../../constants/company.constants';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  currentYear = new Date().getFullYear();
  readonly companyName = COMPANY_NAME;
}
