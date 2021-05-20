import faker from 'faker'
import MockDate from 'mockdate'

import { LoadEmployeeByIdRepository } from '@/data/protocols/db/employee/load-employee-by-id-repository'
import { EmployeeModel } from '@/domain/models/employee'

import { DbLoadEmployeeById } from './load-employee-by-id'

const makeFakeEmployee: EmployeeModel = {
  id: faker.datatype.uuid(),
  name: faker.internet.userName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  position: faker.name.jobTitle(),
  birthday: faker.date.past(),
  createdAt: new Date()
}

const makeLoadEmployeeByIdRepository = (): LoadEmployeeByIdRepository => {
  class LoadEmployeeByIdRepositoryStub implements LoadEmployeeByIdRepository {
    async loadById (id: string): Promise<EmployeeModel> {
      return Promise.resolve(makeFakeEmployee)
    }
  }

  return new LoadEmployeeByIdRepositoryStub()
}

type SutTypes = {
  sut: DbLoadEmployeeById,
  loadEmployeeByIdRepositoryStub: LoadEmployeeByIdRepository
}

const makeSut = (): SutTypes => {
  const loadEmployeeByIdRepositoryStub = makeLoadEmployeeByIdRepository()
  const sut = new DbLoadEmployeeById(loadEmployeeByIdRepositoryStub)

  return {
    sut,
    loadEmployeeByIdRepositoryStub
  }
}

describe('DbLoadEmployeeById', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadEmployeeByIdRepository', async () => {
    const { sut, loadEmployeeByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadEmployeeByIdRepositoryStub, 'loadById')
    await sut.loadById('any_id')
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return employee on success', async () => {
    const { sut } = makeSut()
    const employee = await sut.loadById('any_id')
    expect(employee).toEqual(makeFakeEmployee)
  })
})
