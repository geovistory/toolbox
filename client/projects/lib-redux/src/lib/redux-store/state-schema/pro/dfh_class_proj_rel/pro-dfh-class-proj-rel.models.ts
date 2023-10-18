import { ProDfhClassProjRel } from '@kleiolab/lib-sdk-lb4';
import { ByPk } from '../../../public-api';


export interface ProDfhClassProjRelSlice {
  by_fk_project__fk_class?: ByPk<ProDfhClassProjRel>;
  by_fk_project?: ByPk<ByPk<ProDfhClassProjRel>>;
  by_fk_project__enabled_in_entities?: ByPk<ByPk<ProDfhClassProjRel>>;
}
