import { LoadEmployeeByIdRepository } from '@/data/protocols/db/employee/load-employee-by-id-repository'
import { EmployeeModel } from '@/domain/models/employee'

export class DbLoadEmployeeById implements LoadEmployeeByIdRepository {
  constructor (
    private readonly loadEmployeeByIdRepository: LoadEmployeeByIdRepository
  ) { }

  async loadById (id: string): Promise<EmployeeModel> {
    await this.loadEmployeeByIdRepository.loadById(id)
    return null
  }
}
