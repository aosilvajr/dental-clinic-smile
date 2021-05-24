import { UpdateEmployee } from '@/domain/usecases/employee/update-employee-by-id'
import { Controller, httpRequest, HttpResponse } from '@/presentation/protocols'

export class UpdateEmployeeController implements Controller {
  constructor (
    private readonly updateEmployee: UpdateEmployee
  ) { }

  async handle (httpRequest: httpRequest): Promise<HttpResponse> {
    await this.updateEmployee.update(httpRequest.params.employeeId)
    return null
  }
}
