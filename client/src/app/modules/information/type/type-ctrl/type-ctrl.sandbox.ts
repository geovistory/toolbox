import { sandboxOf } from 'angular-playground';
import { InfEntityAssociation, ProjectDetail } from 'app/core';
import { InitStateModule } from 'app/shared/components/init-state/init-state.module';
import { Information2Module } from '../../information.module';
import { TypeCtrl } from './api/type-ctrl.models';
import { TypeCtrlComponent } from './type-ctrl.component';



export default sandboxOf(TypeCtrlComponent, {
    declareComponent: false,
    imports: [
        Information2Module,
        InitStateModule
    ]
})
    .add('Type Ctrl | Select ', {
        context: {
            model: {
                assoc: {} as InfEntityAssociation
            },
            activeProject: {
                pk_project: 8 // use same pkProject
            } as ProjectDetail,
            basePath: ['sandboxState', '_typeCtrl'],
            sandboxState: {
                _typeCtrl: {
                    pkTypedClass: 363 // Geo-Place
                } as TypeCtrl
            }
        },
        template: `
        <gv-init-state [activeProject]="activeProject" [sandboxState]="sandboxState"></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px">
                <form #f="ngForm">
                    <gv-type-ctrl class="gv-outer-form-control" name="assoc" [(ngModel)]="model.assoc" #assoc="ngModel" [basePath]="basePath" required></gv-type-ctrl>
                </form>
            </div>
            <div>
                <p>Form.valid: {{f.valid | json}}</p>

                <p>Form.touched: {{f.touched | json}}</p>

                <p>Form.dirty: {{f.dirty | json}}</p>

                <p>Form.value </p>
                <pre>
                    {{f.value | json}}
                </pre>

            </div>
        </div>`
    })
    .add('Type Ctrl | Preset ', {
        context: {
            model: {
                assoc: {
                    fk_property: 1,
                    fk_info_domain: 22,
                    fk_info_range: 80490
                } as InfEntityAssociation
            },
            activeProject: {
                pk_project: 8 // use same pkProject
            } as ProjectDetail,
            basePath: ['sandboxState', '_typeCtrl'],
            sandboxState: {
                _typeCtrl: {
                    pkTypedClass: 363 // Geo-Place
                } as TypeCtrl
            }
        },
        template: `
        <gv-init-state [activeProject]="activeProject" [sandboxState]="sandboxState"></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px">
                <form #f="ngForm">
                    <gv-type-ctrl class="gv-outer-form-control" name="assoc" [(ngModel)]="model.assoc" #assoc="ngModel" [basePath]="basePath" required></gv-type-ctrl>
                </form>
            </div>
            <div>
                <p>Form.valid: {{f.valid | json}}</p>

                <p>Form.touched: {{f.touched | json}}</p>

                <p>Form.dirty: {{f.dirty | json}}</p>

                <p>Form.value </p>
                <pre>
                    {{f.value | json}}
                </pre>

            </div>
        </div>`
    })

