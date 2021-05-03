import { LoadAccountByToken } from '@/domain/usecases/load-account-token'

import { AccessDeniedError } from '../errors/access-denied-error'
import { forbidden, ok, serverError } from '../helper/http/http-helper'
import { httpRequest, HttpResponse, Middleware } from '../protocols'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken
  ) { }

  async handle (httpRequest: httpRequest): Promise<HttpResponse> {
    try {
      const token = httpRequest.headers?.['x-access-token']
      if (token) {
        const account = await this.loadAccountByToken.load(token)
        if (account) {
          return ok({ accountId: account.id })
        }
      }
      return forbidden(new AccessDeniedError())
    } catch (error) {
      return serverError(error)
    }
  }
}
