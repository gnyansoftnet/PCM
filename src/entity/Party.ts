import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";

@Entity("Tbl_01_M_Party")
export class Party {

    @PrimaryGeneratedColumn()
    Party_Id!: number;

    @Column({ type: "varchar", length: 50, unique: true })
    Party_Code!: string;

    @Column({ type: "varchar", length: 50 })
    Party_Name!: string;

    @Column({ type: "varchar", length: 100, nullable: true })
    Party_Address!: string;

    @Column({ type: "varchar", length: 50, unique: true })
    Party_GSTIN!: string;

    @Column({ type: "varchar", length: 50, nullable: true })
    Contact_Person!: string;

    @Column({ type: "varchar", length: 50, unique: true })
    Phone_No!: string;

    @Column({ type: "varchar", length: 50, nullable: true })
    Email!: string;

    @Column({ type: "varchar", length: 50, unique: true })
    SAPERP_Code!: string;

    @Column({ type: "int" })
    Route_Id!: number;

    @Column({ type: "varchar", length: 50, nullable: true })
    Fin_Year!: string;

    @Column({ type: "varchar", length: 50 })
    Org_Code!: string;

    @Column({ type: "varchar", length: 50 })
    Created_By!: string;

    @CreateDateColumn({ type: "datetime" })
    Created_Date!: Date;

    @Column({ type: "varchar", length: 50, nullable: true })
    Modified_By!: string;

    @UpdateDateColumn({ type: "datetime", nullable: true })
    Modified_Date!: Date;

    @Column({ type: "int", default: 0 })
    Dflag!: number;
}