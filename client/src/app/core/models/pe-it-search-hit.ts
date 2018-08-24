export interface PeItSearchHitI {}


export class PeItSearchHit implements PeItSearchHitI {
    
    constructor(data?: PeItSearchHitI) {
        Object.assign(this, data);
    }
}