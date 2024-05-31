import {
  Controller,
  Post,
  Body,
  Patch,
  Get,
  Param,
  Query,
  Delete,
  NotFoundException,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user-dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    console.log(body);
    this.usersService.create(body.email, body.password);
  }
  //@UseInterceptors(new SerializerInterceptor(UserDto))
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    //The id in the URL comes as a string, but since the id in the service is a type number We made a type conversion
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found ');
    }
    return user;
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
  @Patch('/:id')
  //We need two parameters. one of them is id and other one is new data (body)
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }
}
