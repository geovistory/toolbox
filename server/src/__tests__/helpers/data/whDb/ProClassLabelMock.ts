import {ProClassLabelId} from '../../../../warehouse/primary-ds/ProClassLabelService'
import {PK_DEFAULT_CONFIG_PROJECT} from '../../../../warehouse/Warehouse';
import {ProjectMock} from './ProjectMock';

export class ProClassLabelMock {

  static readonly GV_NAMING_EN_ID: ProClassLabelId = {
    fkProject: PK_DEFAULT_CONFIG_PROJECT,
    fkLanguage: 18889, // en
    fkClass: 365
  }
  static readonly GV_NAMING_EN_LABEL = 'Naming';

  static readonly GV_NAMING_DE_ID: ProClassLabelId = {
    fkProject: PK_DEFAULT_CONFIG_PROJECT,
    fkLanguage: 18605, // de
    fkClass: 365
  }
  static readonly GV_NAMING_DE_LABEL = 'Benennung';


  static readonly PROJECT_DE_NAMING_EN_ID: ProClassLabelId = {
    fkProject: ProjectMock.PROJECT_DE_ID.pkProject,
    fkLanguage: 18889, // en
    fkClass: 365
  }
  static readonly PROJECT_DE_NAMING_EN_LABEL = 'Name giving (so do I call it)';

  static readonly PROJECT_DE_NAMING_DE_ID: ProClassLabelId = {
    fkProject: ProjectMock.PROJECT_DE_ID.pkProject,
    fkLanguage: 18605, // de
    fkClass: 365
  }
  static readonly PROJECT_DE_NAMING_DE_LABEL = 'Namensgebung';

}
