import { ProTextProperty } from '@kleiolab/lib-sdk-lb4';
import { ByPk } from '@kleiolab/lib-utils';

export interface ProTextPropertySlice {
  by_fks?: ByPk<ProTextProperty>;
  by_fks_without_lang?: ByPk<ByPk<ProTextProperty>>;
}
