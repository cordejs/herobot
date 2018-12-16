import * as weapon from "../../data/weapon.json";
import * as shield from "../../data/shield.json";

class EquipService {
  findAllItens(type: string): object {
    const objJson = type.toLowerCase() == "shield" ? shield : weapon;
    return objJson;
  }
}
export default new EquipService();
