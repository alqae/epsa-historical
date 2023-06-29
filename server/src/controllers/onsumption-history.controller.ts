import { Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { Between, FindOptionsWhere, LessThan, MoreThan } from "typeorm"

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

  const consumptionHistoryRepository = AppDataSource.getRepository(ConsumptionHistory)
  const consumptionHistory = await consumptionHistoryRepository.findAndCount({
    take,
    skip,
    where: criteria,
    order: {
      lineId: "ASC",
    }
  })

  res.json(consumptionHistory)
}
