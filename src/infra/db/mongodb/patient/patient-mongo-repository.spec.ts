import { Collection } from 'mongodb'

import { mockPatientParams } from '@/domain/test'

import { MongoHelper } from '../helpers/mongo-helper'
import { PatientMongoRepository } from './patient-mongo-repository'

const makeSut = (): PatientMongoRepository => {
  return new PatientMongoRepository()
}

describe('Patient Mongo Repository', () => {
  let patientCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    patientCollection = await MongoHelper.getCollection('patients')
    await patientCollection.deleteMany({})
  })

  describe('add()', () => {
    test('Should add a patient on success', async () => {
      const sut = makeSut()
      await sut.add(mockPatientParams)
      const patient = await patientCollection.findOne({ name: mockPatientParams.name })
      expect(patient).toBeTruthy()
    })
  })
})
