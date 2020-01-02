import { FormArray } from '@angular/forms';
import { ProjectPreview } from 'app/core/active-project/active-project.models';
import { ExistenceTimeDetail, FieldLabel, FieldList, PeItDetail, PropertyField, RoleDetail, RoleDetailList, TeEntDetail } from 'app/core/state/models';
import { ByPk } from 'app/core/store/model';
import { TimeSpan } from 'app/core/time-span/time-span';
import { QuillDoc } from 'app/modules/quill';
import { omit } from 'ramda';
import * as Config from '../../../../../common/config/Config';
import { SysConfig } from '../../../../../src/common/config/sys-config';
import { AcEntity, AcNotification, ActionType } from '../../../../node_modules/angular-cesium';
import { TimeSpanItem } from '../../modules/information/new-components/properties-tree/properties-tree.models';
import { DfhConfig } from '../../modules/information/shared/dfh-config';
import { Granularity } from '../date-time/date-time-commons';
import { CalendarType, TimePrimitive } from '../date-time/time-primitive';
import { DfhClass, DfhProperty, InfAppellation, InfPersistentItem, InfRole, InfTemporalEntity, InfTimePrimitive, ProClassFieldConfig, ProDfhClassProjRel, ProInfoProjRel, ProProject, ProTextProperty, SysClassField } from '../sdk';
import { Field } from '../state/models/field';
import { TextPropertyField } from '../state/models/text-property-field';

export interface LabelGeneratorSettings {
  // maximum number of data unit children that are taken into account for the label generator
  // e.g.: for a AppeForLanguage it will take only label and language, when you put it to 2
  fieldsMax?: number;

  // maximum number of roles per propertyField taken into account for the label generator
  rolesMax?: number;

  // path of that element in the store. useful to attatch leaf-pe-it-view
  path: string[];
}/**
 * Utilities class for static functions
 */

export class U {

  static obj2Arr<T>(obj: { [key: string]: T }): T[] {
    const arr = [];

    if (obj == undefined) return arr;

    Object.keys(obj).forEach(key => {
      arr.push(obj[key]);
    });

    return arr;
  }

  static objNr2Arr<T>(obj: { [key: number]: T }): T[] {
    const arr = [];

    if (obj == undefined) return arr;

    Object.keys(obj).forEach(key => {
      arr.push(obj[key]);
    });

    return arr;
  }

  /**
   * converts object to array with {key: value} objects, e.g.:
   * {'a': 12, 'b': 99} --> [{key: 'a', value: 12, key: 'b', value: 99}]
   *
   * @param obj
   */
  static obj2KeyValueArr<T>(obj: { [key: string]: T }): { key: string, value: T }[] {
    const keys = [];
    for (const key in obj) {
      if (obj[key]) {
        keys.push({ key: key, value: obj[key] });
      }
    }
    return keys;
  }

  static firstItemInIndexedGroup<T>(item: ByPk<ByPk<T>>, key: string | number): T {
    return item && item[key] && Object.keys(item[key]).length ? U.obj2Arr(item[key])[0] : undefined;
  }
  static firstItemInObject<T>(item: ByPk<T>): T {
    return item && Object.keys(item).length ? U.obj2Arr(item)[0] : undefined;
  }


  /**
   *  Extracts the calendar from  InfTimePrimitve to TimePrimitive
  */
  static getCalendarFromRole(role: InfRole): CalendarType {
    if (!role) return null;

    const cal = (role.entity_version_project_rels && role.entity_version_project_rels[0].calendar) ?
      role.entity_version_project_rels[0].calendar :
      role.community_favorite_calendar ?
        role.community_favorite_calendar : null;

    return cal as CalendarType;
  }

