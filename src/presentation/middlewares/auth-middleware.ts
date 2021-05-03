import { LoadAccountByToken } from '@/domain/usecases/load-account-token'

import { AccessDeniedError } from '../errors/access-denied-error'
import { forbidden } from '../helper/http/http-helper'
import { httpRequest, HttpResponse, Middleware } from '../protocols'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken
  ) { }

  async handle (httpRequest: httpRequest): Promise<HttpResponse> {
    const token = httpRequest.headers?.['x-access-token']
    if (token) {
      await this.loadAccountByToken.load(token)
    }
    return forbidden(new AccessDeniedError())
  }
}
