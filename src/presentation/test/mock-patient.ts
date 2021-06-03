import { AddPatient, AddPatientParams } from '@/domain/usecases/patient/add-patient'

export const mockAddPatient = (): AddPatient => {
  class AddPatientStub implements AddPatient {
    async add (data: AddPatientParams): Promise<void> {
      return Promise.resolve()
    }
  }

  return new AddPatientStub()
}
