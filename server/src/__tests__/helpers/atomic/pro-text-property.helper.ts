/* eslint-disable @typescript-eslint/camelcase */
import { testdb } from "../testdb";
import {ProTextPropertyRepository} from '../../../repositories';
import {ProTextProperty} from '../../../models';
import {AtmLanguages} from './inf-language.helper';
import {dealWithPkEntity} from './_sequences.helper';
function createProTextPropertyRepo() {
    return new ProTextPropertyRepository(
      testdb
    )
  }

export async function createProTextPropertyClassLabel(fkProject: number, fkClass: number, classLabel: string, fkLanguage = AtmLanguages.ENGLISH.id) {
    const item = new ProTextProperty({
        fk_language: fkLanguage,
        fk_project: fkProject,
        fk_system_type: 639, // label of an entity
        fk_dfh_class: fkClass,
        string: classLabel
    })
    const repo = new ProTextPropertyRepository(testdb)
    const created = await repo.create(item);
    return repo.findById(created.pk_entity)
}

export async function createProTextPropertyPropertyLabel(fkProject: number, fkProperty: number, propertyLabel: string, fkLanguage = AtmLanguages.ENGLISH.id) {
    const item = new ProTextProperty({
        fk_language: fkLanguage,
        fk_project: fkProject,
        fk_system_type: 639, // label of an entity
        fk_dfh_property: fkProperty,
        string: propertyLabel
    })
    const repo = new ProTextPropertyRepository(testdb)
    const created = await repo.create(item);
    return repo.findById(created.pk_entity)
}

export async function updateProTextProperty(pkEntity: number, patch: Partial<ProTextProperty>) {
    const repo = new ProTextPropertyRepository(testdb)
    await repo.updateById(pkEntity, patch);
    return repo.findById(pkEntity)
}

export async function deleteProTextProperty(pkEntity: number) {
    return new ProTextPropertyRepository(testdb).deleteById(pkEntity);
}


export async function createProTextProperty(item: Partial<ProTextProperty>) {
    return createProTextPropertyRepo().create(await dealWithPkEntity(item, 'projects'));
  }
