import { EmployeeModel } from '@/domain/models/employee'

export interface UpdateEmployeeRepository {
  update(employeeData: EmployeeModel): Promise<EmployeeModel>
}
