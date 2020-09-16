import {values} from 'ramda';
import {Index} from '../interfaces/Index';
import {Warehouse} from '../../Warehouse';
import {ReplaySubject} from 'rxjs';
// Temporary implementation as in-memory key-value store

export abstract class IndexMemory<KeyModel, ValueModel> implements Index<KeyModel, ValueModel> {
    ready$ = new ReplaySubject<boolean>()

    private idx: {[key: string]: ValueModel;} = {};
    constructor(
        name = 'default',
        wh: Warehouse
    ) {
        this.ready$.next(true)

    }

    async addToIdx(keyModel: KeyModel, val: ValueModel) {
        this.idx[this.keyToString(keyModel)] = val;
    }
    async removeFromIdx(keyModel: KeyModel) {
        delete this.idx[this.keyToString(keyModel)];
    }

    /**
     * Returns value of key. If key not exists, returns undefined.
     * @param key
     */

    async getFromIdx(keyModel: KeyModel): Promise<ValueModel | undefined> {
        const res = this.idx[this.keyToString(keyModel)];
        return res;
    }


    async forEachKey<M>(cb: (keyModel: KeyModel) => Promise<M>) {
        for (const key of Object.keys(this.idx)) {
            await cb(this.stringToKey(key));
        }
    }

    async forEachKeyStartingWith<M>(str: string, cb: (key: KeyModel) => Promise<M>): Promise<void> {
        for (const key of Object.keys(this.idx)) {
            if (key.startsWith(str)) await cb(this.stringToKey(key));
        }
    }

    async forEachItemStartingWith<M>(str: string, cb: (item: {key: KeyModel, value: ValueModel}) => Promise<M>): Promise<void> {
        for (const key of Object.keys(this.idx)) {
            if (key.startsWith(str)) await cb({key: this.stringToKey(key), value: this.idx[key]});
        }
    }
    async forEachValue(cb: (val: ValueModel) => void) {
        return values(this.idx).forEach(val => {
            cb(val);
        });
    }



    async clearIdx() {
        this.idx = {};
    }


    async keyExists(key: string): Promise<boolean> {
        return !!this.idx[key];
    }


    async getKeys(): Promise<KeyModel[]> {
        return Object.keys(this.idx).map(k => this.stringToKey(k));
    }


    async getValues(): Promise<ValueModel[]> {
        return values(this.idx);
    }
    async getLength(): Promise<number> {
        return Object.keys(this.idx).length;
    }


    abstract keyToString(key: KeyModel): string;
    abstract stringToKey(str: string): KeyModel;

}
