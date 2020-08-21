import { IndexMemory } from './IndexMemory';
import { KeyModelToString } from "../interfaces/KeyModelToString";
import { StringToKeyModel } from "../interfaces/StringToKeyModel";

export class UniqIndexGeneric<IdModel> extends IndexMemory<IdModel, true> {
    constructor(
        public keyToString: KeyModelToString<IdModel>,
        public stringToKey: StringToKeyModel<IdModel>
    ) { super(); }
}
