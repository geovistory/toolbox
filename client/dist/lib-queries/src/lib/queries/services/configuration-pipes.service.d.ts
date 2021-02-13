import { DfhClass, DfhLabel, DfhProperty, InfLanguage, ProClassFieldConfig, ProTextProperty, SysConfigValue } from '@kleiolab/lib-sdk-lb4';
import { Observable } from 'rxjs';
import { Field } from '../models/Field';
import { SubfieldType } from '../models/SubfieldType';
import { ActiveProjectPipesService } from './active-project-pipes.service';
import { SchemaSelectorsService } from './schema-selectors.service';
export declare type TableName = 'appellation' | 'language' | 'place' | 'time_primitive' | 'lang_string' | 'dimension' | 'persistent_item' | 'temporal_entity';
export interface DfhPropertyStatus extends DfhProperty {
    removedFromAllProfiles: boolean;
}
declare type LabelOrigin = 'of project in project lang' | 'of default project in project lang' | 'of default project in english' | 'of ontome in project lang' | 'of ontome in english';
export declare class ConfigurationPipesService {
    private a;
    private s;
    constructor(a: ActiveProjectPipesService, s: SchemaSelectorsService);
    /**
    * returns observable number[] wher the numbers are the pk_profile
    * of all profiles that are enabled by the given project.
    * The array will always include PK_PROFILE_GEOVISTORY_BASIC
    */
    pipeProfilesEnabledByProject(): Observable<number[]>;
    /**
     * Pipe all fields of given class
     * The Fields are not ordered and not filtered
     * If you want specific subsets of Fields and/or ordered Fields, use the pipes
     * that build on this pipe.
     */
    pipeFields(pkClass: number): Observable<Field[]>;
    /**
     * pipe all the specific fields of a class,
     * ordered by the position of the field within the specific fields
     */
    pipeSpecificFieldOfClass(pkClass: number): Observable<Field[]>;
    /**
      * pipe all the basic fields of a class,
      * ordered by the position of the field within the basic fields
      */
    pipeBasicFieldsOfClass(pkClass: number): Observable<Field[]>;
    /**
       * Pipes the fields for temporal entity forms
       * - the specific fields
       * - the when field
       * - if available: the type field
       */
    pipeFieldsForTeEnForm(pkClass: number): Observable<Field[]>;
    /**
     * Pipes the fields of given class in this order:
     * - basic fields
     * - specific fields
     */
    pipeBasicAndSpecificFields(pkClass: number): Observable<Field[]>;
    /**
    * Pipes the fields of given class in this order:
    * - specific fields
    * - basic fields
    */
    pipeSpecificAndBasicFields(pkClass: number): Observable<Field[]>;
    private pipePropertiesToSubfields;
    /**
     * Pipes the type of Subfield for a given class
     * Currently (to be revised if good) sublcasses of E55 Type,
     * that are the target of a field with targetMaxQantity=1,
     * get Subfield type 'hasType'.
     * Therefore targetMaxQuantity is needed.
     *
     * This behavior has to be revised, because it can lead to problems
     * when the Subfield belongs to a Field with multiple target classes
     * (and thus Subfields) because the UI then does not allow to choose
     * the right target class.
     */
    pipeSubfieldTypeOfClass(config: SysConfigValue, pkClass: number, targetMaxQuantity: number): Observable<SubfieldType>;
    /**
     * Gets class field configs of given pkClass
     *
     * - of active project, if any, else
     * - of default config project, else
     * - empty array
     *
     */
    pipeFieldConfigs(pkClass: number): Observable<ProClassFieldConfig[]>;
    /********************************************** */
    /**
     * Delivers class label for active project
     */
    pipeClassLabel(pkClass?: number): Observable<string>;
    /**
     * Delivers array of objects with
     * text ~ the text of the property
     * origin, in this order:
     * - origin == 'of project in project lang'         (from projects.text_property)
     * - origin == 'of default project in project lang' (from projects.text_property)
     * - origin == 'of default project in english'      (from projects.text_property)
     * - origin == 'of ontome in project lang'          (from data_for_history.label)
     * - origin == 'of ontome in english'               (from data_for_history.label)
     */
    pipeLabels(d: {
        fkProject: number;
        type: 'label' | 'definition' | 'scopeNote';
        language: InfLanguage;
        pkClass?: number;
        fkProperty?: number;
        fkPropertyDomain?: number;
        fkPropertyRange?: number;
    }): Observable<{
        origin: LabelOrigin;
        text: string;
    }[]>;
    /**
     * Pipes ProTextProperty
     */
    pipeProTextProperty(d: {
        fk_project: number;
        fk_system_type: number;
        fk_language: number;
        fk_dfh_class?: number;
        fk_dfh_property?: number;
        fk_dfh_property_domain?: number;
        fk_dfh_property_range?: number;
    }): Observable<ProTextProperty>;
    /**
     * Pipes DfhLabel
     */
    pipeDfhLabel(d: {
        type: 'label' | 'definition' | 'scopeNote';
        language: string;
        fk_class?: number;
        fk_profile?: number;
        fk_property?: number;
        fk_project?: number;
    }): Observable<DfhLabel>;
    /**
     * Delivers best fitting field label for active project
    */
    pipeFieldLabel(fkProperty: number, fkPropertyDomain: number, fkPropertyRange: number): Observable<string>;
    /**
     * maps the class to the corresponding model (database table)
     * this is used by Forms to create new data in the shape of
     * the data model
     */
    pipeTableNameOfClass(targetClassPk: number): Observable<TableName>;
    /**
     * returns an object where the keys are the pks of the Classes
     * used by the given project:
     * - or because the class is enabled by class_proj_rel
     * - or because the class is required by sources
     *
     * This is usefull to create select dropdowns of classes users will know
     */
    pipeClassesInEntitiesOrSources(): Observable<{
        [key: string]: number;
    }>;
    pipeClassesRequiredBySources(): Observable<number[]>;
    /**
     * returns observable number[] wher the numbers are the pk_class
     * of all classes that are enabled by at least one of the activated profiles
     * of thte given project
     */
    pipeClassesEnabledByProjectProfiles(): Observable<DfhClass[]>;
    /**
    * returns observable number[] wher the numbers are the pk_class
    * of all type classes that are enabled by at least one of the activated profiles
    * of thte given project
    */
    pipeTypeClassesEnabledByProjectProfiles(): Observable<DfhClass[]>;
    /**
     * returns observable number[] where the numbers are the pk_class
     * of all classes that are enabled by active project (using class_proj_rel)
     */
    pipeClassesEnabledInEntities(): Observable<number[]>;
    /**
    * returns an object where the keys are the pks of the TeEn Classes
    * used by the given project
    */
    pipeSelectedTeEnClassesInProject(): Observable<{
        [key: string]: number;
    }>;
    /**
     * Gets array of pk_class with teEn classes enabled in entities
     */
    pipeTeEnClassesEnabledInEntities(): Observable<number[]>;
    /**
     * Filters array of DfhClass for TeEn Classes and returns array of pk_class
     * @param dfhClasses array of DfhClass
     * @returns returns array of pk_class where class is TeEn class
     */
    private filterTeEnCasses;
    /**
     * Gets array of pk_class with teEn classes required by sources
     */
    pipeTeEnClassesRequiredBySources(): Observable<number[]>;
    /**
     *
     */
    pipeTypeAndTypedClasses(enabledIn?: 'entities' | 'sources'): Observable<{
        typedClass: number;
        typeClass: number;
    }[]>;
    pipeTypeAndTypedClassesOfTypedClasses(pkTypedClasses: number[]): Observable<{
        typedClass: number;
        typeClass: number;
    }[]>;
    pipeTypeClassOfTypedClass(pkTypedClass: any): Observable<number>;
    pipeTypedClassesOfTypeClasses(pkTypeClasses: number[]): Observable<number[]>;
    pipeTypePropertyOfTypedClass(pkTypedClass: any): Observable<number>;
    pipeTargetClassesOfProperties(pkProperties: number[], isOutgoing: boolean): Observable<number[]>;
}
export {};
/**
 * Pipes the fields for temporal entity forms
 * - the specific fields
 * - the when field
 * - if available: the type field
 */
/**
 * Pipe the specific fields of given class
 */
/**
 * Pipe the fields for identification of given class
 */
