import {expect} from '@loopback/testlab';
import {GeovistoryApplication} from '../../../../application';
import {VisibilityController, getCommunityVisibilityDefault, getProjectVisibilityDefault} from '../../../../controllers/backoffice/visibility.controller';
import {ProVisibilitySettingsValue} from '../../../../models/project-visibilty-settings/pro-visibility-settings-value';
import {SysConfigValue} from '../../../../models/sys-config/sys-config-value.model';
import {createDfhApiClass} from '../../../helpers/atomic/dfh-api-class.helper';
import {createInfLanguage} from '../../../helpers/atomic/inf-language.helper';
import {linkAccountToProject} from '../../../helpers/atomic/pub-account_project_rel.helper';
import {DfhApiClassMock} from '../../../helpers/data/gvDB/DfhApiClassMock';
import {InfLanguageMock} from '../../../helpers/data/gvDB/InfLanguageMock';
import {ProProjectMock} from '../../../helpers/data/gvDB/ProProjectMock';
import {createAccountVerified} from '../../../helpers/generic/account.helper';
import {createProject1} from '../../../helpers/graphs/project.helper';
import {setupApplication} from '../../../helpers/gv-server-helpers';
import {setupTestDB} from '../../../helpers/setupTestDB';

describe('VisibilityController', () => {
  let server: GeovistoryApplication;
  let accountInProject: number;
  const emailGaetan = 'gaetan.muck@kleiolab.ch';
  const emailJonas = 'jonas.schneider@kleiolab.ch';
  const pwd = 'testtest1';


  describe('getBasicTypeLookup()', () => {
    it('should find basicType of class', async () => {
      await setupTestDB();
      ({server} = await setupApplication());
      // await createModel();
      await createInfLanguage(InfLanguageMock.GERMAN)
      await createProject1();

      accountInProject = await createAccountVerified(emailGaetan, pwd);
      await linkAccountToProject(accountInProject, ProProjectMock.PROJECT_1.pk_entity as number);
      await createAccountVerified(emailJonas, pwd);
      await createDfhApiClass(DfhApiClassMock.EN_21_PERSON)
      const createProjectDataController: VisibilityController = await server.get('controllers.VisibilityController')
      const lookup = await createProjectDataController.getClassLookup()
      expect(lookup[21].basic_type).to.equal(8)
      await server.stop();
    })
  })
  describe('getCommunityVisibilityDefault()', () => {

    it('should find communityVisibilityDefault by fallback', async () => {
      const sysConfig: SysConfigValue = {
        specialFields: {},
        classes: {},
      }
      const res = getCommunityVisibilityDefault(sysConfig, 21, 8)

      expect(res).to.deepEqual({toolbox: true, dataApi: true, website: true})
    })
    it('should find communityVisibilityDefault by system classesDefault', async () => {
      const def = {toolbox: true, dataApi: false, website: true}
      const sysConfig: SysConfigValue = {
        specialFields: {},
        classesDefault: {
          communityVisibilityDefault: def
        },
        classes: {},
      }
      const res = getCommunityVisibilityDefault(sysConfig, 21, 8)

      expect(res).to.deepEqual(def)
    })
    it('should find communityVisibilityDefault by system basicType', async () => {
      const def = {toolbox: true, dataApi: false, website: true}
      const sysConfig: SysConfigValue = {
        specialFields: {},
        classesDefault: {
          communityVisibilityDefault: {toolbox: false, dataApi: false, website: false}
        },
        classesByBasicType: {
          8: {communityVisibilityDefault: def}
        },
        classes: {},
      }
      const res = getCommunityVisibilityDefault(sysConfig, 21, 8)

      expect(res).to.deepEqual(def)
    })
    it('should find communityVisibilityDefault by system pkClass', async () => {
      const def = {toolbox: true, dataApi: false, website: true}
      const sysConfig: SysConfigValue = {
        specialFields: {},
        classesDefault: {
          communityVisibilityDefault: {toolbox: false, dataApi: false, website: false}
        },
        classesByBasicType: {
          8: {communityVisibilityDefault: {toolbox: false, dataApi: false, website: false}}
        },
        classes: {
          21: {communityVisibilityDefault: def}
        },
      }
      const res = getCommunityVisibilityDefault(sysConfig, 21, 8)

      expect(res).to.deepEqual(def)
    })

    it('should find communityVisibilityDefault by project classesDefault', async () => {
      const def = {toolbox: true, dataApi: false, website: true}
      const sysConfig: SysConfigValue = {
        specialFields: {},
        classesDefault: {
          communityVisibilityDefault: {toolbox: false, dataApi: false, website: false}
        },
        classes: {},
      }
      const projectConfig: ProVisibilitySettingsValue = {
        classesDefault: {
          communityVisibilityDefault: def
        },
        classes: {},
      }
      const res = getCommunityVisibilityDefault(sysConfig, 21, 8, projectConfig)

      expect(res).to.deepEqual(def)
    })
    it('should find communityVisibilityDefault by project basicType', async () => {
      const def = {toolbox: true, dataApi: false, website: true}
      const sysConfig: SysConfigValue = {
        specialFields: {},
        classesDefault: {
          communityVisibilityDefault: {toolbox: false, dataApi: false, website: false}
        },
        classes: {},
      }
      const projectConfig: ProVisibilitySettingsValue = {
        classesDefault: {
          communityVisibilityDefault: {toolbox: false, dataApi: false, website: false}
        },
        classesByBasicType: {
          8: {communityVisibilityDefault: def}
        },
        classes: {},
      }
      const res = getCommunityVisibilityDefault(sysConfig, 21, 8, projectConfig)

      expect(res).to.deepEqual(def)
    })
    it('should find communityVisibilityDefault by project pkClass', async () => {
      const def = {toolbox: true, dataApi: false, website: true}
      const sysConfig: SysConfigValue = {
        specialFields: {},
        classesDefault: {
          communityVisibilityDefault: {toolbox: false, dataApi: false, website: false}
        },
        classes: {},
      }
      const projectConfig: ProVisibilitySettingsValue = {
        classesDefault: {
          communityVisibilityDefault: {toolbox: false, dataApi: false, website: false}
        },
        classesByBasicType: {
          8: {communityVisibilityDefault: {toolbox: false, dataApi: false, website: false}}
        },
        classes: {
          21: {communityVisibilityDefault: def}
        },
      }
      const res = getCommunityVisibilityDefault(sysConfig, 21, 8, projectConfig)

      expect(res).to.deepEqual(def)
    })



  })
  describe('getProjectVisibilityDefault()', () => {

    it('should find projectVisibilityDefault by fallback', async () => {
      const sysConfig: SysConfigValue = {
        specialFields: {},
        classes: {},
      }
      const res = getProjectVisibilityDefault(sysConfig, 21, 8)

      expect(res).to.deepEqual({dataApi: false, website: false})
    })
    it('should find projectVisibilityDefault by classesDefault', async () => {
      const def = {dataApi: false, website: true}
      const sysConfig: SysConfigValue = {
        specialFields: {},
        classesDefault: {
          projectVisibilityDefault: def
        },
        classes: {},
      }
      const res = getProjectVisibilityDefault(sysConfig, 21, 8)

      expect(res).to.deepEqual(def)
    })
    it('should find projectVisibilityDefault by basicType', async () => {
      const def = {dataApi: false, website: true}
      const sysConfig: SysConfigValue = {
        specialFields: {},
        classesDefault: {
          projectVisibilityDefault: {dataApi: false, website: false}
        },
        classesByBasicType: {
          8: {projectVisibilityDefault: def}
        },
        classes: {},
      }
      const res = getProjectVisibilityDefault(sysConfig, 21, 8)

      expect(res).to.deepEqual(def)
    })
    it('should find projectVisibilityDefault by pkClass', async () => {
      const def = {dataApi: false, website: true}
      const sysConfig: SysConfigValue = {
        specialFields: {},
        classesDefault: {
          projectVisibilityDefault: {dataApi: false, website: false}
        },
        classesByBasicType: {
          8: {projectVisibilityDefault: {dataApi: false, website: false}}
        },
        classes: {
          21: {projectVisibilityDefault: def}
        },
      }
      const res = getProjectVisibilityDefault(sysConfig, 21, 8)

      expect(res).to.deepEqual(def)
    })

  })




});

