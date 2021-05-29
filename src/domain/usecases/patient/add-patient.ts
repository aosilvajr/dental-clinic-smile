import { PatientModel } from '@/domain/models/patient'

export type AddPatientParams = Omit<PatientModel, 'id'>

export interface AddPatient {
  add(data: AddPatientParams): Promise<void>
}
