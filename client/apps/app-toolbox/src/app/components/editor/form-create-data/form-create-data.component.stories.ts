import { importProvidersFrom } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ActiveProjectPipesService, DatNamespaceMock, FieldMock, GvSchemaObjectMock, InfLanguageMock, InfResourceMock, InfTimePrimitiveMock, PROFILE_12_BIOGRAPHICAL_BA_2022_02_09, PROFILE_16_INTERACTIONS_S_2022_02_09, PROFILE_20_PHYSICAL_MAN_MA_2022_01_18, PROFILE_5_GEOVISTORY_BASI_2022_01_18, PROFILE_8_MARITIME_HISTOR_2022_01_18, PROFILE_97_GEOVISTORY_DIGI_2022_02_05, ProInfoProjRelMock, ProProjectMock, StateModule, SysConfigValueMock, WarEntityPreviewMock } from '@kleiolab/lib-redux';
import { INITIAL_STATE } from '@ngrx/store';
import {
  applicationConfig,
  argsToTemplate,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { FormCreateDataComponent } from './form-create-data.component';

import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';

import { createCrmAsGvPositiveSchema } from '@kleiolab/lib-redux/lib/_helpers/transformers';
import { InfLanguage, LanguagesService, WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { BehaviorSubject, Observable, delay, of } from 'rxjs';
import { MockStateFactory } from './../../../../../.storybook/MockStateFactory';
import { ActiveProjectService } from './../../../services/active-project.service';
import { appeInALangMock, birthMock, geoPlaceMock, georeferenceMock, langStringMock, personMock } from './initValue.mock';

/*****************************************************************************
 * MOCK state
 *****************************************************************************/
// Setup the initial state of the story Basic
const stateBasic = new MockStateFactory();

// mock schema objects to initialize sandboxes below
stateBasic.addPositiveSchemaObject(
  createCrmAsGvPositiveSchema({
    ontoMocks: [
      PROFILE_5_GEOVISTORY_BASI_2022_01_18, // add basics profile
      PROFILE_16_INTERACTIONS_S_2022_02_09, // add social interactions profile
      PROFILE_12_BIOGRAPHICAL_BA_2022_02_09, // add biographical profile
      PROFILE_8_MARITIME_HISTOR_2022_01_18, // add maritime profile
      PROFILE_20_PHYSICAL_MAN_MA_2022_01_18, // add phyical profile
      PROFILE_97_GEOVISTORY_DIGI_2022_02_05 // add digitals profile
    ],
    sysConf: SysConfigValueMock.SYS_CONFIC_VALID, // add SYS_CONFIG json
    p: ProProjectMock.PROJECT_1.pk_entity // pk project used to enable above profiles
  })
)
stateBasic.addPositiveSchemaObject(GvSchemaObjectMock.project1); // add project and its default language
stateBasic.setActiveProject(ProProjectMock.PROJECT_1.pk_entity); // set active project
stateBasic.addPositiveSchemaObject({
  inf: { resource: [InfResourceMock.VOLUME_UNIT_CUBIC_METER] },
  war: { entity_preview: [WarEntityPreviewMock.VOLUME_UNIT_CUBIC_METER] },
  pro: { info_proj_rel: [ProInfoProjRelMock.PROJ_1_VOLUME_UNIT_CUBIC_METER] }
})
stateBasic.addPositiveSchemaObject({
  inf: { resource: [InfResourceMock.APPE_IN_LANG_TYPE_LAST_NAME] },
  war: { entity_preview: [WarEntityPreviewMock.APPE_IN_LANG_TYPE_LAST_NAME] },
  pro: { info_proj_rel: [ProInfoProjRelMock.PROJ_1_APPE_IN_LANG_TYPE_LAST_NAME] }
})
stateBasic.addPositiveSchemaObject({
  inf: { resource: [InfResourceMock.GEO_PLACE_TYPE_CITY] },
  war: { entity_preview: [WarEntityPreviewMock.GEO_PLACE_TYPE_CITY] },
  pro: { info_proj_rel: [ProInfoProjRelMock.PROJ_1_CITY_TYPE] }
})

/*****************************************************************************
 * MOCK services
 *****************************************************************************/

/**
 * This service mocks the find-laguages REST API
 */
class LanguagesServiceMock {
  findLanguagesControllerSearchInLanguages(searchString?: string): Observable<InfLanguage[]> {

    const langs = [InfLanguageMock.GERMAN, InfLanguageMock.FRENCH]
    if (!searchString) return of(langs)
    else {
      const filtered = langs.filter(lang => lang.notes.toUpperCase().includes(searchString.toUpperCase()))
      return of(filtered)
    }
  }
}

/**
 * This service mocks the streamEntityPreview method
 */
export class ActiveProjectPipesServiceMock extends ActiveProjectPipesService {
  pkProject$ = new BehaviorSubject(ProProjectMock.PROJECT_1.pk_entity)
  datNamespaces$ = new BehaviorSubject([DatNamespaceMock.SANDBOX_NAMESPACE])

  override streamEntityPreview(pkEntity: number): Observable<WarEntityPreview> {
    // const previews = values(WarEntityPreviewMock) as WarEntityPreview[]
    const preview = [
      WarEntityPreviewMock.APPE_IN_LANG_TYPE_FIRST_NAME,
      WarEntityPreviewMock.APPE_IN_LANG_TYPE_LAST_NAME,
      WarEntityPreviewMock.PERSON_1,
      WarEntityPreviewMock.VOLUME_UNIT_CUBIC_METER,
      WarEntityPreviewMock.GEO_PLACE_TYPE_CITY
    ].find((x) => x?.pk_entity === pkEntity)
    return new BehaviorSubject(preview).pipe(delay(300))
  }
}


const meta: Meta<FormCreateDataComponent> = {
  component: FormCreateDataComponent,
  title: 'Editor/Form Elements/FormCreateDataComponent',
  decorators: [
    applicationConfig({
      providers: [
        { provide: ActiveProjectPipesService, useClass: ActiveProjectPipesServiceMock },
        { provide: LanguagesService, useClass: LanguagesServiceMock },
        provideAnimations(),
        importProvidersFrom(StateModule, MatDialogModule),
        ActiveProjectService,
      ],
    }),
  ],
  render: (args) => ({
    props: args,
    template: `
      <div class="d-flex justify-content-center mt-5">
        <div style="width:480px;height:500px" class="d-flex mr-5">
            <gv-form-create-data ${argsToTemplate(args)} #c class="w-100" (searchString)="s=$event"></gv-form-create-data>
        </div>
        <div>
            <p>searchString: {{s}}</p>
            <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
            <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
            <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
            <p>Form.value </p>
            <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
        </div>
      </div>
    `
  })
};
export default meta;
type Story = StoryObj<FormCreateDataComponent>;


const Base: Story = {
  args: {
    hideButtons: false,
    hideTitle: false,
  },
  decorators: [
    applicationConfig({
      providers: [{ provide: INITIAL_STATE, useValue: stateBasic.state }],
    }),
  ]
};
export const GeoreferenceNew: Story = {
  ...Base,
  args: {
    ...Base.args,
    pkClass: 84,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.findByText(/was a presence of/i)).toBeTruthy();
  },
};

export const GeoreferenceEdit: Story = {
  ...Base,
  args: {
    ...Base.args,
    pkClass: 84,
    initVal$: of(georeferenceMock),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.findByText(/23423/i)).toBeTruthy();
  },
};

