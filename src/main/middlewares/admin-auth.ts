import { adaptMiddleware } from '../adapter/express/express-middleware-adapter'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware'

export const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
