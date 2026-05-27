import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity("tbl_01_m_p_module")
export class PageModule {

    @PrimaryGeneratedColumn({
        name: "MG_Id",
    })
    mgId!: number;

    @Column({
        name: "M_Id",
        type: "int",
    })
    mId!: number;

    @Column({
        name: "M_Name",
        type: "varchar",
        length: 200,
    })
    mName!: string;

    @Column({
        name: "M_Icon",
        type: "varchar",
        length: 200,
        nullable: true,
    })
    mIcon?: string;

    @Column({
        name: "M_Order",
        type: "int",
        nullable: true,
    })
    mOrder?: number;

    @Column({
        name: "Dflag",
        default: false,
        nullable: true,
    })
    dflag?: boolean;

    @Column({
        name: "Created_By",
        type: "varchar",
        length: 50,
        nullable: true,
    })
    createdBy?: string;

    @CreateDateColumn({
        name: "Created_Date",
        type: "datetime",
    })
    createdDate!: Date;

}