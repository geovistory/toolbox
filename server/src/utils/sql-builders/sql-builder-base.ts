/* eslint-disable @typescript-eslint/no-explicit-any */
import {logSql} from '../helpers';

export interface BuiltQuery {
  sql: string,
  params: any[]
}

/**
 *  Class providing basic logic for building SQL
 *
 * To be extended by specific sql builder implementations
 */
export class SqlBuilderBase {

  // contains the parameters
  params: any[] = [];

  // contains the sql (potentially parametrized)
  sql = '';

  // allows to increase n of $n when used as subquery of parent SqlBuilder
  paramsOffset = 0

  constructor() {

  }

  /**
   * adds a parameter to this.params and returns
   * the corresponding string ($1, $2, etc.) for
   * parametrized postgres queries:
   *
   * Read https://node-postgres.com/features/queries
   *
   * @param val value of the parameter
   */
  addParam(val: any) {
    this.params.push(val);
    return '$' + (this.params.length + this.paramsOffset);
  }

  /**
   * adds multiple parameters.
   *
   * see this.addParams() for more information.
   *
   * @param vals
   */
  addParams(vals: any[]) {
    return vals.map(val => this.addParam(val)).join(',');
  }

  /**
   * Returns the built query
   */
  getBuiltQuery(prefix?: string): BuiltQuery {
    logSql(this.sql, this.params, prefix)
    return {sql: this.sql, params: this.params}
  }


}
