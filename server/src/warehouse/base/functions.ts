import getFolderSize from 'get-folder-size';
import {PClassId} from '../primary-ds/PClassFieldsConfigService';
import {DfhClassLabelId} from '../primary-ds/DfhClassLabelService';
import {PEntityId} from '../primary-ds/PEntityService';
import {ProClassLabelId} from '../primary-ds/ProClassLabelService';
import {ProjectId} from '../primary-ds/ProProjectService';
import {leveldbpath} from './database';
import {ClassId} from '../primary-ds/DfhClassHasTypePropertyService';
import {PPropertyId} from '../primary-ds/PPropertyService';
import {DfhPropertyLabelId} from '../primary-ds/DfhPropertyLabelService';
import {ProPropertyLabelId} from '../primary-ds/ProPropertyLabelService';
import {PClassFieldId} from '../aggregator-ds/p-class-field-label/PClassFieldLabelService';
import {OutgoingProperyId} from '../primary-ds/DfhOutgoingPropertyService';
import {REntityId} from '../primary-ds/REntityService';

export function pEntityIdToString(key: PEntityId): string {
    return key.fkProject + '_' + key.pkEntity;
}
export function stringToPEntityId(str: string): PEntityId {
    const [fkProject, pkEntity] = str.split('_');
    return {fkProject: parseInt(fkProject, 10), pkEntity: parseInt(pkEntity, 10)};
}

// project class id to string
export function pClassIdToString(key: PClassId): string {
    return key.fkProject + '_' + key.pkClass;
}
// string to project class
export function stringToPClassId(str: string): PClassId {
    const [fkProject, pkClass] = str.split('_');
    return {fkProject: parseInt(fkProject, 10), pkClass: parseInt(pkClass, 10)};
}

// project property id to string
export function pPropertyIdToString(key: PPropertyId): string {
    return key.fkProject + '_' + key.pkProperty;
}
// string to project property
export function stringToPPropertyId(str: string): PPropertyId {
    const [fkProject, pkProperty] = str.split('_');
    return {fkProject: parseInt(fkProject, 10), pkProperty: parseInt(pkProperty, 10)};
}


// project field id to string
export function pClassFieldIdToString(key: PClassFieldId): string {
    return key.fkProject + '_' + key.fkClass + '_' + key.fkProperty + '_' + key.isOutgoing;;
}
// string to project field
export function stringToPClassFieldId(str: string): PClassFieldId {
    const [fkProject, fkClass, fkProperty, isOutgoing] = str.split('_');
    return {
        fkProject: parseInt(fkProject, 10),
        fkClass: parseInt(fkClass, 10),
        fkProperty: parseInt(fkProperty, 10),
        isOutgoing: isOutgoing === 'true'
    };
}

export function entityIdToString(key: REntityId): string {
    return '' + key.pkEntity;
}
export function stringToEntityId(str: string): REntityId {
    return {pkEntity: parseInt(str, 10)};
}


// class to string
export function classIdToString(key: ClassId): string {
    return key.pkClass.toString();
}
// string to class
export function stringToClassId(str: string): ClassId {
    return {pkClass: parseInt(str, 10)};
}

export function projectIdToString(key: ProjectId): string {
    return key.pkProject.toString()
}

export function stringToProjectId(str: string): ProjectId {
    return {pkProject: parseInt(str, 10)};
}

export function dfhClassIdToString(key: DfhClassLabelId): string {
    return key.pkClass + '_' + key.language

}
export function stringToDfhClassId(str: string): DfhClassLabelId {
    const [pkClass, language] = str.split('_')
    return {pkClass: parseInt(pkClass, 10), language};
}


export function dfhPropertyIdToString(key: DfhPropertyLabelId): string {
    return key.pkProperty + '_' + key.language

}
export function stringToDfhPropertyId(str: string): DfhPropertyLabelId {
    const [pkProperty, language] = str.split('_')
    return {pkProperty: parseInt(pkProperty, 10), language};
}




export function proClassIdToString(key: ProClassLabelId): string {
    return key.fkProject + '_' + key.fkClass + '_' + key.fkLanguage
}
export function stringToProClassId(str: string): ProClassLabelId {
    const [fkProject, pkClass, fkLanguage] = str.split('_')
    return {fkProject: parseInt(fkProject, 10), fkClass: parseInt(pkClass, 10), fkLanguage: parseInt(fkLanguage, 10)};
}


export function proPropertyIdToString(key: ProPropertyLabelId): string {
    return key.fkProject + '_' + key.fkClass + '_' + key.fkProperty + '_' + key.isOutgoing + '_' + key.fkLanguage
}
export function stringToProPropertyId(str: string): ProPropertyLabelId {
    const [fkProject, fkClass, fkProperty, isOutgoing, fkLanguage] = str.split('_')
    return {
        fkProject: parseInt(fkProject, 10),
        fkClass: parseInt(fkClass, 10),
        fkProperty: parseInt(fkProperty, 10),
        isOutgoing: isOutgoing === 'true',
        fkLanguage: parseInt(fkLanguage, 10)
    };
}

// this sql is useful for update statements of all entity preview parts
// contributing to the TSearch Vector of an entity preview:
// entity_label, type_label, class_label, full_text
export const sqlForTsVector = `ts_vector = (
    SELECT
    setweight(to_tsvector(coalesce(entity_label, '')), 'A') ||
    setweight(to_tsvector(coalesce(type_label, class_label, '')), 'B') ||
    setweight(to_tsvector(coalesce(full_text, '')), 'C')
)`


export function outgoingProperyIdToString(key: OutgoingProperyId): string {
    return key.fkDomain + '_' + key.fkProperty
}
export function stringToOutgoingProperyId(str: string): OutgoingProperyId {
    const [fkDomain, fkProperty] = str.split('_')
    return {
        fkDomain: parseInt(fkDomain, 10),
        fkProperty: parseInt(fkProperty, 10)
    };
}





/**
 * returns file size of db in MB
 */
export async function getDbFileSize(): Promise<{
    bytes: number,
    readable: string
}> {
    return new Promise((res, rej) => {
        getFolderSize(leveldbpath, (err, size) => {
            if (err) {rej(err);}

            res({
                bytes: size,
                readable: (size / 1024 / 1024).toFixed(2) + ' MB'
            })
        })
    })

}

/**
 * returns memory usage in MB
 */
export function getMemoryUsage(): number {
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    return Math.round(used * 100) / 100
}
