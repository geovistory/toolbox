import {groupBy} from 'ramda';
import {GvFieldPageScope} from '../../../models';
import {GvFieldPageReq} from '../../../models/field/gv-field-page-req';
import {groupTypeToSql} from './groupTypeToSql';
import {reqsToTable} from './reqsToTable';

export interface GroupType {
  scope: GvFieldPageScope;
  isOutgoing: boolean;
}

interface RequestGroup {
  groupType: GroupType;
  requests: GvFieldPageReq[];
};

/**
 * Transforms a fieldPageRequest into an array SQL statements.
 * Each of these SQL statements can be passed to database
 * to query the field page.
 *
 *
 * @param heterogenousArray
 */
export function fieldPageReqsToSqlArray(heterogenousArray: GvFieldPageReq[]): string[] {
  const homogenousArrays = regroupHomogenous(heterogenousArray)
  return homogenousArrays.map(item => requestGroupToSql(item))
}


/**
 * Regroups potentially heterogenous array of GvFieldPageReq into
 * arrays of homogenous requests regarding scope and direction.
 *
 * Background: QFieldPage4 needs fieldPageRequest with the same scope
 * and direction.
 */
function regroupHomogenous(reqs: GvFieldPageReq[]): RequestGroup[] {
  const groups = groupBy((r) => JSON.stringify({scope: r.page.scope, isOutgoing: r.page.isOutgoing}), reqs)
  const result: RequestGroup[] = []
  for (const key in groups) {
    if (Object.prototype.hasOwnProperty.call(groups, key)) {
      const groupType: {scope: GvFieldPageScope, isOutgoing: boolean} = JSON.parse(key)
      const requests = groups[key];
      result.push({groupType, requests})
    }
  }
  return result
}




/**
 * Creates one executable sql for one RequestGroup
 * @param rg
 */
function requestGroupToSql(rg: RequestGroup): string {
  const upperPart = reqsToTable(rg.requests)
  const lowerPart = groupTypeToSql(rg.groupType)
  return `
  WITH tw0 AS (
    ${upperPart}
  )
  ${lowerPart}
  `
}



