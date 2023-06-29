import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { ConsumptionHistory, ConsumptionHistoryFilters } from '@app/models/ConsumptionHistory';
import { ApiService, UtilsService } from '@app/shared/services';
import { ClientType } from '@app/models/ClientType';
import { Line } from '@app/models/Line';

@Component({
  selector: 'app-worst',
  templateUrl: './worst.component.html',
  styleUrls: ['./worst.component.scss']
})
export class WorstComponent {
  public displayedColumns: string[] = ['id', 'clientTypeId', 'lineId', 'loss', /*'cost',*/ 'date'];
  public dataSource = new MatTableDataSource<ConsumptionHistory>([]);
  public clientTypes: ClientType[] = [];
  public lines: Line[] = [];

  public pageSize = 10;
  public pageSizeOptions = [5, 10, 25, 100];
  public pageIndex = 0;
  public length = 0;

  public isLoading = false;

  filtersForm = new FormGroup({
    clientType: new FormControl<number>(NaN, []),
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
      let clientTypeId;
      let lineId;
      if (value.startDate) startDate = this.utilsService.formatDate(value.startDate);
      if (value.endDate) endDate = this.utilsService.formatDate(value.endDate);
      if (value.clientType) clientTypeId = value.clientType;
      if (value.line) lineId = value.line;
      // debugger;
      this.getHistory({ startDate, endDate, clientTypeId, lineId })
    });
  }

  ngOnInit() {
    this.apiService.getClientTypes().subscribe((clientTypes) => this.clientTypes = clientTypes);
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
      this.pageSize,
      this.pageIndex + 1,
      {
        startDate: values?.startDate,
        endDate: values?.endDate,
        lineId: values?.lineId,
        clientTypeId: values?.clientTypeId,
        orderBy: 'loss',
        orderDirection: 'DESC',
      }
    ).subscribe((data) => {
        this.dataSource.data = data[0];
        this.length = data[1];
        this.isLoading = false;
      })
  }
}
