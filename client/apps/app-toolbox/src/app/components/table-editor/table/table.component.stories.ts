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
import { TableComponent } from './table.component';

import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';

import { createCrmAsGvPositiveSchema } from '@kleiolab/lib-redux/lib/_helpers/transformers';
import { BehaviorSubject, of } from 'rxjs';
import { getCdkOverlayCanvas } from '../../../../../.storybook/getCdkOverlayCanvas';
import { MockStateFactory } from './../../../../../.storybook/MockStateFactory';
import { ActiveProjectService } from './../../../services/active-project.service';

const meta: Meta<TableComponent> = {
  component: TableComponent,
  title: 'TableComponent',
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
type Story = StoryObj<TableComponent>;

// Setup the initial state of the story Basic
const stateBasic = new MockStateFactory();
stateBasic.setActiveProject(ProProjectMock.SANDBOX_PROJECT.pk_entity)
stateBasic.addPositiveSchemaObject({ sys: { config: [SysConfigValueMock.SYS_CONFIC_VALID] } })
stateBasic.addPositiveSchemaObject(createCrmAsGvPositiveSchema({
  ontoMocks: [
    PROFILE_5_GEOVISTORY_BASI_2022_01_18,
    PROFILE_12_BIOGRAPHICAL_BA_2022_02_09
  ],
  sysConf: SysConfigValueMock.SYS_CONFIC_VALID,
  p: ProProjectMock.SANDBOX_PROJECT.pk_entity
}))
stateBasic.addPositiveSchemaObject({
  pro: {
    project: [ProProjectMock.SANDBOX_PROJECT],
    dfh_class_proj_rel: [
      {
        pk_entity: 7001,
        fk_project: ProProjectMock.SANDBOX_PROJECT.pk_entity,
        fk_class: 21,
        enabled_in_entities: true
      },
      {
        pk_entity: 7002,
        fk_project: ProProjectMock.SANDBOX_PROJECT.pk_entity,
        fk_class: 61,
        enabled_in_entities: true
      },

    ]
  },
  inf: { language: [InfLanguageMock.ENGLISH] }
})
export const Basic: Story = {
  args: {
    pkProject: 0,
    pkDigital: 0,
    loading: false,
    filteringEnabled: false,
    sortingEnabled: false,
    lineBreak: false,
    origin: 'classic',
    headers$: new BehaviorSubject([
      {
        colLabel: 'Name',
        comment: 'Name of the person',
        type: 'string',
        pk_column: 12
      },
      {
        colLabel: 'Birthdate',
        comment: 'Birth date of the person',
        type: 'string',
        pk_column: 13
      }
    ]),
    table$: new BehaviorSubject([
      [{ text: 'A', pkCell: 1, pkRow: 1, pkColumn: 12 }, { text: '1 Feb. 1988', pkCell: 2, pkRow: 1, pkColumn: 13 }],
      [{ text: 'B', pkCell: 3, pkRow: 2, pkColumn: 12 }, { text: '12. Nov. 1765', pkCell: 4, pkRow: 2, pkColumn: 13 }],
    ])
  },
  decorators: [
    applicationConfig({
      providers: [{ provide: INITIAL_STATE, useValue: stateBasic.state }],
    }),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.findByText(/Birthdate/i)).toBeTruthy();
  },
};


export const NewRow: Story = {
  args: {
    pkProject: 0,
    pkDigital: 0,
    loading: false,
    filteringEnabled: false,
    sortingEnabled: false,
    lineBreak: false,
    origin: 'classic',
    newRow: {
      position: 2,
      cells: [
        { text: '2', pkCell: 1, pkRow: 1, pkColumn: 12 }, { text: '1 Feb. 1988', pkCell: 2, pkRow: 1, pkColumn: 13 }],
    },
    headers$: new BehaviorSubject([
      {
        colLabel: 'Name',
        comment: 'Name of the person',
        type: 'string',
        pk_column: 12
      },
      {
        colLabel: 'Birthdate',
        comment: 'Birth date of the person',
        type: 'string',
        pk_column: 13
      }
    ]),
    table$: new BehaviorSubject([
      [{ text: '1', pkCell: 1, pkRow: 1, pkColumn: 12 }, { text: '1 Feb. 1988', pkCell: 2, pkRow: 1, pkColumn: 13 }],
      [{ text: '2', pkCell: 3, pkRow: 2, pkColumn: 12 }, { text: '12. Nov. 1765', pkCell: 4, pkRow: 2, pkColumn: 13 }],
    ])
  },
  decorators: [
    applicationConfig({
      providers: [{ provide: INITIAL_STATE, useValue: stateBasic.state }],
    }),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/New row at position 2/i)).toBeTruthy();
  },
};


export const EditMode: Story = {
  args: {
    pkProject: 0,
    pkDigital: 0,
    loading: false,
    filteringEnabled: false,
    sortingEnabled: false,
    lineBreak: false,
    origin: 'classic',
    readmode$: of(false),
    headers$: new BehaviorSubject([
      {
        colLabel: 'Name',
        comment: 'Name of the person',
        type: 'string',
        pk_column: 12
      },
      {
        colLabel: 'Birthdate',
        comment: 'Birth date of the person',
        type: 'string',
        pk_column: 13
      }
    ]),
    table$: new BehaviorSubject([
      [{ text: '1', pkCell: 1, pkRow: 1, pkColumn: 12 }, { text: '1 Feb. 1988', pkCell: 2, pkRow: 1, pkColumn: 13 }],
      [{ text: '2', pkCell: 3, pkRow: 2, pkColumn: 12 }, { text: '12. Nov. 1765', pkCell: 4, pkRow: 2, pkColumn: 13 }],
    ])
  },
  decorators: [
    applicationConfig({
      providers: [{ provide: INITIAL_STATE, useValue: stateBasic.state }],
    }),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const btn = await canvas.findByRole('button', { name: /Map a Class/ })
    await userEvent.click(btn)
    const cdkOverlay = getCdkOverlayCanvas(canvasElement);
    expect(cdkOverlay.findByText(/Map column/i)).toBeTruthy();
  },
};
