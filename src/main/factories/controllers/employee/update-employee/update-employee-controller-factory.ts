import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDdUpdateEmployee } from '@/main/factories/usecases/employee/update-employee/db-update-employee'
import { UpdateEmployeeController } from '@/presentation/controllers/employee/update-employee/update-employee'
import { Controller } from '@/presentation/protocols'

export const makeUpdateEmployeeController = (): Controller => {
  const updateEmployeeController = new UpdateEmployeeController(
    makeDdUpdateEmployee()
  )
  return makeLogControllerDecorator(updateEmployeeController)
}
