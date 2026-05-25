import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";

@Entity("tbl_01_M_Org")
export class Organisation {

    @PrimaryGeneratedColumn()
    Id!: number;

    @Column({ unique: true })
    Org_Code!: string;

    @Column({ unique: true })
    Org_Name!: string;

    @Column({ nullable: false })
    Org_ShortName!: string;

    @Column({ nullable: true })
    Org_Reg_No?: string;

    @Column({ nullable: true })
    Org_Gst?: string;

    @Column({ nullable: true })
    TAN_No?: string;

    @Column({ nullable: true })
    Org_Pan?: string;

    @Column({ nullable: true })
    Org_Gstin_No?: string;

    @Column({ type: "datetime", nullable: true })
    Org_FinancialYear?: Date;

    @Column({ nullable: true })
    Org_EnableTDSDeduction?: string;

    @Column({ nullable: true })
    Org_TDSDeductionType?: string;

    @Column({ nullable: true })
    Org_Distritct_No?: string;

    @Column({ nullable: true })
    Org_City?: string;

    @Column({ nullable: true })
    Org_State_Code?: string;

    @Column({ nullable: true })
    Org_Pin?: string;

    @Column({ nullable: true })
    Org_Phone?: string;

    @Column({ nullable: true })
    Org_Email?: string;

    @Column({ nullable: true })
    Org_Registered_Address?: string;

    @Column({ nullable: true })
    DocumentType?: string;

    @Column({ nullable: true })
    Document?: string;

    @Column({ type: "datetime", nullable: true })
    Org_Charter_Date?: Date;

    @Column({ nullable: true })
    Org_Location?: string;

    @Column({ nullable: true })
    Org_Logo?: string;

    @Column({ nullable: true })
    Enable_TDS_Deduction?: string;

    @Column({ nullable: true })
    Deductor_Type?: string;

    @Column({ nullable: false })
    Address!: string;

    @Column({ nullable: true })
    ContactNo1?: string;

    @Column({ nullable: true })
    FaxNo?: string;

    @Column({ nullable: true })
    Email1?: string;

    @Column({ nullable: true })
    website?: string;

    @Column({ nullable: true })
    ServiceTax?: string;

    @Column({ nullable: true })
    TanNo?: string;

    @Column({ nullable: true })
    Dept_Logo?: string;

    @Column({ nullable: true })
    Cash_Acnt_No?: string;

    @Column({ nullable: true })
    Tin_No?: string;

    @Column({ default: false })
    Dflag!: number;

    @Column({ nullable: true })
    Created_By?: string;

    @CreateDateColumn()
    Created_Date!: Date;

    @Column({ nullable: true })
    Modified_By?: string;

    @UpdateDateColumn()
    Modified_Date!: Date;
}
