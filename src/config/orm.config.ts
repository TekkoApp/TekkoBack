import { DataSource, DataSourceOptions } from 'typeorm'
import postgresConfig from './postgres.config'
import * as dotenv from 'dotenv'

const ormPostgresConfig = (): DataSourceOptions => {
  dotenv.config()
  return {
    type: 'postgres',
    ...postgresConfig(),
    logging: true,
    entities: ['src/modules/**/*.entity{.ts,.js}'],
    migrations: ['src/migrations/**/*{.ts,.js}'],
  }
}

export default new DataSource(ormPostgresConfig())