  /**
   * Converts InfRole to TimePrimitive
   * @param r the InfRole to convert
   */
  static infRole2TimePrimitive(r: InfRole): TimePrimitive {

    // from InfTimePrimitve to TimePrimitive
    const infTp: InfTimePrimitive = r ? r.time_primitive : null;
    let timePrimitive: TimePrimitive = null;
    const obj: any = {}

    if (
      infTp && infTp.duration && infTp.julian_day &&
      U.getCalendarFromRole(r)
    ) {
      // add duration
      obj.duration = infTp.duration

      // add calendar
      obj.calendar = U.getCalendarFromRole(r)

      // add julian day
      obj.julianDay = infTp.julian_day;

      timePrimitive = new TimePrimitive({ ...obj })
    }

    if (timePrimitive === null) {
      return new TimePrimitive({
        calendar: 'julian'
      })
    } else {
      return timePrimitive;
    }
  }

<<<<<<< HEAD
=======


  /**
  * Returns the Appellation Label String that is for display in this project, from the given teEnt
  * @param teEnt
  * @returns appellation label as pure string
  */
  static getDisplayAppeLabelOfTeEnt(teEnt: InfTemporalEntity): string | null {
    if (!teEnt || !teEnt.te_roles) return null


    const rolesToAppe: InfRole[] = teEnt.te_roles.filter(
      role => (role && role.appellation && role.appellation.quill_doc
        // TODO: Add a clause as soon as we have DisplayRoleForDomain in the db
        // to filter for the role that is standard?? or is this not happening on forms?
      ))

    return rolesToAppe.length ? U.stringFromAppellation(rolesToAppe[0].appellation) : null;

  }


  /**
  * Returns the teEnt (Name Use Activity) that has is for display in this project, from the given peIt
  *
  * @param peIt
  * @returns InfTemporalEntity that has a appellation label for display
  */
  static getDisplayAppeLabelOfPeIt(peIt: InfPersistentItem): InfTemporalEntity | null {
    if (!peIt) return null

    const rolesToAppeUse: InfRole[] = peIt.pi_roles.filter(
      role => (
        role &&
        // TODO Add a better clause as soon as we have DisplayRoleForDomain/Range
        role.entity_version_project_rels &&
        role.entity_version_project_rels[0] &&
        role.entity_version_project_rels[0].is_standard_in_project &&

        // TODO this could be passed in by methods parameter
        role.fk_property == DfhConfig.PROPERTY_PK_R63_NAMES
      ))

    return rolesToAppeUse.length ? new InfTemporalEntity(rolesToAppeUse[0].temporal_entity) : null;

  }

  /**
  * Returns the first teEnt (Name Use Activity) of the given peIt
  *
  * @param peIt
  * @returns InfTemporalEntity that has a appellation label for display
  */
  static getFirstAppeTeEntOfPeIt(peIt: InfPersistentItem): InfTemporalEntity | null {
    if (!peIt || !peIt.pi_roles) return null

    const roleToAppeUse: InfRole = peIt.pi_roles.find(
      role => (
        role && role.fk_property == DfhConfig.PROPERTY_PK_R63_NAMES
      ))

    return roleToAppeUse ? new InfTemporalEntity(roleToAppeUse.temporal_entity) : null;

  }

  /**
   * Return a string for given peIt.
   * Usefull for display of Types.
   */
  static stringForPeIt(peIt: InfPersistentItem): string {

    return (!peIt || !peIt.pi_roles) ? '' :
      peIt.pi_roles
        .filter(r => (
          r &&
          r.temporal_entity &&
          r.temporal_entity.fk_class === DfhConfig.CLASS_PK_APPELLATION_USE &&
          r.temporal_entity.te_roles &&
          r.temporal_entity.te_roles.length
        ))
        .map(pir => pir.temporal_entity.te_roles.filter(ter => (ter && Object.keys((ter.appellation || {})).length))
          .map(r => {
            return U.stringFromAppellation(r.appellation)
          })[0]).join(', ')

  }

