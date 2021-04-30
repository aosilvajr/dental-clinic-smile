import 'module-alias/register'
import express from 'express'

const app = express()
app.listen(5000, () => console.log('Server running port 5000'))
