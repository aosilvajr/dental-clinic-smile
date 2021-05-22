import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadEmployeeById } from '@/main/factories/usecases/employee/load-employee-by-id/db-load-employee-by-id'
import { LoadEmployeeByIdController } from '@/presentation/controllers/employee/load-employee-by-id/load-employee-by-id-controller'
import { Controller } from '@/presentation/protocols'

export const makeLoadEmployeeByIdController = (): Controller => {
  const addEmployeeController = new LoadEmployeeByIdController(
    makeDbLoadEmployeeById()
  )
  return makeLogControllerDecorator(addEmployeeController)
}
