import { ProficienceType } from "../enums/proficienceType";

export interface Proficience {
  type: ProficienceType;
  level: number;
  xp: number;
  levelMaxXp: number;
}
