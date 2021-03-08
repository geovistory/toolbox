/* eslint-disable @typescript-eslint/camelcase */
import {Client, expect} from '@loopback/testlab';
import {clone, omit} from 'ramda';
import {ColDefDefaultType, QueryPathSegmentType, TableExportFileType} from '../../../models';
import {AnalysisMapResponse} from '../../../models/analysis/analysis-map-response.model';
import {AnalysisTableExportResponse} from '../../../models/analysis/analysis-table-export-response.model';
import {AnalysisTableRequest} from '../../../models/analysis/analysis-table-request.model';
import {AnalysisTableCell, AnalysisTableResponse} from '../../../models/analysis/analysis-table-response.model';
import {AnalysisTimeChartRequest} from '../../../models/analysis/analysis-time-chart-request.model';
import {AnalysisTimeChartResponse} from '../../../models/analysis/analysis-time-chart-response.model';
import {GvSchemaObject} from '../../../models/gv-schema-object.model';
import {GeovistoryServer} from '../../../server';
import {createProAnalysis, createProAnalysisRepo} from '../../helpers/atomic/pro-analysis.helper';
import {DfhApiClassMock} from '../../helpers/data/gvDB/DfhApiClassMock';
import {DfhApiPropertyMock} from '../../helpers/data/gvDB/DfhApiPropertyMock';
import {ProAnalysisMock} from '../../helpers/data/gvDB/ProAnalysisMock';
import {WarEntityPreviewMock} from '../../helpers/data/gvDB/WarEntityPreviewMock';
import {WarStatementMock} from '../../helpers/data/gvDB/WarStatementMock';
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
            delete corruptAnalysisDefinition?.queryDefinition?.filter;
            const req = {
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
            const req = {
                fkProject: pkProject,
                analysisDefinition: queryGeoPlaces.analysis_definition
            }
            const res = await client.post('/analysis/table-run')
                .set('Authorization', lb4Token)
                .send(req)
            const result = res.body
            const expected: AnalysisTableResponse = {
                full_count: 2,
                rows: [
                    {"col1": {entityLabel: 'Basel'}},
                    {"col1": {entityLabel: 'Zürich'}},
                ]
            }

            await validateAgainstSchema(result, AnalysisTableResponse, server)
            expect(result).deepEqual(expected)
        })

        it('should respond with a table with col for geo entity labels and one for birth entity labels', async () => {
            const req: AnalysisTableRequest = {
                fkProject: pkProject,
                analysisDefinition: {
                    queryDefinition: {
                        filter: {
                            data: {
                                classes: [
                                    DfhApiClassMock.EN_363_GEO_PLACE.dfh_pk_class
                                ]
                            },
                            children: []
                        },
                        columns: [
                            {
                                id: 'col1',
                                ofRootTable: true,
                                defaultType: ColDefDefaultType.entity_label,
                                label: 'Geo-Places',
                            },
                            {
                                id: 'col2',
                                label: 'Births',
                                queryPath: [
                                    {
                                        type: QueryPathSegmentType.properties,
                                        data: {
                                            ingoingProperties: [
                                                DfhApiPropertyMock.EN_7_BIRTH_TOOK_PLACE_IN_GEO_PLACE.dfh_pk_property
                                            ]
                                        },
                                    },
                                    {
                                        type: QueryPathSegmentType.classes,
                                        data: {
                                            classes: [
                                                DfhApiClassMock.EN_61_BIRTH.dfh_pk_class
                                            ],
                                        },
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
            const res = await client.post('/analysis/table-run')
                .set('Authorization', lb4Token)
                .send(req)
            const result: AnalysisTableResponse = res.body

            await validateAgainstSchema(result, AnalysisTableResponse, server)
            const expected = {
                full_count: 2,
                rows: [
                    {
                        "col1": {entityLabel: 'Basel'},
                        "col2": {entities: [WarEntityPreviewMock.BIRTH_OEKOLOMBAD]}

                    },
                    {
                        "col1": {entityLabel: 'Zürich'},
                        "col2": {entities: [WarEntityPreviewMock.BIRTH_ZWINGLI]}
                    },
                ]
            }
            expect(result).containDeep(expected)
        })


        it('should return statement object info value timePrimitive', async function () {
            const req: AnalysisTableRequest = {
                fkProject: pkProject,
                analysisDefinition: {
                    queryDefinition: {
                        filter: {
                            data: {
                                classes: [
                                    DfhApiClassMock.EN_61_BIRTH.dfh_pk_class
                                ],
                            },
                            children: [
                                // {
                                //     data: {
                                //         operator: Operator.ENTITY_LABEL_CONTAINS,
                                //         searchTerm: 'Zwingli'
                                //     }
                                // }
                            ]
                        },
                        columns: [
                            {
                                id: 'col1',
                                label: 'At some time within time primitives',
                                queryPath: [
                                    {
                                        type: QueryPathSegmentType.properties,
                                        data: {
                                            outgoingProperties: [
                                                DfhApiPropertyMock.EN_72_AT_SOME_TIME_WITHIN.dfh_pk_property
                                            ]
                                        },
                                    },
                                    {
                                        type: QueryPathSegmentType.classes,
                                        data: {
                                            classes: [
                                                DfhApiClassMock.EN_335_TIME_PRIMITIVE.dfh_pk_class
                                            ],
                                        },
                                    }
                                ]
                            }
                        ]
                    }
                }
            }



            const res = await client.post('/analysis/table-run')
                .set('Authorization', lb4Token)
                .send(req)
            const result: AnalysisTableResponse = res.body
            await validateAgainstSchema(result.rows?.[0]?.['col1'], AnalysisTableCell, server)


            await validateAgainstSchema(result, AnalysisTableResponse, server)
            const expected: AnalysisTableResponse = {
                full_count: 2,
                rows: [
                    {
                        "col1": {values: []}

                    },
                    {
                        "col1": {
                            values: [
                                {
                                    pkStatement: WarStatementMock.BIRTH_OF_ZWINGLI_AT_SOME_TIME_WITHIN.pk_entity ?? -1,
                                    fkSubjectInfo: WarStatementMock.BIRTH_OF_ZWINGLI_AT_SOME_TIME_WITHIN.fk_subject_info ?? -1,
                                    fkObjectInfo: WarStatementMock.BIRTH_OF_ZWINGLI_AT_SOME_TIME_WITHIN.fk_object_info ?? -1,
                                    value: WarStatementMock.BIRTH_OF_ZWINGLI_AT_SOME_TIME_WITHIN.object_info_value ?? {}
                                }
                            ]
                        }
                    },
                ]
            }
            expect(result).containDeep(expected)
        })
        it('should return statement object info value geometry', async function () {

        })
        it('should return statement object info value language', async function () {

        })
        it('should return statement object info value string (appellation)', async function () {

        })
        it('should return statement object info value langString', async function () {

        })
        it('should return statement object info value dimension', async function () {

        })

    });




    describe('POST /analysis/table-export', () => {

        it('should reject the request because inputs are wrong', async () => {
            const queryGeoPlaces = ProAnalysisMock.TABLE_GEO_PLACES;
            const corruptAnalysisDefinition = clone(queryGeoPlaces.analysis_definition);
            delete corruptAnalysisDefinition?.queryDefinition?.filter;
            const req = {
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
            const req = {
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
            delete corruptAnalysisDefinition?.queryDefinition?.filter;
            const req = {
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
            const req = {
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
            delete corruptAnalysisDefinition?.lines?.[0]?.queryDefinition.filter;
            const req: AnalysisTimeChartRequest = {
                fkProject: pkProject,
                lines: corruptAnalysisDefinition?.lines ?? []
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
                lines: proAnalysis.analysis_definition?.lines ?? []
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


