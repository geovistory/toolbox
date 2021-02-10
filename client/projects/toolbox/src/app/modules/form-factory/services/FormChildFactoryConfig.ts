import { ValidatorFn } from '@angular/forms';
export interface FormChildFactoryConfig<Ch> {
    component: any;
    required: boolean;
    validators?: ValidatorFn[];
    data: Ch;
    mapValue: (d) => any;
    /**
     * function that gets called when data is injected
     * to child component. the data obbject will be passed
     * in the paramter. The return value will be injected
     */
    getInjectData: (data: Ch) => any;
    // gets called when removed
    removeHook?: () => any;
}
