import type { Meta, StoryObj } from '@storybook/angular';
import { TabHandleComponent } from './tab-handle.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<TabHandleComponent> = {
  component: TabHandleComponent,
  title: 'TabHandleComponent',
};
export default meta;
type Story = StoryObj<TabHandleComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/tab-handle works!/gi)).toBeTruthy();
  },
};
