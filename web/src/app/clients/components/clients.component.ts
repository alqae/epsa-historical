import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

import { ConsumptionHistory, ConsumptionHistoryFilters } from '@app/models/ConsumptionHistory';
import { ApiService, UtilsService } from '@app/shared/services';
import { ClientType } from '@app/models/ClientType';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
})
export class ClientsComponent {
  public clientTypes: ClientType[] = [];

  public history: ConsumptionHistory[] = [];
  public pageSize = 10;
  public pageIndex = 0;
  public length = 0;

  public isLoading = false;

  filtersForm = new FormGroup({
    clientType: new FormControl<number>(NaN, []),
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

      if (value.startDate) startDate = this.utilsService.formatDate(value.startDate);
      if (value.endDate) endDate = this.utilsService.formatDate(value.endDate);
      if (value.clientType) clientTypeId = value.clientType;

      this.getHistory({ startDate, endDate, clientTypeId })
    });
  }

  ngOnInit() {
    this.apiService.getClientTypes().subscribe((clientTypes) => this.clientTypes = clientTypes);
    this.getHistory();
  }

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getHistory();
  }

  getHistory(values?: ConsumptionHistoryFilters) {
    this.isLoading = true;
    this.apiService.getCosumptionHistory({
        take: this.pageSize,
        page: this.pageIndex + 1,
        startDate: values?.startDate,
        endDate: values?.endDate,
        lineId: values?.lineId,
        clientTypeId: values?.clientTypeId,
    }).subscribe((data) => {
      this.history = data[0];
      this.length = data[1];
      this.isLoading = false;
    });
  }

  clearFilters() {
    this.filtersForm.reset();
  }
}
