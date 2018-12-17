import { Item } from "./item";

export interface InventoryItem {
    item: Item,
    amount?: number,
    equiped: boolean
}