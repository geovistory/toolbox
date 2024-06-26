import { Component, importProvidersFrom, Input } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { provideAnimations } from '@angular/platform-browser/animations';
import { GvSchemaObjectMock, InfResourceMock, PROFILE_12_BIOGRAPHICAL_BA_2022_02_09, PROFILE_16_INTERACTIONS_S_2022_02_09, PROFILE_20_PHYSICAL_MAN_MA_2022_01_18, PROFILE_5_GEOVISTORY_BASI_2022_01_18, PROFILE_8_MARITIME_HISTOR_2022_01_18, PROFILE_97_GEOVISTORY_DIGI_2022_02_05, ProInfoProjRelMock, ProProjectMock, StateModule, SysConfigValueMock, WarEntityPreviewMock } from '@kleiolab/lib-redux';
import { INITIAL_STATE } from '@ngrx/store';
import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { SelectTypeDialogComponent, SelectTypeDialogData } from './select-type-dialog.component';

import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';

import { MatButtonModule } from '@angular/material/button';
import { createCrmAsGvPositiveSchema } from '@kleiolab/lib-redux/lib/_helpers/transformers';
import { getCdkOverlayCanvas } from 'apps/app-toolbox/.storybook/getCdkOverlayCanvas';
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
  @Input() data: SelectTypeDialogData;
  constructor(private _dialog: MatDialog) { }

  launch(): void {
    this._dialog.open<SelectTypeDialogComponent, SelectTypeDialogData>(SelectTypeDialogComponent, {
      width: '320px',
      data: this.data
    });
  }
}


const meta: Meta<LaunchDialogComponent> = {
  component: LaunchDialogComponent,
  title: 'Editor/Dialogs/SelectTypeDialogComponent',
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
type Story = StoryObj<SelectTypeDialogComponent>;

// Setup the initial state of the story Basic
const stateBasic = new MockStateFactory();
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
  inf: { resource: [InfResourceMock.GEO_PLACE_TYPE_CITY] },
  war: { entity_preview: [WarEntityPreviewMock.GEO_PLACE_TYPE_CITY] },
  pro: { info_proj_rel: [ProInfoProjRelMock.PROJ_1_CITY_TYPE] }
})

export const Basic: Story = {
  args: {
    data: {
      field: {
        'sourceClass': 365, 'sourceClassLabel': 'Geographical Place', 'sourceMaxQuantity': 1, 'sourceMinQuantity': 1, 'targetMinQuantity': 1, 'targetMaxQuantity': 1, 'label': 'has type', 'isHasTypeField': true, 'isTimeSpanShortCutField': false, 'property': { 'fkProperty': 123 },
        'isOutgoing': true, 'identityDefiningForSource': true, 'identityDefiningForTarget': false, 'ontoInfoLabel': 'P123', 'ontoInfoUrl': 'https://ontome.net/property/123', 'allSubfieldsRemovedFromAllProfiles': false, 'targetClasses': [364],
        'display': { 'formSections': { 'specific': { 'position': null } }, 'viewSections': { 'specific': { 'position': null } } }, 'isSpecialField': false,
        'targets': { '364': { 'viewType': { 'entityPreview': 'true' }, 'formControlType': { 'entity': 'true' }, 'removedFromAllProfiles': false, 'targetClass': 364, 'targetClassLabel': 'Person' } }
      },
      targetClass: 364,
      source: { fkInfo: 1003 },
    }
  },
  decorators: [
    applicationConfig({
      providers: [{ provide: INITIAL_STATE, useValue: stateBasic.state }],
    }),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttonEl = canvas.getByRole('button');
    await userEvent.click(buttonEl)
    const overlayCanvas = getCdkOverlayCanvas(canvasElement)
    expect(overlayCanvas.findByText(/City/gi)).toBeTruthy();
  },
};
