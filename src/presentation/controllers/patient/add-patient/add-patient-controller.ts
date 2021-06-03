import { AddPatient } from '@/domain/usecases/patient/add-patient'
import { badRequest } from '@/presentation/helper/http/http-helper'
import { Controller, httpRequest, HttpResponse, Validation } from '@/presentation/protocols'

export class AddPatientController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addPatient: AddPatient
  ) { }

  async handle (httpRequest: httpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) {
      return badRequest(error)
    }
    await this.addPatient.add(httpRequest.body)
    return null
  }
}