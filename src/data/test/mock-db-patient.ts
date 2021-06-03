import { AddPatientParams } from '@/domain/usecases/patient/add-patient'

import { AddPatientRepository } from '../protocols/db/patient/add-patient-repository'

export class AddPatientRepositoryStub implements AddPatientRepository {
  async add (patientData: AddPatientParams): Promise<void> {
    return Promise.resolve()
  }
}
