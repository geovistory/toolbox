import {AbstractAggregator} from '../../base/classes/AbstractAggregator';
import {PEntityId} from '../../primary-ds/PEntityService';
import {PEntityTimeSpanProviders} from './PEntityTimeSpanPoviders';
import {Granularity, CalendarType} from '../../primary-ds/PEdgeService';

export class PEntityTimeSpanAggregator extends AbstractAggregator<PEntityId> {

    // the resulting entityTimeSpan
    entityTimeSpan = '{}';

    // For testing / debugging
    labelMissing = true;

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

            const fieldsWithEdges = await this.providers.pEdges.get(this.id);

            const obj: {[key: string]: {duration: Granularity, julianDay: number, calendar: CalendarType}} = {};

            //ongoing throughout
            if (fieldsWithEdges?.outgoing?.[71]) obj["p81"] = {
                duration: fieldsWithEdges?.outgoing?.[71].targetValue.timePrimitive.duration,
                julianDay: fieldsWithEdges?.outgoing?.[71].targetValue.timePrimitive.julianDay,
                calendar: fieldsWithEdges?.outgoing?.[71].targetValue.timePrimitive.calendar
            }
            //at some time within
            if (fieldsWithEdges?.outgoing?.[72]) obj["p82"] = {
                duration: fieldsWithEdges?.outgoing?.[72].targetValue.timePrimitive.duration,
                julianDay: fieldsWithEdges?.outgoing?.[72].targetValue.timePrimitive.julianDay,
                calendar: fieldsWithEdges?.outgoing?.[72].targetValue.timePrimitive.calendar
            }
            //end of the begin
            if (fieldsWithEdges?.outgoing?.[150]) obj["p81a"] = {
                duration: fieldsWithEdges?.outgoing?.[150].targetValue.timePrimitive.duration,
                julianDay: fieldsWithEdges?.outgoing?.[150].targetValue.timePrimitive.julianDay,
                calendar: fieldsWithEdges?.outgoing?.[150].targetValue.timePrimitive.calendar
            }
            //begin of the end
            if (fieldsWithEdges?.outgoing?.[151]) obj["p81b"] = {
                duration: fieldsWithEdges?.outgoing?.[151].targetValue.timePrimitive.duration,
                julianDay: fieldsWithEdges?.outgoing?.[151].targetValue.timePrimitive.julianDay,
                calendar: fieldsWithEdges?.outgoing?.[151].targetValue.timePrimitive.calendar
            }
            //begin of the begin
            if (fieldsWithEdges?.outgoing?.[152]) obj["p82a"] = {
                duration: fieldsWithEdges?.outgoing?.[152].targetValue.timePrimitive.duration,
                julianDay: fieldsWithEdges?.outgoing?.[152].targetValue.timePrimitive.julianDay,
                calendar: fieldsWithEdges?.outgoing?.[152].targetValue.timePrimitive.calendar
            }
            //end of the end
            if (fieldsWithEdges?.outgoing?.[153]) obj["p82b"] = {
                duration: fieldsWithEdges?.outgoing?.[153].targetValue.timePrimitive.duration,
                julianDay: fieldsWithEdges?.outgoing?.[153].targetValue.timePrimitive.julianDay,
                calendar: fieldsWithEdges?.outgoing?.[153].targetValue.timePrimitive.calendar
            }

            this.entityTimeSpan = JSON.stringify(obj);
        }
        return this
    }

}
