import {
  Controller,
  httpRequest,
  HttpResponse,
  Validation
} from './add-employee-controller-protocols'

export class AddEmployeeController implements Controller {
  constructor (
    private readonly validation: Validation
  ) { }

  async handle (httpRequest: httpRequest): Promise<HttpResponse> {
    this.validation.validate(httpRequest.body)
    return Promise.resolve(null)
  }
}
