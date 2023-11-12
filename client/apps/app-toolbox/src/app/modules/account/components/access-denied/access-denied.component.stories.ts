import { applicationConfig, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { AccessDeniedComponent } from './access-denied.component';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { StateModule } from '@kleiolab/lib-redux';
import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';
import { ActiveAccountService } from '../../../../core/active-account';
import { GvAuthService } from '../../../../core/auth/auth.service';
import { GvInternalStorage } from '../../../../core/cookies/cookies.module';
import { MaterialModule } from '../../../../core/material/material.module';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';

const meta: Meta<AccessDeniedComponent> = {
  component: AccessDeniedComponent,
  title: 'AccessDeniedComponent',
  decorators: [
    moduleMetadata({
      declarations: [NavbarComponent],
      imports: [
        CommonModule,
        MaterialModule
      ],
      providers: [ActiveAccountService, GvAuthService, GvInternalStorage]
    }),
    applicationConfig({
      providers: [importProvidersFrom(StateModule, HttpClientModule)],
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
