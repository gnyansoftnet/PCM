import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity("tbl_01_m_vehicle")
export class Vehicle {

    @PrimaryGeneratedColumn({
        name: "Vehicle_Id",
    })
    vehicleId!: number;

    @Column({
        name: "Vehicle_No",
        type: "varchar",
        length: 50,
        nullable: true,
    })
    vehicleNo?: string;

    @Column({
        name: "Vehicle_Type",
        type: "varchar",
        length: 50,
    })
    vehicleType!: string;

    @Column({
        name: "V_Model",
        type: "varchar",
        length: 50,
        nullable: true,
    })
    vModel?: string;

    @Column({
        name: "Vehicle_OwnerName",
        type: "varchar",
        length: 50,

    })
    vehicleOwnerName!: string;

    @Column({
        name: "Vehicle_Capacity",
        type: "varchar",
        length: 50,

    })
    vehicleCapacity!: string;

    @Column({
        name: "Case_Approx",
        type: "int",

    })
    caseApprox!: number;

    @Column({
        name: "Fin_Year",
        type: "varchar",
        length: 50,
        nullable: true,
    })
    finYear?: string;

    @Column({
        name: "Org_Code",
        type: "varchar",
        length: 50,

    })
    orgCode!: string;

    @Column({
        name: "Created_By",
        type: "varchar",
        length: 50,

    })
    createdBy!: string;

    @CreateDateColumn({
        name: "Created_Date",
        type: "datetime",
    })
    createdDate!: Date;

    @Column({
        name: "Modified_By",
        type: "varchar",
        length: 50,
        nullable: true,
    })
    modifiedBy?: string;

    @UpdateDateColumn({
        name: "Modified_Date",
        type: "datetime",
    })
    modifiedDate!: Date;

    @Column({
        name: "Dflag",
        type: "int",
        nullable: true,
        default: false,
    })
    dflag?: boolean;
}