import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { privateEncrypt } from 'crypto';
import { Repository } from 'typeorm';
import { User } from './typeorm/entities/User';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
