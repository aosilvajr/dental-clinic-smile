import { EmployeeModel } from '../../models/Employee'

export interface UpdateEmployeeById {
  updateById(id: string): Promise<EmployeeModel>
}
