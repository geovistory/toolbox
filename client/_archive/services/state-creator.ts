import { ProjectCrm } from 'app/core/active-project';
import { SysConfig } from 'app/core';
import { InfAppellation, InfEntityAssociation, InfLanguage, InfPersistentItem, InfPlace, InfRole, InfTemporalEntity, InfTextProperty, InfTimePrimitive } from 'app/core/sdk';
import { U } from 'app/core/util/util';
import { DfhConfig } from 'app/modules/information/shared/dfh-config';
import { clone, groupBy, indexBy, omit, prop, sort } from 'ramda';
import * as Config from '../../../../../../common/config/Config';
import { AppeDetail, ExistenceTimeDetail, FieldList, LangDetail, PeItDetail, PlaceDetail, PropertyField, RoleDetail, RoleDetailList, TeEntDetail, TimePrimitveDetail } from '../models';
import { EntityAssociationDetail } from '../models/entity-association-detail';
import { EntityAssociationList } from '../models/entity-association-list';
import { Field } from '../models/field';
import { TextPropertyDetail } from '../models/text-property-detail';
import { TextPropertyField } from '../models/text-property-field';
import { TypeDetail } from '../models/type-detail';

/***************************************************
* General Interfaces
***************************************************/

export class StateSettings {
  parentRolePk?: number;
  parentPropertyField?: PropertyField;

  // If the provided pkUiContext points to a Create Context, the state creator
  // produces other states, made for *-create-crl.component.ts
  //
  // If the provided pkUiContext points to a edtitable contest, the state creator
  // produces states, made for *-editable.component.ts.
  //
  // By defaut, the state creator acts like it was in the dataunits editable context.
  pkUiContext = SysConfig.PK_UI_CONTEXT_DATAUNITS_EDITABLE;

  // If the provided pkUiContext points to a editable context,
  // you can set isViewMode to true to hide all editing functionalities from *-editable.component.ts.
  isViewMode?: boolean;

  constructor(data?: StateSettings) {
    Object.assign(this, data);
  }
}

/***************************************************
* helper functions
***************************************************/

/**
 * Returns true, if the given UiContext is a create context
 * @param pkUiContext the pk of the UiContext
 */
export function isCreateContext(pkUiContext: number): boolean {
  return [
    SysConfig.PK_UI_CONTEXT_DATAUNITS_CREATE,
    SysConfig.PK_UI_CONTEXT_DATA_SETTINGS_TYPES_CREATE,
    SysConfig.PK_UI_CONTEXT_SOURCES_CREATE
  ].indexOf(pkUiContext) > -1;
}

/**
 * Returns the create context of the given editable context
 * @param pkUiContext the pk of the UiContext
 */
export function getCreateOfEditableContext(pkUiEditableContext: number): number {
  switch (pkUiEditableContext) {
    case SysConfig.PK_UI_CONTEXT_DATAUNITS_EDITABLE:
      return SysConfig.PK_UI_CONTEXT_DATAUNITS_CREATE;

    case SysConfig.PK_UI_CONTEXT_SOURCES_EDITABLE:
      return SysConfig.PK_UI_CONTEXT_SOURCES_CREATE;

    case SysConfig.PK_UI_CONTEXT_DATA_SETTINGS_TYPES_EDITABLE:
      return SysConfig.PK_UI_CONTEXT_DATA_SETTINGS_TYPES_CREATE;

    default:
      break;
  }
}


/***************************************************
* Entity create functions
***************************************************/

/**
* Creates a PeItDetail from provided input data
*
* @param options data object to pass data to the created state model instance. it won't be passed further down the chain of create...() methods.
* @param dbData nested object as it is delivered from REST api with roles etc.
* @param crm configuration of the current reference model that decides which classes and properties are shown in which ui context
* @param settings setting object that is passed through the chain of create...() methods of the different state classes
*/
export function createPeItDetail(options: PeItDetail, peIt: InfPersistentItem, crm: ProjectCrm, settings?: StateSettings): PeItDetail {

  // init settings (adds defaults, if not otherwise provided)
  settings = new StateSettings(settings);

  // those only pollute the state unless we are in add mode.
  // if (!settings.isAddMode) delete peIt.pi_roles;

  const peItCleaned = omit(['pi_roles'], peIt);

  options = { ...options, isViewMode: settings.isViewMode, pkUiContext: settings.pkUiContext }

  return new PeItDetail({
    ...options,
    selectPropState: 'init',
    peIt: peItCleaned,
    pkEntity: peIt.pk_entity,
    fkClass: peIt.fk_class,
    _fields: createFieldList(peIt.fk_class, peIt.pi_roles, peIt.text_properties, crm, settings),
    _type: createTypeDetailOfEntity({}, peIt, crm, settings),
  })
}

