import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";

@Entity("tbl_01_m_org")
export class Organisation {

    @PrimaryGeneratedColumn()
    Id!: number;

    @Column({ type: "varchar", length: 50, unique: true })
    Org_Code!: string;

    @Column({ type: "varchar", length: 100, unique: true })
    Org_Name!: string;

    @Column({ type: "varchar", length: 100 })
    Org_ShortName!: string;

    @Column({ type: "varchar", length: 50, nullable: true })
    Org_Reg_No?: string;

    @Column({ type: "varchar", length: 50, nullable: true })
    Org_Gst?: string;

    @Column({ type: "varchar", length: 30, nullable: true })
    TAN_No?: string;

    @Column({ type: "varchar", length: 20, nullable: true })
    Org_Pan?: string;

    @Column({ type: "varchar", length: 50, nullable: true })
    Org_Gstin_No?: string;

    @Column({ type: "datetime", nullable: true })
    Org_FinancialYear?: Date;

    @Column({ type: "varchar", length: 20, nullable: true })
    Org_EnableTDSDeduction?: string;

    @Column({ type: "varchar", length: 20, nullable: true })
    Org_TDSDeductionType?: string;

    @Column({ type: "varchar", length: 50, nullable: true })
    Org_Distritct_No?: string;

    @Column({ type: "varchar", length: 50, nullable: true })
    Org_City?: string;

    @Column({ type: "varchar", length: 10, nullable: true })
    Org_State_Code?: string;

    @Column({ type: "varchar", length: 10, nullable: true })
    Org_Pin?: string;

    @Column({ type: "varchar", length: 20, nullable: true })
    Org_Phone?: string;

    @Column({ type: "varchar", length: 100, nullable: true })
    Org_Email?: string;

    @Column({ type: "text", nullable: true })
    Org_Registered_Address?: string;

    @Column({ type: "varchar", length: 50, nullable: true })
    DocumentType?: string;

    @Column({ type: "varchar", length: 100, nullable: true })
    Document?: string;

    @Column({ type: "datetime", nullable: true })
    Org_Charter_Date?: Date;

    @Column({ type: "varchar", length: 100, nullable: true })
    Org_Location?: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    Org_Logo?: string;

    @Column({ type: "varchar", length: 20, nullable: true })
    Enable_TDS_Deduction?: string;

    @Column({ type: "varchar", length: 50, nullable: true })
    Deductor_Type?: string;

    @Column({ type: "text" })
    Address!: string;

    @Column({ type: "varchar", length: 20, nullable: true })
    ContactNo1?: string;

    @Column({ type: "varchar", length: 20, nullable: true })
    FaxNo?: string;

    @Column({ type: "varchar", length: 100, nullable: true })
    Email1?: string;

    @Column({ type: "varchar", length: 100, nullable: true })
    website?: string;

    @Column({ type: "varchar", length: 50, nullable: true })
    ServiceTax?: string;

    @Column({ type: "varchar", length: 30, nullable: true })
    TanNo?: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    Dept_Logo?: string;

    @Column({ type: "varchar", length: 50, nullable: true })
    Cash_Acnt_No?: string;

    @Column({ type: "varchar", length: 20, nullable: true })
    Tin_No?: string;

    @Column({ type: "int", default: 0 })
    Dflag!: number;

    @Column({ type: "varchar", length: 50, nullable: true })
    Created_By?: string;

    @CreateDateColumn()
    Created_Date!: Date;

    @Column({ type: "varchar", length: 50, nullable: true })
    Modified_By?: string;

    @UpdateDateColumn()
    Modified_Date!: Date;
}