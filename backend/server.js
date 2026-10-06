import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongodb from 'mongodb'
import Createrouter from './routesXMiddlewares/criar.js'
import deleteRoute from './routesXMiddlewares/deletar.js'
import updateRouter from './routesXMiddlewares/atualizar.js'
dotenv.config()
const app = express()
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173"
}))
app.use('/criar',Createrouter)
app.use('/deletar',deleteRoute)
app.use('/atualizar',updateRouter)
app.listen(3001)