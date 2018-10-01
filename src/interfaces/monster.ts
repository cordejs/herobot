import { EquipDrop } from "./equipDrop";

export interface Monster {
  id: string;
  name: string;
  level: number;
  damage: number;
  shield: number;
  givedXp: number;
  givedGold: number;
  dropableItens: EquipDrop[];
}
