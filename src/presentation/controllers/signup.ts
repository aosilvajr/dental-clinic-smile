import { InvalidParamError, MissingParamError } from '../errors'
import { badRequest, serverError } from '../helper/http-helper'
import { httpRequest, HttpResponse, EmailValidator, Controller } from '../protocols'

export class SignUpController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator
  ) { }

  handle (httpRequest: httpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { email, password, passwordConfirmation } = httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('password confirmation'))
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (error) {
      return serverError()
    }
  }
}
