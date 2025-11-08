// src/users/users.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Delete,
  Put,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { CreateUserDto, UserResponseDto } from '../common/dto/user.dto';
import {
  SuccessResponseDto,
  ErrorResponseDto,
} from '../common/dto/api-response.dto';

@ApiTags('Users') // Groups endpoints in Swagger UI
@Controller('users')
export class UsersController {
  // In-memory dummy store for users
  private users: UserResponseDto[] = [
    {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'John Doe',
      email: 'john@example.com',
      age: 25,
      createdAt: new Date('2024-01-01T00:00:00Z'),
    },
  ];

  // small helper to create a pseudo-id for dummy data
  private makeId(): string {
    return `${Date.now().toString(16)}-${Math.floor(Math.random() * 0xffff).toString(16)}`;
  }

  // GET /users/:id
  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({
    name: 'id',
    description: 'User ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User found successfully',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
    type: ErrorResponseDto,
  })
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    const user = this.users.find((u) => u.id === id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  // GET /users?page=1&limit=10&search=john
  @Get()
  @ApiOperation({ summary: 'Get all users with pagination' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    example: 1,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    example: 10,
    description: 'Items per page',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Search term',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Users retrieved successfully',
    schema: {
      example: {
        success: true,
        result: {
          data: [
            {
              id: '123e4567-e89b-12d3-a456-426614174000',
              name: 'John Doe',
              email: 'john@example.com',
              age: 25,
              createdAt: '2024-01-01T00:00:00Z',
            },
          ],
          total: 100,
          page: 1,
          limit: 10,
        },
        error: null,
      },
    },
  })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search?: string,
  ) {
    // simple search + pagination over the in-memory list
    let filtered = this.users;
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(
        (u) => u.name.toLowerCase().includes(s) || u.email.toLowerCase().includes(s),
      );
    }

    const total = filtered.length;
    const p = Math.max(1, Number(page) || 1);
    const l = Math.max(1, Number(limit) || 10);
    const start = (p - 1) * l;
    const data = filtered.slice(start, start + l);

    return {
      data,
      total,
      page: p,
      limit: l,
    };
  }

  // POST /users
  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User created successfully',
    schema: {
      example: {
        success: true,
        result: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'John Doe',
          email: 'john@example.com',
          age: 25,
          createdAt: '2024-01-01T00:00:00Z',
        },
        error: null,
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation error',
    type: ErrorResponseDto,
  })
  async create(@Body() createUserDto: CreateUserDto) {
    const newUser: UserResponseDto = {
      id: this.makeId(),
      name: createUserDto.name,
      email: createUserDto.email,
      age: createUserDto.age,
      createdAt: new Date(),
    };

    this.users.push(newUser);
    return newUser;
  }

  // PUT /users/:id
  @Put(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User updated successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  async update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
    const idx = this.users.findIndex((u) => u.id === id);
    if (idx === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const existing = this.users[idx];
    const updated: UserResponseDto = {
      ...existing,
      name: updateUserDto.name ?? existing.name,
      email: updateUserDto.email ?? existing.email,
      age: updateUserDto.age ?? existing.age,
    };

    this.users[idx] = updated;
    return updated;
  }

  // DELETE /users/:id
  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User deleted successfully',
    schema: {
      example: {
        success: true,
        result: { message: 'User deleted successfully' },
        error: null,
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  async remove(@Param('id') id: string) {
    const idx = this.users.findIndex((u) => u.id === id);
    if (idx === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    this.users.splice(idx, 1);
    return { message: 'User deleted successfully' };
  }
}
