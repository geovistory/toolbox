/* eslint-disable @typescript-eslint/camelcase */
import {Client, expect} from '@loopback/testlab';
import {LoginResponse} from '../../../../controllers/account.controller';
import {GvPositiveSchemaObject} from '../../../../models/gv-positive-schema-object.model';
import {GeovistoryServer} from '../../../../server';
import {createProProject} from '../../../helpers/atomic/pro-project.helper';
import {createProTextProperty} from '../../../helpers/atomic/pro-text-property.helper';
import {linkAccountToProject} from '../../../helpers/atomic/pub-account_project_rel.helper';
import {ProProjectMock} from '../../../helpers/data/gvDB/ProProjectMock';
import {ProTextPropertyMock} from '../../../helpers/data/gvDB/ProTextPropertyMock';
import {createAccountVerified} from '../../../helpers/generic/account.helper';
import {createSandBoxProject} from '../../../helpers/graphs/project.helper';
import {setupApplication} from '../../../helpers/gv-server-helpers';
import {cleanDb} from '../../../helpers/meta/clean-db.helper';
import {createLanguages, createTypes} from '../../../helpers/meta/model.helper';


describe('FindAccountDataController', () => {
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
    await createTypes();
    await createLanguages();
    await createProProject(ProProjectMock.SANDBOX_PROJECT);
    accountInProject = await createAccountVerified(emailGaetan, pwd);
    await linkAccountToProject(accountInProject, ProProjectMock.SANDBOX_PROJECT.pk_entity as number);
    await createAccountVerified(emailJonas, pwd);
    const loginRes = await client.post('/login').send({email: emailGaetan, password: pwd});
    const loginResponse: LoginResponse = loginRes.body;
    lb4Token = loginResponse.lb4Token;
  });

  describe('GET /account-data/get-projects-of-account', () => {

    it('should respond with GvPositiveSchemaObject containing the projects, its labels and descriptions', async () => {
      await createProTextProperty(ProTextPropertyMock.SANDBOX_PROJECT_NAME);

      const res: {body: GvPositiveSchemaObject} = await client
        .get('/account-data/get-projects-of-account')
        .set('Authorization', lb4Token)
      expect(res.body.pro?.project?.length).to.equal(1)
      expect(res.body.pro?.text_property?.length).to.equal(1)
    })
  })

});

