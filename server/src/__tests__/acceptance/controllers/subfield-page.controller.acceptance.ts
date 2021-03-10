import {Client, expect} from '@loopback/testlab';
import {GeovistoryServer} from '../../../server';
import {GvLoadSubfieldPageReqMock} from '../../helpers/data/api-requests/GvLoadSubfieldPageReq';
import {GvPaginationObjectMock} from '../../helpers/data/api-responses/GvPaginationObjectMock';
import {SubfieldHelper} from '../../helpers/graphs/subfield-page.helper';
import {setupApplication, validateAgainstSchema} from '../../helpers/gv-server-helpers';
import {cleanDb} from '../../helpers/meta/clean-db.helper';
import {GvFieldPageReq} from '../../../models/field/gv-field-page-req';

describe('SubfieldPageController', () => {
  let server: GeovistoryServer;
  let client: Client;
  let pkProject: number;
  let lb4Token: string;

  before(async () => {
    ({server, client} = await setupApplication());
  })
  beforeEach(async () => {
    await cleanDb();
    const d = await SubfieldHelper.makeProject1()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    pkProject = d.pk_entity;
    const res = await client.post('/login')
      .send({email: "gaetan.muck@kleiolab.ch", password: "testtest1"});
    lb4Token = res.body.lb4Token
  });
  after(async () => {
    try {
      await server.stop();
    } catch (e) {
      console.log(e);
    }
  });

  describe('POST /subfield-page/load-subfield-page', () => {
    it('should reject unauthorized', async () => {
      await client.post('/subfield-page/load-subfield-page')
        .set('Authorization', lb4Token)
        .send({
          ...GvLoadSubfieldPageReqMock.appeTeEnRefersToName,
          pkProject: -99
        })
        .expect(403);
    });
    it('should return subfield page for subfieldType appellation', async () => {
      await SubfieldHelper.appeTeEnRefersToName()
      const res = await client.post('/subfield-page/load-subfield-page')
        .set('Authorization', lb4Token)
        .send(GvLoadSubfieldPageReqMock.appeTeEnRefersToName)
        .expect(200);
      expect(res.body).to.containDeep(GvPaginationObjectMock.appeTeEnHasAppeVt);
    });
    it('should return subfield page for subfieldType language', async () => {
      await SubfieldHelper.appeTeEnUsedInLanguage()
      const res = await client.post('/subfield-page/load-subfield-page')
        .set('Authorization', lb4Token)
        .send(GvLoadSubfieldPageReqMock.appeTeEnUsedInLanguage)
        .expect(200);
      expect(res.body).to.containDeep(GvPaginationObjectMock.appeTeEnUsedInLanguage);
    });
    it('should return subfield page for madridsPresenceWasAtPlace', async () => {
      await SubfieldHelper.madridsPresenceWasAtPlace()
      const res = await client.post('/subfield-page/load-subfield-page')
        .set('Authorization', lb4Token)
        .send(GvLoadSubfieldPageReqMock.madridsPresenceWasAtPlace)
        .expect(200);
      expect(res.body).to.containDeep(GvPaginationObjectMock.madridsPresenceWasAtPlace);
    });
    it('should return subfield page for journeyHasDuration', async () => {
      await SubfieldHelper.journeyHasDuration()
      const res = await client.post('/subfield-page/load-subfield-page')
        .set('Authorization', lb4Token)
        .send(GvLoadSubfieldPageReqMock.journyeHasDuration)
        .expect(200);
      expect(res.body).to.containDeep(GvPaginationObjectMock.journeyHasDuration);
    });
    it('should return subfield page for manifSingletonHasShortTitleMurderer', async () => {
      await SubfieldHelper.manifSingletonHasShortTitleMurderer()
      const res = await client.post('/subfield-page/load-subfield-page')
        .set('Authorization', lb4Token)
        .send(GvLoadSubfieldPageReqMock.manifSingletonHasShortTitleMurderer)
        .expect(200);
      expect(res.body).to.containDeep(GvPaginationObjectMock.manifSingletonHasShortTitleMurderer);
    });
    it('should return subfield page for shipVoyageHasTimeSpan', async () => {
      await SubfieldHelper.shipVoyageHasTimeSpan()
      const res = await client.post('/subfield-page/load-subfield-page')
        .set('Authorization', lb4Token)
        .send(GvLoadSubfieldPageReqMock.shipVoyageHasTimeSpan)
        .expect(200);
      expect(res.body).to.containDeep(GvPaginationObjectMock.shipVoyageHasTimeSpan);
    });
    it('should return subfield page for personHasAppeTeEn', async () => {
      await SubfieldHelper.personHasAppeTeEn()
      await validateAgainstSchema(GvLoadSubfieldPageReqMock.person1HasAppeTeEn, GvFieldPageReq,server)
      const res = await client.post('/subfield-page/load-subfield-page')
        .set('Authorization', lb4Token)
        .send(GvLoadSubfieldPageReqMock.person1HasAppeTeEn)
        .expect(200);
      expect(res.body).to.containDeep(GvPaginationObjectMock.personHasAppeTeEn);
    });

  });

});
