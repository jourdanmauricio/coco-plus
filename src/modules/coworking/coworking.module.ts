import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { CoworkingService } from './coworking.service';
import { CoworkingController } from './coworking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coworking } from 'src/entities/coworking.entity';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Coworking])],
  controllers: [CoworkingController],
  providers: [CoworkingService],
})
export class CoworkingModule {}
