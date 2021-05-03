import { badRequest } from '@/presentation/helper/http/http-helper'

import {
  Controller,
  httpRequest,
  HttpResponse,
  Validation,
  AddEmployee
} from './add-employee-controller-protocols'

export class AddEmployeeController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addEmployee: AddEmployee
  ) { }

  async handle (httpRequest: httpRequest): Promise<HttpResponse> {
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
    } = httpRequest.body
    await this.addEmployee.add({
      name,
      email,
      phone,
      position,
      birthday
    })
    return null
  }
}
