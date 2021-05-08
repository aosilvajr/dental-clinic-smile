import { Router } from 'express'

import { adaptRoute } from '../adapter/express/express-route-adapter'
import { makeAddEmployeeController } from '../factories/controllers/employee/add-employee/add-employee-controller-factory'

export default (route: Router): void => {
  route.post('/employees', adaptRoute(makeAddEmployeeController()))
}
