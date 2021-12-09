import { ConfigurationPipesService, DisplayType, SectionName } from '@kleiolab/lib-queries';
import { DfhClass } from '@kleiolab/lib-sdk-lb4/public-api';
import { sandboxOf } from 'angular-playground';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { CommentMenuModule } from 'projects/app-toolbox/src/app/shared/components/comment-menu/comment-menu.module';
import { InitStateModule } from 'projects/app-toolbox/src/app/shared/components/init-state/init-state.module';
import { ProProjectMock } from 'projects/__test__/data/auto-gen/gvDB/ProProjectMock';
import { SysConfigValueMock } from 'projects/__test__/data/auto-gen/gvDB/SysConfigValueMock';
import { PROFILE_12_BIOGRAPHICAL_BA_2021_06_30 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-12-biographical-ba-2021-06-30';
import { PROFILE_16_INTERACTIONS_S_2021_07_10 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-16-interactions-s-2021-07-10';
import { PROFILE_20_PHYSICAL_MAN_MA_2021_07_11 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-20-physical-man-ma-2021-07-11';
import { PROFILE_5_GEOVISTORY_BASI_2021_06_30 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-5-geovistory-basi-2021-06-30';
import { PROFILE_8_MARITIME_HISTOR_2021_07_09 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-8-maritime-histor-2021-07-09';
import { GvSchemaObjectMock } from 'projects/__test__/data/GvSchemaObjectMock';
import { createCrmAsGvPositiveSchema } from 'projects/__test__/helpers/transformers';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { DataModule } from '../../../data.module';
import { FactoidPropertyMappingComponent } from './factoid-property-mapping.component';

/*****************************************************************************
 * MOCK services
 *****************************************************************************/
const initialSchemaObects = [
    createCrmAsGvPositiveSchema({
        ontoMocks: [
            PROFILE_5_GEOVISTORY_BASI_2021_06_30, // add basics profile
            PROFILE_16_INTERACTIONS_S_2021_07_10, // add social interactions profile
            PROFILE_12_BIOGRAPHICAL_BA_2021_06_30, // add biographical profile
            PROFILE_8_MARITIME_HISTOR_2021_07_09, // add maritime profile
            PROFILE_20_PHYSICAL_MAN_MA_2021_07_11 // add phyical profile
        ],
        sysConf: SysConfigValueMock.SYS_CONFIC_VALID, // add SYS_CONFIG json
        p: ProProjectMock.PROJECT_1.pk_entity // pk project used to enable above profiles
    }),
    GvSchemaObjectMock.project1, // add project and its default language
]
class ConfigurationPipesServiceMock {
    pipeSection(pkClass: number, displayType: DisplayType, section: SectionName) {
        if (section == 'basic') return of([
            { label: 'property label 2 basic', property: { fkProperty: 2 } }])
        if (section == 'metadata') return of([
            { label: 'property label metadata 1', property: { fkProperty: 1 } },
            { label: 'property label metadata 2', property: { fkProperty: 2 } }])
        if (section == 'specific') return of([
            { label: 'property label specific 1', property: { fkProperty: 1 } },
            { label: 'property label specific 2', property: { fkProperty: 2 } }])
        if (section == 'simpleForm') return of([])
    }
    pipeClassesEnabledByProjectProfiles(): Observable<Partial<DfhClass>[]> {
        return of([
            { pk_class: 21, basic_type: 8 },
            { pk_class: 21, basic_type: 8 },
            { pk_class: 21, basic_type: 8 },
            { pk_class: 21, basic_type: 8 }
        ])
    }
    pipeClassLabel(pkClass: number): Observable<string> {
        let toReturn = '';
        if (pkClass == 21) toReturn = 'Person';
        if (pkClass == 61) toReturn = 'Birth';
        if (pkClass == 51) toReturn = 'Place';
        return of(toReturn)
    }
}
class ActiveProjectServiceMock {
    dfh$ = {
        property$: {
            by_pk_property$: {
                key: (pk) => new BehaviorSubject({
                    21: {
                        identifier_in_namespace: 'P9999'
                    }
                })
            }
        }
    }
    dat$ = {
        column$: {
            by_fk_digital$: {
                key: pkDigital => new BehaviorSubject({
                    11: { pk_entity: 11 },
                    12: { pk_entity: 12 },
                    13: { pk_entity: 13 },
                    14: { pk_entity: 14 },
                    15: { pk_entity: 15 }
                })
            }
        },
        class_column_mapping$: {
            by_fk_column$: {
                key: (pk) => {
                    if (pk == 11) return new BehaviorSubject({ 41: { pk_entity: 41, fk_column: 11, fk_class: 21 } })
                    if (pk == 12) return new BehaviorSubject({ 42: { pk_entity: 42, fk_column: 12, fk_class: 61 } })
                    if (pk == 13) return new BehaviorSubject({ 43: { pk_entity: 43, fk_column: 13, fk_class: 21 } })
                    if (pk == 14) return new BehaviorSubject({ 44: { pk_entity: 44, fk_column: 14, fk_class: 51 } })
                    return new BehaviorSubject({})
                }
            }
        },
        text_property$: {
            by_fk_entity__fk_system_type$: {
                key: (pk) => {
                    if (pk == '41_3295') return new BehaviorSubject({ 51: { pk_entity: 51, string: 'Person\'s name' } })
                    if (pk == '42_3295') return new BehaviorSubject({ 52: { pk_entity: 52, string: 'His birth' } })
                    if (pk == '43_3295') return new BehaviorSubject({ 53: { pk_entity: 53, string: 'His mother' } })
                    if (pk == '44_3295') return new BehaviorSubject({ 53: { pk_entity: 53, string: 'Place of birth' } })
                    return new BehaviorSubject({})
                }
            }
        }
    }
}
/*****************************************************************************
 * Sandboxes
 *****************************************************************************/
export default sandboxOf(FactoidPropertyMappingComponent, {
    declareComponent: false,
    imports: [
        CommentMenuModule,
        DataModule,
        InitStateModule,
    ],
    providers: [
        { provide: ConfigurationPipesService, useClass: ConfigurationPipesServiceMock },
        { provide: ActiveProjectService, useClass: ActiveProjectServiceMock }
    ]
})
    .add('FactoidPropertyMappingComponent', {
        context: {
            pkTable: 1000,
            pkClass: 21,
            schemaObjects: initialSchemaObects,
        },
        template: `
        <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>
        <div style="display:flex; flex-direction:row; justify-content:center">
            <gv-factoid-property-mapping [pkClass]="pkClass" [pkTable]="pkTable"></gv-factoid-property-mapping>
        <div>
    `
    })
