import { AccessDeniedError } from '../errors/access-denied-error'
import { forbidden } from '../helper/http/http-helper'
import { httpRequest, HttpResponse, Middleware } from '../protocols'

export class AuthMiddleware implements Middleware {
  async handle (httpRequest: httpRequest): Promise<HttpResponse> {
    return forbidden(new AccessDeniedError())
  }
}
