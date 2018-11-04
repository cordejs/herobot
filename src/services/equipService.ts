import * as weapon from "../../data/weapon.json";
import * as shield from "../../data/shield.json";

export class EquipService {
  private route = "/equipment";
  findAllItens(type: string): object {
    const objJson = type.toLowerCase() == "shield" ? shield : weapon;
    return objJson;
  }
}
export const equipServ: EquipService = new EquipService();
