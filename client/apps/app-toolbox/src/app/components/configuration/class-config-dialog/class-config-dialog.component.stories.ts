import { Component, importProvidersFrom, Input } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { provideAnimations } from '@angular/platform-browser/animations';
import { InfLanguageMock, PROFILE_12_BIOGRAPHICAL_BA_2022_02_09, PROFILE_5_GEOVISTORY_BASI_2022_01_18, ProProjectMock, StateModule, SysConfigValueMock } from '@kleiolab/lib-redux';
import { INITIAL_STATE } from '@ngrx/store';
import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { ClassConfigDialogComponent, ClassConfigDialogData } from './class-config-dialog.component';


import { MatButtonModule } from '@angular/material/button';
import { createCrmAsGvPositiveSchema } from '@kleiolab/lib-redux/lib/_helpers/transformers';
import { MockStateFactory } from './../../../../../.storybook/MockStateFactory';
import { ActiveProjectService } from './../../../services/active-project.service';

@Component({
  selector: 'gv-launch-dialog',
  template: `
    <button mat-raised-button color="primary" (click)="launch()"> Launch class {{fkClass}} project {{fkProject}} </button>
  `,
  standalone: true,
  imports: [MatButtonModule]
})
class LaunchDialogComponent {
  @Input() fkClass: number;
  @Input() fkProject: number;
  constructor(private _dialog: MatDialog) { }

  launch(): void {
    this._dialog.open<ClassConfigDialogComponent, ClassConfigDialogData>(ClassConfigDialogComponent, {
      height: 'calc(100% - 30px)',
      width: '850px',
      maxWidth: '100%',
      data: {
        fkClass: this.fkClass,
        fkProject: this.fkProject
      }
    });
  }
}
const meta: Meta<ClassConfigDialogComponent> = {
  component: LaunchDialogComponent,
  title: 'Configuration/ClassConfigDialogComponent',
  decorators: [
    applicationConfig({
      providers: [
        provideAnimations(),
        importProvidersFrom(StateModule, MatDialogModule),
        ActiveProjectService,
      ],
    }),
  ],
};
export default meta;
type Story = StoryObj<LaunchDialogComponent>;

// Setup the initial state of the story Basic
const stateBasic = new MockStateFactory();
stateBasic.addPositiveSchemaObject(createCrmAsGvPositiveSchema({
  ontoMocks: [PROFILE_5_GEOVISTORY_BASI_2022_01_18,
    PROFILE_12_BIOGRAPHICAL_BA_2022_02_09],
  sysConf: SysConfigValueMock.SYS_CONFIC_VALID,
  p: 3001
}))
stateBasic.setActiveProject(3001)
stateBasic.addPositiveSchemaObject({
  pro: { project: [ProProjectMock.PROJECT_1] },
  inf: { language: [InfLanguageMock.GERMAN] }
})

export const Basic: Story = {
  args: {
    fkClass: 21,
    fkProject: 3001,
  },
  decorators: [
    applicationConfig({
      providers: [{ provide: INITIAL_STATE, useValue: stateBasic.state }],
    }),
  ],
  play: async ({ canvasElement }) => {
    // const canvas = within(canvasElement);
    // expect(canvas.getByText(/has its origins in/i)).toBeTruthy();
  },
};
