import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsReport } from '../../../../core/models/statistics-report';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { LucideAngularModule, X } from 'lucide-angular';

Chart.register(...registerables);

@Component({
  selector: 'app-charts',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './charts.html',
  styleUrl: './charts.css',
})
export class Charts implements OnInit, OnDestroy {
  @Input() report: StatisticsReport | null = null;
  @Output() close = new EventEmitter<void>();

  @ViewChild('pickupsChart') pickupsChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('issuesChart') issuesChartRef!: ElementRef<HTMLCanvasElement>;

  readonly X = X;

  private pickupsChart: Chart | null = null;
  private issuesChart: Chart | null = null;

  ngOnInit(): void {
    // Delay chart creation to ensure canvas elements are rendered
    setTimeout(() => {
      if (this.report) {
        this.createCharts();
      }
    }, 0);
  }

  ngOnDestroy(): void {
    this.destroyCharts();
  }

  private createCharts(): void {
    if (!this.report) return;

    this.createPickupsChart();
    this.createIssuesChart();
  }

  private createPickupsChart(): void {
    if (!this.report || !this.pickupsChartRef) return;

    const ctx = this.pickupsChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    const pickupData = this.report.pickupsByType;

    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: ['Paper', 'Glass', 'Organic', 'Plastic'],
        datasets: [
          {
            label: 'Pickups by Type',
            data: [pickupData.paper, pickupData.glass, pickupData.organic, pickupData.plastic],
            backgroundColor: [
              'rgba(59, 130, 246, 0.8)',
              'rgba(34, 197, 94, 0.8)',
              'rgba(168, 85, 247, 0.8)',
              'rgba(234, 179, 8, 0.8)',
            ],
            borderColor: [
              'rgb(59, 130, 246)',
              'rgb(34, 197, 94)',
              'rgb(168, 85, 247)',
              'rgb(234, 179, 8)',
            ],
            borderWidth: 2,
            borderRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Pickups by Waste Type',
            font: {
              size: 18,
              weight: 'bold',
            },
            color: '#1f2937',
            padding: 20,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              color: '#6b7280',
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.05)',
            },
          },
          x: {
            ticks: {
              color: '#6b7280',
              font: {
                weight: 'bold',
              },
            },
            grid: {
              display: false,
            },
          },
        },
      },
    };

    this.pickupsChart = new Chart(ctx, config);
  }

  private createIssuesChart(): void {
    if (!this.report || !this.issuesChartRef) return;

    const ctx = this.issuesChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    const issueData = this.report.issuesByType;

    const config: ChartConfiguration = {
      type: 'doughnut',
      data: {
        labels: ['Missed Pickup', 'Bug', 'Other'],
        datasets: [
          {
            label: 'Issues by Type',
            data: [issueData['missed pickup'], issueData.bug, issueData.other],
            backgroundColor: [
              'rgba(239, 68, 68, 0.8)',
              'rgba(249, 115, 22, 0.8)',
              'rgba(107, 114, 128, 0.8)',
            ],
            borderColor: ['rgb(239, 68, 68)', 'rgb(249, 115, 22)', 'rgb(107, 114, 128)'],
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 15,
              font: {
                size: 13,
                weight: 500,
              },
              color: '#4b5563',
              usePointStyle: true,
              pointStyle: 'circle',
            },
          },
          title: {
            display: true,
            text: 'Issues by Type',
            font: {
              size: 18,
              weight: 'bold',
            },
            color: '#1f2937',
            padding: 20,
          },
        },
      },
    };

    this.issuesChart = new Chart(ctx, config);
  }

  private destroyCharts(): void {
    if (this.pickupsChart) {
      this.pickupsChart.destroy();
      this.pickupsChart = null;
    }
    if (this.issuesChart) {
      this.issuesChart.destroy();
      this.issuesChart = null;
    }
  }

  onClose(): void {
    this.close.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    // Close only if clicking the backdrop itself, not its children
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }

  getTotalPickups(): number {
    if (!this.report) return 0;
    const pickups = this.report.pickupsByType;
    return pickups.paper + pickups.glass + pickups.organic + pickups.plastic;
  }

  getTotalIssues(): number {
    if (!this.report) return 0;
    const issues = this.report.issuesByType;
    return issues['missed pickup'] + issues.bug + issues.other;
  }

  getReportDate(): string {
    if (!this.report) return '';
    return new Date(this.report.created).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  getPickupCount(type: 'paper' | 'glass' | 'organic' | 'plastic'): number {
    return this.report?.pickupsByType[type] ?? 0;
  }

  getIssueCount(type: 'missed pickup' | 'bug' | 'other'): number {
    return this.report?.issuesByType[type] ?? 0;
  }
}
