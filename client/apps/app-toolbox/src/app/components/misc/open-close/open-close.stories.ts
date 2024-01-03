import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, type Meta, type StoryObj } from '@storybook/angular';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';
import { BehaviorSubject } from 'rxjs';
import { sleep } from '../../../../../.storybook/sleep';
import { OpenCloseComponent } from './open-close.component';

const meta: Meta<OpenCloseComponent> = {
  component: OpenCloseComponent,
  title: 'OpenCloseComponent',
  decorators: [
    applicationConfig({
      providers: [
        provideAnimations(),
      ],
    }),
  ]
};
export default meta;


type Story = StoryObj<OpenCloseComponent>;

/**
 * This example shows the basic usage.
 */
export const Closed: Story = {
  render: () => ({
    props: { isOpen$: new BehaviorSubject(false) },
    template: `
    <button data-testid="toggle-btn" (click)="isOpen$.next(!isOpen$.value)">Toggle</button> isOpen={{isOpen$|async}}

    <div style="border: 1px solid gray; margin-top: 10px; margin-bottom: 5px; height: 40px;">
        I am above
    </div>
    <gv-open-close data-testid="component" [isOpen$]="isOpen$">
      <div style="border: 1px solid blue; margin-top: 10px; margin-bottom: 5px; height: 40px;">
        I am the content in the OpenCloseComponent
      </div>
    </gv-open-close>
    <div style="border: 1px solid grey; margin-top: 10px; margin-bottom: 5px; height: 40px;">
      I am below
    </div>
`
  }),
  play: async (a) => {
    const canvas = within(a.canvasElement);
    const toggleBtn = canvas.getByTestId('toggle-btn')
    const component = canvas.getByTestId('component');
    expect(component.offsetHeight).toEqual(0);
    await sleep(1000);
    await userEvent.click(toggleBtn)
    await sleep(300);
    expect(component.offsetHeight).toEqual(55);
    await userEvent.click(toggleBtn)

  },

};



/**
 * This example shows the basic usage.
 */
export const Opened: Story = {
  render: () => ({
    props: { isOpen$: new BehaviorSubject(true) },
    template: `
    <button data-testid="toggle-btn" (click)="isOpen$.next(!isOpen$.value)">Toggle</button> isOpen={{isOpen$|async}}

    <div style="border: 1px solid gray; margin-top: 10px; margin-bottom: 5px; height: 40px;">
        I am above
    </div>
    <gv-open-close data-testid="component" [isOpen$]="isOpen$">
      <div style="border: 1px solid blue; margin-top: 10px; margin-bottom: 5px; height: 40px;">
        I am the content in the OpenCloseComponent
      </div>
    </gv-open-close>
    <div style="border: 1px solid grey; margin-top: 10px; margin-bottom: 5px; height: 40px;">
      I am below
    </div>
`
  }),
  play: async (a) => {
    const canvas = within(a.canvasElement);
    const toggleBtn = canvas.getByTestId('toggle-btn')
    const component = canvas.getByTestId('component');
    expect(component.offsetHeight).toEqual(55);
    await sleep(1000);
    await userEvent.click(toggleBtn)
    await sleep(300);
    expect(component.offsetHeight).toEqual(0);
    await userEvent.click(toggleBtn)

  },

};

/**
 * This example shows the basic usage.
 */
export const FastSwitch: Story = {
  render: () => ({
    props: { isOpen$: new BehaviorSubject(false) },
    template: `
    <button data-testid="toggle-btn" (click)="isOpen$.next(!isOpen$.value)">Toggle</button> isOpen={{isOpen$|async}}

    <div style="border: 1px solid gray; margin-top: 10px; margin-bottom: 5px; height: 40px;">
        I am above
    </div>
    <gv-open-close data-testid="component" [isOpen$]="isOpen$">
      <div style="border: 1px solid blue; margin-top: 10px; margin-bottom: 5px; height: 40px;">
        I am the content in the OpenCloseComponent
      </div>
    </gv-open-close>
    <div style="border: 1px solid grey; margin-top: 10px; margin-bottom: 5px; height: 40px;">
      I am below
    </div>
`
  }),
  play: async (a) => {
    const canvas = within(a.canvasElement);
    const toggleBtn = canvas.getByTestId('toggle-btn')
    const component = canvas.getByTestId('component');
    expect(component.offsetHeight).toEqual(0);
    // open
    await userEvent.click(toggleBtn)
    await sleep(20);
    // close
    await userEvent.click(toggleBtn)
    await sleep(320);

    expect(component.offsetHeight).toEqual(0);

  },
};
