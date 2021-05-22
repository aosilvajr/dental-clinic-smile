import { EmployeeModel, LoadEmployees, LoadEmployeesRepository } from './db-load-employees-protocols'

export class DbLoadEmployees implements LoadEmployees {
  constructor (
    private readonly loadEmployeesRepository: LoadEmployeesRepository
  ) { }

  async load (): Promise<EmployeeModel[]> {
    const employees = await this.loadEmployeesRepository.loadAll()
    return employees
  }
}
