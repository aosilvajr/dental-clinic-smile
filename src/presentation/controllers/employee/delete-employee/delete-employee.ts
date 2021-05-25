import { DeleteEmployee } from '@/domain/usecases/employee/delete-employee'
import { serverError } from '@/presentation/helper/http/http-helper'
import { Controller, httpRequest, HttpResponse } from '@/presentation/protocols'

export class DeleteEmployeeController implements Controller {
  constructor (
    private readonly deleteEmployee: DeleteEmployee
  ) { }

  async handle (httpRequest: httpRequest): Promise<HttpResponse> {
    try {
      await this.deleteEmployee.delete(httpRequest.params.employeeId)
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
