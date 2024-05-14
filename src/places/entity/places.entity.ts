import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  TimestampsEntity,
} from '@packages/typeorm';

@Entity('places')
export class PlacesEntity extends TimestampsEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;
}
