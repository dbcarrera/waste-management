import { Injectable } from '@angular/core';
import { StatisticsReport } from '../../../core/models/statistics-report.model';


@Injectable({ providedIn: 'root' })
export class ReportsService {
getReport(): StatisticsReport {
return {
created: new Date().toISOString(),
pickupsByType: { paper: 20, glass: 10, organic: 15, plastic: 25 },
issuesByType: { 'missed pickup': 4, bug: 2, other: 3 }
};
}
}
