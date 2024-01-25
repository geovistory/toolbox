import { ChangeDetectionStrategy, Component, importProvidersFrom, Input, OnInit } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { CtrlLanguageComponent, CtrlLanguageModel } from './ctrl-language.component';

import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';

import { JsonPipe } from '@angular/common';
import { HttpEvent, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InfAppellation, InfLanguage, LanguagesService } from '@kleiolab/lib-sdk-lb4';
import { Observable, of } from 'rxjs';
import { getCdkOverlayCanvas } from '../../../../../.storybook/getCdkOverlayCanvas';

@Component({
  selector: `gv-form-field`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [ReactiveFormsModule, CtrlLanguageComponent, MatFormFieldModule, JsonPipe],
  template: `
  <form [formGroup]="form">
    <mat-form-field class="w-100" appearance="outline">
      <gv-ctrl-language data-testid="ctrl" #c [formControl]="ctrl" placeholder="Enter Foo" required=true></gv-ctrl-language>
      <mat-error>You must enter a value</mat-error>
    </mat-form-field>
  </form>
  <table>
    <tr>
      <td colspan="2">
        <button (click)="c.onContainerClick()">set focus</button>
      </td>
    </tr>
    <tr>
      <td>form.status:</td>
      <td>{{form.status | json}}</td>
    </tr>
    <tr>
      <td>form.touched:</td>
      <td>{{form.touched | json}}</td>
    </tr>
    <tr>
      <td>form.dirty:</td>
      <td>{{form.dirty | json}}</td>
    </tr>
    <tr>
      <td>ctrl.value</td>
      <td>
        <pre>{{ctrl.value | json:2}}</pre>
      </td>
    </tr>
  </table>
  `
})
class FormFieldComponent implements OnInit {
  @Input() initVal?: InfAppellation
  ctrl = new FormControl<CtrlLanguageModel>({ fk_class: 123 })
  form = this.formBuilder.group({
    ctrl: this.ctrl
  });
  constructor(private formBuilder: FormBuilder) { }
  ngOnInit() {
    if (this.initVal) this.ctrl.setValue(this.initVal)
  }
}

const meta: Meta<FormFieldComponent> = {
  component: FormFieldComponent,
  title: 'Editor/Form Elements/CtrlLanguageComponent',
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
    const inputEl = await canvas.findByRole('combobox')
    await userEvent.click(inputEl)
    const cdkOverlay = getCdkOverlayCanvas(canvasElement);
    expect(cdkOverlay.findByText(/Greek/i)).toBeTruthy();
  },
};
