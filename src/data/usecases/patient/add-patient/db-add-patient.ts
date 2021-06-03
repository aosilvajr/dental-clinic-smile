import { AddPatientParams, AddPatientRepository, AddPatient } from './db-add-patient-protocols'

export class DbAddPatient implements AddPatient {
  constructor (
    private readonly addPatientRepository: AddPatientRepository
  ) { }

  async add (patientData: AddPatientParams): Promise<void> {
    await this.addPatientRepository.add(patientData)
  }
}