  /**
    * Convert array of ComClassField to an array of Fields
    *
    */
  static comClassFields2Fields(classFields: SysClassField[]): Field[] {
    if (!classFields) return [];

    return classFields.map(comClassfield => {

      const label = {
        default: comClassfield.label,
        sg: comClassfield.label,
        pl: comClassfield.label
      }
      const fkClassField = comClassfield.pk_entity;

      if (comClassfield.pk_entity === SysConfig.PK_CLASS_FIELD_WHEN) {
        return new ExistenceTimeDetail({ fkClassField, label })
      } else if (comClassfield.used_table === 'information.text_property') {
        return new TextPropertyField({ fkClassField, label })
      } else {
        return { type: 'unknown' }
      }

    });
  }

  /**
  * Convert array of Property to an array of PropertyField
  *
  * @param {boolean} isOutgoing direction: true=outgoing, false=ingoing
  * @param {DfhProperty[]} properties array of properties to Convert
  * @return {PropertyField[]} array of PropertyField
  */
  static infProperties2PropertyFields(isOutgoing: boolean, properties: DfhProperty[]): PropertyField[] {
    if (!properties) return [];



    return properties.map(property => {
      const res = new PropertyField({
        isOutgoing: isOutgoing,
        property: omit(['labels', 'domain_class', 'range_class'], property),
        targetMaxQuantity: isOutgoing ? property.dfh_range_instances_max_quantifier : property.dfh_domain_instances_max_quantifier,
        targetMinQuantity: isOutgoing ? property.dfh_range_instances_min_quantifier : property.dfh_domain_instances_min_quantifier,
        targetClassPk: isOutgoing ? property.dfh_has_range : property.dfh_has_domain,
        targetClass: isOutgoing ? property.range_class : property.domain_class,
        label: this.createLabelObject(property, isOutgoing)
      })

      return res;
    });
  }

  /**
   * Converts array of ingoing Property and array of outgoing Property to PropertyFieldList
   * @param ingoingProperties
   * @param outgoingProperties
   */
  static propertyFieldsFromProperties(ingoingProperties: DfhProperty[], outgoingProperties: DfhProperty[]): PropertyFieldList {
    return indexBy(propertyFieldKey, [
      ...U.infProperties2PropertyFields(false, ingoingProperties),
      ...U.infProperties2PropertyFields(true, outgoingProperties)
    ])
  };

  /**
   * Gets ord_num of PropertyField or null, if not available
   *
   * @param propertyField
   */
  static ordNumFromPropertyField(propertyField: PropertyField): number | null {

    if (!U.uiContextConfigFromPropertyField(propertyField)) return null;

    return U.uiContextConfigFromPropertyField(propertyField).ord_num;
  }


  /**
   * gets ui_context_config of PropertyField or null, if not available
   * @param propertyField
   */
  static uiContextConfigFromPropertyField(propertyField: PropertyField): ProClassFieldConfig | null {
    if (!propertyField) return null;

    if (!propertyField.property) return null;

    if (!propertyField.property.class_field_config || !propertyField.property.class_field_config[0]) return null;

    return propertyField.property.class_field_config[0];
  }

  /**
  * Gets ord_num of ComClassField or null, if not available
  *
  * @param propSet
  */
  static ordNumFromPropSet(propSet: SysClassField): number | null {

    const config = U.uiContextConfigFromPropSet(propSet);

    if (!config) return null;

    return config.ord_num;
  }

  /**
   * gets ui_context_config of PropSet or null, if not available
   * @param propSet
   */
  static uiContextConfigFromPropSet(propSet: SysClassField): ProClassFieldConfig | null {

    if (!propSet.class_field_configs) return null;

    if (!propSet.class_field_configs[0]) return null;

    return propSet.class_field_configs[0];
  }



