import { BaseEntityService } from "./baseEntityService";
import { Equipment } from "../interfaces/equipment"; 

class equipService extends BaseEntityService<Equipment> {
  private route = "/equipment";

  findItem(id: string): Promise<Equipment> {
    return super.find(this.route, id).then(Item => {
      return new Promise<Equipment>(resolve => {
        const ItemGet: Equipment = Item;
        if (Item !== null) ItemGet.id = id;
        resolve(ItemGet);
      });
    });
  }
  findAllItems(): Promise<Equipment> {
    return super.findAll(this.route).then(Item => {
      return new Promise<Equipment>(resolve => {
        const ItemGet: Equipment = Item;
        resolve(ItemGet);
      });
    });
  }
}
export const equipServ : equipService = new equipService();
