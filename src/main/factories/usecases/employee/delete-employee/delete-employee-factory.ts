import { DbDeleteEmployee } from '@/data/usecases/employee/delete-employee/db-delete-employee'
import { DeleteEmployee } from '@/domain/usecases/employee/delete-employee'
import { EmployeeMongoRepository } from '@/infra/db/mongodb/employee/employee-mongo-repository'

export const makeDbDeleteEmployee = (): DeleteEmployee => {
  const employeeMongoRespository = new EmployeeMongoRepository()
  return new DbDeleteEmployee(employeeMongoRespository)
}
