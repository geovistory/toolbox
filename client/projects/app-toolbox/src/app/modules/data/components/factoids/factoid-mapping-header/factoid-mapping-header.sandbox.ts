import { ConfigurationPipesService } from '@kleiolab/lib-queries';
import { DfhClass } from '@kleiolab/lib-sdk-lb4/public-api';
import { sandboxOf } from 'angular-playground';
import { ClassDropdownModule } from 'projects/app-toolbox/src/app/shared/components/class-dropdown/class-dropdown.module';
import { CommentMenuModule } from 'projects/app-toolbox/src/app/shared/components/comment-menu/comment-menu.module';
import { InitStateModule } from 'projects/app-toolbox/src/app/shared/components/init-state/init-state.module';
import { ProProjectMock } from 'projects/__test__/data/auto-gen/gvDB/ProProjectMock';
import { SysConfigValueMock } from 'projects/__test__/data/auto-gen/gvDB/SysConfigValueMock';
import { PROFILE_12_BIOGRAPHICAL_BA_2022_01_14 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-12-biographical-ba-2022-01-14';
import { PROFILE_16_INTERACTIONS_S_2022_01_14 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-16-interactions-s-2022-01-14';
import { PROFILE_20_PHYSICAL_MAN_MA_2022_01_14 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-20-physical-man-ma-2022-01-14';
import { PROFILE_5_GEOVISTORY_BASI_2022_01_14 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-5-geovistory-basi-2022-01-14';
import { PROFILE_8_MARITIME_HISTOR_2022_01_14 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-8-maritime-histor-2022-01-14';
import { GvSchemaObjectMock } from 'projects/__test__/data/GvSchemaObjectMock';
import { createCrmAsGvPositiveSchema } from 'projects/__test__/helpers/transformers';
import { Observable, of } from 'rxjs';
import { DataModule } from '../../../data.module';
import { FactoidMappingHeaderComponent } from './factoid-mapping-header.component';


/*****************************************************************************
 * MOCK services
 *****************************************************************************/
const initialSchemaObects = [
    createCrmAsGvPositiveSchema({
        ontoMocks: [
            PROFILE_5_GEOVISTORY_BASI_2022_01_14, // add basics profile
            PROFILE_16_INTERACTIONS_S_2022_01_14, // add social interactions profile
            PROFILE_12_BIOGRAPHICAL_BA_2022_01_14, // add biographical profile
            PROFILE_8_MARITIME_HISTOR_2022_01_14, // add maritime profile
            PROFILE_20_PHYSICAL_MAN_MA_2022_01_14 // add phyical profile
        ],
        sysConf: SysConfigValueMock.SYS_CONFIC_VALID, // add SYS_CONFIG json
        p: ProProjectMock.PROJECT_1.pk_entity // pk project used to enable above profiles
    }),
    GvSchemaObjectMock.project1, // add project and its default language
]
class ConfigurationPipesServiceMock {
    pipeClassesEnabledByProjectProfiles(): Observable<Partial<DfhClass>[]> {
        return of([
            { pk_class: 21, basic_type: 8 },
            { pk_class: 61 },
            { pk_class: 63 },
            { pk_class: 566 }
        ])
    }
    pipeClassLabel(pkClass: number): Observable<string> {
        let toReturn = '';
        if (pkClass == 21) toReturn = 'Person';
        if (pkClass == 61) toReturn = 'Birth';
        if (pkClass == 63) toReturn = 'Death';
        if (pkClass == 566) toReturn = 'Gender';
        return of(toReturn)
    }
}
/*****************************************************************************
 * Sandboxes
 *****************************************************************************/
export default sandboxOf(FactoidMappingHeaderComponent, {
    declareComponent: false,
    imports: [
        InitStateModule,
        DataModule,
        CommentMenuModule,
        ClassDropdownModule,
    ],
    providers: [
        { provide: ConfigurationPipesService, useClass: ConfigurationPipesServiceMock }
    ]
})
    .add('FactoidMappingHeaderComponent', {
        context: {
            pkTable: 11,
            pkClass: 21,
            schemaObjects: initialSchemaObects,
            fm: {
                pkClass: 21,
                pkDigital: 11,
                title: "TITLE TEST"
            },
        },
        template: `
        <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>

        <span style="width:100%; display:flex; flex-direction:row; justify-content:center;">new one</span>
        <div style="display:flex; flex-direction:row; justify-content:center; width: 100%">
            <gv-factoid-mapping-header style="width:800px" 
                    [listNumber]="1"
            ></gv-factoid-mapping-header>
        </div>

        <br/>
        <span style="width:100%; display:flex; flex-direction:row; justify-content:center;">existing</span>
        <div style="display:flex; flex-direction:row; justify-content:center; width: 100%">
            <gv-factoid-mapping-header style="width:800px" 
                    [listNumber]="2"
                    [fm]="fm"
            ></gv-factoid-mapping-header>
        </div>
    `
    })
