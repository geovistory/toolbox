import { ReducerConfigCollection } from '../_helpers/reducer-factory';
import { ProClassFieldConfig, ProTextProperty } from '@kleiolab/lib-sdk-lb3';
export declare const proRoot = "pro";
export declare const textPropertyByFksKey: (d: Partial<ProTextProperty>) => string;
export declare const textPropertyByFksWithoutLang: (d: Partial<ProTextProperty>) => string;
export declare const proClassFieldConfgByProjectAndClassKey: (d: Partial<ProClassFieldConfig>) => string;
export declare const proDefinitions: ReducerConfigCollection;
