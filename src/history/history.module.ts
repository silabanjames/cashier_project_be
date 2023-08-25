import { Module } from '@nestjs/common';
import { HistoryService } from './services/history/history.service';
import { HistoryController } from './controllers/history/history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from 'src/typeorm/entities/History';

@Module({
  imports: [TypeOrmModule.forFeature([History])],
  providers: [HistoryService],
  controllers: [HistoryController]
})
export class HistoryModule {}
