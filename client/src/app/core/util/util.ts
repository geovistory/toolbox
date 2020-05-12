import { FormArray, FormGroup } from '@angular/forms';
import { ProjectPreview } from 'app/core/active-project/active-project.models';
import { ByPk } from 'app/core/store/model';
import { TimeSpan } from 'app/core/time-span/time-span';
import { QuillDoc } from 'app/modules/quill';
import { SysConfig } from '../../../../../src/common/config/sys-config';
import { AcEntity, AcNotification, ActionType } from '../../../../node_modules/angular-cesium';
import { TimeSpanItem } from '../../modules/base/components/properties-tree/properties-tree.models';
import { DfhConfig } from '../../modules/information/shared/dfh-config';
import { CalendarType, TimePrimitive } from '../date-time/time-primitive';
import { InfStatement, InfTimePrimitive, ProProject, ProTextProperty } from '../sdk';

export interface LabelGeneratorSettings {
  // maximum number of data unit children that are taken into account for the label generator
  // e.g.: for a AppeForLanguage it will take only label and language, when you put it to 2
  fieldsMax?: number;

  // maximum number of statements per propertyField taken into account for the label generator
  statementsMax?: number;

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
  static getCalendarFromRole(statement: InfStatement): CalendarType {
    if (!statement) return null;

    const cal = (statement.entity_version_project_rels && statement.entity_version_project_rels[0].calendar) ?
      statement.entity_version_project_rels[0].calendar :
      statement.community_favorite_calendar ?
        statement.community_favorite_calendar : null;

    return cal as CalendarType;
  }

  /**
   * Converts InfStatement to TimePrimitive
   * @param r the InfStatement to convert
   */
  static infRole2TimePrimitive(r: InfStatement): TimePrimitive {

    // from InfTimePrimitve to TimePrimitive
    const infTp: InfTimePrimitive = r ? r.object_time_primitive : null;
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
      const key = DfhConfig.PROPERTY_PK_TO_EXISTENCE_TIME_KEY[p.listDefinition.property.pkProperty]
      if (p.items && p.items.length) t[key] = p.items[0].timePrimitive
    })
    return t;
  }

  static recursiveMarkAsTouched = (f: FormArray | FormGroup) => {

    if (f.controls) {
      if (Array.isArray(f.controls)) {
        // in this case it is a formArray
        f.controls.forEach((c: FormArray) => {
          c.markAsTouched()
          if (c.controls) U.recursiveMarkAsTouched(c)
        })
      }
      else {
        // in this case it is a formGroup
        if (f.controls['childControl']) {
          const c = f.controls['childControl'] as FormArray;
          c.markAsTouched()
          if (c.controls) U.recursiveMarkAsTouched(c)

        }
      }
    }
  }

  static propertyFieldKeyFromParams(fkProp: number, isOutgoing: boolean) {
    return '_' + fkProp + '_' + (isOutgoing ? 'outgoing' : 'ingoing')
  }


  /**
   * Helper function that converts given number to string
   * but zero (=0) values return undefined.
   */
  static toStr0undef(val: number): string | undefined {
    if (val === 0) return undefined
    else if (val === undefined) return undefined
    else if (val === null) return undefined
    else return val.toString();
  }
  /**
   * Helper function that converts given array to string
   *
   * If array contains 0, null or undefined, return underfined
   */
  static toStrContains0undef(vals: (number | boolean | string | object)[]): string | undefined {
    let string = '';
    for (let i = 0; i < vals.length; i++) {
      const val = vals[i];

      if (val === 0) return undefined;
      else if (val === undefined) return undefined;
      else if (val === null) return undefined
      else if (i === 0) {
        string = val.toString()
      } else {
        string = `${string}_${val.toString()}`
      }
    }

    return string;
  }
}
