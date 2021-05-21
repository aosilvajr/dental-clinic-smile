import { InvalidParamError } from '@/presentation/errors'
import { forbidden, serverError } from '@/presentation/helper/http/http-helper'

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
    try {
      const employee = await this.loadEmployeeById.loadById(httpRequest.params.employeeId)
      if (!employee) {
        return forbidden(new InvalidParamError('employeeId'))
      }
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
