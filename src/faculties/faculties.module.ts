import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Faculties } from './entities/faculties.entity.js';
import { FacultiesController } from './faculties.controller.js';
import { FacultiesService } from './faculties.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Faculties])],
  controllers: [FacultiesController],
  providers: [FacultiesService],
  exports: [FacultiesService],
})
export class FacultiesModule {}
