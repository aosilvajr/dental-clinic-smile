import { Router } from 'express'

import { adaptRoute } from '../adapter/express/express-route-adapter'
import { makeLoginController } from '../factories/controllers/login/login/login-controller-factory'
import { makeSignUpController } from '../factories/controllers/login/signup/signup-controller-factory'

export default (route: Router): void => {
  route.post('/signup', adaptRoute(makeSignUpController()))
  route.post('/login', adaptRoute(makeLoginController()))
}
