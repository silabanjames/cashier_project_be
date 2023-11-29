import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { History } from 'src/typeorm/entities/History';

@Injectable()
export class HistoryService {
    constructor(
        @InjectRepository(History) private readonly historyRepository: Repository<History>,
    ){}

    async getHistory(): Promise<{data: History[]}>{
        try{
            const history = await this.historyRepository.find({relations: ['product']});
            return{
                data: history,
            }
        }
        catch(e){
            throw new InternalServerErrorException(e);
        }
    }
}
