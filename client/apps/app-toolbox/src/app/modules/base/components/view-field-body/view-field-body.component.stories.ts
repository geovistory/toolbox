import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FieldMock, GvSchemaObjectMock, InfLanguageMock, InfResourceMock, MockPaginationControllerForSandboxes, ProProjectMock, StateFacade, StateModule } from '@kleiolab/lib-redux';
import { GvFieldPageReq, GvFieldPageScope, GvPaginationObject, SubfieldPageControllerService } from '@kleiolab/lib-sdk-lb4';
import { SocketsModule } from '@kleiolab/lib-sockets';
import { EffectsModule } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { applicationConfig, type Meta, type StoryObj } from '@storybook/angular';
import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';
import { DndModule } from '@suez/ngx-dnd';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { playInject } from '../../../../../../.storybook/playInject';
import { sleep } from '../../../../../../.storybook/sleep';
import { MaterialModule } from '../../../../core/material/material.module';
import { ActiveProjectService } from '../../../../shared/services/active-project.service';
import { temporalEntityListDefaultLimit } from '../../base.helpers';
import { response1 } from './testing/response1';
import { response2 } from './testing/response2';
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

class MockLargeData {
  requestNr = 1;
  subfieldPageControllerLoadSubfieldPages(gvLoadSubfieldPageReqs?: GvFieldPageReq[]): Observable<GvPaginationObject> {
    console.log('MockLargeData called');
    if (this.requestNr === 1) {
      this.requestNr++;
      return of(response1)
    }
    if (this.requestNr === 2) {
      return of(response2)
    }
  }
}

export const LargeData: Story = {
  args: {
    showBodyOnInit: false,
    limit: temporalEntityListDefaultLimit,
    noPagination: false,
    hideNoItemsInfo: false,
    showBody$: new BehaviorSubject(true),
    dividerPosition: 'bottom',
    showOntoInfo$: new BehaviorSubject(false),
    readmode$: new BehaviorSubject(false),
    scope: { inProject: 591 },
    field: FieldMock.personHasAppeTeEn,
    source: { fkInfo: 765182 },
  },
  decorators: [
    applicationConfig({
      providers: [
        { provide: SubfieldPageControllerService, useClass: MockLargeData },
      ]
    })
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const facade = await playInject(canvasElement, StateFacade);
    facade.ui.activeProject.loadProjectBasiscsSucceded(591)
    facade.data.addSchemaModifier({ positive: GvSchemaObjectMock.basicClassesAndProperties })
    facade.data.addSchemaModifier({
      positive: {
        inf: {
          language: [
            InfLanguageMock.ITALIAN
          ]
        },
        pro: {
          project: [
            {
              pk_entity: 591,
              fk_language: InfLanguageMock.ITALIAN.pk_entity
            }
          ]
        }
      }
    })
    facade.data.addSchemaModifier({ positive: GvSchemaObjectMock.sysConfig })
    await sleep(100)
    expect(canvas.getByText(/Adamo di Melchiorre/i)).toBeTruthy();
  },
};




class MockStandalone {
  requestNr = 1;
  subfieldPageControllerLoadSubfieldPages(gvLoadSubfieldPageReqs?: GvFieldPageReq[]): Observable<GvPaginationObject> {
    console.log('MockStandalone called');
    const pagObj: GvPaginationObject = {
      subfieldPages: [
        {
          count: 1,
          paginatedStatements: [
            {
              statement: {
                pk_entity: 66,
                fk_subject_info: 77,
                fk_property: 123,
                fk_object_info: 88
              },
              targetLabel: 'Target Label',
              targetClass: 11,
              target: {
                appellation: {
                  fk_class: 11,
                  string: 'Target Label'
                }
              },
              isOutgoing: true,
              projRel: {
                fk_entity: 66,
                fk_project: 1,
                is_in_project: true
              }
            }
          ],
          req: {
            page: {
              isOutgoing: true,
              limit: 1,
              offset: 0,
              property: { fkProperty: 123 },
              scope: { inProject: 1 },
              source: { fkInfo: 77 }
            },
            pkProject: 1,
            targets: {
              11: {
                appellation: 'true'
              }
            }
          }
        },
      ]
    }
    if (this.requestNr === 1) {
      this.requestNr++;

      return of(pagObj)
    }
    if (this.requestNr === 2) {
      return of(pagObj)
    }
  }
}

export const Standalone: Story = {
  args: {
    showBodyOnInit: false,
    limit: temporalEntityListDefaultLimit,
    noPagination: false,
    hideNoItemsInfo: false,
    showBody$: new BehaviorSubject(true),
    dividerPosition: 'bottom',
    showOntoInfo$: new BehaviorSubject(false),
    readmode$: new BehaviorSubject(false),
    scope: { inProject: 1 },
    field: {
      allSubfieldsRemovedFromAllProfiles: false,
      display: { viewSections: { specific: { position: 1 } } },
      identityDefiningForSource: false,
      identityDefiningForTarget: false,
      isHasTypeField: false,
      isOutgoing: true,
      isSpecialField: false,
      isTimeSpanShortCutField: false,
      label: 'field label',
      ontoInfoLabel: 'P123',
      ontoInfoUrl: 'https://ontome.net',
      property: { fkProperty: 123 },
      sourceClass: 22,
      sourceClassLabel: 'Source Class',
      sourceMaxQuantity: 1,
      sourceMinQuantity: 2,
      targetClasses: [11],
      targetMaxQuantity: 1,
      targetMinQuantity: 1,
      targets: {
        "11": {
          viewType: { appellation: 'true' },
          formControlType: { appellation: 'true' },
          removedFromAllProfiles: false,
          targetClass: 11,
          targetClassLabel: 'Target Class'
        }
      }
    },
    source: { fkInfo: 77 },
  },
  decorators: [
    applicationConfig({
      providers: [
        { provide: SubfieldPageControllerService, useClass: MockStandalone },
      ]
    })
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const facade = await playInject(canvasElement, StateFacade);
    facade.ui.activeProject.loadProjectBasiscsSucceded(1)
    facade.data.addSchemaModifier({ positive: GvSchemaObjectMock.basicClassesAndProperties })
    facade.data.addSchemaModifier({
      positive: {
        inf: {
          language: [
            InfLanguageMock.ITALIAN
          ]
        },
        pro: {
          project: [
            {
              pk_entity: 1,
              fk_language: InfLanguageMock.ITALIAN.pk_entity
            }
          ]
        }
      }
    })
    facade.data.addSchemaModifier({ positive: GvSchemaObjectMock.sysConfig })
    await sleep(100)
    expect(canvas.getByText(/Target Label/i)).toBeTruthy();
  },
};
