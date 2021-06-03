import { AddPatientRepository } from '@/data/protocols/db/patient/add-patient-repository'
import { AddPatientRepositoryStub } from '@/data/test'
import { mockPatientParams } from '@/domain/test'

import { DbAddPatient } from './add-patient'

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
})
