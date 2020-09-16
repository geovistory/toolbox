
export abstract class AbstractAggregator<IdModel> {
    constructor() { }
    abstract create(id: IdModel): Promise<AbstractAggregator<IdModel>>;
}
