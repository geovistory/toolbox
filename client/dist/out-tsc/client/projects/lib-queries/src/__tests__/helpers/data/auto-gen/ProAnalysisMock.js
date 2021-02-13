import { DfhApiClassMock } from './DfhApiClassMock';
import { ProProjectMock } from './ProProjectMock';
import { SysSystemTypeMock } from './SysSystemTypeMock';
/**
 * pk_entity prefix: 800
 */
export class ProAnalysisMock {
}
ProAnalysisMock.TABLE_GEO_PLACES = ({
    pk_entity: 8001,
    name: 'My Geographical Places on a table',
    fk_project: ProProjectMock.PROJECT_1.pk_entity,
    fk_analysis_type: SysSystemTypeMock.ANALYSIS_TYPE_TABLE.pk_entity,
    analysis_definition: {
        queryDefinition: {
            columns: [
                {
                    id: 'col1',
                    ofRootTable: true,
                    defaultType: 'entity_label',
                    label: 'Geo-Places',
                }
            ],
            filter: {
                children: [],
                data: {
                    classes: [
                        DfhApiClassMock.EN_363_GEO_PLACE.dfh_pk_class
                    ]
                }
            }
        }
    }
});
ProAnalysisMock.MAP_GEO_PLACES = ({
    pk_entity: 8002,
    name: 'My Geographical Places',
    fk_project: ProProjectMock.PROJECT_1.pk_entity,
    fk_analysis_type: SysSystemTypeMock.ANALYSIS_TYPE_MAP.pk_entity,
    analysis_definition: {
        queryDefinition: {
            columns: [
                {
                    id: 'col1',
                    ofRootTable: true,
                    defaultType: 'entity_label',
                    label: 'Geo-Places',
                }
            ],
            filter: {
                children: [],
                data: {
                    classes: [
                        DfhApiClassMock.EN_363_GEO_PLACE.dfh_pk_class
                    ]
                }
            }
        }
    }
});
ProAnalysisMock.TIME_BIRTHS = ({
    pk_entity: 8003,
    name: 'My births on a timeline',
    fk_project: ProProjectMock.PROJECT_1.pk_entity,
    fk_analysis_type: SysSystemTypeMock.ANALYSIS_TYPE_TIME_CHART.pk_entity,
    analysis_definition: {
        lines: [{
                visualizationDefinition: {
                    label: 'Births'
                },
                queryDefinition: {
                    columns: [
                        {
                            id: 'col_0',
                            ofRootTable: true,
                            preventGroupBy: true,
                            defaultType: 'temporal_distribution'
                        }
                    ],
                    filter: {
                        children: [],
                        data: {
                            classes: [
                                DfhApiClassMock.EN_61_BIRTH.dfh_pk_class
                            ]
                        }
                    }
                }
            }]
    }
});
//# sourceMappingURL=ProAnalysisMock.js.map