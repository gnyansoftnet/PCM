import { MigrationInterface, QueryRunner } from "typeorm";

export class Nullablemodifiedby1780120110895 implements MigrationInterface {
    name = 'Nullablemodifiedby1780120110895'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_01_m_expenses_head\` CHANGE \`Modified_By\` \`Modified_By\` varchar(50) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_01_m_expenses_head\` CHANGE \`Modified_By\` \`Modified_By\` varchar(50) CHARACTER SET "latin1" COLLATE "latin1_swedish_ci" NOT NULL`);
    }

}
