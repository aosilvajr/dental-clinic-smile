import { EmployeeModel } from '@/domain/models/employee'
import { mockEmployeeModel, mockEmployeesModel } from '@/domain/test/mock-employee'
import { AddEmployeeParams } from '@/domain/usecases/employee/add-employee'

import { LoadEmployeesRepository } from '../protocols/db/account/load-employees-repository'
import { AddEmployeeRepository } from '../protocols/db/employee/add-employee-repository'
import { DeleteEmployeeRepository } from '../protocols/db/employee/delete-employee-repository'
import { LoadEmployeeByIdRepository } from '../protocols/db/employee/load-employee-by-id-repository'
import { UpdateEmployeeRepository } from '../protocols/db/employee/update-employee-repository'

export const mockAddEmployeeRepository = (): AddEmployeeRepository => {
  class AddEmployeeRepositoryStub implements AddEmployeeRepository {
    async add (employeeData: AddEmployeeParams): Promise<void> {
      return Promise.resolve()
    }
  }

  return new AddEmployeeRepositoryStub()
}

export const mockLoadEmployeeByIdRepository = (): LoadEmployeeByIdRepository => {
  class LoadEmployeeByIdRepositoryStub implements LoadEmployeeByIdRepository {
    async loadById (id: string): Promise<EmployeeModel> {
      return Promise.resolve(mockEmployeeModel)
    }
  }

  return new LoadEmployeeByIdRepositoryStub()
}

export const mockDeleteEmployeeRepository = (): DeleteEmployeeRepository => {
  class DeleteEmployeeRepositoryStub implements DeleteEmployeeRepository {
    async delete (employeeId: string): Promise<void> {
      return Promise.resolve()
    }
  }

  return new DeleteEmployeeRepositoryStub()
}

export const mockUpdateEmployeeRepository = (): UpdateEmployeeRepository => {
  class UpdateEmployeeRepositoryStub implements UpdateEmployeeRepository {
    async update (employeeData: EmployeeModel): Promise<EmployeeModel> {
      return Promise.resolve(mockEmployeeModel)
    }
  }

  return new UpdateEmployeeRepositoryStub()
}

export const mockLoadEmployeesRepository = (): LoadEmployeesRepository => {
  class LoadEmployeesRepositoryStub implements LoadEmployeesRepository {
    async loadAll (): Promise<EmployeeModel[]> {
      return Promise.resolve(mockEmployeesModel)
    }
  }

  return new LoadEmployeesRepositoryStub()
}
