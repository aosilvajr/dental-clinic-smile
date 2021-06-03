import { AddPatientParams, AddPatientRepository } from './db-add-patient-protocols'

export class DbAddPatient implements AddPatientRepository {
  constructor (
    private readonly addPatientRepository: AddPatientRepository
  ) { }

  async add (patientData: AddPatientParams): Promise<void> {
    await this.addPatientRepository.add(patientData)
  }
}
