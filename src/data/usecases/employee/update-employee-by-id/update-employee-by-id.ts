import { UpdateEmployeeByIdRepository } from '@/data/protocols/db/employee/update-employee-by-id-repository '
import { EmployeeModel } from '@/domain/models/employee'
import { UpdateEmployeeById } from '@/domain/usecases/employee/update-employee-by-id'

export class DbUpdateEmployee implements UpdateEmployeeById {
  constructor (
    private readonly updateEmployeeByIdRepository: UpdateEmployeeByIdRepository
  ) { }

  async updateById (id: string): Promise<EmployeeModel> {
    await this.updateEmployeeByIdRepository.updateById(id)
    return null
  }
}
