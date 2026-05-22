import { AppDataSource } from "../config/database";
import { Role } from "../entity/Role";
import { User } from "../entity/User";
import bcrypt from "bcrypt";

export const seedAdminUser = async () => {
    const userRepo = AppDataSource.getRepository(User);
    const roleRepo = AppDataSource.getRepository(Role);

    // 1. CHECK OR CREATE ROLE
    let role = await roleRepo.findOne({
        where: { roleName: "Admin" }
    });

    if (!role) {
        role = roleRepo.create({
            roleName: "Admin"

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
        orgCode: "SYS",
        branchCode: "MAIN",
        email: "admin@gmail.com",
        roleId: role.roleId,
        createdBy: "SYSTEM"
    });

    await userRepo.save(admin);

    console.log("Admin user created successfully");
};