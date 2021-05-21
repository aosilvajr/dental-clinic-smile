import faker from 'faker'

import { LoadEmployeeByIdController } from './load-employee-by-id-controller'
import { httpRequest, LoadEmployeeById, EmployeeModel } from './load-employee-by-id-controller-protocols'

const makeFakeRequest: httpRequest = {
  params: {
    employeeId: faker.datatype.uuid()
  }
}

const makeFakeEmployee: EmployeeModel = {
  id: faker.datatype.uuid(),
  name: faker.internet.userName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  position: faker.name.jobTitle(),
  birthday: faker.date.past(),
  createdAt: new Date()
}

const makeLoadEmployeeById = (): LoadEmployeeById => {
  class LoadEmployeByIdStub implements LoadEmployeeById {
    async loadById (id: string): Promise<EmployeeModel> {
      return Promise.resolve(makeFakeEmployee)
    }
  }

  return new LoadEmployeByIdStub()
}

type SutTypes = {
  sut: LoadEmployeeByIdController,
  loadEmployeeByIdStub: LoadEmployeeById
}

const makeSut = (): SutTypes => {
  const loadEmployeeByIdStub = makeLoadEmployeeById()
  const sut = new LoadEmployeeByIdController(loadEmployeeByIdStub)

  return {
    sut,
    loadEmployeeByIdStub
  }
}

describe('LoadEmployeeById Controller', () => {
  test('Should call LoadEmployeById with correct values', async () => {
    const { sut, loadEmployeeByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadEmployeeByIdStub, 'loadById')
    await sut.handle(makeFakeRequest)
    expect(loadByIdSpy).toHaveBeenCalledWith(makeFakeRequest.params.employeeId)
  })
})
