import { AddEmployeeController } from '@/presentation/controllers/employee/add-employee/add-employee-controller'
import { Controller } from '@/presentation/protocols'

import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeDbAddEmployee } from '../../usecases/add-employee/add-employee-factory'
import { makeAddEmployeeValidation } from './add-employee-validation-factory'

export const makeAddEmployeeController = (): Controller => {
  const addEmployeeController = new AddEmployeeController(
    makeAddEmployeeValidation(),
    makeDbAddEmployee()
  )

  return makeLogControllerDecorator(addEmployeeController)
}
