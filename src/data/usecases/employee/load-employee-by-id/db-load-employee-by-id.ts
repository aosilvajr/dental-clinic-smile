import {
  LoadEmployeeByIdRepository,
  EmployeeModel,
  LoadEmployeeById
} from './db-load-employee-by-id-protocols'

export class DbLoadEmployeeById implements LoadEmployeeById {
  constructor (
    private readonly loadEmployeeByIdRepository: LoadEmployeeByIdRepository
  ) { }

  async loadById (id: string): Promise<EmployeeModel> {
    const employee = await this.loadEmployeeByIdRepository.loadById(id)
    return employee
  }
}
