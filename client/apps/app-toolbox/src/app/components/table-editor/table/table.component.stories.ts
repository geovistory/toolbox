import { importProvidersFrom } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { provideAnimations } from '@angular/platform-browser/animations';
import { StateModule, SysConfigValueMock } from '@kleiolab/lib-redux';
import { INITIAL_STATE } from '@ngrx/store';
import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { TableComponent } from './table.component';

import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';

import { BehaviorSubject, of } from 'rxjs';
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
stateBasic.addPositiveSchemaObject({ sys: { config: [SysConfigValueMock.SYS_CONFIC_VALID] } })

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
    expect(canvas.getByText(/table works!/gi)).toBeTruthy();
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
    expect(canvas.getByText(/table works!/gi)).toBeTruthy();
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
    expect(canvas.getByText(/table works!/gi)).toBeTruthy();
  },
};
