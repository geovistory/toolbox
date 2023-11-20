import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FieldMock, GvSchemaObjectMock, InfResourceMock, MockPaginationControllerForSandboxes, ProProjectMock, StateFacade, StateModule } from '@kleiolab/lib-redux';
import { GvFieldPageScope, SubfieldPageControllerService } from '@kleiolab/lib-sdk-lb4';
import { SocketsModule } from '@kleiolab/lib-sockets';
import { EffectsModule } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { applicationConfig, type Meta, type StoryObj } from '@storybook/angular';
import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';
import { DndModule } from '@suez/ngx-dnd';
import { BehaviorSubject } from 'rxjs';
import { playInject } from '../../../../../../.storybook/playInject';
import { sleep } from '../../../../../../.storybook/sleep';
import { ActiveProjectService } from '../../../../core/active-project/active-project.service';
import { MaterialModule } from '../../../../core/material/material.module';
import { temporalEntityListDefaultLimit } from '../../base.helpers';
import { ViewFieldBodyComponent } from './view-field-body.component';

const meta: Meta<ViewFieldBodyComponent> = {
  component: ViewFieldBodyComponent,
  title: 'ViewFieldBodyComponent',
  decorators: [applicationConfig({
    providers: [
      Store,
      ActiveProjectService,
      provideAnimations(),
      importProvidersFrom(
        DndModule.forRoot(),
        MaterialModule,
        StateModule,
        EffectsModule.forRoot(),
        SocketsModule,
        HttpClientModule),
      { provide: SubfieldPageControllerService, useClass: MockPaginationControllerForSandboxes }
    ],
  }),]
};
export default meta;
type Story = StoryObj<ViewFieldBodyComponent>;
const projectId = ProProjectMock.PROJECT_1.pk_entity;
const inProjectScope: GvFieldPageScope = { inProject: projectId }


export const stringObject: Story = {
  args: {
    showBodyOnInit: false,
    limit: temporalEntityListDefaultLimit,
    noPagination: false,
    hideNoItemsInfo: false,
    showBody$: new BehaviorSubject(true),
    dividerPosition: 'bottom',
    source: { fkInfo: InfResourceMock.NAMING_1.pk_entity },
    field: FieldMock.appeHasAppeString,
    scope: inProjectScope,
    showOntoInfo$: new BehaviorSubject(false),
    readmode$: new BehaviorSubject(false),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const facade = await playInject(canvasElement, StateFacade);
    facade.ui.activeProject.loadProjectBasiscsSucceded(projectId)
    await sleep(100)
    expect(canvas.getByText(/Jack the foo 5000/i)).toBeTruthy();
  },
};



export const NestedObject: Story = {
  args: {
    showBodyOnInit: false,
    limit: temporalEntityListDefaultLimit,
    noPagination: false,
    hideNoItemsInfo: false,
    showBody$: new BehaviorSubject(true),
    dividerPosition: 'bottom',
    showOntoInfo$: new BehaviorSubject(false),
    readmode$: new BehaviorSubject(false),
    scope: inProjectScope,
    field: FieldMock.personHasAppeTeEn,
    source: { fkInfo: InfResourceMock.PERSON_1.pk_entity },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const facade = await playInject(canvasElement, StateFacade);
    facade.ui.activeProject.loadProjectBasiscsSucceded(projectId)
    facade.data.addSchemaModifier({ positive: GvSchemaObjectMock.basicClassesAndProperties })
    facade.data.addSchemaModifier({ positive: GvSchemaObjectMock.project1 })
    facade.data.addSchemaModifier({ positive: GvSchemaObjectMock.sysConfig })
    await sleep(100)
    expect(canvas.getAllByText(/refers to name/i).length).toBe(5);
  },
};
