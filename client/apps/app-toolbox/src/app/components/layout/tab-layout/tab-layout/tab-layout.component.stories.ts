import { importProvidersFrom, Injectable } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { StateFacade, StateModule } from '@kleiolab/lib-redux';
import { INITIAL_STATE } from '@ngrx/store';
import {
  applicationConfig,
  argsToTemplate,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { TabLayoutComponent } from './tab-layout.component';


import { MatTabsModule } from '@angular/material/tabs';
import { Subject } from 'rxjs';
import { TabLayoutService } from '../../../../services/tab-layout.service';
import { MockStateFactory } from './../../../../../../.storybook/MockStateFactory';
import { ActiveProjectService } from './../../../../services/active-project.service';

const meta: Meta<TabLayoutComponent> = {
  component: TabLayoutComponent,
  title: 'Layout/TabLayoutComponent',
  decorators: [
    applicationConfig({
      providers: [
        provideAnimations(),
        importProvidersFrom(StateModule, MatTabsModule),
        ActiveProjectService,
        TabLayoutService,
      ],
    }),
  ],
};
export default meta;
type Story = StoryObj<TabLayoutComponent>;

// Setup the initial state of the story Basic
const stateBasic = new MockStateFactory();
@Injectable()
class TabLayoutMock extends TabLayoutService {
  constructor(
    protected override state: StateFacade) {
    super(state)
    this.create('id-123', null, new Subject())
    this.t.useTransition = true
  }
}
export const Basic: Story = {
  args: {},
  decorators: [
    applicationConfig({
      providers: [
        { provide: TabLayoutService, useClass: TabLayoutMock },
        { provide: INITIAL_STATE, useValue: stateBasic.state }],
    }),
  ],
  render: (args) => ({
    props: args,
    template: `

    <div class="d-flex justify-content-center mt-5">
      <div style="width:800px;height:600px;border:1px dashed pink;" class="d-flex">


      <gv-tab-layout ${argsToTemplate(args)} >
        <div layout-top>My Haeder My HaederMy HaederMy HaederMy HaederMy HaederMy HaederMy HaederMy HaederMy HaederMy HaederMy Haeder</div>
        <div layout-left class="gv-flex-fh">Left</div>
        <div layout-right class="gv-flex-fh">
          Right
        </div>
      </gv-tab-layout>

      </div>
    </div>
        `
  }),
  // play: async ({ canvasElement }) => {
  //   const canvas = within(canvasElement);
  //   expect(canvas.getByText(/tab-layout works!/gi)).toBeTruthy();
  // },
};
