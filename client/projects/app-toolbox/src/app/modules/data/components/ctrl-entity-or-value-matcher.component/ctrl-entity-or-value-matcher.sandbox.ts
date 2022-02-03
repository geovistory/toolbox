import { Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActiveProjectPipesService } from '@kleiolab/lib-queries';
import { InfLanguage, LanguagesService, WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { sandboxOf } from 'angular-playground';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { InitStateModule } from 'projects/app-toolbox/src/app/shared/components/init-state/init-state.module';
import { DatNamespaceMock } from 'projects/__test__/data/auto-gen/gvDB/DatNamespaceMock';
import { InfLanguageMock } from 'projects/__test__/data/auto-gen/gvDB/InfLanguageMock';
import { ProProjectMock } from 'projects/__test__/data/auto-gen/gvDB/ProProjectMock';
import { SysConfigValueMock } from 'projects/__test__/data/auto-gen/gvDB/SysConfigValueMock';
import { WarEntityPreviewMock } from 'projects/__test__/data/auto-gen/gvDB/WarEntityPreviewMock';
import { PROFILE_12_BIOGRAPHICAL_BA_2022_01_14 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-12-biographical-ba-2022-01-14';
import { PROFILE_16_INTERACTIONS_S_2022_01_14 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-16-interactions-s-2022-01-14';
import { PROFILE_20_PHYSICAL_MAN_MA_2022_01_14 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-20-physical-man-ma-2022-01-14';
import { PROFILE_5_GEOVISTORY_BASI_2022_01_14 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-5-geovistory-basi-2022-01-14';
import { PROFILE_8_MARITIME_HISTOR_2022_01_14 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-8-maritime-histor-2022-01-14';
import { GvSchemaObjectMock } from 'projects/__test__/data/GvSchemaObjectMock';
import { createCrmAsGvPositiveSchema } from 'projects/__test__/helpers/transformers';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { BaseModule } from '../../../base/base.module';
import { DataModule } from '../../data.module';
import { CtrlEntityOrValueMatcherComponent } from './ctrl-entity-or-value-matcher.component';

/*****************************************************************************
 * MOCK data
 *****************************************************************************/
// mock entity previews (used below in ActiveProjectPipesServiceMock)
const warEntityPreviews = [
    WarEntityPreviewMock.APPE_IN_LANG_TYPE_FIRST_NAME,
    WarEntityPreviewMock.APPE_IN_LANG_TYPE_LAST_NAME,
    WarEntityPreviewMock.PERSON_1,
    WarEntityPreviewMock.VOLUME_UNIT_CUBIC_METER,
    WarEntityPreviewMock.GEO_PLACE_TYPE_CITY
]
// mock schema objects to initialize sandboxes below
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

class ActiveProjectServiceMock {
    inf$ = {
        place$: {
            by_pk_entity$: {
                key: (pk) => new BehaviorSubject({
                    lat: 333,
                    long: 444
                })
            }
        }
    }
    sys$ = {
        config$: {
            main$: new BehaviorSubject(SysConfigValueMock.SYS_CONFIC_VALID)
        }
    }
}

/*****************************************************************************
 * MOCK services
 *****************************************************************************/

/**
 * This service mocks the find-laguages REST API
 */
class LanguagesServiceMock {
    findLanguagesControllerSearchInLanguages(searchString?: string): Observable<InfLanguage[]> {

        const langs = [InfLanguageMock.GERMAN, InfLanguageMock.FRENCH]
        if (!searchString) return of(langs)
        else {
            const filtered = langs.filter(lang => lang.notes.toUpperCase().includes(searchString.toUpperCase()))
            return of(filtered)
        }
    }
}


/**
 * This service mocks the streamEntityPreview method
 */
@Injectable()
export class ActiveProjectPipesServiceMock extends ActiveProjectPipesService {
    pkProject$ = new BehaviorSubject(ProProjectMock.PROJECT_1.pk_entity)
    datNamespaces$ = new BehaviorSubject([DatNamespaceMock.SANDBOX_NAMESPACE])

    streamEntityPreview(pkEntity: number, forceReload?: boolean): Observable<WarEntityPreview> {
        return of({
            class_label: "Person",
            entity_label: "Albertzzzzzzzzzz IV",
            entity_type: "peIt",
            fk_class: 21,
            fk_project: 375232,
            fk_type: null,
            key: "375232_2004",
            pk_entity: 2004,
            project: 375232,
            type_label: null
        })
    }
}



/*****************************************************************************
 * Sandboxes
 *****************************************************************************/
export default sandboxOf(CtrlEntityOrValueMatcherComponent, {
    declareComponent: false,
    imports: [
        DataModule,
        BaseModule,
        FormsModule,
        InitStateModule
    ],
    providers: [
        { provide: ActiveProjectPipesService, useClass: ActiveProjectPipesServiceMock },
        { provide: LanguagesService, useClass: LanguagesServiceMock },
        { provide: ActiveProjectService, useClass: ActiveProjectServiceMock }
    ]
})
    .add('CtrlEntityOrValueMatcherComponent', {
        context: {
            schemaObjects: initialSchemaObects,
        },
        template: `
    <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>
    <span style="display:flex;flex-direction:row;justify-content:center">entity:</span>
    <div style="display:flex;flex-direction:row;justify-content:center">
        <gv-ctrl-entity-or-value-matcher [pkClass]="21"></gv-ctrl-entity-or-value-matcher>
    </div>
    <span style="display:flex;flex-direction:row;justify-content:center">appellation:</span>
    <div style="display:flex;flex-direction:row;justify-content:center">
        <gv-ctrl-entity-or-value-matcher [pkClass]="40"></gv-ctrl-entity-or-value-matcher>
    </div>
    <span style="display:flex;flex-direction:row;justify-content:center">place:</span>
    <div style="display:flex;flex-direction:row;justify-content:center">
        <gv-ctrl-entity-or-value-matcher [pkClass]="51"></gv-ctrl-entity-or-value-matcher>
    </div>
    <span style="display:flex;flex-direction:row;justify-content:center">dimension:</span>
    <div style="display:flex;flex-direction:row;justify-content:center">
        <gv-ctrl-entity-or-value-matcher [pkClass]="52"></gv-ctrl-entity-or-value-matcher>
    </div>
    <span style="display:flex;flex-direction:row;justify-content:center">lang string:</span>
    <div style="display:flex;flex-direction:row;justify-content:center">
        <gv-ctrl-entity-or-value-matcher [pkClass]="657"></gv-ctrl-entity-or-value-matcher>
    </div>
    <span style="display:flex;flex-direction:row;justify-content:center">language:</span>
    <div style="display:flex;flex-direction:row;justify-content:center">
        <gv-ctrl-entity-or-value-matcher [pkClass]="54"></gv-ctrl-entity-or-value-matcher>
    </div>
    <span style="display:flex;flex-direction:row;justify-content:center">timeprimitive:</span>
    <div style="display:flex;flex-direction:row;justify-content:center">
        <gv-ctrl-entity-or-value-matcher [pkClass]="335"></gv-ctrl-entity-or-value-matcher>
    </div>
    <br/>
    <br/>
    <span style="display:flex;flex-direction:row;justify-content:center">filled entity:</span>
    <br/>
    <div style="display:flex;flex-direction:row;justify-content:center">
        <gv-ctrl-entity-or-value-matcher [pkClass]="21" [pkEntity]="1"></gv-ctrl-entity-or-value-matcher>
    </div>
    <br/>
    <br/>
    <span style="display:flex;flex-direction:row;justify-content:center">filled value:</span>
    <br/>
    <div style="display:flex;flex-direction:row;justify-content:center">
        <gv-ctrl-entity-or-value-matcher [pkClass]="51" [pkEntity]="1"></gv-ctrl-entity-or-value-matcher>
    </div>
    `
    })
