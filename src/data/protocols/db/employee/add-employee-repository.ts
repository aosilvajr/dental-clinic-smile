import { AddEmployeeModel } from '@/domain/usecases/employee/add-employee'

export interface AddEmployeeRepository {
  add(employeeData: AddEmployeeModel): Promise<void>
}
