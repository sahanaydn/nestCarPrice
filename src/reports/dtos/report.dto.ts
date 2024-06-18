import { Expose, Transform } from 'class-transformer';
import { User } from 'src/users/user.entity';

export class ReportDto {
  @Expose()
  id: number;
  @Expose()
  price: number;
  @Expose()
  year: number;
  @Expose()
  lng: number;
  @Expose()
  lat: number;
  @Expose()
  mileage: number;
  @Expose()
  make: string;
  @Expose()
  model: string;
  // @Transform(({ obj }) => obj.user.id)
  // @Expose()
  // userId: number;
  @Transform(({ obj }) => (obj.user ? obj.user.id : null))
  @Expose()
  userId: number;

  @Expose()
  approved: boolean;
}
