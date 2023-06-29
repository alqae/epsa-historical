import { Request, Response } from "express"

import { AppDataSource } from "../data-source"
import { ClientType } from "../entity/ClientType"

export const getClientTypes = async (req: Request, res: Response): Promise<Response> => {
  const clientTypes = await AppDataSource.getRepository(ClientType).find()
  return res.json(clientTypes)
}
