import { EmployeeModel } from '@/domain/models/employee'

export interface LoadEmployeesRepository {
  loadAll(): Promise<EmployeeModel[]>
}
