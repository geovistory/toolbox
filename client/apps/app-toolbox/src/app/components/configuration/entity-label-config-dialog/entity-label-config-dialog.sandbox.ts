import { sandboxOf } from 'angular-playground';
import { InitStateModule } from '../../../../shared/components/init-state/init-state.module';
import { ClassConfigModule } from '../../../../modules/class-config/class-config.module';
import { EntityLabelConfigDialogComponent } from './entity-label-config-dialog.component';
import { ConfirmDialogModule } from '../../../../shared/components/confirm-dialog/confirm-dialog.module';



export default sandboxOf(EntityLabelConfigDialogComponent, {
  imports: [
    InitStateModule,
    ClassConfigModule,
    ConfirmDialogModule
  ],
  providers: [

  ],
  declareComponent: false
})
  .add('Entity Label Config Dialog', {
    context: {
      pkProject: 591,
      fkClass: 61
    },
    template: `
    <div class="d-flex justify-content-center mt-5">
      <div style="width:700px;height:400px" class="d-flex">

        <gv-init-state [projectFromApi]="pkProject"></gv-init-state>
        <gv-entity-label-config-open-btn [fkClass]="fkClass">
          <button>open</button>
        </gv-entity-label-config-open-btn>
      </div>
    </div>
        `
  })

