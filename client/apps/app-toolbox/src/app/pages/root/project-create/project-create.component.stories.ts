import { importProvidersFrom } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { provideAnimations } from '@angular/platform-browser/animations';
import { StateModule } from '@kleiolab/lib-redux';
import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { ProjectCreateComponent } from './project-create.component';

import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';

import { HttpEvent, HttpResponse } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { InfLanguage, LanguagesService } from '@kleiolab/lib-sdk-lb4';
import { Observable, of } from 'rxjs';
import { ActiveAccountService } from '../../../services/active-account.service';
import { GvAuthService } from '../../../services/auth.service';
import { GvInternalStorage } from '../../../services/storage.swaps';
import { ActiveProjectService } from './../../../services/active-project.service';

const meta: Meta<ProjectCreateComponent> = {
  component: ProjectCreateComponent,
  title: 'Pages/ProjectCreateComponent',
  decorators: [
    applicationConfig({
      providers: [
        provideAnimations(),
        importProvidersFrom(
          RouterModule.forRoot([]),
          StateModule,
          MatDialogModule
        ),
        ActiveAccountService, GvAuthService, GvInternalStorage,
        ActiveProjectService,
      ],
    }),
  ],
};
export default meta;
type Story = StoryObj<ProjectCreateComponent>;

// Setup the initial state of the story Basic
class MockLanguagesService extends LanguagesService {
  public override findLanguagesControllerSearchInLanguages(searchString?: string, observe?: 'body', reportProgress?: boolean, options?: { httpHeaderAccept?: 'application/json'; }): Observable<InfLanguage[]>;
  public override findLanguagesControllerSearchInLanguages(searchString?: string, observe?: 'response', reportProgress?: boolean, options?: { httpHeaderAccept?: 'application/json'; }): Observable<HttpResponse<InfLanguage[]>>;
  public override findLanguagesControllerSearchInLanguages(searchString?: string, observe?: 'events', reportProgress?: boolean, options?: { httpHeaderAccept?: 'application/json'; }): Observable<HttpEvent<InfLanguage[]>>;
  public override findLanguagesControllerSearchInLanguages(searchString?: string, observe?: any, reportProgress?: boolean, options?: { httpHeaderAccept?: 'application/json'; }): Observable<any> {
    const languages: InfLanguage[] = [
      { notes: 'Italian', pk_entity: 1 },
      { notes: 'French', pk_entity: 2 },
      { notes: 'Greek', pk_entity: 3 },
      { notes: 'Foo Bar', pk_entity: 4 },
    ]
    return of(languages.filter(l => l.notes.includes(searchString)))
  }
}

export const Basic: Story = {
  args: {},
  decorators: [
    applicationConfig({
      providers: [
        { provide: LanguagesService, useClass: MockLanguagesService },
      ],
    }),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.findByText(/New projects are limited to one user/i)).toBeTruthy();
  },
};
