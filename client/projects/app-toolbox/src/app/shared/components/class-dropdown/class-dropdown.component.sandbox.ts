import { ConfigurationPipesService } from '@kleiolab/lib-queries';
import { DfhClass } from '@kleiolab/lib-sdk-lb4';
import { sandboxOf } from 'angular-playground';
import { Observable, of } from 'rxjs';
import { InitStateModule } from '../init-state/init-state.module';
import { ClassDropdownComponent } from './class-dropdown.component';
import { ClassDropdownModule } from './class-dropdown.module';

/*****************************************************************************
 * MOCK services
 *****************************************************************************/
class ConfigurationPipesServiceMock {
    pipeClassesEnabledByProjectProfiles(): Observable<Partial<DfhClass>[]> {
        return of([
            { pk_class: 21, basic_type: 8 },
            { pk_class: 61 },
            { pk_class: 63 },
            { pk_class: 566 }
        ])
    }
    pipeClassLabel(pkClass: number): Observable<string> {
        let toReturn = '';
        if (pkClass == 21) toReturn = 'Person';
        if (pkClass == 61) toReturn = 'Birth';
        if (pkClass == 63) toReturn = 'Death';
        if (pkClass == 566) toReturn = 'Gender';
        return of(toReturn)
    }
}

/*****************************************************************************
 * Sandboxes
 *****************************************************************************/
export default sandboxOf(ClassDropdownComponent, {
    declareComponent: false,
    imports: [
        ClassDropdownModule,
        InitStateModule,
    ],
    providers: [
        { provide: ConfigurationPipesService, useClass: ConfigurationPipesServiceMock }
    ]
})
    .add('ClassDropdownComponent', {
        context: {},
        template: `
    <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>
    <span style="width:100%; display:flex; flex-direction:row; justify-content:center;">Empty</span>
    <div style="display:flex;flex-direction:row;justify-content:center">
        <gv-class-dropdown></gv-class-dropdown>
    </div>

    <span style="width:100%; display:flex; flex-direction:row; justify-content:center;">Filled with person</span>
    <div style="display:flex;flex-direction:row;justify-content:center">
        <gv-class-dropdown [pkClass]="21"></gv-class-dropdown>
    </div>
    `
    })
