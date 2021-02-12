import { ItemType } from './ItemType';
export interface PropertyItemTypeMap {
    [key: string]: {
        listType: ItemType;
        isOutgoing: boolean;
    };
}
