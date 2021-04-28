import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helper/http-helper'
import { httpRequest, HttpResponse } from '../protocols/http'

export class SignUpController {
  handle (httpRequest: httpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
