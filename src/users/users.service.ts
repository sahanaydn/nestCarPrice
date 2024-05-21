import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    //turn into an instance of a user entity and then make use of the users repository to actually save this new user our database
    //dont forget respository is created for us automatically by TYPE ORM.
    //create komutu database'e birsey kaydetmez onun yerine elimizdeki verilerle bir entity olusturur ve bu entity repository tarafindan kullanilir.
    const user = this.repo.create({ email, password });
    //repository'e entity parametresi verirsek user entitydeki hooklar calisacak ancak plain object verirsek user entitydeki hookslar calismayacak
    return this.repo.save({ email, password });
  }
}
