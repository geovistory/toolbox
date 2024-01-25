import { Component, importProvidersFrom, Input } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ActiveProjectPipesService, GvSchemaObjectMock, InfLanguageMock, InfResourceMock, MockPaginationControllerForSandboxes, PROFILE_12_BIOGRAPHICAL_BA_2022_02_09, PROFILE_16_INTERACTIONS_S_2022_02_09, PROFILE_20_PHYSICAL_MAN_MA_2022_01_18, PROFILE_5_GEOVISTORY_BASI_2022_01_18, PROFILE_8_MARITIME_HISTOR_2022_01_18, PROFILE_97_GEOVISTORY_DIGI_2022_02_05, ProInfoProjRelMock, ProProjectMock, StateModule, SysConfigValueMock, WarEntityPreviewMock } from '@kleiolab/lib-redux';
import { INITIAL_STATE } from '@ngrx/store';
import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { AddStatementDialogComponent, AddStatementDialogData } from './add-statement-dialog.component';

import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';

import { MatButtonModule } from '@angular/material/button';
import { createCrmAsGvPositiveSchema } from '@kleiolab/lib-redux/lib/_helpers/transformers';
import { InfLanguage, LanguagesService, SubfieldPageControllerService, WareEntityPreviewPage, WarEntityPreview, WarEntityPreviewControllerService, WarEntityPreviewSearchExistingReq } from '@kleiolab/lib-sdk-lb4';
import { BehaviorSubject, delay, Observable, of } from 'rxjs';
import { getCdkOverlayCanvas } from './../../../../../.storybook/getCdkOverlayCanvas';
import { MockStateFactory } from './../../../../../.storybook/MockStateFactory';
import { ActiveProjectService } from './../../../services/active-project.service';


@Component({
  selector: 'gv-launch-dialog',
  template: `
    <button mat-raised-button color="primary" (click)="launch()"> Launch </button>
  `,
  standalone: true,
  imports: [MatButtonModule]
})
class LaunchDialogComponent {
  @Input() data: AddStatementDialogData;
  constructor(private _dialog: MatDialog) { }

