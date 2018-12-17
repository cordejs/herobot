import { Item } from "./item";

export interface IventoryItem {
    item: Item,
    amount?: number,
    equiped: boolean
}