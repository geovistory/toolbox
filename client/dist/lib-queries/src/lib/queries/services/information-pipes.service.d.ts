import { NgRedux } from '@angular-redux/store';
import { IAppState } from '@kleiolab/lib-redux';
import { InfStatement } from '@kleiolab/lib-sdk-lb3';
import { GvFieldPage, GvFieldTargets } from '@kleiolab/lib-sdk-lb4';
import { TimePrimitivePipe, TimeSpanPipe } from '@kleiolab/lib-utils';
import { Observable } from 'rxjs';
import { ClassAndTypeNode } from '../models/ClassAndTypeNode';
import { ClassAndTypeSelectModel } from '../models/ClassAndTypeSelectModel';
import { PropertyOption } from '../models/PropertyOption';
import { PropertySelectModel } from '../models/PropertySelectModel';
import { StatementProjRel, StatementTarget, StatementWithTarget, SubfieldPage } from '../models/StatementWithTarget';
import { InfSelector } from '../selectors/inf.service';
import { ActiveProjectPipesService } from './active-project-pipes.service';
import { ConfigurationPipesService } from './configuration-pipes.service';
import { InformationBasicPipesService } from './information-basic-pipes.service';
import { SchemaSelectorsService } from './schema-selectors.service';
export declare class InformationPipesService {
    private b;
    private p;
    private s;
    private c;
    timePrimitivePipe: TimePrimitivePipe;
    private timeSpanPipe;
    infRepo: InfSelector;
    constructor(b: InformationBasicPipesService, p: ActiveProjectPipesService, s: SchemaSelectorsService, c: ConfigurationPipesService, timePrimitivePipe: TimePrimitivePipe, timeSpanPipe: TimeSpanPipe, ngRedux: NgRedux<IAppState>);
    /*********************************************************************
     * Pipe the project entities
     *********************************************************************/
    /**
     * pipe the project relation of given statment, if the scope of this page is inProject
     * @param stmt InfStatement to be completed with projRel
     * @param page page for which we are piping this stuff
     */
    pipeProjRelOfStatement(stmt: InfStatement, page: GvFieldPage): Observable<StatementProjRel>;
    /**
     * pipe the target of given statment
     * @param stmt InfStatement to be completed with target
     * @param page page for which we are piping this stuff
     * @param subfieldType type of subfield for which we pipe this stuff
     */
    pipeTargetOfStatement(stmt: InfStatement, page: GvFieldPage, targets: GvFieldTargets): Observable<StatementTarget>;
    /**
     * pipe target and projRel of the given statement
     */
    pipeStatementWithTarget(stmt: InfStatement, page: GvFieldPage, targets: GvFieldTargets): Observable<StatementWithTarget>;
    pipeSubfieldPage(page: GvFieldPage, targets: GvFieldTargets): Observable<SubfieldPage>;
    private pipeTimeSpan;
    /**
     * Pipes the label of given entity
     * This will use entity previews for getting strings of related temporal entities
     * So this may take a little while
     */
    pipeLabelOfEntity(fkEntity: number): Observable<string>;
    /**
     * Pipes the class label of given entity
     */
    pipeClassLabelOfEntity(fkEntity: number): Observable<string>;
    /**
     * Pipes the pk_entity of the type of an entity
     */
    pipeTypeOfEntity(pkEntity: number, hasTypeProperty: number, isOutgoing: boolean): Observable<InfStatement>;
    pipeClassesAndTypes(enabledIn: 'entities' | 'sources'): Observable<ClassAndTypeNode[]>;
    pipeClassesAndTypesOfClasses(classes: number[]): Observable<ClassAndTypeNode[]>;
    pipeClassAndTypeNodes(typeAndTypedClasses: {
        typedClass: number;
        typeClass: number;
    }[]): Observable<ClassAndTypeNode[]>;
    /**
     * returns array of pk_class of all classes and typed classes.
     * @param classesAndTypes a object containing {classes: [], types[]}
     */
    pipeClassesFromClassesAndTypes(classesAndTypes: ClassAndTypeSelectModel): Observable<number[]>;
    pipePropertyOptionsFromClassesAndTypes(classesAndTypes: ClassAndTypeSelectModel): Observable<PropertyOption[]>;
    pipePropertyOptionsFormClasses(classes: number[]): Observable<PropertyOption[]>;
    pipePkClassesFromPropertySelectModel(model: PropertySelectModel): Observable<number[]>;
    getPkClassesFromPropertySelectModel$(model$: Observable<PropertySelectModel>): Observable<number[]>;
    getPropertyOptions$(classTypes$: Observable<ClassAndTypeSelectModel>): Observable<PropertyOption[]>;
}
export declare function propertyOptionFieldKey(fkProperty: number, isOutgoing: boolean): string;
