import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity("user")
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

    @Column({ default: "ACTIVE" })
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
}