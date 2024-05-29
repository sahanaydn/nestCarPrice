import { Expose } from 'class-transformer';

export class UserDto {
  //Inside of our DTOs we are going to explicitly say here are the properties i want to be sent out of inside of responses so we are gonna use that EXPOSE decorater

  @Expose()
  id: number;
  @Expose()
  email: string;
}
