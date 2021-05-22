import { DbLoadEmployeeById } from '@/data/usecases/employee/load-employee-by-id/db-load-employee-by-id'
import { LoadEmployeeById } from '@/domain/usecases/employee/load-employee-by-id'
import { EmployeeMongoRepository } from '@/infra/db/mongodb/employee/employee-mongo-repository'

export const makeDbLoadEmployeeById = (): LoadEmployeeById => {
  const employeeMongoRespository = new EmployeeMongoRepository()
  return new DbLoadEmployeeById(employeeMongoRespository)
}
