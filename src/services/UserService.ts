import dataSource from "@database/connection"

import { User } from "@models/User"
import { registerBodySchema } from "@schemas/AuthSchemas"
import { hashPassword } from "@utils/password"
import { InferType } from "yup"

export const UserService = () => {
    const userRepository = dataSource.getRepository(User)

    const findByEmail = async (email: string) => await userRepository.findOneBy({ email })

    const create = async (user: InferType<typeof registerBodySchema>) => {
        const createdUser = userRepository.create({
            ...user,
            password: hashPassword(user.password)
        })

        return await userRepository.save(createdUser)
    }

    return { create, findByEmail }
}