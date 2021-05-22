import { EmployeeModel } from '@/domain/models/employee'

export type AddEmployeeParams = Omit<EmployeeModel, 'id'>

export interface AddEmployee {
  add(data: AddEmployeeParams): Promise<void>
}
