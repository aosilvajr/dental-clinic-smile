import { Controller, httpRequest, HttpResponse, Validation } from '@/presentation/protocols'

export class AddPatientController implements Controller {
  constructor (
    private readonly validation: Validation
  ) { }

  async handle (httpRequest: httpRequest): Promise<HttpResponse> {
    this.validation.validate(httpRequest.body)
    return null
  }
}
