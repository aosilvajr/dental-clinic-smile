import faker from 'faker'

import { LoadEmployeesRepository } from '@/data/protocols/db/account/load-employees-repository'
import { EmployeeModel } from '@/domain/models/employee'

import { DbLoadEmployees } from './db-load-employees'

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

describe('DbLoadEmployees', () => {
  test('Should call LoadEmployeesRepository', async () => {
    class LoadEmployeesRepositoryStub implements LoadEmployeesRepository {
      async loadAll (): Promise<EmployeeModel[]> {
        return Promise.resolve(makeFakeEmployees)
      }
    }
    const loadEmployeesRepositoryStub = new LoadEmployeesRepositoryStub()
    const loadAllSpy = jest.spyOn(loadEmployeesRepositoryStub, 'loadAll')
    const sut = new DbLoadEmployees(loadEmployeesRepositoryStub)
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalled()
  })
})
