import { dbConnection } from "../../dbconn";
import { HeroRepository } from "../services/heroRepository";

export function getHeroRepository(): HeroRepository {
  return dbConnection.getCustomRepository(HeroRepository);
}
