import { ExTimeLabel } from './ex-time-label';

export interface RoleLabelI {
    type: 'te-ent' | 'ex-time' | 'lang' | 'appe' | 'place' | 'leaf-pe-it';
    string?: string;  // for other types
    exTimeLabel?: ExTimeLabel; // for type 'time-prim'
}

export class RoleLabel implements RoleLabelI {
    type: 'te-ent' | 'ex-time' | 'lang' | 'appe' | 'place' | 'leaf-pe-it';
    string?: string;  // for other types
    exTimeLabel?: ExTimeLabel; // for type 'time-prim'

    constructor(data?: RoleLabelI) {
        Object.assign(this, data);
    }
}
