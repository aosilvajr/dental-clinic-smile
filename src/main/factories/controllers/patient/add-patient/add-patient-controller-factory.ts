import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbAddPatient } from '@/main/factories/usecases/patient/add-patient/add-patient-factory'
import { AddPatientController } from '@/presentation/controllers/patient/add-patient/add-patient-controller'
import { Controller } from '@/presentation/protocols'

import { makeAddPatientValidation } from './add-patient-validation-factory'

export const makeAddPatientController = (): Controller => {
  const addPatientController = new AddPatientController(
    makeAddPatientValidation(),
    makeDbAddPatient()
  )
  return makeLogControllerDecorator(addPatientController)
}
