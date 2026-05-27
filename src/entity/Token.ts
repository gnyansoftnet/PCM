import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";

import { User } from "./User";

export enum TokenType {
    BEARER = "BEARER"
}

@Entity("tbl_token")
export class Token {

    @PrimaryGeneratedColumn()
    tokenId!: number;

    @Column({ unique: true, nullable: false, length: 499 })
    token!: string;

    @Column({
        type: "enum",
        enum: TokenType,
        default: TokenType.BEARER
    })
    tokenType!: TokenType;

    @Column({ default: false })
    revoked!: boolean;

    @Column({ default: false })
    expired!: boolean;

    // 🔗 Many tokens belong to one user
    @ManyToOne(() => User, (user) => user.tokens, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "userId" })
    user!: User;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}