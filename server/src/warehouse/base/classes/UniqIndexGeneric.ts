import {IndexMemory} from './IndexMemory';
import {KeyModelToString} from "../interfaces/KeyModelToString";
import {StringToKeyModel} from "../interfaces/StringToKeyModel";
import {Warehouse} from '../../Warehouse';

export class UniqIndexGeneric<IdModel> extends IndexMemory<IdModel, true> {
    constructor(
        name = 'default',
        wh: Warehouse,
        public keyToString: KeyModelToString<IdModel>,
        public stringToKey: StringToKeyModel<IdModel>
    ) {
        super(name, wh);
    }
}
