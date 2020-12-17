/* eslint-disable @typescript-eslint/camelcase */
import { createInfLanguage } from '../atomic/inf-language.helper';
import * as projects from '../atomic/pro-project.helper';
import { createProTextProperty } from '../atomic/pro-text-property.helper';
import { SysSystemTypeMock } from '../data/gvDB/SysSystemTypeMock';
import { getIndex } from '../meta/index.helper';

export async function createProject(name: string, lang: number): Promise<number> {
  const proj = (await projects.createProProject({
    pk_entity: getIndex(),
    fk_language: lang
  })).pk_entity as number;

  await createProTextProperty({
    pk_entity: getIndex(),
    fk_project: proj,
    fk_language: lang,
    fk_system_type: SysSystemTypeMock.PRO_TEXT_PROPTERTY_LABEL.pk_entity,
    string: name
  });

  return proj;
}