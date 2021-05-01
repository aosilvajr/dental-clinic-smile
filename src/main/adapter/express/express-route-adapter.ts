import { Request, Response } from 'express'

import { Controller, httpRequest } from '@/presentation/protocols'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: httpRequest = {
      body: req.body
    }
    const httpResponse = await controller
      .handle(httpRequest)

    if (httpResponse.statusCode === 200) {
      res
        .status(httpResponse.statusCode)
        .json(httpResponse.body)
    } else {
      res
        .status(httpResponse.statusCode)
        .json({
          error: httpResponse.body.message
        })
    }
  }
}