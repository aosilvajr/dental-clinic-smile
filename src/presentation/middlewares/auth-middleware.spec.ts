import { mockAccountModel, throwError } from '@/domain/test'

import { AccessDeniedError } from '../errors/access-denied-error'
import { forbidden, ok, serverError } from '../helper/http/http-helper'
import { mockLoadAccountByToken } from '../test'
import { AuthMiddleware } from './auth-middleware'
import { httpRequest, LoadAccountByToken } from './auth-middleware-protocols'

const makeFakeRequest = (): httpRequest => ({
  headers: {
    'x-access-token': 'any_token'
  }
})

type SutTypes = {
  sut: AuthMiddleware,
  loadAccountByTokenStub: LoadAccountByToken
}

const makeSut = (role?: string): SutTypes => {
  const loadAccountByTokenStub = mockLoadAccountByToken()
  const sut = new AuthMiddleware(loadAccountByTokenStub, role)

  return {
    sut,
    loadAccountByTokenStub
  }
}

describe('Auth Middleware', () => {
  test('Should return 403 if no x-access-token exists in header', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should call LoadAccountByToken with correct token', async () => {
    const role = 'any_role'
    const { sut, loadAccountByTokenStub } = makeSut(role)
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load')
    await sut.handle(makeFakeRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_token', role)
  })

  test('Should return 403 if no LoadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()

    jest
      .spyOn(loadAccountByTokenStub, 'load')
      .mockReturnValueOnce(Promise.resolve(null))

    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should return 200 if no LoadAccountByToken returns an account', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok({ accountId: mockAccountModel.id }))
  })

  test('Should return 400 if no LoadAccountByToken throws', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()

    jest
      .spyOn(loadAccountByTokenStub, 'load')
      .mockImplementationOnce(throwError)

    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
