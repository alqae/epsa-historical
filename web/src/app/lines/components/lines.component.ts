import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, finalize } from 'rxjs';

import { LinesService } from '../services/lines.service';
import { ConsumptionHistory, ConsumptionHistoryFilters } from '@app/models/ConsumptionHistory';
import { Line } from '@app/models/Line';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  templateUrl: './lines.component.html',
  styleUrls: ['./lines.component.scss']
})
export class LinesComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'clientId', 'lineId', 'loss', 'cost', 'date'];
  public dataSource = new MatTableDataSource<ConsumptionHistory>([]);
  public lines: Line[] = [];

  public pageSize = 10;
  public pageSizeOptions = [5, 10, 25, 100];
  public pageIndex = 0;
  public length = 0;

  public isLoading = false;

  filtersForm = new FormGroup({
    line: new FormControl<number>(NaN, []),
    startDate: new FormControl<Date | null>(null, []),
    endDate: new FormControl<Date | null>(null, []),
    groupByLine: new FormControl(false, []),
    stadistics: new FormControl(false, []),
  });

  constructor(private linesService: LinesService) {
    this.filtersForm.valueChanges.subscribe((value) => {
      let startDate;
      let endDate;
      let lineId;

      if (value.startDate) startDate = this.formatDate(value.startDate);
      if (value.endDate) endDate = this.formatDate(value.endDate);
      if (value.line) lineId = value.line;

      this.getHistory({ startDate, endDate, lineId })
    });
  }

  ngOnInit() {
    this.linesService.getLines().subscribe((lines) => this.lines = lines);
    this.getHistory();
  }

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getHistory();
  }

  getHistory(values?: ConsumptionHistoryFilters) {
    this.isLoading = true;
    this.linesService.getCosumptionHistory(
      this.pageSize,
      this.pageIndex + 1,
      {
        startDate: values?.startDate,
        endDate: values?.endDate,
        lineId: values?.lineId,
      }
    ).subscribe((data) => {
        this.dataSource.data = data[0];
        this.length = data[1];
        this.isLoading = false;
      })
  }

  formatDate(value: Date): string {
    return `${value.getFullYear()}-${value.getMonth()}-${value.getDay()}`;
  }
}
