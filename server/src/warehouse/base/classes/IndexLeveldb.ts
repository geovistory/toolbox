import {LevelUp} from 'levelup';
import {ReplaySubject} from 'rxjs';
import subleveldown from 'subleveldown';
import {Warehouse} from '../../Warehouse';
import {Index} from '../interfaces/Index';
import {Logger} from './Logger';
// Temporary implementation as leveldb key-value store

export abstract class IndexLeveldb<KeyModel, ValueModel> implements Index<KeyModel, ValueModel> {


    static sublevels = 0;
    indexName = '/' + IndexLeveldb.sublevels++
    private db: LevelUp;
    ready$ = new ReplaySubject<boolean>()
    constructor(
        name = 'default',
        wh: Warehouse
    ) {
        this.db = subleveldown<string, ValueModel>(wh.leveldb, this.indexName, {valueEncoding: 'json'});
        this.ready$.next(true)
        // console.log(this.indexName, name)
    }

    async addToIdx(keyModel: KeyModel, val: ValueModel) {
        const key = this.keyToString(keyModel);
        try {
            await this.db.put(key, val);
        }
        catch (error) {
            Logger.err(error);
        }
        // this.idx[this.keyToString(key)] = val
    }
    async removeFromIdx(keyModel: KeyModel) {
        const key = this.keyToString(keyModel);
        try {
            await this.db.del(key);
        }
        catch (error) {
            Logger.err(error);
        }
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
            if (!error.notFound) {
                Logger.err(error);
            }
            return val;
        }

    }




    async forEachKey<M>(cb: (key: KeyModel) => Promise<M>) {
        const stream = this.db.createKeyStream();
        return handleAsyncStream<M, string>(stream, (item) => cb(this.stringToKey(item)));

    }


    async forEachKeyStartingWith<M>(str: string, cb: (key: KeyModel) => Promise<M>): Promise<void> {
        if (!this.db.isOpen()) return;

        const stream = this.db.createKeyStream(whereKeyStartsWith(str));
        return handleAsyncStream<M, string>(stream, (item) => cb(this.stringToKey(item)));
    }


    async forEachItemStartingWith<M>(str: string, cb: (item: {key: KeyModel, value: ValueModel}) => Promise<M>): Promise<void> {
        const stream = this.db.createReadStream(whereKeyStartsWith(str));
        return handleAsyncStream<M, {key: string, value: ValueModel}>(stream, (item) => cb({
            key: this.stringToKey(item.key),
            value: item.value
        }));
    }

    async forEachValue(cb: (val: ValueModel) => void) {
        return new Promise<void>((res, rej) => {
            this.db.createValueStream()
                .on('data', (val) => {
                    cb(val);
                })
                .on('error', function (err) {
                    rej(err);
                })
                .on('close', function () {
                    res();
                })
                .on('end', function () {
                    res();
                });
            // return values(this.idx)
        });
    }


    async clearIdx() {
        await this.db.clear();
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


export function handleAsyncStream<M, Item>(stream: NodeJS.ReadableStream, transform: (item: Item) => Promise<M>) {
    return new Promise<void>((res, rej) => {
        let streamFinished = false;
        let awaitingCallback = false;
        stream
            .on('data', (item: Item) => {

                stream.pause();
                awaitingCallback = true;
                transform(item).
                    then(() => {
                        awaitingCallback = false;
                        if (streamFinished) {
                            res();
                        }
                        else {
                            stream.resume();
                        }
                    })
                    .catch(e => {
                        console.log(e);
                    });
            })
            .on('error', function (err: unknown) {
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
}


/**
  * Returns an object for streaming keys that begin with the given string
  *
  * @param str beginning of the streamed keys
  *
  * Read more here:
  * https://github.com/Level/levelup/issues/285#issuecomment-57205251
  *
  * Read more about '!' and '~' here:
  * https://medium.com/@kevinsimper/how-to-get-range-of-keys-in-leveldb-and-how-gt-and-lt-works-29a8f1e11782
  * @param str
  */
export function whereKeyStartsWith(str: string) {
    return {
        gte: str + '!',
        lte: str + '~'
    }
}