  /**
   * create a label object for the property
   * @param property
   * @param isOutgoing
   */
  static createLabelObject(property: DfhProperty, isOutgoing: boolean): FieldLabel {
    let sg = 'n.N.'
    let pl = 'n.N.'

    let labelObj: FieldLabel;
    if (isOutgoing) {

      if (property) {
        sg = '[sg: ' + property.dfh_pk_property + ': ' + property.dfh_identifier_in_namespace + ' ' + property.dfh_standard_label;
        pl = '[pl: ' + property.dfh_pk_property + ': ' + property.dfh_identifier_in_namespace + ' ' + property.dfh_standard_label;
      }

      // TODO return an object containing label.pl and label.sg
      if (property.labels && property.labels.length) {
        if (property.labels.find(l => l.com_fk_system_type === Config.PROPERTY_LABEL_SG)) {
          sg = property.labels.find(l => l.com_fk_system_type === Config.PROPERTY_LABEL_SG).dfh_label;
        }
        if (property.labels.find(l => l.com_fk_system_type === Config.PROPERTY_LABEL_PL)) {
          pl = property.labels.find(l => l.com_fk_system_type === Config.PROPERTY_LABEL_PL).dfh_label;
        }
      }

      labelObj = {
        sg: sg,
        pl: pl,
        default: property.dfh_range_instances_max_quantifier === 1 ? sg : pl
      }

    } else if (isOutgoing === false) {

      if (property) {
        sg = '[inv.sg: ' + property.dfh_pk_property + ': '
          + property.dfh_identifier_in_namespace + ' ' + property.dfh_standard_label;
        pl = '[inv.pl: ' + property.dfh_pk_property + ': '
          + property.dfh_identifier_in_namespace + ' ' + property.dfh_standard_label;
      }


      // TODO return an object containing inversed_label.pl and inversed_label.sg
      if (property.labels && property.labels.length) {
        if (property.labels.find(l => l.com_fk_system_type === Config.PROPERTY_LABEL_INVERSED_SG)) {
          sg = property.labels.find(l => l.com_fk_system_type === Config.PROPERTY_LABEL_INVERSED_SG).dfh_label;
        }
        if (property.labels.find(l => l.com_fk_system_type === Config.PROPERTY_LABEL_INVERSED_PL)) {
          pl = property.labels.find(l => l.com_fk_system_type === Config.PROPERTY_LABEL_INVERSED_PL).dfh_label;
        }
      }

      labelObj = {
        sg: sg,
        pl: pl,
        default: property.dfh_domain_instances_max_quantifier === 1 ? sg : pl
      }

    } else {
      labelObj = undefined;
    }
    return labelObj;
  }


  /**
   * Gets the project rel of a data_for_history class
   */
  static getProjRel = (dfhClass: DfhClass): ProDfhClassProjRel => {
    if (dfhClass && dfhClass.proj_rels && dfhClass.proj_rels.length && dfhClass.proj_rels[0]) {
      return dfhClass.proj_rels[0];
    } else return undefined;
  }

  /**
   * Converts a DfhClass to a ClassConfig
   * @param dfhC
   */
  static classConfigFromDfhClass(dfhC: DfhClass, systemRelevantClass: SysSystemRelevantClass): ClassConfig {

    // extract class label. prefer eager loaded label over standard label.
    const extractClassLabel = (c: DfhClass): string => {
      if (c.labels && c.labels.length) return c.labels[0].dfh_label;
      else return c.dfh_standard_label
    }

    const extractSubclassOf = (c: DfhClass): 'peIt' | 'teEnt' | undefined => {
      const systype = (!c.class_profile_view ? null :
        !c.class_profile_view[0] ? null :
          !c.class_profile_view[0].dfh_fk_system_type ? null :
            c.class_profile_view[0].dfh_fk_system_type);

      if (systype === DfhConfig.PK_SYSTEM_TYPE_PERSISTENT_ITEM) return 'peIt';
      if (systype === DfhConfig.PK_SYSTEM_TYPE_TEMPORAL_ENTITY) return 'teEnt';
      else return undefined;
    }

    const extractIsInProject = (c: DfhClass): boolean => {
      return !c.proj_rels ? false :
        !c.proj_rels[0] ? false : c.proj_rels[0].enabled_in_entities;
    }

    const cConf: ClassConfig = {
      pkEntity: dfhC.pk_entity,
      dfh_pk_class: dfhC.dfh_pk_class,
      subclassOf: extractSubclassOf(dfhC),
      profileLabels: dfhC.class_profile_view.map(prof => prof.dfh_profile_label).join(', '),
      profilePks: dfhC.class_profile_view.map(prof => prof.dfh_fk_profile),
      isInProject: extractIsInProject(dfhC),
      projRel: U.getProjRel(dfhC),
      label: extractClassLabel(dfhC),
      dfh_standard_label: dfhC.dfh_standard_label,
      changingProjRel: false,
      scopeNote: !dfhC.text_properties ? '' : !dfhC.text_properties.length ? '' : dfhC.text_properties[0].dfh_text_property,
      dfh_identifier_in_namespace: dfhC.dfh_identifier_in_namespace,
      uiContexts: {},
      required_by_sources: systemRelevantClass ? systemRelevantClass.required_by_sources : false,
      required_by_entities: systemRelevantClass ? systemRelevantClass.required_by_entities : false,
      required_by_basics: systemRelevantClass ? systemRelevantClass.required_by_basics : false,
      excluded_from_entities: systemRelevantClass ? systemRelevantClass.excluded_from_entities : false
    };

    if (dfhC.ingoing_properties || dfhC.outgoing_properties) {
      cConf.propertyFields = U.propertyFieldsFromProperties(dfhC.ingoing_properties, dfhC.outgoing_properties)
    }
    return cConf;
  }

