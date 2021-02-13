import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ValidationService } from 'projects/app-toolbox/src/app/core/validation/validation.service';
import { classOrTypeRequiredValidator } from 'projects/app-toolbox/src/app/modules/queries/components/class-and-type-select/class-and-type-select.component';
import { QueryFilterComponent } from 'projects/app-toolbox/src/app/modules/queries/components/query-filter/query-filter.component';
import { QueryPathFormComponent } from 'projects/app-toolbox/src/app/modules/queries/forms/query-path/query-path-form/query-path-form.component';
import { values } from 'd3';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
let TableFormService = class TableFormService {
    constructor(c) {
        this.c = c;
        this.selectedRootClasses$ = new BehaviorSubject([]);
        /**
         * Config of a rootNode
         * maps the values of the secondLevel node
         */
        this.rootNodeConfig = () => ([{
                array: {
                    data: {
                        root: true
                    },
                    placeholder: '',
                    validators: [ValidationService.arrayLengthValidator(2, Number.POSITIVE_INFINITY)],
                    mapValue: ([rootClasses, columns, filter]) => {
                        return ({
                            queryDefinition: {
                                columns,
                                filter,
                            }
                        });
                    }
                }
            }]);
        /**
         * Config of queryDefinition
         * queryDefinition is a container for the individual fields needed for a table analisys definition
         * - filter
         * - columns
         * @param rootClasses$ the classes that appear in the query filter root select dropdown
         */
        this.queryDefinitionConfig = (rootClasses$, initVal$, initVal) => {
            const classAndTypeSelection$ = new Subject();
            return {
                classAndTypeSelection$,
                config: [
                    this.ctrlRootClassesConfig(rootClasses$, initVal.data, new BehaviorSubject(true)),
                    {
                        array: {
                            data: {
                                columns: true
                            },
                            placeholder: '',
                            validators: [ValidationService.arrayLengthValidator(1, Number.POSITIVE_INFINITY)],
                            required: true,
                            mapValue: (x) => x.map((c, i) => {
                                const colDef = Object.assign({}, c, { id: 'col_' + i });
                                return colDef;
                            })
                        }
                    },
                    {
                        childFactory: {
                            component: QueryFilterComponent,
                            required: true,
                            data: {
                                filter: {
                                    rootClasses$,
                                    initVal$,
                                    disableRootCtrl: true
                                }
                            },
                            getInjectData: (data) => data.filter,
                            mapValue: (x) => {
                                classAndTypeSelection$.next(x.data);
                                return x;
                            }
                        }
                    },
                ]
            };
        };
        /**
       * Config of control for selecting the root classes
       */
        this.ctrlRootClassesConfig = (rootClasses$, selectedRootClasses, disabled$) => {
            return {
                control: {
                    data: {
                        ctrlClasses: {
                            pkClasses$: rootClasses$,
                        },
                    },
                    disabled$,
                    validators: [classOrTypeRequiredValidator()],
                    initValue: selectedRootClasses,
                    placeholder: 'Select Classes / Types',
                    required: true,
                    mapValue: (x) => x
                }
            };
        };
        /**
         * Config of columns
         * columns is array of column
         */
        this.columnConfig = (colDef) => ({
            array: {
                data: {
                    colDef
                },
                placeholder: '',
                required: true,
                mapValue: ([label, queryPath]) => (Object.assign({}, colDef, { label,
                    queryPath }))
            }
        });
        /**
         * Config of a column with a custom path
         * column is a container with those fields
         * - columnLabel
         * - queryPath
         */
        this.columnFieldsConfig = (colDef) => {
            if (colDef.defaultType) {
                return [{
                        control: {
                            data: {
                                columnLabel: true,
                            },
                            initValue: colDef.label,
                            placeholder: 'Name',
                            required: true,
                            mapValue: (x) => x
                        }
                    }];
            }
            else {
                return [
                    {
                        control: {
                            data: {
                                columnLabel: true,
                            },
                            placeholder: 'Name',
                            initValue: colDef.label,
                            required: true,
                            mapValue: (x) => x
                        }
                    },
                    this.queryPathChildConfig(colDef),
                ];
            }
        };
        this.rootClasses$ = this.c.pipeClassesInEntitiesOrSources().pipe(map(x => values(x)));
    }
    queryPathChildConfig(colDef) {
        return {
            childFactory: {
                component: QueryPathFormComponent,
                data: {
                    path: {
                        rootClasses$: this.rootClasses$,
                        initVal$: this.prependFirstQueryPathSegment(colDef.queryPath)
                    }
                },
                required: true,
                getInjectData: (data) => data.path,
                mapValue: (x) => this.dropFirstQueryPathSegment(x)
            }
        };
    }
    /**
     * Prepends a root segment consisting of the selected root classes
     * @param segments
     */
    prependFirstQueryPathSegment(segments) {
        return this.selectedRootClasses$.pipe(map(classes => {
            if (!segments || !segments.length || segments[0].type === 'properties') {
                return [
                    {
                        type: 'classes',
                        data: { classes, types: [] }
                    },
                    ...(segments || [])
                ];
            }
            else {
                segments[0].data.classes = classes;
                return segments;
            }
        }));
    }
    /**
     * drops the root segment, consisting of the selected root classes
     * @param segments
     */
    dropFirstQueryPathSegment(segments) {
        const [first, ...rest] = segments;
        return rest;
    }
};
TableFormService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], TableFormService);
export { TableFormService };
//# sourceMappingURL=table-form.service.js.map