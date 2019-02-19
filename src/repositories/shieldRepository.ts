import { Repository, EntityRepository } from "typeorm";
import { dbConnection } from "../../dbconn";
import { Shield } from "../entity/shield";

@EntityRepository(Shield)
export class ShieldRepository extends Repository<Shield> {
  findAll(): Promise<Shield[]> {
    return super.find();
  }
}

export function getShieldpository(): ShieldRepository {
  return dbConnection.getCustomRepository(ShieldRepository);
}
