import { Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { Between, FindOneOptions, FindOptionsWhere, LessThan, MoreThan } from "typeorm"

import { ConsumptionHistory } from "../entity/ConsumptionHistory"

export const getConsumptionHistory = async (req: Request, res: Response) => {
  // Pagination
  const take = parseInt(req.query.take.toString()) || 10
  const page = parseInt(req.query.page.toString()) || 0
  const skip= (page-1) * take 
  // Filters
  const criteria: FindOptionsWhere<ConsumptionHistory> = {}
  const startDate = req.query.startDate
  const endDate = req.query.endDate
  const lineId = req.query.lineId
  const clientTypeId = req.query.clientTypeId
  const order: FindOneOptions<ConsumptionHistory>['order'] = {}
  const orderBy = req.query.orderBy
  const orderDirection = req.query.orderDirection

  if (startDate && !endDate) {
    criteria.date = MoreThan(startDate.toString())
  } else if (!startDate && endDate) {
    criteria.date = LessThan(endDate.toString())
  } else if (startDate && endDate) {
    criteria.date = Between(startDate.toString(), endDate.toString())
  }

  if (lineId) {
    criteria.lineId = parseInt(lineId.toString());
  }

  if (clientTypeId) {
    criteria.clientTypeId = parseInt(clientTypeId.toString());
  }

  if (orderBy && orderDirection) {
    order[orderBy.toString()] = orderDirection.toString().toUpperCase()
  } else {
    order.date = 'DESC'
  }

  const consumptionHistoryRepository = AppDataSource.getRepository(ConsumptionHistory)
  const consumptionHistory = await consumptionHistoryRepository.findAndCount({
    take,
    skip,
    where: criteria,
    order,
  })

  res.json(consumptionHistory)
}
