import { AddPatientRepository } from '@/data/protocols/db/patient/add-patient-repository'
import { AddPatientParams } from '@/domain/usecases/patient/add-patient'

import { MongoHelper } from '../helpers/mongo-helper'

export class PatientMongoRepository implements AddPatientRepository {
  async add (patientData: AddPatientParams): Promise<void> {
    const patientCollection = await MongoHelper.getCollection('patients')
    await patientCollection.insertOne(patientData)
  }
}