/**
* Creates a createTeEntDetail from provided input data
*
* @param options data object to pass data to the created state model instance. it won't be passed further down the chain of create...() methods.
* @param dbData nested object as it is delivered from REST api with roles etc.
* @param crm configuration of the current reference model that decides which classes and properties are shown in which ui context
* @param settings setting object that is passed through the chain of create...() methods of the different state classes
*/
export function createTeEntDetail(options: TeEntDetail, teEnt: InfTemporalEntity, crm: ProjectCrm, settings?: StateSettings): TeEntDetail {

  if (!teEnt) return;

  // init settings (adds defaults, if not otherwise provided)
  settings = new StateSettings(settings);

  options = { ...options, isViewMode: settings.isViewMode, pkUiContext: settings.pkUiContext }

  return new TeEntDetail({
    ...options,
    selectPropState: 'init',
    teEnt: teEnt,
    pkEntity: teEnt.pk_entity,
    fkClass: teEnt.fk_class,
    _fields: createFieldList(teEnt.fk_class, teEnt.te_roles, teEnt.text_properties, crm, settings)
  });
}


/**
* Creates a createTypeDetail from provided entity data
*
* @param options data object to pass data to the created state model instance. it won't be passed further down the chain of create...() methods.
* @param dbData nested object as it is delivered from REST api with roles etc.
* @param crm configuration of the current reference model that decides which classes and properties are shown in which ui context
* @param settings setting object that is passed through the chain of create...() methods of the different state classes
*/
export function createTypeDetailOfEntity(options: TypeDetail, entity: InfTemporalEntity | InfPersistentItem, crm: ProjectCrm, settings: StateSettings): TypeDetail {
  // if for instances of this class we do not want types, return
  if (!entity.fk_class || !crm.classHasTypeProperty.by_pk_typed_class[entity.fk_class]) return;

  let typeEntityAssociation: InfEntityAssociation;

  // try to find domain entity association with type information
  if (entity.domain_entity_associations) {
    const property = U.obj2Arr(crm.classHasTypeProperty.by_pk_typed_class[entity.fk_class])[0].dfh_pk_property;
    typeEntityAssociation = entity.domain_entity_associations
      .find(ea => ea.fk_property === property);
  }

  return createTypeDetail(
    {
      _typeCtrl: {
        pkTypedClass: entity.fk_class,
        // If create mode, fetch type here. THis should be passed in by entity
        entityAssociation: typeEntityAssociation
      },
      fkDomainEntity: entity.pk_entity
    },
    typeEntityAssociation,
    crm,
    settings
  )
}

/**
* Creates a createTypeDetail from provided entityAssociation data
*
* @param options data object to pass data to the created state model instance. it won't be passed further down the chain of create...() methods.
* @param dbData nested object as it is delivered from REST api with roles etc.
* @param crm configuration of the current reference model that decides which classes and properties are shown in which ui context
* @param settings setting object that is passed through the chain of create...() methods of the different state classes
*/
export function createTypeDetail(options: TypeDetail, assoc: InfEntityAssociation, crm: ProjectCrm, settings: StateSettings): TypeDetail {

  const roles = !assoc ? undefined : !assoc.range_pe_it ? undefined : assoc.range_pe_it.pi_roles;

  options = { ...options, isViewMode: settings.isViewMode, pkUiContext: settings.pkUiContext }

  return new TypeDetail({
    ...options,
    entityAssociation: assoc,
    label: !roles ? '' : roles.filter(r => r.temporal_entity.fk_class === DfhConfig.CLASS_PK_APPELLATION_USE)
      .map(pir => pir.temporal_entity.te_roles.filter(ter => (ter && Object.keys((ter.appellation || {})).length))
        .map(r => {
          return r.appellation.string;
        })[0]).join(', ')
  });
}

