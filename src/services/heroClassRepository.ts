import { Repository, EntityRepository } from "typeorm";
import { dbConnection } from "../../dbconn";
import { HeroClass } from "../entity/heroClass";
import { ClassName } from "../enums/className";

@EntityRepository(HeroClass)
export class HeroClassRepository extends Repository<HeroClass> {
  async findByName(heroClass: ClassName): Promise<HeroClass> {
    return super.findOne({ name: heroClass.valueOf() });
  }
}

export function getHeroClassepository(): HeroClassRepository {
  return dbConnection.getCustomRepository(HeroClassRepository);
}
