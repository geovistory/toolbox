import {IndexDB} from './IndexDB';
export class UniqIdx extends IndexDB<string, true> {
    keyToString(key: string) {return key;}
    stringToKey(key: string) {return key;}
}
