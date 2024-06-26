import {
  applicationConfig,
  argsToTemplate,
  type Meta,
  type StoryObj
} from '@storybook/angular';
import { VisualizationMapWithTimeComponent } from './visualization-map-with-time.component';

import { importProvidersFrom } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { provideAnimations } from '@angular/platform-browser/animations';
import { StateModule } from '@kleiolab/lib-redux';
import { within } from '@storybook/testing-library';
import { DndModule } from '@suez/ngx-dnd';
import { buildModuleUrl, Ion } from 'cesium';
import { BehaviorSubject } from 'rxjs';
import { queryResults1 } from './visualization-map-with-time.mock';


const meta: Meta<VisualizationMapWithTimeComponent> = {
  component: VisualizationMapWithTimeComponent,
  title: 'Analysis/Visualizations/MapWithTimeComponent',
  decorators: [
    applicationConfig({
      providers: [
        provideAnimations(),
        importProvidersFrom(StateModule, MatDialogModule, DndModule.forRoot()),
      ],
    }),
  ],
};
export default meta;
type Story = StoryObj<VisualizationMapWithTimeComponent>;

buildModuleUrl.setBaseUrl('/assets/cesium/'); // If youre using Cesium version >= 1.42.0 add this line
Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzODVhZjMzNC04ODE1LTRhZTYtYWMwMS0wOWZhZjUyYjQ1YTIiLCJpZCI6MTYyODgsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NzAwOTE4NDR9.AKPArS_LoiwqgupddFnCqRoaq6IGA16MgzhSGZFlZ6c';

// Setup the initial state of the story Basic

export const Basic: Story = {
  args: {
    data$: new BehaviorSubject({ geoPlaces: queryResults1 }),
    showInfoBtn: true,
    showInfoBox: false,
    fullscreen: false,
    showFullscreenBtn: true,
    showFullscreenExitBtn: false,
  },
  render: (args) => ({
    props: args,
    template: `
    <p style="width: 800px; height: 800px;">
      <gv-visualization-map-with-time #c ${argsToTemplate(args)}></gv-visualization-map-with-time>
    </p>
    <button (click)="c.selectGeometriesOfEntity(206099)">Select geometries of entity 206099</button>
    <button (click)="c.selectGeometriesOfEntity()">Deselect geometries</button>
    `
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // expect(
    //   canvas.getByText(/visualization-map-with-time works!/gi)
    // ).toBeTruthy();
  },
};