/**
 * Creates a FieldList from provided input data
 *
 * @param fkClass
 * @param roles
 * @param textProperties
 * @param crm
 * @param settings
 */
export function createFieldList(fkClass: number, roles: InfRole[], textProperties: InfTextProperty[], crm: ProjectCrm, settings?: StateSettings): FieldList {

  // init settings (adds defaults, if not otherwise provided)
  settings = new StateSettings(settings);


  const fields = [];

  // /** exclude the circular role */
  if (roles) {
    const i = roles.findIndex(role => (role.pk_entity === settings.parentRolePk));
    if (i > -1) {
      roles.splice(i, 1)
    };
  }

  // Get class config
  const classConfig = crm.classes[fkClass];

  const uiContext = classConfig.uiContexts[settings.pkUiContext];


  if (isCreateContext(settings.pkUiContext)) {

    // add a propertyField for each propertyField in this ui-context
    if (uiContext && uiContext.uiElements) {
      uiContext.uiElements.forEach(el => {

        // if this is a element for a PropertyField
        if (
          el.propertyFieldKey
        ) {
          const propertyFieldDef = crm.fieldList[el.propertyFieldKey] as PropertyField;

          // exclude the circular PropertyFields
          if (!similarPropertyField(propertyFieldDef, settings.parentPropertyField)) {

            // Generate propertyFields (like e.g. the names-section, the birth-section or the detailed-name secition)
            const options = new PropertyField({ toggle: 'expanded' })
            const newRole = {
              fk_property: el.fk_property,
              entity_version_project_rels: [{
                is_in_project: true
              }]
            } as InfRole;

            const propertyField = createPropertyField(Object.assign({}, propertyFieldDef, options), [newRole], crm, settings);
            fields.push(propertyField);
          }
        } else if (el.fk_class_field) {
          fields.push(createClassField(el.propSetKey, [], [], crm, settings))
        }
      });
    }
  } else {
    let rolesByFkProp = {};
    if (roles && roles.length) {
      rolesByFkProp = groupBy((r) => r.fk_property.toString(), roles) as { [index: number]: InfRole[] }
    }

    // for each uiElement in this ui-context
    if (uiContext && uiContext.uiElements) {
      uiContext.uiElements.forEach(el => {


        // if this is a element for a PropertyField
        if (el.propertyFieldKey) {
          let rolesWithinQuantity: InfRole[] = [];

          // enrich PropertyField with roles and RoleDetails

          // Generate propertyFields (like e.g. the names-section, the birth-section or the detailed-name secition)
          const options = new PropertyField({ ...crm.fieldList[el.propertyFieldKey] as PropertyField, toggle: 'expanded' })

          rolesWithinQuantity = rolesByFkProp[el.fk_property];



          if (rolesWithinQuantity && rolesWithinQuantity.length > 0) {
            fields.push(createPropertyField(options, rolesWithinQuantity, crm, settings));
          }
        } else if (el.fk_class_field) {
          fields.push(createClassField(el.propSetKey, roles, textProperties, crm, settings))
        }

      });
    }

  }

  if (!fields.length) return;

  return indexBy(fieldKey, fields.filter(c => (c)));
}


/***************************************************
* Field create functions
***************************************************/


/**
 * Creates a Field from provided input data
 *
 * TODO: merge rls and text props to some "value" property
 */
export function createClassField(fieldKey: string, rls: InfRole[], textProps: InfTextProperty[], crm: ProjectCrm, settings: StateSettings): Field {

  switch (crm.fieldList[fieldKey].type) {
    case 'ExistenceTimeDetail':
      return createExistenceTimeDetail(new ExistenceTimeDetail({
        fkClassField: crm.fieldList[fieldKey].fkClassField,
        toggle: 'expanded',
        pkUiContext: settings.pkUiContext

      }), rls, crm, settings);

    case 'TextPropertyField':

      const fkClassField = crm.fieldList[fieldKey].fkClassField;

      // get array of textProps of that field
      const t = !textProps ? [] : textProps.filter((txtProp) => txtProp.fk_class_field == fkClassField)

      // if no textProps and not create mode, return
      if (t.length === 0 && !isCreateContext(settings.pkUiContext)) return;

      return createTextPropertyField(
        new TextPropertyField({
          fkClassField,
          pkUiContext: settings.pkUiContext
        }),
        t,
        crm,
        settings
      );

    default:
      break;
  }
}

