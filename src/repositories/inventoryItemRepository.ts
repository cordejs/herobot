import { Repository, EntityRepository } from "typeorm";
import { dbConnection } from "../../dbconn";
import { InventoryItem } from "../entity/inventory_item";

@EntityRepository(InventoryItem)
export class InventoryItemRepository extends Repository<InventoryItem> {}

export function getInventoryItemRepository(): InventoryItemRepository {
  return dbConnection.getCustomRepository(InventoryItemRepository);
}
