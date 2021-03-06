import { AddPatientRepositoryStub } from '@/data/test'
import { mockPatientParams, throwError } from '@/domain/test'

import { DbAddPatient } from './db-add-patient'
import { AddPatientRepository } from './db-add-patient-protocols'

type SutTypes = {
  sut: DbAddPatient,
  addPatientRepositoryStub: AddPatientRepository
}

const makeSut = (): SutTypes => {
  const addPatientRepositoryStub = new AddPatientRepositoryStub()
  const sut = new DbAddPatient(addPatientRepositoryStub)

  return {
    sut,
    addPatientRepositoryStub
  }
}

describe('DbAddPatient Usecase', () => {
  test('Should call AddPatientRepository with correct values', async () => {
    const { sut, addPatientRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addPatientRepositoryStub, 'add')
    await sut.add(mockPatientParams)
    expect(addSpy).toHaveBeenCalledWith(mockPatientParams)
  })

  test('Should throw if AddPatientRepository throws', async () => {
    const { sut, addPatientRepositoryStub } = makeSut()

    jest
      .spyOn(addPatientRepositoryStub, 'add')
      .mockImplementationOnce(throwError)

    const promise = sut.add(mockPatientParams)
    await expect(promise).rejects.toThrow()
  })
})