/***************************************************
* Property Field create functions
***************************************************/


/**
 * Creates a PropertyField from provided input data
 *
 * @param options options will bi merged in PropertyField object
 * @param roles will be converted in _role_list
 * @param crm is not used within the PropertyField but it is passed to RoleDetail.createState()
 * @param settings state settings object.
 * TODO: change the behavior with addMode to smthng more clever
 */
export function createPropertyField(options: PropertyField, roles: InfRole[], crm: ProjectCrm, settings: StateSettings): PropertyField {

  if (!options.property) throw Error('Please provide options.property. This is important to add information about the target class of a PropertyField.');

  // prepare _role_list
  if (roles && roles.length) {

    const roleDetailArray = roles.map(role => createRoleDetail({
      isOutgoing: options.isOutgoing,
      targetClassPk: options.targetClassPk
    }, role, crm, settings))

    const sortedByOrdNum = sortRoleDetailsByOrdNum(roleDetailArray);

    options = {
      ...options,
      _role_list: indexBy(roleDetailKey, sortedByOrdNum)
    }
  }

  options = { ...options, isViewMode: settings.isViewMode, pkUiContext: settings.pkUiContext }

  return new PropertyField({
    ...options,
    targetClassPk: options.isOutgoing ? options.property.dfh_has_range : options.property.dfh_has_domain,
  });

}

/**
 * Creates a RoleDetailList from provided input data
 *
 * This function is not directly called in the chain of creating a peItDetail or a teEntDetail,
 * but is is a helper when a roleDetailList has to be extended asynchronusly for example
 * when adding roles from another project.
 *
 * @param options options will bi merged in PropertyField object
 * @param roles will be converted in a RoleDetailList
 * @param crm is not used within the PropertyField but it is passed to RoleDetail.createState()
 * @param settings state settings object.
 */
export function createRoleDetailList(options: PropertyField, roles: InfRole[], crm: ProjectCrm, settings: StateSettings): RoleDetailList {
  return createPropertyField(options, roles, crm, settings)._role_list;
}

/***************************************************
* Class Field create functions
***************************************************/

/**
* Creates a ExistenceTimeDetail from provided input data
*
* @param options data object to pass data to the created state model instance. it won't be passed further down the chain of create...() methods.
* @param roles nested object as it is delivered from REST api with roles etc.
* @param crm configuration of the current reference model that decides which classes and properties are shown in which ui context
* @param settings setting object that is passed through the chain of create...() methods of the different state classes
*/
export function createExistenceTimeDetail(options: ExistenceTimeDetail, roles: InfRole[], crm: ProjectCrm, settings: StateSettings): ExistenceTimeDetail {

  const rolesByFkProp = groupBy((r) => r.fk_property.toString(), roles) as { [index: number]: InfRole[] };
  const fieldList = clone(crm.classes[DfhConfig.ClASS_PK_TIME_SPAN].propertyFields);
  const fields: PropertyField[] = [];
  const ext = new ExistenceTimeDetail(options)


  // if (isCreateContext(settings.pkUiContext)) return ext;

  U.obj2Arr(fieldList).forEach((rs: PropertyField) => {


    if (rolesByFkProp[rs.property.dfh_pk_property]) {

      /**
       * This is a shortcut method to take max one role per PropertyField
       */
      const role = rolesByFkProp[rs.property.dfh_pk_property][0]

      // if (settings.isAddMode) {
      //     role.entity_version_project_rels = [{
      //         is_in_project: true
      //     } as InfEntityProjectRel]
      // }

      ext.roles = [...ext.roles, role]
      fields.push(createPropertyField(new PropertyField(rs), [role], crm, settings));
    }

  })

  if (!fields.length && !isCreateContext(settings.pkUiContext)) return null;
  else {
    ext._fields = indexBy(propertyFieldKey, fields)
  }

  options = { ...options, pkUiContext: settings.pkUiContext }

  return new ExistenceTimeDetail({
    ...ext,
    ...options
  });
}


