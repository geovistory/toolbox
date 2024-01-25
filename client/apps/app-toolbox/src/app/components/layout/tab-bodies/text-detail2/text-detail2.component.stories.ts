import { importProvidersFrom, Injectable } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ActiveProjectPipesService, DatNamespaceMock, GvPaginationObjectMock, GvSchemaObjectMock, InfResourceMock, MockProjectDataService, PanelTab, PROFILE_5_GEOVISTORY_BASI_2022_01_18, PROFILE_97_GEOVISTORY_DIGI_2022_02_05, ProProjectMock, StateFacade, StateModule, SysConfigValueMock, WarEntityPreviewMock } from '@kleiolab/lib-redux';
import { INITIAL_STATE } from '@ngrx/store';
import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { TextDetail2Component, TextDetail2Config } from './text-detail2.component';

import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';

import { createCrmAsGvPositiveSchema } from '@kleiolab/lib-redux/lib/_helpers/transformers';
import { GvFieldPageReq, GvPaginationObject, ProjectDataService, SubfieldPageControllerService, WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { DndModule } from '@suez/ngx-dnd';
import { values } from 'ramda';
import { BehaviorSubject, delay, map, Observable, Subject } from 'rxjs';
import { TabLayoutService } from '../../../../services/tab-layout.service';
import { MockStateFactory } from './../../../../../../.storybook/MockStateFactory';
import { ActiveProjectService } from './../../../../services/active-project.service';

const meta: Meta<TextDetail2Component> = {
  component: TextDetail2Component,
  title: 'TextDetail2Component',
  decorators: [
    applicationConfig({
      providers: [
        provideAnimations(),
        importProvidersFrom(StateModule, MatDialogModule, DndModule.forRoot()),
        ActiveProjectService,
        TabLayoutService
      ],
    }),
  ],
};
export default meta;
type Story = StoryObj<TextDetail2Component>;

// Setup the initial state of the story Basic
const stateBasic = new MockStateFactory();
const tabId = 't1'
const tabData: TextDetail2Config = {
  pkEntity: InfResourceMock.DEFINITION_1.pk_entity,
}
const tab: PanelTab<TextDetail2Config> = {
  active: true,
  component: 'entity',
  icon: 'persistent-item',
  data: tabData
}
stateBasic.state.ui = {
  activeProject: {
    pk_project: ProProjectMock.PROJECT_1.pk_entity,
    panels: [
      {
        id: 0,
        tabs: [tab]
      }
    ],
    tabLayouts: {
      [tabId]: {
        layoutMode: 'both'
      }
    }
  }
};
stateBasic.addPositiveSchemaObject(
  createCrmAsGvPositiveSchema({
    ontoMocks: [
      PROFILE_5_GEOVISTORY_BASI_2022_01_18, // add basics profile
      PROFILE_97_GEOVISTORY_DIGI_2022_02_05
    ],
    sysConf: SysConfigValueMock.SYS_CONFIC_VALID, // add SYS_CONFIG json
    p: ProProjectMock.PROJECT_1.pk_entity // pk project used to enable above profiles
  })
)
stateBasic.addPositiveSchemaObject(GvSchemaObjectMock.project1)


/**
 * This service mocks the streamEntityPreview method
 */
@Injectable()
export class ActiveProjectPipesServiceMock extends ActiveProjectPipesService {
  pkProject$ = new BehaviorSubject(ProProjectMock.PROJECT_1.pk_entity)
  datNamespaces$ = new BehaviorSubject([DatNamespaceMock.SANDBOX_NAMESPACE])

  override streamEntityPreview(): Observable<WarEntityPreview> {
    return new BehaviorSubject(WarEntityPreviewMock.DEFINITION_1).pipe(delay(300))
  }
}
class MockPaginatedStatementsControllerService {
  first = true;
  subfieldPageControllerLoadSubfieldPages(gvLoadSubfieldPageReq?: GvFieldPageReq[]): Observable<GvPaginationObject> {
    if (values(gvLoadSubfieldPageReq[0].targets)[0].appellation) {
      return new BehaviorSubject(GvPaginationObjectMock.definitionHasValueVersion).pipe(
        delay(800),
        map(value => {
          // if (this.first) {
          //   this.first = false;
          //   throw new Error('random error');
          // }
          return value
        })
      );
    }
    // throw new Error('mock not implemented for this request');
  }
}
@Injectable()
class TabLayoutMock extends TabLayoutService {
  constructor(protected override state: StateFacade) {
    super(state)
    this.create(tabId, null, new Subject())
  }
}


export const Basic: Story = {
  args: {
    tab: {
      panelId: 0,
      panelIndex: 0,
      tabIndex: 0,
      ...tab
    }
  },
  decorators: [
    applicationConfig({
      providers: [
        { provide: SubfieldPageControllerService, useClass: MockPaginatedStatementsControllerService },
        { provide: ActiveProjectPipesService, useClass: ActiveProjectPipesServiceMock },
        { provide: ProjectDataService, useValue: new MockProjectDataService([InfResourceMock.DEFINITION_1]) },
        { provide: TabLayoutService, useClass: TabLayoutMock },
        { provide: INITIAL_STATE, useValue: stateBasic.state }],
    }),

  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/text-detail2 works!/gi)).toBeTruthy();
  },
};
