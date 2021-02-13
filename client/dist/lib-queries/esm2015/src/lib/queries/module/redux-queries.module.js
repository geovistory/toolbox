/**
 * @fileoverview added by tsickle
 * Generated from: module/redux-queries.module.ts
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
export class ReduxQueriesModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdXgtcXVlcmllcy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXF1ZXJpZXMvc3JjL2xpYi9xdWVyaWVzLyIsInNvdXJjZXMiOlsibW9kdWxlL3JlZHV4LXF1ZXJpZXMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDckYsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDcEYsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDM0YsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDaEYsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDOUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFtQnZELE1BQU0sT0FBTyxrQkFBa0I7OztZQWQ5QixRQUFRLFNBQUM7Z0JBQ1IsWUFBWSxFQUFFLEVBQUU7Z0JBQ2hCLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLGdCQUFnQjtpQkFDakI7Z0JBQ0QsU0FBUyxFQUFFO29CQUNULHNCQUFzQjtvQkFDdEIseUJBQXlCO29CQUN6Qix5QkFBeUI7b0JBQ3pCLDRCQUE0QjtvQkFDNUIsdUJBQXVCO2lCQUN4QjthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmVQcm9qZWN0UGlwZXNTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvYWN0aXZlLXByb2plY3QtcGlwZXMuc2VydmljZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0aW9uUGlwZXNTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvY29uZmlndXJhdGlvbi1waXBlcy5zZXJ2aWNlJztcbmltcG9ydCB7IEluZm9ybWF0aW9uQmFzaWNQaXBlc1NlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9pbmZvcm1hdGlvbi1iYXNpYy1waXBlcy5zZXJ2aWNlJztcbmltcG9ydCB7IEluZm9ybWF0aW9uUGlwZXNTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvaW5mb3JtYXRpb24tcGlwZXMuc2VydmljZSc7XG5pbXBvcnQgeyBTY2hlbWFTZWxlY3RvcnNTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvc2NoZW1hLXNlbGVjdG9ycy5zZXJ2aWNlJztcbmltcG9ydCB7IFJlZHV4U3RvcmVNb2R1bGUgfSBmcm9tICdAa2xlaW9sYWIvbGliLXJlZHV4JztcbmltcG9ydCB7IFNvY2tldHNNb2R1bGUgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNvY2tldHMnO1xuXG5cblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXSxcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBSZWR1eFN0b3JlTW9kdWxlLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBTY2hlbWFTZWxlY3RvcnNTZXJ2aWNlLFxuICAgIEFjdGl2ZVByb2plY3RQaXBlc1NlcnZpY2UsXG4gICAgQ29uZmlndXJhdGlvblBpcGVzU2VydmljZSxcbiAgICBJbmZvcm1hdGlvbkJhc2ljUGlwZXNTZXJ2aWNlLFxuICAgIEluZm9ybWF0aW9uUGlwZXNTZXJ2aWNlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgUmVkdXhRdWVyaWVzTW9kdWxlIHsgfVxuIl19