  /**************************************************************************
   * Label Generator Functions
   **************************************************************************/

  static labelFromFieldList(r: FieldList, settings: LabelGeneratorSettings): ClassInstanceLabel {
    const max = !settings ? undefined : settings.fieldsMax;
    const duChildren = U.obj2Arr(r);

    // create array with max amount of labels
    const sliced = max ? duChildren.slice(0, max) : duChildren;

    return {
      path: settings.path,
      parts: sliced.map(c => U.labelFromField(c, { ...settings, path: [...settings.path, fieldKey(c)] })),
      hasMore: (duChildren.length > 2)
    }
  }


  static labelFromField(c: Field, settings: LabelGeneratorSettings): ClassInstanceFieldLabel {
    if (c && c.type == 'PropertyField') return U.labelFromPropertyField(c as PropertyField, settings);
    else if (c && c.type == 'ExistenceTimeDetail') return U.labelFromExTime(c as ExistenceTimeDetail, settings);
    else if (c && c.type == 'TextPropertyField') return U.labelFromTextPropertyField(c as TextPropertyField, settings);

    else return null;
  }


  static labelFromPropertyField(r: PropertyField, settings: LabelGeneratorSettings): ClassInstanceFieldLabel {
    const max = !settings ? undefined : settings.rolesMax;

    const roleDetails = U.obj2Arr(r._role_list);
    const duChildLabel = new ClassInstanceFieldLabel({ path: settings.path });

    // create array with max amount of labels
    const spliced = max ? roleDetails.splice(0, max) : roleDetails;

    duChildLabel.roleLabels = spliced.map(det => U.labelFromRoleDetail(det, { ...settings, path: [...settings.path, '_role_list', roleDetailKey(det)] }));

    if (roleDetails.length > 1) duChildLabel.suffix = '(+' + (roleDetails.length - max) + ')';

    duChildLabel.introducer = r.label.default;

    return duChildLabel;
  }



  static labelFromRoleDetail(r: RoleDetail, settings: LabelGeneratorSettings): RoleLabel {
    const path = settings.path;
    if (r) {
      if (r._teEnt) {
        let string = '';
        if (r._teEnt._fields) {
          const label = U.labelFromFieldList(r._teEnt._fields, settings);
          if (label && label.parts && label.parts[0] && label.parts[0].roleLabels && label.parts[0].roleLabels[0] && label.parts[0].roleLabels[0].string) {
            string = label.parts[0].roleLabels[0].string;
          }
        }
        return {
          path,
          type: 'te-ent',
          string
        }
      } else if (r._appe) return { path, type: 'appe', string: U.labelFromAppeDetail(r._appe) };
      else if (r._lang) return { path, type: 'lang', string: U.labelFromLangDetail(r._lang) };
      else if (r._place) return { path, type: 'place', string: U.labelFromPlaceDetail(r._place) };
      else if (r._leaf_peIt) return { path, type: 'leaf-pe-it', fkEntity: r.role.fk_entity };

      else {
        console.warn('labelFromRoleDetail: This kind of RoleDetail does not produce labels');

      }
    } else {
      return new RoleLabel();
    }

  }