export const appellationInALanguageTeEnNew: Story = {
  ...Base,
  args: {
    ...Base.args,
    pkClass: 365,
  },
}
export const appellationInALanguageTeEnEdit: Story = {
  ...Base,
  args: {
    ...Base.args,
    pkClass: 365,
    initVal$: of(appeInALangMock),
  },
}
export const timeSpanNew: Story = {
  ...Base,
  args: {
    ...Base.args,
    pkClass: 50,
  },
}
export const birthNew: Story = {
  ...Base,
  args: {
    ...Base.args,
    pkClass: 61,
  },
}
export const birthEdit: Story = {
  ...Base,
  args: {
    ...Base.args,
    pkClass: 61,
    initVal$: of(birthMock),
  },
}
export const joiningNew: Story = {
  ...Base,
  args: {
    ...Base.args,
    pkClass: 78,
  },
}
export const shipVoyageNew: Story = {
  ...Base,
  args: {
    ...Base.args,
    pkClass: 523,
  },
}
export const personNew: Story = {
  ...Base,
  args: {
    ...Base.args,
    pkClass: 21,
  },
}
export const personEdit: Story = {
  ...Base,
  args: {
    ...Base.args,
    pkClass: 21,
    initVal$: of(personMock),
  },
}
export const geographicalPlaceNew: Story = {
  ...Base,
  args: {
    ...Base.args,
    pkClass: 363,
  },
}
export const geographicalPlaceEdit: Story = {
  ...Base,
  args: {
    ...Base.args,
    pkClass: 363,
    initVal$: of(geoPlaceMock),
  },
}
export const manifestationSingletonNew: Story = {
  ...Base,
  args: {
    ...Base.args,
    pkClass: 220,
  },
}
export const manifestationProductTypeNew: Story = {
  ...Base,
  args: {
    ...Base.args,
    pkClass: 219,
  },
}
export const expressionPortionNew: Story = {
  ...Base,
  args: {
    ...Base.args,
    pkClass: 503,
  },
}
export const unionNew: Story = {
  ...Base,
  args: {
    ...Base.args,
    pkClass: 633,
  },
}
export const placeNew: Story = {
  ...Base,
  args: {
    ...Base.args,
    pkClass: 51,
  },
}
export const languageNew: Story = {
  ...Base,
  args: {
    ...Base.args,
    pkClass: 54,
  },
}
export const appellationNew: Story = {
  ...Base,
  args: {
    ...Base.args,
    pkClass: 40,
  },
}
export const langStringNew: Story = {
  ...Base,
  args: {
    ...Base.args,
    pkClass: 657,
  },
}
export const langStringEdit: Story = {
  ...Base,
  args: {
    ...Base.args,
    pkClass: 784,
    initVal$: of(langStringMock),
  },
}
export const dimensionNew: Story = {
  ...Base,
  args: {
    ...Base.args,
    pkClass: 52,
  },
}
export const timePrimitiveNew: Story = {
  ...Base,
  args: {
    ...Base.args,
    pkClass: 335,
  },
}
export const timePrimitiveEdit: Story = {
  ...Base,
  args: {
    ...Base.args,
    pkClass: 335,
    initVal$: of({ timePrimitive: InfTimePrimitiveMock.TP_1 }),
  }
}
export const localisationC2New: Story = {
  ...Base,
  args: {
    ...Base.args,
    pkClass: 212,
  },
}
export const definition: Story = {
  ...Base,
  args: {
    ...Base.args,
    pkClass: 9901,
  }
}

