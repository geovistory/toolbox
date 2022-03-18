import { sandboxOf } from 'angular-playground';
import { BehaviorSubject } from 'rxjs';
import { GvButtonsModule } from '../../gv-buttons.module';
import { ToggleBtnComponent } from './toggle-btn.component';


export default sandboxOf(ToggleBtnComponent, {
  declareComponent: false,
  imports: [
    GvButtonsModule,
  ]
})
  .add('Toggle Button Icon Text', {
    context: {
      value$: new BehaviorSubject(true)
    },
    template: `
      <gv-toggle-btn [value$]="value$" (change)="value$.next($event)">
        <button gv-toggle-on mat-flat-button color="primary" class="mat-btn-padding-left-8">
          <mat-icon>edit</mat-icon> switch on
        </button>

        <button gv-toggle-off mat-button color="primary" class="mat-btn-padding-left-8">
            <mat-icon>edit</mat-icon> switch off
        </button>

      </gv-toggle-btn>
    `
  })
  .add('Toggle Button Icon', {
    context: {
      value$: new BehaviorSubject(true)
    },
    template: `
      <gv-toggle-btn [value$]="value$" (change)="value$.next($event)">
        <button gv-toggle-on mat-flat-button color="primary" class="mat-btn-padding-x-8">
          <mat-icon>edit</mat-icon>
        </button>

        <button gv-toggle-off mat-button color="primary" class="mat-btn-padding-x-8">
            <mat-icon>edit</mat-icon>
        </button>
      </gv-toggle-btn>
    `
  })
