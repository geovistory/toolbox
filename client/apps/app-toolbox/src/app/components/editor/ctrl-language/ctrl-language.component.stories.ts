import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { CtrlLanguageComponent } from './ctrl-language.component';

import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';

import { HttpEvent, HttpResponse } from '@angular/common/http';
import { InfLanguage, LanguagesService } from '@kleiolab/lib-sdk-lb4';
import { Observable, of } from 'rxjs';
const meta: Meta<CtrlLanguageComponent> = {
  component: CtrlLanguageComponent,
  title: 'Editor/FormElements/CtrlLanguageComponent',
  decorators: [
    applicationConfig({
      providers: [
        provideAnimations(),
        importProvidersFrom(),
      ],
    }),
  ],
};
export default meta;
type Story = StoryObj<CtrlLanguageComponent>;

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
  args: {
    placeholder: 'Search...',
    required: false,
    disabled: false,
  },
  decorators: [
    applicationConfig({
      providers: [{ provide: LanguagesService, useClass: MockLanguagesService }],
    }),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/ctrl-language works!/gi)).toBeTruthy();
  },
};
