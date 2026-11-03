import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Faculties } from './entities/faculties.entity.js';
import { CreateFacultyDto } from './dtos/create-faculty.dto.js';

@Injectable()
export class FacultiesService {
  constructor(
    @InjectRepository(Faculties)
    private readonly facultiesRepo: Repository<Faculties>,
  ) {}

  async createFaculty(faculty: CreateFacultyDto): Promise<Faculties | string> {
    try {
      const facultyObj = this.facultiesRepo.create(faculty);
      return await this.facultiesRepo.save(facultyObj);
    } catch {
      throw new BadRequestException('faculty creation failed');
    }
  }

  async getAllFaculties(): Promise<Faculties[]> {
    return await this.facultiesRepo.find();
  }

  async getFacultyById(id: string): Promise<Faculties | string> {
    const faculty = await this.facultiesRepo.findOne({
      where: { Id: id },
    });
    if (faculty) {
      return faculty;
    } else {
      return `faculty with id ${id} not found`;
    }
  }
}
