import { Router } from 'express'

import { adaptRoute } from '../adapter/express/express-route-adapter'
import { makeAddPatientController } from '../factories/controllers/patient/add-patient/add-patient-controller-factory'
import { adminAuth } from '../middlewares/admin-auth'

export default (route: Router): void => {
  route.post('/patients', adminAuth, adaptRoute(makeAddPatientController()))
}
