import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { CanvasJSChart, CanvasJS } from '@canvasjs/angular-charts';

import { ApiService, UtilsService } from '@app/shared/services';

@Component({
  selector: 'app-worst-graph',
  template: `
    <div
      #chartContainer
      class="chart-container"
      [style]="{width: chartWidth, height: chartHeight}"
    ></div>
  `,
})
export class WorstGraphComponent implements AfterViewInit, OnChanges {
  @ViewChild('chartContainer') chartContainer!: ElementRef;
  private chartOptions: CanvasJSChart['options'];

  @Input() startDate?: Date | null;
  @Input() endDate?: Date | null;
  @Input() line?: number | null;
  @Input() clientType?: number | null;

  constructor(
    private apiService: ApiService,
    private utilsService: UtilsService,
  ) {
    this.chartOptions = {
      width: 800,
      height: 600,
      theme: "dark2",
      animationEnabled: true,
      zoomEnabled: true,
      backgroundColor: "transparent",
      axisY: {
        includeZero: true,
      },
      axisX: {
        lineThickness: 0,
        intervalType: 'day',
        interval: 1,
        labelFontSize: 10,
        labelFormatter: () => ""
      },
    };
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.setupChart();
  }

  ngAfterViewInit() {
    this.setupChart();
  }

  setupChart() {
    this.apiService.getCosumptionHistory({
      take: 100,
      startDate: this.startDate ? this.utilsService.formatDate(this.startDate) : undefined,
      endDate: this.endDate ? this.utilsService.formatDate(this.endDate) : undefined,
      lineId: this.line ?? undefined,
      clientTypeId: this.clientType ?? undefined,
    }).subscribe((data) => {
      this.chartOptions.data = [
        {
          type: 'stepLine',
          showInLegend: true,
          name: 'Loss',
          dataPoints: data[0].map((item) => ({
            y: item.loss,
            label: this.utilsService.formatDate(new Date(item.date)),
          })),
        }
      ];

      const chartContainer = this.chartContainer.nativeElement;
      const chart = new CanvasJS.Chart(chartContainer, this.chartOptions);
      chart.render();
    })
  }

  get chartWidth() {
    return `${this.chartOptions.width}px`;
  }

  get chartHeight() {
    return `${this.chartOptions.height + 36}px`; // 36px is the height to prevent the chart from being cut off
  }
}

