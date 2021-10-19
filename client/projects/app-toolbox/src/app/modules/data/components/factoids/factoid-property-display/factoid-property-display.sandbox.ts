import { ConfigurationPipesService, Field } from '@kleiolab/lib-queries';
import { sandboxOf } from 'angular-playground';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { InitStateModule } from 'projects/app-toolbox/src/app/shared/components/init-state/init-state.module';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { DataModule } from '../../../data.module';
import { FactoidPropertyDisplayComponent } from './factoid-property-display.component';

/*****************************************************************************
 * MOCK services
 *****************************************************************************/
class ConfigurationPipesServiceMock {
    pipeFields(pkClass: number, noNesting = false): Observable<Partial<Field>[]> {
        return of([
            { label: 'property label 1', property: { fkProperty: 1 } },
            { label: 'property label 2', property: { fkProperty: 2 } },
            { label: 'property label 3', property: { fkProperty: 3 } },
            { label: 'property label 4', property: { fkProperty: 4 } },
            { label: 'property label 5', property: { fkProperty: 5 } }
        ])
    }
}
class ActiveProjectServiceMock {
    dfh$ = {
        property$: {
            by_pk_property$: {
                key: (pk) => new BehaviorSubject({
                    21: {
                        identifier_in_namespace: 'P9999'
                    }
                })
            }
        }
    }
}

/*****************************************************************************
 * Sandboxes
 *****************************************************************************/
export default sandboxOf(FactoidPropertyDisplayComponent, {
    declareComponent: false,
    imports: [
        DataModule,
        InitStateModule,
    ],
    providers: [
        { provide: ConfigurationPipesService, useClass: ConfigurationPipesServiceMock },
        { provide: ActiveProjectService, useClass: ActiveProjectServiceMock }
    ]
})
    .add('FactoidPropertyDisplayComponent', {
        context: {},
        template: `
    <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>
    <div style="display:flex;flex-direction:row;justify-content:center">
        <gv-factoid-property-display></gv-factoid-property-display>
    </div>
    `
    })
