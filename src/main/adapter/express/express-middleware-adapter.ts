import { NextFunction, Request, Response } from 'express'

import { Controller, httpRequest } from '@/presentation/protocols'

export const adaptMiddleware = (controller: Controller) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: httpRequest = {
      headers: req.headers
    }
    const httpResponse = await controller
      .handle(httpRequest)

    if (httpResponse.statusCode === 200) {
      Object.assign(req, httpResponse.body)
      return next()
    } else {
      return res
        .status(httpResponse.statusCode)
        .json({ error: httpResponse.body.message })
    }
  }
}
