import { DbAddEmployee } from '@/data/usecases/add-employee/db-add-employee'
import { AddEmployee } from '@/domain/usecases/add-employee'
import { EmployeeMongoRepository } from '@/infra/db/mongodb/employee/employee-mongo-repository'

export const makeDbAddEmployee = (): AddEmployee => {
  const employeeMongoRespository = new EmployeeMongoRepository()
  return new DbAddEmployee(employeeMongoRespository)
}
