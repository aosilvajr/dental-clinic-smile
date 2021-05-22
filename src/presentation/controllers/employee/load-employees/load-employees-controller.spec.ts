import MockDate from 'mockdate'

import { throwError } from '@/domain/test'
import { mockEmployeesModel } from '@/domain/test/mock-employee'
import { noContent, ok, serverError } from '@/presentation/helper/http/http-helper'
import { mockLoadEmployees } from '@/presentation/test'

import { LoadEmployeesController } from './load-employees-controller'
import { LoadEmployees } from './load-employees-controller-protocols'

type SutTypes = {
  sut: LoadEmployeesController,
  loadEmployeesStub: LoadEmployees
}

const makeSut = (): SutTypes => {
  const loadEmployeesStub = mockLoadEmployees()
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
    expect(httpResponse).toEqual(ok(mockEmployeesModel))
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
      .mockImplementationOnce(throwError)

    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
