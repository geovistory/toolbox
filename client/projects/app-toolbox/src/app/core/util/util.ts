// TODO DELETE UNUSED
import { FormArray, FormGroup } from '@angular/forms';
import { SysConfig } from '@kleiolab/lib-config';
import { ByPk, ProjectPreview } from '@kleiolab/lib-redux';
import { ProProject, ProTextProperty } from '@kleiolab/lib-sdk-lb3';
import { QuillDoc } from '@kleiolab/lib-sdk-lb4';
import { AcEntity, AcNotification, ActionType } from 'angular-cesium';

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

export class Utils {

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
    return item && item[key] && Object.keys(item[key]).length ? Utils.obj2Arr(item[key])[0] : undefined;
  }
  static firstItemInObject<T>(item: ByPk<T>): T {
    return item && Object.keys(item).length ? Utils.obj2Arr(item)[0] : undefined;
  }


  // /**
  //  *  Extracts the calendar from  InfTimePrimitve to TimePrimitive
  // */
  // static getCalendarFromStatement(statement: InfStatement): CalendarType {
  //   if (!statement) return null;

  //   const cal = (statement.entity_version_project_rels && statement.entity_version_project_rels[0].calendar) ?
  //     statement.entity_version_project_rels[0].calendar :
  //     statement.community_favorite_calendar ?
  //       statement.community_favorite_calendar : null;

  //   return cal as CalendarType;
  // }


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
      label: Utils.firstProTextPropStringOfType(project.text_properties, SysConfig.PK_SYSTEM_TYPE__TEXT_PROPERTY__LABEL),
      description: Utils.firstProTextPropStringOfType(project.text_properties, SysConfig.PK_SYSTEM_TYPE__TEXT_PROPERTY__DESCRIPTION),
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
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
      const random = Math.random() * 16 | 0; // Nachkommastellen abschneiden
      const value = char === 'x' ? random : (random % 4 + 8); // Bei x Random 0-15 (0-F), bei y Random 0-3 + 8 = 8-11 (8-b) gemäss RFC 4122
      return value.toString(16); // Hexadezimales Zeichen zurückgeben
    });
  }


  static recursiveMarkAsTouched = (f: FormArray | FormGroup) => {

    if (f.controls) {
      if (Array.isArray(f.controls)) {
        // in this case it is a formArray
        f.controls.forEach((c: FormArray) => {
          c.markAsTouched()
          if (c.controls) Utils.recursiveMarkAsTouched(c)
        })
      }
      else {
        // in this case it is a formGroup
        if (f.controls['childControl']) {
          const c = f.controls['childControl'] as FormArray;
          c.markAsTouched()
          if (c.controls) Utils.recursiveMarkAsTouched(c)

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
