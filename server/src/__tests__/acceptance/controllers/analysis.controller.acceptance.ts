/* eslint-disable @typescript-eslint/camelcase */
import {Client, expect} from '@loopback/testlab';
import {clone, omit} from 'ramda';
import {TableOutput} from '../../../lb3/common';
import {AnalysisTableExportRequest, TableExportFileType} from '../../../models';
import {AnalysisMapRequest} from '../../../models/analysis/analysis-map-request.model';
import {AnalysisMapResponse} from '../../../models/analysis/analysis-map-response.model';
import {AnalysisTableExportResponse} from '../../../models/analysis/analysis-table-export-response.model';
import {AnalysisTableRequest} from '../../../models/analysis/analysis-table-request.model';
import {AnalysisTableResponse} from '../../../models/analysis/analysis-table-response.model';
import {AnalysisTimeChartRequest} from '../../../models/analysis/analysis-time-chart-request.model';
import {AnalysisTimeChartResponse} from '../../../models/analysis/analysis-time-chart-response.model';
import {GvSchemaObject} from '../../../models/gv-schema-object.model';
import {GeovistoryServer} from '../../../server';
import {createProAnalysis, createProAnalysisRepo} from '../../helpers/atomic/pro-analysis.helper';
import {ProAnalysisMock} from '../../helpers/data/gvDB/ProAnalysisMock';
import {forAnalysis} from '../../helpers/graphs/analysis.helper';
import {setupApplication, validateAgainstSchema} from '../../helpers/gv-server-helpers';
import {cleanDb} from '../../helpers/meta/clean-db.helper';

