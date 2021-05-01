import faker from 'faker'
import jwt from 'jsonwebtoken'

import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return Promise.resolve('any_token')
  }
}))

const fakeAccountId: string = faker.datatype.uuid()

const makeSut = (): JwtAdapter => {
  return new JwtAdapter('secret')
}

describe('JwtAdapter', () => {
  test('Should call sign with correct values', async () => {
    const sut = makeSut()
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt(fakeAccountId)
    expect(signSpy).toHaveBeenCalledWith({
      id: fakeAccountId
    }, 'secret')
  })

  test('Should return a token on sign success', async () => {
    const sut = makeSut()
    const token = await sut.encrypt(fakeAccountId)
    expect(token).toBe('any_token')
  })

  test('Should throw if sign throws', async () => {
    const sut = makeSut()

    jest.spyOn(jwt, 'sign')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    const promise = sut.encrypt(fakeAccountId)
    await expect(promise).rejects.toThrow()
  })
})
