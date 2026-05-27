import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";

@Entity("tbl_01_m_p_page")
export class Page {

    @PrimaryGeneratedColumn()
    PG_Id!: number;

    @Column()
    MG_Id!: number;
    @Column()
    M_Id!: number;

    @Column()
    PG_Name!: string;

    @Column()
    Controller_Name!: string;

    @Column()
    Action_Name!: string;

    @Column()
    Page_Menu_Icon!: string;

    @Column()
    Ord_Seq!: number;

    @Column()
    Dflag!: number;

    @Column()
    Created_By!: string;

    @CreateDateColumn()
    Created_Date!: Date;

    @Column({ nullable: true })
    Modified_By!: string;

    @UpdateDateColumn()
    Modified_Date!: Date;
}