import {
  Controller,
  Post,
  Body,
  Patch,
  Get,
  Param,
  Query,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    console.log(body);
    this.usersService.create(body.email, body.password);
  }
  @Get('/:id')
  findUser(@Param('id') id: string) {
    //The id in the URL comes as a string, but since the id in the service is a type number We made a type conversion
    return this.usersService.findOne(parseInt(id));
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    // example Get request  http://localhost:3000/auth?email=temp@email.com
    return this.usersService.find(email);
  }
  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    //The id in the URL comes as a string, but since the id in the service is a type number We made a type conversion

    return this.usersService.remove(parseInt(id));
  }
}
