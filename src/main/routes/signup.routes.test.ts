import faker from 'faker'
import request from 'supertest'

import app from '../config/app'

describe('Signup Routes', () => {
  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        passwordConfirmation: faker.internet.password()
      })
      .expect(200)
  })
})
