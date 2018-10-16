import { sandboxOf } from 'angular-playground';
import { Information2Module } from '../../information.module';
import { ClassAndTypeSelectorComponent } from './class-and-type-selector.component';
import { crm } from 'app/core/active-project/_mock-data';
import { ProjectDetail } from 'app/core';
import { InitStateModule } from 'app/shared/components/init-state/init-state.module';



export default sandboxOf(ClassAndTypeSelectorComponent, {
    declareComponent: false,
    imports: [
        Information2Module,
        InitStateModule
    ]
})
    .add('Select Class and Type', {
        context: {
            pkClasses: [363, 441],
            pkProject: 8,
            basePath: ['sandbox', 'selectClassAndType'],
            activeProject: {
                crm
            } as ProjectDetail,
        },
        template: `
        <gv-init-state [activeProject]="activeProject"></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px">
                    <gv-class-and-type-selector [pkClasses]="pkClasses" [pkProject]="pkProject" [basePath]="basePath" (select)="item = $event"></gv-class-and-type-selector>
            </div>
            <div>
                {{item | json}}
            </div>
        </div>`
    })

