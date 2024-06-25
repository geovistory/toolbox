import { importProvidersFrom } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { provideAnimations } from '@angular/platform-browser/animations';
import { GvSchemaObjectMock, InfResourceMock, MockPaginationControllerForSandboxes, PROFILE_12_BIOGRAPHICAL_BA_2022_02_09, PROFILE_16_INTERACTIONS_S_2022_02_09, PROFILE_20_PHYSICAL_MAN_MA_2022_01_18, PROFILE_5_GEOVISTORY_BASI_2022_01_18, PROFILE_8_MARITIME_HISTOR_2022_01_18, PROFILE_97_GEOVISTORY_DIGI_2022_02_05, ProProjectMock, StateModule, SysConfigValueMock } from '@kleiolab/lib-redux';
import { INITIAL_STATE } from '@ngrx/store';
import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { EntityCardComponent } from './entity-card.component';

import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';

import { createCrmAsGvPositiveSchema } from '@kleiolab/lib-redux/lib/_helpers/transformers';
import { SubfieldPageControllerService } from '@kleiolab/lib-sdk-lb4';
import { BehaviorSubject, of } from 'rxjs';
import { MockStateFactory } from './../../../../../.storybook/MockStateFactory';
import { ActiveProjectService } from './../../../services/active-project.service';

const meta: Meta<EntityCardComponent> = {
  component: EntityCardComponent,
  title: 'Editor/EntityCardComponent',
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
type Story = StoryObj<EntityCardComponent>;

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
export const Basic: Story = {
  args: {
    source: { fkInfo: InfResourceMock.PERSON_1.pk_entity },
    pkClass$: of(InfResourceMock.PERSON_1.fk_class),
    showOntoInfo$: new BehaviorSubject(false),
    readmode$: new BehaviorSubject(true),
    scope: { inProject: ProProjectMock.PROJECT_1.pk_entity }
  },
  decorators: [
    applicationConfig({
      providers: [
        { provide: SubfieldPageControllerService, useClass: MockPaginationControllerForSandboxes },
        { provide: INITIAL_STATE, useValue: stateBasic.state }
      ],
    }),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Person/gi)).toBeTruthy();
  },
};
