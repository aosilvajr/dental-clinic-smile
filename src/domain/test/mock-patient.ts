import faker from 'faker'

import { AddPatientParams } from '../usecases/patient/add-patient'

export const mockPatientParams: AddPatientParams = {
  name: faker.internet.userName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  whatsapp: faker.phone.phoneNumber(),
  occupation: faker.name.jobType(),
  indication: faker.name.firstName(),
  acceptMessage: true,
  startTreatment: faker.date.past(),
  endTreatment: faker.date.recent(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
  profile: {
    city: faker.address.city(),
    number: faker.datatype.number(),
    state: faker.address.state(),
    street: faker.address.streetName(),
    zipCode: faker.address.zipCode(),
    complement: faker.lorem.words(4)
  }
}
