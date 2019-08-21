import { sandboxOf } from 'angular-playground';
import { InitStateModule } from '../../../../shared/components/init-state/init-state.module';
import { Information2Module } from '../../information.module';
import { ClassesAndTypesSelectComponent } from './classes-and-types-select.component';




export default sandboxOf(ClassesAndTypesSelectComponent, {
  declareComponent: false,
  imports: [
    Information2Module,
    InitStateModule,
  ]
})
  .add('ClassesAndTypesSelectComponent | Sources ', {
    context: {
      model: {},
      parentPath: ''
    },
    template: `
    <gv-init-state [projectFromApi]="24" ></gv-init-state>

    <div class="d-flex justify-content-center mt-5">
      <div style="width:430px;height:400px" class="d-flex">
        <gv-classes-and-types-select enabledIn="sources" (select)="selected = $event"></gv-classes-and-types-select>
      </div>
      <div>
          <p>Selected {{selected | json}}</p>
      </div>
    </div>
    `
  })
  .add('ClassesAndTypesSelectComponent | Entities ', {
    context: {
      model: {},
      parentPath: ''
    },
    template: `
    <gv-init-state [projectFromApi]="24" ></gv-init-state>

    <div class="d-flex justify-content-center mt-5">
      <div style="width:430px;height:400px" class="d-flex">
        <gv-classes-and-types-select enabledIn="entities" (select)="selected = $event"></gv-classes-and-types-select>
      </div>
      <div>
          <p>Selected {{selected | json}}</p>
      </div>
    </div>
    `
  })
