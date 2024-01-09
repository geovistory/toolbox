import {ProVisibilitySettings} from '../../../models';
import {ProVisibilitySettingsRepository} from '../../../repositories';
import {TestDbFactory} from '../TestDbFactory';
import {dealWithPkEntity} from './_sequences.helper';

export function createProVisibilitySettingsRepo() {
  return new ProVisibilitySettingsRepository(TestDbFactory.datasource)
}

export async function createProVisibilitySettings(item: Partial<ProVisibilitySettings>) {
  return createProVisibilitySettingsRepo().create(await dealWithPkEntity(item, 'projects'), {strict: false})
}
