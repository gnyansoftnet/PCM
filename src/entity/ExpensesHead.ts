import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    UpdateDateColumn,
    CreateDateColumn,
} from "typeorm";

@Entity("Tbl_01_M_Expenses_Head")
export class ExpensesHead {

    @PrimaryGeneratedColumn({
        name: "Head_Id"
    })
    headId!: number;

    @Column({
        name: "Head_Name",
        type: "varchar",
        unique: true,
    })
    headName!: string;

    @Column({
        name: "Applicable_For",
        type: "varchar",
        length: 50,
        nullable: true
    })
    applicableFor?: string;

    @Column({
        name: "Default_Limit",
        type: "varchar",
        length: 50,
        nullable: true
    })
    defaultLimit?: string;

    @Column({
        name: "Fin_Year",
        type: "varchar",
        length: 50,
        nullable: true
    })
    finYear?: string;

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

    @CreateDateColumn({
        name: "Created_Date",
        type: "datetime",

    })
    createdDate?: Date;

    @Column({
        name: "Modified_By",
        type: "varchar",
        length: 50,
    })
    modifiedBy?: string;

    @UpdateDateColumn({
        name: "Modified_Date",
        type: "datetime",

    })
    modifiedDate?: Date;

    @Column({
        name: "Dflag",
        type: "boolean",
        default: false
    })
    dflag!: boolean;
}