import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CanvasJS, CanvasJSChart } from '@canvasjs/angular-charts';

import { ApiService, UtilsService } from '@app/shared/services';
import { ClientType } from '@app/models/ClientType';

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
export class ClientsGraphComponent implements AfterViewInit {
  @ViewChild('chartContainer') chartContainer!: ElementRef;
  private chartOptions: CanvasJSChart['options'];
  private clientTypes: ClientType[] = [];

  constructor(
    private apiService: ApiService,
    private utilsService: UtilsService,
  ) {
    this.chartOptions = {
      width: 800,
      height: 500,
      theme: "dark2",
      animationEnabled: true,
      zoomEnabled:true,
      backgroundColor: "transparent",
      axisY: {
        includeZero: true,
        labelFormatter: (e: { value: number }): string => {
          return Number.isInteger(e.value) && e.value > 0 ? this.apiService.getClientTypeById(e.value) : '';
        }
      },
      toolTip: {
        contentFormatter: (e: { entries: { dataPoint: { label: string; legendText: string; }; }[]; }) => {
          return `${e.entries[0].dataPoint.label} - ${e.entries[0].dataPoint.legendText}`;
        }
      },
      axisX: {
        lineThickness: 0,
        intervalType: 'day',
        interval: 1,
        labelFontSize: 10,
        labelAngle: -45,
      },
    };

    this.apiService.getClientTypes().subscribe((clientTypes) => this.clientTypes = clientTypes);
  }

  ngAfterViewInit() {
    this.apiService.getCosumptionHistory({ take: 100 }).subscribe((data) => {
      this.chartOptions.data = this.clientTypes.map((clientType) => ({
        name: clientType.name,
        legendText: clientType.name,
        type: "area",
        showInLegend: true,
        dataPoints: data[0]
          .filter((item) => item.clientTypeId == clientType.id)
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .map((item) => ({
            y: item.clientTypeId,
            legendText: this.apiService.getClientTypeById(item.clientTypeId),
            label: this.utilsService.formatDate(new Date(item.date)),
          })),
      }));

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
