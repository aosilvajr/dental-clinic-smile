import { DeleteEmployeeRepository } from '@/data/protocols/db/employee/delete-employee-repository'
import { DeleteEmployee } from '@/domain/usecases/employee/delete-employee'

export class DbDeleteEmployee implements DeleteEmployee {
  constructor (
    private readonly deleteEmployeeRepository: DeleteEmployeeRepository
  ) { }

  async delete (employeeId: string): Promise<void> {
    await this.deleteEmployeeRepository.delete(employeeId)
  }
}
