import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("HistoricoConsumos", { synchronize: false })
export class ConsumptionHistory {
  @PrimaryGeneratedColumn()
  id: number;
  @Column("decimal", { name: "idTipCliente", nullable: false, default: 0 })
  clientId: number;
  @Column("decimal", { name: "idLinea", nullable: false, default: 0 })
  lineId: number;
  @Column("decimal", { name: "Consumo", nullable: false, default: 0 })
  consumption: number;
  @Column("decimal", { name: "Perdida", nullable: false, default: 0 })
  loss: number;
  @Column("decimal", { name: "Costo", nullable: false, default: 0 })
  cost: number;
  @Column("date", { name: "fecha", nullable: false, default: 0 })
  date: string;
}
