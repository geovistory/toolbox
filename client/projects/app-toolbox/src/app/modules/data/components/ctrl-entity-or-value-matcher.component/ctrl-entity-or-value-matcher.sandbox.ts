import { sandboxOf } from 'angular-playground';
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
import { DataModule } from '../../data.module';
import { CtrlEntityOrValueMatcherComponent } from './ctrl-entity-or-value-matcher.component';

/*****************************************************************************
 * MOCK services
 ****************************************************************************/
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
/*****************************************************************************
 * Sandboxes
 *****************************************************************************/
export default sandboxOf(CtrlEntityOrValueMatcherComponent, {
    declareComponent: false,
    imports: [
        DataModule,
        InitStateModule,
    ],
    providers: [
    ]
})
    .add('CtrlEntityOrValueMatcherComponent', {
        context: {
            schemaObjects: initialSchemaObects,
        },
        template: `
    <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>
    entity:
    <div style="display:flex;flex-direction:row;justify-content:center">
        <gv-default-value-entity [pkClass]="21"></gv-default-value-entity>
    </div>
    appellation:
    <div style="display:flex;flex-direction:row;justify-content:center">
        <gv-default-value-entity [pkClass]="40"></gv-default-value-entity>
    </div>
    place:
    <div style="display:flex;flex-direction:row;justify-content:center">
        <gv-default-value-entity [pkClass]="51"></gv-default-value-entity>
    </div>
    dimension:
    <div style="display:flex;flex-direction:row;justify-content:center">
        <gv-default-value-entity [pkClass]="52"></gv-default-value-entity>
    </div>
    lang string:
    <div style="display:flex;flex-direction:row;justify-content:center">
        <gv-default-value-entity [pkClass]="657"></gv-default-value-entity>
    </div>
    language:
    <div style="display:flex;flex-direction:row;justify-content:center">
        <gv-default-value-entity [pkClass]="54"></gv-default-value-entity>
    </div>
    timeprimitive:
    <div style="display:flex;flex-direction:row;justify-content:center">
        <gv-default-value-entity [pkClass]="335"></gv-default-value-entity>
    </div>
    `
    })
