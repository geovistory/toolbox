import { applicationConfig, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { AccessDeniedComponent } from './access-denied.component';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { StateModule } from '@kleiolab/lib-redux';
import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';
import { GvInternalStorage } from '../../../../core/cookies/cookies.module';
import { ActiveAccountService } from '../../../../shared/services/active-account.service';
import { GvAuthService } from '../../../../shared/services/auth.service';

const meta: Meta<AccessDeniedComponent> = {
  component: AccessDeniedComponent,
  title: 'AccessDeniedComponent',
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
      ],
      providers: [ActiveAccountService, GvAuthService, GvInternalStorage]
    }),
    applicationConfig({
      providers: [importProvidersFrom(StateModule, HttpClientModule), provideRouter([])],
    }),
  ]
};
export default meta;
type Story = StoryObj<AccessDeniedComponent>;


export const Main: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Oups! You are not allowed to access this page/gi)).toBeTruthy();
  },
};