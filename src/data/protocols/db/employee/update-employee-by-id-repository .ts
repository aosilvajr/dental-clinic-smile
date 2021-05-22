import { EmployeeModel } from '@/domain/models/employee'

export interface UpdateEmployeeByIdRepository {
  updateById(id: string): Promise<EmployeeModel>
}
