import { applicationConfig, type Meta, type StoryObj } from '@storybook/angular';
import { HomeComponent } from './home.component';

import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { StateFacade, StateModule } from '@kleiolab/lib-redux';
import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';
import { playInject } from '../../../../../.storybook/playInject';
import { ActiveAccountService } from '../../../core/active-account';
import { GvAuthService } from '../../../core/auth/auth.service';
import { GvInternalStorage } from '../../../core/cookies/cookies.module';
import { MaterialModule } from '../../../core/material/material.module';
import { NavbarModule } from '../../../shared';
import { HomeRoutingModule } from '../home-routing.module';

const meta: Meta<HomeComponent> = {
  component: HomeComponent,
  title: 'HomeComponent',
  decorators: [
    applicationConfig({
      providers: [
        ActiveAccountService, GvAuthService, GvInternalStorage,

        importProvidersFrom(
          RouterModule.forRoot([]),
          StateModule,
          CommonModule,
          NavbarModule,
          HomeRoutingModule,
          MaterialModule,
        ),

        provideAnimations(),
        provideHttpClient()
      ],
    }),
  ]
};
export default meta;
type Story = StoryObj<HomeComponent>;

export const LoggedOut: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Geovistory Toolbox/gi)).toBeTruthy();
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

