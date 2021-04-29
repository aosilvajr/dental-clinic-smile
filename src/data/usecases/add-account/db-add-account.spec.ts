import faker from 'faker'

import { DbAddAccount } from './db-add-account'

describe('DbAddAccount Usecase', () => {
  test('Should call Encrypter with correct password', () => {
    class EncrypterStub {
      async encrypt (value: string): Promise<string> {
        return Promise.resolve('hashed_password')
      }
    }
    const encrypterStub = new EncrypterStub()
    const sut = new DbAddAccount(encrypterStub)
    const encrypterSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    }
    sut.add(accountData)
    expect(encrypterSpy).toHaveBeenCalledWith(accountData.password)
  })
})
