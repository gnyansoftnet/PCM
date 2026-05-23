import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";

@Entity("tbl_01_M_P_RoleAccess")
export class Roleaccess {

    @PrimaryGeneratedColumn()
    Id!: number;

    @Column()
    Role_Id!: number;
    @Column()
    M_Id!: number;
    @Column()
    PG_Id!: number;
    @Column()
    READ!: number;

    @Column()
    WRITE!: number;

    @Column()
    UPDATE!: number;


    @Column()
    DELETE!: number;

    @Column()
    Org_Code!: string;

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