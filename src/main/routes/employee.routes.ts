import { Router } from 'express'

import { adaptRoute } from '../adapter/express/express-route-adapter'
import { makeAddEmployeeController } from '../factories/controllers/employee/add-employee/add-employee-controller-factory'
import { makeDeleteEmployeeController } from '../factories/controllers/employee/delete-employee/delete-employee-controller-factory'
import { makeLoadEmployeeByIdController } from '../factories/controllers/employee/load-employee-by-id/load-employee-by-id-controller-factory'
import { makeLoadEmployeeController } from '../factories/controllers/employee/load-employees/load-employees-controller-factory'
import { makeUpdateEmployeeController } from '../factories/controllers/employee/update-employee/update-employee-controller-factory'
import { adminAuth } from '../middlewares/admin-auth'
import { auth } from '../middlewares/auth'

export default (route: Router): void => {
  route.post('/employees', adminAuth, adaptRoute(makeAddEmployeeController()))
  route.get('/employees', auth, adaptRoute(makeLoadEmployeeController()))
  route.get('/employee/:employeeId', auth, adaptRoute(makeLoadEmployeeByIdController()))
  route.put('/employee/:employeeId', auth, adaptRoute(makeUpdateEmployeeController()))
  route.delete('/employee/:employeeId', auth, adaptRoute(makeDeleteEmployeeController()))
}
