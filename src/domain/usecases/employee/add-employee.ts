export type AddEmployeeModel = {
  name: string
  email: string
  phone: string
  position: string
  birthday: Date
  createdAt: Date
}

export interface AddEmployee {
  add(data: AddEmployeeModel): Promise<void>
}
