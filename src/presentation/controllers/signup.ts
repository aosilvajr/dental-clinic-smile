import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helper/http-helper'
import { Controller } from '../protocols/controller'
import { httpRequest, HttpResponse } from '../protocols/http'

export class SignUpController implements Controller {
  handle (httpRequest: httpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
