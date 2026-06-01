import { AppDataSource } from "../config/database";
import { Organisation } from "../entity/Orgnaisation";
import { Role } from "../entity/Role";
import { User } from "../entity/User";
import { Branch } from "../entity/Branch";
import { generateBranchCode } from "../utils/branch.code.generation";
import bcrypt from "bcrypt";
import { UserStatus } from "../enums/user.status.enum";

const SEED_CONFIG = {
    org: {
        code: process.env.SEED_ORG_CODE ?? "PCM",
        name: process.env.SEED_ORG_NAME ?? "HINDUSTAN AGENCIES",
        shortName: process.env.SEED_ORG_SHORT ?? "PCM",
        address: process.env.SEED_ORG_ADDRESS ?? "Bhubaneswar",
    },
    branch: {
        name: process.env.SEED_BRANCH_NAME ?? "OF",
        shortName: process.env.SEED_BRANCH_SHORT ?? "OF",
    },
    role: {
        name: process.env.SEED_ROLE_NAME ?? "Admin",
    },
    admin: {
        userCode: process.env.SEED_ADMIN_CODE ?? "PCM0001",
        name: process.env.SEED_ADMIN_NAME ?? "admin",
        fullName: process.env.SEED_ADMIN_FULLNAME ?? "System Admin",
        email: process.env.SEED_ADMIN_EMAIL ?? "admin@gmail.com",
        password: process.env.SEED_ADMIN_PASSWORD ?? "admin@123",
    },
};

export const seedAdminUser = async () => {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        const orgRepo = queryRunner.manager.getRepository(Organisation);
        const branchRepo = queryRunner.manager.getRepository(Branch);
        const roleRepo = queryRunner.manager.getRepository(Role);
        const userRepo = queryRunner.manager.getRepository(User);

        // 1. Organisation
        let org = await orgRepo.findOne({ where: { Org_Name: SEED_CONFIG.org.name, Dflag: 0 } });
        if (!org) {
            org = orgRepo.create({
                Org_Code: SEED_CONFIG.org.code,
                Org_Name: SEED_CONFIG.org.name,
                Org_ShortName: SEED_CONFIG.org.shortName,
                Address: SEED_CONFIG.org.address,
            });
            org = await orgRepo.save(org);
            console.log("✔ Organisation created");
        } else {
            console.log("– Organisation already exists");
        }

        // 2. Branch — only generate code if branch doesn't exist
        let branch = await branchRepo.findOne({ where: { Branch_Name: SEED_CONFIG.branch.name } });
        if (!branch) {
            // const branchCode = await generateBranchCode();
            branch = branchRepo.create({
                Branch_Name: SEED_CONFIG.branch.name,
                Branch_Code: "OF",
                Branch_ShortName: SEED_CONFIG.branch.shortName,
                Org_Code: org.Org_Code,
            });
            branch = await branchRepo.save(branch);
            console.log("✔ Branch created");
        } else {
            console.log("– Branch already exists");
        }

        // 3. Role
        let role = await roleRepo.findOne({ where: { roleName: SEED_CONFIG.role.name } });
        if (!role) {
            role = roleRepo.create({ roleName: SEED_CONFIG.role.name, orgCode: org.Org_Code });
            role = await roleRepo.save(role);
            console.log("✔ Admin role created");
        } else {
            console.log("– Admin role already exists");
        }

        // 4. Admin user — skip entirely if already seeded
        const existingAdmin = await userRepo.findOne({
            where: { userCode: SEED_CONFIG.admin.userCode },
        });
        if (existingAdmin) {
            console.log("– Admin user already exists, skipping");
            await queryRunner.commitTransaction();
            return;
        }

        const hashedPassword = await bcrypt.hash(SEED_CONFIG.admin.password, 10);
        const admin = userRepo.create({
            userCode: SEED_CONFIG.admin.userCode,
            name: SEED_CONFIG.admin.name,
            fullName: SEED_CONFIG.admin.fullName,
            password: hashedPassword,
            status: UserStatus.Active,
            orgCode: org.Org_Code,
            branchCode: branch.Branch_Code,
            email: SEED_CONFIG.admin.email,
            roleId: role.roleId,
            createdBy: "SYSTEM",
        });

        await userRepo.save(admin);
        console.log("✔ Admin user created successfully");

        await queryRunner.commitTransaction();
    } catch (err) {
        await queryRunner.rollbackTransaction();
        console.error("✖ Seed failed, rolling back:", err);
        throw err;
    } finally {
        await queryRunner.release();
    }
};