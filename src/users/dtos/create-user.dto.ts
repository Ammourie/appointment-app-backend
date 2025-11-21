import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString } from 'class-validator';
export class CreateUserDto {
  @IsString()
  @ApiProperty({ example: 'John Doe' })
  fullName: string;
  @IsEmail()
  @ApiProperty({ example: 'john@example.com' })
  email: string;
  @IsNumber()
  @ApiProperty({ example: 25 })
  age: number;
}
