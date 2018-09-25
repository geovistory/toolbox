import { sandboxOf } from 'angular-playground';
import { Information2Module } from '../../information.module';
import { AppeLangCreateCtrlComponent } from './appe-lang-create-ctrl.component';
import { InfLanguage, InfRole } from '../../../../core';
import { DfhConfig } from '../../shared/dfh-config';





export default sandboxOf(AppeLangCreateCtrlComponent, {
    imports: [
        Information2Module
    ],
    declareComponent: false
})
    .add('Appe-Lang Ctrl | New ', {
        context: {
            model: {}
        },
        template: `
            <div class="d-flex justify-content-center mt-5">
                <div style="width:430px;height:400px" class="d-flex mr-4">
                    <form #f="ngForm">
                        <gv-appe-lang-create-ctrl name="roles" [(ngModel)]="model.roles" #roles="ngModel" required>
                        </gv-appe-lang-create-ctrl>
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
            </div>
        `
    })
    .add('Appe-Lang Ctrl | Language Preset ', {
        context: {
            model: {
                roles: [
                    new InfRole({
                        fk_entity: undefined,
                        fk_property: DfhConfig.PROPERTY_PK_R61_USED_LANGUAGE,
                        fk_temporal_entity: undefined,
                        language: new InfLanguage({
                            fk_class: 54,
                            lang_type: 'living',
                            scope: 'individual',
                            iso6392b: 'ger',
                            iso6392t: 'deu',
                            iso6391: 'de ',
                            notes: 'German',
                            pk_entity: 18605
                        })
                    })
                ]
            }
        },
        template: `
            <div class="d-flex justify-content-center mt-5">
                <div style="width:430px;height:400px" class="d-flex mr-4">
                    <form #f="ngForm" class="gv-flex-grow-1">
                        <gv-appe-lang-create-ctrl name="roles" [(ngModel)]="model.roles" #roles="ngModel" required>
                        </gv-appe-lang-create-ctrl>
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
            </div>
        `
    })
