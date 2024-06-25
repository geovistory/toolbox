import { provideAnimations } from '@angular/platform-browser/animations';
import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { LoadingBarComponent } from './loading-bar.component';

import { within } from '@storybook/testing-library';

import { BehaviorSubject } from 'rxjs';
import { sleep } from '../../../../../.storybook/sleep';

const meta: Meta<LoadingBarComponent> = {
  component: LoadingBarComponent,
  title: 'Layout/LoadingBarComponent',
  decorators: [
    applicationConfig({
      providers: [
        provideAnimations(),
      ],
    }),
  ],
};
export default meta;
type Story = StoryObj<LoadingBarComponent>;

// Setup the initial state of the story Basic

const jobs$ = new BehaviorSubject(2)
export const Basic: Story = {
  args: {
    jobs$
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await sleep(2000)
    jobs$.next(0)
    await sleep(2000)
    // expect(canvas.getByText(/loading-bar works!/gi)).toBeTruthy();
  },
};