describe('AnaylsisController', () => {
    let server: GeovistoryServer;
    let client: Client;
    let pkProject: number
    let lb4Token: string;

    before(async () => {
        ({server, client} = await setupApplication());

        await cleanDb();
        const d = await forAnalysis()
        pkProject = d.pkProject;
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


    describe('POST analysis/table-run', () => {

        it('should reject the request because inputs are wrong', async () => {
            const queryGeoPlaces = ProAnalysisMock.TABLE_GEO_PLACES;
            const corruptAnalysisDefinition = clone(queryGeoPlaces.analysis_definition);
            delete corruptAnalysisDefinition.queryDefinition?.filter;
            const req: AnalysisTableRequest = {
                fkProject: pkProject,
                analysisDefinition: corruptAnalysisDefinition
            }
            const res = await client.post('/analysis/table-run')
                .set('Authorization', lb4Token)
                .send(req)
            expect(res.body.error.code).equal('VALIDATION_FAILED')
        })

        it('should respond with a table of one column for entity labels', async () => {
            const queryGeoPlaces = ProAnalysisMock.TABLE_GEO_PLACES;
            const req: AnalysisTableRequest = {
                fkProject: pkProject,
                analysisDefinition: queryGeoPlaces.analysis_definition
            }
            const res = await client.post('/analysis/table-run')
                .set('Authorization', lb4Token)
                .send(req)
            const result: TableOutput = res.body

            await validateAgainstSchema(result, AnalysisTableResponse, server)
            expect(result.full_count).equal(2)
            expect(result.rows).deepEqual([
                {"col1": 'Basel'},
                {"col1": 'Zürich'},
            ])
        })
    });



    describe('POST /analysis/table-export', () => {

        it('should reject the request because inputs are wrong', async () => {
            const queryGeoPlaces = ProAnalysisMock.TABLE_GEO_PLACES;
            const corruptAnalysisDefinition = clone(queryGeoPlaces.analysis_definition);
            delete corruptAnalysisDefinition.queryDefinition?.filter;
            const req: AnalysisTableExportRequest = {
                fkProject: pkProject,
                analysisDefinition: corruptAnalysisDefinition,
                fileType: TableExportFileType.json
            }
            const res = await client.post('/analysis/table-export')
                .set('Authorization', lb4Token)
                .send(req)
            expect(res.body.error.code).equal('VALIDATION_FAILED')
        })

        it('should respond with a table of one column for entity labels', async () => {
            const queryGeoPlaces = ProAnalysisMock.TABLE_GEO_PLACES;
            const req: AnalysisTableExportRequest = {
                fkProject: pkProject,
                analysisDefinition: queryGeoPlaces.analysis_definition,
                fileType: TableExportFileType.json
            }
            const res = await client.post('/analysis/table-export')
                .set('Authorization', lb4Token)
                .send(req)
            const result: AnalysisTableExportResponse = res.body
            expect(result?.res?.length).to.be.greaterThan(10)
        })
    });

    describe('POST analysis/map-run', () => {

        it('should reject the request because inputs are wrong', async () => {
            const queryGeoPlaces = ProAnalysisMock.MAP_GEO_PLACES;
            const corruptAnalysisDefinition = clone(queryGeoPlaces.analysis_definition);
            delete corruptAnalysisDefinition.queryDefinition?.filter;
            const req: AnalysisMapRequest = {
                fkProject: pkProject,
                analysisDefinition: corruptAnalysisDefinition
            }
            const res = await client.post('/analysis/map-run')
                .set('Authorization', lb4Token)
                .send(req)
            expect(res.body.error.code).equal('VALIDATION_FAILED')
        })

        it('should respond with a table of one column for entity labels', async () => {
            const queryGeoPlaces = ProAnalysisMock.MAP_GEO_PLACES;
            const req: AnalysisMapRequest = {
                fkProject: pkProject,
                analysisDefinition: queryGeoPlaces.analysis_definition
            }
            const res = await client.post('/analysis/map-run')
                .set('Authorization', lb4Token)
                .send(req)
            const result: AnalysisMapResponse = res.body

            await validateAgainstSchema(result, AnalysisMapResponse, server)
            expect(result.geoPlaces.length).equal(2)

        })
    });

    describe('POST analysis/time-chart-run', () => {

        it('should reject the request because inputs are wrong', async () => {
            const proAnalysis = ProAnalysisMock.TIME_BIRTHS;
            const corruptAnalysisDefinition = clone(proAnalysis.analysis_definition);
            delete corruptAnalysisDefinition.lines?.[0]?.queryDefinition.filter;
            const req: AnalysisTimeChartRequest = {
                fkProject: pkProject,
                lines: corruptAnalysisDefinition.lines ?? []
            }
            const res = await client.post('/analysis/time-chart-run')
                .set('Authorization', lb4Token)
                .send(req)
            expect(res.body.error.code).equal('VALIDATION_FAILED')
        })

        it('should respond with data for time chart with one line', async () => {
            const proAnalysis = ProAnalysisMock.TIME_BIRTHS;
            const req: AnalysisTimeChartRequest = {
                fkProject: pkProject,
                lines: proAnalysis.analysis_definition.lines ?? []
            }
            const res = await client.post('/analysis/time-chart-run')
                .set('Authorization', lb4Token)
                .send(req)
            const result: AnalysisTimeChartResponse = res.body

            await validateAgainstSchema(result, AnalysisTimeChartResponse, server)
            expect(result.chartLines.length).equal(1)

        })
    });

    describe('GET /analysis/get-version', () => {

        it('should respond with latest version of ProAnalysis', async () => {


            const res = await client.get('/analysis/get-version')
                .set('Authorization', lb4Token)
                .query({
                    pkProject,
                    pkEntity: ProAnalysisMock.MAP_GEO_PLACES.pk_entity,
                })
                .send()
            const result: GvSchemaObject = res.body
            expect(result.pro?.analysis?.[0].analysis_definition)
                .deepEqual(ProAnalysisMock.MAP_GEO_PLACES.analysis_definition)
            expect(result.pro?.analysis?.[0]?.name).equal('My Places 2')

        })
        it('should respond with latest version 1 of ProAnalysis', async () => {

            const res = await client.get('/analysis/get-version')
                .set('Authorization', lb4Token)
                .query({
                    pkProject,
                    pkEntity: ProAnalysisMock.MAP_GEO_PLACES.pk_entity,
                    version: 1
                })
                .send()
            const result: GvSchemaObject = res.body
            expect(result.pro?.analysis?.[0].analysis_definition)
                .deepEqual(ProAnalysisMock.MAP_GEO_PLACES.analysis_definition)
            expect(result.pro?.analysis?.[0]?.name).equal(ProAnalysisMock.MAP_GEO_PLACES.name)

        })
    });


    describe('GET /analysis/bulk-upsert', () => {

        it('should create two ProAnalyses', async () => {
            const reqBody = [
                omit(['pk_entity'], ProAnalysisMock.TIME_BIRTHS),
                ProAnalysisMock.MAP_GEO_PLACES
            ]

            const res = await client.put('/analysis/bulk-upsert')
                .set('Authorization', lb4Token)
                .query({pkProject})
                .send(reqBody)
            expect(res.status).equal(200)
            const result: GvSchemaObject = res.body
            expect(result.pro?.analysis?.[0]?.fk_last_modifier).not.to.be.undefined()

        })
        it('should reject upserting a ProAnalysis for another project', async () => {
            const proAnalysis = clone(ProAnalysisMock.MAP_GEO_PLACES)
            proAnalysis.fk_project = 99;
            const reqBody = [
                proAnalysis
            ]
            const res = await client.put('/analysis/bulk-upsert')
                .set('Authorization', lb4Token)
                .query({pkProject})
                .send(reqBody)
            expect(res.status).equal(401)

        })

    });

    describe('GET /analysis/bulk-delete', () => {

        it('should delete ProAnalysis', async () => {
            const repo = createProAnalysisRepo()
            await repo.deleteAll()
            await createProAnalysis(ProAnalysisMock.MAP_GEO_PLACES)
            await createProAnalysis(ProAnalysisMock.TIME_BIRTHS)
            const reqBody = [
                ProAnalysisMock.MAP_GEO_PLACES.pk_entity
            ]
            const res = await client.put('/analysis/bulk-delete')
                .set('Authorization', lb4Token)
                .query({pkProject})
                .send(reqBody)
            expect(res.body.count).equal(1)
            const available = await repo.find()
            expect(available.length).to.equal(1)
        })
    });

});


