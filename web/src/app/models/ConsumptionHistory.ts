export interface ConsumptionHistory {
  id: number;
  clientTypeId: number;
  lineId: number;
  consumption: number;
  loss: number;
  cost: number;
  date: string;
}

export interface ConsumptionHistoryFilters {
  take?: number,
  page?: number,
  startDate?: string,
  endDate?: string,
  clientTypeId?: number,
  lineId?: number,
  orderBy?: string,
  orderDirection?: 'ASC' | 'DESC',
}
