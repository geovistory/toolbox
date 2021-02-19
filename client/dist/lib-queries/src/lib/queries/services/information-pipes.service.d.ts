import { NgRedux } from '@angular-redux/store';
import { IAppState } from '@kleiolab/lib-redux';
import { InfStatement } from '@kleiolab/lib-sdk-lb3';
import { GvSubfieldPage } from '@kleiolab/lib-sdk-lb4';
import { TimePrimitivePipe, TimeSpanPipe } from '@kleiolab/lib-utils';
import { Observable } from 'rxjs';
import { AppellationItem } from '../models/AppellationItem';
import { BasicStatementItem } from '../models/BasicStatementItem';
import { ClassAndTypeNode } from '../models/ClassAndTypeNode';
import { ClassAndTypeSelectModel } from '../models/ClassAndTypeSelectModel';
import { DimensionItem } from '../models/DimensionItem';
import { EntityPreviewItem } from '../models/EntityPreviewItem';
import { EntityProperties } from '../models/EntityProperties';
import { Field } from '../models/Field';
import { ItemList } from '../models/ItemList';
import { LangStringItem } from '../models/LangStringItem';
import { LanguageItem } from '../models/LanguageItem';
import { PlaceItem } from '../models/PlaceItem';
import { PropertyOption } from '../models/PropertyOption';
import { PropertySelectModel } from '../models/PropertySelectModel';
import { StatementProjRel, StatementTarget, StatementWithTarget } from '../models/StatementWithTarget';
import { Subfield } from '../models/Subfield';
import { SubfieldType } from '../models/SubfieldType';
import { TemporalEntityRemoveProperties } from '../models/TemporalEntityRemoveProperties';
import { TemporalEntityRow } from '../models/TemporalEntityRow';
import { TimePrimitiveItem } from '../models/TimePrimitiveItem';
import { TimeSpanItem } from '../models/TimeSpanItem';
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
    pipeListLength(l: Subfield, pkEntity: number): Observable<number>;
    pipeList(l: Subfield, pkEntity: any, limit?: number): Observable<ItemList>;
    pipeListBasicStatementItems(listDefinition: Subfield, pkEntity: number, pkProject: number): Observable<BasicStatementItem[]>;
    /**
     * Pipe the items in appellation field
     */
    pipeListAppellation<T>(listDefinition: Subfield, pkEntity: number, limit?: number): Observable<AppellationItem[]>;
    /**
   * Pipe the items in entity preview field
   */
    pipeListEntityPreview<T>(listDefinition: Subfield, pkEntity: number, limit?: number): Observable<EntityPreviewItem[]>;
    pipeListLanguage<T>(listDefinition: Subfield, pkEntity: number, limit?: number): Observable<LanguageItem[]>;
    /**
     * Pipe the items in place list
     */
    pipeListPlace<T>(listDefinition: Subfield, pkEntity: number, limit?: number): Observable<PlaceItem[]>;
    /**
     * Pipe the items in place list
     */
    pipeListDimension<T>(listDefinition: Subfield, pkEntity: number, limit?: number): Observable<DimensionItem[]>;
    /**
   * Pipe the items in langString list
   */
    pipeListLangString<T>(listDefinition: Subfield, pkEntity: number, limit?: number): Observable<LangStringItem[]>;
    /**
     * pipe the project relation of given statment, if the scope of this page is inProject
     * @param stmt InfStatement to be completed with projRel
     * @param page page for which we are piping this stuff
     */
    pipeProjRelOfStatement(stmt: InfStatement, page: GvSubfieldPage): Observable<StatementProjRel>;
    /**
     * pipe the target of given statment
     * @param stmt InfStatement to be completed with target
     * @param page page for which we are piping this stuff
     * @param subfieldType type of subfield for which we pipe this stupp
     */
    pipeTargetOfStatement(stmt: InfStatement, page: GvSubfieldPage, subfieldType: SubfieldType): Observable<StatementTarget>;
    /**
     * pipe target and projRel of the given statement
     */
    pipeStatementWithTarget(stmt: InfStatement, page: GvSubfieldPage, subfieldType: SubfieldType): Observable<StatementWithTarget>;
    pipeSubfieldPage(page: GvSubfieldPage, subfieldType: SubfieldType): Observable<StatementWithTarget[]>;
    /**
     * Pipe the temporal entities connected to given entity by statements that are in the current project
     */
    pipeItemTeEnRow(pkEntity: number, fieldDefinitions: Field[], pkProject: number, repo: boolean): Observable<TemporalEntityRow>;
    private pipeItem;
    pipeEntityProperties(listDef: Subfield, fkEntity: number, limit?: number): Observable<EntityProperties>;
    pipeTemporalEntityRemoveProperties(pkEntity: number): Observable<TemporalEntityRemoveProperties>;
    getEntityProperties(listDefinition: Subfield, items: any): EntityProperties;
    /**
     * Pipe time span item in version of project
     */
    pipeItemTimeSpan(pkEntity: any): Observable<TimeSpanItem>;
    pipeItemAppellation(statement: InfStatement): Observable<AppellationItem>;
    pipeItemLanguage(statement: InfStatement): Observable<LanguageItem>;
    pipeItemPlace(statement: InfStatement): Observable<PlaceItem>;
    pipeItemDimension(statement: InfStatement): Observable<DimensionItem>;
    pipeItemLangString(statement: InfStatement): Observable<LangStringItem>;
    pipeItemEntityPreview(statement: InfStatement, isOutgoing: boolean): Observable<EntityPreviewItem>;
    /**
     * @param pk
     */
    pipeItemTimePrimitive(statement: InfStatement, pkProject: any): Observable<TimePrimitiveItem>;
    /*********************************************************************
    * Pipe alternatives (not in project)
    *********************************************************************/
    pipeAltListLength(l: Subfield, pkEntity: number): Observable<number>;
    pipeAltList(l: Subfield, pkEntity: any): Observable<ItemList>;
    pipeAltListStatements(listDefinition: Subfield, pkEntity: number): Observable<InfStatement[]>;
    /**
    * Pipe the items in entity preview field
    */
    pipeAltListEntityPreview<T>(listDefinition: Subfield, pkEntity: any): Observable<EntityPreviewItem[]>;
    /**
     * Pipe the alternative items in place list
     */
    pipeAltListPlace<T>(listDefinition: Subfield, pkEntity: any): Observable<PlaceItem[]>;
    /**
     * Pipe the alternative items in dimension list
     */
    pipeAltListDimension<T>(listDefinition: Subfield, pkEntity: any): Observable<DimensionItem[]>;
    /**
     * Pipe the alternative items in langString list
     */
    pipeAltListLangString<T>(listDefinition: Subfield, pkEntity: any): Observable<LangStringItem[]>;
    /**
     * Pipe the alternative items in appellation field
     */
    pipeAltListAppellation<T>(listDefinition: Subfield, pkEntity: any): Observable<AppellationItem[]>;
    /**
     * Pipe the alternative items in language field
     */
    pipeAltListLanguage<T>(listDefinition: Subfield, pkEntity: any): Observable<LanguageItem[]>;
    /*********************************************************************
     * Pipe repo views (community favorites, where restricted by quantifiers)
     *********************************************************************/
    /**
     * Pipe repository temporal entity item in the way it is defined by the repository
     */
    /**
     * Pipe appellation list in the way it is defined by the repository
     */
    pipeRepoListAppellation<T>(listDefinition: Subfield, pkEntity: any): Observable<AppellationItem[]>;
    /**
    * Pipe language list in the way it is defined by the repository
    */
    pipeRepoListLanguage<T>(listDefinition: Subfield, pkEntity: any): Observable<LanguageItem[]>;
    /**
     * Pipe place list in the way it is defined by the repository
     */
    pipeRepoListPlace<T>(listDefinition: Subfield, pkEntity: any): Observable<PlaceItem[]>;
    /**
    * Pipe place list in the way it is defined by the repository
    */
    pipeRepoListDimension<T>(listDefinition: Subfield, pkEntity: any): Observable<DimensionItem[]>;
    /**
    * Pipe the items in entity preview field, connected by community favorite statements
    */
    pipeRepoListEntityPreview<T>(listDefinition: Subfield, pkEntity: any): Observable<EntityPreviewItem[]>;
    /**
     * Pipe repo time span item
     */
    pipeRepoItemTimeSpan(pkEntity: any): Observable<TimeSpanItem>;
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
