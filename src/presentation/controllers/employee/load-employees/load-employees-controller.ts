import { ok } from '@/presentation/helper/http/http-helper'

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
    const employees = await this.loadEmployees.load()
    return ok(employees)
  }
}
