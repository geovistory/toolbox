import { applicationConfig, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { NavbarComponent } from './navbar.component';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { StateFacade, StateModule } from '@kleiolab/lib-redux';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';
import { getCdkOverlayCanvas } from '../../../../../.storybook/getCdkOverlayCanvas';
import { playInject } from '../../../../../.storybook/playInject';
import { ActiveAccountService } from '../../../services/active-account.service';
import { GvAuthService } from '../../../services/auth.service';
import { GvInternalStorage } from '../../../services/cookies.module';

const meta: Meta<NavbarComponent> = {
  component: NavbarComponent,
  title: 'NavbarComponent',
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
      ],
      providers: [ActiveAccountService, GvAuthService, GvInternalStorage]
    }),
    applicationConfig({
      providers: [importProvidersFrom(StateModule, HttpClientModule), provideAnimations(), provideRouter([]),
      ],
    }),
  ]
};
export default meta;
type Story = StoryObj<NavbarComponent>;

export const LoggedOut: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Login/gi)).toBeTruthy();
    expect(canvas.getByText(/Register/gi)).toBeTruthy();
    expect(canvas.getByText(/Help/gi)).toBeTruthy();
  },
};

export const LoggedIn: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const state = await playInject(canvasElement, StateFacade)
    state.ui.account.loginSucceeded({ email: 'laura@meier.org', username: 'Laura Meier', });
    const canvas = within(canvasElement);
    const menuTrigger = canvas.getByTestId('menu-trigger');
    expect(menuTrigger).toBeTruthy();
  },
};

export const LoggedInOpenMenu: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const state = await playInject(canvasElement, StateFacade)
    state.ui.account.loginSucceeded({ email: 'laura@meier.org', username: 'Laura Meier', });
    const canvas = within(canvasElement);
    const menuTrigger = canvas.getByTestId('menu-trigger');
    await userEvent.click(menuTrigger)
    const cdkOverlay = getCdkOverlayCanvas(canvasElement);
    expect(cdkOverlay.getByText(/laura@meier.org/gi)).toBeTruthy();
  },
};

export const LoggedInOpenMenuLongEmail: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const state = await playInject(canvasElement, StateFacade)
    state.ui.account.loginSucceeded({ email: 'laura-with-a-longlonglonglong-email@meier.org', username: 'Laura Meier', });
    const canvas = within(canvasElement);
    const menuTrigger = canvas.getByTestId('menu-trigger');
    await userEvent.click(menuTrigger)
    const cdkOverlay = getCdkOverlayCanvas(canvasElement);
    expect(cdkOverlay.getByText(/laura-with-a-longlonglonglong-email@meier.org/gi)).toBeTruthy();
  },
};


export const HelpOpened: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const menuTrigger = canvas.getByTestId('help-btn');
    await userEvent.click(menuTrigger)
    const cdkOverlay = getCdkOverlayCanvas(canvasElement);
    expect(cdkOverlay.getByText(/Get in touch with our support team./i)).toBeTruthy();
  },
};
