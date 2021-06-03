import { badRequest, noContent, serverError } from '@/presentation/helper/http/http-helper'

import {
  Controller,
  httpRequest,
  HttpResponse,
  Validation,
  AddEmployee,
  AddEmployeeParams
} from './add-employee-controller-protocols'

export class AddEmployeeController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addEmployee: AddEmployee
  ) { }

  async handle (httpRequest: httpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const {
        name,
        email,
        phone,
        position,
        birthday
      }: AddEmployeeParams = httpRequest.body
      await this.addEmployee.add({
        name,
        email,
        phone,
        position,
        birthday,
        createdAt: new Date()
      })
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