/**
 * Creates a TextPropertyField from provided input data
 *
 * @param options data object to pass data to the created state model instance. it won't be passed further down the chain of create...() methods.
 * @param textProperties textProperties as delivered from REST api from nested object etc.
 * @param crm configuration of the current reference model that decides which classes and properties are shown in which ui context
 * @param settings setting object that is passed through the chain of create...() methods of the different state classes
 */
export function createTextPropertyField(options: TextPropertyField, textProperties: InfTextProperty[], crm: ProjectCrm, settings: StateSettings): TextPropertyField {
  const txtPropList = new TextPropertyField();

  const txtPropDetailOptions = new TextPropertyDetail({ fkClassField: options.fkClassField });

  if (isCreateContext(settings.pkUiContext)) {
    txtPropList.textPropertyDetailList = {
      _create: createTextPropertyDetail(
        txtPropDetailOptions,
        {} as InfTextProperty,
        crm,
        settings
      )
    }
  } else {
    txtPropList.textPropertyDetailList = indexBy(textPropertyDetailKey,
      textProperties.map((infTextProp) => {

        if (typeof infTextProp.quill_doc === 'string') {
          infTextProp.quill_doc = JSON.parse(infTextProp.quill_doc)
        }

        return createTextPropertyDetail(
          txtPropDetailOptions,
          infTextProp,
          crm,
          settings
        )
      })
    )
  }

  return new TextPropertyField({
    ...txtPropList,
    ...options
  });
}


/**
 * Creates a TextPropertyDetail from provided input data
 *
 * @param options data object to pass data to the created state model instance. it won't be passed further down the chain of create...() methods.
 * @param textProperty textProperty as delivered from REST api from nested object etc.
 * @param crm configuration of the current reference model that decides which classes and properties are shown in which ui context
 * @param settings setting object that is passed through the chain of create...() methods of the different state classes
 */
export function createTextPropertyDetail(options: TextPropertyDetail, textProperty: InfTextProperty, crm?: ProjectCrm, settings?: StateSettings): TextPropertyDetail {
  const txtPropDetail = new TextPropertyDetail({ textProperty });

  switch (options.fkClassField) {
    case SysConfig.PK_CLASS_FIELD_ENTITY_DEFINITION:
      txtPropDetail.textareaLike = true;
      txtPropDetail.inputLike = false;
      break;

    case SysConfig.PK_CLASS_FIELD_EXACT_REFERENCE:
    case SysConfig.PK_CLASS_FIELD_SHORT_TITLE:
      txtPropDetail.textareaLike = false;
      txtPropDetail.inputLike = true;
      break;

    default:
      break;
  }

  return new TextPropertyDetail({
    ...txtPropDetail,
    ...options
  });
}

/***************************************************
* Role State create functions
***************************************************/

/**
 * Creates a RoleDetail from provided input data
 *
 * @param options data object to pass data to the created state model instance. it won't be passed further down the chain of create...() methods.
 * @param dbData nested object as it is delivered from REST api with roles etc.
 * @param crm configuration of the current reference model that decides which classes and properties are shown in which ui context
 * @param settings setting object that is passed through the chain of create...() methods of the different state classes
 */
