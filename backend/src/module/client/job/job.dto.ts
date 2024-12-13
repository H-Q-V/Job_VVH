import {
  IsString,
  IsNotEmpty,
  ArrayMinSize,
  IsArray,
  // IsOptional,
  IsBoolean,
} from 'class-validator';

export class JobDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  company: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  salary: string;

  // @IsOptional()
  @IsString()
  @IsNotEmpty()
  logo?: string;

  @IsArray()
  @ArrayMinSize(1, { message: 'At least one benefit is required' })
  @IsString({ each: true })
  @IsNotEmpty()
  benefits: string[];

  @IsString()
  @IsNotEmpty()
  jobDescription: string;

  @IsString()
  @IsNotEmpty()
  jobRequest: string;

  @IsArray()
  @ArrayMinSize(1, { message: 'At least one programming language is required' })
  @IsString({ each: true })
  @IsNotEmpty()
  programmingLanguages: string[];

  @IsBoolean()
  isUrgent: boolean;
}
