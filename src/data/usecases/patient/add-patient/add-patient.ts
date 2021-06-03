import { AddPatientRepository } from '@/data/protocols/db/patient/add-patient-repository'
import { AddPatientParams } from '@/domain/usecases/patient/add-patient'

export class DbAddPatient implements AddPatientRepository {
  constructor (
    private readonly addPatientRepository: AddPatientRepository
  ) { }

  async add (patientData: AddPatientParams): Promise<void> {
    await this.addPatientRepository.add(patientData)
  }
}