export const hasAppellation_appellationInALanguage: Story = {
  ...Base,
  args: {
    ...Base.args,
    field: FieldMock.personHasAppeTeEn,
    source: { fkInfo: 456 },
    pkClass: 365,
  }
}
export const p8HasVolume_volumeC20: Story = {
  ...Base,
  args: {
    ...Base.args,
    source: { fkInfo: 456 },
    pkClass: 716,
    field: FieldMock.componentHasVolume,
  }
}
export const wasPresentAt_place: Story = {
  ...Base,
  args: {
    ...Base.args,
    source: { fkInfo: 456 },
    pkClass: 51,
    field: FieldMock.presenceWasAtPlace,
  }
}
export const hasSpelling_spelling: Story = {
  ...Base,
  args: {
    ...Base.args,
    source: { fkInfo: 456 },
    pkClass: 40,
    field: FieldMock.appeHasAppeString,
  }
}
export const usedInLanguage_language: Story = {
  ...Base,
  args: {
    ...Base.args,
    source: { fkInfo: 456 },
    pkClass: 54,
    field: FieldMock.appeTeEnUsedInLanguage,
  }
}
export const hasDefinition_text: Story = {
  ...Base,
  args: {
    ...Base.args,
    source: { fkInfo: 456 },
    pkClass: 785,
    field: FieldMock.manifestationSingletonHasDefinition,
  }
}
export const hasPartner_person: Story = {
  ...Base,
  args: {
    ...Base.args,
    source: { fkInfo: 456 },
    pkClass: 21,
    field: FieldMock.unionHasPartner,
  }
}
export const stemsFrom_union: Story = {
  ...Base,
  args: {
    ...Base.args,
    source: { fkInfo: 456 },
    pkClass: 633,
    field: FieldMock.birthStemsFrom,
  }
}
