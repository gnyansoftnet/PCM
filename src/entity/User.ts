import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from "typeorm";
import { Token } from "./Token";
import { UserStatus } from "../enums/user.status.enum";

@Entity("tbl_01_M_P_User")
export class User {

    @PrimaryGeneratedColumn()
    userId!: number;

    @Column({ unique: true })
    userCode!: string;

    @Column({ unique: true })
    name!: string;

    @Column()
    fullName!: string;

    @Column()
    password!: string;

    @Column({ default: UserStatus.Active, type: "enum", enum: UserStatus })
    status!: string;

    @Column()
    orgCode!: string;

    @Column()
    branchCode!: string;

    @Column({ nullable: true })
    mobile?: string;

    @Column({ nullable: true })
    email?: string;

    @Column({ nullable: true })
    createdBy?: string;

    @CreateDateColumn()
    createDate!: Date;

    @Column({ nullable: true })
    modifiedBy?: string;

    @UpdateDateColumn()
    modifiedDate!: Date;

    @Column({ default: false })
    dflag!: boolean;

    @Column({ nullable: true })
    roleId?: number

    @OneToMany(() => Token, (token) => token.user)
    tokens!: Token[];
}