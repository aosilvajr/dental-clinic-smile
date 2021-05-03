import { AddEmployeeModel } from '@/domain/usecases/add-employee'

export interface AddEmployeeRepository {
  add(employeeData: AddEmployeeModel): Promise<void>
}
