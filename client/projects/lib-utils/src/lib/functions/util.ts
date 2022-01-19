import { FormArray, FormGroup } from '@angular/forms';
import { ProTextProperty } from '@kleiolab/lib-sdk-lb3';


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


