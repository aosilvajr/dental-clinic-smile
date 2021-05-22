import faker from 'faker'

import { DbAddAccount } from './db-add-account'
import {
  Hasher,
  AddAccountParams,
  AccountModel,
  AddAccountRepository,
  LoadAccountByEmailRepository
} from './db-add-account-protocols'

const fakePassword = faker.internet.password()

const fakeAccountData: AddAccountParams = {
  name: faker.internet.userName(),
  email: faker.internet.email(),
  password: fakePassword
}

const fakeAccount: AccountModel = {
  id: faker.datatype.uuid(),
  name: faker.internet.userName(),
  email: faker.internet.email(),
  password: fakePassword
}

const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return Promise.resolve('hashed_password')
    }
  }

  return new HasherStub()
}

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (accountData: AddAccountParams): Promise<AccountModel> {
      return Promise.resolve(fakeAccount)
    }
  }

  return new AddAccountRepositoryStub()
}

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<AccountModel> {
      return Promise.resolve(null)
    }
  }

  return new LoadAccountByEmailRepositoryStub()
}

type SutTypes = {
  sut: DbAddAccount,
  hasherStub: Hasher,
  addAccountRepositoryStub: AddAccountRepository
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository,
}

const makeSut = (): SutTypes => {
  const hasherStub = makeHasher()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub, loadAccountByEmailRepositoryStub)

  return {
    sut,
    hasherStub,
    addAccountRepositoryStub,
    loadAccountByEmailRepositoryStub
  }
}

describe('DbAddAccount Usecase', () => {
  test('Should call Hasher with correct password', async () => {
    const { sut, hasherStub } = makeSut()
    const hashSpy = jest.spyOn(hasherStub, 'hash')
    await sut.add(fakeAccountData)
    expect(hashSpy).toHaveBeenCalledWith(fakeAccountData.password)
  })

  test('Should throw if Hasher throws', async () => {
    // promise resolved instead of rejected
    // We need to passe away
    const { sut, hasherStub } = makeSut()

    jest
      .spyOn(hasherStub, 'hash')
      .mockReturnValueOnce(Promise.reject(new Error()))

    const promise = sut.add(fakeAccountData)
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')

    await sut.add(fakeAccountData)
    expect(addSpy).toHaveBeenCalledWith(
      Object.assign({}, fakeAccountData, { password: 'hashed_password' })
    )
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()

    jest
      .spyOn(addAccountRepositoryStub, 'add')
      .mockReturnValueOnce(Promise.reject(new Error()))

    const promise = sut.add(fakeAccountData)
    await expect(promise).rejects.toThrow()
  })

  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.add(fakeAccount)
    expect(account).toEqual(fakeAccount)
  })

  test('Should return null if LoadAccountByEmailRepository not return null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()

    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      .mockReturnValueOnce(Promise.resolve(fakeAccount))

    const account = await sut.add(fakeAccount)
    expect(account).toBeNull()
  })

  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest
      .spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.add(fakeAccountData)
    expect(loadSpy).toHaveBeenCalledWith(fakeAccountData.email)
  })
})
