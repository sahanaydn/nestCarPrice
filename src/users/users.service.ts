import { Injectable, NotFoundException } from '@nestjs/common';
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
  findOne(id: number) {
    //We can search not only with id but also with other variables, for example e-mail.
    //findOne is always going to return one record or null if no user is found with that given criteria.

    return this.repo.findOneBy({ id });
  }
  find(email: string) {
    //Find is going to return an array of all the different records that match that search criteria

    return this.repo.find({ where: { email } });
  }

  async update(id: number, attrs: Partial<User>) {
    //Partial is a type helper defined in TypeScript itself and partial type helper tells us that Attrs can be  any object that has at least or none some of the properties of the user class
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found ');
    }
    //if we dont assign we are going to take all the properties and values of address just copy the ddirectly over to user overriding any properties that are already there
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found ');
    }

    return this.repo.remove(user);
  }
}
