import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helper/http-helper'
import { Controller, httpRequest, HttpResponse } from '@/presentation/protocols'
import { EmailValidator } from '@/presentation/protocols/email-validator'

export class LoginController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator
  ) { }

  async handle (httpRequest: httpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError('email'))
    }

    if (!httpRequest.body.password) {
      return badRequest(new MissingParamError('password'))
    }

    this.emailValidator.isValid(httpRequest.body.email)
  }
}
