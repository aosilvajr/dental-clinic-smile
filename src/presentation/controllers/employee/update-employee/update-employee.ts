import { UpdateEmployee } from '@/domain/usecases/employee/update-employee-by-id'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helper/http/http-helper'
import { Controller, httpRequest, HttpResponse } from '@/presentation/protocols'

export class UpdateEmployeeController implements Controller {
  constructor (
    private readonly updateEmployee: UpdateEmployee
  ) { }

  async handle (httpRequest: httpRequest): Promise<HttpResponse> {
    try {
      const employee = await this.updateEmployee.update(httpRequest.params.employeeId)
      if (!employee) {
        return forbidden(new InvalidParamError('employeeId'))
      }
      return ok(employee)
    } catch (error) {
      return serverError(error)
    }
  }
}
