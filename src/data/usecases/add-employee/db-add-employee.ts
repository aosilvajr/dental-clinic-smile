import {
  AddEmployee,
  AddEmployeeModel,
  AddEmployeeRepository
} from './db-add-employee-protocols'

export class DbAddEmployee implements AddEmployee {
  constructor (
    private readonly addEmployeeRepository: AddEmployeeRepository
  ) { }

  async add (data: AddEmployeeModel): Promise<void> {
    await this.addEmployeeRepository.add(data)
  }
}
