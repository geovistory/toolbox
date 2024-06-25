import { ChangeDetectionStrategy, Component, Input, OnInit, importProvidersFrom } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { provideAnimations } from '@angular/platform-browser/animations';
import { StateModule } from '@kleiolab/lib-redux';
import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { CtrlAppellationComponent, CtrlAppellationModel } from './ctrl-appellation.component';

import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';

import { JsonPipe } from '@angular/common';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InfAppellation, SysConfigFormCtrlType } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from './../../../services/active-project.service';


@Component({
  selector: `gv-form-field`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [ReactiveFormsModule, CtrlAppellationComponent, MatFormFieldModule, JsonPipe],
  template: `
  <form [formGroup]="form">
    <mat-form-field class="w-100" appearance="outline">
      <gv-ctrl-appellation data-testid="ctrl" #c [formControl]="ctrl" placeholder="Enter Foo" required=true [type]="type"></gv-ctrl-appellation>
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
  @Input() type: SysConfigFormCtrlType.AppellationEnum;
  @Input() initVal?: InfAppellation
  ctrl = new FormControl<CtrlAppellationModel>({ fk_class: 123 })
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
  title: 'Editor/Form Elements/CtrlAppellationComponent',
  decorators: [
    applicationConfig({
      providers: [
        provideAnimations(),
        importProvidersFrom(StateModule, MatDialogModule),
        ActiveProjectService,
      ],
    }),
  ]
};
export default meta;
type Story = StoryObj<FormFieldComponent>;


export const InputLike: Story = {
  args: { type: 'true' }
};

export const TextEditorLike: Story = {
  args: { type: 'textEditor' }
};

export const Prefilled: Story = {
  args: {
    type: 'textEditor', initVal: {
      fk_class: 123, pk_entity: 1, quill_doc: {
        'latestId': 2,
        'ops': [
          {
            'attributes': {
              'charid': '2'
            },
            'insert': 'a'
          },
          {
            'attributes': {
              'blockid': '1'
            },
            'insert': '\n'
          }
        ]
      }
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(within(canvas.getByTestId('ctrl')).findByText(/a/i)).toBeTruthy();
  },
};
