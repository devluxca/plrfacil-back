import { TableColumnOptions } from "typeorm/schema-builder/options/TableColumnOptions"

export const id = {
    name: 'id',
    type: 'integer',
    isPrimary: true,
    isGenerated: true,
    generationStrategy: 'increment',
    isNullable: false,
}

export const deleted = {
    name: 'deleted',
    type: 'boolean',
    default: false,
    isNullable: false
}

export const createdAt = {
    name: 'createdAt',
    type: 'timestamp',
    default: 'NOW()',
    isNullable: false
}

export const updatedAt = {
    name: 'updatedAt',
    type: 'timestamp',
    default: 'NOW()',
    isNullable: false
}

export default [
    id, deleted, createdAt, updatedAt
] as TableColumnOptions[]