import { Equipment } from "../interfaces/equipment";
import * as weapon from "../../../data/weapon.json"
import * as shield from "../../../data/shield.json"

class equipService {
  private route = "/equipment";
  findAllItens(type: string) : object
  { 
    var objJson = type.toLowerCase() == "shield" ? shield : weapon;
    return objJson;
  }
}
export const equipServ : equipService = new equipService();
