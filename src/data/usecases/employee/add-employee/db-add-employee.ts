import {
  AddEmployee,
  AddEmployeeParams,
  AddEmployeeRepository
} from './db-add-employee-protocols'

export class DbAddEmployee implements AddEmployee {
  constructor (
    private readonly addEmployeeRepository: AddEmployeeRepository
  ) { }

  async add (data: AddEmployeeParams): Promise<void> {
    await this.addEmployeeRepository.add(data)
  }
}
