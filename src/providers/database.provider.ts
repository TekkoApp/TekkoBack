import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { join } from 'path'
import ormConfig from './../config/orm.config'
import { Location } from './../modules/location/location.entity'
import { Client } from './../modules/client/client.entity'
import { Supplier } from './../modules/supplier/supplier.entity'
import { User } from './../modules/user/user.entity'
import BaseEntity from './../modules/base/base.entity'
import Delivery from './../modules/delivery/delivery.entity'
import { Service } from './../modules/service/service.entity'

const getDatabaseProvider = (): TypeOrmModuleOptions => {
  const commonOrmConfiguration: Partial<TypeOrmModuleOptions> = {
    ...ormConfig.options,
    entities: [Location,Client,Supplier,User,BaseEntity,Delivery,Service],
    migrations: [join(__dirname, '..', 'migrations/**/*{.ts,.js}')],
    migrationsRun: true,
    autoLoadEntities: true,
    synchronize: false
  }

  return commonOrmConfiguration
}

export default getDatabaseProvider
