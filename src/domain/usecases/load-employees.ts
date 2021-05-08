import { EmployeeModel } from '../models/Employee'

export interface LoadEmployees {
  load(): Promise<EmployeeModel[]>
}
