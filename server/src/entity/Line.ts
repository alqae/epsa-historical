import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("Lineas")
export class Line {
  @PrimaryGeneratedColumn()
  id: number

  @Column("varchar", { name: "nombre", length: 50, nullable: false, default: '' })
  name: string

  @Column("text", { name: "descripcion", nullable: false, default: '' })
  description: string
}
