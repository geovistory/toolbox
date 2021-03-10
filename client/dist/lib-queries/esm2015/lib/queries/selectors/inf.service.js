/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/selectors/inf.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { getFromTo, indexStatementByObject, indexStatementByObjectProperty, indexStatementBySubject, indexStatementBySubjectProperty, infDefinitions, infRoot, paginateBy, PR_ENTITY_MODEL_MAP, subfieldIdToString } from '@kleiolab/lib-redux';
import { combineLatestOrEmpty } from '@kleiolab/lib-utils';
import { values } from 'd3';
import { equals } from 'ramda';
import { of, pipe } from 'rxjs';
import { filter, first, map, switchMap, throttleTime } from 'rxjs/operators';
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
        const all$ = this.ngRedux.select([infRoot, this.model, indexKey]);
        /** @type {?} */
        const key = (/**
         * @param {?} x
         * @return {?}
         */
        (x) => {
            // REMARK: 'equals' comparator is very very important for performance !
            return this.ngRedux.select([infRoot, this.model, indexKey, x], equals);
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
         * @param {?} page
         * @return {?}
         */
        (page) => {
            /** @type {?} */
            let path;
            /** @type {?} */
            const pagBy = paginateBy;
            /** @type {?} */
            const key = subfieldIdToString(page);
            path = [infRoot, this.model, pagBy, key];
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
                const start = page.offset;
                /** @type {?} */
                const end = count <= (start + page.limit) ? count : (start + page.limit);
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
        });
        /** @type {?} */
        const pipePageLoadNeeded = (/**
         * @param {?} page
         * @param {?} trigger$
         * @return {?}
         */
        (page, trigger$) => {
            /** @type {?} */
            let path;
            /** @type {?} */
            const pagBy = paginateBy;
            /** @type {?} */
            const key = subfieldIdToString(page);
            path = [infRoot, this.model, pagBy, key];
            /** @type {?} */
            const fromToString = getFromTo(page.limit, page.offset)
            // return this.ngRedux.select<boolean>([...path, 'loading', fromToString])
            //   .pipe(
            //     // map(loading => !loading),
            //     switchMap((loading) => {
            //       if (loading) return of(false)
            //       else return trigger$.pipe(mapTo(true))
            //     }),
            //     // first(),
            //   )
            ;
            // return this.ngRedux.select<boolean>([...path, 'loading', fromToString])
            //   .pipe(
            //     // map(loading => !loading),
            //     switchMap((loading) => {
            //       if (loading) return of(false)
            //       else return trigger$.pipe(mapTo(true))
            //     }),
            //     // first(),
            //   )
            return trigger$.pipe(switchMap((/**
             * @return {?}
             */
            () => this.ngRedux.select([...path, 'loading', fromToString])
                .pipe(first(), map((/**
             * @param {?} loading
             * @return {?}
             */
            loading => !loading))))));
        });
        /** @type {?} */
        const pipeCount = (/**
         * @param {?} page
         * @return {?}
         */
        (page) => {
            /** @type {?} */
            let path;
            /** @type {?} */
            const pagBy = paginateBy;
            /** @type {?} */
            const key = subfieldIdToString(page);
            path = [infRoot, this.model, pagBy, key];
            return this.ngRedux.select([...path, 'count']);
        });
        return { pipePage, pipeCount, pipePageLoadNeeded };
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
                return combineLatestOrEmpty(proRelsAndKey$).pipe(throttleTime(0), map((/**
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
        this.by_pk_entity$ = this.selector('by_pk_entity');
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
        const selection$ = this.by_pk_entity$.key(key);
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
    /** @type {?} */
    InfStatementSelections.prototype.by_pk_entity$;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXF1ZXJpZXMvIiwic291cmNlcyI6WyJsaWIvcXVlcmllcy9zZWxlY3RvcnMvaW5mLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBQTZCLFNBQVMsRUFBcUMsc0JBQXNCLEVBQWtDLDhCQUE4QixFQUEyQix1QkFBdUIsRUFBbUMsK0JBQStCLEVBQUUsY0FBYyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsbUJBQW1CLEVBQTJCLGtCQUFrQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFHamEsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDM0QsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLElBQUksQ0FBQztBQUM1QixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQy9CLE9BQU8sRUFBYyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzVDLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHN0UsTUFBTSxRQUFROzs7Ozs7O0lBQ1osWUFDUyxPQUEyQixFQUMzQixVQUF1QyxFQUN2QyxPQUFnQyxFQUNoQyxLQUFhO1FBSGIsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUFDM0IsZUFBVSxHQUFWLFVBQVUsQ0FBNkI7UUFDdkMsWUFBTyxHQUFQLE9BQU8sQ0FBeUI7UUFDaEMsVUFBSyxHQUFMLEtBQUssQ0FBUTtJQUNsQixDQUFDOzs7Ozs7SUFFTCxRQUFRLENBQUksUUFBZ0I7O2NBRXBCLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBVSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDOztjQUNwRSxHQUFHOzs7O1FB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LGNBQVMsR0FBRyxJQUFJLHFCQUFxQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxjQUFjLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDakcsZUFBVSxHQUFHLElBQUksc0JBQXNCLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLGNBQWMsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUVwRyxzQkFBaUIsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7SUFFMEIsQ0FBQzs7Ozs7SUFFbkcsaUJBQWlCLENBQUMsUUFBZ0I7UUFDaEMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBb0MsQ0FBQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUMxRyxDQUFDO0NBQ0Y7OztJQWxCQyx1Q0FBcUg7O0lBQ3JILHVDQUFxSDs7SUFDckgsaUNBQW9HOztJQUNwRyxtQ0FBMEc7O0lBQzFHLDZCQUF3Rjs7SUFDeEYscUNBQStHOztJQUMvRyxtQ0FBeUc7O0lBQ3pHLHNDQUFrSDs7SUFDbEgsZ0NBQWlHOztJQUNqRyxpQ0FBb0c7O0lBRXBHLHdDQUF3RTs7SUFFNUQsOEJBQWtDOztJQUFFLGlDQUE4QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nUmVkdXggfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5pbXBvcnQgeyBCeVBrLCBFbnRpdHlNb2RlbEFuZENsYXNzLCBnZXRGcm9tVG8sIElBcHBTdGF0ZSwgSW5kZXhTdGF0ZW1lbnRCeU9iamVjdCwgaW5kZXhTdGF0ZW1lbnRCeU9iamVjdCwgSW5kZXhTdGF0ZW1lbnRCeU9iamVjdFByb3BlcnR5LCBpbmRleFN0YXRlbWVudEJ5T2JqZWN0UHJvcGVydHksIEluZGV4U3RhdGVtZW50QnlTdWJqZWN0LCBpbmRleFN0YXRlbWVudEJ5U3ViamVjdCwgSW5kZXhTdGF0ZW1lbnRCeVN1YmplY3RQcm9wZXJ0eSwgaW5kZXhTdGF0ZW1lbnRCeVN1YmplY3RQcm9wZXJ0eSwgaW5mRGVmaW5pdGlvbnMsIGluZlJvb3QsIHBhZ2luYXRlQnksIFBSX0VOVElUWV9NT0RFTF9NQVAsIFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLCBzdWJmaWVsZElkVG9TdHJpbmcgfSBmcm9tICdAa2xlaW9sYWIvbGliLXJlZHV4JztcbmltcG9ydCB7IEluZkFwcGVsbGF0aW9uLCBJbmZEaW1lbnNpb24sIEluZkxhbmdTdHJpbmcsIEluZkxhbmd1YWdlLCBJbmZQZXJzaXN0ZW50SXRlbSwgSW5mUGxhY2UsIEluZlN0YXRlbWVudCwgSW5mVGVtcG9yYWxFbnRpdHksIEluZlRleHRQcm9wZXJ0eSwgSW5mVGltZVByaW1pdGl2ZSwgUHJvSW5mb1Byb2pSZWwgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgR3ZTdWJmaWVsZElkLCBHdlN1YmZpZWxkUGFnZSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0T3JFbXB0eSB9IGZyb20gJ0BrbGVpb2xhYi9saWItdXRpbHMnO1xuaW1wb3J0IHsgdmFsdWVzIH0gZnJvbSAnZDMnO1xuaW1wb3J0IHsgZXF1YWxzIH0gZnJvbSAncmFtZGEnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YsIHBpcGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgZmlyc3QsIG1hcCwgc3dpdGNoTWFwLCB0aHJvdHRsZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5leHBvcnQgdHlwZSBJbmZNb2RlbE5hbWUgPSAncGVyc2lzdGVudF9pdGVtJyB8ICd0ZW1wb3JhbF9lbnRpdHknIHwgJ3N0YXRlbWVudCcgfCAndGV4dF9wcm9wZXJ0eScgfCAnYXBwZWxsYXRpb24nIHwgJ2xhbmd1YWdlJyB8ICdwbGFjZScgfCAnZGltZW5zaW9uJyB8ICdsYW5nX3N0cmluZycgfCAndGltZV9wcmltaXRpdmUnO1xuXG5jbGFzcyBTZWxlY3RvciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IH1cblxuICBzZWxlY3RvcjxNPihpbmRleEtleTogc3RyaW5nKTogeyBhbGwkOiBPYnNlcnZhYmxlPEJ5UGs8TT4+LCBrZXk6ICh4KSA9PiBPYnNlcnZhYmxlPE0+IH0ge1xuXG4gICAgY29uc3QgYWxsJCA9IHRoaXMubmdSZWR1eC5zZWxlY3Q8QnlQazxNPj4oW2luZlJvb3QsIHRoaXMubW9kZWwsIGluZGV4S2V5XSlcbiAgICBjb25zdCBrZXkgPSAoeCk6IE9ic2VydmFibGU8TT4gPT4ge1xuICAgICAgLy8gUkVNQVJLOiAnZXF1YWxzJyBjb21wYXJhdG9yIGlzIHZlcnkgdmVyeSBpbXBvcnRhbnQgZm9yIHBlcmZvcm1hbmNlICFcbiAgICAgIHJldHVybiB0aGlzLm5nUmVkdXguc2VsZWN0PE0+KFtpbmZSb290LCB0aGlzLm1vZGVsLCBpbmRleEtleSwgeF0sIGVxdWFscylcbiAgICB9XG4gICAgcmV0dXJuIHsgYWxsJCwga2V5IH1cbiAgfVxuXG4gIHBhZ2luYXRpb25TZWxlY3RvcjxNPigpIHtcblxuICAgIGNvbnN0IHBpcGVQYWdlID0gKHBhZ2U6IEd2U3ViZmllbGRQYWdlKTogT2JzZXJ2YWJsZTxNW10+ID0+IHtcbiAgICAgIGxldCBwYXRoOiBhbnlbXTtcbiAgICAgIGNvbnN0IHBhZ0J5ID0gcGFnaW5hdGVCeVxuICAgICAgY29uc3Qga2V5ID0gc3ViZmllbGRJZFRvU3RyaW5nKHBhZ2UpXG4gICAgICBwYXRoID0gW2luZlJvb3QsIHRoaXMubW9kZWwsIHBhZ0J5LCBrZXldO1xuICAgICAgcmV0dXJuIHRoaXMubmdSZWR1eC5zZWxlY3Q8bnVtYmVyPihbLi4ucGF0aCwgJ2NvdW50J10pXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIGZpbHRlcihjb3VudCA9PiBjb3VudCAhPT0gdW5kZWZpbmVkKSxcbiAgICAgICAgICBzd2l0Y2hNYXAoY291bnQgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSBwYWdlLm9mZnNldDtcbiAgICAgICAgICAgIGNvbnN0IGVuZCA9IGNvdW50IDw9IChzdGFydCArIHBhZ2UubGltaXQpID8gY291bnQgOiAoc3RhcnQgKyBwYWdlLmxpbWl0KTtcbiAgICAgICAgICAgIGNvbnN0IG9icyQ6IE9ic2VydmFibGU8TT5bXSA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICAgICAgICAgICAgb2JzJC5wdXNoKFxuICAgICAgICAgICAgICAgIHRoaXMubmdSZWR1eC5zZWxlY3Q8TT4oWy4uLnBhdGgsICdyb3dzJywgaV0pLnBpcGUoZmlsdGVyKHggPT4gISF4KSlcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3RPckVtcHR5KG9icyQpXG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgIH1cblxuXG4gICAgY29uc3QgcGlwZVBhZ2VMb2FkTmVlZGVkID0gKHBhZ2U6IEd2U3ViZmllbGRQYWdlLCB0cmlnZ2VyJDogT2JzZXJ2YWJsZTxhbnk+KTogT2JzZXJ2YWJsZTxib29sZWFuPiA9PiB7XG4gICAgICBsZXQgcGF0aDogYW55W107XG4gICAgICBjb25zdCBwYWdCeSA9IHBhZ2luYXRlQnlcbiAgICAgIGNvbnN0IGtleSA9IHN1YmZpZWxkSWRUb1N0cmluZyhwYWdlKVxuXG4gICAgICBwYXRoID0gW2luZlJvb3QsIHRoaXMubW9kZWwsIHBhZ0J5LCBrZXldO1xuICAgICAgY29uc3QgZnJvbVRvU3RyaW5nID0gZ2V0RnJvbVRvKHBhZ2UubGltaXQsIHBhZ2Uub2Zmc2V0KVxuICAgICAgLy8gcmV0dXJuIHRoaXMubmdSZWR1eC5zZWxlY3Q8Ym9vbGVhbj4oWy4uLnBhdGgsICdsb2FkaW5nJywgZnJvbVRvU3RyaW5nXSlcbiAgICAgIC8vICAgLnBpcGUoXG4gICAgICAvLyAgICAgLy8gbWFwKGxvYWRpbmcgPT4gIWxvYWRpbmcpLFxuICAgICAgLy8gICAgIHN3aXRjaE1hcCgobG9hZGluZykgPT4ge1xuICAgICAgLy8gICAgICAgaWYgKGxvYWRpbmcpIHJldHVybiBvZihmYWxzZSlcbiAgICAgIC8vICAgICAgIGVsc2UgcmV0dXJuIHRyaWdnZXIkLnBpcGUobWFwVG8odHJ1ZSkpXG4gICAgICAvLyAgICAgfSksXG4gICAgICAvLyAgICAgLy8gZmlyc3QoKSxcbiAgICAgIC8vICAgKVxuXG4gICAgICByZXR1cm4gdHJpZ2dlciQucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKCgpID0+IHRoaXMubmdSZWR1eC5zZWxlY3Q8Ym9vbGVhbj4oWy4uLnBhdGgsICdsb2FkaW5nJywgZnJvbVRvU3RyaW5nXSlcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgIGZpcnN0KCksXG4gICAgICAgICAgICBtYXAobG9hZGluZyA9PiAhbG9hZGluZylcbiAgICAgICAgICApXG4gICAgICAgICkpXG5cbiAgICB9XG5cblxuICAgIGNvbnN0IHBpcGVDb3VudCA9IChwYWdlOiBHdlN1YmZpZWxkSWQpOiBPYnNlcnZhYmxlPG51bWJlciB8IHVuZGVmaW5lZD4gPT4ge1xuICAgICAgbGV0IHBhdGg6IGFueVtdO1xuICAgICAgY29uc3QgcGFnQnkgPSBwYWdpbmF0ZUJ5XG4gICAgICBjb25zdCBrZXkgPSBzdWJmaWVsZElkVG9TdHJpbmcocGFnZSlcblxuICAgICAgcGF0aCA9IFtpbmZSb290LCB0aGlzLm1vZGVsLCBwYWdCeSwga2V5XTtcbiAgICAgIHJldHVybiB0aGlzLm5nUmVkdXguc2VsZWN0PG51bWJlcj4oWy4uLnBhdGgsICdjb3VudCddKVxuICAgIH1cblxuXG4gICAgcmV0dXJuIHsgcGlwZVBhZ2UsIHBpcGVDb3VudCwgcGlwZVBhZ2VMb2FkTmVlZGVkIH1cblxuICB9XG5cblxuICBwaXBlSXRlbXNJblByb2plY3Q8TT4ocGtQcm9qZWN0JDogT2JzZXJ2YWJsZTxudW1iZXIgfCBzdHJpbmc+LCBnZXRGa0VudGl0eTogKGl0ZW06IE0pID0+IG51bWJlcikge1xuXG4gICAgcmV0dXJuIHBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKGl0ZW1zOiBCeVBrPE0+KSA9PiB7XG4gICAgICAgIHJldHVybiBwa1Byb2plY3QkLnBpcGUoXG4gICAgICAgICAgc3dpdGNoTWFwKHBrUHJvamVjdCA9PiB7XG4gICAgICAgICAgICBjb25zdCBwcm9SZWxzQW5kS2V5JDogT2JzZXJ2YWJsZTx7IGtleTogc3RyaW5nLCByZWw6IFByb0luZm9Qcm9qUmVsIH0+W10gPSBbXTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgayBpbiBpdGVtcykge1xuICAgICAgICAgICAgICBpZiAoaXRlbXMuaGFzT3duUHJvcGVydHkoaykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gaXRlbXNba107XG4gICAgICAgICAgICAgICAgcHJvUmVsc0FuZEtleSQucHVzaChcbiAgICAgICAgICAgICAgICAgIHRoaXMubmdSZWR1eC5zZWxlY3Q8UHJvSW5mb1Byb2pSZWw+KFsncHJvJywgJ2luZm9fcHJval9yZWwnLCAnYnlfZmtfcHJvamVjdF9fZmtfZW50aXR5JywgcGtQcm9qZWN0ICsgJ18nICsgZ2V0RmtFbnRpdHkoaXRlbSldKVxuICAgICAgICAgICAgICAgICAgICAucGlwZShtYXAocmVsID0+ICh7IGtleTogaywgcmVsIH0pKSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0T3JFbXB0eShwcm9SZWxzQW5kS2V5JCkucGlwZShcbiAgICAgICAgICAgICAgdGhyb3R0bGVUaW1lKDApLFxuICAgICAgICAgICAgICBtYXAocHJvUmVscyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbXNJblByb2plY3Q6IEJ5UGs8TT4gPSB7fTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb1JlbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHByb1JlbCA9IHByb1JlbHNbaV07XG4gICAgICAgICAgICAgICAgICBpZiAocHJvUmVsLnJlbCAmJiBwcm9SZWwucmVsLmlzX2luX3Byb2plY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbXNJblByb2plY3RbcHJvUmVsLmtleV0gPSBpdGVtc1twcm9SZWwua2V5XVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbXNJblByb2plY3Q7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuXG4gICAgICB9KVxuICAgIClcblxuICB9XG5cbiAgcGlwZUl0ZW1JblByb2plY3Q8TT4ocGtQcm9qZWN0JDogT2JzZXJ2YWJsZTxudW1iZXIgfCBzdHJpbmc+LCBnZXRGa0VudGl0eTogKGl0ZW06IE0pID0+IG51bWJlcikge1xuICAgIHJldHVybiBwaXBlKFxuICAgICAgc3dpdGNoTWFwKChpdGVtOiBNKSA9PiB7XG4gICAgICAgIGlmICghaXRlbSkgcmV0dXJuIG9mKHVuZGVmaW5lZCk7XG4gICAgICAgIHJldHVybiBwa1Byb2plY3QkLnBpcGUoXG4gICAgICAgICAgc3dpdGNoTWFwKHBrUHJvamVjdCA9PiB7XG4gICAgICAgICAgICBjb25zdCBwcm9SZWwkID0gdGhpcy5uZ1JlZHV4LnNlbGVjdDxQcm9JbmZvUHJvalJlbD4oWydwcm8nLCAnaW5mb19wcm9qX3JlbCcsICdieV9ma19wcm9qZWN0X19ma19lbnRpdHknLCBwa1Byb2plY3QgKyAnXycgKyBnZXRGa0VudGl0eShpdGVtKV0pXG4gICAgICAgICAgICByZXR1cm4gcHJvUmVsJC5waXBlKFxuICAgICAgICAgICAgICAvLyBmaWx0ZXIocHJvUmVsID0+IHByb1JlbC5pc19pbl9wcm9qZWN0ID09IHRydWUpLFxuICAgICAgICAgICAgICBtYXAoKHByb1JlbCkgPT4gcHJvUmVsICYmIHByb1JlbC5pc19pbl9wcm9qZWN0ID09IHRydWUgPyBpdGVtIDogdW5kZWZpbmVkKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgIH0pXG4gICAgKVxuICB9XG59XG5cbmNsYXNzIEluZlBlcnNpc3RlbnRJdGVtU2VsZWN0aW9ucyBleHRlbmRzIFNlbGVjdG9yIHtcbiAgcHJpdmF0ZSBfYnlfcGtfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8SW5mUGVyc2lzdGVudEl0ZW0+KCdieV9wa19lbnRpdHknKVxuICBwcml2YXRlIF9ieV9ma19jbGFzcyQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8SW5mUGVyc2lzdGVudEl0ZW0+PignYnlfZmtfY2xhc3MnKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIHBrUHJvamVjdCQsIGNvbmZpZ3MsIG1vZGVsKSB9XG5cbiAgYnlfcGtfZW50aXR5X2tleSQoa2V5OiBzdHJpbmcgfCBudW1iZXIsIG9mUHJvamVjdCA9IHRydWUpIHtcbiAgICBjb25zdCBzZWxlY3Rpb24kID0gdGhpcy5fYnlfcGtfZW50aXR5JC5rZXkoa2V5KVxuICAgIGlmIChvZlByb2plY3QpIHJldHVybiBzZWxlY3Rpb24kLnBpcGUodGhpcy5waXBlSXRlbUluUHJvamVjdCh0aGlzLnBrUHJvamVjdCQsIChpKSA9PiBpLnBrX2VudGl0eSkpXG4gICAgcmV0dXJuIHNlbGVjdGlvbiRcbiAgfVxuICBieV9wa19lbnRpdHlfYWxsJChvZlByb2plY3QgPSB0cnVlKSB7XG4gICAgY29uc3Qgc2VsZWN0aW9uJCA9IHRoaXMuX2J5X3BrX2VudGl0eSQuYWxsJFxuICAgIGlmIChvZlByb2plY3QpIHJldHVybiBzZWxlY3Rpb24kLnBpcGUodGhpcy5waXBlSXRlbXNJblByb2plY3QodGhpcy5wa1Byb2plY3QkLCAoaSkgPT4gaS5wa19lbnRpdHkpKVxuICAgIHJldHVybiBzZWxlY3Rpb24kXG4gIH1cbiAgYnlfZmtfY2xhc3Nfa2V5JChrZXk6IHN0cmluZyB8IG51bWJlciwgb2ZQcm9qZWN0ID0gdHJ1ZSkge1xuICAgIGNvbnN0IHNlbGVjdGlvbiQgPSB0aGlzLl9ieV9ma19jbGFzcyQua2V5KGtleSlcbiAgICBpZiAob2ZQcm9qZWN0KSByZXR1cm4gc2VsZWN0aW9uJC5waXBlKHRoaXMucGlwZUl0ZW1zSW5Qcm9qZWN0KHRoaXMucGtQcm9qZWN0JCwgKGkpID0+IGkucGtfZW50aXR5KSlcbiAgICByZXR1cm4gc2VsZWN0aW9uJFxuICB9XG59XG5cbmNsYXNzIEluZlRlbXBvcmFsRW50aXR5U2VsZWN0aW9ucyBleHRlbmRzIFNlbGVjdG9yIHtcbiAgcHJpdmF0ZSBfYnlfcGtfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8SW5mVGVtcG9yYWxFbnRpdHk+KCdieV9wa19lbnRpdHknKVxuICAvLyBwdWJsaWMgYnlfZmtfY2xhc3MkID0gdGhpcy5zZWxlY3RvcjxCeVBrPEluZlRlbXBvcmFsRW50aXR5Pj4oJ2J5X2ZrX2NsYXNzJylcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBwa1Byb2plY3QkOiBPYnNlcnZhYmxlPG51bWJlciB8IHN0cmluZz4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBwa1Byb2plY3QkLCBjb25maWdzLCBtb2RlbCkgfVxuXG4gIGJ5X3BrX2VudGl0eV9rZXkkKGtleTogc3RyaW5nIHwgbnVtYmVyLCBvZlByb2plY3QgPSB0cnVlKSB7XG4gICAgY29uc3Qgc2VsZWN0aW9uJCA9IHRoaXMuX2J5X3BrX2VudGl0eSQua2V5KGtleSlcbiAgICBpZiAob2ZQcm9qZWN0KSByZXR1cm4gc2VsZWN0aW9uJC5waXBlKHRoaXMucGlwZUl0ZW1JblByb2plY3QodGhpcy5wa1Byb2plY3QkLCAoaSkgPT4gaS5wa19lbnRpdHkpKVxuICAgIHJldHVybiBzZWxlY3Rpb24kXG4gIH1cbn1cblxuXG5jbGFzcyBJbmZTdGF0ZW1lbnRTZWxlY3Rpb25zIGV4dGVuZHMgU2VsZWN0b3Ige1xuXG4gIHB1YmxpYyBieV9wa19lbnRpdHkkID0gdGhpcy5zZWxlY3RvcjxJbmZTdGF0ZW1lbnQ+KCdieV9wa19lbnRpdHknKVxuICBwdWJsaWMgYnlfZmtfc3ViamVjdF9kYXRhJCA9IHRoaXMuc2VsZWN0b3I8QnlQazxJbmZTdGF0ZW1lbnQ+PignYnlfZmtfc3ViamVjdF9kYXRhJylcblxuICBwdWJsaWMgcGFnaW5hdGlvbiQgPSB0aGlzLnBhZ2luYXRpb25TZWxlY3RvcjxudW1iZXI+KClcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBwa1Byb2plY3QkOiBPYnNlcnZhYmxlPG51bWJlciB8IHN0cmluZz4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBwa1Byb2plY3QkLCBjb25maWdzLCBtb2RlbCkgfVxuXG4gIGJ5X3BrX2VudGl0eV9rZXkkKGtleTogc3RyaW5nIHwgbnVtYmVyLCBvZlByb2plY3QgPSB0cnVlKSB7XG4gICAgY29uc3Qgc2VsZWN0aW9uJCA9IHRoaXMuYnlfcGtfZW50aXR5JC5rZXkoa2V5KVxuICAgIGlmIChvZlByb2plY3QpIHJldHVybiBzZWxlY3Rpb24kLnBpcGUodGhpcy5waXBlSXRlbUluUHJvamVjdCh0aGlzLnBrUHJvamVjdCQsIChpKSA9PiBpLnBrX2VudGl0eSkpXG4gICAgcmV0dXJuIHNlbGVjdGlvbiRcbiAgfVxuXG4gIGJ5X3N1YmplY3QkKGZvcmVpZ25LZXlzOiBJbmRleFN0YXRlbWVudEJ5U3ViamVjdCwgb2ZQcm9qZWN0ID0gdHJ1ZSk6IE9ic2VydmFibGU8SW5mU3RhdGVtZW50W10+IHtcbiAgICBjb25zdCBrZXkgPSBpbmRleFN0YXRlbWVudEJ5U3ViamVjdChmb3JlaWduS2V5cyk7XG4gICAgY29uc3Qgc2VsZWN0aW9uJCA9IHRoaXMuc2VsZWN0b3I8QnlQazxJbmZTdGF0ZW1lbnQ+PignYnlfc3ViamVjdCcpLmtleShrZXkpXG4gICAgaWYgKG9mUHJvamVjdCkge1xuICAgICAgcmV0dXJuIHNlbGVjdGlvbiQucGlwZShcbiAgICAgICAgdGhpcy5waXBlSXRlbXNJblByb2plY3QodGhpcy5wa1Byb2plY3QkLCAoaXRlbSkgPT4gaXRlbS5wa19lbnRpdHkpLFxuICAgICAgICBtYXAoaXRlbXMgPT4gdmFsdWVzKGl0ZW1zKSlcbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIHNlbGVjdGlvbiQucGlwZShcbiAgICAgIG1hcChpdGVtcyA9PiB2YWx1ZXMoaXRlbXMpKVxuICAgICk7XG4gIH1cblxuICBieV9zdWJqZWN0X2FuZF9wcm9wZXJ0eSQoZm9yZWlnbktleXM6IEluZGV4U3RhdGVtZW50QnlTdWJqZWN0UHJvcGVydHksIG9mUHJvamVjdCA9IHRydWUpOiBPYnNlcnZhYmxlPEluZlN0YXRlbWVudFtdPiB7XG4gICAgcmV0dXJuIHRoaXMuYnlfc3ViamVjdF9hbmRfcHJvcGVydHlfaW5kZXhlZCQoZm9yZWlnbktleXMsIG9mUHJvamVjdCkucGlwZShcbiAgICAgIG1hcChzdGF0ZW1lbnRJZHggPT4gdmFsdWVzKHN0YXRlbWVudElkeCkpXG4gICAgKVxuICB9XG4gIGJ5X3N1YmplY3RfYW5kX3Byb3BlcnR5X2luZGV4ZWQkKGZvcmVpZ25LZXlzOiBJbmRleFN0YXRlbWVudEJ5U3ViamVjdFByb3BlcnR5LCBvZlByb2plY3QgPSB0cnVlKTogT2JzZXJ2YWJsZTxCeVBrPEluZlN0YXRlbWVudD4+IHtcbiAgICBjb25zdCBrZXkgPSBpbmRleFN0YXRlbWVudEJ5U3ViamVjdFByb3BlcnR5KGZvcmVpZ25LZXlzKTtcbiAgICBjb25zdCBzZWxlY3Rpb24kID0gdGhpcy5zZWxlY3RvcjxCeVBrPEluZlN0YXRlbWVudD4+KCdieV9zdWJqZWN0K3Byb3BlcnR5Jykua2V5KGtleSlcbiAgICBpZiAob2ZQcm9qZWN0KSB7XG4gICAgICByZXR1cm4gc2VsZWN0aW9uJC5waXBlKHRoaXMucGlwZUl0ZW1zSW5Qcm9qZWN0KHRoaXMucGtQcm9qZWN0JCwgKGl0ZW0pID0+IGl0ZW0ucGtfZW50aXR5KSlcbiAgICB9XG4gICAgcmV0dXJuIHNlbGVjdGlvbiRcbiAgfVxuXG4gIGJ5X29iamVjdCQoZm9yZWlnbktleXM6IEluZGV4U3RhdGVtZW50QnlPYmplY3QsIG9mUHJvamVjdCA9IHRydWUpOiBPYnNlcnZhYmxlPEluZlN0YXRlbWVudFtdPiB7XG4gICAgY29uc3Qga2V5ID0gaW5kZXhTdGF0ZW1lbnRCeU9iamVjdChmb3JlaWduS2V5cyk7XG4gICAgY29uc3Qgc2VsZWN0aW9uJCA9IHRoaXMuc2VsZWN0b3I8QnlQazxJbmZTdGF0ZW1lbnQ+PignYnlfb2JqZWN0Jykua2V5KGtleSlcbiAgICBpZiAob2ZQcm9qZWN0KSB7XG4gICAgICByZXR1cm4gc2VsZWN0aW9uJC5waXBlKFxuICAgICAgICB0aGlzLnBpcGVJdGVtc0luUHJvamVjdCh0aGlzLnBrUHJvamVjdCQsIChpdGVtKSA9PiBpdGVtLnBrX2VudGl0eSksXG4gICAgICAgIG1hcChpdGVtcyA9PiB2YWx1ZXMoaXRlbXMpKVxuICAgICAgKVxuICAgIH1cbiAgICByZXR1cm4gc2VsZWN0aW9uJC5waXBlKFxuICAgICAgbWFwKGl0ZW1zID0+IHZhbHVlcyhpdGVtcykpXG4gICAgKTtcbiAgfVxuXG4gIGJ5X29iamVjdF9hbmRfcHJvcGVydHkkKGZvcmVpZ25LZXlzOiBJbmRleFN0YXRlbWVudEJ5T2JqZWN0UHJvcGVydHksIG9mUHJvamVjdCA9IHRydWUpOiBPYnNlcnZhYmxlPEluZlN0YXRlbWVudFtdPiB7XG4gICAgcmV0dXJuIHRoaXMuYnlfb2JqZWN0X2FuZF9wcm9wZXJ0eV9pbmRleGVkJChmb3JlaWduS2V5cywgb2ZQcm9qZWN0KS5waXBlKFxuICAgICAgbWFwKHN0YXRlbWVudElkeCA9PiB2YWx1ZXMoc3RhdGVtZW50SWR4KSlcbiAgICApXG4gIH1cblxuICBieV9vYmplY3RfYW5kX3Byb3BlcnR5X2luZGV4ZWQkKGZvcmVpZ25LZXlzOiBJbmRleFN0YXRlbWVudEJ5T2JqZWN0UHJvcGVydHksIG9mUHJvamVjdCA9IHRydWUpOiBPYnNlcnZhYmxlPEJ5UGs8SW5mU3RhdGVtZW50Pj4ge1xuICAgIGNvbnN0IGtleSA9IGluZGV4U3RhdGVtZW50QnlPYmplY3RQcm9wZXJ0eShmb3JlaWduS2V5cyk7XG4gICAgY29uc3Qgc2VsZWN0aW9uJCA9IHRoaXMuc2VsZWN0b3I8QnlQazxJbmZTdGF0ZW1lbnQ+PignYnlfb2JqZWN0K3Byb3BlcnR5Jykua2V5KGtleSlcbiAgICBpZiAob2ZQcm9qZWN0KSB7XG4gICAgICByZXR1cm4gc2VsZWN0aW9uJC5waXBlKFxuICAgICAgICB0aGlzLnBpcGVJdGVtc0luUHJvamVjdCh0aGlzLnBrUHJvamVjdCQsIChpdGVtKSA9PiBpdGVtLnBrX2VudGl0eSksXG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiBzZWxlY3Rpb24kXG4gIH1cblxufVxuXG5cbmNsYXNzIEluZlRleHRQcm9wZXJ0eVNlbGVjdGlvbnMgZXh0ZW5kcyBTZWxlY3RvciB7XG4gIHByaXZhdGUgX2J5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPEluZlRleHRQcm9wZXJ0eT4oJ2J5X3BrX2VudGl0eScpXG4gIHByaXZhdGUgX2J5X2ZrX2NvbmNlcm5lZF9lbnRpdHlfX2ZrX2NsYXNzX2ZpZWxkJCA9IHRoaXMuc2VsZWN0b3I8QnlQazxJbmZUZXh0UHJvcGVydHk+PignYnlfZmtfY29uY2VybmVkX2VudGl0eV9fZmtfY2xhc3NfZmllbGQnKVxuICBwcml2YXRlIF9ieV9ma19jb25jZXJuZWRfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8QnlQazxJbmZUZXh0UHJvcGVydHk+PignYnlfZmtfY29uY2VybmVkX2VudGl0eScpXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgcGtQcm9qZWN0JDogT2JzZXJ2YWJsZTxudW1iZXIgfCBzdHJpbmc+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuICApIHsgc3VwZXIobmdSZWR1eCwgcGtQcm9qZWN0JCwgY29uZmlncywgbW9kZWwpIH1cblxuICBieV9wa19lbnRpdHlfa2V5JChrZXk6IHN0cmluZyB8IG51bWJlciwgb2ZQcm9qZWN0ID0gdHJ1ZSkge1xuICAgIGNvbnN0IHNlbGVjdGlvbiQgPSB0aGlzLl9ieV9wa19lbnRpdHkkLmtleShrZXkpXG4gICAgaWYgKG9mUHJvamVjdCkgcmV0dXJuIHNlbGVjdGlvbiQucGlwZSh0aGlzLnBpcGVJdGVtSW5Qcm9qZWN0KHRoaXMucGtQcm9qZWN0JCwgKGkpID0+IGkucGtfZW50aXR5KSlcbiAgICByZXR1cm4gc2VsZWN0aW9uJFxuICB9XG5cbiAgYnlfZmtfY29uY2VybmVkX2VudGl0eV9fZmtfY2xhc3NfZmllbGRfaW5kZXhlZCQoa2V5OiBzdHJpbmcsIG9mUHJvamVjdCA9IHRydWUpOiBPYnNlcnZhYmxlPEJ5UGs8SW5mVGV4dFByb3BlcnR5Pj4ge1xuICAgIGNvbnN0IHNlbGVjdGlvbiQgPSB0aGlzLl9ieV9ma19jb25jZXJuZWRfZW50aXR5X19ma19jbGFzc19maWVsZCQua2V5KGtleSlcbiAgICBpZiAob2ZQcm9qZWN0KSB7XG4gICAgICByZXR1cm4gc2VsZWN0aW9uJC5waXBlKFxuICAgICAgICB0aGlzLnBpcGVJdGVtc0luUHJvamVjdCh0aGlzLnBrUHJvamVjdCQsIChpdGVtKSA9PiBpdGVtLnBrX2VudGl0eSksXG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiBzZWxlY3Rpb24kXG4gIH1cblxuXG4gIGJ5X2ZrX2NvbmNlcm5lZF9lbnRpdHlfaW5kZXhlZCQoa2V5OiBzdHJpbmcgfCBudW1iZXIsIG9mUHJvamVjdCA9IHRydWUpOiBPYnNlcnZhYmxlPEJ5UGs8SW5mVGV4dFByb3BlcnR5Pj4ge1xuICAgIGNvbnN0IHNlbGVjdGlvbiQgPSB0aGlzLl9ieV9ma19jb25jZXJuZWRfZW50aXR5JC5rZXkoa2V5KVxuICAgIGlmIChvZlByb2plY3QpIHtcbiAgICAgIHJldHVybiBzZWxlY3Rpb24kLnBpcGUoXG4gICAgICAgIHRoaXMucGlwZUl0ZW1zSW5Qcm9qZWN0KHRoaXMucGtQcm9qZWN0JCwgKGl0ZW0pID0+IGl0ZW0ucGtfZW50aXR5KSxcbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIHNlbGVjdGlvbiRcbiAgfVxuXG59XG5cblxuY2xhc3MgSW5mQXBwZWxsYXRpb25TZWxlY3Rpb25zIGV4dGVuZHMgU2VsZWN0b3Ige1xuICBwdWJsaWMgYnlfcGtfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8SW5mQXBwZWxsYXRpb24+KCdieV9wa19lbnRpdHknKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIHBrUHJvamVjdCQsIGNvbmZpZ3MsIG1vZGVsKSB9XG59XG5cbmNsYXNzIEluZkxhbmdTdHJpbmdTZWxlY3Rpb25zIGV4dGVuZHMgU2VsZWN0b3Ige1xuICBwdWJsaWMgYnlfcGtfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8SW5mTGFuZ1N0cmluZz4oJ2J5X3BrX2VudGl0eScpXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgcGtQcm9qZWN0JDogT2JzZXJ2YWJsZTxudW1iZXIgfCBzdHJpbmc+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuICApIHsgc3VwZXIobmdSZWR1eCwgcGtQcm9qZWN0JCwgY29uZmlncywgbW9kZWwpIH1cbn1cblxuY2xhc3MgSW5mUGxhY2VTZWxlY3Rpb25zIGV4dGVuZHMgU2VsZWN0b3Ige1xuICBwdWJsaWMgYnlfcGtfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8SW5mUGxhY2U+KCdieV9wa19lbnRpdHknKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIHBrUHJvamVjdCQsIGNvbmZpZ3MsIG1vZGVsKSB9XG59XG5cbmNsYXNzIEluZlRpbWVQcmltaXRpdmVTZWxlY3Rpb25zIGV4dGVuZHMgU2VsZWN0b3Ige1xuICBwdWJsaWMgYnlfcGtfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8SW5mVGltZVByaW1pdGl2ZT4oJ2J5X3BrX2VudGl0eScpXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgcGtQcm9qZWN0JDogT2JzZXJ2YWJsZTxudW1iZXIgfCBzdHJpbmc+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuICApIHsgc3VwZXIobmdSZWR1eCwgcGtQcm9qZWN0JCwgY29uZmlncywgbW9kZWwpIH1cbn1cblxuY2xhc3MgSW5mTGFuZ3VhZ2VTZWxlY3Rpb25zIGV4dGVuZHMgU2VsZWN0b3Ige1xuICBwdWJsaWMgYnlfcGtfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8SW5mTGFuZ3VhZ2U+KCdieV9wa19lbnRpdHknKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIHBrUHJvamVjdCQsIGNvbmZpZ3MsIG1vZGVsKSB9XG59XG5cbmNsYXNzIEluZkRpbWVuc2lvblNlbGVjdGlvbnMgZXh0ZW5kcyBTZWxlY3RvciB7XG4gIHB1YmxpYyBieV9wa19lbnRpdHkkID0gdGhpcy5zZWxlY3RvcjxJbmZEaW1lbnNpb24+KCdieV9wa19lbnRpdHknKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIHBrUHJvamVjdCQsIGNvbmZpZ3MsIG1vZGVsKSB9XG59XG5cbmV4cG9ydCBjbGFzcyBJbmZTZWxlY3RvciB7XG5cbiAgcGVyc2lzdGVudF9pdGVtJCA9IG5ldyBJbmZQZXJzaXN0ZW50SXRlbVNlbGVjdGlvbnModGhpcy5uZ1JlZHV4LCB0aGlzLnBrUHJvamVjdCQsIGluZkRlZmluaXRpb25zLCAncGVyc2lzdGVudF9pdGVtJyk7XG4gIHRlbXBvcmFsX2VudGl0eSQgPSBuZXcgSW5mVGVtcG9yYWxFbnRpdHlTZWxlY3Rpb25zKHRoaXMubmdSZWR1eCwgdGhpcy5wa1Byb2plY3QkLCBpbmZEZWZpbml0aW9ucywgJ3RlbXBvcmFsX2VudGl0eScpO1xuICBzdGF0ZW1lbnQkID0gbmV3IEluZlN0YXRlbWVudFNlbGVjdGlvbnModGhpcy5uZ1JlZHV4LCB0aGlzLnBrUHJvamVjdCQsIGluZkRlZmluaXRpb25zLCAnc3RhdGVtZW50Jyk7XG4gIGFwcGVsbGF0aW9uJCA9IG5ldyBJbmZBcHBlbGxhdGlvblNlbGVjdGlvbnModGhpcy5uZ1JlZHV4LCB0aGlzLnBrUHJvamVjdCQsIGluZkRlZmluaXRpb25zLCAnYXBwZWxsYXRpb24nKTtcbiAgcGxhY2UkID0gbmV3IEluZlBsYWNlU2VsZWN0aW9ucyh0aGlzLm5nUmVkdXgsIHRoaXMucGtQcm9qZWN0JCwgaW5mRGVmaW5pdGlvbnMsICdwbGFjZScpO1xuICB0ZXh0X3Byb3BlcnR5JCA9IG5ldyBJbmZUZXh0UHJvcGVydHlTZWxlY3Rpb25zKHRoaXMubmdSZWR1eCwgdGhpcy5wa1Byb2plY3QkLCBpbmZEZWZpbml0aW9ucywgJ3RleHRfcHJvcGVydHknKTtcbiAgbGFuZ19zdHJpbmckID0gbmV3IEluZkxhbmdTdHJpbmdTZWxlY3Rpb25zKHRoaXMubmdSZWR1eCwgdGhpcy5wa1Byb2plY3QkLCBpbmZEZWZpbml0aW9ucywgJ2xhbmdfc3RyaW5nJyk7XG4gIHRpbWVfcHJpbWl0aXZlJCA9IG5ldyBJbmZUaW1lUHJpbWl0aXZlU2VsZWN0aW9ucyh0aGlzLm5nUmVkdXgsIHRoaXMucGtQcm9qZWN0JCwgaW5mRGVmaW5pdGlvbnMsICd0aW1lX3ByaW1pdGl2ZScpO1xuICBsYW5ndWFnZSQgPSBuZXcgSW5mTGFuZ3VhZ2VTZWxlY3Rpb25zKHRoaXMubmdSZWR1eCwgdGhpcy5wa1Byb2plY3QkLCBpbmZEZWZpbml0aW9ucywgJ2xhbmd1YWdlJyk7XG4gIGRpbWVuc2lvbiQgPSBuZXcgSW5mRGltZW5zaW9uU2VsZWN0aW9ucyh0aGlzLm5nUmVkdXgsIHRoaXMucGtQcm9qZWN0JCwgaW5mRGVmaW5pdGlvbnMsICdkaW1lbnNpb24nKTtcblxuICBwa0VudGl0eU1vZGVsTWFwJCA9IHRoaXMubmdSZWR1eC5zZWxlY3QoW2luZlJvb3QsIFBSX0VOVElUWV9NT0RFTF9NQVBdKTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LCBwdWJsaWMgcGtQcm9qZWN0JDogT2JzZXJ2YWJsZTxudW1iZXIgfCBzdHJpbmc+KSB7IH1cblxuICBnZXRNb2RlbE9mRW50aXR5JChwa0VudGl0eTogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHRoaXMubmdSZWR1eC5zZWxlY3Q8RW50aXR5TW9kZWxBbmRDbGFzczxJbmZNb2RlbE5hbWU+PihbaW5mUm9vdCwgUFJfRU5USVRZX01PREVMX01BUCwgcGtFbnRpdHldKTtcbiAgfVxufVxuIl19