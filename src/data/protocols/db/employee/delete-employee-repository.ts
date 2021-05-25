export interface DeleteEmployeeRepository {
  delete(employeeId: string): Promise<void>
}
