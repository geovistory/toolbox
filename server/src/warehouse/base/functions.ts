import getFolderSize from 'get-folder-size';
import {PClassId} from '../primary-ds/FieldsConfigService';
import {DfhClassLabelId} from '../primary-ds/DfhClassLabelService';
import {PEntityId} from '../primary-ds/PEntityService';
import {FieldId} from '../primary-ds/FieldLabelService';
import {ProClassLabelId} from '../primary-ds/ProClassLabelService';
import {ProjectId} from '../primary-ds/ProjectService';
import {leveldbpath} from './database';

export function entityIdToString(key: PEntityId): string {
    return key.fkProject + '_' + key.pkEntity;
}
export function stringToEntityId(str: string): PEntityId {
    const [fkProject, pkEntity] = str.split('_');
    return {fkProject: parseInt(fkProject, 10), pkEntity: parseInt(pkEntity, 10)};
}


export function classIdToString(key: PClassId): string {
    return key.fkProject + '_' + key.pkClass;
}
export function stringToClassId(str: string): PClassId {
    const [fkProject, pkClass] = str.split('_');
    return {fkProject: parseInt(fkProject, 10), pkClass: parseInt(pkClass, 10)};
}


export function fieldIdToString(key: FieldId): string {
    return key.fkProject + '_' + key.fkClass + '_' + key.fkProperty + '_' + key.isOutgoing
}

export function stringToFieldId(str: string): FieldId {
    const [fkProject, fkClass, fkProperty, isOutgoing] = str.split('_')
    return {
        fkProject: parseInt(fkProject, 10),
        fkClass: parseInt(fkClass, 10),
        fkProperty: parseInt(fkProperty, 10),
        isOutgoing: (isOutgoing === 'true'),
    };
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


export function proClassIdToString(key: ProClassLabelId): string {
    return key.fkProject + '_' + key.fkClass + '_' + key.fkLanguage
}
export function stringToProClassId(str: string): ProClassLabelId {
    const [fkProject, pkClass, fkLanguage] = str.split('_')
    return {fkProject: parseInt(fkProject, 10), fkClass: parseInt(pkClass, 10), fkLanguage:parseInt(fkLanguage,10)};
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
