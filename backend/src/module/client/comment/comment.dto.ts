import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CommentDto {
  @IsString()
  @IsNotEmpty()
  userid: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  comments: string;

  @IsNotEmpty()
  create_at?: Date;
}
export class UpdateDto {
  @IsString()
  @IsOptional()
  userid: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  comments: string;

  @IsString()
  @IsOptional()
  create_at?: Date;
}