export function createRoleDetail(options: RoleDetail = new RoleDetail(), role: InfRole, crm: ProjectCrm, settings?: StateSettings): RoleDetail {

  // init settings (adds defaults, if not otherwise provided)
  settings = new StateSettings(settings);

  if (!role) return undefined;


  const roleDetail: RoleDetail = {
    role: new InfRole(role),
    isCircular: false,
    ...options
  };

  if (role && role.entity_version_project_rels && role.entity_version_project_rels[0]) {
    // TODO uncomment as soon as we have the corresponding data model
    // role.entity_version_project_rels[0].is_display_role_for_domain
    roleDetail.isDisplayRoleForDomain = null
    roleDetail.isDisplayRoleForRange = role.entity_version_project_rels[0].is_standard_in_project;
  }

  const targetClassConfig = crm.classes[options.targetClassPk];

  /** If role leads to TeEnt or Presence */
  if ((
    targetClassConfig
    && (targetClassConfig.subclassOf === 'teEnt' || targetClassConfig.dfh_pk_class == DfhConfig.CLASS_PK_PRESENCE)
  ) || role.temporal_entity && role.temporal_entity.pk_entity
  ) {
    // add the parent role pk of the roleDetail to the peEnt
    settings.parentRolePk = role.pk_entity;
    settings.parentPropertyField = crm
      .fieldList[propertyFieldKeyFromParams(role.fk_property, options.isOutgoing)] as PropertyField;

    // if we are in create mode we need the fk_class
    if (isCreateContext(settings.pkUiContext)) {
      roleDetail.role.temporal_entity = role.temporal_entity = {
        ...role.temporal_entity,
        fk_class: options.targetClassPk
      }
    }

    roleDetail._teEnt = createTeEntDetail(undefined, role.temporal_entity, crm, settings);

  } else if (
    /** If role leads to Appe */
    // else if (role.appellation && Object.keys(role.appellation).length){
    options.targetClassPk == DfhConfig.CLASS_PK_APPELLATION
    || (role.appellation && role.appellation.pk_entity)
  ) {

    // if we are in create mode we need the fk_class
    if (isCreateContext(settings.pkUiContext)) {
      roleDetail.role.appellation = {
        ...role.appellation,
        fk_class: options.targetClassPk
      }
    }

    roleDetail._appe = createAppeDetail(undefined, role.appellation, crm, settings);

  } else if (
    /** If role leads to Language */
    // else if (role.language && Object.keys(role.language).length){
    options.targetClassPk == DfhConfig.CLASS_PK_LANGUAGE
    || (role.language && role.language.pk_entity)
  ) {

    // if we are in create mode we need the fk_class
    if (isCreateContext(settings.pkUiContext)) {
      roleDetail.role.language = {
        ...role.language,
        fk_class: options.targetClassPk
      }
    }

    roleDetail._lang = createLangDetail(undefined, role.language, crm, settings);

  } else if (
    /** If role leads to Place (in the sense of geo coordinates!) */
    // else if (role.place && Object.keys(role.place).length){
    options.targetClassPk == DfhConfig.CLASS_PK_PLACE
    || (role.place && role.place.pk_entity)
  ) {

    // if we are in create mode we need the fk_class
    if (isCreateContext(settings.pkUiContext)) {
      roleDetail.role.place = {
        ...role.place,
        fk_class: options.targetClassPk
      }
    }

    roleDetail._place = createPlaceDetail(undefined, role.place, crm, settings);

  } else if (
    /** If role leads to TimePrimitive */
    options.targetClassPk == DfhConfig.CLASS_PK_TIME_PRIMITIVE
    || (role.time_primitive && role.time_primitive.pk_entity)
  ) {

    // if we are in create mode we need the fk_class
    if (isCreateContext(settings.pkUiContext)) {
      roleDetail.role.time_primitive = {
        ...role.time_primitive,
        fk_class: options.targetClassPk
      }
    }

    roleDetail._timePrimitive = createTimePrimitveDetail(undefined, role.time_primitive, crm, settings);

  } else {

    // check if it is circular
    if (
      // if not creat mode and the pk's of both roles are the same
      (settings.parentRolePk && !isCreateContext(settings.pkUiContext) && role.pk_entity === settings.parentRolePk) ||
      // or if we are in create mode and the initialized role has a fk_entity
      // (means this is the circular role added upon start creating a new information)
      (isCreateContext(settings.pkUiContext) && role.fk_entity)
    ) {
      roleDetail.isCircular = true;
    }

    roleDetail._leaf_peIt = {
      fkClass: options.targetClassPk,
      pkEntity: roleDetail.role ? roleDetail.role.fk_entity : undefined,
      peIt: {
        fk_class: options.targetClassPk,
        pk_entity: roleDetail.role ? roleDetail.role.fk_entity : undefined,
      } as InfPersistentItem
    } as PeItDetail;

  }

  return new RoleDetail(roleDetail);
}



