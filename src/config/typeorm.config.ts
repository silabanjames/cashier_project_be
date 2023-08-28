import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Cart } from "src/typeorm/entities/Cart";
import { Product } from "src/typeorm/entities/Product";
import { User } from "src/typeorm/entities/User";
import { History } from "src/typeorm/entities/History";
import { RefreshToken } from "src/typeorm/entities/RefreshToken";

export const typeOrmConfig : TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'cashier_project',
    entities: [User, Product, History, Cart, RefreshToken],
    synchronize: true,
}