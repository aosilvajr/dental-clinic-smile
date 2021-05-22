import { EmployeeModel } from '@/domain/models/employee'

export interface UpdateEmployeeByIdRepository {
  updateById(employeeData: EmployeeModel): Promise<EmployeeModel>
}
