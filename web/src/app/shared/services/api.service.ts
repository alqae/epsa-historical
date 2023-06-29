import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

import { ConsumptionHistoryFilters, ConsumptionHistory } from '@app/models/ConsumptionHistory';
import { environment } from '@environments/environment';
import { ClientType } from '@app/models/ClientType';
import { UtilsService } from './utils.service';
import { Line } from '@app/models/Line';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _url: string;

  private lines: Line[] = [];
  private clientTypes: ClientType[] = [];

  constructor(
    private _http: HttpClient,
    private _utilsService: UtilsService,
  ) {
    this._url = environment.apiUrl;
    this.getLines().subscribe((lines) => this.lines = lines);
    this.getClientTypes().subscribe((clientTypes) => this.clientTypes = clientTypes);
  }

  getCosumptionHistory(
    take = 10,
    page = 1,
    {
      startDate,
      endDate,
      lineId,
      clientTypeId,
      orderBy,
      orderDirection,
    }: ConsumptionHistoryFilters
  ): Observable<[ConsumptionHistory[], number]> {
    const params: { [param: string]: string | number } = { take, page };

    if (startDate) {
      params['startDate'] = startDate;
    }

    if (endDate) {
      params['endDate'] = endDate;
    }

    if (lineId) {
      params['lineId'] = lineId;
    }

    if (clientTypeId) {
      params['clientTypeId'] = clientTypeId;
    }

    if (orderBy && orderDirection) {
      params['orderBy'] = orderBy;
      params['orderDirection'] = orderDirection;
    }

    return this._http.get<[ConsumptionHistory[], number]>(`${this._url}consumption-history`, { params })
      .pipe(catchError(this._utilsService.handleErrorHttp));
  }

  getLines(): Observable<Line[]> {
    return this._http.get<Line[]>(`${this._url}lines`)
      .pipe(catchError(this._utilsService.handleErrorHttp));
  }

  getClientTypes(): Observable<ClientType[]> {
    return this._http.get<ClientType[]>(`${this._url}client-types`)
      .pipe(catchError(this._utilsService.handleErrorHttp));
  }

  getLineById(id: number): string {
    return this.lines.find((line) => line.id === id)?.name || "unknown";
  }

  getClientTypeById(id: number): string {
    return this.clientTypes.find((clientType) => clientType.id === id)?.name || "unknown";
  }
}