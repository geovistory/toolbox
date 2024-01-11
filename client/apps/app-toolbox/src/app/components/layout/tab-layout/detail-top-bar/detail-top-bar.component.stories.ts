import {
  type Meta,
  type StoryObj
} from '@storybook/angular';
import { DetailTopBarComponent } from './detail-top-bar.component';



const meta: Meta<DetailTopBarComponent> = {
  component: DetailTopBarComponent,
  title: 'Layout/DetailTopBarComponent',
};
export default meta;
type Story = StoryObj<DetailTopBarComponent>;


export const RightArea: Story = {
  render: () => ({
    template: `<gv-detail-top-bar
    [closeRightAreaBtn]="true"
    [openRightAreaBtn]="false"
    [closeLeftAreaBtn]="true"
    [openLeftAreaBtn]="false"
    >abc</gv-detail-top-bar>`
  })
};

export const LeftArea: Story = {
  render: () => ({
    template: `<gv-detail-top-bar
    [closeRightAreaBtn]="false"
    [openRightAreaBtn]="true"
    [closeLeftAreaBtn]="false"
    [openLeftAreaBtn]="true"
    >abc</gv-detail-top-bar>`
  })
};
