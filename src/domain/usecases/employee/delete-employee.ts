export interface DeleteEmployee {
  delete(employeeId: string): Promise<void>
}
