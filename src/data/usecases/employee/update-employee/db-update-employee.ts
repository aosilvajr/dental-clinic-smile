import { UpdateEmployeeRepository, UpdateEmployee, EmployeeModel } from './db-update-employee-protocols'

export class DbUpdateEmployee implements UpdateEmployee {
  constructor (
    private readonly updateEmployeeRepository: UpdateEmployeeRepository
  ) { }

  async update (employeeData: EmployeeModel): Promise<EmployeeModel> {
    const updatedEmployee = await this.updateEmployeeRepository.update(employeeData)
    return updatedEmployee
  }
}
