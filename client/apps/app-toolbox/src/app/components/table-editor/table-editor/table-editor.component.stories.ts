import { importProvidersFrom } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DatDigitalMock, InfLanguageMock, MockPaginationControllerForSandboxes, PROFILE_12_BIOGRAPHICAL_BA_2022_02_09, PROFILE_5_GEOVISTORY_BASI_2022_01_18, ProProjectMock, StateModule, SysConfigValueMock } from '@kleiolab/lib-redux';
import { createCrmAsGvPositiveSchema } from '@kleiolab/lib-redux/lib/_helpers/transformers';
import { FactoidControllerService, SubfieldPageControllerService, TableService } from '@kleiolab/lib-sdk-lb4';
import { INITIAL_STATE } from '@ngrx/store';
import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';
import { DndModule } from '@suez/ngx-dnd';
import { getCdkOverlayCanvas } from '../../../../../.storybook/getCdkOverlayCanvas';
import { ActiveAccountService } from '../../../services/active-account.service';
import { GvAuthService } from '../../../services/auth.service';
import { GvInternalStorage } from '../../../services/storage.swaps';
import { MockStateFactory } from './../../../../../.storybook/MockStateFactory';
import { ActiveProjectService } from './../../../services/active-project.service';
import { FactoidControllerMock } from './factoid-api.mock';
import { TableApiMock } from './table-api.mock';
import { TableEditorComponent } from './table-editor.component';

const meta: Meta<TableEditorComponent> = {
  component: TableEditorComponent,
  title: 'Table Editor/TableEditorComponent',
  decorators: [
    applicationConfig({
      providers: [
        provideAnimations(),
        importProvidersFrom(StateModule, MatDialogModule, DndModule.forRoot()),
        ActiveProjectService,
        ActiveAccountService,
        GvAuthService,
        GvInternalStorage,
      ],
    }),
  ],
};
export default meta;
type Story = StoryObj<TableEditorComponent>;

// Setup the initial state of the story Basic
const stateBasic = new MockStateFactory();
stateBasic.setActiveProject(ProProjectMock.SANDBOX_PROJECT.pk_entity)
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
    pkEntity: DatDigitalMock.DIGITAL_UNIONS.pk_entity,
  },
  decorators: [
    applicationConfig({
      providers: [
        { provide: TableService, useClass: TableApiMock },
        { provide: SubfieldPageControllerService, useClass: MockPaginationControllerForSandboxes },
        { provide: INITIAL_STATE, useValue: stateBasic.state }],
    }),
  ],
};

export const FilteredOnRow: Story = {
  args: {
    pkEntity: DatDigitalMock.DIGITAL_UNIONS.pk_entity,
    filterOnRow: 100
  },
  decorators: [
    applicationConfig({
      providers: [
        { provide: TableService, useClass: TableApiMock },
        { provide: SubfieldPageControllerService, useClass: MockPaginationControllerForSandboxes },
        { provide: INITIAL_STATE, useValue: stateBasic.state }],
    }),
  ],
};

export const TableConfigOpen: Story = {
  args: {
    pkEntity: DatDigitalMock.DIGITAL_UNIONS.pk_entity,
    filterOnRow: 100
  },
  decorators: [
    applicationConfig({
      providers: [
        { provide: TableService, useClass: TableApiMock },
        { provide: SubfieldPageControllerService, useClass: MockPaginationControllerForSandboxes },
        { provide: INITIAL_STATE, useValue: stateBasic.state }],
    }),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const el = await canvas.findByRole('button', { name: 'Manage columns' });
    await userEvent.click(el)
    const cdkOverlay = getCdkOverlayCanvas(canvasElement);
    const dialogTxt = await cdkOverlay.findByText(/Table configuration/i)
    expect(dialogTxt).toBeTruthy();
  },
};


export const FactoidMappingOpen: Story = {
  args: {
    pkEntity: DatDigitalMock.DIGITAL_UNIONS.pk_entity,
    filterOnRow: 100
  },
  decorators: [
    applicationConfig({
      providers: [
        { provide: INITIAL_STATE, useValue: stateBasic.state },
        { provide: TableService, useClass: TableApiMock },
        { provide: SubfieldPageControllerService, useClass: MockPaginationControllerForSandboxes },
        { provide: FactoidControllerService, useClass: FactoidControllerMock },
      ],
    }),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const el = await canvas.findByRole('button', { name: 'Factoid mapping' });
    await userEvent.click(el)
    const cdkOverlay = getCdkOverlayCanvas(canvasElement);
    const dialogTxt = await cdkOverlay.findByText(/Factoid mappings/i)
    expect(dialogTxt).toBeTruthy();
  },
};



export const FiltersAcitvated: Story = {
  args: {
    pkEntity: DatDigitalMock.DIGITAL_UNIONS.pk_entity,
  },
  decorators: [
    applicationConfig({
      providers: [
        { provide: INITIAL_STATE, useValue: stateBasic.state },
        { provide: TableService, useClass: TableApiMock },
        { provide: SubfieldPageControllerService, useClass: MockPaginationControllerForSandboxes },
        { provide: FactoidControllerService, useClass: FactoidControllerMock },
      ],
    }),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const el = await canvas.findByRole('checkbox', { name: 'Filters' });
    await userEvent.click(el)
    expect(canvas.findByText('"="')).toBeTruthy();
  },
};
