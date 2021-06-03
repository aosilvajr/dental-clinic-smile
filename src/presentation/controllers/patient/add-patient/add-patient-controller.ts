import { badRequest, noContent, serverError } from '@/presentation/helper/http/http-helper'

import {
  Controller,
  httpRequest,
  HttpResponse,
  Validation,
  PatientModel,
  AddPatient
} from './add-patient-controller-protocols'

export class AddPatientController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addPatient: AddPatient
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
        whatsapp,
        occupation,
        indication,
        acceptMessage,
        startTreatment,
        endTreatment,
        profile
      }: PatientModel = httpRequest.body
      await this.addPatient.add({
        name,
        email,
        phone,
        whatsapp,
        occupation,
        indication,
        acceptMessage,
        startTreatment,
        endTreatment,
        profile,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
