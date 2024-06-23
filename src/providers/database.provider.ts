import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { join } from 'path'
import ormConfig from './../config/orm.config'

const getDatabaseProvider = (): TypeOrmModuleOptions => {
  const commonOrmConfiguration: Partial<TypeOrmModuleOptions> = {
    ...ormConfig.options,
    entities: [join(__dirname, '..', '/modules/**/*.entity{.ts,.js}')],
    migrations: [join(__dirname, '..', '/migrations/**/*{.ts,.js}')],
    migrationsRun: true,
    autoLoadEntities: true,
    synchronize: true
  }

  return commonOrmConfiguration
}

export default getDatabaseProvider
