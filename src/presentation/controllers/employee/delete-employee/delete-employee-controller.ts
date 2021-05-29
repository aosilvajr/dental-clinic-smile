import { noContent, serverError } from '@/presentation/helper/http/http-helper'

import { Controller, httpRequest, HttpResponse, DeleteEmployee } from './delete-employee-controller-protocols'

export class DeleteEmployeeController implements Controller {
  constructor (
    private readonly deleteEmployee: DeleteEmployee
  ) { }

  async handle (httpRequest: httpRequest): Promise<HttpResponse> {
    try {
      await this.deleteEmployee.delete(httpRequest.params.employeeId)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
