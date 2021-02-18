/**
 * @fileoverview added by tsickle
 * Generated from: selectors/inf.service.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXF1ZXJpZXMvc3JjL2xpYi9xdWVyaWVzLyIsInNvdXJjZXMiOlsic2VsZWN0b3JzL2luZi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUE2QixTQUFTLEVBQXFDLHNCQUFzQixFQUFrQyw4QkFBOEIsRUFBMkIsdUJBQXVCLEVBQW1DLCtCQUErQixFQUFFLGNBQWMsRUFBRSxPQUFPLEVBQW1CLFdBQVcsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLG1CQUFtQixFQUEyQixNQUFNLHFCQUFxQixDQUFDO0FBRTFiLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzNELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFDNUIsT0FBTyxFQUFjLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDNUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRy9ELE1BQU0sUUFBUTs7Ozs7OztJQUNaLFlBQ1MsT0FBMkIsRUFDM0IsVUFBdUMsRUFDdkMsT0FBZ0MsRUFDaEMsS0FBYTtRQUhiLFlBQU8sR0FBUCxPQUFPLENBQW9CO1FBQzNCLGVBQVUsR0FBVixVQUFVLENBQTZCO1FBQ3ZDLFlBQU8sR0FBUCxPQUFPLENBQXlCO1FBQ2hDLFVBQUssR0FBTCxLQUFLLENBQVE7SUFDbEIsQ0FBQzs7Ozs7O0lBRUwsUUFBUSxDQUFJLFFBQWdCOztjQUVwQixJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQy9CLFNBQVM7Ozs7UUFBQyxFQUFFLENBQUMsRUFBRTs7Z0JBQ1QsSUFBVztZQUNmLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxFQUFF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QUFxSDs7SUFDckgsaUNBQW9HOztJQUNwRyxtQ0FBMEc7O0lBQzFHLDZCQUF3Rjs7SUFDeEYscUNBQStHOztJQUMvRyxtQ0FBeUc7O0lBQ3pHLHNDQUFrSDs7SUFDbEgsZ0NBQWlHOztJQUNqRyxpQ0FBb0c7O0lBRXBHLHdDQUF3RTs7SUFFNUQsOEJBQWtDOztJQUFFLGlDQUE4QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nUmVkdXggfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5pbXBvcnQgeyBCeVBrLCBFbnRpdHlNb2RlbEFuZENsYXNzLCBnZXRGcm9tVG8sIElBcHBTdGF0ZSwgSW5kZXhTdGF0ZW1lbnRCeU9iamVjdCwgaW5kZXhTdGF0ZW1lbnRCeU9iamVjdCwgSW5kZXhTdGF0ZW1lbnRCeU9iamVjdFByb3BlcnR5LCBpbmRleFN0YXRlbWVudEJ5T2JqZWN0UHJvcGVydHksIEluZGV4U3RhdGVtZW50QnlTdWJqZWN0LCBpbmRleFN0YXRlbWVudEJ5U3ViamVjdCwgSW5kZXhTdGF0ZW1lbnRCeVN1YmplY3RQcm9wZXJ0eSwgaW5kZXhTdGF0ZW1lbnRCeVN1YmplY3RQcm9wZXJ0eSwgaW5mRGVmaW5pdGlvbnMsIGluZlJvb3QsIFBhZ2luYXRlQnlQYXJhbSwgcGFnaW5hdGVkQnksIHBhZ2luYXRlS2V5LCBwYWdpbmF0ZU5hbWUsIFBSX0VOVElUWV9NT0RFTF9NQVAsIFJlZHVjZXJDb25maWdDb2xsZWN0aW9uIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1yZWR1eCc7XG5pbXBvcnQgeyBJbmZBcHBlbGxhdGlvbiwgSW5mRGltZW5zaW9uLCBJbmZMYW5nU3RyaW5nLCBJbmZMYW5ndWFnZSwgSW5mUGVyc2lzdGVudEl0ZW0sIEluZlBsYWNlLCBJbmZTdGF0ZW1lbnQsIEluZlRlbXBvcmFsRW50aXR5LCBJbmZUZXh0UHJvcGVydHksIEluZlRpbWVQcmltaXRpdmUsIFByb0luZm9Qcm9qUmVsIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3RPckVtcHR5IH0gZnJvbSAnQGtsZWlvbGFiL2xpYi11dGlscyc7XG5pbXBvcnQgeyB2YWx1ZXMgfSBmcm9tICdkMyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiwgcGlwZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBmaXJzdCwgbWFwLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5leHBvcnQgdHlwZSBJbmZNb2RlbE5hbWUgPSAncGVyc2lzdGVudF9pdGVtJyB8ICd0ZW1wb3JhbF9lbnRpdHknIHwgJ3N0YXRlbWVudCcgfCAndGV4dF9wcm9wZXJ0eScgfCAnYXBwZWxsYXRpb24nIHwgJ2xhbmd1YWdlJyB8ICdwbGFjZScgfCAnZGltZW5zaW9uJyB8ICdsYW5nX3N0cmluZycgfCAndGltZV9wcmltaXRpdmUnO1xuXG5jbGFzcyBTZWxlY3RvciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IH1cblxuICBzZWxlY3RvcjxNPihpbmRleEtleTogc3RyaW5nKTogeyBhbGwkOiBPYnNlcnZhYmxlPEJ5UGs8TT4+LCBrZXk6ICh4KSA9PiBPYnNlcnZhYmxlPE0+IH0ge1xuXG4gICAgY29uc3QgYWxsJCA9IHRoaXMucGtQcm9qZWN0JC5waXBlKFxuICAgICAgc3dpdGNoTWFwKHBrID0+IHtcbiAgICAgICAgbGV0IHBhdGg6IGFueVtdO1xuICAgICAgICBpZiAodGhpcy5jb25maWdzW3RoaXMubW9kZWxdLmZhY2V0dGVCeVBrKSB7XG4gICAgICAgICAgcGF0aCA9IFtpbmZSb290LCB0aGlzLm1vZGVsLCB0aGlzLmNvbmZpZ3NbdGhpcy5tb2RlbF0uZmFjZXR0ZUJ5UGssIHBrLCBpbmRleEtleV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcGF0aCA9IFtpbmZSb290LCB0aGlzLm1vZGVsLCBpbmRleEtleV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMubmdSZWR1eC5zZWxlY3Q8QnlQazxNPj4ocGF0aClcbiAgICAgIH0pXG4gICAgKVxuXG5cbiAgICBjb25zdCBrZXkgPSAoeCk6IE9ic2VydmFibGU8TT4gPT4ge1xuICAgICAgcmV0dXJuIHRoaXMucGtQcm9qZWN0JC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAocGsgPT4ge1xuICAgICAgICAgIGxldCBwYXRoOiBhbnlbXTtcbiAgICAgICAgICBpZiAodGhpcy5jb25maWdzW3RoaXMubW9kZWxdLmZhY2V0dGVCeVBrKSB7XG4gICAgICAgICAgICBwYXRoID0gW2luZlJvb3QsIHRoaXMubW9kZWwsIHRoaXMuY29uZmlnc1t0aGlzLm1vZGVsXS5mYWNldHRlQnlQaywgcGssIGluZGV4S2V5LCB4XTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGF0aCA9IFtpbmZSb290LCB0aGlzLm1vZGVsLCBpbmRleEtleSwgeF07XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aGlzLm5nUmVkdXguc2VsZWN0PE0+KHBhdGgpXG4gICAgICAgIH0pXG4gICAgICApXG5cbiAgICB9XG5cbiAgICByZXR1cm4geyBhbGwkLCBrZXkgfVxuICB9XG5cbiAgcGFnaW5hdGlvblNlbGVjdG9yPE0+KCkge1xuXG4gICAgY29uc3QgcGlwZVBhZ2UgPSAoYnk6IFBhZ2luYXRlQnlQYXJhbVtdLCBsaW1pdDogbnVtYmVyLCBvZmZzZXQ6IG51bWJlcik6IE9ic2VydmFibGU8TVtdPiA9PiB0aGlzLnBrUHJvamVjdCQucGlwZShcbiAgICAgIHN3aXRjaE1hcChwayA9PiB7XG4gICAgICAgIGxldCBwYXRoOiBhbnlbXTtcbiAgICAgICAgY29uc3QgcGFnQnkgPSBwYWdpbmF0ZWRCeShwYWdpbmF0ZU5hbWUoYnkpKVxuICAgICAgICBjb25zdCBrZXkgPSBwYWdpbmF0ZUtleShieSlcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnc1t0aGlzLm1vZGVsXS5mYWNldHRlQnlQaykge1xuICAgICAgICAgIHBhdGggPSBbaW5mUm9vdCwgdGhpcy5tb2RlbCwgdGhpcy5jb25maWdzW3RoaXMubW9kZWxdLmZhY2V0dGVCeVBrLCBwaywgcGFnQnksIGtleV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcGF0aCA9IFtpbmZSb290LCB0aGlzLm1vZGVsLCBwYWdCeSwga2V5XTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5uZ1JlZHV4LnNlbGVjdDxudW1iZXI+KFsuLi5wYXRoLCAnY291bnQnXSlcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgIGZpbHRlcihjb3VudCA9PiBjb3VudCAhPT0gdW5kZWZpbmVkKSxcbiAgICAgICAgICAgIHN3aXRjaE1hcChjb3VudCA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gb2Zmc2V0O1xuICAgICAgICAgICAgICBjb25zdCBlbmQgPSBjb3VudCA8PSAoc3RhcnQgKyBsaW1pdCkgPyBjb3VudCA6IChzdGFydCArIGxpbWl0KTtcbiAgICAgICAgICAgICAgY29uc3Qgb2JzJDogT2JzZXJ2YWJsZTxNPltdID0gW107XG4gICAgICAgICAgICAgIGZvciAobGV0IGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgb2JzJC5wdXNoKFxuICAgICAgICAgICAgICAgICAgdGhpcy5uZ1JlZHV4LnNlbGVjdDxNPihbLi4ucGF0aCwgJ3Jvd3MnLCBpXSkucGlwZShmaWx0ZXIoeCA9PiAhIXgpKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdE9yRW1wdHkob2JzJClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKVxuICAgICAgfSlcbiAgICApXG5cbiAgICBjb25zdCBwaXBlUGFnZUxvYWROZWVkZWQgPSAoYnk6IFBhZ2luYXRlQnlQYXJhbVtdLCBsaW1pdDogbnVtYmVyLCBvZmZzZXQ6IG51bWJlciwgdHJpZ2dlciQ/OiBPYnNlcnZhYmxlPGFueT4pOiBPYnNlcnZhYmxlPGJvb2xlYW4+ID0+IHRoaXMucGtQcm9qZWN0JC5waXBlKFxuICAgICAgc3dpdGNoTWFwKHBrID0+IHtcbiAgICAgICAgbGV0IHBhdGg6IGFueVtdO1xuICAgICAgICBjb25zdCBwYWdCeSA9IHBhZ2luYXRlZEJ5KHBhZ2luYXRlTmFtZShieSkpXG4gICAgICAgIGNvbnN0IGtleSA9IHBhZ2luYXRlS2V5KGJ5KVxuICAgICAgICBpZiAodGhpcy5jb25maWdzW3RoaXMubW9kZWxdLmZhY2V0dGVCeVBrKSB7XG4gICAgICAgICAgcGF0aCA9IFtpbmZSb290LCB0aGlzLm1vZGVsLCB0aGlzLmNvbmZpZ3NbdGhpcy5tb2RlbF0uZmFjZXR0ZUJ5UGssIHBrLCBwYWdCeSwga2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwYXRoID0gW2luZlJvb3QsIHRoaXMubW9kZWwsIHBhZ0J5LCBrZXldO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRyaWdnZXIkLnBpcGUoXG4gICAgICAgICAgc3dpdGNoTWFwKCgpID0+IHRoaXMubmdSZWR1eC5zZWxlY3Q8Ym9vbGVhbj4oWy4uLnBhdGgsICdsb2FkaW5nJywgZ2V0RnJvbVRvKGxpbWl0LCBvZmZzZXQpXSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBmaXJzdCgpLFxuICAgICAgICAgICAgICBtYXAobG9hZGluZyA9PiAhbG9hZGluZylcbiAgICAgICAgICAgIClcbiAgICAgICAgICApKVxuXG4gICAgICB9KVxuICAgIClcblxuICAgIGNvbnN0IHBpcGVDb3VudCA9IChieTogUGFnaW5hdGVCeVBhcmFtW10pOiBPYnNlcnZhYmxlPG51bWJlciB8IHVuZGVmaW5lZD4gPT4gdGhpcy5wa1Byb2plY3QkLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAocGsgPT4ge1xuICAgICAgICBsZXQgcGF0aDogYW55W107XG4gICAgICAgIGNvbnN0IHBhZ0J5ID0gcGFnaW5hdGVkQnkocGFnaW5hdGVOYW1lKGJ5KSlcbiAgICAgICAgY29uc3Qga2V5ID0gcGFnaW5hdGVLZXkoYnkpXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZ3NbdGhpcy5tb2RlbF0uZmFjZXR0ZUJ5UGspIHtcbiAgICAgICAgICBwYXRoID0gW2luZlJvb3QsIHRoaXMubW9kZWwsIHRoaXMuY29uZmlnc1t0aGlzLm1vZGVsXS5mYWNldHRlQnlQaywgcGssIHBhZ0J5LCBrZXldO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBhdGggPSBbaW5mUm9vdCwgdGhpcy5tb2RlbCwgcGFnQnksIGtleV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMubmdSZWR1eC5zZWxlY3Q8bnVtYmVyPihbLi4ucGF0aCwgJ2NvdW50J10pXG4gICAgICB9KVxuICAgIClcblxuICAgIHJldHVybiB7IHBpcGVQYWdlLCBwaXBlUGFnZUxvYWROZWVkZWQsIHBpcGVDb3VudCB9XG5cbiAgfVxuXG5cbiAgcGlwZUl0ZW1zSW5Qcm9qZWN0PE0+KHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPiwgZ2V0RmtFbnRpdHk6IChpdGVtOiBNKSA9PiBudW1iZXIpIHtcbiAgICByZXR1cm4gcGlwZShcbiAgICAgIHN3aXRjaE1hcCgoaXRlbXM6IEJ5UGs8TT4pID0+IHtcbiAgICAgICAgcmV0dXJuIHBrUHJvamVjdCQucGlwZShcbiAgICAgICAgICBzd2l0Y2hNYXAocGtQcm9qZWN0ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHByb1JlbHNBbmRLZXkkOiBPYnNlcnZhYmxlPHsga2V5OiBzdHJpbmcsIHJlbDogUHJvSW5mb1Byb2pSZWwgfT5bXSA9IFtdO1xuICAgICAgICAgICAgZm9yIChjb25zdCBrIGluIGl0ZW1zKSB7XG4gICAgICAgICAgICAgIGlmIChpdGVtcy5oYXNPd25Qcm9wZXJ0eShrKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBpdGVtc1trXTtcbiAgICAgICAgICAgICAgICBwcm9SZWxzQW5kS2V5JC5wdXNoKFxuICAgICAgICAgICAgICAgICAgdGhpcy5uZ1JlZHV4LnNlbGVjdDxQcm9JbmZvUHJvalJlbD4oWydwcm8nLCAnaW5mb19wcm9qX3JlbCcsICdieV9ma19wcm9qZWN0X19ma19lbnRpdHknLCBwa1Byb2plY3QgKyAnXycgKyBnZXRGa0VudGl0eShpdGVtKV0pXG4gICAgICAgICAgICAgICAgICAgIC5waXBlKG1hcChyZWwgPT4gKHsga2V5OiBrLCByZWwgfSkpKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3RPckVtcHR5KHByb1JlbHNBbmRLZXkkKS5waXBlKFxuICAgICAgICAgICAgICBtYXAocHJvUmVscyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbXNJblByb2plY3Q6IEJ5UGs8TT4gPSB7fTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb1JlbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHByb1JlbCA9IHByb1JlbHNbaV07XG4gICAgICAgICAgICAgICAgICBpZiAocHJvUmVsLnJlbCAmJiBwcm9SZWwucmVsLmlzX2luX3Byb2plY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbXNJblByb2plY3RbcHJvUmVsLmtleV0gPSBpdGVtc1twcm9SZWwua2V5XVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbXNJblByb2plY3Q7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuXG4gICAgICB9KVxuICAgIClcbiAgfVxuXG4gIHBpcGVJdGVtSW5Qcm9qZWN0PE0+KHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPiwgZ2V0RmtFbnRpdHk6IChpdGVtOiBNKSA9PiBudW1iZXIpIHtcbiAgICByZXR1cm4gcGlwZShcbiAgICAgIHN3aXRjaE1hcCgoaXRlbTogTSkgPT4ge1xuICAgICAgICBpZiAoIWl0ZW0pIHJldHVybiBvZih1bmRlZmluZWQpO1xuICAgICAgICByZXR1cm4gcGtQcm9qZWN0JC5waXBlKFxuICAgICAgICAgIHN3aXRjaE1hcChwa1Byb2plY3QgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJvUmVsJCA9IHRoaXMubmdSZWR1eC5zZWxlY3Q8UHJvSW5mb1Byb2pSZWw+KFsncHJvJywgJ2luZm9fcHJval9yZWwnLCAnYnlfZmtfcHJvamVjdF9fZmtfZW50aXR5JywgcGtQcm9qZWN0ICsgJ18nICsgZ2V0RmtFbnRpdHkoaXRlbSldKVxuICAgICAgICAgICAgcmV0dXJuIHByb1JlbCQucGlwZShcbiAgICAgICAgICAgICAgLy8gZmlsdGVyKHByb1JlbCA9PiBwcm9SZWwuaXNfaW5fcHJvamVjdCA9PSB0cnVlKSxcbiAgICAgICAgICAgICAgbWFwKChwcm9SZWwpID0+IHByb1JlbCAmJiBwcm9SZWwuaXNfaW5fcHJvamVjdCA9PSB0cnVlID8gaXRlbSA6IHVuZGVmaW5lZClcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICB9KVxuICAgIClcbiAgfVxufVxuXG5jbGFzcyBJbmZQZXJzaXN0ZW50SXRlbVNlbGVjdGlvbnMgZXh0ZW5kcyBTZWxlY3RvciB7XG4gIHByaXZhdGUgX2J5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPEluZlBlcnNpc3RlbnRJdGVtPignYnlfcGtfZW50aXR5JylcbiAgcHJpdmF0ZSBfYnlfZmtfY2xhc3MkID0gdGhpcy5zZWxlY3RvcjxCeVBrPEluZlBlcnNpc3RlbnRJdGVtPj4oJ2J5X2ZrX2NsYXNzJylcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBwa1Byb2plY3QkOiBPYnNlcnZhYmxlPG51bWJlciB8IHN0cmluZz4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBwa1Byb2plY3QkLCBjb25maWdzLCBtb2RlbCkgfVxuXG4gIGJ5X3BrX2VudGl0eV9rZXkkKGtleTogc3RyaW5nIHwgbnVtYmVyLCBvZlByb2plY3QgPSB0cnVlKSB7XG4gICAgY29uc3Qgc2VsZWN0aW9uJCA9IHRoaXMuX2J5X3BrX2VudGl0eSQua2V5KGtleSlcbiAgICBpZiAob2ZQcm9qZWN0KSByZXR1cm4gc2VsZWN0aW9uJC5waXBlKHRoaXMucGlwZUl0ZW1JblByb2plY3QodGhpcy5wa1Byb2plY3QkLCAoaSkgPT4gaS5wa19lbnRpdHkpKVxuICAgIHJldHVybiBzZWxlY3Rpb24kXG4gIH1cbiAgYnlfcGtfZW50aXR5X2FsbCQob2ZQcm9qZWN0ID0gdHJ1ZSkge1xuICAgIGNvbnN0IHNlbGVjdGlvbiQgPSB0aGlzLl9ieV9wa19lbnRpdHkkLmFsbCRcbiAgICBpZiAob2ZQcm9qZWN0KSByZXR1cm4gc2VsZWN0aW9uJC5waXBlKHRoaXMucGlwZUl0ZW1zSW5Qcm9qZWN0KHRoaXMucGtQcm9qZWN0JCwgKGkpID0+IGkucGtfZW50aXR5KSlcbiAgICByZXR1cm4gc2VsZWN0aW9uJFxuICB9XG4gIGJ5X2ZrX2NsYXNzX2tleSQoa2V5OiBzdHJpbmcgfCBudW1iZXIsIG9mUHJvamVjdCA9IHRydWUpIHtcbiAgICBjb25zdCBzZWxlY3Rpb24kID0gdGhpcy5fYnlfZmtfY2xhc3MkLmtleShrZXkpXG4gICAgaWYgKG9mUHJvamVjdCkgcmV0dXJuIHNlbGVjdGlvbiQucGlwZSh0aGlzLnBpcGVJdGVtc0luUHJvamVjdCh0aGlzLnBrUHJvamVjdCQsIChpKSA9PiBpLnBrX2VudGl0eSkpXG4gICAgcmV0dXJuIHNlbGVjdGlvbiRcbiAgfVxufVxuXG5jbGFzcyBJbmZUZW1wb3JhbEVudGl0eVNlbGVjdGlvbnMgZXh0ZW5kcyBTZWxlY3RvciB7XG4gIHByaXZhdGUgX2J5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPEluZlRlbXBvcmFsRW50aXR5PignYnlfcGtfZW50aXR5JylcbiAgLy8gcHVibGljIGJ5X2ZrX2NsYXNzJCA9IHRoaXMuc2VsZWN0b3I8QnlQazxJbmZUZW1wb3JhbEVudGl0eT4+KCdieV9ma19jbGFzcycpXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgcGtQcm9qZWN0JDogT2JzZXJ2YWJsZTxudW1iZXIgfCBzdHJpbmc+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuICApIHsgc3VwZXIobmdSZWR1eCwgcGtQcm9qZWN0JCwgY29uZmlncywgbW9kZWwpIH1cblxuICBieV9wa19lbnRpdHlfa2V5JChrZXk6IHN0cmluZyB8IG51bWJlciwgb2ZQcm9qZWN0ID0gdHJ1ZSkge1xuICAgIGNvbnN0IHNlbGVjdGlvbiQgPSB0aGlzLl9ieV9wa19lbnRpdHkkLmtleShrZXkpXG4gICAgaWYgKG9mUHJvamVjdCkgcmV0dXJuIHNlbGVjdGlvbiQucGlwZSh0aGlzLnBpcGVJdGVtSW5Qcm9qZWN0KHRoaXMucGtQcm9qZWN0JCwgKGkpID0+IGkucGtfZW50aXR5KSlcbiAgICByZXR1cm4gc2VsZWN0aW9uJFxuICB9XG59XG5cblxuY2xhc3MgSW5mU3RhdGVtZW50U2VsZWN0aW9ucyBleHRlbmRzIFNlbGVjdG9yIHtcblxuICBwcml2YXRlIF9ieV9wa19lbnRpdHkkID0gdGhpcy5zZWxlY3RvcjxJbmZTdGF0ZW1lbnQ+KCdieV9wa19lbnRpdHknKVxuICBwdWJsaWMgYnlfZmtfc3ViamVjdF9kYXRhJCA9IHRoaXMuc2VsZWN0b3I8QnlQazxJbmZTdGF0ZW1lbnQ+PignYnlfZmtfc3ViamVjdF9kYXRhJylcblxuICBwdWJsaWMgcGFnaW5hdGlvbiQgPSB0aGlzLnBhZ2luYXRpb25TZWxlY3RvcjxudW1iZXI+KClcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBwa1Byb2plY3QkOiBPYnNlcnZhYmxlPG51bWJlciB8IHN0cmluZz4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBwa1Byb2plY3QkLCBjb25maWdzLCBtb2RlbCkgfVxuXG4gIGJ5X3BrX2VudGl0eV9rZXkkKGtleTogc3RyaW5nIHwgbnVtYmVyLCBvZlByb2plY3QgPSB0cnVlKSB7XG4gICAgY29uc3Qgc2VsZWN0aW9uJCA9IHRoaXMuX2J5X3BrX2VudGl0eSQua2V5KGtleSlcbiAgICBpZiAob2ZQcm9qZWN0KSByZXR1cm4gc2VsZWN0aW9uJC5waXBlKHRoaXMucGlwZUl0ZW1JblByb2plY3QodGhpcy5wa1Byb2plY3QkLCAoaSkgPT4gaS5wa19lbnRpdHkpKVxuICAgIHJldHVybiBzZWxlY3Rpb24kXG4gIH1cblxuICBieV9zdWJqZWN0JChmb3JlaWduS2V5czogSW5kZXhTdGF0ZW1lbnRCeVN1YmplY3QsIG9mUHJvamVjdCA9IHRydWUpOiBPYnNlcnZhYmxlPEluZlN0YXRlbWVudFtdPiB7XG4gICAgY29uc3Qga2V5ID0gaW5kZXhTdGF0ZW1lbnRCeVN1YmplY3QoZm9yZWlnbktleXMpO1xuICAgIGNvbnN0IHNlbGVjdGlvbiQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8SW5mU3RhdGVtZW50Pj4oJ2J5X3N1YmplY3QnKS5rZXkoa2V5KVxuICAgIGlmIChvZlByb2plY3QpIHtcbiAgICAgIHJldHVybiBzZWxlY3Rpb24kLnBpcGUoXG4gICAgICAgIHRoaXMucGlwZUl0ZW1zSW5Qcm9qZWN0KHRoaXMucGtQcm9qZWN0JCwgKGl0ZW0pID0+IGl0ZW0ucGtfZW50aXR5KSxcbiAgICAgICAgbWFwKGl0ZW1zID0+IHZhbHVlcyhpdGVtcykpXG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiBzZWxlY3Rpb24kLnBpcGUoXG4gICAgICBtYXAoaXRlbXMgPT4gdmFsdWVzKGl0ZW1zKSlcbiAgICApO1xuICB9XG5cbiAgYnlfc3ViamVjdF9hbmRfcHJvcGVydHkkKGZvcmVpZ25LZXlzOiBJbmRleFN0YXRlbWVudEJ5U3ViamVjdFByb3BlcnR5LCBvZlByb2plY3QgPSB0cnVlKTogT2JzZXJ2YWJsZTxJbmZTdGF0ZW1lbnRbXT4ge1xuICAgIHJldHVybiB0aGlzLmJ5X3N1YmplY3RfYW5kX3Byb3BlcnR5X2luZGV4ZWQkKGZvcmVpZ25LZXlzLCBvZlByb2plY3QpLnBpcGUoXG4gICAgICBtYXAoc3RhdGVtZW50SWR4ID0+IHZhbHVlcyhzdGF0ZW1lbnRJZHgpKVxuICAgIClcbiAgfVxuICBieV9zdWJqZWN0X2FuZF9wcm9wZXJ0eV9pbmRleGVkJChmb3JlaWduS2V5czogSW5kZXhTdGF0ZW1lbnRCeVN1YmplY3RQcm9wZXJ0eSwgb2ZQcm9qZWN0ID0gdHJ1ZSk6IE9ic2VydmFibGU8QnlQazxJbmZTdGF0ZW1lbnQ+PiB7XG4gICAgY29uc3Qga2V5ID0gaW5kZXhTdGF0ZW1lbnRCeVN1YmplY3RQcm9wZXJ0eShmb3JlaWduS2V5cyk7XG4gICAgY29uc3Qgc2VsZWN0aW9uJCA9IHRoaXMuc2VsZWN0b3I8QnlQazxJbmZTdGF0ZW1lbnQ+PignYnlfc3ViamVjdCtwcm9wZXJ0eScpLmtleShrZXkpXG4gICAgaWYgKG9mUHJvamVjdCkge1xuICAgICAgcmV0dXJuIHNlbGVjdGlvbiQucGlwZSh0aGlzLnBpcGVJdGVtc0luUHJvamVjdCh0aGlzLnBrUHJvamVjdCQsIChpdGVtKSA9PiBpdGVtLnBrX2VudGl0eSkpXG4gICAgfVxuICAgIHJldHVybiBzZWxlY3Rpb24kXG4gIH1cblxuICBieV9vYmplY3QkKGZvcmVpZ25LZXlzOiBJbmRleFN0YXRlbWVudEJ5T2JqZWN0LCBvZlByb2plY3QgPSB0cnVlKTogT2JzZXJ2YWJsZTxJbmZTdGF0ZW1lbnRbXT4ge1xuICAgIGNvbnN0IGtleSA9IGluZGV4U3RhdGVtZW50QnlPYmplY3QoZm9yZWlnbktleXMpO1xuICAgIGNvbnN0IHNlbGVjdGlvbiQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8SW5mU3RhdGVtZW50Pj4oJ2J5X29iamVjdCcpLmtleShrZXkpXG4gICAgaWYgKG9mUHJvamVjdCkge1xuICAgICAgcmV0dXJuIHNlbGVjdGlvbiQucGlwZShcbiAgICAgICAgdGhpcy5waXBlSXRlbXNJblByb2plY3QodGhpcy5wa1Byb2plY3QkLCAoaXRlbSkgPT4gaXRlbS5wa19lbnRpdHkpLFxuICAgICAgICBtYXAoaXRlbXMgPT4gdmFsdWVzKGl0ZW1zKSlcbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIHNlbGVjdGlvbiQucGlwZShcbiAgICAgIG1hcChpdGVtcyA9PiB2YWx1ZXMoaXRlbXMpKVxuICAgICk7XG4gIH1cblxuICBieV9vYmplY3RfYW5kX3Byb3BlcnR5JChmb3JlaWduS2V5czogSW5kZXhTdGF0ZW1lbnRCeU9iamVjdFByb3BlcnR5LCBvZlByb2plY3QgPSB0cnVlKTogT2JzZXJ2YWJsZTxJbmZTdGF0ZW1lbnRbXT4ge1xuICAgIHJldHVybiB0aGlzLmJ5X29iamVjdF9hbmRfcHJvcGVydHlfaW5kZXhlZCQoZm9yZWlnbktleXMsIG9mUHJvamVjdCkucGlwZShcbiAgICAgIG1hcChzdGF0ZW1lbnRJZHggPT4gdmFsdWVzKHN0YXRlbWVudElkeCkpXG4gICAgKVxuICB9XG5cbiAgYnlfb2JqZWN0X2FuZF9wcm9wZXJ0eV9pbmRleGVkJChmb3JlaWduS2V5czogSW5kZXhTdGF0ZW1lbnRCeU9iamVjdFByb3BlcnR5LCBvZlByb2plY3QgPSB0cnVlKTogT2JzZXJ2YWJsZTxCeVBrPEluZlN0YXRlbWVudD4+IHtcbiAgICBjb25zdCBrZXkgPSBpbmRleFN0YXRlbWVudEJ5T2JqZWN0UHJvcGVydHkoZm9yZWlnbktleXMpO1xuICAgIGNvbnN0IHNlbGVjdGlvbiQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8SW5mU3RhdGVtZW50Pj4oJ2J5X29iamVjdCtwcm9wZXJ0eScpLmtleShrZXkpXG4gICAgaWYgKG9mUHJvamVjdCkge1xuICAgICAgcmV0dXJuIHNlbGVjdGlvbiQucGlwZShcbiAgICAgICAgdGhpcy5waXBlSXRlbXNJblByb2plY3QodGhpcy5wa1Byb2plY3QkLCAoaXRlbSkgPT4gaXRlbS5wa19lbnRpdHkpLFxuICAgICAgKVxuICAgIH1cbiAgICByZXR1cm4gc2VsZWN0aW9uJFxuICB9XG5cbn1cblxuXG5jbGFzcyBJbmZUZXh0UHJvcGVydHlTZWxlY3Rpb25zIGV4dGVuZHMgU2VsZWN0b3Ige1xuICBwcml2YXRlIF9ieV9wa19lbnRpdHkkID0gdGhpcy5zZWxlY3RvcjxJbmZUZXh0UHJvcGVydHk+KCdieV9wa19lbnRpdHknKVxuICBwcml2YXRlIF9ieV9ma19jb25jZXJuZWRfZW50aXR5X19ma19jbGFzc19maWVsZCQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8SW5mVGV4dFByb3BlcnR5Pj4oJ2J5X2ZrX2NvbmNlcm5lZF9lbnRpdHlfX2ZrX2NsYXNzX2ZpZWxkJylcbiAgcHJpdmF0ZSBfYnlfZmtfY29uY2VybmVkX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8SW5mVGV4dFByb3BlcnR5Pj4oJ2J5X2ZrX2NvbmNlcm5lZF9lbnRpdHknKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIHBrUHJvamVjdCQsIGNvbmZpZ3MsIG1vZGVsKSB9XG5cbiAgYnlfcGtfZW50aXR5X2tleSQoa2V5OiBzdHJpbmcgfCBudW1iZXIsIG9mUHJvamVjdCA9IHRydWUpIHtcbiAgICBjb25zdCBzZWxlY3Rpb24kID0gdGhpcy5fYnlfcGtfZW50aXR5JC5rZXkoa2V5KVxuICAgIGlmIChvZlByb2plY3QpIHJldHVybiBzZWxlY3Rpb24kLnBpcGUodGhpcy5waXBlSXRlbUluUHJvamVjdCh0aGlzLnBrUHJvamVjdCQsIChpKSA9PiBpLnBrX2VudGl0eSkpXG4gICAgcmV0dXJuIHNlbGVjdGlvbiRcbiAgfVxuXG4gIGJ5X2ZrX2NvbmNlcm5lZF9lbnRpdHlfX2ZrX2NsYXNzX2ZpZWxkX2luZGV4ZWQkKGtleTogc3RyaW5nLCBvZlByb2plY3QgPSB0cnVlKTogT2JzZXJ2YWJsZTxCeVBrPEluZlRleHRQcm9wZXJ0eT4+IHtcbiAgICBjb25zdCBzZWxlY3Rpb24kID0gdGhpcy5fYnlfZmtfY29uY2VybmVkX2VudGl0eV9fZmtfY2xhc3NfZmllbGQkLmtleShrZXkpXG4gICAgaWYgKG9mUHJvamVjdCkge1xuICAgICAgcmV0dXJuIHNlbGVjdGlvbiQucGlwZShcbiAgICAgICAgdGhpcy5waXBlSXRlbXNJblByb2plY3QodGhpcy5wa1Byb2plY3QkLCAoaXRlbSkgPT4gaXRlbS5wa19lbnRpdHkpLFxuICAgICAgKVxuICAgIH1cbiAgICByZXR1cm4gc2VsZWN0aW9uJFxuICB9XG5cblxuICBieV9ma19jb25jZXJuZWRfZW50aXR5X2luZGV4ZWQkKGtleTogc3RyaW5nIHwgbnVtYmVyLCBvZlByb2plY3QgPSB0cnVlKTogT2JzZXJ2YWJsZTxCeVBrPEluZlRleHRQcm9wZXJ0eT4+IHtcbiAgICBjb25zdCBzZWxlY3Rpb24kID0gdGhpcy5fYnlfZmtfY29uY2VybmVkX2VudGl0eSQua2V5KGtleSlcbiAgICBpZiAob2ZQcm9qZWN0KSB7XG4gICAgICByZXR1cm4gc2VsZWN0aW9uJC5waXBlKFxuICAgICAgICB0aGlzLnBpcGVJdGVtc0luUHJvamVjdCh0aGlzLnBrUHJvamVjdCQsIChpdGVtKSA9PiBpdGVtLnBrX2VudGl0eSksXG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiBzZWxlY3Rpb24kXG4gIH1cblxufVxuXG5cbmNsYXNzIEluZkFwcGVsbGF0aW9uU2VsZWN0aW9ucyBleHRlbmRzIFNlbGVjdG9yIHtcbiAgcHVibGljIGJ5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPEluZkFwcGVsbGF0aW9uPignYnlfcGtfZW50aXR5JylcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBwa1Byb2plY3QkOiBPYnNlcnZhYmxlPG51bWJlciB8IHN0cmluZz4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBwa1Byb2plY3QkLCBjb25maWdzLCBtb2RlbCkgfVxufVxuXG5jbGFzcyBJbmZMYW5nU3RyaW5nU2VsZWN0aW9ucyBleHRlbmRzIFNlbGVjdG9yIHtcbiAgcHVibGljIGJ5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPEluZkxhbmdTdHJpbmc+KCdieV9wa19lbnRpdHknKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIHBrUHJvamVjdCQsIGNvbmZpZ3MsIG1vZGVsKSB9XG59XG5cbmNsYXNzIEluZlBsYWNlU2VsZWN0aW9ucyBleHRlbmRzIFNlbGVjdG9yIHtcbiAgcHVibGljIGJ5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPEluZlBsYWNlPignYnlfcGtfZW50aXR5JylcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBwa1Byb2plY3QkOiBPYnNlcnZhYmxlPG51bWJlciB8IHN0cmluZz4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBwa1Byb2plY3QkLCBjb25maWdzLCBtb2RlbCkgfVxufVxuXG5jbGFzcyBJbmZUaW1lUHJpbWl0aXZlU2VsZWN0aW9ucyBleHRlbmRzIFNlbGVjdG9yIHtcbiAgcHVibGljIGJ5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPEluZlRpbWVQcmltaXRpdmU+KCdieV9wa19lbnRpdHknKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIHBrUHJvamVjdCQsIGNvbmZpZ3MsIG1vZGVsKSB9XG59XG5cbmNsYXNzIEluZkxhbmd1YWdlU2VsZWN0aW9ucyBleHRlbmRzIFNlbGVjdG9yIHtcbiAgcHVibGljIGJ5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPEluZkxhbmd1YWdlPignYnlfcGtfZW50aXR5JylcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBwa1Byb2plY3QkOiBPYnNlcnZhYmxlPG51bWJlciB8IHN0cmluZz4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBwa1Byb2plY3QkLCBjb25maWdzLCBtb2RlbCkgfVxufVxuXG5jbGFzcyBJbmZEaW1lbnNpb25TZWxlY3Rpb25zIGV4dGVuZHMgU2VsZWN0b3Ige1xuICBwdWJsaWMgYnlfcGtfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8SW5mRGltZW5zaW9uPignYnlfcGtfZW50aXR5JylcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBwa1Byb2plY3QkOiBPYnNlcnZhYmxlPG51bWJlciB8IHN0cmluZz4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBwa1Byb2plY3QkLCBjb25maWdzLCBtb2RlbCkgfVxufVxuXG5leHBvcnQgY2xhc3MgSW5mU2VsZWN0b3Ige1xuXG4gIHBlcnNpc3RlbnRfaXRlbSQgPSBuZXcgSW5mUGVyc2lzdGVudEl0ZW1TZWxlY3Rpb25zKHRoaXMubmdSZWR1eCwgdGhpcy5wa1Byb2plY3QkLCBpbmZEZWZpbml0aW9ucywgJ3BlcnNpc3RlbnRfaXRlbScpO1xuICB0ZW1wb3JhbF9lbnRpdHkkID0gbmV3IEluZlRlbXBvcmFsRW50aXR5U2VsZWN0aW9ucyh0aGlzLm5nUmVkdXgsIHRoaXMucGtQcm9qZWN0JCwgaW5mRGVmaW5pdGlvbnMsICd0ZW1wb3JhbF9lbnRpdHknKTtcbiAgc3RhdGVtZW50JCA9IG5ldyBJbmZTdGF0ZW1lbnRTZWxlY3Rpb25zKHRoaXMubmdSZWR1eCwgdGhpcy5wa1Byb2plY3QkLCBpbmZEZWZpbml0aW9ucywgJ3N0YXRlbWVudCcpO1xuICBhcHBlbGxhdGlvbiQgPSBuZXcgSW5mQXBwZWxsYXRpb25TZWxlY3Rpb25zKHRoaXMubmdSZWR1eCwgdGhpcy5wa1Byb2plY3QkLCBpbmZEZWZpbml0aW9ucywgJ2FwcGVsbGF0aW9uJyk7XG4gIHBsYWNlJCA9IG5ldyBJbmZQbGFjZVNlbGVjdGlvbnModGhpcy5uZ1JlZHV4LCB0aGlzLnBrUHJvamVjdCQsIGluZkRlZmluaXRpb25zLCAncGxhY2UnKTtcbiAgdGV4dF9wcm9wZXJ0eSQgPSBuZXcgSW5mVGV4dFByb3BlcnR5U2VsZWN0aW9ucyh0aGlzLm5nUmVkdXgsIHRoaXMucGtQcm9qZWN0JCwgaW5mRGVmaW5pdGlvbnMsICd0ZXh0X3Byb3BlcnR5Jyk7XG4gIGxhbmdfc3RyaW5nJCA9IG5ldyBJbmZMYW5nU3RyaW5nU2VsZWN0aW9ucyh0aGlzLm5nUmVkdXgsIHRoaXMucGtQcm9qZWN0JCwgaW5mRGVmaW5pdGlvbnMsICdsYW5nX3N0cmluZycpO1xuICB0aW1lX3ByaW1pdGl2ZSQgPSBuZXcgSW5mVGltZVByaW1pdGl2ZVNlbGVjdGlvbnModGhpcy5uZ1JlZHV4LCB0aGlzLnBrUHJvamVjdCQsIGluZkRlZmluaXRpb25zLCAndGltZV9wcmltaXRpdmUnKTtcbiAgbGFuZ3VhZ2UkID0gbmV3IEluZkxhbmd1YWdlU2VsZWN0aW9ucyh0aGlzLm5nUmVkdXgsIHRoaXMucGtQcm9qZWN0JCwgaW5mRGVmaW5pdGlvbnMsICdsYW5ndWFnZScpO1xuICBkaW1lbnNpb24kID0gbmV3IEluZkRpbWVuc2lvblNlbGVjdGlvbnModGhpcy5uZ1JlZHV4LCB0aGlzLnBrUHJvamVjdCQsIGluZkRlZmluaXRpb25zLCAnZGltZW5zaW9uJyk7XG5cbiAgcGtFbnRpdHlNb2RlbE1hcCQgPSB0aGlzLm5nUmVkdXguc2VsZWN0KFtpbmZSb290LCBQUl9FTlRJVFlfTU9ERUxfTUFQXSk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPiwgcHVibGljIHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPikgeyB9XG5cbiAgZ2V0TW9kZWxPZkVudGl0eSQocGtFbnRpdHk6IG51bWJlcikge1xuICAgIHJldHVybiB0aGlzLm5nUmVkdXguc2VsZWN0PEVudGl0eU1vZGVsQW5kQ2xhc3M8SW5mTW9kZWxOYW1lPj4oW2luZlJvb3QsIFBSX0VOVElUWV9NT0RFTF9NQVAsIHBrRW50aXR5XSk7XG4gIH1cbn1cbiJdfQ==