import Router, { Request, Response } from 'express'

import { authController } from '@controllers/AuthController'

import { RRegisterSchema } from '@schemas/AuthSchemas'

const route = Router()

const validate = (schema) => async (req, res, next) => {
    try {
        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params,
            files: req.files
        })
        return next()
    } catch (err) {
        return res.status(400).json({ type: err.name, message: err.message })
    }
}

const renderController = (controller: any, method: string) => async (request: Request, response: Response) => controller(request, response)[method]()

route.get('/status', (request: Request, response: Response) => {
    return response.status(200).json({
        status: 'available'
    })
})

route.post('/register', [validate(RRegisterSchema)], renderController(authController, 'register'))

export default route