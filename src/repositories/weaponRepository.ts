import { Repository, EntityRepository } from "typeorm";
import { dbConnection } from "../../dbconn";
import { Weapon } from "../entity/weapon";

@EntityRepository(Weapon)
export class WeaponRepository extends Repository<Weapon> {
  findAll(): Promise<Weapon[]> {
    return super.find();
  }
}

export function getWeaponpository(): WeaponRepository {
  return dbConnection.getCustomRepository(WeaponRepository);
}
