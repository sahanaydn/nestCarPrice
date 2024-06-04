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
  Session,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user-dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    console.log(body);
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    console.log(session);

    return user;
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }
  //it is returning curent user
  //@Get('/whoami')
  //whoAmI(@Session() session: any) {
  //return this.usersService.findOne(session.userId);
  //return session.userId;
  //}
  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }

  //Custom Param Decorator
  @Get('/whoami')
  whoAmI(@CurrentUser() user: string) {
    return user;
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