  static labelFromAppeDetail(a: AppeDetail): string {
    if (a && a.appellation && a.appellation.quill_doc) {
      return U.stringFromAppellation(a.appellation);
    } else return null;
  }

  static labelFromLangDetail(l: LangDetail): string {
    if (l && l.language) return l.language.notes;

    else return null;
  }

  static labelFromPlaceDetail(p: PlaceDetail): string {
    if (p && p.place) return 'WGS84: ' + p.place.lat + '°, ' + p.place.long + '°';

    else return null;
  }

  static labelFromTimePrimitive(r: InfRole): TimePrimitive {
    if (r) return U.infRole2TimePrimitive(r)

    else return null;
  }

  static labelFromLeafPeIt(l: PeItDetail, settings: LabelGeneratorSettings): string {
    if (l._fields) {

      const p = U.labelFromFieldList(l._fields, { ...settings, path: [...settings.path, '_fields'] })

      if (p && p.parts && p.parts[0] && p.parts[0].roleLabels && p.parts[0].roleLabels[0]) {
        return p.parts[0].roleLabels[0].string;
      }
    } else return null;
  }

  static labelFromTextPropertyField(txtPropField: TextPropertyField, settings: LabelGeneratorSettings): ClassInstanceFieldLabel {
    return new ClassInstanceFieldLabel({
      path: settings.path,
      introducer: '',
      roleLabels: [{
        path: undefined,
        type: 'txt-prop',
        string: U.obj2Arr(txtPropField.textPropertyDetailList).slice(0, settings.rolesMax).map(tD => (
          U.stringFromQuillDoc(tD.textProperty.quill_doc)
        )).join(', ')
      }]
    })
  }

  static labelFromExTime(e: ExistenceTimeDetail, settings: LabelGeneratorSettings): ClassInstanceFieldLabel {
    let earliest: TimePrimitive, latest: TimePrimitive;
    let eRoleDetail: RoleDetail, lRoleDetail;

    if (e && e._fields) {
      const c = e._fields;
      const bOb = c[propertyFieldKeyFromParams(DfhConfig.PROPERTY_PK_BEGIN_OF_BEGIN, true)];
      const eOb = c[propertyFieldKeyFromParams(DfhConfig.PROPERTY_PK_END_OF_BEGIN, true)];
      const bOe = c[propertyFieldKeyFromParams(DfhConfig.PROPERTY_PK_BEGIN_OF_END, true)];
      const eOe = c[propertyFieldKeyFromParams(DfhConfig.PROPERTY_PK_END_OF_END, true)];
      const at = c[propertyFieldKeyFromParams(DfhConfig.PROPERTY_PK_AT_SOME_TIME_WITHIN, true)];
      const ong = c[propertyFieldKeyFromParams(DfhConfig.PROPERTY_PK_ONGOING_THROUGHOUT, true)];

      // Get earliest date
      const earliestArr = [bOb, eOb, at, ong, bOe, eOe].filter(rs => (rs))
      if (earliestArr && earliestArr[0]) {
        if (earliestArr[0]._role_list) {
          const roleDetails = U.obj2Arr(earliestArr[0]._role_list);
          if (roleDetails[0]) {
            eRoleDetail = roleDetails[0];
            earliest = U.labelFromTimePrimitive(eRoleDetail.role);
          }
        }
      }

      // Get latest date
      const latestArr = [eOe, bOe, at, ong, eOb, bOb].filter(rs => (rs))
      if (latestArr && latestArr[0]) {
        if (latestArr[0]._role_list) {
          const roleDetails = U.obj2Arr(latestArr[0]._role_list);
          if (roleDetails[0]) {
            lRoleDetail = roleDetails[0];
            // if latest equals earliest, don't add it
            if (lRoleDetail != eRoleDetail) latest = U.labelFromTimePrimitive(lRoleDetail.role);
          }
        }
      }
    }

    if (!earliest && !latest) return null;

    return new ClassInstanceFieldLabel({
      path: settings.path,
      introducer: 'When',
      roleLabels: [{
        path: undefined,
        type: 'ex-time',
        exTimeLabel: { earliest, latest }
      }]
    })

  }


