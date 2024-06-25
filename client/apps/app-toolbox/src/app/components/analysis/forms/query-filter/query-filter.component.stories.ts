import { importProvidersFrom } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { provideAnimations } from '@angular/platform-browser/animations';
import { InfLanguageMock, InfResourceMock, PROFILE_12_BIOGRAPHICAL_BA_2022_02_09, PROFILE_5_GEOVISTORY_BASI_2022_01_18, ProInfoProjRelMock, ProProjectMock, StateModule, SysConfigValueMock, WarEntityPreviewMock } from '@kleiolab/lib-redux';
import { INITIAL_STATE } from '@ngrx/store';
import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { QueryFilterComponent } from './query-filter.component';

import { userEvent, within } from '@storybook/testing-library';

import { createCrmAsGvPositiveSchema } from '@kleiolab/lib-redux/lib/_helpers/transformers';
import { MockStateFactory } from './../../../../../../.storybook/MockStateFactory';
import { getCdkOverlayCanvas } from './../../../../../../.storybook/getCdkOverlayCanvas';
import { sleep } from './../../../../../../.storybook/sleep';
import { ActiveProjectService } from './../../../../services/active-project.service';

const meta: Meta<QueryFilterComponent> = {
  component: QueryFilterComponent,
  title: 'Analysis/Forms/QueryFilterComponent',
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
type Story = StoryObj<QueryFilterComponent>;

// Setup the initial state of the story Basic
const stateBasic = new MockStateFactory();
stateBasic.addPositiveSchemaObject(
  createCrmAsGvPositiveSchema({
    ontoMocks: [
      PROFILE_5_GEOVISTORY_BASI_2022_01_18,
      PROFILE_12_BIOGRAPHICAL_BA_2022_02_09, // add basics profile
    ],
    sysConf: SysConfigValueMock.SYS_CONFIC_VALID, // add SYS_CONFIG json
    p: ProProjectMock.PROJECT_1.pk_entity // pk project used to enable above profiles
  })
)
stateBasic.setActiveProject(ProProjectMock.PROJECT_1.pk_entity)
// project basics
stateBasic.addPositiveSchemaObject({
  pro: { project: [ProProjectMock.PROJECT_1] },
  inf: { language: [InfLanguageMock.GERMAN] },
})

// Geographical place type
stateBasic.addPositiveSchemaObject({
  inf: { resource: [InfResourceMock.GEO_PLACE_TYPE_CITY] },
  pro: { info_proj_rel: [ProInfoProjRelMock.PROJ_1_CITY_TYPE] },
  war: { entity_preview: [WarEntityPreviewMock.GEO_PLACE_TYPE_CITY] }
})


export const Basic: Story = {
  args: {
    disableRootCtrl: false,
  },
  decorators: [
    applicationConfig({
      providers: [{ provide: INITIAL_STATE, useValue: stateBasic.state }],
    }),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const menu = await canvas.findByText('arrow_drop_down')
    await userEvent.click(menu)
    await sleep(200)
    const cdkOverlay = getCdkOverlayCanvas(canvasElement);
    const geoPlace = await cdkOverlay.findByText('Geographical Place')
    await userEvent.click(geoPlace)

    await userEvent.click(menu)
    const btn = await canvas.findAllByRole('button', { name: /Add Subfilter/i })
    await userEvent.click(btn[0])

    // expect(canvas.getByText(/query-filter works!/gi)).toBeTruthy();
  },
};
