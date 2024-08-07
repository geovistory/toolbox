import {Client, expect} from '@loopback/testlab';
import {GeovistoryApplication} from '../../../../application';
import {GvPaginationObject} from '../../../../models';
import {
  GvFieldPageReqMock,
  modifiedScope,
} from '../../../helpers/data/api-requests/GvFieldPageReq';
import {GvPaginationObjectMock} from '../../../helpers/data/api-responses/GvPaginationObjectMock';
import {InfResourceMock} from '../../../helpers/data/gvDB/InfResourceMock';
import {ProProjectMock} from '../../../helpers/data/gvDB/ProProjectMock';
import {SubfieldHelper} from '../../../helpers/graphs/subfield-page.helper';
import {setupApplication} from '../../../helpers/gv-server-helpers';
import {cleanDb} from '../../../helpers/meta/clean-db.helper';

describe('SubfieldPageController', () => {
  let server: GeovistoryApplication;
  let client: Client;
  let pkProject: number;
  let lb4Token: string;

  before(async () => {
    ({server, client} = await setupApplication());
  });
  beforeEach(async () => {
    await cleanDb();
    const d = await SubfieldHelper.makeProject1();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    pkProject = d.pk_entity;
    const res = await client
      .post('/login')
      .send({email: 'gaetan.muck@kleiolab.ch', password: 'testtest1'});
    lb4Token = res.body.lb4Token;
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
      await client
        .post('/subfield-page/load-subfield-page')
        .set('Authorization', lb4Token)
        .send([
          {
            ...GvFieldPageReqMock.appeTeEnRefersToName,
            pkProject: -99,
          },
        ])
        .expect(403);
    });

    it('should return field page for appeTeEnRefersToName (targetType: appellation)', async () => {
      await SubfieldHelper.appeTeEnRefersToName();
      const res = await client
        .post('/subfield-page/load-subfield-page')
        .set('Authorization', lb4Token)
        .send([GvFieldPageReqMock.appeTeEnRefersToName])
        .expect(200);
      checkPaginationObject(res.body, GvPaginationObjectMock.appeTeEnHasAppeVt);
    });
    it('should return count 1 even when limit 0', async () => {
      await SubfieldHelper.appeTeEnRefersToName();
      const tmpl = GvFieldPageReqMock.appeTeEnRefersToName;
      const req = {...tmpl, page: {...tmpl.page, limit: 0}};
      const res = await client
        .post('/subfield-page/load-subfield-page')
        .set('Authorization', lb4Token)
        .send([req])
        .expect(200);
      expect((res.body as GvPaginationObject).subfieldPages[0].count).to.equal(
        1,
      );
    });
    it('should return empty page', async () => {
      // await SubfieldHelper.appeTeEnRefersToName() We don't seed data!
      const res = await client
        .post('/subfield-page/load-subfield-page')
        .set('Authorization', lb4Token)
        .send([GvFieldPageReqMock.appeTeEnRefersToName])
        .expect(200);
      expect(res.body).to.containDeep(
        GvPaginationObjectMock.appeTeEnHasAppeVtEmpty,
      );
    });

    it('should return field page for appeTeEnUsedInLanguage (targetType: language)', async () => {
      await SubfieldHelper.appeTeEnUsedInLanguage();
      const res = await client
        .post('/subfield-page/load-subfield-page')
        .set('Authorization', lb4Token)
        .send([GvFieldPageReqMock.appeTeEnUsedInLanguage])
        .expect(200);
      checkPaginationObject(
        res.body,
        GvPaginationObjectMock.appeTeEnUsedInLanguage,
      );
    });

    it('should return 4 field pages for 4 requests', async () => {
      await SubfieldHelper.definitionHasValueVersions();
      const res = await client
        .post('/subfield-page/load-subfield-page')
        .set('Authorization', lb4Token)
        .send([
          GvFieldPageReqMock.definitionHasValueVersion,
          modifiedScope(GvFieldPageReqMock.definitionHasValueVersion, {
            notInProject: ProProjectMock.PROJECT_1.pk_entity,
          }),
          modifiedScope(GvFieldPageReqMock.definitionHasValueVersion, {
            inRepo: true,
          }),
          modifiedScope(GvFieldPageReqMock.definitionHasValueVersion, {
            noContraint: true,
          }),
        ])
        .expect(200);
      const pages: GvPaginationObject = res.body;
      expect(pages.subfieldPages.length).equal(4);
      const inRepo = pages.subfieldPages.find(p => p.page.scope.inRepo);
      expect(inRepo?.count).equal(1);
      const noContraint = pages.subfieldPages.find(
        p => p.page.scope.noContraint,
      );
      expect(noContraint?.count).equal(2);
    });
    it('should return field page for appeTeEnIsAppeOfPerson (targetType: entityPreview)', async () => {
      await SubfieldHelper.appeTeEnIsAppeOfPerson();
      const res = await client
        .post('/subfield-page/load-subfield-page')
        .set('Authorization', lb4Token)
        .send([GvFieldPageReqMock.appeTeEnIsAppeOfPerson])
        .expect(200);
      checkPaginationObject(
        res.body,
        GvPaginationObjectMock.appeTeEnIsAppeOfPerson,
      );
    });
    it('should return field page for madridsPresenceWasAtPlace (targetType: place)', async () => {
      await SubfieldHelper.madridsPresenceWasAtPlace();
      const res = await client
        .post('/subfield-page/load-subfield-page')
        .set('Authorization', lb4Token)
        .send([GvFieldPageReqMock.madridsPresenceWasAtPlace])
        .expect(200);
      checkPaginationObject(
        res.body,
        GvPaginationObjectMock.madridsPresenceWasAtPlace,
      );
    });
    it('should return field page for journeyHasDuration (targetType: dimension)', async () => {
      await SubfieldHelper.journeyHasDuration();
      const res = await client
        .post('/subfield-page/load-subfield-page')
        .set('Authorization', lb4Token)
        .send([GvFieldPageReqMock.journyeHasDuration])
        .expect(200);
      checkPaginationObject(
        res.body,
        GvPaginationObjectMock.journeyHasDuration,
      );
    });
    it('should return field page for manifSingletonHasShortTitleMurderer', async () => {
      await SubfieldHelper.manifSingletonHasShortTitleMurderer();
      const res = await client
        .post('/subfield-page/load-subfield-page')
        .set('Authorization', lb4Token)
        .send([GvFieldPageReqMock.manifSingletonHasShortTitleMurderer])
        .expect(200);
      checkPaginationObject(
        res.body,
        GvPaginationObjectMock.manifSingletonHasShortTitleMurderer,
      );
    });
    it('should return field page for shipVoyageAtSomeTimeWithin (targetType: timePrimirive)', async () => {
      await SubfieldHelper.shipVoyageAtSomeTimeWithin();
      const res = await client
        .post('/subfield-page/load-subfield-page')
        .set('Authorization', lb4Token)
        .send([GvFieldPageReqMock.shipVoyageAtSomeTimeWithin])
        .expect(200);
      expect(res.body).to.containDeep(
        GvPaginationObjectMock.shipVoyageAtSomeTimeWithin,
      );
    });

    it('should return field page for personHasAppeTeEn (targetType: nestedResource)', async () => {
      await SubfieldHelper.personHasAppeTeEn();
      const res = await client
        .post('/subfield-page/load-subfield-page')
        .set('Authorization', lb4Token)
        .send([GvFieldPageReqMock.person1HasAppeTeEn])
        .expect(200);
      expect(res.body).to.containDeep(GvPaginationObjectMock.personHasAppeTeEn);
    });

    it('should return field pages for personHasTwoAppeTeEn (targetType: nestedResource)', async () => {
      await SubfieldHelper.personHasTwoAppeTeEn();
      const res = await client
        .post('/subfield-page/load-subfield-page')
        .set('Authorization', lb4Token)
        .send([GvFieldPageReqMock.person1HasAppeTeEn])
        .expect(200);
      expect((res.body as GvPaginationObject).subfieldPages.length).to.equal(3);

      expect((res.body as GvPaginationObject).subfieldPages[0].count).to.equal(
        GvPaginationObjectMock.personHasTwoAppeTeEn.subfieldPages[0].count,
      );

      for (const fkSource of [
        InfResourceMock.PERSON_1.pk_entity,
        InfResourceMock.NAMING_1.pk_entity,
        InfResourceMock.NAMING_2.pk_entity,
      ]) {
        const result = (res.body as GvPaginationObject).subfieldPages.find(
          s => s.page.source.fkInfo === fkSource,
        );
        const expected =
          GvPaginationObjectMock.personHasTwoAppeTeEn.subfieldPages.find(
            s => s.page.source.fkInfo === fkSource,
          );
        expect(result?.count).to.deepEqual(expected?.count);
        expect(result?.page).to.containDeep(expected?.page);
        expect(result?.paginatedStatements).to.containDeep(
          expected?.paginatedStatements,
        );
        expect(result).to.containDeep(expected);
      }
    });

    it('should return field page with a timestamp', async () => {
      await SubfieldHelper.personHasAppeTeEn();
      const res: {body: GvPaginationObject} = await client
        .post('/subfield-page/load-subfield-page')
        .set('Authorization', lb4Token)
        .send([GvFieldPageReqMock.person1HasAppeTeEn])
        .expect(200);
      const d = res.body.subfieldPages[0].validFor?.toString() as string;
      expect(new Date(d) > new Date('1999-01-01')).to.be.true();
    });

    it('should not return statement pointing to entity with disabled toolbox-commnity-visibility', async () => {
      await SubfieldHelper.hasReproduction();
      const res: {body: GvPaginationObject} = await client
        .post('/subfield-page/load-subfield-page')
        .set('Authorization', lb4Token)
        .send([GvFieldPageReqMock.hasReproductionNotInProject])
        .expect(200);
      expect((res.body as GvPaginationObject).subfieldPages[0].count).to.equal(
        1,
      );
      expect(
        (res.body as GvPaginationObject).subfieldPages[0].paginatedStatements[0]
          .target.entity?.resource.community_visibility.toolbox,
      ).to.equal(true);
    });

    // it('should return field page for propertyOfProperty (targetType: languageString)', async () => {
    //   await SubfieldHelper.statementOfStatementHasExactReference()
    //   const res = await client.post('/subfield-page/load-subfield-page')
    //     .set('Authorization', lb4Token)
    //     .send([GvFieldPageReqMock.statementOfStatementHasExactReference])
    //     .expect(200);
    //   checkPaginationObject(res.body, GvPaginationObjectMock.statementOfStatementHasExactReference);

    //   // expect(res.body).to.containDeep(GvPaginationObjectMock.statementOfStatementHasExactReference);
    // });
  });
});
function checkPaginationObject(
  result: GvPaginationObject,
  expected: GvPaginationObject,
) {
  expect(result.subfieldPages[0].count).to.containDeep(
    expected.subfieldPages[0].count,
  );

  expect(result.subfieldPages[0].page).to.containDeep(
    expected.subfieldPages[0].page,
  );

  expect(
    result.subfieldPages[0].paginatedStatements[0].statement,
  ).to.containDeep(expected.subfieldPages[0].paginatedStatements[0].statement);
  expect(result.subfieldPages[0].paginatedStatements[0].projRel).to.containDeep(
    expected.subfieldPages[0].paginatedStatements[0].projRel,
  );

  expect(result.subfieldPages[0].paginatedStatements[0].ordNum).to.containDeep(
    expected.subfieldPages[0].paginatedStatements[0].ordNum,
  );

  expect(
    result.subfieldPages[0].paginatedStatements[0].isOutgoing,
  ).to.containDeep(expected.subfieldPages[0].paginatedStatements[0].isOutgoing);

  expect(result.subfieldPages[0].paginatedStatements[0].target).to.containDeep(
    expected.subfieldPages[0].paginatedStatements[0].target,
  );

  expect(
    result.subfieldPages[0].paginatedStatements[0].targetClass,
  ).to.containDeep(
    expected.subfieldPages[0].paginatedStatements[0].targetClass,
  );

  expect(
    result.subfieldPages[0].paginatedStatements[0].targetLabel,
  ).to.containDeep(
    expected.subfieldPages[0].paginatedStatements[0].targetLabel,
  );
}
