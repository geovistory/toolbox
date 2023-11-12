import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { StateFacade } from '@kleiolab/lib-redux';
import { NotificationModule } from '@kleiolab/lib-redux/lib/redux-store/ui/notification/notification.module';
import { SdkLb4Module } from '@kleiolab/lib-sdk-lb4';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { applicationConfig, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { within } from '@storybook/testing-library';
import { playInject } from '../../../../../.storybook/playInject';
import { NotificationModule as LocalNotificationModule } from '../notifications.module';
import { NotificationComponent } from './notifications.component';


const meta: Meta<NotificationComponent> = {
  component: NotificationComponent,
  title: 'NotificationComponent',
  decorators: [
    moduleMetadata({
      imports: [HttpClientModule, SdkLb4Module, LocalNotificationModule, NotificationModule],
    }),
    applicationConfig({
      providers: [Store, importProvidersFrom(
        StoreModule.forRoot(),
        EffectsModule.forRoot(),
        HttpClientModule)],
    }),
  ]
};
export default meta;
type Story = StoryObj<NotificationComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement, }) => {
    const facade = await playInject(canvasElement, StateFacade);
    const canvas = within(canvasElement);
    facade.ui.notifications.addToast({ options: { title: 'Hi', timeout: 3000 }, type: 'error' })
    const notification = await canvas.findByText('Hi');

    expect(notification).toBeTruthy()

  },
};


