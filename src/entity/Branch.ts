import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity("tbl_01_M_Branch")
export class Branch {

    @PrimaryGeneratedColumn()
    Id!: number;

    @Column()
    Branch_Code!: string;

    @Column({ unique: true })
    Branch_Name!: string;

    @Column()
    Branch_ShortName!: string;

    @Column()
    Org_Code!: string;

    @Column({ nullable: true })
    Branch_Gst?: string;

    @Column({ nullable: true })
    State_Code?: string;

    @Column({ nullable: true })
    City?: string;

    @Column({ nullable: true })
    Pin?: string;

    @Column({ nullable: true })
    Location?: string;

    @Column({ nullable: true })
    Address2?: string;

    @Column({ nullable: true })
    Address3?: string;

    @Column({ nullable: true })
    Created_By?: string;

    @CreateDateColumn({
        type: "datetime",
    })
    Created_Date!: Date;

    @Column({ nullable: true })
    Modified_By?: string;

    @UpdateDateColumn({
        type: "datetime",
    })
    Modified_Date!: Date;

    @Column({ default: false })
    Dflag?: boolean;

    @Column({ nullable: true })
    IsMainBranch?: string;
}