import * as weapon from "../../data/weapon.json";
import * as shield from "../../data/shield.json";

/** @internal */
class EquipService {
  findAllItens(type: string): object {
    const objJson = type.toLowerCase() == "shield" ? shield : weapon;
    return objJson;
  }
}

const equipService = new EquipService();
export default equipService;
