import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity("tTbl_01_M_Route")
export class RouteMaster {

    @PrimaryGeneratedColumn({
        name: "Route_Id",
    })
    routeId!: number;

    @Column({
        name: "Route_Name",
        type: "varchar",

    })
    routeName!: string;

    @Column({
        name: "Route_From",
        type: "varchar",

    })
    routeFrom!: string;

    @Column({
        name: "Route_To",
        type: "varchar",

    })
    routeTo!: string;

    @Column({
        name: "Route_Distance",
        type: "int",

    })
    routeDistance!: number;

    @Column({
        name: "Route_Code",
        type: "varchar",
        length: 50,

    })
    routeCode!: string;

    @Column({
        name: "Route_No",
        type: "varchar",

    })
    routeNo!: string;

    @Column({
        name: "Fin_Year",
        type: "varchar",

        nullable: true,
    })
    finYear?: string;

    @Column({
        name: "Org_Code",
        type: "varchar",

        nullable: true,
    })
    orgCode?: string;

    @Column({
        name: "Created_By",
        type: "varchar",

        nullable: true,
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

        nullable: true,
    })
    modifiedBy?: string;

    @UpdateDateColumn({
        name: "Modified_Date",
        type: "datetime",
        nullable: true,
    })
    modifiedDate?: Date;

    @Column({
        name: "Dflag",
        type: "int",
        nullable: true,
        default: false,
    })
    dflag?: boolean;
}