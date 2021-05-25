import { DeleteEmployeeRepository, DeleteEmployee } from './db-delete-employee-protocols'

export class DbDeleteEmployee implements DeleteEmployee {
  constructor (
    private readonly deleteEmployeeRepository: DeleteEmployeeRepository
  ) { }

  async delete (employeeId: string): Promise<void> {
    await this.deleteEmployeeRepository.delete(employeeId)
  }
}
