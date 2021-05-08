import { LoadEmployeesRepository } from '@/data/protocols/db/account/load-employees-repository'
import { EmployeeModel } from '@/domain/models/employee'
import { LoadEmployees } from '@/domain/usecases/load-employees'

export class DbLoadEmployees implements LoadEmployees {
  constructor (
    private readonly loadEmployeesRepository: LoadEmployeesRepository
  ) { }

  async load (): Promise<EmployeeModel[]> {
    const employees = await this.loadEmployeesRepository.loadAll()
    return employees
  }
}
