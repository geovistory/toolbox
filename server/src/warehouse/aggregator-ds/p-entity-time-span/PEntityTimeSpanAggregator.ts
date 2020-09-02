import {keys} from 'ramda';
import {AbstractAggregator} from '../../base/classes/AbstractAggregator';
import {PEntityId} from '../../primary-ds/entity/PEntityService';
import {PEntityTimeSpanProviders} from './PEntityTimeSpanPoviders';
import {PEntityTimeSpan, TimeSpanKeys} from './PEntityTimeSpanService';
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
export class PEntityTimeSpanAggregator extends AbstractAggregator<PEntityId> {

    // the resulting entityTimeSpan
    entityTimeSpan?: PEntityTimeSpan;
    // the first second of all time primitives of this time span
    firstSecond?: number;
    // the last second of all time primitives of this time span
    lastSecond?: number;


    constructor(
        public providers: PEntityTimeSpanProviders,
        public id: PEntityId
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

        const entity = await this.providers.pEntity.get(this.id);

        if (entity) {

            // load previous providers in a cache
            // in the end (after create), this cahche will contain only deprecated providers
            // that can then be deleted from dependency indexes
            await this.providers.load()
            const timeSpan: PEntityTimeSpan = {}
            let first = Number.POSITIVE_INFINITY;
            let last = Number.NEGATIVE_INFINITY;
            const fieldsWithEdges = await this.providers.pEdges.get(this.id);
            if (fieldsWithEdges) {
                for (const k of ks) {
                    const fkProperty = keyMap[k];
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
            // //ongoing throughout
            // if (fieldsWithEdges?.outgoing?.[71]?.length) {
            //     this.entityTimeSpan["p81"] = fieldsWithEdges.outgoing[71][0].targetValue?.timePrimitive ?? undefined;
            // }
            // //at some time within
            // if (fieldsWithEdges?.outgoing?.[72]?.length) {
            //     this.entityTimeSpan["p82"] = fieldsWithEdges.outgoing[72][0].targetValue?.timePrimitive ?? undefined;
            // }

            // //end of the begin
            // if (fieldsWithEdges?.outgoing?.[150]?.length) {
            //     this.entityTimeSpan["p81a"] = fieldsWithEdges.outgoing[150][0].targetValue?.timePrimitive ?? undefined;
            // }

            // //begin of the end
            // if (fieldsWithEdges?.outgoing?.[151]?.length) {
            //     this.entityTimeSpan["p81b"] = fieldsWithEdges.outgoing[151][0].targetValue?.timePrimitive ?? undefined;
            // }

            // //begin of the begin
            // if (fieldsWithEdges?.outgoing?.[152]?.length) {
            //     this.entityTimeSpan["p82a"] = fieldsWithEdges.outgoing[152][0].targetValue?.timePrimitive ?? undefined;
            // }

            // //end of the end
            // if (fieldsWithEdges?.outgoing?.[153]?.length) {
            //     this.entityTimeSpan["p82b"] = fieldsWithEdges.outgoing[153][0].targetValue?.timePrimitive ?? undefined;
            // }


        }
        return this
    }

}
