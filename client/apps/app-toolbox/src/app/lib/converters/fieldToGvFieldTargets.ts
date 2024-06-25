import { Field, GvFieldTargets } from '@kleiolab/lib-redux';
import { values } from 'd3';



export function fieldToGvFieldTargets(field: Field): GvFieldTargets {
    const res: GvFieldTargets = {};
    values(field.targets).forEach(t => {
        res[t.targetClass] = t.viewType;
    });
    return res;
}
