import faker from 'faker'
import jwt from 'jsonwebtoken'

import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return Promise.resolve('any_token')
  }
}))

const fakeAccountId: string = faker.datatype.uuid()

describe('Jwt Adapter', () => {
  test('Should call sign with correct values', () => {
    const sut = new JwtAdapter('secret')
    const signSpy = jest.spyOn(jwt, 'sign')
    sut.encrypt(fakeAccountId)
    expect(signSpy).toHaveBeenCalledWith({
      id: fakeAccountId
    }, 'secret')
  })

  test('Should return a token on sign success', async () => {
    const sut = new JwtAdapter('secret')
    const token = await sut.encrypt(fakeAccountId)
    expect(token).toBe('any_token')
  })
})
