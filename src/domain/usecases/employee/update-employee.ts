import { EmployeeModel } from '../../models/Employee'

export interface UpdateEmployee {
  update(employeeData: EmployeeModel): Promise<EmployeeModel>
}
