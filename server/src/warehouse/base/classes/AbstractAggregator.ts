
export abstract class AbstractAggregator<ValueModel> {
    constructor() { }
    abstract create(): Promise<ValueModel>;
}
