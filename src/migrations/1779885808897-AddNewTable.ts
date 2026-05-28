import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewTable1779885808897 implements MigrationInterface {
    name = 'AddNewTable1779885808897'

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`tbl_01_m_branch\` (\`Id\` int NOT NULL AUTO_INCREMENT, \`Branch_Code\` varchar(255) NOT NULL, \`Branch_Name\` varchar(255) NOT NULL, \`Branch_ShortName\` varchar(255) NOT NULL, \`Org_Code\` varchar(255) NOT NULL, \`Branch_Gst\` varchar(255) NULL, \`State_Code\` varchar(255) NULL, \`City\` varchar(255) NULL, \`Pin\` varchar(255) NULL, \`Location\` varchar(255) NULL, \`Address2\` varchar(255) NULL, \`Address3\` varchar(255) NULL, \`Created_By\` varchar(255) NULL, \`Created_Date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`Modified_By\` varchar(255) NULL, \`Modified_Date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`Dflag\` tinyint NOT NULL DEFAULT 0, \`IsMainBranch\` varchar(255) NULL, UNIQUE INDEX \`IDX_4ee61faef7452da688b6a46003\` (\`Branch_Name\`), PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);

        await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`tbl_01_m_expenses_head\` (\`Head_Id\` int NOT NULL AUTO_INCREMENT, \`Head_Name\` varchar(255) NOT NULL, \`Applicable_For\` varchar(50) NULL, \`Default_Limit\` varchar(50) NULL, \`Fin_Year\` varchar(50) NULL, \`Org_Code\` varchar(50) NULL, \`Created_By\` varchar(50) NULL, \`Created_Date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`Modified_By\` varchar(50) NOT NULL, \`Modified_Date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`Dflag\` tinyint NOT NULL DEFAULT 0, UNIQUE INDEX \`IDX_e5c8a75f14cfa07e7a84a769c8\` (\`Head_Name\`), PRIMARY KEY (\`Head_Id\`)) ENGINE=InnoDB`);

        await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`tbl_01_m_driver\` (\`Driver_Id\` int NOT NULL AUTO_INCREMENT, \`Driver_Name\` varchar(50) NOT NULL, \`Driver_License_No\` varchar(50) NOT NULL, \`Driver_Phone_No\` varchar(50) NOT NULL, \`Driver_Type\` varchar(50) NULL, \`Fin_Year\` varchar(50) NULL, \`Org_Code\` varchar(50) NOT NULL, \`Created_By\` varchar(50) NOT NULL, \`Created_Date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`Modified_By\` varchar(50) NULL, \`Modified_Date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`Dflag\` int NOT NULL DEFAULT '0', PRIMARY KEY (\`Driver_Id\`)) ENGINE=InnoDB`);

        await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`tbl_01_m_opening_balance\` (\`OB_Id\` int NOT NULL AUTO_INCREMENT, \`OB_Date\` datetime NULL, \`OB_Amount\` decimal(18,2) NULL, \`Closing_Balance\` decimal(18,2) NULL, \`Remarks\` varchar(100) NULL, \`Org_Code\` varchar(50) NULL, \`Created_By\` varchar(50) NULL, \`Created_Date\` datetime NULL, \`Modified_By\` varchar(50) NULL, \`Modified_Date\` datetime NULL, \`Dflag\` int NOT NULL DEFAULT '0', \`Fin_Year\` varchar(50) NULL, PRIMARY KEY (\`OB_Id\`)) ENGINE=InnoDB`);

        await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`tbl_01_m_org\` (\`Id\` int NOT NULL AUTO_INCREMENT, \`Org_Code\` varchar(50) NOT NULL, \`Org_Name\` varchar(100) NOT NULL, \`Org_ShortName\` varchar(100) NOT NULL, \`Org_Reg_No\` varchar(50) NULL, \`Org_Gst\` varchar(50) NULL, \`TAN_No\` varchar(30) NULL, \`Org_Pan\` varchar(20) NULL, \`Org_Gstin_No\` varchar(50) NULL, \`Org_FinancialYear\` datetime NULL, \`Org_EnableTDSDeduction\` varchar(20) NULL, \`Org_TDSDeductionType\` varchar(20) NULL, \`Org_Distritct_No\` varchar(50) NULL, \`Org_City\` varchar(50) NULL, \`Org_State_Code\` varchar(10) NULL, \`Org_Pin\` varchar(10) NULL, \`Org_Phone\` varchar(20) NULL, \`Org_Email\` varchar(100) NULL, \`Org_Registered_Address\` text NULL, \`DocumentType\` varchar(50) NULL, \`Document\` varchar(100) NULL, \`Org_Charter_Date\` datetime NULL, \`Org_Location\` varchar(100) NULL, \`Org_Logo\` varchar(255) NULL, \`Enable_TDS_Deduction\` varchar(20) NULL, \`Deductor_Type\` varchar(50) NULL, \`Address\` text NOT NULL, \`ContactNo1\` varchar(20) NULL, \`FaxNo\` varchar(20) NULL, \`Email1\` varchar(100) NULL, \`website\` varchar(100) NULL, \`ServiceTax\` varchar(50) NULL, \`TanNo\` varchar(30) NULL, \`Dept_Logo\` varchar(255) NULL, \`Cash_Acnt_No\` varchar(50) NULL, \`Tin_No\` varchar(20) NULL, \`Dflag\` int NOT NULL DEFAULT '0', \`Created_By\` varchar(50) NULL, \`Created_Date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`Modified_By\` varchar(50) NULL, \`Modified_Date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_d207329906fe1ae60cddf91040\` (\`Org_Code\`), UNIQUE INDEX \`IDX_d931114779fd2b9fc91d1acfeb\` (\`Org_Name\`), PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);

        await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`tbl_01_m_p_page\` (\`PG_Id\` int NOT NULL AUTO_INCREMENT, \`MG_Id\` int NOT NULL, \`M_Id\` int NOT NULL, \`PG_Name\` varchar(255) NOT NULL, \`Controller_Name\` varchar(255) NOT NULL, \`Action_Name\` varchar(255) NOT NULL, \`Page_Menu_Icon\` varchar(255) NOT NULL, \`Ord_Seq\` int NOT NULL, \`Dflag\` int NOT NULL, \`Created_By\` varchar(255) NOT NULL, \`Created_Date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`Modified_By\` varchar(255) NULL, \`Modified_Date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`PG_Id\`)) ENGINE=InnoDB`);

        await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`tbl_01_m_p_module\` (\`MG_Id\` int NOT NULL AUTO_INCREMENT, \`M_Id\` int NOT NULL, \`M_Name\` varchar(200) NOT NULL, \`M_Icon\` varchar(200) NULL, \`M_Order\` int NULL, \`Dflag\` tinyint NULL DEFAULT 0, \`Created_By\` varchar(50) NULL, \`Created_Date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`MG_Id\`)) ENGINE=InnoDB`);

        // Party table with Route column included
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`tbl_01_m_party\` (\`Party_Id\` int NOT NULL AUTO_INCREMENT, \`Party_Code\` varchar(50) NOT NULL, \`Party_Name\` varchar(50) NOT NULL, \`Party_Address\` varchar(100) NULL, \`Party_GSTIN\` varchar(50) NOT NULL, \`Contact_Person\` varchar(50) NULL, \`Phone_No\` varchar(50) NOT NULL, \`Email\` varchar(50) NULL, \`SAPERP_Code\` varchar(50) NOT NULL, \`Route\` varchar(60) NULL, \`Route_Id\` int NOT NULL, \`Fin_Year\` varchar(50) NULL, \`Org_Code\` varchar(50) NOT NULL, \`Created_By\` varchar(50) NOT NULL, \`Created_Date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`Modified_By\` varchar(50) NULL, \`Modified_Date\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`Dflag\` int NOT NULL DEFAULT '0', UNIQUE INDEX \`IDX_50d319834d3b73d0b0238d8b06\` (\`Party_Code\`), UNIQUE INDEX \`IDX_62c1dd637bb786cafd0a9408b1\` (\`Party_GSTIN\`), UNIQUE INDEX \`IDX_a8bf89bac2a5d5326388362a08\` (\`Phone_No\`), UNIQUE INDEX \`IDX_d89fe173aef6172be666b1156a\` (\`SAPERP_Code\`), PRIMARY KEY (\`Party_Id\`)) ENGINE=InnoDB`);

        // If party table already existed without Route column, add it
        const routeColExists = await queryRunner.query(`
            SELECT COLUMN_NAME 
            FROM information_schema.COLUMNS 
            WHERE TABLE_SCHEMA = DATABASE() 
            AND TABLE_NAME = 'tbl_01_m_party' 
            AND COLUMN_NAME = 'Route'
        `);
        if (routeColExists.length === 0) {
            await queryRunner.query(`ALTER TABLE \`tbl_01_m_party\` ADD COLUMN \`Route\` varchar(60) NULL`);
        }

        await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`peety_cash_all_transaction\` (\`Tran_Id\` int NOT NULL AUTO_INCREMENT, \`Tran_No\` varchar(50) NULL, \`Tran_Date\` datetime NULL, \`Voucher_No\` varchar(50) NULL, \`Tran_Desc\` varchar(50) NULL, \`In_Amount\` decimal(18,2) NULL, \`Out_Amount\` decimal(18,2) NULL, \`Created_By\` varchar(50) NULL, \`Created_Date\` datetime NULL, \`Modified_By\` varchar(50) NULL, \`Modified_Date\` datetime NULL, \`Dflag\` int NOT NULL DEFAULT '0', \`Org_Code\` varchar(50) NULL, \`Fin_Year\` varchar(50) NULL, PRIMARY KEY (\`Tran_Id\`)) ENGINE=InnoDB`);

        await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`tbl_01_m_p_role\` (\`Role_Id\` int NOT NULL AUTO_INCREMENT, \`Role_Name\` varchar(50) NULL, \`Org_Code\` varchar(255) NULL, \`Dflag\` tinyint NULL DEFAULT 0, \`Created_By\` varchar(50) NULL, \`Created_Date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`Modified_By\` varchar(50) NULL, \`Modified_Date\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`Role_Id\`)) ENGINE=InnoDB`);

        await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`tbl_01_m_p_roleaccess\` (\`Id\` int NOT NULL AUTO_INCREMENT, \`Role_Id\` int NOT NULL, \`M_Id\` int NOT NULL, \`PG_Id\` int NOT NULL, \`READ\` int NOT NULL, \`WRITE\` int NOT NULL, \`UPDATE\` int NOT NULL, \`DELETE\` int NOT NULL, \`Org_Code\` varchar(255) NOT NULL, \`Dflag\` int NOT NULL, \`Created_By\` varchar(255) NOT NULL, \`Created_Date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`Modified_By\` varchar(255) NULL, \`Modified_Date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);

        await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`tbl_01_m_route\` (\`Route_Id\` int NOT NULL AUTO_INCREMENT, \`Route_Name\` varchar(255) NOT NULL, \`Route_From\` varchar(255) NOT NULL, \`Route_To\` varchar(255) NOT NULL, \`Route_Distance\` int NOT NULL, \`Route_Code\` varchar(50) NOT NULL, \`Route_No\` varchar(255) NOT NULL, \`Fin_Year\` varchar(255) NULL, \`Org_Code\` varchar(255) NULL, \`Created_By\` varchar(255) NULL, \`Created_Date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`Modified_By\` varchar(255) NULL, \`Modified_Date\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`Dflag\` int NULL DEFAULT 0, PRIMARY KEY (\`Route_Id\`)) ENGINE=InnoDB`);

        await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`tbl_01_m_p_user\` (\`userId\` int NOT NULL AUTO_INCREMENT, \`userCode\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`fullName\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`status\` enum ('Active', 'InActive') NOT NULL DEFAULT 'Active', \`orgCode\` varchar(255) NOT NULL, \`branchCode\` varchar(255) NOT NULL, \`mobile\` varchar(255) NULL, \`email\` varchar(255) NULL, \`createdBy\` varchar(255) NULL, \`createDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modifiedBy\` varchar(255) NULL, \`modifiedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`dflag\` tinyint NOT NULL DEFAULT 0, \`roleId\` int NULL, UNIQUE INDEX \`IDX_4a9b28ee0bed279b85d5eb5889\` (\`userCode\`), UNIQUE INDEX \`IDX_92386d795d2272fd95491025d8\` (\`name\`), PRIMARY KEY (\`userId\`)) ENGINE=InnoDB`);

        await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`tbl_token\` (\`tokenId\` int NOT NULL AUTO_INCREMENT, \`token\` varchar(499) NOT NULL, \`tokenType\` enum ('BEARER') NOT NULL DEFAULT 'BEARER', \`revoked\` tinyint NOT NULL DEFAULT 0, \`expired\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NULL, UNIQUE INDEX \`IDX_5800ff63ddb0eea6b0ad6e5f7d\` (\`token\`), PRIMARY KEY (\`tokenId\`)) ENGINE=InnoDB`);

        await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`tbl_01_m_p_useraccess\` (\`Id\` int NOT NULL AUTO_INCREMENT, \`User_Code\` varchar(255) NOT NULL, \`Role_Id\` int NOT NULL, \`M_Id\` int NOT NULL, \`PG_Id\` int NOT NULL, \`READ\` int NOT NULL, \`WRITE\` int NOT NULL, \`UPDATE\` int NOT NULL, \`DELETE\` int NOT NULL, \`Org_Code\` varchar(255) NOT NULL, \`Dflag\` int NOT NULL, \`Created_By\` varchar(255) NOT NULL, \`Created_Date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`Modified_By\` varchar(255) NULL, \`Modified_Date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);

        await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`tbl_01_m_vehicle\` (\`Vehicle_Id\` int NOT NULL AUTO_INCREMENT, \`Vehicle_No\` varchar(50) NULL, \`Vehicle_Type\` varchar(50) NOT NULL, \`V_Model\` varchar(50) NULL, \`Vehicle_OwnerName\` varchar(50) NOT NULL, \`Vehicle_Capacity\` varchar(50) NOT NULL, \`Case_Approx\` int NOT NULL, \`Fin_Year\` varchar(50) NULL, \`Org_Code\` varchar(50) NOT NULL, \`Created_By\` varchar(50) NOT NULL, \`Created_Date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`Modified_By\` varchar(50) NULL, \`Modified_Date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`Dflag\` int NULL DEFAULT 0, PRIMARY KEY (\`Vehicle_Id\`)) ENGINE=InnoDB`);

        await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`tbl_01_v_master\` (\`Id\` int NOT NULL AUTO_INCREMENT, \`V_Name\` varchar(100) NOT NULL, PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);

        // Add foreign key only if it doesn't already exist
        const fkExists = await queryRunner.query(`
            SELECT CONSTRAINT_NAME 
            FROM information_schema.KEY_COLUMN_USAGE 
            WHERE TABLE_SCHEMA = DATABASE() 
            AND TABLE_NAME = 'tbl_token' 
            AND CONSTRAINT_NAME = 'FK_7d303a5f7214453fb74580d1dcc'
        `);
        if (fkExists.length === 0) {
            await queryRunner.query(`ALTER TABLE \`tbl_token\` ADD CONSTRAINT \`FK_7d303a5f7214453fb74580d1dcc\` FOREIGN KEY (\`userId\`) REFERENCES \`tbl_01_m_p_user\`(\`userId\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_token\` DROP FOREIGN KEY \`FK_7d303a5f7214453fb74580d1dcc\``);
        await queryRunner.query(`DROP TABLE IF EXISTS \`tbl_01_v_master\``);
        await queryRunner.query(`DROP TABLE IF EXISTS \`tbl_01_m_vehicle\``);
        await queryRunner.query(`DROP TABLE IF EXISTS \`tbl_01_m_p_useraccess\``);
        await queryRunner.query(`DROP INDEX \`IDX_5800ff63ddb0eea6b0ad6e5f7d\` ON \`tbl_token\``);
        await queryRunner.query(`DROP TABLE IF EXISTS \`tbl_token\``);
        await queryRunner.query(`DROP INDEX \`IDX_92386d795d2272fd95491025d8\` ON \`tbl_01_m_p_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_4a9b28ee0bed279b85d5eb5889\` ON \`tbl_01_m_p_user\``);
        await queryRunner.query(`DROP TABLE IF EXISTS \`tbl_01_m_p_user\``);
        await queryRunner.query(`DROP TABLE IF EXISTS \`tbl_01_m_route\``);
        await queryRunner.query(`DROP TABLE IF EXISTS \`tbl_01_m_p_roleaccess\``);
        await queryRunner.query(`DROP TABLE IF EXISTS \`tbl_01_m_p_role\``);
        await queryRunner.query(`DROP TABLE IF EXISTS \`peety_cash_all_transaction\``);
        await queryRunner.query(`DROP INDEX \`IDX_d89fe173aef6172be666b1156a\` ON \`tbl_01_m_party\``);
        await queryRunner.query(`DROP INDEX \`IDX_a8bf89bac2a5d5326388362a08\` ON \`tbl_01_m_party\``);
        await queryRunner.query(`DROP INDEX \`IDX_62c1dd637bb786cafd0a9408b1\` ON \`tbl_01_m_party\``);
        await queryRunner.query(`DROP INDEX \`IDX_50d319834d3b73d0b0238d8b06\` ON \`tbl_01_m_party\``);
        await queryRunner.query(`DROP TABLE IF EXISTS \`tbl_01_m_party\``);
        await queryRunner.query(`DROP TABLE IF EXISTS \`tbl_01_m_p_module\``);
        await queryRunner.query(`DROP TABLE IF EXISTS \`tbl_01_m_p_page\``);
        await queryRunner.query(`DROP INDEX \`IDX_d931114779fd2b9fc91d1acfeb\` ON \`tbl_01_m_org\``);
        await queryRunner.query(`DROP INDEX \`IDX_d207329906fe1ae60cddf91040\` ON \`tbl_01_m_org\``);
        await queryRunner.query(`DROP TABLE IF EXISTS \`tbl_01_m_org\``);
        await queryRunner.query(`DROP TABLE IF EXISTS \`tbl_01_m_opening_balance\``);
        await queryRunner.query(`DROP TABLE IF EXISTS \`tbl_01_m_driver\``);
        await queryRunner.query(`DROP INDEX \`IDX_e5c8a75f14cfa07e7a84a769c8\` ON \`tbl_01_m_expenses_head\``);
        await queryRunner.query(`DROP TABLE IF EXISTS \`tbl_01_m_expenses_head\``);
        await queryRunner.query(`DROP INDEX \`IDX_4ee61faef7452da688b6a46003\` ON \`tbl_01_m_branch\``);
        await queryRunner.query(`DROP TABLE IF EXISTS \`tbl_01_m_branch\``);
    }
}