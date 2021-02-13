import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { classOrTypeRequiredValidator } from '../class-and-type-select/class-and-type-select.component';
import { propertiesRequiredValidator } from '../property-select/property-select.component';
let QueryFilterService = class QueryFilterService {
    /*****************************************************************
     * Methods that return a QfFormNodeConfig
     *
     * those methods normally
     * - take a initValue
     * - optionally data aout the options of a select
     * - optionally Observable boolean for disabled state
     * - return one QfFormNodeConfig
     *
     * Naming convention:
     * - Methods returning config for FormControl begin with 'createCtrl'
     * - Methods returning config for FormArray begin with 'createArr'
     * - Methods returning config for FormGroup begin with 'createGroup'
     * - Methods returning config for childFactory begin with 'createChild'
     *
     *****************************************************************/
    /**
     * Creates a QfFormNodeConfig for an FormArray that will have two children
     * 1. FormControl for operator (IS, IS NOT, LABEL CONTAINS, ...)
     * 2. <any>Control depending on 1.
     * @param propertyOptions$ Observable of property options (will be passed to 2. if necessary)
     * @param initVal intital Value
     */
    createArrCondition(propertyOptions$, initVal) {
        return {
            array: {
                placeholder: '',
                data: {
                    arrayCondition: { propertyOptions$, initVal }
                },
                mapValue: (x) => {
                    const [condition, data, ...children] = x;
                    return {
                        data: Object.assign({ operator: condition }, data),
                        children
                    };
                }
            }
        };
    }
    /**
     * Creates a QfFormNodeConfig for an FormArray that will have one or two children
     * 1. FormControl for classes and types
     * 2. FormArray for next subgroup (optionally)
     * @param pkClasses$ Observable of classes options (will be passed to 1.)
     * @param initVal intital Value
     */
    createArrClasses(pkClasses$, initVal, disabled) {
        return {
            array: {
                placeholder: '',
                data: {
                    arrayClasses: {
                        pkClasses$: pkClasses$,
                        initVal: initVal || { data: {}, children: [] },
                        disabled
                    }
                },
                mapValue: (x) => {
                    try {
                        const [data, ...children] = x;
                        return {
                            data,
                            children
                        };
                    }
                    catch (error) {
                        console.error(error);
                    }
                }
            }
        };
    }
    /**
     * Creates a QfFormNodeConfig for an FormArray that will have those children
     * 1: operator
     * 2..n: FormArray for classes and types
     * @param pkClasses$ Observable of classes options (will be passed to 1.)
     * @param initVal intital Value
     */
    createArrSubgroupOfProperties(pkClasses$, initVal) {
        return {
            id: 'subgroupOfProperties',
            array: {
                placeholder: '',
                data: {
                    arraySubgroup: {
                        pkClasses$,
                        initVal: initVal || { data: {}, children: [] }
                    }
                },
                mapValue: (x) => {
                    const [operator, ...children] = x;
                    return {
                        data: {
                            operator,
                            subgroup: 'classAndType'
                        },
                        children: children.filter(c => !!c)
                    };
                }
            }
        };
    }
    /**
   * Creates a QfFormNodeConfig for an FormArray that will have those children
   * 1: operator
   * 2..n: FormArray for classes and types
   * @param pkClasses$ Observable of classes options (will be passed to 1.)
   * @param initVal intital Value
   */
    createArrSubgroupOfClasses(propertyOptions$, initVal) {
        return {
            id: 'subgroupOfClasses',
            array: {
                placeholder: '',
                data: {
                    arraySubgroup: {
                        propertyOptions$,
                        initVal: initVal || { data: {}, children: [] }
                    }
                },
                mapValue: (x) => {
                    const [operator, ...children] = x;
                    return {
                        data: {
                            operator,
                            subgroup: 'property'
                        },
                        children: children.filter(c => !!c)
                    };
                }
            }
        };
    }
    /**
     * Creates a QfFormNodeConfig for an FormControl that allows to select classes and types
     * @param pkClasses$ Observable of classes options
     * @param initValue intital Value
     */
    createCtrlClasses(pkClasses$, initValue, disabled$) {
        const value$ = new BehaviorSubject(initValue);
        return {
            value$,
            ctrlClasses: {
                control: {
                    required: true,
                    validators: [classOrTypeRequiredValidator()],
                    placeholder: 'Classes / Types',
                    disabled$,
                    data: {
                        ctrlClasses: { pkClasses$ }
                    },
                    mapValue: (val) => {
                        value$.next(val);
                        return val;
                    },
                    initValue
                },
            }
        };
    }
    /**
     * Creates a QfFormNodeConfig for an FormControl that allows to select a
     * subgoup operator, e.g. 'AND', 'OR'
     *
     * Default: 'AND'
     *
     * @param initValue intital Value
     */
    createCtrlOperator(initValue) {
        return {
            control: {
                data: {
                    ctrlOperator: {
                        options: [
                            { value: 'OR', label: 'or' },
                            { value: 'AND', label: 'and' }
                        ]
                    }
                },
                mapValue: (val) => {
                    return val;
                },
                placeholder: 'Operator',
                required: true,
                initValue: initValue || 'AND'
            }
        };
    }
    /**
     * Creates a QfFormNodeConfig for an FormControl that allows to select a
     * condition operator, e.g. 'IS', 'IS NOT', 'ENTITY_LABEL_CONTAINS'
     *
     * Default: 'ENTITY_LABEL_CONTAINS'
     *
     * @param initValue intital Value
     */
    createCtrlCondition(initValue = 'ENTITY_LABEL_CONTAINS') {
        const value$ = new BehaviorSubject(initValue);
        return {
            value$,
            ctrlCondition: {
                id: 'condition',
                control: {
                    required: true,
                    placeholder: 'Condition',
                    data: {
                        ctrlCondition: {
                            options: [
                                { value: 'ENTITY_LABEL_CONTAINS', label: 'Entity Label contains' },
                                { value: 'IS', label: 'Has one of the properties' },
                                { value: 'IS NOT', label: 'Has none of the properties' },
                            ]
                        }
                    },
                    mapValue: (val) => {
                        value$.next(val);
                        return val;
                    },
                    initValue
                },
            }
        };
    }
    /**
     * Creates a QfFormNodeConfig for an FormControl that allows to select
     * properties
     *
     * @param propertyOptions$ Observable of property options
     * @param initValue intital Value corresponds to the model of the control
     */
    createCtrlProperties(propertyOptions$, initValue) {
        const value$ = new BehaviorSubject(initValue);
        return {
            value$,
            ctrlProperties: {
                id: 'properties',
                control: {
                    required: true,
                    validators: [propertiesRequiredValidator()],
                    placeholder: 'Properties',
                    data: {
                        ctrlProperties: {
                            options$: propertyOptions$
                        }
                    },
                    mapValue: (x) => x,
                    initValue
                }
            }
        };
    }
    /**
     * Creates a QfFormNodeConfig for an FormControl that allows to enter
     * a string
     *
     * @param propertyOptions$ Observable of property options
     * @param initValue intital Value corresponds to the model of the control
     */
    createCtrlSearchTerm(initValue) {
        return {
            id: 'searchTerm',
            control: {
                required: true,
                placeholder: 'Search Term',
                data: {
                    ctrlSearchTerm: true
                },
                mapValue: (searchTerm) => {
                    return { searchTerm };
                },
                initValue
            }
        };
    }
    /*****************************************************************
     * Methods that return an Array<QfFormNodeConfig>
     *
     * those methods normally
     * - take a initValue and optionally more data,
     *   e.g. the options of a select
     * - return an array of QfFormNodeConfig
     *****************************************************************/
    /*****************************************************************
     * Methods of specific logic
     *****************************************************************/
    /**
     * Creates the children node configs of a QfArraySubgroup
     *
     * The logic uses the given QfArraySubgroup configuration to decide
     * what child should be created.
     *
     * @param arraySubgroup
     * @param initValue
     */
    createSubgroupOfArrSoubgroup(arraySubgroup, initValue) {
        const initVal = initValue || { data: {}, children: [] };
        let n;
        if (arraySubgroup.propertyOptions$) {
            n = this.createArrCondition(arraySubgroup.propertyOptions$, initVal);
        }
        else if (arraySubgroup.pkClasses$) {
            n = this.createArrClasses(arraySubgroup.pkClasses$, initVal);
        }
        else {
            throw new Error('arraySubgroup not properly defined.');
        }
        return n;
    }
};
QueryFilterService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], QueryFilterService);
export { QueryFilterService };
//# sourceMappingURL=query-filter.service.js.map