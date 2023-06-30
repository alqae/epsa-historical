import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { ConsumptionHistory } from '@app/models/ConsumptionHistory';
import { Line } from '@app/models/Line';

@Component({
  selector: 'app-history-table',
  templateUrl: './history-table.component.html',
  styleUrls: ['./history-table.component.scss']
})
export class HistoryTableComponent {
  @Output() onChangePaginator = new EventEmitter<PageEvent>();

  public displayedColumns: string[] = ['id', 'clientTypeId', 'lineId', 'loss', 'cost', 'date'];
  public dataSource = new MatTableDataSource<ConsumptionHistory>([]);
  public lines: Line[] = [];

  public pageSize = 10;
  public pageSizeOptions = [5, 10, 25, 100];
  public pageIndex = 0;
  public length = 0;

  @Input() total = 0;
  @Input() data: ConsumptionHistory[] = [];

  ngOnInit() {
    this.length = this.total;
    this.dataSource.data = this.data;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.dataSource.data = changes['data'].currentValue;
    this.length = this.total;
  }

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.onChangePaginator.emit(event);
  }
}
