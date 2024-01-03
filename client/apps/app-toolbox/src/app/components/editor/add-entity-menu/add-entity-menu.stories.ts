import { applicationConfig, type Meta, type StoryObj } from '@storybook/angular';

import { importProvidersFrom } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { provideAnimations } from '@angular/platform-browser/animations';
import { GvSchemaObjectMock, IAppState, InfResourceMock, PROFILE_12_BIOGRAPHICAL_BA_2022_02_09, PROFILE_16_INTERACTIONS_S_2022_02_09, PROFILE_20_PHYSICAL_MAN_MA_2022_01_18, PROFILE_5_GEOVISTORY_BASI_2022_01_18, PROFILE_8_MARITIME_HISTOR_2022_01_18, ProInfoProjRelMock, ProProjectMock, StateModule, SysConfigValueMock, WarEntityPreviewMock } from '@kleiolab/lib-redux';
import { createCrmAsGvPositiveSchema } from '@kleiolab/lib-redux/lib/_helpers/transformers';
import { schemaModifierActions } from '@kleiolab/lib-redux/lib/redux-store/data/data.actions';
import { dataRootReducers } from '@kleiolab/lib-redux/lib/redux-store/data/data.reducer';
import { GvSchemaModifier } from '@kleiolab/lib-sdk-lb4';
import { INITIAL_STATE, Store } from '@ngrx/store';
import { within } from '@storybook/testing-library';
import { DragDropConfig } from '@suez/ngx-dnd';
import { firstValueFrom } from 'rxjs';
import { mergeSchemaModifier } from '../../../../../.storybook/mergeSchemaModifier';
import { playInject } from '../../../../../.storybook/playInject';
import { ActiveProjectService } from '../../../services/active-project.service';
import { AddEntityMenuComponent } from './add-entity-menu.component';

const meta: Meta<AddEntityMenuComponent> = {
  component: AddEntityMenuComponent,
  title: 'AddEntityMenuComponent',
  decorators: [
    applicationConfig({
      providers: [
        provideAnimations(),
        importProvidersFrom(
          StateModule,
          MatDialogModule
        ),
        DragDropConfig,
        ActiveProjectService,
      ],
    }),
  ]
};
export default meta;


type Story = StoryObj<AddEntityMenuComponent>;

// Declare schema modidier
let x: GvSchemaModifier = {}

// Add data related to the conceptual data model
x = mergeSchemaModifier(x, {
  positive: createCrmAsGvPositiveSchema({
    ontoMocks: [
      PROFILE_5_GEOVISTORY_BASI_2022_01_18, // add basics profile
      PROFILE_16_INTERACTIONS_S_2022_02_09, // add social interactions profile
      PROFILE_12_BIOGRAPHICAL_BA_2022_02_09, // add biographical profile
      PROFILE_8_MARITIME_HISTOR_2022_01_18, // add maritime profile
      PROFILE_20_PHYSICAL_MAN_MA_2022_01_18 // add phyical profile
    ],
    sysConf: SysConfigValueMock.SYS_CONFIC_VALID, // add SYS_CONFIG json
    p: ProProjectMock.PROJECT_1.pk_entity // pk project used to enable above profiles
  })
})

// Add data related to the active project
x = mergeSchemaModifier(x, { positive: GvSchemaObjectMock.project1 })

// Add types
x = mergeSchemaModifier(x, {
  positive: {
    inf: {
      resource: [
        InfResourceMock.TYPE_OF_MANIF_PROD_TYPE_BOOK,
        InfResourceMock.TYPE_OF_MANIF_PROD_TYPE_JOURNAL,
      ]
    },
    war: {
      entity_preview: [
        WarEntityPreviewMock.TYPE_OF_MANIF_PROD_TYPE_BOOK,
        WarEntityPreviewMock.TYPE_OF_MANIF_PROD_TYPE_JOURNAL,
      ]
    },
    pro: {
      info_proj_rel: [
        ProInfoProjRelMock.PROJ_1_TYPE_OF_MANIF_PROD_TYPE_BOOK,
        ProInfoProjRelMock.PROJ_1_TYPE_OF_MANIF_PROD_TYPE_JOURNAL,
      ]
    }
  }
})
console.log('x', x)

// Modify the (empty) data state according to the SchemaModifier (x)
const dataState = dataRootReducers({}, schemaModifierActions.succeeded({ payload: x }))

// Create the initial state
const initState: IAppState = {
  ui: { activeProject: { pk_project: ProProjectMock.PROJECT_1.pk_entity } },
  data: dataState
}

/**
 * This example shows the basic usage.
 */
export const Main: Story = {
  args: {
    enabledIn: 'sources'
  },

  decorators: [
    applicationConfig({
      providers: [{ provide: INITIAL_STATE, useValue: initState }]
    })
  ],
  play: async ({ canvasElement }) => {
    // const state = await playInject(canvasElement, StateFacade)
    const store = await playInject<Store<IAppState>>(canvasElement, Store<IAppState>)

    // // set project id
    // state.ui.activeProject.loadProjectBasiscsSucceded(1)
    // // add class 21 in profile 1
    // state.data.dfh.klass.loadSucceeded([{ pk_class: 21, profiles: [{ fk_profile: 1, removed_from_api: false }], parent_classes: [70], ancestor_classes: [] }], '')
    // // add profile 1 to project 2
    // state.data.pro.dfhProfileProjRel.loadSucceeded([{ fk_profile: 1, fk_project: 1, enabled: true, pk_entity: 99 }], '')
    // // add sys config to map class to icon
    // state.data.sys.config.loadSucceeded([{ classes: { 21: { icon: 'persistent-item' } }, specialFields: {}, }], '')

    const canvas = within(canvasElement);

    console.log(await firstValueFrom(store.select(s => s)))

    // expect(canvas.getByText(/Jack/)).toBeTruthy();
    // expect(canvas.getByText(/Person/)).toBeTruthy();
    // const menuTrigger = canvas.getByTestId('menu-trigger');
    // await userEvent.click(menuTrigger)
    // const cdkOverlay = getCdkOverlayCanvas(canvasElement);
    // expect(cdkOverlay.getByText(/Open Jack.*in new/)).toBeTruthy();
  },

};
