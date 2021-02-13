import { IconType } from '@kleiolab/lib-redux';
import { InfStatement, InfTimePrimitive } from '@kleiolab/lib-sdk-lb3';
import { TimeSpanUtil } from '@kleiolab/lib-utils';
import { Observable } from 'rxjs';
import { BasicStatementItem } from '../models/BasicStatementItem';
import { Subfield } from '../models/Subfield';
import { ActiveProjectPipesService } from './active-project-pipes.service';
import { SchemaSelectorsService } from './schema-selectors.service';
export declare class InformationBasicPipesService {
    private p;
    private s;
    constructor(p: ActiveProjectPipesService, s: SchemaSelectorsService);
    /*********************************************************************
     * Project
    *********************************************************************/
    /**
   * Pipe statements of an entity
   */
    pipeStatements(pkEntity: number, isOutgoing: any): Observable<InfStatement[]>;
    /**
    * Pipe outgoing statements of an entity
    */
    pipeOutgoingStatements(pkEntity: any): Observable<InfStatement[]>;
    /**
     * Pipe ingoing statements of an entity
     */
    pipeIngoingStatements(pkEntity: any): Observable<InfStatement[]>;
    pipeStatementsOfList(listDefinition: Subfield, pkEntity: any): Observable<InfStatement[]>;
    /**
     * Pipe outgoing statements of temporal entity
     */
    pipeOutgoingStatementsByProperty(pkProperty: any, pkEntity: any): Observable<InfStatement[]>;
    /**
     * Pipe ingoing statements of an entity
     */
    pipeIngoingStatementsByProperty(pkProperty: any, pkEntity: any): Observable<InfStatement[]>;
    /**
   * Pipe outgoing statements of temporal entity
   */
    pipeOutgoingBasicStatementItemsByProperty(pkProperty: any, pkEntity: any, pkProject: number): Observable<BasicStatementItem[]>;
    /**
     * Pipe ingoing statements of an entity
     */
    pipeIngoingBasicStatementItemsByProperty(pkProperty: any, pkEntity: any, pkProject: number): Observable<BasicStatementItem[]>;
    private pipeBasicStatementItem;
    pipeBasicStatementItemByPkStatement(pkProject: number, pkStatement: number, isOutgoing: boolean): Observable<BasicStatementItem>;
    pipeInfTimePrimitive(pkEntity: number): Observable<InfTimePrimitive>;
    /**
     * pipes the TimeSpan of a temporal entity
     * @param pkEntity the pk_entity of the termporal entity
     */
    pipeTimeSpan(pkEntity: number): Observable<TimeSpanUtil>;
    /**
     * Pipes max. one time primitive for an array of statements, assuming that the statements
     * are of the same properties.
     */
    timePrimitiveOfStatements: () => import("rxjs").UnaryFunction<Observable<InfStatement[]>, Observable<any>>;
    /**
     * Pipes the fk_class of the given entity
     */
    pipeClassOfEntity(pkEntity: number): Observable<number>;
    /**
     * Pipes distinct fk_classes of the given persistent items
     */
    pipeClassesOfPersistentItems(pkEntities: number[]): Observable<number[]>;
    /*********************************************************************
     * Repo
    *********************************************************************/
    /**
      * Pipe repo outgoing statements.
      */
    pipeRepoOutgoingStatements(pkEntity: any): Observable<InfStatement[]>;
    /**
    * Pipe repo ingoing statements.
    */
    pipeRepoIngoingStatements(pkEntity: any): Observable<InfStatement[]>;
    /**
      * Pipe repo outgoing statements.
      * If max quantity is limited, takes only max allowed number of statements, starting with highest is_in_project_count
      */
    pipeRepoOutgoingStatementsByProperty(pkProperty: any, pkEntity: any): Observable<InfStatement[]>;
    /**
    * Pipe repo ingoing statements.
    * If max quantity is limited, takes only max allowed number of statements, starting with highest is_in_project_count
    */
    pipeRepoIngoingStatementsByProperty(pkProperty: any, pkEntity: any): Observable<InfStatement[]>;
    /*********************************************************************
     * Alternatives (Repo minus Project)
    *********************************************************************/
    pipeAlternativeBasicStatementItemByPkStatement(pkStatement: number, isOutgoing: boolean): Observable<BasicStatementItem>;
    /**
       * Pipe alternative ingoing statements (= statements not in active project)
       */
    pipeAlternativeIngoingStatements(pkProperty: any, pkEntity: any): Observable<InfStatement[]>;
    /**
     * Pipe alternative outgoing statements (= statements not in active project)
     */
    pipeAlternativeOutgoingStatements(pkProperty: any, pkEntity: any): Observable<InfStatement[]>;
    /**
     * get array of pks of persistent items of a specific class
     */
    pipePersistentItemPksByClass(pkClass: any): Observable<number[]>;
    /**
     * gets the css classes for that entity
     * @param pkEntity
     */
    pipeIconType(pkEntity: number): Observable<IconType>;
    /*********************************************************************
     * Helpers
     *********************************************************************/
    sortStatementsByRepoPopularity(statements: InfStatement[]): InfStatement[];
}
