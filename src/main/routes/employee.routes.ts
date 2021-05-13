import { Router } from 'express'

import { adaptRoute } from '../adapter/express/express-route-adapter'
import { makeAddEmployeeController } from '../factories/controllers/employee/add-employee/add-employee-controller-factory'
import { makeLoadEmployeeController } from '../factories/controllers/employee/load-employees/load-employees-controller-factory'
import { adminAuth } from '../middlewares/admin-auth'
import { auth } from '../middlewares/auth'

export default (route: Router): void => {
  route.post('/employees', adminAuth, adaptRoute(makeAddEmployeeController()))
  route.get('/employees', auth, adaptRoute(makeLoadEmployeeController()))
}
