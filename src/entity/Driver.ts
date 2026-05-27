import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";

@Entity("tbl_01_m_driver")
export class Driver {

    @PrimaryGeneratedColumn()
    Driver_Id!: number;

    @Column({ type: "varchar", length: 50 })
    Driver_Name!: string;

    @Column({ type: "varchar", length: 50 })
    Driver_License_No!: string;

    @Column({ type: "varchar", length: 50 })
    Driver_Phone_No!: string;

    @Column({ type: "varchar", length: 50, nullable: true })
    Driver_Type!: string;

    @Column({ type: "varchar", length: 50, nullable: true })
    Fin_Year!: string;

    @Column({ type: "varchar", length: 50 })
    Org_Code!: string;

    @Column({ type: "varchar", length: 50 })
    Created_By!: string;

    @CreateDateColumn()
    Created_Date!: Date;

    @Column({ type: "varchar", length: 50, nullable: true })
    Modified_By!: string;

    @UpdateDateColumn()
    Modified_Date!: Date;

    @Column({ type: "int", default: 0 })
    Dflag!: number;
}