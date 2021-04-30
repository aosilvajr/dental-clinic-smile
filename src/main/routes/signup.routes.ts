import { Router } from 'express'

import { adaptRoute } from '../adapter/express-route-adapter'
import { makeSignUpController } from '../factories/signup'

export default (route: Router): void => {
  route.post('/signup', adaptRoute(makeSignUpController()))
}
