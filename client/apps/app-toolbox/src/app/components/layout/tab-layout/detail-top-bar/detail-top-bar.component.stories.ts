import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  moduleMetadata,
  type Meta,
  type StoryObj
} from '@storybook/angular';
import { DetailTopBarComponent } from './detail-top-bar.component';



const meta: Meta<DetailTopBarComponent> = {
  component: DetailTopBarComponent,
  title: 'Layout/DetailTopBarComponent',
  decorators: [
    moduleMetadata({
      imports: [MatButtonModule, MatIconModule],
    }),
  ],
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


export const WithButtons: Story = {
  render: () => ({
    template: `<gv-detail-top-bar
    [closeRightAreaBtn]="false"
    [openRightAreaBtn]="true"
    [closeLeftAreaBtn]="false"
    [openLeftAreaBtn]="true"
    >
      <button mat-button color="primary">Basic</button>

      <!-- button with icon and text-->
      <button mat-button color="primary">
        <mat-icon svgIcon="arrow-right" color="primary"></mat-icon>
        mat-button
      </button>

      <!-- button with icon -->
      <button mat-button>
        <mat-icon svgIcon="dots-vertical"></mat-icon>
      </button>
    </gv-detail-top-bar>`
  })
};
