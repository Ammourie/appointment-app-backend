// src/common/dto/api-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class ErrorDto {
  @ApiProperty({ example: 400 })
  errorCode: number;

  @ApiProperty({ example: 'Validation failed' })
  errorMessage: string;
}

export class ApiResponseDto<T> {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ type: 'object', nullable: true, additionalProperties: true })
  result: T | null;

  @ApiProperty({ type: ErrorDto, nullable: true })
  error: ErrorDto | null;
}

// Success response helper
export class SuccessResponseDto<T> {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty()
  result: T;

  @ApiProperty({ example: null, nullable: true })
  error: null;
}

// Error response helper
export class ErrorResponseDto {
  @ApiProperty({ example: false })
  success: boolean;

  @ApiProperty({ example: null, nullable: true })
  result: null;

  @ApiProperty({ type: ErrorDto })
  error: ErrorDto;
}