import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
} from "typeorm";

@Entity("tbl_01_v_master")
export class VehicleType {

    @PrimaryGeneratedColumn({
        name: "Id",
    })
    id!: number;

    @Column({
        name: "V_Name",
        type: "varchar",
        length: 100,
    })
    vName!: string;
}