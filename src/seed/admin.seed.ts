import { AppDataSource } from "../config/database";
import { Orgnaisation } from "../entity/Orgnaisation";
import { Role } from "../entity/Role";
import { User } from "../entity/User";
import bcrypt from "bcrypt";
import { generateOrgCode } from "../service/organisation.service";
import { Branch } from "../entity/Branch";
import { generateBranchCode } from "../service/branch.service";

export const seedAdminUser = async () => {
    const userRepo = AppDataSource.getRepository(User);
    const roleRepo = AppDataSource.getRepository(Role);
    const orgRepo = AppDataSource.getRepository(Orgnaisation);
    const branchRepo = AppDataSource.getRepository(Branch);


    // check Or create role

    const orgCode = await generateOrgCode();


    let org = await orgRepo.findOne({
        where: {
            Org_Name: "PCM",

        }
    })

    if (!org) {
        org = orgRepo.create({
            Org_Code: orgCode,
            Org_Name: "PCM",
            Org_ShortName: "PCM",
            Address: "Bhubaneswar",

        })
    }

    org = await orgRepo.save(org);
    console.log("Organization created");

    // check or create branch
    const branchCode = await generateBranchCode();

    let branch = await branchRepo.findOne({
        where: {
            Branch_Name: "OF",
        }
    })

    if (!branch) {
        branch = branchRepo.create({
            Branch_Name: "OF",
            Branch_Code: branchCode,
            Branch_ShortName: "OF",
            Org_Code: org.Org_Code,
        })
    }

    branch = await branchRepo.save(branch);
    console.log("Branch created");

    // 1. CHECK OR CREATE ROLE
    let role = await roleRepo.findOne({
        where: {
            roleName: "Admin",
        }
    });

    if (!role) {
        role = roleRepo.create({
            roleName: "Admin",
            orgCode: org.Org_Code,
        });

        role = await roleRepo.save(role);
        console.log("Admin Role created");
    } else {
        console.log("Admin Role already exists");
    }

    // 2. CHECK ADMIN USER
    const existingAdmin = await userRepo.findOne({
        where: { userCode: "ADMIN001" }
    });

    if (existingAdmin) {
        console.log("Admin already exists");
        return;
    }

    // 3. HASH PASSWORD
    const hashedPassword = await bcrypt.hash("admin@123", 10);

    // 4. CREATE ADMIN USER WITH ROLE ID
    const admin = userRepo.create({
        userCode: "ADMIN001",
        name: "admin",
        fullName: "System Admin",
        password: hashedPassword,
        status: "ACTIVE",
        orgCode: org.Org_Code,
        branchCode: branch.Branch_Code,
        email: "admin@gmail.com",
        roleId: role.roleId,
        createdBy: "SYSTEM"
    });

    await userRepo.save(admin);

    console.log("Admin user created successfully");
};