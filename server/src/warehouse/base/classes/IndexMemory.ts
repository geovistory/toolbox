import { values } from 'ramda';
// Temporary implementation as in-memory key-value store

export abstract class IndexMemory<KeyModel, ValueModel> {




    private idx: { [key: string]: ValueModel; } = {};


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
