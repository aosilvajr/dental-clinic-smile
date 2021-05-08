import {
  Controller,
  httpRequest,
  HttpResponse,
  LoadEmployees
} from './load-employees-controller-protocols'

export class LoadEmployeesController implements Controller {
  constructor (
    private readonly loadEmployees: LoadEmployees
  ) { }

  async handle (httpRequest: httpRequest): Promise<HttpResponse> {
    await this.loadEmployees.load()
    return null
  }
}
