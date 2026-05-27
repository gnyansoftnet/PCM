import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
} from "typeorm";

@Entity("tbl_01_m_opening_balance")
export class OpeningBalance {

    @PrimaryGeneratedColumn({
        name: "OB_Id"
    })
    obId!: number;

    @Column({
        name: "OB_Date",
        type: "datetime",
        nullable: true
    })
    obDate?: Date;

    @Column({
        name: "OB_Amount",
        type: "decimal",
        precision: 18,
        scale: 2,
        nullable: true
    })
    obAmount?: number;

    @Column({
        name: "Closing_Balance",
        type: "decimal",
        precision: 18,
        scale: 2,
        nullable: true
    })
    closingBalance?: number;

    @Column({
        name: "Remarks",
        type: "varchar",
        length: 100,
        nullable: true
    })
    remarks?: string;

    @Column({
        name: "Org_Code",
        type: "varchar",
        length: 50,
        nullable: true
    })
    orgCode?: string;

    @Column({
        name: "Created_By",
        type: "varchar",
        length: 50,
        nullable: true
    })
    createdBy?: string;

    @Column({
        name: "Created_Date",
        type: "datetime",
        nullable: true
    })
    createdDate?: Date;

    @Column({
        name: "Modified_By",
        type: "varchar",
        length: 50,
        nullable: true
    })
    modifiedBy?: string;

    @Column({
        name: "Modified_Date",
        type: "datetime",
        nullable: true
    })
    modifiedDate?: Date;

    @Column({
        name: "Dflag",
        type: "int",
        default: 0
    })
    dflag!: number;

    @Column({
        name: "Fin_Year",
        type: "varchar",
        length: 50,
        nullable: true
    })
    finYear?: string;
}