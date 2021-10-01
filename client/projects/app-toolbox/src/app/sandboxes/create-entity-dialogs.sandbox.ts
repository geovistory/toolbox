import { Component, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActiveProjectPipesService, InformationBasicPipesService } from '@kleiolab/lib-queries';
import { IconType, ReduxMainService } from '@kleiolab/lib-redux';
import { GvPositiveSchemaObject, GvSchemaModifier, InfLanguage, InfResourceWithRelations, InfStatementWithRelations, LanguagesService, SubfieldPageControllerService, WareEntityPreviewPage, WarEntityPreview, WarEntityPreviewControllerService, WarEntityPreviewSearchExistingReq } from '@kleiolab/lib-sdk-lb4';
import { sandboxOf } from 'angular-playground';
import { DatNamespaceMock } from 'projects/__test__/data/auto-gen/gvDB/DatNamespaceMock';
import { InfLanguageMock } from 'projects/__test__/data/auto-gen/gvDB/InfLanguageMock';
import { InfResourceMock } from 'projects/__test__/data/auto-gen/gvDB/InfResourceMock';
import { ProInfoProjRelMock } from 'projects/__test__/data/auto-gen/gvDB/ProInfoProjRelMock';
import { ProProjectMock } from 'projects/__test__/data/auto-gen/gvDB/ProProjectMock';
import { SysConfigValueMock } from 'projects/__test__/data/auto-gen/gvDB/SysConfigValueMock';
import { WarEntityPreviewMock } from 'projects/__test__/data/auto-gen/gvDB/WarEntityPreviewMock';
import { PROFILE_12_BIOGRAPHICAL_BA_2021_06_30 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-12-biographical-ba-2021-06-30';
import { PROFILE_16_INTERACTIONS_S_2021_07_10 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-16-interactions-s-2021-07-10';
import { PROFILE_20_PHYSICAL_MAN_MA_2021_07_11 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-20-physical-man-ma-2021-07-11';
import { PROFILE_5_GEOVISTORY_BASI_2021_06_30 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-5-geovistory-basi-2021-06-30';
import { PROFILE_8_MARITIME_HISTOR_2021_07_09 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-8-maritime-histor-2021-07-09';
import { GvSchemaObjectMock } from 'projects/__test__/data/GvSchemaObjectMock';
import { IAppStateMock } from 'projects/__test__/data/IAppStateMock';
import { createCrmAsGvPositiveSchema } from 'projects/__test__/helpers/transformers';
import { MockPaginationControllerForPropertiesTree } from 'projects/__test__/mock-services/MockPaginationControllerForPropertiesTree';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BaseModule } from '../modules/base/base.module';
import { AddEntityDialogComponent, AddEntityDialogData } from '../modules/base/components/add-entity-dialog/add-entity-dialog.component';
import { AddStatementDialogComponent, AddStatementDialogData } from '../modules/base/components/add-statement-dialog/add-statement-dialog.component';
import { CreateOrAddEntityEvent, CtrlEntityDialogComponent, CtrlEntityDialogData } from '../modules/base/components/ctrl-entity/ctrl-entity-dialog/ctrl-entity-dialog.component';
import { CtrlEntityModel } from '../modules/base/components/ctrl-entity/ctrl-entity.component';
import { InitStateModule } from '../shared/components/init-state/init-state.module';



@Component({
  selector: 'gv-sandbox-create-dialogs',
  template: `
    <button (click)="fromNewEntity()">From add new entity</button>
    <button (click)="fromCard()">From view fields</button>
    <button (click)="fromField()">From form fields</button>
    <div>
        <p>Dialog result:</p>
        <pre>{{result | json}}</pre>
    </div>
    `
})
export class SandBoxCreateDialogsComponent {
  dialogSizing = {
    height: 'calc(100% - 30px)',
    width: '980px',
    maxWidth: '100%'
  }
  result: any;

  constructor(private dialog: MatDialog) { }

  fromField() {
    this.dialog.open<CtrlEntityDialogComponent, CtrlEntityDialogData, CtrlEntityModel>(
      CtrlEntityDialogComponent, {
      ...this.dialogSizing,
      panelClass: 'gv-no-padding',
      data: {
        pkClass: 21,
        hiddenProperty: undefined,
        initVal$: new BehaviorSubject<CtrlEntityModel>(null),
        showAddList: true,
        disableIfHasStatement: undefined,
        defaultSearch: ''
      }
    }).afterClosed().subscribe(res => this.result = res)
  }

  fromCard() {
    this.dialog.open<AddStatementDialogComponent, AddStatementDialogData>(AddStatementDialogComponent, {
      ...this.dialogSizing,
      panelClass: 'gv-no-padding',
      data: {
        field: {
          'sourceClass': 61, 'sourceClassLabel': 'Birth', 'sourceMaxQuantity': 1, 'sourceMinQuantity': 1, 'targetMinQuantity': 0, 'targetMaxQuantity': -1, 'label': 'brought into life', 'isHasTypeField': false, 'isTimeSpanShortCutField': false, 'property': { 'fkProperty': 86 }, 'isOutgoing': true, 'identityDefiningForSource': true, 'identityDefiningForTarget': false, 'ontoInfoLabel': 'P98', 'ontoInfoUrl': 'https://ontome.net/property/86', 'allSubfieldsRemovedFromAllProfiles': false, 'targetClasses': [21], 'display': { 'formSections': { 'specific': { 'position': null } }, 'viewSections': { 'specific': { 'position': null } } }, 'isSpecialField': false, 'targets': { '21': { 'viewType': { 'entityPreview': 'true' }, 'formControlType': { 'entity': 'true' }, 'removedFromAllProfiles': false, 'targetClass': 21, 'targetClassLabel': 'Person' } }
        },
        targetClass: 21,
        source: { fkInfo: 1003 },
        hiddenProperty: {}
      },
    });
  }

  fromNewEntity() {
    this.dialog.open<AddEntityDialogComponent, AddEntityDialogData, CreateOrAddEntityEvent>(
      AddEntityDialogComponent, {
      ...this.dialogSizing,
      data: {
        pkClass: 21,
      }
    }).afterClosed().subscribe(res => this.result = res)
  }
}


/*****************************************************************************
 * MOCK data
 *********************************************************
 ********************/
// mock entity previews (used below in ActiveProjectPipesServiceMock)
const warEntityPreviews = [
  WarEntityPreviewMock.APPE_IN_LANG_TYPE_FIRST_NAME,
  WarEntityPreviewMock.APPE_IN_LANG_TYPE_LAST_NAME,
  WarEntityPreviewMock.PERSON_1,
  WarEntityPreviewMock.BIRTH_ZWINGLI,
  WarEntityPreviewMock.VOLUME_UNIT_CUBIC_METER
]
// mock schema objects to initialize sandboxes below
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
const volumeDimensionMock: GvPositiveSchemaObject = {
  inf: { resource: [InfResourceMock.VOLUME_UNIT_CUBIC_METER] },
  war: { entity_preview: [WarEntityPreviewMock.VOLUME_UNIT_CUBIC_METER] },
  pro: { info_proj_rel: [ProInfoProjRelMock.PROJ_1_VOLUME_UNIT_CUBIC_METER] }
}
const appeTypeMock: GvPositiveSchemaObject = {
  inf: { resource: [InfResourceMock.APPE_IN_LANG_TYPE_LAST_NAME] },
  war: { entity_preview: [WarEntityPreviewMock.APPE_IN_LANG_TYPE_LAST_NAME] },
  pro: { info_proj_rel: [ProInfoProjRelMock.PROJ_1_APPE_IN_LANG_TYPE_LAST_NAME] }
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

@Injectable()
class ReduxMainServiceMock {
  upsertInfResourcesWithRelations(pkProject: number, infResourceWithRelations: InfResourceWithRelations[])
    : Observable<GvSchemaModifier> {
    alert('InfResource Upserted')
    return of({ 'negative': {}, 'positive': { 'pro': { 'info_proj_rel': [{ 'pk_entity': 5168, 'fk_project': 375232, 'fk_entity': 100150, 'is_in_project': true, 'fk_creator': 1001, 'fk_last_modifier': 1001 }, { 'pk_entity': 5169, 'fk_project': 375232, 'fk_entity': 100151, 'is_in_project': true, 'fk_creator': 1001, 'fk_last_modifier': 1001 }, { 'pk_entity': 5170, 'fk_project': 375232, 'fk_entity': 100152, 'is_in_project': true, 'fk_creator': 1001, 'fk_last_modifier': 1001 }, { 'pk_entity': 5171, 'fk_project': 375232, 'fk_entity': 100153, 'is_in_project': true, 'fk_creator': 1001, 'fk_last_modifier': 1001 }, { 'pk_entity': 5172, 'fk_project': 375232, 'fk_entity': 100154, 'is_in_project': true, 'fk_creator': 1001, 'fk_last_modifier': 1001 }, { 'pk_entity': 5173, 'fk_project': 375232, 'fk_entity': 100155, 'is_in_project': true, 'fk_creator': 1001, 'fk_last_modifier': 1001 }] }, 'inf': { 'resource': [{ 'pk_entity': 100150, 'fk_class': 21 }, { 'pk_entity': 100152, 'fk_class': 365 }], 'lang_string': [{ 'pk_entity': 100143, 'fk_class': 785, 'quill_doc': { 'latestId': 7, 'ops': [{ 'insert': 'W', 'attributes': { 'charid': '3' } }, { 'insert': 'o', 'attributes': { 'charid': '4' } }, { 'insert': 'r', 'attributes': { 'charid': '5' } }, { 'insert': 'l', 'attributes': { 'charid': '6' } }, { 'insert': 'd', 'attributes': { 'charid': '7' } }, { 'insert': '\n', 'attributes': { 'blockid': '2' } }] }, 'string': 'World', 'fk_language': 18889 }], 'statement': [{ 'pk_entity': 100151, 'fk_subject_info': 100150, 'fk_subject_data': 0, 'fk_subject_tables_cell': 0, 'fk_subject_tables_row': 0, 'fk_property': 1762, 'fk_property_of_property': 0, 'fk_object_info': 100143, 'fk_object_data': 0, 'fk_object_tables_cell': 0, 'fk_object_tables_row': 0 }, { 'pk_entity': 100153, 'fk_subject_info': 100152, 'fk_subject_data': 0, 'fk_subject_tables_cell': 0, 'fk_subject_tables_row': 0, 'fk_property': 1113, 'fk_property_of_property': 0, 'fk_object_info': 100146, 'fk_object_data': 0, 'fk_object_tables_cell': 0, 'fk_object_tables_row': 0 }, { 'pk_entity': 100154, 'fk_subject_info': 100152, 'fk_subject_data': 0, 'fk_subject_tables_cell': 0, 'fk_subject_tables_row': 0, 'fk_property': 1112, 'fk_property_of_property': 0, 'fk_object_info': 18889, 'fk_object_data': 0, 'fk_object_tables_cell': 0, 'fk_object_tables_row': 0 }, { 'pk_entity': 100155, 'fk_subject_info': 100152, 'fk_subject_data': 0, 'fk_subject_tables_cell': 0, 'fk_subject_tables_row': 0, 'fk_property': 1111, 'fk_property_of_property': 0, 'fk_object_info': 100150, 'fk_object_data': 0, 'fk_object_tables_cell': 0, 'fk_object_tables_row': 0 }], 'appellation': [{ 'pk_entity': 100146, 'quill_doc': { 'latestId': 7, 'ops': [{ 'insert': 'H', 'attributes': { 'charid': '3' } }, { 'insert': 'e', 'attributes': { 'charid': '4' } }, { 'insert': 'l', 'attributes': { 'charid': '5' } }, { 'insert': 'l', 'attributes': { 'charid': '6' } }, { 'insert': 'o', 'attributes': { 'charid': '7' } }, { 'insert': '\n', 'attributes': { 'blockid': '2' } }] }, 'fk_class': 40, 'string': 'Hello' }], 'language': [{ 'pk_entity': 18889, 'fk_class': 54, 'pk_language': 'eng', 'lang_type': null, 'scope': null, 'iso6392b': 'eng', 'iso6392t': 'eng', 'iso6391': 'en ', 'notes': 'English' }] } } })
  }
  upsertInfStatementsWithRelations(pkProject: number, infStatementWithRelations: InfStatementWithRelations[])
    : Observable<GvSchemaModifier> {
    alert('InfStatement Upserted')
    return of({})
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
    // const previews = values(WarEntityPreviewMock) as WarEntityPreview[]
    const preview = warEntityPreviews.find((x) => x?.pk_entity === pkEntity)
    return new BehaviorSubject(preview).pipe(delay(300))
  }
}

/**
 * This service mocks the streamEntityPreview method
 */
@Injectable()
export class InformationBasicPipesServiceMock extends InformationBasicPipesService {

  pipeIconType(pkEntity: number): Observable<IconType> {
    return of('persistent-entity')
  }

}

class WarEntityPreviewControllerServiceMock {
  warEntityPreviewControllerSearchExisting(
    warEntityPreviewSearchExistingReq?: WarEntityPreviewSearchExistingReq,
    observe?: 'body',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<WareEntityPreviewPage> {
    const allData = [
      // tslint:disable-next-line: max-line-length
      { fk_project: 375232, project: 375232, pk_entity: 2004, fk_class: 21, entity_label: 'Albert IV', class_label: 'Person', entity_type: 'peIt', type_label: null, fk_type: null, time_span: null, full_text_headline: 'reverse of: is <b>appellation</b> for language of]: Albert IV, [reverse of: brought into life]: (no label)', class_label_headline: 'Person', entity_label_headline: 'Albert IV', type_label_headline: null, projects: [375232] },
      // tslint:disable-next-line: max-line-length
      { fk_project: 375232, project: 375232, pk_entity: 2006, fk_class: 21, entity_label: 'Jean', class_label: 'Person', entity_type: 'peIt', type_label: null, fk_type: null, time_span: null, full_text_headline: 'Person –[reverse of: is<b>appellation</ b > for language of]: Jean', class_label_headline: 'Person', entity_label_headline: 'Jean', type_label_headline: null, projects: [375232] },
      // tslint:disable-next-line: max-line-length
      { fk_project: 375232, project: 375232, pk_entity: 2007, fk_class: 21, entity_label: 'Hans', class_label: 'Person', entity_type: 'peIt', type_label: null, fk_type: null, time_span: null, full_text_headline: 'Person – [reverse of: is <b>appellation</b> for language of]: Hans', class_label_headline: 'Person', entity_label_headline: 'Hans', type_label_headline: null, projects: [375232] },
      // tslint:disable-next-line: max-line-length
      { fk_project: 375232, project: 375232, pk_entity: 2009, fk_class: 21, entity_label: 'Angela', class_label: 'Person', entity_type: 'peIt', type_label: null, fk_type: null, time_span: null, full_text_headline: 'Person –[reverse of: is <b>appellation < /b> for language of]: Angela', class_label_headline: 'Person', entity_label_headline: 'Angela', type_label_headline: null, projects: [375232] },
      // tslint:disable-next-line: max-line-length
      { fk_project: 375232, project: 375232, pk_entity: 100096, fk_class: 21, entity_label: 'Hello world3', class_label: 'Person', entity_type: 'peIt', type_label: null, fk_type: null, time_span: null, full_text_headline: 'Person –[reverse of: is<b>appellation< / b > for language of]: Hello world3', class_label_headline: 'Person', entity_label_headline: 'Hello world3', type_label_headline: null, projects: [375232] },
      // tslint:disable-next-line: max-line-length
      { fk_project: 375232, project: 375232, pk_entity: 2005, fk_class: 21, entity_label: 'Rudolf of Habsbourg', class_label: 'Person', entity_type: 'peIt', type_label: null, fk_type: null, time_span: null, full_text_headline: 'Person – [reverse of: is <b>appellation</b> for language of]: Rudolf of Habsbourg', class_label_headline: 'Person', entity_label_headline: 'Rudolf of Habsbourg', type_label_headline: null, projects: [375232] },
      // tslint:disable-next-line: max-line-length
      { fk_project: 375232, project: 375232, pk_entity: 2008, fk_class: 21, entity_label: 'Pierre', class_label: 'Person', entity_type: 'peIt', type_label: null, fk_type: null, time_span: null, full_text_headline: 'Person –[reverse of: is < b > appellation < /b> for language of]: Pierre', class_label_headline: 'Person', entity_label_headline: 'Pierre', type_label_headline: null, projects: [375232] },
      // tslint:disable-next-line: max-line-length
      { fk_project: 375232, project: 375232, pk_entity: 100080, fk_class: 21, entity_label: 'hello world', class_label: 'Person', entity_type: 'peIt', type_label: null, fk_type: null, time_span: null, full_text_headline: 'Person – [reverse of: is <b>appellation</b> for language of]: hello world', class_label_headline: 'Person', entity_label_headline: 'hello world', type_label_headline: null, projects: [375232] },
      // tslint:disable-next-line: max-line-length
      { fk_project: 375232, project: 375232, pk_entity: 100088, fk_class: 21, entity_label: 'hello world 2', class_label: 'Person', entity_type: 'peIt', type_label: null, fk_type: null, time_span: null, full_text_headline: 'Person – [reverse of: is <b>appellation</b> for language of]: hello world 2', class_label_headline: 'Person', entity_label_headline: 'hello world 2', type_label_headline: null, projects: [777] }
    ]

    const data = allData.filter(elt => elt.entity_label.indexOf(warEntityPreviewSearchExistingReq.searchString) != -1 ||
      elt.full_text_headline.indexOf(warEntityPreviewSearchExistingReq.searchString) != -1);

    const pageSize = 5;
    const beginIndex = (warEntityPreviewSearchExistingReq.page - 1) * pageSize;
    const endIndex = beginIndex + pageSize;

    return of({
      totalCount: data.length,
      data: data.slice(beginIndex, endIndex)
    })
  }
}




/*****************************************************************************
 * THE SANDBOX
 *****************************************************************************/

export default sandboxOf(SandBoxCreateDialogsComponent, {
  declareComponent: true,
  imports: [
    BaseModule,
    InitStateModule,
    MatFormFieldModule,
    FormsModule
  ],
  providers: [
    // { provide: ConfigurationPipesService, useClass: ConfigurationPipesServiceMock },
    { provide: ActiveProjectPipesService, useClass: ActiveProjectPipesServiceMock },
    { provide: WarEntityPreviewControllerService, useClass: WarEntityPreviewControllerServiceMock },
    { provide: LanguagesService, useClass: LanguagesServiceMock },
    { provide: ReduxMainService, useClass: ReduxMainServiceMock },
    { provide: InformationBasicPipesService, useClass: InformationBasicPipesServiceMock },
    { provide: SubfieldPageControllerService, useClass: MockPaginationControllerForPropertiesTree },
  ]
})
  .add('Create Entity Dialog | From a field (CtrlEntityComponent) ', {
    context: {
      model: undefined,
      initState: IAppStateMock.stateProject1,
      schemaObjects: [
        ...initialSchemaObects, volumeDimensionMock, appeTypeMock,
        GvSchemaObjectMock.basicClassesAndProperties,
        GvSchemaObjectMock.modelOfPresence,
        GvSchemaObjectMock.project1,
        GvSchemaObjectMock.sysConfig,
      ]

    },
    template: `
        <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>
        <gv-sandbox-create-dialogs></gv-sandbox-create-dialogs>
        `
  })
