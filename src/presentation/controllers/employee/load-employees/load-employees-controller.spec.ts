
import faker from 'faker'
import MockDate from 'mockdate'

import { noContent, ok, serverError } from '@/presentation/helper/http/http-helper'

import { LoadEmployeesController } from './load-employees-controller'
import { LoadEmployees, EmployeeModel } from './load-employees-controller-protocols'

const makeFakeEmployees: EmployeeModel[] = [{
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
      return Promise.resolve(makeFakeEmployees)
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

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(ok(makeFakeEmployees))
  })

  test('Should return 200 if LoadEmployees returns empty', async () => {
    const { sut, loadEmployeesStub } = makeSut()

    jest.spyOn(loadEmployeesStub, 'load')
      .mockReturnValueOnce(Promise.resolve([]))

    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadEmployees throws', async () => {
    const { sut, loadEmployeesStub } = makeSut()

    jest
      .spyOn(loadEmployeesStub, 'load')
      .mockReturnValueOnce(Promise.reject(new Error()))

    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
