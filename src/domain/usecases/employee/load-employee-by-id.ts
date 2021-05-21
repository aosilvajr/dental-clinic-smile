import { EmployeeModel } from '../../models/Employee'

export interface LoadEmployeeById {
  loadById(id: string): Promise<EmployeeModel>
}
