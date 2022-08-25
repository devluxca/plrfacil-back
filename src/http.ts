import 'reflect-metadata'

import express from 'express'
import http from 'http'

import dotenv from 'dotenv-safe'

import cors from 'cors'
import helmet from 'helmet'

import dataSource from './database/connection'

import routes from './routes'


dotenv.config()

const app = express()

app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
}))

app.use(helmet())
app.use(express.json())
app.use('/api/v1', routes)

dataSource.initialize()
    .then(() => {
        console.log('Data source has been initialized!')
    }).catch(err => {
        console.error(`Error during data source initialization: ${err}`)
    })

const serverHttp = http.createServer(app)

export { serverHttp }