import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbDeleteEmployee } from '@/main/factories/usecases/employee/delete-employee/delete-employee-factory'
import { DeleteEmployeeController } from '@/presentation/controllers/employee/delete-employee/delete-employee-controller'
import { Controller } from '@/presentation/protocols'

export const makeDeleteEmployeeController = (): Controller => {
  const deleteEmployeeController = new DeleteEmployeeController(
    makeDbDeleteEmployee()
  )
  return makeLogControllerDecorator(deleteEmployeeController)
}
