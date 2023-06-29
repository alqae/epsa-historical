import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ConsumptionHistory, ConsumptionHistoryFilters } from '@app/models/ConsumptionHistory';
import { environment } from '@environments/environment';
import { Line } from '@app/models/Line';

@Injectable({
  providedIn: 'root'
})
export class LinesService {
  private _url: string;

  constructor(private _http: HttpClient) {
    this._url = environment.apiUrl;
  }

  getCosumptionHistory(
    take = 10,
    page = 1,
    {
      startDate,
      endDate,
      lineId
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

    return this._http.get<[ConsumptionHistory[], number]>(`${this._url}consumption-history`, { params });
  }

  getLines(): Observable<Line[]> {
    return this._http.get<Line[]>(`${this._url}lines`);
  }
}