/***************************************************
* Entity Association State create functions
***************************************************/

/**
 * Creates a EntityAssociationDetail from provided input data
 *
 * @param options data object to pass data to the created state model instance. it won't be passed further down the chain of create...() methods.
 * @param dbData nested object as it is delivered from REST api with entity-association etc.
 * @param crm configuration of the current reference model that decides which classes and properties are shown in which ui context
 * @param settings setting object that is passed through the chain of create...() methods of the different state classes
 */
export function createEntityAssociationDetail(options: EntityAssociationDetail = new EntityAssociationDetail(), ea: InfEntityAssociation, crm: ProjectCrm, settings?: StateSettings): EntityAssociationDetail {

  if (!ea) return undefined;

  // init settings (adds defaults, if not otherwise provided)
  settings = new StateSettings(settings);

  let peItTemplate = new InfPersistentItem();

  if (isCreateContext(settings.pkUiContext)) {
    options.propertyConfig = crm.fieldList[propertyFieldKeyFromParams(ea.fk_property, options.isOutgoing)] as PropertyField;
    options.targetClassConfig = crm.classes[options.propertyConfig.targetClassPk];
    if (options.targetClassConfig.subclassOf = 'peIt') {
      peItTemplate.fk_class = options.targetClassConfig.dfh_pk_class;
    }
  }

  if (ea.domain_pe_it) {
    peItTemplate = {
      ...peItTemplate,
      ...ea.domain_pe_it
    }
  }

  if (ea.range_pe_it) {
    peItTemplate = {
      ...peItTemplate,
      ...ea.range_pe_it
    }
  }

  return new EntityAssociationDetail({
    entityAssociation: new InfEntityAssociation(ea),
    ...options,
    _peIt: createPeItDetail(
      {},
      peItTemplate,
      crm,
      settings
    )
  })

}

/**
 * Creates a EntityAssociationList from provided input data
 *
 *
 * @param options options will bi merged in PropertyField object
 * @param roles will be converted in a EntityAssociationList
 * @param crm is not used within the PropertyField but it is passed to EntityAssociation.createState()
 * @param settings state settings object.
 */
export function createEntityAssociationList(options: PropertyField, eas: InfEntityAssociation[], crm: ProjectCrm, settings?: StateSettings): EntityAssociationList {
  settings = new StateSettings(settings);
  return indexBy((eaDetail) => ('' + eaDetail.entityAssociation.pk_entity), eas.map(ea => createEntityAssociationDetail(options, ea, crm, settings)))
}

/***************************************************
* Value Detail create functions
***************************************************/

/**
 * Creates a AppeDetail from provided input data
 *
 * @param options data object to pass data to the created state model instance. it won't be passed further down the chain of create...() methods.
 * @param dbData nested object as it is delivered from REST api with roles etc.
 * @param crm configuration of the current reference model that decides which classes and properties are shown in which ui context
 * @param settings setting object that is passed through the chain of create...() methods of the different state classes
 */
export function createAppeDetail(options: AppeDetail, dbData: InfAppellation, crm: ProjectCrm, settings: StateSettings): AppeDetail {
  return new AppeDetail({
    ...options,
    appellation: dbData,
  });
}

/**
* Creates a LangDetail from provided input data
*
* @param options data object to pass data to the created state model instance. it won't be passed further down the chain of create...() methods.
* @param dbData nested object as it is delivered from REST api with roles etc.
* @param crm configuration of the current reference model that decides which classes and properties are shown in which ui context
* @param settings setting object that is passed through the chain of create...() methods of the different state classes
*/
export function createLangDetail(options: LangDetail, language: InfLanguage, crm: ProjectCrm, settings: StateSettings): LangDetail {
  return new LangDetail({
    ...options,
    language
  });
}


/**
* Creates a PlaceDetail from provided input data
*
* @param options data object to pass data to the created state model instance. it won't be passed further down the chain of create...() methods.
* @param dbData nested object as it is delivered from REST api with roles etc.
* @param crm configuration of the current reference model that decides which classes and properties are shown in which ui context
* @param settings setting object that is passed through the chain of create...() methods of the different state classes
*/
export function createPlaceDetail(options: PlaceDetail, dbData: InfPlace, crm: ProjectCrm, settings: StateSettings): PlaceDetail {
  return new PlaceDetail({ ...options, place: dbData });
}

