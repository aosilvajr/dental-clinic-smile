import { EmployeeModel } from '@/domain/models/employee'

export interface LoadEmployeeByIdRepository {
  loadById(id: string): Promise<EmployeeModel>
}
