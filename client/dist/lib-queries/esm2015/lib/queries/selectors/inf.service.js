/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/selectors/inf.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { getFromTo, indexStatementByObject, indexStatementByObjectProperty, indexStatementBySubject, indexStatementBySubjectProperty, infDefinitions, infRoot, paginatedBy, paginateKey, paginateName, PR_ENTITY_MODEL_MAP } from '@kleiolab/lib-redux';
import { combineLatestOrEmpty } from '@kleiolab/lib-utils';
import { values } from 'd3';
import { of, pipe } from 'rxjs';
import { filter, first, map, switchMap } from 'rxjs/operators';
class Selector {
    /**
     * @param {?} ngRedux
     * @param {?} pkProject$
     * @param {?} configs
     * @param {?} model
     */
    constructor(ngRedux, pkProject$, configs, model) {
        this.ngRedux = ngRedux;
        this.pkProject$ = pkProject$;
        this.configs = configs;
        this.model = model;
    }
    /**
     * @template M
     * @param {?} indexKey
     * @return {?}
     */
    selector(indexKey) {
        /** @type {?} */
        const all$ = this.pkProject$.pipe(switchMap((/**
         * @param {?} pk
         * @return {?}
         */
        pk => {
            /** @type {?} */
            let path;
            if (this.configs[this.model].facetteByPk) {
                path = [infRoot, this.model, this.configs[this.model].facetteByPk, pk, indexKey];
            }
            else {
                path = [infRoot, this.model, indexKey];
            }
            return this.ngRedux.select(path);
        })));
        /** @type {?} */
        const key = (/**
         * @param {?} x
         * @return {?}
         */
        (x) => {
            return this.pkProject$.pipe(switchMap((/**
             * @param {?} pk
             * @return {?}
             */
            pk => {
                /** @type {?} */
                let path;
                if (this.configs[this.model].facetteByPk) {
                    path = [infRoot, this.model, this.configs[this.model].facetteByPk, pk, indexKey, x];
                }
                else {
                    path = [infRoot, this.model, indexKey, x];
                }
                return this.ngRedux.select(path);
            })));
        });
        return { all$, key };
    }
    /**
     * @template M
     * @return {?}
     */
    paginationSelector() {
        /** @type {?} */
        const pipePage = (/**
         * @param {?} by
         * @param {?} limit
         * @param {?} offset
         * @return {?}
         */
        (by, limit, offset) => this.pkProject$.pipe(switchMap((/**
         * @param {?} pk
         * @return {?}
         */
        pk => {
            /** @type {?} */
            let path;
            /** @type {?} */
            const pagBy = paginatedBy(paginateName(by));
            /** @type {?} */
            const key = paginateKey(by);
            if (this.configs[this.model].facetteByPk) {
                path = [infRoot, this.model, this.configs[this.model].facetteByPk, pk, pagBy, key];
            }
            else {
                path = [infRoot, this.model, pagBy, key];
            }
            return this.ngRedux.select([...path, 'count'])
                .pipe(filter((/**
             * @param {?} count
             * @return {?}
             */
            count => count !== undefined)), switchMap((/**
             * @param {?} count
             * @return {?}
             */
            count => {
                /** @type {?} */
                const start = offset;
                /** @type {?} */
                const end = count <= (start + limit) ? count : (start + limit);
                /** @type {?} */
                const obs$ = [];
                for (let i = start; i < end; i++) {
                    obs$.push(this.ngRedux.select([...path, 'rows', i]).pipe(filter((/**
                     * @param {?} x
                     * @return {?}
                     */
                    x => !!x))));
                }
                return combineLatestOrEmpty(obs$);
            })));
        }))));
        /** @type {?} */
        const pipePageLoadNeeded = (/**
         * @param {?} by
         * @param {?} limit
         * @param {?} offset
         * @param {?=} trigger$
         * @return {?}
         */
        (by, limit, offset, trigger$) => this.pkProject$.pipe(switchMap((/**
         * @param {?} pk
         * @return {?}
         */
        pk => {
            /** @type {?} */
            let path;
            /** @type {?} */
            const pagBy = paginatedBy(paginateName(by));
            /** @type {?} */
            const key = paginateKey(by);
            if (this.configs[this.model].facetteByPk) {
                path = [infRoot, this.model, this.configs[this.model].facetteByPk, pk, pagBy, key];
            }
            else {
                path = [infRoot, this.model, pagBy, key];
            }
            return trigger$.pipe(switchMap((/**
             * @return {?}
             */
            () => this.ngRedux.select([...path, 'loading', getFromTo(limit, offset)])
                .pipe(first(), map((/**
             * @param {?} loading
             * @return {?}
             */
            loading => !loading))))));
        }))));
        /** @type {?} */
        const pipeCount = (/**
         * @param {?} by
         * @return {?}
         */
        (by) => this.pkProject$.pipe(switchMap((/**
         * @param {?} pk
         * @return {?}
         */
        pk => {
            /** @type {?} */
            let path;
            /** @type {?} */
            const pagBy = paginatedBy(paginateName(by));
            /** @type {?} */
            const key = paginateKey(by);
            if (this.configs[this.model].facetteByPk) {
                path = [infRoot, this.model, this.configs[this.model].facetteByPk, pk, pagBy, key];
            }
            else {
                path = [infRoot, this.model, pagBy, key];
            }
            return this.ngRedux.select([...path, 'count']);
        }))));
        return { pipePage, pipePageLoadNeeded, pipeCount };
    }
    /**
     * @template M
     * @param {?} pkProject$
     * @param {?} getFkEntity
     * @return {?}
     */
    pipeItemsInProject(pkProject$, getFkEntity) {
        return pipe(switchMap((/**
         * @param {?} items
         * @return {?}
         */
        (items) => {
            return pkProject$.pipe(switchMap((/**
             * @param {?} pkProject
             * @return {?}
             */
            pkProject => {
                /** @type {?} */
                const proRelsAndKey$ = [];
                for (const k in items) {
                    if (items.hasOwnProperty(k)) {
                        /** @type {?} */
                        const item = items[k];
                        proRelsAndKey$.push(this.ngRedux.select(['pro', 'info_proj_rel', 'by_fk_project__fk_entity', pkProject + '_' + getFkEntity(item)])
                            .pipe(map((/**
                         * @param {?} rel
                         * @return {?}
                         */
                        rel => ({ key: k, rel })))));
                    }
                }
                return combineLatestOrEmpty(proRelsAndKey$).pipe(map((/**
                 * @param {?} proRels
                 * @return {?}
                 */
                proRels => {
                    /** @type {?} */
                    const itemsInProject = {};
                    for (let i = 0; i < proRels.length; i++) {
                        /** @type {?} */
                        const proRel = proRels[i];
                        if (proRel.rel && proRel.rel.is_in_project) {
                            itemsInProject[proRel.key] = items[proRel.key];
                        }
                    }
                    return itemsInProject;
                })));
            })));
        })));
    }
    /**
     * @template M
     * @param {?} pkProject$
     * @param {?} getFkEntity
     * @return {?}
     */
    pipeItemInProject(pkProject$, getFkEntity) {
        return pipe(switchMap((/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            if (!item)
                return of(undefined);
            return pkProject$.pipe(switchMap((/**
             * @param {?} pkProject
             * @return {?}
             */
            pkProject => {
                /** @type {?} */
                const proRel$ = this.ngRedux.select(['pro', 'info_proj_rel', 'by_fk_project__fk_entity', pkProject + '_' + getFkEntity(item)]);
                return proRel$.pipe(
                // filter(proRel => proRel.is_in_project == true),
                map((/**
                 * @param {?} proRel
                 * @return {?}
                 */
                (proRel) => proRel && proRel.is_in_project == true ? item : undefined)));
            })));
        })));
    }
}
if (false) {
    /** @type {?} */
    Selector.prototype.ngRedux;
    /** @type {?} */
    Selector.prototype.pkProject$;
    /** @type {?} */
    Selector.prototype.configs;
    /** @type {?} */
    Selector.prototype.model;
}
class InfPersistentItemSelections extends Selector {
    /**
     * @param {?} ngRedux
     * @param {?} pkProject$
     * @param {?} configs
     * @param {?} model
     */
    constructor(ngRedux, pkProject$, configs, model) {
        super(ngRedux, pkProject$, configs, model);
        this.ngRedux = ngRedux;
        this.pkProject$ = pkProject$;
        this.configs = configs;
        this.model = model;
        this._by_pk_entity$ = this.selector('by_pk_entity');
        this._by_fk_class$ = this.selector('by_fk_class');
    }
    /**
     * @param {?} key
     * @param {?=} ofProject
     * @return {?}
     */
    by_pk_entity_key$(key, ofProject = true) {
        /** @type {?} */
        const selection$ = this._by_pk_entity$.key(key);
        if (ofProject)
            return selection$.pipe(this.pipeItemInProject(this.pkProject$, (/**
             * @param {?} i
             * @return {?}
             */
            (i) => i.pk_entity)));
        return selection$;
    }
    /**
     * @param {?=} ofProject
     * @return {?}
     */
    by_pk_entity_all$(ofProject = true) {
        /** @type {?} */
        const selection$ = this._by_pk_entity$.all$;
        if (ofProject)
            return selection$.pipe(this.pipeItemsInProject(this.pkProject$, (/**
             * @param {?} i
             * @return {?}
             */
            (i) => i.pk_entity)));
        return selection$;
    }
    /**
     * @param {?} key
     * @param {?=} ofProject
     * @return {?}
     */
    by_fk_class_key$(key, ofProject = true) {
        /** @type {?} */
        const selection$ = this._by_fk_class$.key(key);
        if (ofProject)
            return selection$.pipe(this.pipeItemsInProject(this.pkProject$, (/**
             * @param {?} i
             * @return {?}
             */
            (i) => i.pk_entity)));
        return selection$;
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    InfPersistentItemSelections.prototype._by_pk_entity$;
    /**
     * @type {?}
     * @private
     */
    InfPersistentItemSelections.prototype._by_fk_class$;
    /** @type {?} */
    InfPersistentItemSelections.prototype.ngRedux;
    /** @type {?} */
    InfPersistentItemSelections.prototype.pkProject$;
    /** @type {?} */
    InfPersistentItemSelections.prototype.configs;
    /** @type {?} */
    InfPersistentItemSelections.prototype.model;
}
class InfTemporalEntitySelections extends Selector {
    // public by_fk_class$ = this.selector<ByPk<InfTemporalEntity>>('by_fk_class')
    /**
     * @param {?} ngRedux
     * @param {?} pkProject$
     * @param {?} configs
     * @param {?} model
     */
    constructor(ngRedux, pkProject$, configs, model) {
        super(ngRedux, pkProject$, configs, model);
        this.ngRedux = ngRedux;
        this.pkProject$ = pkProject$;
        this.configs = configs;
        this.model = model;
        this._by_pk_entity$ = this.selector('by_pk_entity');
    }
    /**
     * @param {?} key
     * @param {?=} ofProject
     * @return {?}
     */
    by_pk_entity_key$(key, ofProject = true) {
        /** @type {?} */
        const selection$ = this._by_pk_entity$.key(key);
        if (ofProject)
            return selection$.pipe(this.pipeItemInProject(this.pkProject$, (/**
             * @param {?} i
             * @return {?}
             */
            (i) => i.pk_entity)));
        return selection$;
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    InfTemporalEntitySelections.prototype._by_pk_entity$;
    /** @type {?} */
    InfTemporalEntitySelections.prototype.ngRedux;
    /** @type {?} */
    InfTemporalEntitySelections.prototype.pkProject$;
    /** @type {?} */
    InfTemporalEntitySelections.prototype.configs;
    /** @type {?} */
    InfTemporalEntitySelections.prototype.model;
}
class InfStatementSelections extends Selector {
    /**
     * @param {?} ngRedux
     * @param {?} pkProject$
     * @param {?} configs
     * @param {?} model
     */
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
    /**
     * @param {?} key
     * @param {?=} ofProject
     * @return {?}
     */
    by_pk_entity_key$(key, ofProject = true) {
        /** @type {?} */
        const selection$ = this._by_pk_entity$.key(key);
        if (ofProject)
            return selection$.pipe(this.pipeItemInProject(this.pkProject$, (/**
             * @param {?} i
             * @return {?}
             */
            (i) => i.pk_entity)));
        return selection$;
    }
    /**
     * @param {?} foreignKeys
     * @param {?=} ofProject
     * @return {?}
     */
    by_subject$(foreignKeys, ofProject = true) {
        /** @type {?} */
        const key = indexStatementBySubject(foreignKeys);
        /** @type {?} */
        const selection$ = this.selector('by_subject').key(key);
        if (ofProject) {
            return selection$.pipe(this.pipeItemsInProject(this.pkProject$, (/**
             * @param {?} item
             * @return {?}
             */
            (item) => item.pk_entity)), map((/**
             * @param {?} items
             * @return {?}
             */
            items => values(items))));
        }
        return selection$.pipe(map((/**
         * @param {?} items
         * @return {?}
         */
        items => values(items))));
    }
    /**
     * @param {?} foreignKeys
     * @param {?=} ofProject
     * @return {?}
     */
    by_subject_and_property$(foreignKeys, ofProject = true) {
        return this.by_subject_and_property_indexed$(foreignKeys, ofProject).pipe(map((/**
         * @param {?} statementIdx
         * @return {?}
         */
        statementIdx => values(statementIdx))));
    }
    /**
     * @param {?} foreignKeys
     * @param {?=} ofProject
     * @return {?}
     */
    by_subject_and_property_indexed$(foreignKeys, ofProject = true) {
        /** @type {?} */
        const key = indexStatementBySubjectProperty(foreignKeys);
        /** @type {?} */
        const selection$ = this.selector('by_subject+property').key(key);
        if (ofProject) {
            return selection$.pipe(this.pipeItemsInProject(this.pkProject$, (/**
             * @param {?} item
             * @return {?}
             */
            (item) => item.pk_entity)));
        }
        return selection$;
    }
    /**
     * @param {?} foreignKeys
     * @param {?=} ofProject
     * @return {?}
     */
    by_object$(foreignKeys, ofProject = true) {
        /** @type {?} */
        const key = indexStatementByObject(foreignKeys);
        /** @type {?} */
        const selection$ = this.selector('by_object').key(key);
        if (ofProject) {
            return selection$.pipe(this.pipeItemsInProject(this.pkProject$, (/**
             * @param {?} item
             * @return {?}
             */
            (item) => item.pk_entity)), map((/**
             * @param {?} items
             * @return {?}
             */
            items => values(items))));
        }
        return selection$.pipe(map((/**
         * @param {?} items
         * @return {?}
         */
        items => values(items))));
    }
    /**
     * @param {?} foreignKeys
     * @param {?=} ofProject
     * @return {?}
     */
    by_object_and_property$(foreignKeys, ofProject = true) {
        return this.by_object_and_property_indexed$(foreignKeys, ofProject).pipe(map((/**
         * @param {?} statementIdx
         * @return {?}
         */
        statementIdx => values(statementIdx))));
    }
    /**
     * @param {?} foreignKeys
     * @param {?=} ofProject
     * @return {?}
     */
    by_object_and_property_indexed$(foreignKeys, ofProject = true) {
        /** @type {?} */
        const key = indexStatementByObjectProperty(foreignKeys);
        /** @type {?} */
        const selection$ = this.selector('by_object+property').key(key);
        if (ofProject) {
            return selection$.pipe(this.pipeItemsInProject(this.pkProject$, (/**
             * @param {?} item
             * @return {?}
             */
            (item) => item.pk_entity)));
        }
        return selection$;
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    InfStatementSelections.prototype._by_pk_entity$;
    /** @type {?} */
    InfStatementSelections.prototype.by_fk_subject_data$;
    /** @type {?} */
    InfStatementSelections.prototype.pagination$;
    /** @type {?} */
    InfStatementSelections.prototype.ngRedux;
    /** @type {?} */
    InfStatementSelections.prototype.pkProject$;
    /** @type {?} */
    InfStatementSelections.prototype.configs;
    /** @type {?} */
    InfStatementSelections.prototype.model;
}
class InfTextPropertySelections extends Selector {
    /**
     * @param {?} ngRedux
     * @param {?} pkProject$
     * @param {?} configs
     * @param {?} model
     */
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
    /**
     * @param {?} key
     * @param {?=} ofProject
     * @return {?}
     */
    by_pk_entity_key$(key, ofProject = true) {
        /** @type {?} */
        const selection$ = this._by_pk_entity$.key(key);
        if (ofProject)
            return selection$.pipe(this.pipeItemInProject(this.pkProject$, (/**
             * @param {?} i
             * @return {?}
             */
            (i) => i.pk_entity)));
        return selection$;
    }
    /**
     * @param {?} key
     * @param {?=} ofProject
     * @return {?}
     */
    by_fk_concerned_entity__fk_class_field_indexed$(key, ofProject = true) {
        /** @type {?} */
        const selection$ = this._by_fk_concerned_entity__fk_class_field$.key(key);
        if (ofProject) {
            return selection$.pipe(this.pipeItemsInProject(this.pkProject$, (/**
             * @param {?} item
             * @return {?}
             */
            (item) => item.pk_entity)));
        }
        return selection$;
    }
    /**
     * @param {?} key
     * @param {?=} ofProject
     * @return {?}
     */
    by_fk_concerned_entity_indexed$(key, ofProject = true) {
        /** @type {?} */
        const selection$ = this._by_fk_concerned_entity$.key(key);
        if (ofProject) {
            return selection$.pipe(this.pipeItemsInProject(this.pkProject$, (/**
             * @param {?} item
             * @return {?}
             */
            (item) => item.pk_entity)));
        }
        return selection$;
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    InfTextPropertySelections.prototype._by_pk_entity$;
    /**
     * @type {?}
     * @private
     */
    InfTextPropertySelections.prototype._by_fk_concerned_entity__fk_class_field$;
    /**
     * @type {?}
     * @private
     */
    InfTextPropertySelections.prototype._by_fk_concerned_entity$;
    /** @type {?} */
    InfTextPropertySelections.prototype.ngRedux;
    /** @type {?} */
    InfTextPropertySelections.prototype.pkProject$;
    /** @type {?} */
    InfTextPropertySelections.prototype.configs;
    /** @type {?} */
    InfTextPropertySelections.prototype.model;
}
class InfAppellationSelections extends Selector {
    /**
     * @param {?} ngRedux
     * @param {?} pkProject$
     * @param {?} configs
     * @param {?} model
     */
    constructor(ngRedux, pkProject$, configs, model) {
        super(ngRedux, pkProject$, configs, model);
        this.ngRedux = ngRedux;
        this.pkProject$ = pkProject$;
        this.configs = configs;
        this.model = model;
        this.by_pk_entity$ = this.selector('by_pk_entity');
    }
}
if (false) {
    /** @type {?} */
    InfAppellationSelections.prototype.by_pk_entity$;
    /** @type {?} */
    InfAppellationSelections.prototype.ngRedux;
    /** @type {?} */
    InfAppellationSelections.prototype.pkProject$;
    /** @type {?} */
    InfAppellationSelections.prototype.configs;
    /** @type {?} */
    InfAppellationSelections.prototype.model;
}
class InfLangStringSelections extends Selector {
    /**
     * @param {?} ngRedux
     * @param {?} pkProject$
     * @param {?} configs
     * @param {?} model
     */
    constructor(ngRedux, pkProject$, configs, model) {
        super(ngRedux, pkProject$, configs, model);
        this.ngRedux = ngRedux;
        this.pkProject$ = pkProject$;
        this.configs = configs;
        this.model = model;
        this.by_pk_entity$ = this.selector('by_pk_entity');
    }
}
if (false) {
    /** @type {?} */
    InfLangStringSelections.prototype.by_pk_entity$;
    /** @type {?} */
    InfLangStringSelections.prototype.ngRedux;
    /** @type {?} */
    InfLangStringSelections.prototype.pkProject$;
    /** @type {?} */
    InfLangStringSelections.prototype.configs;
    /** @type {?} */
    InfLangStringSelections.prototype.model;
}
class InfPlaceSelections extends Selector {
    /**
     * @param {?} ngRedux
     * @param {?} pkProject$
     * @param {?} configs
     * @param {?} model
     */
    constructor(ngRedux, pkProject$, configs, model) {
        super(ngRedux, pkProject$, configs, model);
        this.ngRedux = ngRedux;
        this.pkProject$ = pkProject$;
        this.configs = configs;
        this.model = model;
        this.by_pk_entity$ = this.selector('by_pk_entity');
    }
}
if (false) {
    /** @type {?} */
    InfPlaceSelections.prototype.by_pk_entity$;
    /** @type {?} */
    InfPlaceSelections.prototype.ngRedux;
    /** @type {?} */
    InfPlaceSelections.prototype.pkProject$;
    /** @type {?} */
    InfPlaceSelections.prototype.configs;
    /** @type {?} */
    InfPlaceSelections.prototype.model;
}
class InfTimePrimitiveSelections extends Selector {
    /**
     * @param {?} ngRedux
     * @param {?} pkProject$
     * @param {?} configs
     * @param {?} model
     */
    constructor(ngRedux, pkProject$, configs, model) {
        super(ngRedux, pkProject$, configs, model);
        this.ngRedux = ngRedux;
        this.pkProject$ = pkProject$;
        this.configs = configs;
        this.model = model;
        this.by_pk_entity$ = this.selector('by_pk_entity');
    }
}
if (false) {
    /** @type {?} */
    InfTimePrimitiveSelections.prototype.by_pk_entity$;
    /** @type {?} */
    InfTimePrimitiveSelections.prototype.ngRedux;
    /** @type {?} */
    InfTimePrimitiveSelections.prototype.pkProject$;
    /** @type {?} */
    InfTimePrimitiveSelections.prototype.configs;
    /** @type {?} */
    InfTimePrimitiveSelections.prototype.model;
}
class InfLanguageSelections extends Selector {
    /**
     * @param {?} ngRedux
     * @param {?} pkProject$
     * @param {?} configs
     * @param {?} model
     */
    constructor(ngRedux, pkProject$, configs, model) {
        super(ngRedux, pkProject$, configs, model);
        this.ngRedux = ngRedux;
        this.pkProject$ = pkProject$;
        this.configs = configs;
        this.model = model;
        this.by_pk_entity$ = this.selector('by_pk_entity');
    }
}
if (false) {
    /** @type {?} */
    InfLanguageSelections.prototype.by_pk_entity$;
    /** @type {?} */
    InfLanguageSelections.prototype.ngRedux;
    /** @type {?} */
    InfLanguageSelections.prototype.pkProject$;
    /** @type {?} */
    InfLanguageSelections.prototype.configs;
    /** @type {?} */
    InfLanguageSelections.prototype.model;
}
class InfDimensionSelections extends Selector {
    /**
     * @param {?} ngRedux
     * @param {?} pkProject$
     * @param {?} configs
     * @param {?} model
     */
    constructor(ngRedux, pkProject$, configs, model) {
        super(ngRedux, pkProject$, configs, model);
        this.ngRedux = ngRedux;
        this.pkProject$ = pkProject$;
        this.configs = configs;
        this.model = model;
        this.by_pk_entity$ = this.selector('by_pk_entity');
    }
}
if (false) {
    /** @type {?} */
    InfDimensionSelections.prototype.by_pk_entity$;
    /** @type {?} */
    InfDimensionSelections.prototype.ngRedux;
    /** @type {?} */
    InfDimensionSelections.prototype.pkProject$;
    /** @type {?} */
    InfDimensionSelections.prototype.configs;
    /** @type {?} */
    InfDimensionSelections.prototype.model;
}
export class InfSelector {
    /**
     * @param {?} ngRedux
     * @param {?} pkProject$
     */
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
    /**
     * @param {?} pkEntity
     * @return {?}
     */
    getModelOfEntity$(pkEntity) {
        return this.ngRedux.select([infRoot, PR_ENTITY_MODEL_MAP, pkEntity]);
    }
}
if (false) {
    /** @type {?} */
    InfSelector.prototype.persistent_item$;
    /** @type {?} */
    InfSelector.prototype.temporal_entity$;
    /** @type {?} */
    InfSelector.prototype.statement$;
    /** @type {?} */
    InfSelector.prototype.appellation$;
    /** @type {?} */
    InfSelector.prototype.place$;
    /** @type {?} */
    InfSelector.prototype.text_property$;
    /** @type {?} */
    InfSelector.prototype.lang_string$;
    /** @type {?} */
    InfSelector.prototype.time_primitive$;
    /** @type {?} */
    InfSelector.prototype.language$;
    /** @type {?} */
    InfSelector.prototype.dimension$;
    /** @type {?} */
    InfSelector.prototype.pkEntityModelMap$;
    /** @type {?} */
    InfSelector.prototype.ngRedux;
    /** @type {?} */
    InfSelector.prototype.pkProject$;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXF1ZXJpZXMvIiwic291cmNlcyI6WyJsaWIvcXVlcmllcy9zZWxlY3RvcnMvaW5mLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBQTZCLFNBQVMsRUFBcUMsc0JBQXNCLEVBQWtDLDhCQUE4QixFQUEyQix1QkFBdUIsRUFBbUMsK0JBQStCLEVBQUUsY0FBYyxFQUFFLE9BQU8sRUFBbUIsV0FBVyxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsbUJBQW1CLEVBQTJCLE1BQU0scUJBQXFCLENBQUM7QUFFMWIsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDM0QsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLElBQUksQ0FBQztBQUM1QixPQUFPLEVBQWMsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM1QyxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHL0QsTUFBTSxRQUFROzs7Ozs7O0lBQ1osWUFDUyxPQUEyQixFQUMzQixVQUF1QyxFQUN2QyxPQUFnQyxFQUNoQyxLQUFhO1FBSGIsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUFDM0IsZUFBVSxHQUFWLFVBQVUsQ0FBNkI7UUFDdkMsWUFBTyxHQUFQLE9BQU8sQ0FBeUI7UUFDaEMsVUFBSyxHQUFMLEtBQUssQ0FBUTtJQUNsQixDQUFDOzs7Ozs7SUFFTCxRQUFRLENBQUksUUFBZ0I7O2NBRXBCLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FDL0IsU0FBUzs7OztRQUFDLEVBQUUsQ0FBQyxFQUFFOztnQkFDVCxJQUFXO1lBQ2YsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLEVBQUU7Z0JB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OztJQUNySCxpQ0FBb0c7O0lBQ3BHLG1DQUEwRzs7SUFDMUcsNkJBQXdGOztJQUN4RixxQ0FBK0c7O0lBQy9HLG1DQUF5Rzs7SUFDekcsc0NBQWtIOztJQUNsSCxnQ0FBaUc7O0lBQ2pHLGlDQUFvRzs7SUFFcEcsd0NBQXdFOztJQUU1RCw4QkFBa0M7O0lBQUUsaUNBQThDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdSZWR1eCB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L3N0b3JlJztcbmltcG9ydCB7IEJ5UGssIEVudGl0eU1vZGVsQW5kQ2xhc3MsIGdldEZyb21UbywgSUFwcFN0YXRlLCBJbmRleFN0YXRlbWVudEJ5T2JqZWN0LCBpbmRleFN0YXRlbWVudEJ5T2JqZWN0LCBJbmRleFN0YXRlbWVudEJ5T2JqZWN0UHJvcGVydHksIGluZGV4U3RhdGVtZW50QnlPYmplY3RQcm9wZXJ0eSwgSW5kZXhTdGF0ZW1lbnRCeVN1YmplY3QsIGluZGV4U3RhdGVtZW50QnlTdWJqZWN0LCBJbmRleFN0YXRlbWVudEJ5U3ViamVjdFByb3BlcnR5LCBpbmRleFN0YXRlbWVudEJ5U3ViamVjdFByb3BlcnR5LCBpbmZEZWZpbml0aW9ucywgaW5mUm9vdCwgUGFnaW5hdGVCeVBhcmFtLCBwYWdpbmF0ZWRCeSwgcGFnaW5hdGVLZXksIHBhZ2luYXRlTmFtZSwgUFJfRU5USVRZX01PREVMX01BUCwgUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24gfSBmcm9tICdAa2xlaW9sYWIvbGliLXJlZHV4JztcbmltcG9ydCB7IEluZkFwcGVsbGF0aW9uLCBJbmZEaW1lbnNpb24sIEluZkxhbmdTdHJpbmcsIEluZkxhbmd1YWdlLCBJbmZQZXJzaXN0ZW50SXRlbSwgSW5mUGxhY2UsIEluZlN0YXRlbWVudCwgSW5mVGVtcG9yYWxFbnRpdHksIEluZlRleHRQcm9wZXJ0eSwgSW5mVGltZVByaW1pdGl2ZSwgUHJvSW5mb1Byb2pSZWwgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgY29tYmluZUxhdGVzdE9yRW1wdHkgfSBmcm9tICdAa2xlaW9sYWIvbGliLXV0aWxzJztcbmltcG9ydCB7IHZhbHVlcyB9IGZyb20gJ2QzJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mLCBwaXBlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIGZpcnN0LCBtYXAsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmV4cG9ydCB0eXBlIEluZk1vZGVsTmFtZSA9ICdwZXJzaXN0ZW50X2l0ZW0nIHwgJ3RlbXBvcmFsX2VudGl0eScgfCAnc3RhdGVtZW50JyB8ICd0ZXh0X3Byb3BlcnR5JyB8ICdhcHBlbGxhdGlvbicgfCAnbGFuZ3VhZ2UnIHwgJ3BsYWNlJyB8ICdkaW1lbnNpb24nIHwgJ2xhbmdfc3RyaW5nJyB8ICd0aW1lX3ByaW1pdGl2ZSc7XG5cbmNsYXNzIFNlbGVjdG9yIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgcGtQcm9qZWN0JDogT2JzZXJ2YWJsZTxudW1iZXIgfCBzdHJpbmc+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuICApIHsgfVxuXG4gIHNlbGVjdG9yPE0+KGluZGV4S2V5OiBzdHJpbmcpOiB7IGFsbCQ6IE9ic2VydmFibGU8QnlQazxNPj4sIGtleTogKHgpID0+IE9ic2VydmFibGU8TT4gfSB7XG5cbiAgICBjb25zdCBhbGwkID0gdGhpcy5wa1Byb2plY3QkLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAocGsgPT4ge1xuICAgICAgICBsZXQgcGF0aDogYW55W107XG4gICAgICAgIGlmICh0aGlzLmNvbmZpZ3NbdGhpcy5tb2RlbF0uZmFjZXR0ZUJ5UGspIHtcbiAgICAgICAgICBwYXRoID0gW2luZlJvb3QsIHRoaXMubW9kZWwsIHRoaXMuY29uZmlnc1t0aGlzLm1vZGVsXS5mYWNldHRlQnlQaywgcGssIGluZGV4S2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwYXRoID0gW2luZlJvb3QsIHRoaXMubW9kZWwsIGluZGV4S2V5XTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5uZ1JlZHV4LnNlbGVjdDxCeVBrPE0+PihwYXRoKVxuICAgICAgfSlcbiAgICApXG5cblxuICAgIGNvbnN0IGtleSA9ICh4KTogT2JzZXJ2YWJsZTxNPiA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5wa1Byb2plY3QkLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcChwayA9PiB7XG4gICAgICAgICAgbGV0IHBhdGg6IGFueVtdO1xuICAgICAgICAgIGlmICh0aGlzLmNvbmZpZ3NbdGhpcy5tb2RlbF0uZmFjZXR0ZUJ5UGspIHtcbiAgICAgICAgICAgIHBhdGggPSBbaW5mUm9vdCwgdGhpcy5tb2RlbCwgdGhpcy5jb25maWdzW3RoaXMubW9kZWxdLmZhY2V0dGVCeVBrLCBwaywgaW5kZXhLZXksIHhdO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXRoID0gW2luZlJvb3QsIHRoaXMubW9kZWwsIGluZGV4S2V5LCB4XTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRoaXMubmdSZWR1eC5zZWxlY3Q8TT4ocGF0aClcbiAgICAgICAgfSlcbiAgICAgIClcblxuICAgIH1cblxuICAgIHJldHVybiB7IGFsbCQsIGtleSB9XG4gIH1cblxuICBwYWdpbmF0aW9uU2VsZWN0b3I8TT4oKSB7XG5cbiAgICBjb25zdCBwaXBlUGFnZSA9IChieTogUGFnaW5hdGVCeVBhcmFtW10sIGxpbWl0OiBudW1iZXIsIG9mZnNldDogbnVtYmVyKTogT2JzZXJ2YWJsZTxNW10+ID0+IHRoaXMucGtQcm9qZWN0JC5waXBlKFxuICAgICAgc3dpdGNoTWFwKHBrID0+IHtcbiAgICAgICAgbGV0IHBhdGg6IGFueVtdO1xuICAgICAgICBjb25zdCBwYWdCeSA9IHBhZ2luYXRlZEJ5KHBhZ2luYXRlTmFtZShieSkpXG4gICAgICAgIGNvbnN0IGtleSA9IHBhZ2luYXRlS2V5KGJ5KVxuICAgICAgICBpZiAodGhpcy5jb25maWdzW3RoaXMubW9kZWxdLmZhY2V0dGVCeVBrKSB7XG4gICAgICAgICAgcGF0aCA9IFtpbmZSb290LCB0aGlzLm1vZGVsLCB0aGlzLmNvbmZpZ3NbdGhpcy5tb2RlbF0uZmFjZXR0ZUJ5UGssIHBrLCBwYWdCeSwga2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwYXRoID0gW2luZlJvb3QsIHRoaXMubW9kZWwsIHBhZ0J5LCBrZXldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLm5nUmVkdXguc2VsZWN0PG51bWJlcj4oWy4uLnBhdGgsICdjb3VudCddKVxuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgZmlsdGVyKGNvdW50ID0+IGNvdW50ICE9PSB1bmRlZmluZWQpLFxuICAgICAgICAgICAgc3dpdGNoTWFwKGNvdW50ID0+IHtcbiAgICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSBvZmZzZXQ7XG4gICAgICAgICAgICAgIGNvbnN0IGVuZCA9IGNvdW50IDw9IChzdGFydCArIGxpbWl0KSA/IGNvdW50IDogKHN0YXJ0ICsgbGltaXQpO1xuICAgICAgICAgICAgICBjb25zdCBvYnMkOiBPYnNlcnZhYmxlPE0+W10gPSBbXTtcbiAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICAgICAgICAgICAgICBvYnMkLnB1c2goXG4gICAgICAgICAgICAgICAgICB0aGlzLm5nUmVkdXguc2VsZWN0PE0+KFsuLi5wYXRoLCAncm93cycsIGldKS5waXBlKGZpbHRlcih4ID0+ICEheCkpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0T3JFbXB0eShvYnMkKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApXG4gICAgICB9KVxuICAgIClcblxuICAgIGNvbnN0IHBpcGVQYWdlTG9hZE5lZWRlZCA9IChieTogUGFnaW5hdGVCeVBhcmFtW10sIGxpbWl0OiBudW1iZXIsIG9mZnNldDogbnVtYmVyLCB0cmlnZ2VyJD86IE9ic2VydmFibGU8YW55Pik6IE9ic2VydmFibGU8Ym9vbGVhbj4gPT4gdGhpcy5wa1Byb2plY3QkLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAocGsgPT4ge1xuICAgICAgICBsZXQgcGF0aDogYW55W107XG4gICAgICAgIGNvbnN0IHBhZ0J5ID0gcGFnaW5hdGVkQnkocGFnaW5hdGVOYW1lKGJ5KSlcbiAgICAgICAgY29uc3Qga2V5ID0gcGFnaW5hdGVLZXkoYnkpXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZ3NbdGhpcy5tb2RlbF0uZmFjZXR0ZUJ5UGspIHtcbiAgICAgICAgICBwYXRoID0gW2luZlJvb3QsIHRoaXMubW9kZWwsIHRoaXMuY29uZmlnc1t0aGlzLm1vZGVsXS5mYWNldHRlQnlQaywgcGssIHBhZ0J5LCBrZXldO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBhdGggPSBbaW5mUm9vdCwgdGhpcy5tb2RlbCwgcGFnQnksIGtleV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJpZ2dlciQucGlwZShcbiAgICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gdGhpcy5uZ1JlZHV4LnNlbGVjdDxib29sZWFuPihbLi4ucGF0aCwgJ2xvYWRpbmcnLCBnZXRGcm9tVG8obGltaXQsIG9mZnNldCldKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIGZpcnN0KCksXG4gICAgICAgICAgICAgIG1hcChsb2FkaW5nID0+ICFsb2FkaW5nKVxuICAgICAgICAgICAgKVxuICAgICAgICAgICkpXG5cbiAgICAgIH0pXG4gICAgKVxuXG4gICAgY29uc3QgcGlwZUNvdW50ID0gKGJ5OiBQYWdpbmF0ZUJ5UGFyYW1bXSk6IE9ic2VydmFibGU8bnVtYmVyIHwgdW5kZWZpbmVkPiA9PiB0aGlzLnBrUHJvamVjdCQucGlwZShcbiAgICAgIHN3aXRjaE1hcChwayA9PiB7XG4gICAgICAgIGxldCBwYXRoOiBhbnlbXTtcbiAgICAgICAgY29uc3QgcGFnQnkgPSBwYWdpbmF0ZWRCeShwYWdpbmF0ZU5hbWUoYnkpKVxuICAgICAgICBjb25zdCBrZXkgPSBwYWdpbmF0ZUtleShieSlcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnc1t0aGlzLm1vZGVsXS5mYWNldHRlQnlQaykge1xuICAgICAgICAgIHBhdGggPSBbaW5mUm9vdCwgdGhpcy5tb2RlbCwgdGhpcy5jb25maWdzW3RoaXMubW9kZWxdLmZhY2V0dGVCeVBrLCBwaywgcGFnQnksIGtleV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcGF0aCA9IFtpbmZSb290LCB0aGlzLm1vZGVsLCBwYWdCeSwga2V5XTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5uZ1JlZHV4LnNlbGVjdDxudW1iZXI+KFsuLi5wYXRoLCAnY291bnQnXSlcbiAgICAgIH0pXG4gICAgKVxuXG4gICAgcmV0dXJuIHsgcGlwZVBhZ2UsIHBpcGVQYWdlTG9hZE5lZWRlZCwgcGlwZUNvdW50IH1cblxuICB9XG5cblxuICBwaXBlSXRlbXNJblByb2plY3Q8TT4ocGtQcm9qZWN0JDogT2JzZXJ2YWJsZTxudW1iZXIgfCBzdHJpbmc+LCBnZXRGa0VudGl0eTogKGl0ZW06IE0pID0+IG51bWJlcikge1xuICAgIHJldHVybiBwaXBlKFxuICAgICAgc3dpdGNoTWFwKChpdGVtczogQnlQazxNPikgPT4ge1xuICAgICAgICByZXR1cm4gcGtQcm9qZWN0JC5waXBlKFxuICAgICAgICAgIHN3aXRjaE1hcChwa1Byb2plY3QgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJvUmVsc0FuZEtleSQ6IE9ic2VydmFibGU8eyBrZXk6IHN0cmluZywgcmVsOiBQcm9JbmZvUHJvalJlbCB9PltdID0gW107XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGsgaW4gaXRlbXMpIHtcbiAgICAgICAgICAgICAgaWYgKGl0ZW1zLmhhc093blByb3BlcnR5KGspKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IGl0ZW1zW2tdO1xuICAgICAgICAgICAgICAgIHByb1JlbHNBbmRLZXkkLnB1c2goXG4gICAgICAgICAgICAgICAgICB0aGlzLm5nUmVkdXguc2VsZWN0PFByb0luZm9Qcm9qUmVsPihbJ3BybycsICdpbmZvX3Byb2pfcmVsJywgJ2J5X2ZrX3Byb2plY3RfX2ZrX2VudGl0eScsIHBrUHJvamVjdCArICdfJyArIGdldEZrRW50aXR5KGl0ZW0pXSlcbiAgICAgICAgICAgICAgICAgICAgLnBpcGUobWFwKHJlbCA9PiAoeyBrZXk6IGssIHJlbCB9KSkpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdE9yRW1wdHkocHJvUmVsc0FuZEtleSQpLnBpcGUoXG4gICAgICAgICAgICAgIG1hcChwcm9SZWxzID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtc0luUHJvamVjdDogQnlQazxNPiA9IHt9O1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvUmVscy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgY29uc3QgcHJvUmVsID0gcHJvUmVsc1tpXTtcbiAgICAgICAgICAgICAgICAgIGlmIChwcm9SZWwucmVsICYmIHByb1JlbC5yZWwuaXNfaW5fcHJvamVjdCkge1xuICAgICAgICAgICAgICAgICAgICBpdGVtc0luUHJvamVjdFtwcm9SZWwua2V5XSA9IGl0ZW1zW3Byb1JlbC5rZXldXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtc0luUHJvamVjdDtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9KVxuICAgICAgICApXG5cbiAgICAgIH0pXG4gICAgKVxuICB9XG5cbiAgcGlwZUl0ZW1JblByb2plY3Q8TT4ocGtQcm9qZWN0JDogT2JzZXJ2YWJsZTxudW1iZXIgfCBzdHJpbmc+LCBnZXRGa0VudGl0eTogKGl0ZW06IE0pID0+IG51bWJlcikge1xuICAgIHJldHVybiBwaXBlKFxuICAgICAgc3dpdGNoTWFwKChpdGVtOiBNKSA9PiB7XG4gICAgICAgIGlmICghaXRlbSkgcmV0dXJuIG9mKHVuZGVmaW5lZCk7XG4gICAgICAgIHJldHVybiBwa1Byb2plY3QkLnBpcGUoXG4gICAgICAgICAgc3dpdGNoTWFwKHBrUHJvamVjdCA9PiB7XG4gICAgICAgICAgICBjb25zdCBwcm9SZWwkID0gdGhpcy5uZ1JlZHV4LnNlbGVjdDxQcm9JbmZvUHJvalJlbD4oWydwcm8nLCAnaW5mb19wcm9qX3JlbCcsICdieV9ma19wcm9qZWN0X19ma19lbnRpdHknLCBwa1Byb2plY3QgKyAnXycgKyBnZXRGa0VudGl0eShpdGVtKV0pXG4gICAgICAgICAgICByZXR1cm4gcHJvUmVsJC5waXBlKFxuICAgICAgICAgICAgICAvLyBmaWx0ZXIocHJvUmVsID0+IHByb1JlbC5pc19pbl9wcm9qZWN0ID09IHRydWUpLFxuICAgICAgICAgICAgICBtYXAoKHByb1JlbCkgPT4gcHJvUmVsICYmIHByb1JlbC5pc19pbl9wcm9qZWN0ID09IHRydWUgPyBpdGVtIDogdW5kZWZpbmVkKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgIH0pXG4gICAgKVxuICB9XG59XG5cbmNsYXNzIEluZlBlcnNpc3RlbnRJdGVtU2VsZWN0aW9ucyBleHRlbmRzIFNlbGVjdG9yIHtcbiAgcHJpdmF0ZSBfYnlfcGtfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8SW5mUGVyc2lzdGVudEl0ZW0+KCdieV9wa19lbnRpdHknKVxuICBwcml2YXRlIF9ieV9ma19jbGFzcyQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8SW5mUGVyc2lzdGVudEl0ZW0+PignYnlfZmtfY2xhc3MnKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIHBrUHJvamVjdCQsIGNvbmZpZ3MsIG1vZGVsKSB9XG5cbiAgYnlfcGtfZW50aXR5X2tleSQoa2V5OiBzdHJpbmcgfCBudW1iZXIsIG9mUHJvamVjdCA9IHRydWUpIHtcbiAgICBjb25zdCBzZWxlY3Rpb24kID0gdGhpcy5fYnlfcGtfZW50aXR5JC5rZXkoa2V5KVxuICAgIGlmIChvZlByb2plY3QpIHJldHVybiBzZWxlY3Rpb24kLnBpcGUodGhpcy5waXBlSXRlbUluUHJvamVjdCh0aGlzLnBrUHJvamVjdCQsIChpKSA9PiBpLnBrX2VudGl0eSkpXG4gICAgcmV0dXJuIHNlbGVjdGlvbiRcbiAgfVxuICBieV9wa19lbnRpdHlfYWxsJChvZlByb2plY3QgPSB0cnVlKSB7XG4gICAgY29uc3Qgc2VsZWN0aW9uJCA9IHRoaXMuX2J5X3BrX2VudGl0eSQuYWxsJFxuICAgIGlmIChvZlByb2plY3QpIHJldHVybiBzZWxlY3Rpb24kLnBpcGUodGhpcy5waXBlSXRlbXNJblByb2plY3QodGhpcy5wa1Byb2plY3QkLCAoaSkgPT4gaS5wa19lbnRpdHkpKVxuICAgIHJldHVybiBzZWxlY3Rpb24kXG4gIH1cbiAgYnlfZmtfY2xhc3Nfa2V5JChrZXk6IHN0cmluZyB8IG51bWJlciwgb2ZQcm9qZWN0ID0gdHJ1ZSkge1xuICAgIGNvbnN0IHNlbGVjdGlvbiQgPSB0aGlzLl9ieV9ma19jbGFzcyQua2V5KGtleSlcbiAgICBpZiAob2ZQcm9qZWN0KSByZXR1cm4gc2VsZWN0aW9uJC5waXBlKHRoaXMucGlwZUl0ZW1zSW5Qcm9qZWN0KHRoaXMucGtQcm9qZWN0JCwgKGkpID0+IGkucGtfZW50aXR5KSlcbiAgICByZXR1cm4gc2VsZWN0aW9uJFxuICB9XG59XG5cbmNsYXNzIEluZlRlbXBvcmFsRW50aXR5U2VsZWN0aW9ucyBleHRlbmRzIFNlbGVjdG9yIHtcbiAgcHJpdmF0ZSBfYnlfcGtfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8SW5mVGVtcG9yYWxFbnRpdHk+KCdieV9wa19lbnRpdHknKVxuICAvLyBwdWJsaWMgYnlfZmtfY2xhc3MkID0gdGhpcy5zZWxlY3RvcjxCeVBrPEluZlRlbXBvcmFsRW50aXR5Pj4oJ2J5X2ZrX2NsYXNzJylcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBwa1Byb2plY3QkOiBPYnNlcnZhYmxlPG51bWJlciB8IHN0cmluZz4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBwa1Byb2plY3QkLCBjb25maWdzLCBtb2RlbCkgfVxuXG4gIGJ5X3BrX2VudGl0eV9rZXkkKGtleTogc3RyaW5nIHwgbnVtYmVyLCBvZlByb2plY3QgPSB0cnVlKSB7XG4gICAgY29uc3Qgc2VsZWN0aW9uJCA9IHRoaXMuX2J5X3BrX2VudGl0eSQua2V5KGtleSlcbiAgICBpZiAob2ZQcm9qZWN0KSByZXR1cm4gc2VsZWN0aW9uJC5waXBlKHRoaXMucGlwZUl0ZW1JblByb2plY3QodGhpcy5wa1Byb2plY3QkLCAoaSkgPT4gaS5wa19lbnRpdHkpKVxuICAgIHJldHVybiBzZWxlY3Rpb24kXG4gIH1cbn1cblxuXG5jbGFzcyBJbmZTdGF0ZW1lbnRTZWxlY3Rpb25zIGV4dGVuZHMgU2VsZWN0b3Ige1xuXG4gIHByaXZhdGUgX2J5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPEluZlN0YXRlbWVudD4oJ2J5X3BrX2VudGl0eScpXG4gIHB1YmxpYyBieV9ma19zdWJqZWN0X2RhdGEkID0gdGhpcy5zZWxlY3RvcjxCeVBrPEluZlN0YXRlbWVudD4+KCdieV9ma19zdWJqZWN0X2RhdGEnKVxuXG4gIHB1YmxpYyBwYWdpbmF0aW9uJCA9IHRoaXMucGFnaW5hdGlvblNlbGVjdG9yPG51bWJlcj4oKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIHBrUHJvamVjdCQsIGNvbmZpZ3MsIG1vZGVsKSB9XG5cbiAgYnlfcGtfZW50aXR5X2tleSQoa2V5OiBzdHJpbmcgfCBudW1iZXIsIG9mUHJvamVjdCA9IHRydWUpIHtcbiAgICBjb25zdCBzZWxlY3Rpb24kID0gdGhpcy5fYnlfcGtfZW50aXR5JC5rZXkoa2V5KVxuICAgIGlmIChvZlByb2plY3QpIHJldHVybiBzZWxlY3Rpb24kLnBpcGUodGhpcy5waXBlSXRlbUluUHJvamVjdCh0aGlzLnBrUHJvamVjdCQsIChpKSA9PiBpLnBrX2VudGl0eSkpXG4gICAgcmV0dXJuIHNlbGVjdGlvbiRcbiAgfVxuXG4gIGJ5X3N1YmplY3QkKGZvcmVpZ25LZXlzOiBJbmRleFN0YXRlbWVudEJ5U3ViamVjdCwgb2ZQcm9qZWN0ID0gdHJ1ZSk6IE9ic2VydmFibGU8SW5mU3RhdGVtZW50W10+IHtcbiAgICBjb25zdCBrZXkgPSBpbmRleFN0YXRlbWVudEJ5U3ViamVjdChmb3JlaWduS2V5cyk7XG4gICAgY29uc3Qgc2VsZWN0aW9uJCA9IHRoaXMuc2VsZWN0b3I8QnlQazxJbmZTdGF0ZW1lbnQ+PignYnlfc3ViamVjdCcpLmtleShrZXkpXG4gICAgaWYgKG9mUHJvamVjdCkge1xuICAgICAgcmV0dXJuIHNlbGVjdGlvbiQucGlwZShcbiAgICAgICAgdGhpcy5waXBlSXRlbXNJblByb2plY3QodGhpcy5wa1Byb2plY3QkLCAoaXRlbSkgPT4gaXRlbS5wa19lbnRpdHkpLFxuICAgICAgICBtYXAoaXRlbXMgPT4gdmFsdWVzKGl0ZW1zKSlcbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIHNlbGVjdGlvbiQucGlwZShcbiAgICAgIG1hcChpdGVtcyA9PiB2YWx1ZXMoaXRlbXMpKVxuICAgICk7XG4gIH1cblxuICBieV9zdWJqZWN0X2FuZF9wcm9wZXJ0eSQoZm9yZWlnbktleXM6IEluZGV4U3RhdGVtZW50QnlTdWJqZWN0UHJvcGVydHksIG9mUHJvamVjdCA9IHRydWUpOiBPYnNlcnZhYmxlPEluZlN0YXRlbWVudFtdPiB7XG4gICAgcmV0dXJuIHRoaXMuYnlfc3ViamVjdF9hbmRfcHJvcGVydHlfaW5kZXhlZCQoZm9yZWlnbktleXMsIG9mUHJvamVjdCkucGlwZShcbiAgICAgIG1hcChzdGF0ZW1lbnRJZHggPT4gdmFsdWVzKHN0YXRlbWVudElkeCkpXG4gICAgKVxuICB9XG4gIGJ5X3N1YmplY3RfYW5kX3Byb3BlcnR5X2luZGV4ZWQkKGZvcmVpZ25LZXlzOiBJbmRleFN0YXRlbWVudEJ5U3ViamVjdFByb3BlcnR5LCBvZlByb2plY3QgPSB0cnVlKTogT2JzZXJ2YWJsZTxCeVBrPEluZlN0YXRlbWVudD4+IHtcbiAgICBjb25zdCBrZXkgPSBpbmRleFN0YXRlbWVudEJ5U3ViamVjdFByb3BlcnR5KGZvcmVpZ25LZXlzKTtcbiAgICBjb25zdCBzZWxlY3Rpb24kID0gdGhpcy5zZWxlY3RvcjxCeVBrPEluZlN0YXRlbWVudD4+KCdieV9zdWJqZWN0K3Byb3BlcnR5Jykua2V5KGtleSlcbiAgICBpZiAob2ZQcm9qZWN0KSB7XG4gICAgICByZXR1cm4gc2VsZWN0aW9uJC5waXBlKHRoaXMucGlwZUl0ZW1zSW5Qcm9qZWN0KHRoaXMucGtQcm9qZWN0JCwgKGl0ZW0pID0+IGl0ZW0ucGtfZW50aXR5KSlcbiAgICB9XG4gICAgcmV0dXJuIHNlbGVjdGlvbiRcbiAgfVxuXG4gIGJ5X29iamVjdCQoZm9yZWlnbktleXM6IEluZGV4U3RhdGVtZW50QnlPYmplY3QsIG9mUHJvamVjdCA9IHRydWUpOiBPYnNlcnZhYmxlPEluZlN0YXRlbWVudFtdPiB7XG4gICAgY29uc3Qga2V5ID0gaW5kZXhTdGF0ZW1lbnRCeU9iamVjdChmb3JlaWduS2V5cyk7XG4gICAgY29uc3Qgc2VsZWN0aW9uJCA9IHRoaXMuc2VsZWN0b3I8QnlQazxJbmZTdGF0ZW1lbnQ+PignYnlfb2JqZWN0Jykua2V5KGtleSlcbiAgICBpZiAob2ZQcm9qZWN0KSB7XG4gICAgICByZXR1cm4gc2VsZWN0aW9uJC5waXBlKFxuICAgICAgICB0aGlzLnBpcGVJdGVtc0luUHJvamVjdCh0aGlzLnBrUHJvamVjdCQsIChpdGVtKSA9PiBpdGVtLnBrX2VudGl0eSksXG4gICAgICAgIG1hcChpdGVtcyA9PiB2YWx1ZXMoaXRlbXMpKVxuICAgICAgKVxuICAgIH1cbiAgICByZXR1cm4gc2VsZWN0aW9uJC5waXBlKFxuICAgICAgbWFwKGl0ZW1zID0+IHZhbHVlcyhpdGVtcykpXG4gICAgKTtcbiAgfVxuXG4gIGJ5X29iamVjdF9hbmRfcHJvcGVydHkkKGZvcmVpZ25LZXlzOiBJbmRleFN0YXRlbWVudEJ5T2JqZWN0UHJvcGVydHksIG9mUHJvamVjdCA9IHRydWUpOiBPYnNlcnZhYmxlPEluZlN0YXRlbWVudFtdPiB7XG4gICAgcmV0dXJuIHRoaXMuYnlfb2JqZWN0X2FuZF9wcm9wZXJ0eV9pbmRleGVkJChmb3JlaWduS2V5cywgb2ZQcm9qZWN0KS5waXBlKFxuICAgICAgbWFwKHN0YXRlbWVudElkeCA9PiB2YWx1ZXMoc3RhdGVtZW50SWR4KSlcbiAgICApXG4gIH1cblxuICBieV9vYmplY3RfYW5kX3Byb3BlcnR5X2luZGV4ZWQkKGZvcmVpZ25LZXlzOiBJbmRleFN0YXRlbWVudEJ5T2JqZWN0UHJvcGVydHksIG9mUHJvamVjdCA9IHRydWUpOiBPYnNlcnZhYmxlPEJ5UGs8SW5mU3RhdGVtZW50Pj4ge1xuICAgIGNvbnN0IGtleSA9IGluZGV4U3RhdGVtZW50QnlPYmplY3RQcm9wZXJ0eShmb3JlaWduS2V5cyk7XG4gICAgY29uc3Qgc2VsZWN0aW9uJCA9IHRoaXMuc2VsZWN0b3I8QnlQazxJbmZTdGF0ZW1lbnQ+PignYnlfb2JqZWN0K3Byb3BlcnR5Jykua2V5KGtleSlcbiAgICBpZiAob2ZQcm9qZWN0KSB7XG4gICAgICByZXR1cm4gc2VsZWN0aW9uJC5waXBlKFxuICAgICAgICB0aGlzLnBpcGVJdGVtc0luUHJvamVjdCh0aGlzLnBrUHJvamVjdCQsIChpdGVtKSA9PiBpdGVtLnBrX2VudGl0eSksXG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiBzZWxlY3Rpb24kXG4gIH1cblxufVxuXG5cbmNsYXNzIEluZlRleHRQcm9wZXJ0eVNlbGVjdGlvbnMgZXh0ZW5kcyBTZWxlY3RvciB7XG4gIHByaXZhdGUgX2J5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPEluZlRleHRQcm9wZXJ0eT4oJ2J5X3BrX2VudGl0eScpXG4gIHByaXZhdGUgX2J5X2ZrX2NvbmNlcm5lZF9lbnRpdHlfX2ZrX2NsYXNzX2ZpZWxkJCA9IHRoaXMuc2VsZWN0b3I8QnlQazxJbmZUZXh0UHJvcGVydHk+PignYnlfZmtfY29uY2VybmVkX2VudGl0eV9fZmtfY2xhc3NfZmllbGQnKVxuICBwcml2YXRlIF9ieV9ma19jb25jZXJuZWRfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8QnlQazxJbmZUZXh0UHJvcGVydHk+PignYnlfZmtfY29uY2VybmVkX2VudGl0eScpXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgcGtQcm9qZWN0JDogT2JzZXJ2YWJsZTxudW1iZXIgfCBzdHJpbmc+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuICApIHsgc3VwZXIobmdSZWR1eCwgcGtQcm9qZWN0JCwgY29uZmlncywgbW9kZWwpIH1cblxuICBieV9wa19lbnRpdHlfa2V5JChrZXk6IHN0cmluZyB8IG51bWJlciwgb2ZQcm9qZWN0ID0gdHJ1ZSkge1xuICAgIGNvbnN0IHNlbGVjdGlvbiQgPSB0aGlzLl9ieV9wa19lbnRpdHkkLmtleShrZXkpXG4gICAgaWYgKG9mUHJvamVjdCkgcmV0dXJuIHNlbGVjdGlvbiQucGlwZSh0aGlzLnBpcGVJdGVtSW5Qcm9qZWN0KHRoaXMucGtQcm9qZWN0JCwgKGkpID0+IGkucGtfZW50aXR5KSlcbiAgICByZXR1cm4gc2VsZWN0aW9uJFxuICB9XG5cbiAgYnlfZmtfY29uY2VybmVkX2VudGl0eV9fZmtfY2xhc3NfZmllbGRfaW5kZXhlZCQoa2V5OiBzdHJpbmcsIG9mUHJvamVjdCA9IHRydWUpOiBPYnNlcnZhYmxlPEJ5UGs8SW5mVGV4dFByb3BlcnR5Pj4ge1xuICAgIGNvbnN0IHNlbGVjdGlvbiQgPSB0aGlzLl9ieV9ma19jb25jZXJuZWRfZW50aXR5X19ma19jbGFzc19maWVsZCQua2V5KGtleSlcbiAgICBpZiAob2ZQcm9qZWN0KSB7XG4gICAgICByZXR1cm4gc2VsZWN0aW9uJC5waXBlKFxuICAgICAgICB0aGlzLnBpcGVJdGVtc0luUHJvamVjdCh0aGlzLnBrUHJvamVjdCQsIChpdGVtKSA9PiBpdGVtLnBrX2VudGl0eSksXG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiBzZWxlY3Rpb24kXG4gIH1cblxuXG4gIGJ5X2ZrX2NvbmNlcm5lZF9lbnRpdHlfaW5kZXhlZCQoa2V5OiBzdHJpbmcgfCBudW1iZXIsIG9mUHJvamVjdCA9IHRydWUpOiBPYnNlcnZhYmxlPEJ5UGs8SW5mVGV4dFByb3BlcnR5Pj4ge1xuICAgIGNvbnN0IHNlbGVjdGlvbiQgPSB0aGlzLl9ieV9ma19jb25jZXJuZWRfZW50aXR5JC5rZXkoa2V5KVxuICAgIGlmIChvZlByb2plY3QpIHtcbiAgICAgIHJldHVybiBzZWxlY3Rpb24kLnBpcGUoXG4gICAgICAgIHRoaXMucGlwZUl0ZW1zSW5Qcm9qZWN0KHRoaXMucGtQcm9qZWN0JCwgKGl0ZW0pID0+IGl0ZW0ucGtfZW50aXR5KSxcbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIHNlbGVjdGlvbiRcbiAgfVxuXG59XG5cblxuY2xhc3MgSW5mQXBwZWxsYXRpb25TZWxlY3Rpb25zIGV4dGVuZHMgU2VsZWN0b3Ige1xuICBwdWJsaWMgYnlfcGtfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8SW5mQXBwZWxsYXRpb24+KCdieV9wa19lbnRpdHknKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIHBrUHJvamVjdCQsIGNvbmZpZ3MsIG1vZGVsKSB9XG59XG5cbmNsYXNzIEluZkxhbmdTdHJpbmdTZWxlY3Rpb25zIGV4dGVuZHMgU2VsZWN0b3Ige1xuICBwdWJsaWMgYnlfcGtfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8SW5mTGFuZ1N0cmluZz4oJ2J5X3BrX2VudGl0eScpXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgcGtQcm9qZWN0JDogT2JzZXJ2YWJsZTxudW1iZXIgfCBzdHJpbmc+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuICApIHsgc3VwZXIobmdSZWR1eCwgcGtQcm9qZWN0JCwgY29uZmlncywgbW9kZWwpIH1cbn1cblxuY2xhc3MgSW5mUGxhY2VTZWxlY3Rpb25zIGV4dGVuZHMgU2VsZWN0b3Ige1xuICBwdWJsaWMgYnlfcGtfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8SW5mUGxhY2U+KCdieV9wa19lbnRpdHknKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIHBrUHJvamVjdCQsIGNvbmZpZ3MsIG1vZGVsKSB9XG59XG5cbmNsYXNzIEluZlRpbWVQcmltaXRpdmVTZWxlY3Rpb25zIGV4dGVuZHMgU2VsZWN0b3Ige1xuICBwdWJsaWMgYnlfcGtfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8SW5mVGltZVByaW1pdGl2ZT4oJ2J5X3BrX2VudGl0eScpXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgcGtQcm9qZWN0JDogT2JzZXJ2YWJsZTxudW1iZXIgfCBzdHJpbmc+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuICApIHsgc3VwZXIobmdSZWR1eCwgcGtQcm9qZWN0JCwgY29uZmlncywgbW9kZWwpIH1cbn1cblxuY2xhc3MgSW5mTGFuZ3VhZ2VTZWxlY3Rpb25zIGV4dGVuZHMgU2VsZWN0b3Ige1xuICBwdWJsaWMgYnlfcGtfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8SW5mTGFuZ3VhZ2U+KCdieV9wa19lbnRpdHknKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIHBrUHJvamVjdCQsIGNvbmZpZ3MsIG1vZGVsKSB9XG59XG5cbmNsYXNzIEluZkRpbWVuc2lvblNlbGVjdGlvbnMgZXh0ZW5kcyBTZWxlY3RvciB7XG4gIHB1YmxpYyBieV9wa19lbnRpdHkkID0gdGhpcy5zZWxlY3RvcjxJbmZEaW1lbnNpb24+KCdieV9wa19lbnRpdHknKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIHBrUHJvamVjdCQsIGNvbmZpZ3MsIG1vZGVsKSB9XG59XG5cbmV4cG9ydCBjbGFzcyBJbmZTZWxlY3RvciB7XG5cbiAgcGVyc2lzdGVudF9pdGVtJCA9IG5ldyBJbmZQZXJzaXN0ZW50SXRlbVNlbGVjdGlvbnModGhpcy5uZ1JlZHV4LCB0aGlzLnBrUHJvamVjdCQsIGluZkRlZmluaXRpb25zLCAncGVyc2lzdGVudF9pdGVtJyk7XG4gIHRlbXBvcmFsX2VudGl0eSQgPSBuZXcgSW5mVGVtcG9yYWxFbnRpdHlTZWxlY3Rpb25zKHRoaXMubmdSZWR1eCwgdGhpcy5wa1Byb2plY3QkLCBpbmZEZWZpbml0aW9ucywgJ3RlbXBvcmFsX2VudGl0eScpO1xuICBzdGF0ZW1lbnQkID0gbmV3IEluZlN0YXRlbWVudFNlbGVjdGlvbnModGhpcy5uZ1JlZHV4LCB0aGlzLnBrUHJvamVjdCQsIGluZkRlZmluaXRpb25zLCAnc3RhdGVtZW50Jyk7XG4gIGFwcGVsbGF0aW9uJCA9IG5ldyBJbmZBcHBlbGxhdGlvblNlbGVjdGlvbnModGhpcy5uZ1JlZHV4LCB0aGlzLnBrUHJvamVjdCQsIGluZkRlZmluaXRpb25zLCAnYXBwZWxsYXRpb24nKTtcbiAgcGxhY2UkID0gbmV3IEluZlBsYWNlU2VsZWN0aW9ucyh0aGlzLm5nUmVkdXgsIHRoaXMucGtQcm9qZWN0JCwgaW5mRGVmaW5pdGlvbnMsICdwbGFjZScpO1xuICB0ZXh0X3Byb3BlcnR5JCA9IG5ldyBJbmZUZXh0UHJvcGVydHlTZWxlY3Rpb25zKHRoaXMubmdSZWR1eCwgdGhpcy5wa1Byb2plY3QkLCBpbmZEZWZpbml0aW9ucywgJ3RleHRfcHJvcGVydHknKTtcbiAgbGFuZ19zdHJpbmckID0gbmV3IEluZkxhbmdTdHJpbmdTZWxlY3Rpb25zKHRoaXMubmdSZWR1eCwgdGhpcy5wa1Byb2plY3QkLCBpbmZEZWZpbml0aW9ucywgJ2xhbmdfc3RyaW5nJyk7XG4gIHRpbWVfcHJpbWl0aXZlJCA9IG5ldyBJbmZUaW1lUHJpbWl0aXZlU2VsZWN0aW9ucyh0aGlzLm5nUmVkdXgsIHRoaXMucGtQcm9qZWN0JCwgaW5mRGVmaW5pdGlvbnMsICd0aW1lX3ByaW1pdGl2ZScpO1xuICBsYW5ndWFnZSQgPSBuZXcgSW5mTGFuZ3VhZ2VTZWxlY3Rpb25zKHRoaXMubmdSZWR1eCwgdGhpcy5wa1Byb2plY3QkLCBpbmZEZWZpbml0aW9ucywgJ2xhbmd1YWdlJyk7XG4gIGRpbWVuc2lvbiQgPSBuZXcgSW5mRGltZW5zaW9uU2VsZWN0aW9ucyh0aGlzLm5nUmVkdXgsIHRoaXMucGtQcm9qZWN0JCwgaW5mRGVmaW5pdGlvbnMsICdkaW1lbnNpb24nKTtcblxuICBwa0VudGl0eU1vZGVsTWFwJCA9IHRoaXMubmdSZWR1eC5zZWxlY3QoW2luZlJvb3QsIFBSX0VOVElUWV9NT0RFTF9NQVBdKTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LCBwdWJsaWMgcGtQcm9qZWN0JDogT2JzZXJ2YWJsZTxudW1iZXIgfCBzdHJpbmc+KSB7IH1cblxuICBnZXRNb2RlbE9mRW50aXR5JChwa0VudGl0eTogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHRoaXMubmdSZWR1eC5zZWxlY3Q8RW50aXR5TW9kZWxBbmRDbGFzczxJbmZNb2RlbE5hbWU+PihbaW5mUm9vdCwgUFJfRU5USVRZX01PREVMX01BUCwgcGtFbnRpdHldKTtcbiAgfVxufVxuIl19