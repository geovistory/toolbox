import { importProvidersFrom } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ConfigurationPipesService, StateModule } from '@kleiolab/lib-redux';
import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { SearchExistingEntityComponent, SearchExistingEntityListMode } from './search-existing-entity.component';


import { WareEntityPreviewPage, WarEntityPreviewControllerService, WarEntityPreviewSearchExistingReq } from '@kleiolab/lib-sdk-lb4';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ActiveProjectService } from './../../../services/active-project.service';


/*****************************************************************************
 * MOCK services
 *****************************************************************************/
class ConfigurationPipesServiceMock {
  pipeClassLabel(pkClass: number): Observable<string> {
    if (pkClass == 21) return of('Person')
  }
}
class ActiveProjectServiceMock {
  pkProject$: BehaviorSubject<number> = new BehaviorSubject(3987);
}

class WarEntityPreviewControllerServiceMock {
  warEntityPreviewControllerSearchExisting(
    warEntityPreviewSearchExistingReq?: WarEntityPreviewSearchExistingReq,
  ): Observable<WareEntityPreviewPage> {
    const allData = [
      // tslint:disable-next-line: max-line-length
      { project_id: 375232, pk_entity: 2004, fk_class: 21, entity_label: 'Albert IV', class_label: 'Person', entity_type: 'peIt', type_label: null, fk_type: null, time_span: null, full_text_headline: 'reverse of: is <b>appellation</b> for language of]: Albert IV, [reverse of: brought into life]: (no label)', class_label_headline: 'Person', entity_label_headline: 'Albert IV', type_label_headline: null, projects: [375232] },
      // tslint:disable-next-line: max-line-length
      { project_id: 375232, pk_entity: 2006, fk_class: 21, entity_label: 'Jean', class_label: 'Person', entity_type: 'peIt', type_label: null, fk_type: null, time_span: null, full_text_headline: 'Person –[reverse of: is <b>appellation</b> for language of]: Jean', class_label_headline: 'Person', entity_label_headline: 'Jean', type_label_headline: null, projects: [375232] },
      // tslint:disable-next-line: max-line-length
      { project_id: 0, pk_entity: 2007, fk_class: 21, entity_label: 'Hans', class_label: 'Person', entity_type: 'peIt', type_label: null, fk_type: null, time_span: null, full_text_headline: 'Person – [reverse of: is <b>appellation</b> for language of]: Hans', class_label_headline: 'Person', entity_label_headline: 'Hans', type_label_headline: null, projects: [375232] },
      // tslint:disable-next-line: max-line-length
      { project_id: 375232, pk_entity: 2009, fk_class: 21, entity_label: 'Angela', class_label: 'Person', entity_type: 'peIt', type_label: null, fk_type: null, time_span: null, full_text_headline: 'Person –[reverse of: is <b>appellation </b> for language of]: Angela', class_label_headline: 'Person', entity_label_headline: 'Angela', type_label_headline: null, projects: [375232] },
      // tslint:disable-next-line: max-line-length
      { project_id: 0, pk_entity: 100096, fk_class: 21, entity_label: 'Hello world3', class_label: 'Person', entity_type: 'peIt', type_label: null, fk_type: null, time_span: null, full_text_headline: 'Person –[reverse of: is<b>appellation</b > for language of]: Hello world3', class_label_headline: 'Person', entity_label_headline: 'Hello world3', type_label_headline: null, projects: [375232] },
      // tslint:disable-next-line: max-line-length
      { project_id: 375232, pk_entity: 2005, fk_class: 21, entity_label: 'Rudolf of Habsbourg', class_label: 'Person', entity_type: 'peIt', type_label: null, fk_type: null, time_span: null, full_text_headline: 'Person – [reverse of: is <b>appellation</b> for language of]: Rudolf of Habsbourg', class_label_headline: 'Person', entity_label_headline: 'Rudolf of Habsbourg', type_label_headline: null, projects: [375232] },
      // tslint:disable-next-line: max-line-length
      { project_id: 375232, pk_entity: 2008, fk_class: 21, entity_label: 'Pierre', class_label: 'Person', entity_type: 'peIt', type_label: null, fk_type: null, time_span: null, full_text_headline: 'Person –[reverse of: is <b> appellation </b> for language of]: Pierre', class_label_headline: 'Person', entity_label_headline: 'Pierre', type_label_headline: null, projects: [375232] },
      // tslint:disable-next-line: max-line-length
      { project_id: 375232, pk_entity: 100080, fk_class: 21, entity_label: 'hello world', class_label: 'Person', entity_type: 'peIt', type_label: null, fk_type: null, time_span: null, full_text_headline: 'Person – [reverse of: is <b>appellation</b> for language of]: hello world', class_label_headline: 'Person', entity_label_headline: 'hello world', type_label_headline: null, projects: [375232] },
      // tslint:disable-next-line: max-line-length
      { project_id: 375232, pk_entity: 100088, fk_class: 21, entity_label: 'hello world 2', class_label: 'Person', entity_type: 'peIt', type_label: null, fk_type: null, time_span: null, full_text_headline: 'Person – [reverse of: is <b>appellation</b> for language of]: hello world 2', class_label_headline: 'Person', entity_label_headline: 'hello world 2', type_label_headline: null, projects: [777] }
    ]

    const data = allData.filter(elt => elt.entity_label.indexOf(warEntityPreviewSearchExistingReq.searchString) != -1 ||
      elt.full_text_headline.indexOf(warEntityPreviewSearchExistingReq.searchString) != -1);

    const pageSize = 5;
    const beginIndex = (warEntityPreviewSearchExistingReq.page - 1) * pageSize;
    const endIndex = beginIndex + pageSize;

    return of({
      totalCount: data.length,
      data: data.slice(beginIndex, endIndex)
    })
  }
}

const meta: Meta<SearchExistingEntityComponent> = {
  component: SearchExistingEntityComponent,
  title: 'Editor/SearchExistingEntityComponent',
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
type Story = StoryObj<SearchExistingEntityComponent>;

export const Basic: Story = {
  args: {
    pkClass: 21,
    searchString$: new BehaviorSubject('an'),
    mode: SearchExistingEntityListMode.mode1,
    confirmBtnTextInProject: 'Open',
    confirmBtnTextNotInProject: 'Open',
    confirmBtnTooltipInProject: 'Open in new tab',
    confirmBtnTooltiptNotInProject: 'Add to your project and open in new tab',
  },
  decorators: [
    applicationConfig({
      providers: [{ provide: ConfigurationPipesService, useClass: ConfigurationPipesServiceMock },
      { provide: ActiveProjectService, useClass: ActiveProjectServiceMock },
      { provide: WarEntityPreviewControllerService, useClass: WarEntityPreviewControllerServiceMock },],
    }),
  ],
};
