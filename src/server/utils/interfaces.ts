import { Observable } from 'rxjs';

export interface ErrorObj {
  statusCode?: number,
  name: string,
  message?: any
}
export interface HookResult<R> {
  error?: ErrorObj,
  res?: R
}

export type HookFn<R> = () => Observable<HookResult<R>>


/**
 * Query interfaces
 */
export interface BuiltQuery {
  sql: string,
  params: any[]
}

export type SchemaQueryRes = {
  dat: {
    column: {
      pk_entity: number,
    }[]
  }
}

/**
 * Loopback 3 interfaces
 *
 * Remark: These interfaces are not complete. They only cover the parts needed
 * by files in /src/*.ts
 */

export interface Lb3App {
  models: Lb3Models
  dataSources: {
    postgres1: {
      connector: Lb3Connector
    }
  }
}

export interface Lb3Connector {
  execute: (sql: string, params: any[], callback: (err: any, resultObjects: any[]) => void) => {}
}

export interface Lb3Models {
  [modelName: string]: {
    definition: {
      properties: {
        [colName: string]: {
          hidden?: boolean
        }
      }
    }
  }
}
