import {Client, expect} from '@loopback/testlab';
import {LoginResponse} from '../../../controllers/account.controller';
import {VisibilityReport} from '../../../controllers/community-visibility.controller';
import {CommunityVisibilityOptions} from '../../../models/sys-config/sys-config-community-visibility-options';
import {GeovistoryServer} from '../../../server';
import {createDfhApiClass} from '../../helpers/atomic/dfh-api-class.helper';
import {createInfLanguage} from '../../helpers/atomic/inf-language.helper';
import {createInfResource} from '../../helpers/atomic/inf-resource.helper';
import {linkAccountToProject} from '../../helpers/atomic/pub-account_project_rel.helper';
import {createSysSystemConfig} from '../../helpers/atomic/sys-system-config.helper';
import {DfhApiClassMock} from '../../helpers/data/gvDB/DfhApiClassMock';
import {InfLanguageMock} from '../../helpers/data/gvDB/InfLanguageMock';
import {InfResourceMock} from '../../helpers/data/gvDB/InfResourceMock';
import {ProProjectMock} from '../../helpers/data/gvDB/ProProjectMock';
import {createAccountVerified} from '../../helpers/generic/account.helper';
import {createProject1} from '../../helpers/graphs/project.helper';
import {setupApplication} from '../../helpers/gv-server-helpers';
import {cleanDb} from '../../helpers/meta/clean-db.helper';


describe('CommunityVisibiliyController', () => {
  let server: GeovistoryServer;
  let client: Client;
  let accountInProject: number;
  const emailGaetan = 'gaetan.muck@kleiolab.ch';
  const emailJonas = 'jonas.schneider@kleiolab.ch';
  const pwd = 'testtest1';
  let lb4Token: string

  before(async () => {({server, client} = await setupApplication());});
  after(async () => {await server.stop();});

  beforeEach(async () => {
    await cleanDb();
    // await createModel();
    await createInfLanguage(InfLanguageMock.GERMAN)
    await createProject1();

    accountInProject = await createAccountVerified(emailGaetan, pwd);
    await linkAccountToProject(accountInProject, ProProjectMock.PROJECT_1.pk_entity as number);
    await createAccountVerified(emailJonas, pwd);
    const loginRes = await client.post('/login').send({email: emailGaetan, password: pwd});
    const loginResponse: LoginResponse = loginRes.body;
    lb4Token = loginResponse.lb4Token;
  });

  describe('GET /community-visibility/report-conflicts', () => {

    it('should find one entity with conflicting toolbox visibility true', async () => {
      const mock = InfResourceMock.PERSON_1;
      mock.community_visibility = {toolbox: true, dataApi: false, website: undefined} as unknown as CommunityVisibilityOptions

      await createInfResource(InfResourceMock.PERSON_1)
      await createDfhApiClass(DfhApiClassMock.EN_21_PERSON)
      await createSysSystemConfig({
        classes: {
          [21]: {
            communityVisibilityRange: {
              min: {toolbox: false, dataApi: true, website: true},
              max: {toolbox: false, dataApi: true, website: true}
            }
          }
        },
        specialFields: {}
      })

      const res: {body: VisibilityReport[]} = await client
        .get('/community-visibility/report-conflicts')
        .set('Authorization', lb4Token)


      expect(res.body[0].conflicts.find(k => k.channel === 'toolbox')?.conflicts).to.equal(1)
      expect(res.body[0].conflicts.find(k => k.channel === 'dataapi')?.conflicts).to.equal(1)
      expect(res.body[0].conflicts.find(k => k.channel === 'website')?.conflicts).to.equal(1)
    })



  })


});

