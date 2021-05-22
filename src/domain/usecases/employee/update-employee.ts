import { EmployeeModel } from '../../models/Employee'

export interface UpdateEmployee {
  update(data: EmployeeModel): Promise<EmployeeModel>
}
