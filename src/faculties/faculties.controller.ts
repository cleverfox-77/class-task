import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FacultiesService } from './faculties.service.js';
import { Faculties } from './entities/faculties.entity.js';
import { CreateFacultyDto } from './dtos/create-faculty.dto.js';

@Controller('faculties')
export class FacultiesController {
  constructor(private readonly facultiesService: FacultiesService) {}

  @Post('create-faculty')
  async createFaculty(
    @Body() faculty: CreateFacultyDto,
  ): Promise<Faculties | string> {
    return await this.facultiesService.createFaculty(faculty);
  }

  @Get('getAllFaculties')
  async getAllFaculties(): Promise<Faculties[]> {
    return await this.facultiesService.getAllFaculties();
  }

  @Get('findFacultyById/:id')
  async getFacultyById(@Param('id') id: string): Promise<Faculties | string> {
    return await this.facultiesService.getFacultyById(id);
  }

  @Get()
  async getAll(): Promise<Faculties[]> {
    return await this.facultiesService.getAllFaculties();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Faculties | string> {
    return await this.facultiesService.getFacultyById(id);
  }
}
