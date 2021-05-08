import { Router } from 'express'

import { adaptMiddleware } from '../adapter/express/express-middleware-adapter'
import { adaptRoute } from '../adapter/express/express-route-adapter'
import { makeAddEmployeeController } from '../factories/controllers/employee/add-employee/add-employee-controller-factory'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware'

export default (route: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
  route.post('/employees', adminAuth, adaptRoute(makeAddEmployeeController()))
}
