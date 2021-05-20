import {Client, expect} from '@loopback/testlab';
import {GvPaginationObject} from '../../../../models';
import {GeovistoryServer} from '../../../../server';
import {GvFieldPageReqMock} from '../../../helpers/data/api-requests/GvFieldPageReq';
import {GvPaginationObjectMock} from '../../../helpers/data/api-responses/GvPaginationObjectMock';
import {SubfieldHelper} from '../../../helpers/graphs/subfield-page.helper';
import {setupApplication} from '../../../helpers/gv-server-helpers';
import {cleanDb} from '../../../helpers/meta/clean-db.helper';

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
          ...GvFieldPageReqMock.appeTeEnRefersToName,
          pkProject: -99
        })
        .expect(403);
    });
    it('should return field page for appeTeEnRefersToName (targetType: appellation)', async () => {
      await SubfieldHelper.appeTeEnRefersToName()
      const res = await client.post('/subfield-page/load-subfield-page')
        .set('Authorization', lb4Token)
        .send(GvFieldPageReqMock.appeTeEnRefersToName)
        .expect(200);
      expect(res.body).to.containDeep(GvPaginationObjectMock.appeTeEnHasAppeVt);
    });
    it('should return field page for appeTeEnUsedInLanguage (targetType: language)', async () => {
      await SubfieldHelper.appeTeEnUsedInLanguage()
      const res = await client.post('/subfield-page/load-subfield-page')
        .set('Authorization', lb4Token)
        .send(GvFieldPageReqMock.appeTeEnUsedInLanguage)
        .expect(200);
      expect(res.body).to.containDeep(GvPaginationObjectMock.appeTeEnUsedInLanguage);
    });
    it('should return field page for appeTeEnIsAppeOfPerson (targetType: entityPreview)', async () => {
      await SubfieldHelper.appeTeEnIsAppeOfPerson()
      const res = await client.post('/subfield-page/load-subfield-page')
        .set('Authorization', lb4Token)
        .send(GvFieldPageReqMock.appeTeEnIsAppeOfPerson)
        .expect(200);
      expect(res.body).to.containDeep(GvPaginationObjectMock.appeTeEnIsAppeOfPerson);
    });
    it('should return field page for madridsPresenceWasAtPlace (targetType: place)', async () => {
      await SubfieldHelper.madridsPresenceWasAtPlace()
      const res = await client.post('/subfield-page/load-subfield-page')
        .set('Authorization', lb4Token)
        .send(GvFieldPageReqMock.madridsPresenceWasAtPlace)
        .expect(200);
      expect(res.body).to.containDeep(GvPaginationObjectMock.madridsPresenceWasAtPlace);
    });
    it('should return field page for journeyHasDuration (targetType: dimension)', async () => {
      await SubfieldHelper.journeyHasDuration()
      const res = await client.post('/subfield-page/load-subfield-page')
        .set('Authorization', lb4Token)
        .send(GvFieldPageReqMock.journyeHasDuration)
        .expect(200);
      expect(res.body).to.containDeep(GvPaginationObjectMock.journeyHasDuration);
    });
    it('should return field page for manifSingletonHasShortTitleMurderer', async () => {
      await SubfieldHelper.manifSingletonHasShortTitleMurderer()
      const res = await client.post('/subfield-page/load-subfield-page')
        .set('Authorization', lb4Token)
        .send(GvFieldPageReqMock.manifSingletonHasShortTitleMurderer)
        .expect(200);
      expect(res.body).to.containDeep(GvPaginationObjectMock.manifSingletonHasShortTitleMurderer);
    });
    it('should return field page for shipVoyageHasTimeSpan (targetType: timeSpan)', async () => {
      await SubfieldHelper.shipVoyageHasTimeSpan()
      const res = await client.post('/subfield-page/load-subfield-page')
        .set('Authorization', lb4Token)
        .send(GvFieldPageReqMock.shipVoyageHasTimeSpan)
        .expect(200);
      expect(res.body).to.containDeep(GvPaginationObjectMock.shipVoyageHasTimeSpan);
    });
    it('should return field page for personHasAppeTeEn (targetType: temporalEntity)', async () => {
      await SubfieldHelper.personHasAppeTeEn()
      const res = await client.post('/subfield-page/load-subfield-page')
        .set('Authorization', lb4Token)
        .send(GvFieldPageReqMock.person1HasAppeTeEn)
        .expect(200);
      expect(res.body).to.containDeep(GvPaginationObjectMock.personHasAppeTeEn);
    });

    it('should return field page with a timestamp', async () => {
      await SubfieldHelper.personHasAppeTeEn()
      const res: {body: GvPaginationObject} = await client.post('/subfield-page/load-subfield-page')
        .set('Authorization', lb4Token)
        .send(GvFieldPageReqMock.person1HasAppeTeEn)
        .expect(200);
      const d = res.body.subfieldPages[0].validFor?.toString() as string
      expect(new Date(d) > new Date('1999-01-01')).to.be.true();
    });

  });

});
