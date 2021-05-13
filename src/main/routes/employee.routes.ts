import { Router } from 'express'

import { adaptMiddleware } from '../adapter/express/express-middleware-adapter'
import { adaptRoute } from '../adapter/express/express-route-adapter'
import { makeAddEmployeeController } from '../factories/controllers/employee/add-employee/add-employee-controller-factory'
import { makeLoadEmployeeController } from '../factories/controllers/employee/load-employees/load-employees-controller-factory'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware'

export default (route: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
  const auth = adaptMiddleware(makeAuthMiddleware())
  route.post('/employees', adminAuth, adaptRoute(makeAddEmployeeController()))
  route.get('/employees', auth, adaptRoute(makeLoadEmployeeController()))
}
