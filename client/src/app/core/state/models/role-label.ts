import { ExTimeLabel } from './ex-time-label';



export class RoleLabel{
    // path of that role in store
    path: string[];

    type: 'te-ent' | 'ex-time' | 'lang' | 'appe' | 'place' | 'leaf-pe-it' | 'txt-prop';
    string?: string;  // for other types
    exTimeLabel?: ExTimeLabel; // for type 'time-prim'

    constructor(data?: RoleLabel) {
        Object.assign(this, data);
    }
}
