import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
//i can generate salt with randomBytes
//scrypt is our hashing function
const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    //see if email is in use
    const users = await this.userService.find(email);
    if (users.length) {
      throw new BadRequestException('email  is already used');
    }
    //hash the users password
    //Genrrate a salt
    const salt = randomBytes(8).toString('hex');
    //Hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    //join the hashed result and the salt together
    const result = salt + '.' + hash.toString('hex');
    //create a new user and save it
    const user = await this.userService.create(email, result);
    //return the user
    return user;
  }
  signin() {}
}
