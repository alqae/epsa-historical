import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("Tipo_clientes")
export class ClientType {
  @PrimaryGeneratedColumn()
  id: number

  @Column("varchar", { length: 50, name: "nombre", nullable: true, default: "" })
  name: string

  @Column("text", { name: "descripcion", nullable: false, default: "" })
  description: string
}