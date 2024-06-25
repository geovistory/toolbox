import { importProvidersFrom } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { provideAnimations } from '@angular/platform-browser/animations';
import { InfLanguageMock, PROFILE_12_BIOGRAPHICAL_BA_2022_02_09, PROFILE_5_GEOVISTORY_BASI_2022_01_18, ProProjectMock, StateModule, SysConfigValueMock } from '@kleiolab/lib-redux';
import { INITIAL_STATE } from '@ngrx/store';
import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { ClassConfigComponent } from './class-config.component';

import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';

import { createCrmAsGvPositiveSchema } from '@kleiolab/lib-redux/lib/_helpers/transformers';
import { MockStateFactory } from './../../../../../.storybook/MockStateFactory';
import { ActiveProjectService } from './../../../services/active-project.service';

const meta: Meta<ClassConfigComponent> = {
  component: ClassConfigComponent,
  title: 'Configuration/ClassConfigComponent',
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
type Story = StoryObj<ClassConfigComponent>;

// Setup the initial state of the story Basic
const stateBasic = new MockStateFactory();
stateBasic.addPositiveSchemaObject(createCrmAsGvPositiveSchema({
  ontoMocks: [PROFILE_5_GEOVISTORY_BASI_2022_01_18,
    PROFILE_12_BIOGRAPHICAL_BA_2022_02_09],
  sysConf: SysConfigValueMock.SYS_CONFIC_VALID,
  p: 3001
}))
stateBasic.setActiveProject(3001)
stateBasic.addPositiveSchemaObject({
  pro: { project: [ProProjectMock.PROJECT_1] },
  inf: { language: [InfLanguageMock.GERMAN] }
})

export const Basic: Story = {
  args: {
    fkClass: 21,
    fkProject: 3001,
  },
  decorators: [
    applicationConfig({
      providers: [{ provide: INITIAL_STATE, useValue: stateBasic.state }],
    }),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/has its origins in/i)).toBeTruthy();
  },
};
