import { DbUpdateEmployee } from '@/data/usecases/employee/update-employee/db-update-employee'
import { UpdateEmployee } from '@/domain/usecases/employee/update-employee-by-id'
import { EmployeeMongoRepository } from '@/infra/db/mongodb/employee/employee-mongo-repository'

export const makeDdUpdateEmployee = (): UpdateEmployee => {
  const employeeMongoRepository = new EmployeeMongoRepository()
  return new DbUpdateEmployee(employeeMongoRepository)
}
