import {keys} from 'ramda';
import {AbstractAggregator} from '../../../base/classes/AbstractAggregator';
import {REntityId} from '../../../primary-ds/entity/REntityService';
import {REntityTimeSpanProviders} from './REntityTimeSpanPoviders';
import {REntityTimeSpan, TimeSpanKeys} from './REntityTimeSpanService';
type KeyMap = {
    [key in TimeSpanKeys]: number
}
const keyMap: KeyMap = {
    p81: 71,
    p82: 72,
    p81a: 150,
    p81b: 151,
    p82a: 152,
    p82b: 153,
}
const ks = keys(keyMap)
export class REntityTimeSpanAggregator extends AbstractAggregator<REntityId> {

    // the resulting entityTimeSpan
    entityTimeSpan?: REntityTimeSpan;
    // the first second of all time primitives of this time span
    firstSecond?: number;
    // the last second of all time primitives of this time span
    lastSecond?: number;


    constructor(
        public providers: REntityTimeSpanProviders,
        public id: REntityId
    ) {
        super()
    }


    /************************************************************************
     * Methods for creating entity time span
     ************************************************************************/

    /**
     *  Create entity time span
     *
     *  Gets values from Indexes and caches dependencies in itself.
     */
    async create() {

        const entity = await this.providers.rEntity.get(this.id);

        if (entity) {

            // load previous providers in a cache
            // in the end (after create), this cahche will contain only deprecated providers
            // that can then be deleted from dependency indexes
            await this.providers.load()
            const timeSpan: REntityTimeSpan = {}
            let first = Number.POSITIVE_INFINITY;
            let last = Number.NEGATIVE_INFINITY;
            const fieldsWithEdges = await this.providers.rEdges.get(this.id);
            if (fieldsWithEdges) {
                for (const k of ks) {
                    const fkProperty = keyMap[k];

                    // TODO: get most often used statement
                    const tpWithBounaries = fieldsWithEdges.outgoing?.[fkProperty]?.[0].targetValue?.timePrimitive ?? undefined
                    if (tpWithBounaries) {
                        timeSpan[k] = {
                            julianDay: tpWithBounaries?.julianDay,
                            duration: tpWithBounaries?.duration,
                            calendar: tpWithBounaries?.calendar,
                        }
                        // retrieve the earliest second of time span
                        if (tpWithBounaries.firstSecond && tpWithBounaries.firstSecond < first) {
                            first = tpWithBounaries.firstSecond;
                        }
                        // retrieve the latest second of time span
                        if (tpWithBounaries.lastSecond && tpWithBounaries.lastSecond > last) {
                            last = tpWithBounaries.lastSecond;
                        }
                    }

                }
            }

            if (first !== Number.POSITIVE_INFINITY) this.firstSecond = first;
            if (last !== Number.NEGATIVE_INFINITY) this.lastSecond = last;
            if (Object.keys(timeSpan).length) this.entityTimeSpan = timeSpan

        }
        return this
    }

}
