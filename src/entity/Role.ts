import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity("tbl_01_M_P_Role")
export class Role {

    @PrimaryGeneratedColumn({
        name: "Role_Id",
    })
    roleId!: number;

    @Column({
        name: "Role_Name",
        type: "varchar",
        length: 50,
        nullable: true,
        unique: true,
    })
    roleName?: string;

    @Column({
        name: "Org_Code",
        type: "varchar",
        length: 5,
        nullable: true,
    })
    orgCode?: string;

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

    @Column({
        name: "Modified_By",
        type: "varchar",
        length: 50,
        nullable: true,
    })
    modifiedBy?: string;

    @UpdateDateColumn({
        name: "Modified_Date",
        type: "datetime",
        nullable: true,
    })
    modifiedDate?: Date;


}