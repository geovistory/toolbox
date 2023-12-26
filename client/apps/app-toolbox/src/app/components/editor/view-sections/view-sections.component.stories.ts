import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { provideAnimations } from '@angular/platform-browser/animations';
import { GvSchemaObjectMock, InfLanguageMock, InfResourceMock, MockPaginationControllerForSandboxes, PROFILE_12_BIOGRAPHICAL_BA_2022_02_09, PROFILE_16_INTERACTIONS_S_2022_02_09, PROFILE_20_PHYSICAL_MAN_MA_2022_01_18, PROFILE_5_GEOVISTORY_BASI_2022_01_18, PROFILE_8_MARITIME_HISTOR_2022_01_18, ProInfoProjRelMock, StateFacade, StateModule, SysConfigValueMock, WarEntityPreviewMock } from '@kleiolab/lib-redux';
import { createCrmAsGvPositiveSchema } from '@kleiolab/lib-redux/lib/_helpers/transformers';
import { GvFieldPageReq, GvPaginationObject, GvPositiveSchemaObject, SubfieldPageControllerService } from '@kleiolab/lib-sdk-lb4';
import { SocketsModule } from '@kleiolab/lib-sockets';
import { EffectsModule } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { applicationConfig, type Meta, type StoryObj } from '@storybook/angular';
import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';
import { DndModule } from '@suez/ngx-dnd';
import { Observable, of } from 'rxjs';
import { playInject } from '../../../../../.storybook/playInject';
import { sleep } from '../../../../../.storybook/sleep';
import { ActiveProjectService } from '../../../services/active-project.service';
import { response1 } from './testing/response1';
import { response2 } from './testing/response2';
import { ViewSectionsComponent } from './view-sections.component';
const meta: Meta<ViewSectionsComponent> = {
  component: ViewSectionsComponent,
  title: 'ViewSectionsComponent',
  decorators: [applicationConfig({
    providers: [
      Store,
      ActiveProjectService,
      provideAnimations(),
      importProvidersFrom(
        MatDialogModule,
        DndModule.forRoot(),
        StateModule,
        EffectsModule.forRoot(),
        SocketsModule,
        HttpClientModule),
      { provide: SubfieldPageControllerService, useClass: MockPaginationControllerForSandboxes }
    ],
  }),]
};
export default meta;
type Story = StoryObj<ViewSectionsComponent>;

class MockLargeData {
  requestNr = 1;
  subfieldPageControllerLoadSubfieldPages(gvLoadSubfieldPageReqs?: GvFieldPageReq[]): Observable<GvPaginationObject> {
    console.log(`MockLargeData called ${this.requestNr} times`);
    if (this.requestNr === 1) {
      this.requestNr++;
      return of(response1)
    }
    if (this.requestNr === 2) {
      return of(response2)
    }
  }
}

const volumeDimensionMock: GvPositiveSchemaObject = {
  inf: { resource: [InfResourceMock.VOLUME_UNIT_CUBIC_METER] },
  war: { entity_preview: [WarEntityPreviewMock.VOLUME_UNIT_CUBIC_METER] },
  pro: { info_proj_rel: [ProInfoProjRelMock.PROJ_1_VOLUME_UNIT_CUBIC_METER] }
}
const appeTypeMock: GvPositiveSchemaObject = {
  inf: { resource: [InfResourceMock.APPE_IN_LANG_TYPE_LAST_NAME] },
  war: { entity_preview: [WarEntityPreviewMock.APPE_IN_LANG_TYPE_LAST_NAME] },
  pro: { info_proj_rel: [ProInfoProjRelMock.PROJ_1_APPE_IN_LANG_TYPE_LAST_NAME] }
}
const project: GvPositiveSchemaObject = {
  inf: { language: [InfLanguageMock.ITALIAN] },
  pro: { project: [{ pk_entity: 591, fk_language: InfLanguageMock.ITALIAN.pk_entity }] }
};
const objects = [
  createCrmAsGvPositiveSchema({
    ontoMocks: [
      PROFILE_5_GEOVISTORY_BASI_2022_01_18, // add basics profile
      PROFILE_16_INTERACTIONS_S_2022_02_09, // add social interactions profile
      PROFILE_12_BIOGRAPHICAL_BA_2022_02_09, // add biographical profile
      PROFILE_8_MARITIME_HISTOR_2022_01_18, // add maritime profile
      PROFILE_20_PHYSICAL_MAN_MA_2022_01_18 // add phyical profile
    ],
    sysConf: SysConfigValueMock.SYS_CONFIC_VALID, // add SYS_CONFIG json
    p: 591 // pk project used to enable above profiles
  }),
  GvSchemaObjectMock.project1, // add project and its default language
  volumeDimensionMock,
  appeTypeMock,
  project
];
export const ResponseTwoTimes: Story = {
  args: {
    pkClass$: of(21),
    source: { fkInfo: 765182 },
    showOntoInfo$: of(false),
    scope: { inProject: 591 },
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
    objects.forEach(o => {
      facade.data.addSchemaModifier({ positive: o })
    })

    await sleep(1000)
    expect(canvas.getByText(/Adamo di Melchiorre/i)).toBeTruthy();
  },
};

class MockLargeDataOnce {
  requestNr = 1;
  subfieldPageControllerLoadSubfieldPages(gvLoadSubfieldPageReqs?: GvFieldPageReq[]): Observable<GvPaginationObject> {
    console.log(`MockLargeDataOnce called ${this.requestNr} times`);
    if (this.requestNr === 1) {
      this.requestNr++;
      return of(response2)
    }
    if (this.requestNr === 2) {
      return of({ subfieldPages: [] })
    }
  }
}

export const ResonseOnce: Story = {
  args: {
    pkClass$: of(21),
    source: { fkInfo: 765182 },
    showOntoInfo$: of(false),
    scope: { inProject: 591 },
  },
  decorators: [
    applicationConfig({
      providers: [
        { provide: SubfieldPageControllerService, useClass: MockLargeDataOnce },
      ]
    })
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const facade = await playInject(canvasElement, StateFacade);
    facade.ui.activeProject.loadProjectBasiscsSucceded(591)
    objects.forEach(o => {
      facade.data.addSchemaModifier({ positive: o })
    })

    await sleep(100)
    expect(canvas.getByText(/Adamo di Melchiorre/i)).toBeTruthy();
  },
};
