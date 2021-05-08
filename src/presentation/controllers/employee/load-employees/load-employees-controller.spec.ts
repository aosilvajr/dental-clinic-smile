import faker from 'faker'
import MockDate from 'mockdate'

import { LoadEmployeesController } from './load-employees-controller'
import { LoadEmployees, EmployeeModel } from './load-employees-controller-protocols'

const makeFakeEmployees = (): EmployeeModel[] => [{
  id: faker.datatype.uuid(),
  name: faker.internet.userName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  position: faker.name.jobTitle(),
  birthday: faker.date.past(),
  createdAt: new Date()
}, {
  id: faker.datatype.uuid(),
  name: faker.internet.userName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  position: faker.name.jobTitle(),
  birthday: faker.date.past(),
  createdAt: new Date()
}]

const makeLoadEmployeesStub = (): LoadEmployees => {
  class LoadEmployeesStub implements LoadEmployees {
    async load (): Promise<EmployeeModel[]> {
      return Promise.resolve(makeFakeEmployees())
    }
  }

  return new LoadEmployeesStub()
}

type SutTypes = {
  sut: LoadEmployeesController,
  loadEmployeesStub: LoadEmployees
}

const makeSut = (): SutTypes => {
  const loadEmployeesStub = makeLoadEmployeesStub()
  const sut = new LoadEmployeesController(loadEmployeesStub)

  return {
    sut,
    loadEmployeesStub
  }
}

describe('LoadEmployees Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadEmployees', async () => {
    const { sut, loadEmployeesStub } = makeSut()
    const loadSpy = jest.spyOn(loadEmployeesStub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })
})
