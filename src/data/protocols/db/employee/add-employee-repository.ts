import { AddEmployeeParams } from '@/domain/usecases/employee/add-employee'

export interface AddEmployeeRepository {
  add(employeeData: AddEmployeeParams): Promise<void>
}
