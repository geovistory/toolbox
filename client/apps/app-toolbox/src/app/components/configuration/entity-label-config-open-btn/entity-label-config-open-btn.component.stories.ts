import { importProvidersFrom } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { provideAnimations } from '@angular/platform-browser/animations';
import { InfLanguageMock, PK_DEFAULT_CONFIG_PROJECT, PROFILE_12_BIOGRAPHICAL_BA_2022_02_09, PROFILE_5_GEOVISTORY_BASI_2022_01_18, ProProjectMock, StateModule, SysConfigValueMock } from '@kleiolab/lib-redux';
import { INITIAL_STATE } from '@ngrx/store';
import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { EntityLabelConfigOpenBtnComponent } from './entity-label-config-open-btn.component';

import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';

import { HttpEvent, HttpResponse } from '@angular/common/http';
import { createCrmAsGvPositiveSchema } from '@kleiolab/lib-redux/lib/_helpers/transformers';
import { GetEntityLabelConfigResponse, ProjectConfigurationService } from '@kleiolab/lib-sdk-lb4';
import { getCdkOverlayCanvas } from 'apps/app-toolbox/.storybook/getCdkOverlayCanvas';
import { Observable, of } from 'rxjs';
import { MockStateFactory } from './../../../../../.storybook/MockStateFactory';
import { ActiveProjectService } from './../../../services/active-project.service';

const meta: Meta<EntityLabelConfigOpenBtnComponent> = {
  component: EntityLabelConfigOpenBtnComponent,
  title: 'Configuration/EntityLabelConfigOpenBtnComponent',
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
type Story = StoryObj<EntityLabelConfigOpenBtnComponent>;

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
class MockProjectConfigurationService extends ProjectConfigurationService {
  override createProjectConfigControllerGetEntityLabelConfig(pkProject?: number, fkClass?: number, observe?: 'body', reportProgress?: boolean, options?: { httpHeaderAccept?: 'application/json' }): Observable<GetEntityLabelConfigResponse>;
  override createProjectConfigControllerGetEntityLabelConfig(pkProject?: number, fkClass?: number, observe?: 'response', reportProgress?: boolean, options?: { httpHeaderAccept?: 'application/json' }): Observable<HttpResponse<GetEntityLabelConfigResponse>>;
  override createProjectConfigControllerGetEntityLabelConfig(pkProject?: number, fkClass?: number, observe?: 'events', reportProgress?: boolean, options?: { httpHeaderAccept?: 'application/json' }): Observable<HttpEvent<GetEntityLabelConfigResponse>>;
  override createProjectConfigControllerGetEntityLabelConfig(pkProject?: number, fkClass?: number, observe: any = 'body', reportProgress = false, options?: { httpHeaderAccept?: 'application/json' }): Observable<any> {
    const config: GetEntityLabelConfigResponse = {
      customConfig: {
        fk_project: 3001,
        fk_class: 21,
        config: {
          labelParts: [
            { field: { fkProperty: 1111, isOutgoing: false, nrOfStatementsInLabel: 1 } }
          ]
        },
        pk_entity: 123
      },
      defaultConfig: {
        fk_class: 21,
        fk_project: PK_DEFAULT_CONFIG_PROJECT,
        config: {
          labelParts: [
            { field: { fkProperty: 1111, isOutgoing: false, nrOfStatementsInLabel: 1 } }
          ]
        }
      }
    }
    return of(config)
  }

}
export const Basic: Story = {
  args: {
    fkClass: 21,
  },
  render: (args) => ({
    props: args,
    template: `<gv-entity-label-config-open-btn [fkClass]="fkClass">
                <button>open</button>
              </gv-entity-label-config-open-btn>`
  }),
  decorators: [
    applicationConfig({
      providers: [
        { provide: INITIAL_STATE, useValue: stateBasic.state },
        { provide: ProjectConfigurationService, useClass: MockProjectConfigurationService }
      ],
    }),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttonEl = canvas.getByRole('button');
    await userEvent.click(buttonEl)
    const overlayCanvas = getCdkOverlayCanvas(canvasElement)

    expect(
      overlayCanvas.getByText(/Configure Person labels/gi)
    ).toBeTruthy();
  },
};
