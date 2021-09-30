import {expect} from '@loopback/testlab';
import {getCommunityVisibilityDefault, getProjectVisibilityDefault, VisibilityController} from '../../../../controllers/backoffice/visibility.controller';
import {SysConfigValue} from '../../../../models/sys-config/sys-config-value.model';
import {GeovistoryServer} from '../../../../server';
import {createDfhApiClass} from '../../../helpers/atomic/dfh-api-class.helper';
import {createInfLanguage} from '../../../helpers/atomic/inf-language.helper';
import {linkAccountToProject} from '../../../helpers/atomic/pub-account_project_rel.helper';
import {DfhApiClassMock} from '../../../helpers/data/gvDB/DfhApiClassMock';
import {InfLanguageMock} from '../../../helpers/data/gvDB/InfLanguageMock';
import {ProProjectMock} from '../../../helpers/data/gvDB/ProProjectMock';
import {createAccountVerified} from '../../../helpers/generic/account.helper';
import {createProject1} from '../../../helpers/graphs/project.helper';
import {setupApplication} from '../../../helpers/gv-server-helpers';
import {cleanDb} from '../../../helpers/meta/clean-db.helper';

describe('VisibilityController', () => {
  let server: GeovistoryServer;
  let accountInProject: number;
  const emailGaetan = 'gaetan.muck@kleiolab.ch';
  const emailJonas = 'jonas.schneider@kleiolab.ch';
  const pwd = 'testtest1';

  before(async () => {({server} = await setupApplication());});
  after(async () => {await server.stop();});


  describe('getBasicTypeLookup()', () => {

    beforeEach(async () => {
      await cleanDb();
      // await createModel();
      await createInfLanguage(InfLanguageMock.GERMAN)
      await createProject1();

      accountInProject = await createAccountVerified(emailGaetan, pwd);
      await linkAccountToProject(accountInProject, ProProjectMock.PROJECT_1.pk_entity as number);
      await createAccountVerified(emailJonas, pwd);
    });
    it('should find basicType of class', async () => {
      await createDfhApiClass(DfhApiClassMock.EN_21_PERSON)
      const createProjectDataController: VisibilityController = await server.lbApp.get('controllers.VisibilityController')
      const lookup = await createProjectDataController.getClassLookup()
      expect(lookup[21].basic_type).to.equal(8)
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
    it('should find communityVisibilityDefault by classesDefault', async () => {
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
    it('should find communityVisibilityDefault by basicType', async () => {
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
    it('should find communityVisibilityDefault by pkClass', async () => {
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

