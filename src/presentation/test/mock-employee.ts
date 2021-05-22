import { EmployeeModel } from '@/domain/models/employee'
import { mockEmployeeModel, mockEmployeesModel } from '@/domain/test'
import { AddEmployee, AddEmployeeParams } from '@/domain/usecases/employee/add-employee'
import { LoadEmployeeById } from '@/domain/usecases/employee/load-employee-by-id'
import { LoadEmployees } from '@/domain/usecases/employee/load-employees'

export const mockAddEmployee = (): AddEmployee => {
  class AddEmployeeStub implements AddEmployee {
    async add (data: AddEmployeeParams): Promise<void> {
      return Promise.resolve()
    }
  }

  return new AddEmployeeStub()
}

export const mockLoadEmployees = (): LoadEmployees => {
  class LoadEmployeesStub implements LoadEmployees {
    async load (): Promise<EmployeeModel[]> {
      return Promise.resolve(mockEmployeesModel)
    }
  }

  return new LoadEmployeesStub()
}

export const mockLoadEmployeeById = (): LoadEmployeeById => {
  class LoadEmployeByIdStub implements LoadEmployeeById {
    async loadById (id: string): Promise<EmployeeModel> {
      return Promise.resolve(mockEmployeeModel)
    }
  }

  return new LoadEmployeByIdStub()
}
