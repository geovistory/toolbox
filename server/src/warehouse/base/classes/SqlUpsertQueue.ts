import {Client} from 'pg';
import {values} from 'ramda';
import {BehaviorSubject, race, timer} from 'rxjs';
import {filter, first} from 'rxjs/operators';
import {Logger} from './Logger';

/**
 *
 */
export class SqlUpsertQueue<KeyModel, ValueModel> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    queue: {[uniq: string]: any[];} = {};
    queueLength = 0;
    queueLength$ = new BehaviorSubject<number>(0);
    queueing = false;

    constructor(
        private queueName: string,
        private pgClient: Client,
        private getSql: (valuesStr: string) => string,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        private itemToParams: (item: {key: KeyModel; val: ValueModel;}) => any[],
        private keyModelToString: (key: KeyModel) => string,
        private maxQueueLength = 1000,
        private maxQueueTime = 20) {
    }

    /**
     * add item to queue
     */
    public add(item: {key: KeyModel; val: ValueModel;}) {
        if (!this.queueing) this.activateRace();

        const params = this.itemToParams(item);
        this.queue[this.keyModelToString(item.key)] = params;
        this.queueLength++;
        this.queueLength$.next(this.queueLength);
    }

    /**
     * Activates a new race of the timer (emitting after maxQueueTime)
     * versus the queueLength (emitting when maxQueueLength reached).
     * Once the race is won by eighter timer or queueLength, the
     * sql is fired.
     */
    private activateRace() {
        this.queueing = true;
        race(
            this.queueLength$.pipe(filter(length => length >= this.maxQueueLength)),
            timer(this.maxQueueTime)
        ).pipe(first()).subscribe(() => {
            this.queueing = false;
            this.fire();
        });
    }




    /**
     * creates and fires sql.
     * resets queue
     */
    private fire() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const params: any[] = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const addParam = (val: any) => {
            params.push(val);
            return '$' + params.length;
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const addParams = (vals: any[]) => {
            return vals.map(val => addParam(val)).join(',');
        };

        const length = this.queueLength;
        const placeholder = values(this.queue).map(row => `(${addParams(row)})`).join(',');
        const q = this.getSql(placeholder);


        this.pgClient.query(q, params)
            .then(() => {
                Logger.msg(`\u{1b}[34m(async) Upserted ${length} ${this.queueName} \u{1b}[0m`);
            })
            .catch(e => {
                console.log(e);
            });

        this.queue = {};
        this.queueLength = 0;
        this.queueLength$.next(this.queueLength);
    }
}
