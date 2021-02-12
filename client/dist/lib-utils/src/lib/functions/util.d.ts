import { FormArray, FormGroup } from '@angular/forms';
import { ProTextProperty } from '@kleiolab/lib-sdk-lb3';
export interface LabelGeneratorSettings {
    fieldsMax?: number;
    statementsMax?: number;
    path: string[];
} /**
 * Utilities class for static functions
 */
export declare class U {
    static obj2Arr<T>(obj: {
        [key: string]: T;
    }): T[];
    static objNr2Arr<T>(obj: {
        [key: number]: T;
    }): T[];
    /**
     * converts object to array with {key: value} objects, e.g.:
     * {'a': 12, 'b': 99} --> [{key: 'a', value: 12, key: 'b', value: 99}]
     *
     * @param obj
     */
    static obj2KeyValueArr<T>(obj: {
        [key: string]: T;
    }): {
        key: string;
        value: T;
    }[];
    static firstProTextPropStringOfType(textProperties: ProTextProperty[], fkSystemType: any): string;
    /**
    * Erzeugt eine UUID nach RFC 4122
    */
    static uuid(): string;
    static recursiveMarkAsTouched: (f: FormGroup | FormArray) => void;
    static propertyFieldKeyFromParams(fkProp: number, isOutgoing: boolean): string;
    /**
     * Helper function that converts given number to string
     * but zero (=0) values return undefined.
     */
    static toStr0undef(val: number): string | undefined;
    /**
     * Helper function that converts given array to string
     *
     * If array contains 0, null or undefined, return underfined
     */
    static toStrContains0undef(vals: (number | boolean | string | object)[]): string | undefined;
}
