import { getFromTo, indexStatementByObject, indexStatementByObjectProperty, indexStatementBySubject, indexStatementBySubjectProperty, infDefinitions, infRoot, paginatedBy, paginateKey, paginateName, PR_ENTITY_MODEL_MAP } from '@kleiolab/lib-redux';
import { combineLatestOrEmpty } from '@kleiolab/lib-utils';
import { values } from 'd3';
import { of, pipe } from 'rxjs';
import { filter, first, map, switchMap } from 'rxjs/operators';
class Selector {
    constructor(ngRedux, pkProject$, configs, model) {
        this.ngRedux = ngRedux;
        this.pkProject$ = pkProject$;
        this.configs = configs;
        this.model = model;
    }
    selector(indexKey) {
        const all$ = this.pkProject$.pipe(switchMap(pk => {
            let path;
            if (this.configs[this.model].facetteByPk) {
                path = [infRoot, this.model, this.configs[this.model].facetteByPk, pk, indexKey];
            }
            else {
                path = [infRoot, this.model, indexKey];
            }
            return this.ngRedux.select(path);
        }));
        const key = (x) => {
            return this.pkProject$.pipe(switchMap(pk => {
                let path;
                if (this.configs[this.model].facetteByPk) {
                    path = [infRoot, this.model, this.configs[this.model].facetteByPk, pk, indexKey, x];
                }
                else {
                    path = [infRoot, this.model, indexKey, x];
                }
                return this.ngRedux.select(path);
            }));
        };
        return { all$, key };
    }
    paginationSelector() {
        const pipePage = (by, limit, offset) => this.pkProject$.pipe(switchMap(pk => {
            let path;
            const pagBy = paginatedBy(paginateName(by));
            const key = paginateKey(by);
            if (this.configs[this.model].facetteByPk) {
                path = [infRoot, this.model, this.configs[this.model].facetteByPk, pk, pagBy, key];
            }
            else {
                path = [infRoot, this.model, pagBy, key];
            }
            return this.ngRedux.select([...path, 'count'])
                .pipe(filter(count => count !== undefined), switchMap(count => {
                const start = offset;
                const end = count <= (start + limit) ? count : (start + limit);
                const obs$ = [];
                for (let i = start; i < end; i++) {
                    obs$.push(this.ngRedux.select([...path, 'rows', i]).pipe(filter(x => !!x)));
                }
                return combineLatestOrEmpty(obs$);
            }));
        }));
        const pipePageLoadNeeded = (by, limit, offset, trigger$) => this.pkProject$.pipe(switchMap(pk => {
            let path;
            const pagBy = paginatedBy(paginateName(by));
            const key = paginateKey(by);
            if (this.configs[this.model].facetteByPk) {
                path = [infRoot, this.model, this.configs[this.model].facetteByPk, pk, pagBy, key];
            }
            else {
                path = [infRoot, this.model, pagBy, key];
            }
            return trigger$.pipe(switchMap(() => this.ngRedux.select([...path, 'loading', getFromTo(limit, offset)])
                .pipe(first(), map(loading => !loading))));
        }));
        const pipeCount = (by) => this.pkProject$.pipe(switchMap(pk => {
            let path;
            const pagBy = paginatedBy(paginateName(by));
            const key = paginateKey(by);
            if (this.configs[this.model].facetteByPk) {
                path = [infRoot, this.model, this.configs[this.model].facetteByPk, pk, pagBy, key];
            }
            else {
                path = [infRoot, this.model, pagBy, key];
            }
            return this.ngRedux.select([...path, 'count']);
        }));
        return { pipePage, pipePageLoadNeeded, pipeCount };
    }
    pipeItemsInProject(pkProject$, getFkEntity) {
        return pipe(switchMap((items) => {
            return pkProject$.pipe(switchMap(pkProject => {
                const proRelsAndKey$ = [];
                for (const k in items) {
                    if (items.hasOwnProperty(k)) {
                        const item = items[k];
                        proRelsAndKey$.push(this.ngRedux.select(['pro', 'info_proj_rel', 'by_fk_project__fk_entity', pkProject + '_' + getFkEntity(item)])
                            .pipe(map(rel => ({ key: k, rel }))));
                    }
                }
                return combineLatestOrEmpty(proRelsAndKey$).pipe(map(proRels => {
                    const itemsInProject = {};
                    for (let i = 0; i < proRels.length; i++) {
                        const proRel = proRels[i];
                        if (proRel.rel && proRel.rel.is_in_project) {
                            itemsInProject[proRel.key] = items[proRel.key];
                        }
                    }
                    return itemsInProject;
                }));
            }));
        }));
    }
    pipeItemInProject(pkProject$, getFkEntity) {
        return pipe(switchMap((item) => {
            if (!item)
                return of(undefined);
            return pkProject$.pipe(switchMap(pkProject => {
                const proRel$ = this.ngRedux.select(['pro', 'info_proj_rel', 'by_fk_project__fk_entity', pkProject + '_' + getFkEntity(item)]);
                return proRel$.pipe(
                // filter(proRel => proRel.is_in_project == true),
                map((proRel) => proRel && proRel.is_in_project == true ? item : undefined));
            }));
        }));
    }
}
class InfPersistentItemSelections extends Selector {
    constructor(ngRedux, pkProject$, configs, model) {
        super(ngRedux, pkProject$, configs, model);
        this.ngRedux = ngRedux;
        this.pkProject$ = pkProject$;
        this.configs = configs;
        this.model = model;
        this._by_pk_entity$ = this.selector('by_pk_entity');
        this._by_fk_class$ = this.selector('by_fk_class');
    }
    by_pk_entity_key$(key, ofProject = true) {
        const selection$ = this._by_pk_entity$.key(key);
        if (ofProject)
            return selection$.pipe(this.pipeItemInProject(this.pkProject$, (i) => i.pk_entity));
        return selection$;
    }
    by_pk_entity_all$(ofProject = true) {
        const selection$ = this._by_pk_entity$.all$;
        if (ofProject)
            return selection$.pipe(this.pipeItemsInProject(this.pkProject$, (i) => i.pk_entity));
        return selection$;
    }
    by_fk_class_key$(key, ofProject = true) {
        const selection$ = this._by_fk_class$.key(key);
        if (ofProject)
            return selection$.pipe(this.pipeItemsInProject(this.pkProject$, (i) => i.pk_entity));
        return selection$;
    }
}
class InfTemporalEntitySelections extends Selector {
    // public by_fk_class$ = this.selector<ByPk<InfTemporalEntity>>('by_fk_class')
    constructor(ngRedux, pkProject$, configs, model) {
        super(ngRedux, pkProject$, configs, model);
        this.ngRedux = ngRedux;
        this.pkProject$ = pkProject$;
        this.configs = configs;
        this.model = model;
        this._by_pk_entity$ = this.selector('by_pk_entity');
    }
    by_pk_entity_key$(key, ofProject = true) {
        const selection$ = this._by_pk_entity$.key(key);
        if (ofProject)
            return selection$.pipe(this.pipeItemInProject(this.pkProject$, (i) => i.pk_entity));
        return selection$;
    }
}
class InfStatementSelections extends Selector {
    constructor(ngRedux, pkProject$, configs, model) {
        super(ngRedux, pkProject$, configs, model);
        this.ngRedux = ngRedux;
        this.pkProject$ = pkProject$;
        this.configs = configs;
        this.model = model;
        this._by_pk_entity$ = this.selector('by_pk_entity');
        this.by_fk_subject_data$ = this.selector('by_fk_subject_data');
        this.pagination$ = this.paginationSelector();
    }
    by_pk_entity_key$(key, ofProject = true) {
        const selection$ = this._by_pk_entity$.key(key);
        if (ofProject)
            return selection$.pipe(this.pipeItemInProject(this.pkProject$, (i) => i.pk_entity));
        return selection$;
    }
    by_subject$(foreignKeys, ofProject = true) {
        const key = indexStatementBySubject(foreignKeys);
        const selection$ = this.selector('by_subject').key(key);
        if (ofProject) {
            return selection$.pipe(this.pipeItemsInProject(this.pkProject$, (item) => item.pk_entity), map(items => values(items)));
        }
        return selection$.pipe(map(items => values(items)));
    }
    by_subject_and_property$(foreignKeys, ofProject = true) {
        return this.by_subject_and_property_indexed$(foreignKeys, ofProject).pipe(map(statementIdx => values(statementIdx)));
    }
    by_subject_and_property_indexed$(foreignKeys, ofProject = true) {
        const key = indexStatementBySubjectProperty(foreignKeys);
        const selection$ = this.selector('by_subject+property').key(key);
        if (ofProject) {
            return selection$.pipe(this.pipeItemsInProject(this.pkProject$, (item) => item.pk_entity));
        }
        return selection$;
    }
    by_object$(foreignKeys, ofProject = true) {
        const key = indexStatementByObject(foreignKeys);
        const selection$ = this.selector('by_object').key(key);
        if (ofProject) {
            return selection$.pipe(this.pipeItemsInProject(this.pkProject$, (item) => item.pk_entity), map(items => values(items)));
        }
        return selection$.pipe(map(items => values(items)));
    }
    by_object_and_property$(foreignKeys, ofProject = true) {
        return this.by_object_and_property_indexed$(foreignKeys, ofProject).pipe(map(statementIdx => values(statementIdx)));
    }
    by_object_and_property_indexed$(foreignKeys, ofProject = true) {
        const key = indexStatementByObjectProperty(foreignKeys);
        const selection$ = this.selector('by_object+property').key(key);
        if (ofProject) {
            return selection$.pipe(this.pipeItemsInProject(this.pkProject$, (item) => item.pk_entity));
        }
        return selection$;
    }
}
class InfTextPropertySelections extends Selector {
    constructor(ngRedux, pkProject$, configs, model) {
        super(ngRedux, pkProject$, configs, model);
        this.ngRedux = ngRedux;
        this.pkProject$ = pkProject$;
        this.configs = configs;
        this.model = model;
        this._by_pk_entity$ = this.selector('by_pk_entity');
        this._by_fk_concerned_entity__fk_class_field$ = this.selector('by_fk_concerned_entity__fk_class_field');
        this._by_fk_concerned_entity$ = this.selector('by_fk_concerned_entity');
    }
    by_pk_entity_key$(key, ofProject = true) {
        const selection$ = this._by_pk_entity$.key(key);
        if (ofProject)
            return selection$.pipe(this.pipeItemInProject(this.pkProject$, (i) => i.pk_entity));
        return selection$;
    }
    by_fk_concerned_entity__fk_class_field_indexed$(key, ofProject = true) {
        const selection$ = this._by_fk_concerned_entity__fk_class_field$.key(key);
        if (ofProject) {
            return selection$.pipe(this.pipeItemsInProject(this.pkProject$, (item) => item.pk_entity));
        }
        return selection$;
    }
    by_fk_concerned_entity_indexed$(key, ofProject = true) {
        const selection$ = this._by_fk_concerned_entity$.key(key);
        if (ofProject) {
            return selection$.pipe(this.pipeItemsInProject(this.pkProject$, (item) => item.pk_entity));
        }
        return selection$;
    }
}
class InfAppellationSelections extends Selector {
    constructor(ngRedux, pkProject$, configs, model) {
        super(ngRedux, pkProject$, configs, model);
        this.ngRedux = ngRedux;
        this.pkProject$ = pkProject$;
        this.configs = configs;
        this.model = model;
        this.by_pk_entity$ = this.selector('by_pk_entity');
    }
}
class InfLangStringSelections extends Selector {
    constructor(ngRedux, pkProject$, configs, model) {
        super(ngRedux, pkProject$, configs, model);
        this.ngRedux = ngRedux;
        this.pkProject$ = pkProject$;
        this.configs = configs;
        this.model = model;
        this.by_pk_entity$ = this.selector('by_pk_entity');
    }
}
class InfPlaceSelections extends Selector {
    constructor(ngRedux, pkProject$, configs, model) {
        super(ngRedux, pkProject$, configs, model);
        this.ngRedux = ngRedux;
        this.pkProject$ = pkProject$;
        this.configs = configs;
        this.model = model;
        this.by_pk_entity$ = this.selector('by_pk_entity');
    }
}
class InfTimePrimitiveSelections extends Selector {
    constructor(ngRedux, pkProject$, configs, model) {
        super(ngRedux, pkProject$, configs, model);
        this.ngRedux = ngRedux;
        this.pkProject$ = pkProject$;
        this.configs = configs;
        this.model = model;
        this.by_pk_entity$ = this.selector('by_pk_entity');
    }
}
class InfLanguageSelections extends Selector {
    constructor(ngRedux, pkProject$, configs, model) {
        super(ngRedux, pkProject$, configs, model);
        this.ngRedux = ngRedux;
        this.pkProject$ = pkProject$;
        this.configs = configs;
        this.model = model;
        this.by_pk_entity$ = this.selector('by_pk_entity');
    }
}
class InfDimensionSelections extends Selector {
    constructor(ngRedux, pkProject$, configs, model) {
        super(ngRedux, pkProject$, configs, model);
        this.ngRedux = ngRedux;
        this.pkProject$ = pkProject$;
        this.configs = configs;
        this.model = model;
        this.by_pk_entity$ = this.selector('by_pk_entity');
    }
}
export class InfSelector {
    constructor(ngRedux, pkProject$) {
        this.ngRedux = ngRedux;
        this.pkProject$ = pkProject$;
        this.persistent_item$ = new InfPersistentItemSelections(this.ngRedux, this.pkProject$, infDefinitions, 'persistent_item');
        this.temporal_entity$ = new InfTemporalEntitySelections(this.ngRedux, this.pkProject$, infDefinitions, 'temporal_entity');
        this.statement$ = new InfStatementSelections(this.ngRedux, this.pkProject$, infDefinitions, 'statement');
        this.appellation$ = new InfAppellationSelections(this.ngRedux, this.pkProject$, infDefinitions, 'appellation');
        this.place$ = new InfPlaceSelections(this.ngRedux, this.pkProject$, infDefinitions, 'place');
        this.text_property$ = new InfTextPropertySelections(this.ngRedux, this.pkProject$, infDefinitions, 'text_property');
        this.lang_string$ = new InfLangStringSelections(this.ngRedux, this.pkProject$, infDefinitions, 'lang_string');
        this.time_primitive$ = new InfTimePrimitiveSelections(this.ngRedux, this.pkProject$, infDefinitions, 'time_primitive');
        this.language$ = new InfLanguageSelections(this.ngRedux, this.pkProject$, infDefinitions, 'language');
        this.dimension$ = new InfDimensionSelections(this.ngRedux, this.pkProject$, infDefinitions, 'dimension');
        this.pkEntityModelMap$ = this.ngRedux.select([infRoot, PR_ENTITY_MODEL_MAP]);
    }
    getModelOfEntity$(pkEntity) {
        return this.ngRedux.select([infRoot, PR_ENTITY_MODEL_MAP, pkEntity]);
    }
}
//# sourceMappingURL=inf.service.js.map