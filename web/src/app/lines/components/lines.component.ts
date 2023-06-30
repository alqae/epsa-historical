import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

import { ConsumptionHistory, ConsumptionHistoryFilters } from '@app/models/ConsumptionHistory';
import { ApiService, UtilsService } from '@app/shared/services';
import { Line } from '@app/models/Line';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  templateUrl: './lines.component.html',
})
export class LinesComponent implements OnInit {
  public lines: Line[] = [];

  public pageSize = 10;
  public pageIndex = 0;
  public history: ConsumptionHistory[] = [];
  public length = 0;

  public isLoading = false;

  filtersForm = new FormGroup({
    line: new FormControl<number>(NaN, []),
    startDate: new FormControl<Date | null>(null, []),
    endDate: new FormControl<Date | null>(null, []),
  });

  constructor(
    private apiService: ApiService,
    private utilsService: UtilsService,
  ) {
    this.filtersForm.valueChanges.subscribe((value) => {
      let startDate;
      let endDate;
      let lineId;

      if (value.startDate) startDate = this.utilsService.formatDate(value.startDate);
      if (value.endDate) endDate = this.utilsService.formatDate(value.endDate);
      if (value.line) lineId = value.line;

      this.getHistory({ startDate, endDate, lineId })
    });
  }

  ngOnInit() {
    this.apiService.getLines().subscribe((lines) => this.lines = lines);
    this.getHistory();
  }

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getHistory();
  }

  getHistory(values?: ConsumptionHistoryFilters) {
    this.isLoading = true;
    this.apiService.getCosumptionHistory(
      {
        take: this.pageSize,
        page: this.pageIndex + 1,
        startDate: values?.startDate,
        endDate: values?.endDate,
        lineId: values?.lineId,
        orderBy: 'date',
        orderDirection: values?.startDate ? 'ASC' : 'DESC',
      }
    ).subscribe((data) => {
      this.history = data[0];
      this.length = data[1];
      this.isLoading = false;
    });
  }

  clearFilters() {
    this.filtersForm.reset();
  }
}
