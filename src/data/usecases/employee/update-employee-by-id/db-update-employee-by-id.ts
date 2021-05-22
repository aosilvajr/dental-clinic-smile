import { UpdateEmployeeByIdRepository, UpdateEmployeeById, EmployeeModel } from './db-update-employee-by-id-protocols'

export class DbUpdateEmployee implements UpdateEmployeeById {
  constructor (
    private readonly updateEmployeeByIdRepository: UpdateEmployeeByIdRepository
  ) { }

  async updateById (employeeData: EmployeeModel): Promise<EmployeeModel> {
    const updatedEmployee = await this.updateEmployeeByIdRepository.updateById(employeeData)
    return updatedEmployee
  }
}
