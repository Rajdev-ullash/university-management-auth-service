import express, { Application, Request, Response } from 'express'
import cors from 'cors'
const app: Application = express()
import usersRoute from './app/modules/users/users.route'

app.use(cors())

//parsers
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Application routes

app.use('/api/v1/users/', usersRoute)

//test route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app
