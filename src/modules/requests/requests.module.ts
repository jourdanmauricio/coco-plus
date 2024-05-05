import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { Request } from 'src/entities/request.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Request])],
  controllers: [RequestsController],
  providers: [RequestsService],
})
export class RequestsModule {}
