import { DbAddPatient } from '@/data/usecases/patient/add-patient/db-add-patient'
import { AddPatient } from '@/domain/usecases/patient/add-patient'
import { PatientMongoRepository } from '@/infra/db/mongodb/patient/patient-mongo-repository'

export const makeDbAddPatient = (): AddPatient => {
  const patientMongoRepository = new PatientMongoRepository()
  return new DbAddPatient(patientMongoRepository)
}
