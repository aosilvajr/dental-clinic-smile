import { EmployeeModel } from '../../models/Employee'

export interface UpdateEmployeeById {
  updateById(employeeData: EmployeeModel): Promise<EmployeeModel>
}
