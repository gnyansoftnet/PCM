import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewTable1779964931409 implements MigrationInterface {
    name = 'AddNewTable1779964931409'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_62c1dd637bb786cafd0a9408b1\` ON \`tbl_01_m_party\``);
        await queryRunner.query(`DROP INDEX \`IDX_d89fe173aef6172be666b1156a\` ON \`tbl_01_m_party\``);
        await queryRunner.query(`ALTER TABLE \`tbl_01_m_party\` CHANGE \`Party_Address\` \`Party_Address\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tbl_01_m_party\` CHANGE \`Contact_Person\` \`Contact_Person\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tbl_01_m_party\` CHANGE \`Email\` \`Email\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tbl_01_m_party\` DROP COLUMN \`Route\``);
        await queryRunner.query(`ALTER TABLE \`tbl_01_m_party\` ADD \`Route\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`tbl_01_m_vehicle\` CHANGE \`Vehicle_OwnerName\` \`Vehicle_OwnerName\` varchar(50) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_01_m_vehicle\` CHANGE \`Vehicle_OwnerName\` \`Vehicle_OwnerName\` varchar(50) CHARACTER SET "latin1" COLLATE "latin1_swedish_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tbl_01_m_party\` DROP COLUMN \`Route\``);
        await queryRunner.query(`ALTER TABLE \`tbl_01_m_party\` ADD \`Route\` varchar(60) CHARACTER SET "latin1" COLLATE "latin1_swedish_ci" NULL`);
        await queryRunner.query(`ALTER TABLE \`tbl_01_m_party\` CHANGE \`Email\` \`Email\` varchar(50) CHARACTER SET "latin1" COLLATE "latin1_swedish_ci" NULL`);
        await queryRunner.query(`ALTER TABLE \`tbl_01_m_party\` CHANGE \`Contact_Person\` \`Contact_Person\` varchar(50) CHARACTER SET "latin1" COLLATE "latin1_swedish_ci" NULL`);
        await queryRunner.query(`ALTER TABLE \`tbl_01_m_party\` CHANGE \`Party_Address\` \`Party_Address\` varchar(100) CHARACTER SET "latin1" COLLATE "latin1_swedish_ci" NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_d89fe173aef6172be666b1156a\` ON \`tbl_01_m_party\` (\`SAPERP_Code\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_62c1dd637bb786cafd0a9408b1\` ON \`tbl_01_m_party\` (\`Party_GSTIN\`)`);
    }

}
