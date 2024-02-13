import { importProvidersFrom } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  InfLanguageMock,
  PROFILE_12_BIOGRAPHICAL_BA_2022_02_09,
  PROFILE_5_GEOVISTORY_BASI_2022_01_18,
  ProProjectMock,
  StateModule,
  SysConfigValueMock,
} from '@kleiolab/lib-redux';
import { INITIAL_STATE } from '@ngrx/store';
import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { QueryPathFormComponent } from './query-path-form.component';

import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';

import { createCrmAsGvPositiveSchema } from '@kleiolab/lib-redux/lib/_helpers/transformers';
import { sleep } from 'apps/app-toolbox/.storybook/sleep';
import { of } from 'rxjs';
import { MockStateFactory } from './../../../../../../../.storybook/MockStateFactory';
import { ActiveProjectService } from './../../../../../services/active-project.service';

const meta: Meta<QueryPathFormComponent> = {
  component: QueryPathFormComponent,
  title: 'Analysis/Forms/QueryPathFormComponent',
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
type Story = StoryObj<QueryPathFormComponent>;

// Setup the initial state of the story Basic
const stateBasic = new MockStateFactory();
stateBasic.addPositiveSchemaObject(
  createCrmAsGvPositiveSchema({
    ontoMocks: [
      PROFILE_5_GEOVISTORY_BASI_2022_01_18,
      PROFILE_12_BIOGRAPHICAL_BA_2022_02_09, // add basics profile
    ],
    sysConf: SysConfigValueMock.SYS_CONFIC_VALID, // add SYS_CONFIG json
    p: ProProjectMock.PROJECT_1.pk_entity, // pk project used to enable above profiles
  })
);
stateBasic.setActiveProject(ProProjectMock.PROJECT_1.pk_entity);
// project basics
stateBasic.addPositiveSchemaObject({
  pro: { project: [ProProjectMock.PROJECT_1] },
  inf: { language: [InfLanguageMock.GERMAN] },
});

export const Basic: Story = {
  args: {
    rootClasses$: of([21]),
    initVal$: of([
      {
        type: 'classes',
        data: {
          classes: [21],
        },
      },
    ]),
  },
  decorators: [
    applicationConfig({
      providers: [{ provide: INITIAL_STATE, useValue: stateBasic.state }],
    }),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.findByText(/Person/gi)).toBeTruthy();
  },
};

export const OneStep: Story = {
  args: {
    rootClasses$: of([21]),
    initVal$: of([
      {
        type: 'classes',
        data: {
          classes: [21],
        },
      },
    ]),
  },
  decorators: [
    applicationConfig({
      providers: [{ provide: INITIAL_STATE, useValue: stateBasic.state }],
    }),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const add = await canvas.findByRole('button', { name: /add/i });
    await userEvent.click(add);

    expect(canvas.findByText(/Person/gi)).toBeTruthy();
  },
};

export const TwoSteps: Story = {
  args: {
    rootClasses$: of([21]),
    initVal$: of([
      {
        type: 'classes',
        data: {
          classes: [21],
        },
      },
    ]),
  },
  decorators: [
    applicationConfig({
      providers: [{ provide: INITIAL_STATE, useValue: stateBasic.state }],
    }),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const add = await canvas.findByRole('button', { name: /add/i });
    await userEvent.click(add);

    // does not work
    await sleep(1000);
    const properties = await canvas.findByRole('button', { name: /properties/i });
    await userEvent.click(properties);

  },
};
