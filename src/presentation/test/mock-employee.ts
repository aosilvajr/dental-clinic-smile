import { EmployeeModel } from '@/domain/models/employee'
import { mockEmployeeModel, mockEmployeesModel } from '@/domain/test'
import { AddEmployee, AddEmployeeParams } from '@/domain/usecases/employee/add-employee'
import { DeleteEmployee } from '@/domain/usecases/employee/delete-employee'
import { LoadEmployeeById } from '@/domain/usecases/employee/load-employee-by-id'
import { LoadEmployees } from '@/domain/usecases/employee/load-employees'
import { UpdateEmployee } from '@/domain/usecases/employee/update-employee'

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

export const mockDeleteEmployee = (): DeleteEmployee => {
  class DeleteEmployeStub implements DeleteEmployee {
    async delete (employeeId: string): Promise<void> {
      return Promise.resolve()
    }
  }

  return new DeleteEmployeStub()
}

export const mockUpdateEmployee = (): UpdateEmployee => {
  class UpdateEmployeStub implements UpdateEmployee {
    async update (employeeData: EmployeeModel): Promise<EmployeeModel> {
      return Promise.resolve(mockEmployeeModel)
    }
  }

  return new UpdateEmployeStub()
}
