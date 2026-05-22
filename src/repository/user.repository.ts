import { AppDataSource } from "../config/database";
import { User } from "../entity/User";

export const UserRepository =
  AppDataSource.getRepository(User).extend({

    findByUserCode(userCode: string) {
      return this.findOne({ where: { userCode } });
    },

    findByName(name: string) {
      return this.findOne({ where: { name } });
    },
  });