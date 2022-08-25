import { DataSource } from 'typeorm'

const config: any = {
    type: 'postgres',
    host: 'plrfacildb',
    port: 5432,
    migrations: [
        `${__dirname}/../database/migrations/*.ts`
    ],
    entities: [
        `${__dirname}/../models/*.ts`
    ],
    cli: {
        migrationsDir: `${__dirname}/../database/migrations/*.ts`
    },
    database: 'plrfacildb',
    username: 'postgres',
    password: 'changeme'
}

export default new DataSource(config)