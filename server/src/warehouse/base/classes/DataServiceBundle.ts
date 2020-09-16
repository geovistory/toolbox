export abstract class DataServiceBundle<DS> {
    registered: DS[] = [];

    abstract clearAll(): Promise<void>

    registerDataService<M extends DS>(dep: M) {
        this.registered.push(dep);
        return dep;
    }
}
