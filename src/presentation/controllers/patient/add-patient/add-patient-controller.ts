import { badRequest } from '@/presentation/helper/http/http-helper'
import { Controller, httpRequest, HttpResponse, Validation } from '@/presentation/protocols'

export class AddPatientController implements Controller {
  constructor (
    private readonly validation: Validation
  ) { }

  async handle (httpRequest: httpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) {
      return badRequest(error)
    }
    return null
  }
}
