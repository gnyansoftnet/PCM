import { UserRepository } from "../repository/user.repository";
import { CreateUserDTO } from "../dto/user.dto";
import { hashPassword } from "../utils/bcrypt";

export const createUserService = async (
    body: CreateUserDTO
) => {

    const exists =
        await UserRepository.findByUserCode(
            body.userCode
        );

    if (exists) {
        throw new Error("User already exists");
    }

    const user = UserRepository.create({
        ...body,
        password: await hashPassword(body.password),
    });

    return await UserRepository.save(user);
};

export const getUsersService = async () => {
    return await UserRepository.find({
        where: { dflag: false },
        order: { userId: "DESC" },
    });
};

export const getUserByIdService = async (
    id: number
) => {
    return await UserRepository.findOne({
        where: { userId: id, dflag: false },
    });
};

export const updateUserService = async (
    id: number,
    body: Partial<CreateUserDTO>
) => {
    const user = await UserRepository.findOne({
        where: { userId: id, dflag: false },
    });

    if (!user) throw new Error("User not found");

    UserRepository.merge(user, body);

    return await UserRepository.save(user);
};

export const deleteUserService = async (
    id: number
) => {
    const user = await UserRepository.findOne({
        where: { userId: id, dflag: false },
    });

    if (!user) throw new Error("User not found");

    user.dflag = true;

    return await UserRepository.save(user);
};