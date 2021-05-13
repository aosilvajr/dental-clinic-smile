import { adaptMiddleware } from '../adapter/express/express-middleware-adapter'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware'

export const auth = adaptMiddleware(makeAuthMiddleware())
