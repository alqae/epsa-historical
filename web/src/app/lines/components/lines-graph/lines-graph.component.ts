import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CanvasJS, CanvasJSChart } from '@canvasjs/angular-charts';

import { ApiService, UtilsService } from '@app/shared/services';
import { Line } from '@app/models/Line';

@Component({
  selector: 'app-lines-graph',
  template: `
    <div
      #chartContainer
      class="chart-container"
      [style]="{width: chartWidth, height: chartHeight}"
    ></div>
  `,
})
export class LinesGraphComponent implements AfterViewInit {
  @ViewChild('chartContainer') chartContainer!: ElementRef;
  private chartOptions: CanvasJSChart['options'];
  private lines: Line[] = []

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
      height: 500,
      theme: "dark2",
      animationEnabled: true,
      zoomEnabled:true,
      backgroundColor: "transparent",
      axisY: {
        includeZero: true,
      },
      axisX: {
        lineThickness: 0,
        intervalType: 'day',
        interval: 1,
        labelFontSize: 10,
      },
    };

    this.apiService.getLines().subscribe((lines) => this.lines = lines);
  }

  ngAfterViewInit() {
    this.setupChart();
  }

  setupChart() {
    this.apiService.getCosumptionHistory({ take: 100 }).subscribe((data) => {
      this.chartOptions.data = this.lines.map((line) => ({
        type: 'line',
        showInLegend: true,
        name: line.name,
        dataPoints: data[0]
          .filter((item) => item.lineId == line.id)
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .map((item) => ({
            y: item.cost,
            legendText: line.name,
            label: this.utilsService.formatDate(new Date(item.date)),
          })),
      }));

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
