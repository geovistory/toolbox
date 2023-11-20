import type { Meta, StoryObj } from '@storybook/angular';
import { ViewFieldComponent } from './view-field.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<ViewFieldComponent> = {
  component: ViewFieldComponent,
  title: 'ViewFieldComponent',
};
export default meta;
type Story = StoryObj<ViewFieldComponent>;

export const Primary: Story = {
  args: {
    showBodyOnInit: false,
  },
};

export const Heading: Story = {
  args: {
    showBodyOnInit: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/view-field works!/gi)).toBeTruthy();
  },
};
