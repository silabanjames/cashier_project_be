import { Controller, Get } from '@nestjs/common';
import { HistoryService } from 'src/history/services/history/history.service';

@Controller('history')
export class HistoryController {
    constructor(private readonly historyService: HistoryService) {}

    @Get()
    getHistory(){
        return this.historyService.getHistory();
    }
}
