import { applicationConfig, type Meta, type StoryObj } from '@storybook/angular';

import { importProvidersFrom } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ActiveProjectPipesService, StateFacade, StateModule } from '@kleiolab/lib-redux';
import { WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';
import { DragDropConfig } from '@suez/ngx-dnd';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { getCdkOverlayCanvas } from '../../../../../.storybook/getCdkOverlayCanvas';
import { playInject } from '../../../../../.storybook/playInject';
import { sleep } from '../../../../../.storybook/sleep';
import { ActiveProjectService } from '../../services/active-project.service';
import { EntityPreviewComponent } from './entity-preview.component';

const meta: Meta<EntityPreviewComponent> = {
  component: EntityPreviewComponent,
  title: 'EntityPreviewComponent',
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


type Story = StoryObj<EntityPreviewComponent>;

class MockJack {
  streamEntityPreview(): Observable<WarEntityPreview> {
    const preview: WarEntityPreview = {
      pk_entity: 1,
      fk_class: 21,
      project_id: 2,
      class_label: 'Person',
      entity_label: 'Jack the Foo',
    }
    return of(preview)
  }
}
/**
 * This example shows the basic usage.
 */
export const Jack: Story = {
  args: {
    pkEntity: 1,
    openTabOnClick: true
  },

  decorators: [
    applicationConfig({
      providers: [{ provide: ActiveProjectPipesService, useClass: MockJack }]
    })
  ],
  play: async ({ canvasElement }) => {
    const state = await playInject(canvasElement, StateFacade)
    // set project id
    state.ui.activeProject.loadProjectBasiscsSucceded(1)
    // add class 21 in profile 1
    state.data.dfh.klass.loadSucceeded([{ pk_class: 21, profiles: [{ fk_profile: 1, removed_from_api: false }], parent_classes: [70], ancestor_classes: [] }], '')
    // add profile 1 to project 2
    state.data.pro.dfhProfileProjRel.loadSucceeded([{ fk_profile: 1, fk_project: 1, enabled: true, pk_entity: 99 }], '')
    // add sys config to map class to icon
    state.data.sys.config.loadSucceeded([{ classes: { 21: { icon: 'persistent-item' } }, specialFields: {}, }], '')

    const canvas = within(canvasElement);
    expect(canvas.getByText(/Jack/)).toBeTruthy();
    expect(canvas.getByText(/Person/)).toBeTruthy();


    const menuTrigger = canvas.getByTestId('menu-trigger');
    await userEvent.click(menuTrigger)
    const cdkOverlay = getCdkOverlayCanvas(canvasElement);
    expect(cdkOverlay.getByText(/Open Jack.*in new/)).toBeTruthy();
  },

};

/**
 * This example shows the entity id.
 */
export const ShowId: Story = {
  args: {
    pkEntity: 1,
    openTabOnClick: true,
    showId: true
  },

  decorators: [
    applicationConfig({
      providers: [{ provide: ActiveProjectPipesService, useClass: MockJack }]
    })
  ],
  play: async ({ canvasElement }) => {
    const state = await playInject(canvasElement, StateFacade)
    // set project id
    state.ui.activeProject.loadProjectBasiscsSucceded(1)
    // add class 21 in profile 1
    state.data.dfh.klass.loadSucceeded([{ pk_class: 21, profiles: [{ fk_profile: 1, removed_from_api: false }], parent_classes: [70], ancestor_classes: [] }], '')
    // add profile 1 to project 2
    state.data.pro.dfhProfileProjRel.loadSucceeded([{ fk_profile: 1, fk_project: 1, enabled: true, pk_entity: 99 }], '')
    // add sys config to map class to icon
    state.data.sys.config.loadSucceeded([{ classes: { 21: { icon: 'persistent-item' } }, specialFields: {}, }], '')

    const canvas = within(canvasElement);
    expect(canvas.getByText(/ID: 1/)).toBeTruthy();
  },

};


class MockUpdates {
  streamEntityPreview(): Observable<WarEntityPreview> {
    const a: WarEntityPreview = {
      pk_entity: 1,
      fk_class: 21,
      project_id: 2,
      class_label: 'Person',
      entity_label: 'Jack the Foo',
    }
    const b: WarEntityPreview = { ...a, entity_label: 'Jack the Bar' }
    const preview$ = new BehaviorSubject<WarEntityPreview>({
      pk_entity: 1,
      fk_class: 21,
      project_id: 2,
      class_label: 'Person',
      entity_label: 'Jack the Foo',
    })
    let x = true;
    setInterval(() => {
      x ? preview$.next(b) : preview$.next(a);
      x = !x;
    }, 100)
    return preview$
  }
}
/**
 * This example shows updates of the entity preview.
 */
export const Updates: Story = {
  args: {
    pkEntity: 1,
    openTabOnClick: true,
    showId: true
  },

  decorators: [
    applicationConfig({
      providers: [{ provide: ActiveProjectPipesService, useClass: MockUpdates }]
    })
  ],
  play: async ({ canvasElement }) => {
    const state = await playInject(canvasElement, StateFacade)
    // set project id
    state.ui.activeProject.loadProjectBasiscsSucceded(1)
    // add class 21 in profile 1
    state.data.dfh.klass.loadSucceeded([{ pk_class: 21, profiles: [{ fk_profile: 1, removed_from_api: false }], parent_classes: [70], ancestor_classes: [] }], '')
    // add profile 1 to project 2
    state.data.pro.dfhProfileProjRel.loadSucceeded([{ fk_profile: 1, fk_project: 1, enabled: true, pk_entity: 99 }], '')
    // add sys config to map class to icon
    state.data.sys.config.loadSucceeded([{ classes: { 21: { icon: 'persistent-item' } }, specialFields: {}, }], '')

    const canvas = within(canvasElement);
    expect(canvas.getByText(/Foo/)).toBeTruthy();
    await sleep(150)
    expect(canvas.getByText(/Bar/)).toBeTruthy();

  },

};

class MockWithUtrl {
  streamEntityPreview(): Observable<WarEntityPreview> {
    const preview: WarEntityPreview = {
      pk_entity: 1,
      fk_class: 11,
      project_id: 2,
      class_label: 'Url',
      entity_label: 'https://geovistory.org',

    }
    return of(preview)
  }
}
/**
 * This example shows how URLs in the entity label are parsed and create a link in
 * the menu.
 */
export const WithUrl: Story = {
  args: {
    pkEntity: 1,
    openTabOnClick: true
  },
  decorators: [
    applicationConfig({
      providers: [{ provide: ActiveProjectPipesService, useClass: MockWithUtrl }]
    })
  ],
  play: async ({ canvasElement }) => {
    const state = await playInject(canvasElement, StateFacade)
    // set project id
    state.ui.activeProject.loadProjectBasiscsSucceded(1)
    // add class 21 in profile 1
    state.data.dfh.klass.loadSucceeded([{ pk_class: 11, profiles: [{ fk_profile: 1, removed_from_api: false }], parent_classes: [70], ancestor_classes: [] }], '')
    // add profile 1 to project 2
    state.data.pro.dfhProfileProjRel.loadSucceeded([{ fk_profile: 1, fk_project: 1, enabled: true, pk_entity: 99 }], '')
    // add sys config to map class to icon
    state.data.sys.config.loadSucceeded([{ classes: { 11: { icon: 'persistent-item' } }, specialFields: {}, }], '')

    const canvas = within(canvasElement);
    const menuTrigger = canvas.getByTestId('menu-trigger');
    await userEvent.click(menuTrigger)
    const cdkOverlay = getCdkOverlayCanvas(canvasElement);
    expect(cdkOverlay.getByText(/Open https.*in new/)).toBeTruthy();
    expect(cdkOverlay.getByText(/https:\/\/geovistory.org/)).toBeTruthy();
  },
};


class MockBirth {
  streamEntityPreview(): Observable<WarEntityPreview> {
    const preview: WarEntityPreview = {
      pk_entity: 1,
      fk_class: 11,
      project_id: 2,
      class_label: 'Birth',
      entity_label: 'Birth of M.',

    }
    return of(preview)
  }
}
/**
 * This is an example for a temporal entity (with a star-icon).
 */
export const Birth: Story = {
  args: {
    pkEntity: 1,
    openTabOnClick: true
  },
  decorators: [
    applicationConfig({
      providers: [{ provide: ActiveProjectPipesService, useClass: MockBirth }]
    })
  ],
  play: async ({ canvasElement }) => {
    const state = await playInject(canvasElement, StateFacade)
    // set project id
    state.ui.activeProject.loadProjectBasiscsSucceded(1)
    // add class 21 in profile 1
    state.data.dfh.klass.loadSucceeded([{ pk_class: 11, profiles: [{ fk_profile: 1, removed_from_api: false }], parent_classes: [70], ancestor_classes: [] }], '')
    // add profile 1 to project 2
    state.data.pro.dfhProfileProjRel.loadSucceeded([{ fk_profile: 1, fk_project: 1, enabled: true, pk_entity: 99 }], '')
    // add sys config to map class to icon
    state.data.sys.config.loadSucceeded([{ classes: { 11: { icon: 'temporal-entity' } }, specialFields: {}, }], '')

    const canvas = within(canvasElement);
    const menuTrigger = canvas.getByTestId('menu-trigger');
    await userEvent.click(menuTrigger)
    const cdkOverlay = getCdkOverlayCanvas(canvasElement);
    expect(cdkOverlay.getByText(/Open Birth of M.*in new/)).toBeTruthy();
  },
};

/**
 * Example for the component in loading state.
 */
export const Loading: Story = {
  args: {
    pkEntity: 1,
    openTabOnClick: true
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.findByTestId('spinner')).toBeTruthy()
  },
};
