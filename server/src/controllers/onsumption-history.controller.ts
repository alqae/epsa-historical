import { Request, Response } from "express"
import { Between, FindOneOptions, FindOptionsWhere, LessThan, MoreThan } from "typeorm"

import { ConsumptionHistory } from "../entity/ConsumptionHistory"
import { chunkArray } from "../utils/chunkArray"
import { AppDataSource } from "../data-source"


export const getConsumptionHistory = async (req: Request, res: Response) => {
  // Pagination
  const take = req.query.take &&  req.query.page ? parseInt(req.query.take.toString()) : null
  const page = req.query.page ? parseInt(req.query.page.toString()) : null
  const skip= page && take ? (page-1) * take : null
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
    criteria.lineId = parseInt(lineId.toString())
  }

  if (clientTypeId) {
    criteria.clientTypeId = parseInt(clientTypeId.toString())
  }

  if (orderBy && orderDirection) {
    order[orderBy.toString()] = orderDirection.toString().toUpperCase()
  } else {
    order.date = "DESC"
  }

  const consumptionHistoryRepository = AppDataSource.getRepository(ConsumptionHistory)
  const consumptionHistory = await consumptionHistoryRepository.findAndCount({
    take,
    skip,
    where: criteria,
    order,
  })

  if (req.query.take && !page) {
    // Minimize the amount of data sent to the client for graphing

    res.json([
      chunkArray<ConsumptionHistory>(
        consumptionHistory[0],
        (consumptionHistory[0].length / parseInt(req.query.take.toString()))
      ).map((chunk) => ({
          id: chunk[0].id,
          date: chunk[0].date,
          cost: chunk.reduce((acc, item) => acc + item.cost, 0),
          loss: chunk.reduce((acc, item) => acc + item.loss, 0),
          consumption: chunk.reduce((acc, item) => acc + item.consumption, 0),
          lineId: chunk[0].lineId,
          clientTypeId: chunk[0].clientTypeId,
        })),
      consumptionHistory[1],
    ])
  } else {
    res.json(consumptionHistory)
  }
}
