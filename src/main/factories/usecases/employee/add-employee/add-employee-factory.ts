import { DbAddEmployee } from '@/data/usecases/employee/add-employee/db-add-employee'
import { AddEmployee } from '@/domain/usecases/employee/add-employee'
import { EmployeeMongoRepository } from '@/infra/db/mongodb/employee/employee-mongo-repository'

export const makeDbAddEmployee = (): AddEmployee => {
  const employeeMongoRespository = new EmployeeMongoRepository()
  return new DbAddEmployee(employeeMongoRespository)
}
