import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'urls' })
export class Url extends BaseEntity {
  @PrimaryGeneratedColumn()
  idAuto: number;

  @Column()
  id: string;

  @Column()
  longUrl: string;

  @Column({default: 0})
  views: number;

  constructor(id: string, longUrl: string) {
    super();
    this.id = id;
    this.longUrl = longUrl;
  }
}
