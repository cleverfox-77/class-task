import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('faculties')
export class Faculties {
  @PrimaryColumn({
    type: 'varchar',
    length: 50,
  })
  Id: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  Name: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  expertise: string;

  @Column({
    type: 'int',
  })
  noOfPublication: number;
}
