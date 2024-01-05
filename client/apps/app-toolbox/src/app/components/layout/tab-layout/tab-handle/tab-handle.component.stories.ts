import { applicationConfig, type Meta, type StoryObj } from '@storybook/angular';
import { TabHandleComponent } from './tab-handle.component';

import { importProvidersFrom } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { provideAnimations } from '@angular/platform-browser/animations';
import { StateModule } from '@kleiolab/lib-redux';
import { INITIAL_STATE } from '@ngrx/store';
import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';
import { MockStateFactory } from '../../../../../../.storybook/MockStateFactory';
import { ActiveProjectService } from '../../../../services/active-project.service';

const meta: Meta<TabHandleComponent> = {
  component: TabHandleComponent,
  title: 'TabHandleComponent',
  decorators: [
    applicationConfig({
      providers: [
        provideAnimations(),
        importProvidersFrom(
          StateModule,
          MatDialogModule
        ),
        ActiveProjectService,
      ],
    }),
  ]
};
export default meta;
type Story = StoryObj<TabHandleComponent>;



const mockStateFactory = new MockStateFactory();
mockStateFactory.state.ui.activeProject.tabLayouts = {
  'tab_1': {
    loading: false,
    layoutMode: 'both',
    tabTitle: 'Foo title',
    tabTooltip: 'Foo tooltip'
  }
};
export const Default: Story = {
  render: () => ({
    template: `
    <div style="max-width: 100%; min-height: 32px; display: flex; flex-direction: row; background: white; border-radius: 0px; overflow: hidden; background: #e5e9f0;">
      <gv-tab-handle class="active" [tab]="{
        active: true,
        component: 'entity',
        icon: 'temporal-entity',
        id: 'tab_1'
      }"></gv-tab-handle>
    </div>
    `
  }),
  decorators: [
    applicationConfig({
      providers: [{ provide: INITIAL_STATE, useValue: mockStateFactory.state }]
    })
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Foo title/gi)).toBeTruthy();
  },
};
