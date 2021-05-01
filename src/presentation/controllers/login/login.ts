import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helper/http-helper'
import { Controller, httpRequest, HttpResponse } from '@/presentation/protocols'

export class LoginController implements Controller {
  async handle (httpRequest: httpRequest): Promise<HttpResponse> {
    return badRequest(new MissingParamError('email'))
  }
}