  launch(): void {
    this._dialog.open<AddStatementDialogComponent, AddStatementDialogData>(AddStatementDialogComponent, {
      height: 'calc(100% - 30px)',
      width: '850px',
      maxWidth: '100%',
      data: this.data
    });
  }
}

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
class ActiveProjectPipesServiceMock extends ActiveProjectPipesService {
  override streamEntityPreview(pkEntity: number): Observable<WarEntityPreview> {
    // const previews = values(WarEntityPreviewMock) as WarEntityPreview[]
    const preview = [
      // tslint:disable-next-line: max-line-length
      { project_id: 375232, pk_entity: 2004, fk_class: 21, entity_label: 'Albert IV', class_label: 'Person', entity_type: 'peIt', type_label: null, fk_type: null, time_span: null, full_text_headline: 'reverse of: is <b>appellation</b> for language of]: Albert IV, [reverse of: brought into life]: (no label)', class_label_headline: 'Person', entity_label_headline: 'Albert IV', type_label_headline: null, projects: [375232] },
      // tslint:disable-next-line: max-line-length
      { project_id: 375232, pk_entity: 2006, fk_class: 21, entity_label: 'Jean', class_label: 'Person', entity_type: 'peIt', type_label: null, fk_type: null, time_span: null, full_text_headline: 'Person –[reverse of: is <b>appellation</b> for language of]: Jean', class_label_headline: 'Person', entity_label_headline: 'Jean', type_label_headline: null, projects: [375232] },
      // tslint:disable-next-line: max-line-length
      { project_id: 0, pk_entity: 2007, fk_class: 21, entity_label: 'Hans', class_label: 'Person', entity_type: 'peIt', type_label: null, fk_type: null, time_span: null, full_text_headline: 'Person – [reverse of: is <b>appellation</b> for language of]: Hans', class_label_headline: 'Person', entity_label_headline: 'Hans', type_label_headline: null, projects: [375232] },
      // tslint:disable-next-line: max-line-length
      { project_id: 375232, pk_entity: 2009, fk_class: 21, entity_label: 'Angela', class_label: 'Person', entity_type: 'peIt', type_label: null, fk_type: null, time_span: null, full_text_headline: 'Person –[reverse of: is <b>appellation </b> for language of]: Angela', class_label_headline: 'Person', entity_label_headline: 'Angela', type_label_headline: null, projects: [375232] },
      // tslint:disable-next-line: max-line-length
      { project_id: 0, pk_entity: 100096, fk_class: 21, entity_label: 'Hello world3', class_label: 'Person', entity_type: 'peIt', type_label: null, fk_type: null, time_span: null, full_text_headline: 'Person –[reverse of: is<b>appellation</b > for language of]: Hello world3', class_label_headline: 'Person', entity_label_headline: 'Hello world3', type_label_headline: null, projects: [375232] },
      // tslint:disable-next-line: max-line-length
      { project_id: 375232, pk_entity: 2005, fk_class: 21, entity_label: 'Rudolf of Habsbourg', class_label: 'Person', entity_type: 'peIt', type_label: null, fk_type: null, time_span: null, full_text_headline: 'Person – [reverse of: is <b>appellation</b> for language of]: Rudolf of Habsbourg', class_label_headline: 'Person', entity_label_headline: 'Rudolf of Habsbourg', type_label_headline: null, projects: [375232] },
      // tslint:disable-next-line: max-line-length
      { project_id: 375232, pk_entity: 2008, fk_class: 21, entity_label: 'Pierre', class_label: 'Person', entity_type: 'peIt', type_label: null, fk_type: null, time_span: null, full_text_headline: 'Person –[reverse of: is <b> appellation </b> for language of]: Pierre', class_label_headline: 'Person', entity_label_headline: 'Pierre', type_label_headline: null, projects: [375232] },
      // tslint:disable-next-line: max-line-length
      { project_id: 375232, pk_entity: 100080, fk_class: 21, entity_label: 'hello world', class_label: 'Person', entity_type: 'peIt', type_label: null, fk_type: null, time_span: null, full_text_headline: 'Person – [reverse of: is <b>appellation</b> for language of]: hello world', class_label_headline: 'Person', entity_label_headline: 'hello world', type_label_headline: null, projects: [375232] },
      // tslint:disable-next-line: max-line-length
      { project_id: 375232, pk_entity: 100088, fk_class: 21, entity_label: 'hello world 2', class_label: 'Person', entity_type: 'peIt', type_label: null, fk_type: null, time_span: null, full_text_headline: 'Person – [reverse of: is <b>appellation</b> for language of]: hello world 2', class_label_headline: 'Person', entity_label_headline: 'hello world 2', type_label_headline: null, projects: [777] },
      WarEntityPreviewMock.APPE_IN_LANG_TYPE_FIRST_NAME,
      WarEntityPreviewMock.APPE_IN_LANG_TYPE_LAST_NAME,
      WarEntityPreviewMock.PERSON_1,
      WarEntityPreviewMock.VOLUME_UNIT_CUBIC_METER,
      WarEntityPreviewMock.GEO_PLACE_TYPE_CITY
    ].find((x) => x?.pk_entity === pkEntity)
    return new BehaviorSubject(preview).pipe(delay(300))
  }
}


/*****************************************************************************
 * MOCK services
 *****************************************************************************/
