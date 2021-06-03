import { AddPatientRepositoryStub } from '@/data/test'
import { mockPatientParams } from '@/domain/test'

import { DbAddPatient } from './add-patient'

describe('DbAddPatient Usecase', () => {
  test('Should call AddPatientRepository with correct values', async () => {
    const addPatientRepositoryStub = new AddPatientRepositoryStub()
    const sut = new DbAddPatient(addPatientRepositoryStub)
    const addSpy = jest.spyOn(addPatientRepositoryStub, 'add')
    await sut.add(mockPatientParams)
    expect(addSpy).toHaveBeenCalledWith(mockPatientParams)
  })
})
