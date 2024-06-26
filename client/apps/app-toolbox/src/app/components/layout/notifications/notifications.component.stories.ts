import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { StateFacade, StateModule } from '@kleiolab/lib-redux';
import { NotificationModule } from '@kleiolab/lib-redux/lib/redux-store/ui/notification/notification.module';
import { EffectsModule } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { applicationConfig, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';
import { MessageService } from 'primeng/api';
import { playInject } from '../../../../../.storybook/playInject';
import { NotificationComponent } from './notifications.component';


const meta: Meta<NotificationComponent> = {
  component: NotificationComponent,
  title: 'Layout/NotificationComponent',
  decorators: [
    moduleMetadata({
      imports: [HttpClientModule, NotificationModule],
    }),
    applicationConfig({
      providers: [Store,
        MessageService,
        provideAnimations(),
        importProvidersFrom(
          StateModule,
          EffectsModule.forRoot(),
          HttpClientModule)],
    }),
  ]
};
export default meta;
type Story = StoryObj<NotificationComponent>;



export const Info: Story = {
  args: {},
  play: async ({ canvasElement, }) => {
    const facade = await playInject(canvasElement, StateFacade);
    const canvas = within(canvasElement);
    facade.ui.notifications.addToast({ options: { title: 'Info', timeout: 3000 }, type: 'info' })
    const notification = await canvas.findByText('Info');
    expect(notification).toBeTruthy()
  },
};

export const Success: Story = {
  args: {},
  play: async ({ canvasElement, }) => {
    const facade = await playInject(canvasElement, StateFacade);
    const canvas = within(canvasElement);
    facade.ui.notifications.addToast({ options: { title: 'Success', timeout: 3000 }, type: 'success' })
    const notification = await canvas.findByText('Success');
    expect(notification).toBeTruthy()
  },
};

export const Warning: Story = {
  args: {},
  play: async ({ canvasElement, }) => {
    const facade = await playInject(canvasElement, StateFacade);
    const canvas = within(canvasElement);
    facade.ui.notifications.addToast({ options: { title: 'Warn', timeout: 3000 }, type: 'warn' })
    const notification = await canvas.findByText('Warn');
    expect(notification).toBeTruthy()
  },
};

export const Error: Story = {
  args: {},
  play: async ({ canvasElement, }) => {
    const facade = await playInject(canvasElement, StateFacade);
    const canvas = within(canvasElement);
    facade.ui.notifications.addToast({ options: { title: 'Error', timeout: 3000 }, type: 'error' })
    const notification = await canvas.findByText('Error');
    expect(notification).toBeTruthy()
  },
};


