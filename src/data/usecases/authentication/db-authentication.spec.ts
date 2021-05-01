import faker from 'faker'

import { HashComparer } from '@/data/protocols/criptography/hash-comparer'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/load-account-by-email-repository'
import { AccountModel } from '@/domain/models/account'
import { AuthenticationModel } from '@/domain/usecases/authentication'

import { DbAuthentication } from './db-authentication'

const fakePassword = faker.internet.password()

const fakeAuthentication: AuthenticationModel = {
  email: faker.internet.email(),
  password: fakePassword
}

const fakeAccount: AccountModel = {
  id: faker.datatype.uuid(),
  name: faker.internet.userName(),
  email: faker.internet.email(),
  password: fakePassword
}

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async load (email: string): Promise<AccountModel> {
      return Promise.resolve(fakeAccount)
    }
  }

  return new LoadAccountByEmailRepositoryStub()
}

const makeHashComparer = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async comparer (value: string, hash: string): Promise<boolean> {
      return true
    }
  }

  return new HashComparerStub()
}

type SutTypes = {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository,
  hashComparerStub: HashComparer
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const hashComparerStub = makeHashComparer()
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub, hashComparerStub)

  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashComparerStub
  }
}

describe('DbAuthentication UseCase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
    sut.auth(fakeAuthentication)
    expect(loadSpy).toHaveBeenCalledWith(fakeAuthentication.email)
  })

  test('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()

    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'load')
      .mockReturnValueOnce(Promise.reject(new Error()))

    const promise = sut.auth(fakeAuthentication)
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()

    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'load')
      .mockReturnValueOnce(null)

    const token = await sut.auth(fakeAuthentication)
    expect(token).toBeNull()
  })

  test('Should call HashComparer with correct values', async () => {
    const { sut, hashComparerStub } = makeSut()

    const compareSpy = jest
      .spyOn(hashComparerStub, 'comparer')
      .mockReturnValueOnce(null)

    await sut.auth(fakeAuthentication)
    expect(compareSpy).toHaveBeenCalledWith(
      fakeAuthentication.password,
      fakeAccount.password
    )
  })

  test('Should throw if HashComparer throws', async () => {
    const { sut, hashComparerStub } = makeSut()

    jest
      .spyOn(hashComparerStub, 'comparer')
      .mockReturnValueOnce(Promise.reject(new Error()))

    const promise = sut.auth(fakeAuthentication)
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if HashComparer returns false', async () => {
    const { sut, hashComparerStub } = makeSut()

    jest
      .spyOn(hashComparerStub, 'comparer')
      .mockReturnValueOnce(Promise.resolve(false))

    const token = await sut.auth(fakeAuthentication)
    expect(token).toBeNull()
  })
})
