import { badRequest, ok, serverError, unauthorized } from '@/presentation/helper/http-helper'
import { Validation } from '@/presentation/helper/validators/validation'

import {
  Controller,
  httpRequest,
  HttpResponse,
  Authentication
} from './login-protocols'

export class LoginController implements Controller {
  constructor (
    private readonly authentication: Authentication,
    private readonly validation: Validation
  ) { }

  async handle (httpRequest: httpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { email, password } = httpRequest.body
      const token = await this.authentication.auth(email, password)
      if (!token) {
        return unauthorized()
      }
      return ok({ token })
    } catch (error) {
      return serverError(error)
    }
  }
}
