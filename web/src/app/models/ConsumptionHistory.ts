export interface ConsumptionHistory {
  id: number;
  clientId: number;
  lineId: number;
  consumption: number;
  loss: number;
  cost: number;
  date: string;
}

export interface ConsumptionHistoryFilters {
  startDate?: string,
  endDate?: string,
  lineId?: number,
}
