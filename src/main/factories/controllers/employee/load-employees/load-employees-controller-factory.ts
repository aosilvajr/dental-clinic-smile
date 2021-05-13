import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadEmployee } from '@/main/factories/usecases/employee/load-employees/db-load-employees'
import { LoadEmployeesController } from '@/presentation/controllers/employee/load-employees/load-employees-controller'
import { Controller } from '@/presentation/protocols'

export const makeLoadEmployeeController = (): Controller => {
  const addEmployeeController = new LoadEmployeesController(
    makeDbLoadEmployee()
  )

  return makeLogControllerDecorator(addEmployeeController)
}
