import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { CanvasJS, CanvasJSChart } from '@canvasjs/angular-charts';

import { ApiService, UtilsService } from '@app/shared/services';
import { ClientType } from '@app/models/ClientType';
import { Line } from '@app/models/Line';

@Component({
  selector: 'app-clients-graph',
  template: `
    <div
      #chartContainer
      class="chart-container"
      [style]="{width: chartWidth, height: chartHeight}"
    ></div>
  `,
})
export class ClientsGraphComponent implements AfterViewInit, OnChanges {
  @ViewChild('chartContainer') chartContainer!: ElementRef;
  private chartOptions: CanvasJSChart['options'];
  private clientTypes: ClientType[] = [];
  private lines: Line[] = [];

  @Input() startDate?: Date | null;
  @Input() endDate?: Date | null;

  constructor(
    private apiService: ApiService,
    private utilsService: UtilsService,
  ) {
    this.chartOptions = {
      width: 800,
      height: 500,
      theme: 'dark2',
      animationEnabled: true,
      zoomEnabled: true,
      backgroundColor: 'transparent',
      axisY: {
        includeZero: true,
        // labelFormatter: (e: { value: number }): string => {
        //   return this.apiService.getClientTypeById(e.value);
        // },
        // maximum: 100
      },
      toolTip: {
        contentFormatter: (e: { entries: { dataPoint: { label: string; legendText: string; }; }[]; }) => {
          return `${e.entries[0].dataPoint.label} - ${e.entries[0].dataPoint.legendText}`;
        }
      },
    };

    this.apiService.getLines().subscribe((lines) => this.lines = lines);
    this.apiService.getClientTypes().subscribe((clientTypes) => this.clientTypes = clientTypes);
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
    }).subscribe((data) => {
      this.chartOptions.data = [
        {
        name: 'Total clients',
        legendText: 'Total clients',
        type: 'pie',
        showInLegend: false,
        dataPoints: this.clientTypes.map((clientType) => {
          const count = data[0]
            .filter((item) => item.clientTypeId == clientType.id)
            .length;

            return {
            y: count,
            legendText: `${count}%`,
            label: this.apiService.getClientTypeById(clientType.id),
            color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
          }
        }),
      }]

      const chartContainer = this.chartContainer.nativeElement;
      const chart = new CanvasJS.Chart(chartContainer, this.chartOptions);
      chart.render();
    });
  }

  get chartWidth() {
    return `${this.chartOptions.width}px`;
  }

  get chartHeight() {
    return `${this.chartOptions.height + 36}px`; // 36px is the height to prevent the chart from being cut off
  }
}
