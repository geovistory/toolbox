import {Client, expect} from '@loopback/testlab';
import {clone} from 'ramda';
import {TableOutput, MapAndTimeContOutput} from '../../../lb3/common';
import {AnalysisTableExportRequest, TableExportFileType} from '../../../models';
import {AnalysisTableExportResponse} from '../../../models/analysis/analysis-table-export-response.model';
import {AnalysisTableRequest} from '../../../models/analysis/analysis-table-request.model';
import {AnalysisTableResponse} from '../../../models/analysis/analysis-table-response.model';
import {GeovistoryServer} from '../../../server';
import {ProAnalysisMock} from '../../helpers/data/gvDB/ProAnalysisMock';
import {forAnalysis} from '../../helpers/graphs/analysis.helper';
import {setupApplication, validateAgainstSchema} from '../../helpers/gv-server-helpers';
import {cleanDb} from '../../helpers/meta/clean-db.helper';
import {AnalysisMapRequest} from '../../../models/analysis/analysis-map-request.model';
import {AnalysisMapResponse} from '../../../models/analysis/analysis-map-response.model';

describe('AnaylsisController', () => {
    let server: GeovistoryServer;
    let client: Client;
    let pkProject: number
    let lb3Token: string;
    let lb4Token: string;

    before(async () => {
        ({server, client} = await setupApplication());

        await cleanDb();
        const d = await forAnalysis()
        pkProject = d.pkProject;
        const res = await client.post('/login')
            .send({email: "gaetan.muck@kleiolab.ch", password: "testtest1"});
        lb3Token = res.body.lb3Token
        lb4Token = res.body.lb4Token
    });
    after(async () => {
        try {
            await server.stop();
        } catch (e) {
            console.log(e);
        }
    });

    describe('POST /lb3-api/ProAnalyses/run (table)', () => {

        it('should reject the request because inputs are wrong', async () => {
            const queryGeoPlaces = ProAnalysisMock.TABLE_GEO_PLACES;
            const corruptAnalysisDefinition = clone(queryGeoPlaces.analysis_definition);
            delete corruptAnalysisDefinition.queryDefinition?.filter;
            const res = await client.post('/lb3-api/ProAnalyses/run')
                .set('Authorization', lb3Token)
                .query({pkProject, analysisType: queryGeoPlaces.fk_analysis_type})
                .send(corruptAnalysisDefinition)
            expect(res.status).equal(500)
        })

        it('should respond with a table of one column for entity labels', async () => {
            const queryGeoPlaces = ProAnalysisMock.TABLE_GEO_PLACES;
            const res = await client.post('/lb3-api/ProAnalyses/run')
                .set('Authorization', lb3Token)
                .query({pkProject, analysisType: queryGeoPlaces.fk_analysis_type})
                .send(queryGeoPlaces.analysis_definition)
            const result: TableOutput = res.body
            expect(result.full_count).equal(2)
            // await validateSchema(result, server, ProAnalysis)
            expect(result.rows).deepEqual([
                {"col1": 'Basel'},
                {"col1": 'Zürich'},
            ])
        })
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


    describe('POST /lb3-api/ProAnalyses/run-and-export (table)', () => {

        it('should reject the request because inputs are wrong', async () => {
            const queryGeoPlaces = ProAnalysisMock.TABLE_GEO_PLACES;
            const corruptAnalysisDefinition = clone(queryGeoPlaces.analysis_definition);
            delete corruptAnalysisDefinition.queryDefinition?.filter;
            const res = await client.post('/lb3-api/ProAnalyses/run-and-export')
                .set('Authorization', lb3Token)
                .query({
                    pkProject,
                    analysisType: queryGeoPlaces.fk_analysis_type,
                    fileType: 'json'
                })
                .send(corruptAnalysisDefinition)
            expect(res.status).equal(500)
        })

        it('should respond with a table of one column for entity labels', async () => {
            const queryGeoPlaces = ProAnalysisMock.TABLE_GEO_PLACES;
            const res = await client.post('/lb3-api/ProAnalyses/run-and-export')
                .set('Authorization', lb3Token)
                .query({
                    pkProject,
                    analysisType: queryGeoPlaces.fk_analysis_type,
                    fileType: 'json'
                })
                .send(queryGeoPlaces.analysis_definition)
            const result: string = res.body
            expect(result.length).to.be.greaterThan(10)
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

    describe('POST /lb3-api/ProAnalyses/run (map)', () => {

        it('should reject the request because inputs are wrong', async () => {
            const queryGeoPlaces = ProAnalysisMock.MAP_GEO_PLACES;
            const corruptAnalysisDefinition = clone(queryGeoPlaces.analysis_definition);
            delete corruptAnalysisDefinition.queryDefinition?.filter;
            const res = await client.post('/lb3-api/ProAnalyses/run')
                .set('Authorization', lb3Token)
                .query({pkProject, analysisType: queryGeoPlaces.fk_analysis_type})
                .send(corruptAnalysisDefinition)
            expect(res.status).equal(500)
        })

        it('should respond with data for a map visualization', async () => {
            const queryGeoPlaces = ProAnalysisMock.MAP_GEO_PLACES;
            const res = await client.post('/lb3-api/ProAnalyses/run')
                .set('Authorization', lb3Token)
                .query({pkProject, analysisType: queryGeoPlaces.fk_analysis_type})
                .send(queryGeoPlaces.analysis_definition)
            const result: MapAndTimeContOutput = res.body
            expect(result.length).equal(2)

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



});


