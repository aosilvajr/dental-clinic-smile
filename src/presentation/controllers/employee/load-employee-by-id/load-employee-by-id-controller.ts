import {
  Controller,
  httpRequest,
  HttpResponse,
  LoadEmployeeById
} from './load-employee-by-id-controller-protocols'

export class LoadEmployeeByIdController implements Controller {
  constructor (
    private readonly loadEmployeeById: LoadEmployeeById
  ) { }

  async handle (httpRequest: httpRequest): Promise<HttpResponse> {
    await this.loadEmployeeById.loadById(httpRequest.params.employeeId)
    return null
  }
}
