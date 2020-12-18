export abstract class DataServiceBundle<DS> {
    registered: DS[] = [];


    registerDataService<M extends DS>(dep: M) {
        this.registered.push(dep);
        return dep;
    }
}
