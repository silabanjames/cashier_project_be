import { Controller, Get } from '@nestjs/common';
import { HistoryService } from 'src/history/services/history/history.service';
import { History } from 'src/typeorm/entities/History';

@Controller('history')
export class HistoryController {
    constructor(private readonly historyService: HistoryService) {}

    @Get()
    getHistory(): Promise<{data: History[]}>{
        return this.historyService.getHistory();
    }
}
