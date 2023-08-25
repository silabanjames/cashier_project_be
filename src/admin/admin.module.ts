import { Module } from '@nestjs/common';
import { AdminController } from './controllers/admin/admin.controller';
import { AdminService } from './services/admin/admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/typeorm/entities/Product';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
