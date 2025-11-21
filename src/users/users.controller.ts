// src/users/users.controller.ts
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { NotFoundError } from 'rxjs';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserDetailsDto } from './dtos/user-deteils.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  @Get()
  @ApiOperation({
    summary: 'List all users',
    description: 'Returns a list of all users in the system',
  })
  listAllUsers() {
    return [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'John Doe',
        email: 'john@example.com',
        age: 25,
        createdAt: new Date('2024-01-01T00:00:00Z'),
      },
    ];
  }
  @Post('/createUser')
  @ApiOperation({
    summary: 'Create a new user',
    description: 'Creates a new user in the system',
  })
  createUser(@Body() body: CreateUserDto) {
    console.log('Creating user with data:', body);
    return body;
  }

  @Get('/details')
  @ApiOperation({
    summary: 'Get user details',
    description: 'Returns the details of a specific user by ID',
  })
  getUserDetails(@Query('id') id: number) {
    let user: UserDetailsDto = {
      id: 1,
      fullName: 'John Doe',
      email: 'john@example.com',
      age: 25,
    };
    if (user.id == id) {
      return user;
    } else {
      throw new NotFoundException('User not found');
    }
  }
}
