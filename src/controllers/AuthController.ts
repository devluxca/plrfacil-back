import { Request, Response } from 'express'
import { InferType } from 'yup'

import { ResponseController } from '@controllers/ResponseController'

import { UserService } from "@services/UserService"
import { userSchema } from '@schemas/UserSchemas'

export const authController = (request: Request, response: Response) => {
    const userService = UserService()
    const responseController = ResponseController(request, response)

    const register = async () => {
        const responseSerialize = responseController.serialize<InferType<typeof userSchema>>(userSchema)

        const hasUser = await userService.findByEmail(request.body.email)
        if (hasUser) return responseController.conflict('User with this email already exist')

        const createdUser = await userService.create(request.body)
        const parsedUser = await responseSerialize(createdUser)

        return responseController.ok(parsedUser)
    }

    return { register }
} 