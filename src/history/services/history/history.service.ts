import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { History } from 'src/typeorm/entities/History';

@Injectable()
export class HistoryService {
    constructor(
        @InjectRepository(History) private readonly historyRepository: Repository<History>,
    ){}

    async getHistory(){
        return await this.historyRepository.find();
    }
}