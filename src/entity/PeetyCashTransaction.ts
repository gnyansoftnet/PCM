import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
} from "typeorm";

@Entity("Peety_Cash_All_Transaction")
export class PeetyCashTransaction {

    @PrimaryGeneratedColumn({
        name: "Tran_Id"
    })
    tranId!: number;

    @Column({
        name: "Tran_No",
        type: "varchar",
        length: 50,
        nullable: true
    })
    tranNo?: string;

    @Column({
        name: "Tran_Date",
        type: "datetime",
        nullable: true
    })
    tranDate?: Date;

    @Column({
        name: "Voucher_No",
        type: "varchar",
        length: 50,
        nullable: true
    })
    voucherNo?: string;

    @Column({
        name: "Tran_Desc",
        type: "varchar",
        length: 50,
        nullable: true
    })
    tranDesc?: string;

    @Column({
        name: "In_Amount",
        type: "decimal",
        precision: 18,
        scale: 2,
        nullable: true
    })
    inAmount?: number;

    @Column({
        name: "Out_Amount",
        type: "decimal",
        precision: 18,
        scale: 2,
        nullable: true
    })
    outAmount?: number;

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
        name: "Org_Code",
        type: "varchar",
        length: 50,
        nullable: true
    })
    orgCode?: string;

    @Column({
        name: "Fin_Year",
        type: "varchar",
        length: 50,
        nullable: true
    })
    finYear?: string;
}