/**
* Creates a TimePrimitveDetail from provided input data
*
* @param options data object to pass data to the created state model instance. it won't be passed further down the chain of create...() methods.
* @param dbData nested object as it is delivered from REST api with roles etc.
* @param crm configuration of the current reference model that decides which classes and properties are shown in which ui context
* @param settings setting object that is passed through the chain of create...() methods of the different state classes
*/
export function createTimePrimitveDetail(options: TimePrimitveDetail, dbData: InfTimePrimitive, crm: ProjectCrm, settings: StateSettings): TimePrimitveDetail {
  return new TimePrimitveDetail({ ...options, timePrimitive: dbData });
}



/***************************************************
* Key Functions for Lists
***************************************************/

/**
 * Retuns a key for given Field usefull to create list object
 * with this structure:
 * {
 *      [key]: Field
 * }
 *
 * @param field
 */
export function fieldKey(field: Field): string {

  switch (field.type) {
    case 'PropertyField':
      return propertyFieldKey(field as PropertyField);

    case 'ExistenceTimeDetail':
    case 'TextPropertyField':
      return '_field_' + (field as TextPropertyDetail).fkClassField;

    default:
      break;
  }
}

/**
 * Retuns a key for given RoleDetail usefull to create list object
 * with this structure:
 * {
 *      [key]: RoleDetail
 * }
 *
 * @param roleDetail
 */
export function roleDetailKey(roleDetail: RoleDetail) { return '_' + roleDetail.role.pk_entity };


export function textPropertyDetailKey(txtPropDetail: TextPropertyDetail) { return '_' + txtPropDetail.textProperty.pk_entity };


/**
 * Retuns a key for given PropertyField usefull to create list object
 * with this structure:
 * {
 *      [key]: PropertyField
 * }
 *
 * @param propertyField
 */
export function propertyFieldKey(propertyField: PropertyField) {
  return propertyFieldKeyFromParams(propertyField.property.dfh_pk_property, propertyField.isOutgoing)
}
export function propertyFieldKeyFromParams(fkProp: number, isOutgoing: boolean) {
  return '_' + fkProp + '_' + (isOutgoing ? 'outgoing' : 'ingoing')
}



export const pkEntityKey = (entity) => ('_' + entity.pk_entity);



/***************************************************
* Helper functions
***************************************************/

/**
 * Checks if PropertyField a is of the same property or property-of-origin as PropertyField b.
 * This is useful to check if a PropertyField is circular in a tree of PropertyFields and Entities
 *
 * @param a PropertyField you want to test if it is circular
 * @param b PropertyField to compare with (typically the parent PropertyField in the tree)
 */
export function similarPropertyField(a: PropertyField, b: PropertyField): boolean {
  if (!a || !b) return false;

  if (
    (
      a.property.dfh_pk_property === b.property.dfh_pk_property ||
      (
        a.property.dfh_fk_property_of_origin &&
        a.property.dfh_fk_property_of_origin === b.property.dfh_fk_property_of_origin
      )
    )
    && a.isOutgoing != b.isOutgoing
  ) return true;

  else return false;
}

/**
 * returns a copy of the given RoleDetail[], where the items are sorted
 * according to the ord_num in the epr.
 * TODO: make this dependent of 'isOutgoing' of the roleDetail.
 *
 * @param roleDetailArray a RoleDetail[]
 * @returns a sorted copy of RoleDetail[]
 */
export function sortRoleDetailsByOrdNum(roleDetailArray: RoleDetail[]): RoleDetail[] {

  const diff = (rdA: RoleDetail, rdB: RoleDetail) => {

    const a = rdA.role.entity_version_project_rels ? rdA.role.entity_version_project_rels[0].ord_num_of_domain : undefined;
    const b = rdB.role.entity_version_project_rels ? rdB.role.entity_version_project_rels[0].ord_num_of_domain : undefined;

    if (a === undefined || b === undefined) return 0;

    return a - b;
  }

  return sort(diff, roleDetailArray);
}

