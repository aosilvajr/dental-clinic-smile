import { AddPatientParams } from '@/domain/usecases/patient/add-patient'

export interface AddPatientRepository {
  add(patientData: AddPatientParams): Promise<void>
}