class WarEntityPreviewControllerServiceMock {
  warEntityPreviewControllerSearchExisting(
    warEntityPreviewSearchExistingReq?: WarEntityPreviewSearchExistingReq,
  ): Observable<WareEntityPreviewPage> {
    const allData = [
      // tslint:disable-next-line: max-line-length
      { project_id: 375232, pk_entity: 2004, fk_class: 21, entity_label: 'Albert IV', class_label: 'Person', entity_type: 'peIt', type_label: null, fk_type: null, time_span: null, full_text_headline: 'reverse of: is <b>appellation</b> for language of]: Albert IV, [reverse of: brought into life]: (no label)', class_label_headline: 'Person', entity_label_headline: 'Albert IV', type_label_headline: null, projects: [375232] },
      // tslint:disable-next-line: max-line-length
      { project_id: 375232, pk_entity: 2006, fk_class: 21, entity_label: 'Jean', class_label: 'Person', entity_type: 'peIt', type_label: null, fk_type: null, time_span: null, full_text_headline: 'Person –[reverse of: is <b>appellation</b> for language of]: Jean', class_label_headline: 'Person', entity_label_headline: 'Jean', type_label_headline: null, projects: [375232] },
      // tslint:disable-next-line: max-line-length
      { project_id: 0, pk_entity: 2007, fk_class: 21, entity_label: 'Hans', class_label: 'Person', entity_type: 'peIt', type_label: null, fk_type: null, time_span: null, full_text_headline: 'Person – [reverse of: is <b>appellation</b> for language of]: Hans', class_label_headline: 'Person', entity_label_headline: 'Hans', type_label_headline: null, projects: [375232] },
      // tslint:disable-next-line: max-line-length
      { project_id: 375232, pk_entity: 2009, fk_class: 21, entity_label: 'Angela', class_label: 'Person', entity_type: 'peIt', type_label: null, fk_type: null, time_span: null, full_text_headline: 'Person –[reverse of: is <b>appellation </b> for language of]: Angela', class_label_headline: 'Person', entity_label_headline: 'Angela', type_label_headline: null, projects: [375232] },
      // tslint:disable-next-line: max-line-length
      { project_id: 0, pk_entity: 100096, fk_class: 21, entity_label: 'Hello world3', class_label: 'Person', entity_type: 'peIt', type_label: null, fk_type: null, time_span: null, full_text_headline: 'Person –[reverse of: is<b>appellation</b > for language of]: Hello world3', class_label_headline: 'Person', entity_label_headline: 'Hello world3', type_label_headline: null, projects: [375232] },
      // tslint:disable-next-line: max-line-length
      { project_id: 375232, pk_entity: 2005, fk_class: 21, entity_label: 'Rudolf of Habsbourg', class_label: 'Person', entity_type: 'peIt', type_label: null, fk_type: null, time_span: null, full_text_headline: 'Person – [reverse of: is <b>appellation</b> for language of]: Rudolf of Habsbourg', class_label_headline: 'Person', entity_label_headline: 'Rudolf of Habsbourg', type_label_headline: null, projects: [375232] },
      // tslint:disable-next-line: max-line-length
      { project_id: 375232, pk_entity: 2008, fk_class: 21, entity_label: 'Pierre', class_label: 'Person', entity_type: 'peIt', type_label: null, fk_type: null, time_span: null, full_text_headline: 'Person –[reverse of: is <b> appellation </b> for language of]: Pierre', class_label_headline: 'Person', entity_label_headline: 'Pierre', type_label_headline: null, projects: [375232] },
      // tslint:disable-next-line: max-line-length
      { project_id: 375232, pk_entity: 100080, fk_class: 21, entity_label: 'hello world', class_label: 'Person', entity_type: 'peIt', type_label: null, fk_type: null, time_span: null, full_text_headline: 'Person – [reverse of: is <b>appellation</b> for language of]: hello world', class_label_headline: 'Person', entity_label_headline: 'hello world', type_label_headline: null, projects: [375232] },
      // tslint:disable-next-line: max-line-length
      { project_id: 375232, pk_entity: 100088, fk_class: 21, entity_label: 'hello world 2', class_label: 'Person', entity_type: 'peIt', type_label: null, fk_type: null, time_span: null, full_text_headline: 'Person – [reverse of: is <b>appellation</b> for language of]: hello world 2', class_label_headline: 'Person', entity_label_headline: 'hello world 2', type_label_headline: null, projects: [777] }
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
const meta: Meta<LaunchDialogComponent> = {
  component: LaunchDialogComponent,
  title: 'Editor/Dialogs/AddStatementDialogComponent',
  decorators: [
    applicationConfig({
      providers: [
        provideAnimations(),
        importProvidersFrom(StateModule, MatDialogModule),
        ActiveProjectService,
      ],
    }),
  ],
};
export default meta;
type Story = StoryObj<AddStatementDialogComponent>;

// Setup the initial state of the story Basic
const stateBasic = new MockStateFactory();

// mock schema objects to initialize sandboxes below
stateBasic.addPositiveSchemaObject(
  createCrmAsGvPositiveSchema({
    ontoMocks: [
      PROFILE_5_GEOVISTORY_BASI_2022_01_18, // add basics profile
      PROFILE_16_INTERACTIONS_S_2022_02_09, // add social interactions profile
      PROFILE_12_BIOGRAPHICAL_BA_2022_02_09, // add biographical profile
      PROFILE_8_MARITIME_HISTOR_2022_01_18, // add maritime profile
      PROFILE_20_PHYSICAL_MAN_MA_2022_01_18, // add phyical profile
      PROFILE_97_GEOVISTORY_DIGI_2022_02_05 // add digitals profile
    ],
    sysConf: SysConfigValueMock.SYS_CONFIC_VALID, // add SYS_CONFIG json
    p: ProProjectMock.PROJECT_1.pk_entity // pk project used to enable above profiles
  })
)
stateBasic.addPositiveSchemaObject(GvSchemaObjectMock.project1); // add project and its default language
stateBasic.setActiveProject(ProProjectMock.PROJECT_1.pk_entity); // set active project
stateBasic.addPositiveSchemaObject({
  inf: { resource: [InfResourceMock.VOLUME_UNIT_CUBIC_METER] },
  war: { entity_preview: [WarEntityPreviewMock.VOLUME_UNIT_CUBIC_METER] },
  pro: { info_proj_rel: [ProInfoProjRelMock.PROJ_1_VOLUME_UNIT_CUBIC_METER] }
})
stateBasic.addPositiveSchemaObject({
  inf: { resource: [InfResourceMock.APPE_IN_LANG_TYPE_LAST_NAME] },
  war: { entity_preview: [WarEntityPreviewMock.APPE_IN_LANG_TYPE_LAST_NAME] },
  pro: { info_proj_rel: [ProInfoProjRelMock.PROJ_1_APPE_IN_LANG_TYPE_LAST_NAME] }
})
stateBasic.addPositiveSchemaObject({
  inf: { resource: [InfResourceMock.GEO_PLACE_TYPE_CITY] },
  war: { entity_preview: [WarEntityPreviewMock.GEO_PLACE_TYPE_CITY] },
  pro: { info_proj_rel: [ProInfoProjRelMock.PROJ_1_CITY_TYPE] }
})

export const Basic: Story = {
  args: {
    data: {
      showAddList: true,
      field: {
        'sourceClass': 61, 'sourceClassLabel': 'Birth', 'sourceMaxQuantity': 1, 'sourceMinQuantity': 1, 'targetMinQuantity': 0, 'targetMaxQuantity': -1, 'label': 'brought into life', 'isHasTypeField': false, 'isTimeSpanShortCutField': false, 'property': { 'fkProperty': 86 }, 'isOutgoing': true, 'identityDefiningForSource': true, 'identityDefiningForTarget': false, 'ontoInfoLabel': 'P98', 'ontoInfoUrl': 'https://ontome.net/property/86', 'allSubfieldsRemovedFromAllProfiles': false, 'targetClasses': [21], 'display': { 'formSections': { 'specific': { 'position': null } }, 'viewSections': { 'specific': { 'position': null } } }, 'isSpecialField': false, 'targets': { '21': { 'viewType': { 'entityPreview': 'true' }, 'formControlType': { 'entity': 'true' }, 'removedFromAllProfiles': false, 'targetClass': 21, 'targetClassLabel': 'Person' } }
      },
      targetClass: 21,
      source: { fkInfo: 1003 },
      hiddenProperty: {}
    }
  },
  decorators: [
    applicationConfig({
      providers: [
        { provide: INITIAL_STATE, useValue: stateBasic.state },
        { provide: ActiveProjectPipesService, useClass: ActiveProjectPipesServiceMock },
        { provide: LanguagesService, useClass: LanguagesServiceMock },
        { provide: WarEntityPreviewControllerService, useClass: WarEntityPreviewControllerServiceMock },
        { provide: SubfieldPageControllerService, useClass: MockPaginationControllerForSandboxes },
      ],
    }),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttonEl = canvas.getByRole('button');
    await userEvent.click(buttonEl)
    const overlayCanvas = getCdkOverlayCanvas(canvasElement)

    expect(
      overlayCanvas.getByText(/Existing information found/gi)
    ).toBeTruthy();
  },
};
