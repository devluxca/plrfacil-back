import * as yup from 'yup'

export const registerBodySchema = yup.object({
    name: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required()
})

export const RRegisterSchema = yup.object({
    body: registerBodySchema
})