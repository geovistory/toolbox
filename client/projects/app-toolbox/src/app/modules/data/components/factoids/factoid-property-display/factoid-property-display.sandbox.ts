import { ConfigurationPipesService, DisplayType, SectionName } from '@kleiolab/lib-queries';
import { sandboxOf } from 'angular-playground';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { InitStateModule } from 'projects/app-toolbox/src/app/shared/components/init-state/init-state.module';
import { BehaviorSubject, of } from 'rxjs';
import { DataModule } from '../../../data.module';
import { FactoidPropertyDisplayComponent } from './factoid-property-display.component';

/*****************************************************************************
 * MOCK services
 *****************************************************************************/
class ConfigurationPipesServiceMock {
    pipeSection(pkClass: number, displayType: DisplayType, section: SectionName) {
        if (section == 'basic') return of([
            { label: 'property label 2 basic', property: { fkProperty: 2 } }])
        if (section == 'metadata') return of([
            { label: 'property label metadata 1', property: { fkProperty: 1 } },
            { label: 'property label metadata 2', property: { fkProperty: 2 } }])
        if (section == 'specific') return of([
            { label: 'property label specific 1', property: { fkProperty: 1 } },
            { label: 'property label specific 2', property: { fkProperty: 2 } }])
        if (section == 'simpleForm') return of([])
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
