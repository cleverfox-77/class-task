import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFacultyDto {
  @IsNotEmpty()
  @IsString()
  Id: string;

  @IsNotEmpty()
  @IsString()
  Name: string;

  @IsNotEmpty()
  @IsString()
  expertise: string;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  noOfPublication: number;
}
