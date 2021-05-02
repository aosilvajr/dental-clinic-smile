import { EmailAlreadyExists } from '@/presentation/errors'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helper/http/http-helper'
import { Validation } from '@/presentation/protocols/validation'

import {
  AddAccount,
  httpRequest,
  HttpResponse,
  Controller,
  Authentication
} from './signup-controller-protocols'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) { }

  async handle (httpRequest: httpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, email, password } = httpRequest.body
      const account = await this.addAccount.add({
        name,
        email,
        password
      })
      if (!account) {
        return forbidden(new EmailAlreadyExists())
      }
      const token = await this.authentication.auth({
        email,
        password
      })
      return ok({ token })
    } catch (error) {
      return serverError(error)
    }
  }
}
