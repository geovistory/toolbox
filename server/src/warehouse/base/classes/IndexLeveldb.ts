import subleveldown from 'subleveldown';
import { leveldb } from '../database';
import { LevelUp } from 'levelup';
// Temporary implementation as leveldb key-value store

export abstract class IndexLeveldb<KeyModel, ValueModel> {


    static sublevels = 0;
    indexName = '/' + IndexLeveldb.sublevels++
    db: LevelUp;

    constructor() {
        this.db = subleveldown<string, ValueModel>(leveldb, this.indexName, { valueEncoding: 'json' });

    }

    async addToIdx(keyModel: KeyModel, val: ValueModel) {

        const key = this.keyToString(keyModel);
        await this.db.put(key, val);

        // this.idx[this.keyToString(key)] = val
    }
    async removeFromIdx(keyModel: KeyModel) {
        const key = this.keyToString(keyModel);
        await this.db.del(key);

        // delete this.idx[this.keyToString(key)]
    }

    /**
     * Returns value of key. If key not exists, returns undefined.
     * @param key
     */

    async getFromIdx(keyModel: KeyModel): Promise<ValueModel | undefined> {
        const key = this.keyToString(keyModel);
        let val: (ValueModel | undefined) = undefined;
        try {
            val = await this.db.get(key);
            return val;
        }
        catch (error) {
            if (!error.notFound)
                throw new Error(error);
            return val;
        }

    }




    async forEachKey<M>(cb: (key: KeyModel) => Promise<M>) {
        return new Promise((res, rej) => {
            const stream = this.db.createKeyStream();
            let streamFinished = false;
            let awaitingCallback = false;
            stream
                .on('data', (key: string) => {

                    stream.pause();
                    awaitingCallback = true;
                    cb(this.stringToKey(key)).
                        then(() => {
                            awaitingCallback = false;
                            if (streamFinished) {
                                res('Stream closed');
                            }
                            else {
                                stream.resume();
                            }
                        })
                        .catch(e => {
                            console.log(e);
                        });
                })
                .on('error', function (err:unknown) {
                    rej(err);
                })
                .on('close', () => {
                    streamFinished = true;
                    if (!awaitingCallback)
                        res();
                })
                .on('end', function () {
                    streamFinished = true;
                });
        });

        // return Object.keys(this.idx).map(str => this.stringToKey(str))
    }


    async forEachValue(cb: (val: ValueModel) => void) {
        return new Promise((res, rej) => {
            this.db.createValueStream()
                .on('data', (val) => {
                    cb(val);
                })
                .on('error', function (err) {
                    rej(err);
                })
                .on('close', function () {
                    res('Stream closed');
                })
                .on('end', function () {
                    res('Stream ended');
                });
            // return values(this.idx)
        });
    }


    async clearIdx() {
        await this.db.clear();
        // this.idx = {}
    }


    async keyExists(key: string): Promise<boolean> {
        return new Promise((res, rej) => {

            this.db.get(key, (err, value) => {
                if (!err) {
                    res(true);
                }
                else {
                    res(false);
                }
            });
        });
    }


    async getKeys(): Promise<KeyModel[]> {
        const keys: KeyModel[] = [];
        await this.forEachKey(async (k) => keys.push(k));
        return keys;
    }


    async getValues(): Promise<ValueModel[]> {
        const vals: ValueModel[] = [];
        await this.forEachValue((v) => vals.push(v));
        return vals;
    }


    async getLength(): Promise<number> {
        let length = 0;
        return new Promise((res, rej) => {
            this.db.createKeyStream()
                .on('data', () => {
                    length++;
                })
                .on('error', function (err) {
                    rej(err);
                })
                .on('close', function () {
                    res(length);
                })
                .on('end', function () {
                    res(length);
                });
        });

    }


    abstract keyToString(key: KeyModel): string;
    abstract stringToKey(str: string): KeyModel;

}
