import { Request, Response } from "express"
import { flatten, forEach, isNil, keys, map, mergeAll, pick, pickAll, pipe, tap } from "ramda"

export const ResponseController = (request: Request, response: Response) => {

    const serializeObject = (schema: any) => (obj: any) => map((k: any) => {
        const picked = pick([k])(obj)
        const currentSchemaType = schema.fields[k].type
        if (currentSchemaType === 'date' || currentSchemaType === 'number' || currentSchemaType === 'string' || currentSchemaType === 'boolean') {
            return picked
        } else if (typeof picked[k] === 'object' && !isNil(obj[k])) {
            const d: any = {}
            const nestedSerializeObject = Array.isArray(picked[k]) ? serializeObject(schema.fields[k].innerType) : serializeObject(schema.fields[k])
            d[keys(picked)[0]] = Array.isArray(picked[k]) ? map(pk => mergeAll(nestedSerializeObject(pk)))(picked[k]) : mergeAll(nestedSerializeObject(picked[k]))
            return d
        } else {
            return picked
        }
    })(keys(schema.fields))

    const mergeAllDeep = (schema: any) => (obj: any) => {
        const compactedObject = obj

        forEach((k: any) => {

            const isObjArray = Array.isArray(obj[k])

            if (isObjArray && schema.fields[k] === 'array') {
                return obj[k]
            } else if (isObjArray && schema.fields[k] !== 'array') {
                compactedObject[k] = mergeAll(obj[k])
            } else {
                compactedObject[k] = obj[k]
            }
        })(keys(obj))

        return compactedObject
    }

    const serializePipe = (schema: any) => pipe(
        serializeObject(schema),
        flatten,
        mergeAll,
        mergeAllDeep(schema),
    )

    const serialize = <SchemaType>(schema: any) => async (data: any): Promise<SchemaType | SchemaType[]> => {
        const serializeFlow = serializePipe(schema)
        return Array.isArray(data) ? map(serializeFlow)(data) : serializeFlow(data)
    }

    const ok = (data: object) => response.status(200).json(data)

    const notFound = (message: string) => response.status(404).json({ message })

    const forbidden = (message: string = 'You don\'t have permission') => response.status(403).json({ message })

    const conflict = (message: string) => response.status(409).json({ message })

    const internalError = () => response.status(500).json({ message: 'Internal Server Error ' })

    return { serialize, ok, notFound, forbidden, conflict, internalError }
}