  static stringFromAppellation(appellation: InfAppellation): string {
    if (appellation.quill_doc && appellation.quill_doc.ops && appellation.quill_doc.ops.length) {
      return U.stringFromQuillDoc(appellation.quill_doc)
    }
    else if (appellation.string) {
      return appellation.string
    }
    else return '';
  }

>>>>>>> master
  static stringFromQuillDoc(quillDoc: QuillDoc): string {
    if (quillDoc && quillDoc.ops && quillDoc.ops.length) return quillDoc.ops.map(op => op.insert).join('');
    else return '';
  }

  static acNotificationFromPacket = (packet, actionType: ActionType): AcNotification => ({
    id: packet.id,
    entity: new AcEntity(packet),
    actionType
  })

  static CesiumJulianDateFromJulianSecond = (julianSeconds: number): CesiumJulianDate => {
    if (!julianSeconds) return;

    const secondsOfFullDay = 60 * 60 * 24;
    const dayNumber = Math.floor(julianSeconds / secondsOfFullDay);
    const secondsOfDay = julianSeconds % secondsOfFullDay;
    return new Cesium.JulianDate(dayNumber, secondsOfDay)
  }

  /**
   * Transform ProProject to ProjectPreview
   */
  static proProjectToProjectPreview(project: ProProject): ProjectPreview {
    return {
      label: this.firstProTextPropStringOfType(project.text_properties, SysConfig.PK_SYSTEM_TYPE__TEXT_PROPERTY__LABEL),
      description: this.firstProTextPropStringOfType(project.text_properties, SysConfig.PK_SYSTEM_TYPE__TEXT_PROPERTY__DESCRIPTION),
      default_language: project.default_language,
      pk_project: project.pk_entity
    }
  }

  static firstProTextPropStringOfType(textProperties: ProTextProperty[], fkSystemType): string {
    return (textProperties.find(t => t.fk_system_type === fkSystemType) || { string: '' }).string
  }

  /**
  * Erzeugt eine UUID nach RFC 4122
  */
  static uuid(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
      let random = Math.random() * 16 | 0; // Nachkommastellen abschneiden
      let value = char === "x" ? random : (random % 4 + 8); // Bei x Random 0-15 (0-F), bei y Random 0-3 + 8 = 8-11 (8-b) gemäss RFC 4122
      return value.toString(16); // Hexadezimales Zeichen zurückgeben
    });
  }

  static timeSpanItemToTimeSpan(timeSpanItem: TimeSpanItem): TimeSpan {
    const t = new TimeSpan();

    timeSpanItem.properties.forEach(p => {
      const key = DfhConfig.PROPERTY_PK_TO_EXISTENCE_TIME_KEY[p.listDefinition.pkProperty]
      if (p.items && p.items.length) t[key] = p.items[0].timePrimitive
    })
    return t;
  }

  static recursiveMarkAsTouched = (f: FormArray) => {
    f.controls.forEach((c: FormArray) => {
      c.markAsTouched()
      if (c.controls) U.recursiveMarkAsTouched(c)
    })
  }

  static propertyFieldKeyFromParams(fkProp: number, isOutgoing: boolean) {
    return '_' + fkProp + '_' + (isOutgoing ? 'outgoing' : 'ingoing')
  }
}
