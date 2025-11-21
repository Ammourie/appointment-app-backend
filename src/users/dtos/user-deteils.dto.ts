import { ApiProperty } from '@nestjs/swagger';

export class UserDetailsDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  fullName: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  age: number;
}
