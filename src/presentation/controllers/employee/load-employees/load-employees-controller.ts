import { ok, serverError } from '@/presentation/helper/http/http-helper'

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
    try {
      const employees = await this.loadEmployees.load()
      return ok(employees)
    } catch (error) {
      return serverError(error)
    }
  }
}
