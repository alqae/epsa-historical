import { Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { Between, FindOneOptions, FindOptionsWhere, LessThan, MoreThan } from "typeorm"

import { ConsumptionHistory } from "../entity/ConsumptionHistory"

export const getConsumptionHistory = async (req: Request, res: Response) => {
  // Pagination
  const take = req.query.take ? parseInt(req.query.take.toString()) : null;
  const page = req.query.page ? parseInt(req.query.page.toString()) : null;
  const skip= page && take ? (page-1) * take : null;
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

  if (take && !page) {
    // Minimize the amount of data sent to the client for graphing
    res.json([
      consumptionHistory[0].sort(() => 0.5 - Math.random()).slice(0, take),
      take,
    ])
  } else {
    res.json(consumptionHistory)
  }
}
