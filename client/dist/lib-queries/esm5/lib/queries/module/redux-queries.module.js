/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/module/redux-queries.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ActiveProjectPipesService } from '../services/active-project-pipes.service';
import { ConfigurationPipesService } from '../services/configuration-pipes.service';
import { InformationBasicPipesService } from '../services/information-basic-pipes.service';
import { InformationPipesService } from '../services/information-pipes.service';
import { SchemaSelectorsService } from '../services/schema-selectors.service';
import { ReduxStoreModule } from '@kleiolab/lib-redux';
var ReduxQueriesModule = /** @class */ (function () {
    function ReduxQueriesModule() {
    }
    ReduxQueriesModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [],
                    imports: [
                        CommonModule,
                        ReduxStoreModule,
                    ],
                    providers: [
                        SchemaSelectorsService,
                        ActiveProjectPipesService,
                        ConfigurationPipesService,
                        InformationBasicPipesService,
                        InformationPipesService
                    ]
                },] }
    ];
    return ReduxQueriesModule;
}());
export { ReduxQueriesModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdXgtcXVlcmllcy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXF1ZXJpZXMvIiwic291cmNlcyI6WyJsaWIvcXVlcmllcy9tb2R1bGUvcmVkdXgtcXVlcmllcy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUNyRixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNwRixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUMzRixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNoRixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUM5RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUt2RDtJQUFBO0lBY2tDLENBQUM7O2dCQWRsQyxRQUFRLFNBQUM7b0JBQ1IsWUFBWSxFQUFFLEVBQUU7b0JBQ2hCLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLGdCQUFnQjtxQkFDakI7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULHNCQUFzQjt3QkFDdEIseUJBQXlCO3dCQUN6Qix5QkFBeUI7d0JBQ3pCLDRCQUE0Qjt3QkFDNUIsdUJBQXVCO3FCQUN4QjtpQkFDRjs7SUFDaUMseUJBQUM7Q0FBQSxBQWRuQyxJQWNtQztTQUF0QixrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2ZVByb2plY3RQaXBlc1NlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9hY3RpdmUtcHJvamVjdC1waXBlcy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRpb25QaXBlc1NlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9jb25maWd1cmF0aW9uLXBpcGVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgSW5mb3JtYXRpb25CYXNpY1BpcGVzU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2luZm9ybWF0aW9uLWJhc2ljLXBpcGVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgSW5mb3JtYXRpb25QaXBlc1NlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9pbmZvcm1hdGlvbi1waXBlcy5zZXJ2aWNlJztcbmltcG9ydCB7IFNjaGVtYVNlbGVjdG9yc1NlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9zY2hlbWEtc2VsZWN0b3JzLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVkdXhTdG9yZU1vZHVsZSB9IGZyb20gJ0BrbGVpb2xhYi9saWItcmVkdXgnO1xuaW1wb3J0IHsgU29ja2V0c01vZHVsZSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc29ja2V0cyc7XG5cblxuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtdLFxuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFJlZHV4U3RvcmVNb2R1bGUsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIFNjaGVtYVNlbGVjdG9yc1NlcnZpY2UsXG4gICAgQWN0aXZlUHJvamVjdFBpcGVzU2VydmljZSxcbiAgICBDb25maWd1cmF0aW9uUGlwZXNTZXJ2aWNlLFxuICAgIEluZm9ybWF0aW9uQmFzaWNQaXBlc1NlcnZpY2UsXG4gICAgSW5mb3JtYXRpb25QaXBlc1NlcnZpY2VcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBSZWR1eFF1ZXJpZXNNb2R1bGUgeyB9XG4iXX0=