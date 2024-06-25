import { InfData, StatementWithTarget } from '@kleiolab/lib-sdk-lb4';


export function statemenTargetToInfData(input: StatementWithTarget['target'] = {}): InfData {
    return {
        appellation: input.appellation,
        timePrimitive: input.timePrimitive?.infTimePrimitive,
        place: input.place,
        dimension: input.dimension?.dimension,
        langString: input.langString?.langString,
        language: input.language,
        statement: input.place,
        resource: input.entity?.resource
    };
}
