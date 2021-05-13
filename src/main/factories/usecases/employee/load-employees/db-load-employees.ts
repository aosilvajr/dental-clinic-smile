import { DbLoadEmployees } from '@/data/usecases/load-employees/db-load-employees'
import { LoadEmployees } from '@/domain/usecases/load-employees'
import { EmployeeMongoRepository } from '@/infra/db/mongodb/employee/employee-mongo-repository'

export const makeDbLoadEmployee = (): LoadEmployees => {
  const employeeMongoRespository = new EmployeeMongoRepository()
  return new DbLoadEmployees(employeeMongoRespository)
}