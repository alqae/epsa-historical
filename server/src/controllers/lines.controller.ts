import { Request, Response } from "express"

import { AppDataSource } from "../data-source"
import { Line } from "../entity/Line"

export const getLines = async (req: Request, res: Response) => {
  const linesRepository = AppDataSource.getRepository(Line)
  const lines = await linesRepository.find()
  res.json(lines)
}
