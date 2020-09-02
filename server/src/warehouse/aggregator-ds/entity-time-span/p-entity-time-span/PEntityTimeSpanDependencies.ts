import {ClearAll} from '../../../base/classes/ClearAll'
import {DependencyIndex} from '../../../base/classes/DependencyIndex'
import {pEntityIdToString, stringToPEntityId} from '../../../base/functions'
import {EntityFields} from "../../../primary-ds/edge/edge.commons"
import {PEntityId, PEntity} from '../../../primary-ds/entity/PEntityService'
import {Warehouse} from '../../../Warehouse'
import {PEntityTimeSpanVal} from './PEntityTimeSpanService'

export class PEntityTimeSpanDependencies extends ClearAll {

    //the timespan depends on:
    //duration: information.time_primitive column duration
    //julian day: information.time_primitive column julian_day
    //calendar: project.info_proj_rel column calendar
    //property of timespan (71, 72, 150, 151, 152, 153): information.statement

    /**
     * [DONE] To have the duration/julian_day we need to first know if the entity is a PeIt or a teEn
     * If it is a teEn, we need to find the statement($1) associating this teEn with one of the timespan properties (71, 72, 150, 151, 152, 153) with a timeprimitive
     * When we have found it we have 3/4 of the informations.
     * Now we still need to get the calendar type: find the calendar type of the relation between the statement $1 and the project
     *
     *
     *
     * So to get the EntityTimeSpan we need:
     *      - pEntity : to know if it is a peIt or teEn
     *      - pEdge : to access the outgoing properties (71, 72, 150, 151, 152, 153)
     *      - (xxx): in the pEdge : the timeprimitive to have duration/julian_day
     *      - (yyy): in the pEdge : the project to access the calendar
     *
     */

    pEntity: DependencyIndex<PEntityId, PEntityTimeSpanVal, PEntityId, PEntity>
    pEdge: DependencyIndex<PEntityId, PEntityTimeSpanVal, PEntityId, EntityFields>

    constructor(private wh: Warehouse) {
        super()
        // stores the dependency of entityType (receiver) on entity (provider)
        this.pEntity = new DependencyIndex(
            this.wh.agg.pEntityTimeSpan,
            this.wh.prim.pEntity,
            pEntityIdToString,
            stringToPEntityId,
            pEntityIdToString,
            stringToPEntityId,
        )

        // stores the dependency of entityType (receiver) on edge (provider)
        this.pEdge = new DependencyIndex(
            this.wh.agg.pEntityTimeSpan,
            this.wh.prim.pEdge,
            pEntityIdToString,
            stringToPEntityId,
            pEntityIdToString,
            stringToPEntityId,
        );

    }

    async clearAll() {
        await Promise.all([
            this.pEdge.clearIdx(),
            this.pEntity.clearIdx(),
        ])
    }

    async initIdx() {}
}
