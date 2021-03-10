/**
 * @fileoverview added by tsickle
 * Generated from: selectors/inf.service.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXF1ZXJpZXMvc3JjL2xpYi9xdWVyaWVzLyIsInNvdXJjZXMiOlsic2VsZWN0b3JzL2luZi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUE2QixTQUFTLEVBQXFDLHNCQUFzQixFQUFrQyw4QkFBOEIsRUFBMkIsdUJBQXVCLEVBQW1DLCtCQUErQixFQUFFLGNBQWMsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLG1CQUFtQixFQUEyQixrQkFBa0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBR2phLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzNELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFDNUIsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUMvQixPQUFPLEVBQWMsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM1QyxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRzdFLE1BQU0sUUFBUTs7Ozs7OztJQUNaLFlBQ1MsT0FBMkIsRUFDM0IsVUFBdUMsRUFDdkMsT0FBZ0MsRUFDaEMsS0FBYTtRQUhiLFlBQU8sR0FBUCxPQUFPLENBQW9CO1FBQzNCLGVBQVUsR0FBVixVQUFVLENBQTZCO1FBQ3ZDLFlBQU8sR0FBUCxPQUFPLENBQXlCO1FBQ2hDLFVBQUssR0FBTCxLQUFLLENBQVE7SUFDbEIsQ0FBQzs7Ozs7O0lBRUwsUUFBUSxDQUFJLFFBQWdCOztjQUVwQixJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQVUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQzs7Y0FDcEUsR0FBRzs7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QUNsSCxjQUFTLEdBQUcsSUFBSSxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsY0FBYyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ2pHLGVBQVUsR0FBRyxJQUFJLHNCQUFzQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxjQUFjLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFFcEcsc0JBQWlCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO0lBRTBCLENBQUM7Ozs7O0lBRW5HLGlCQUFpQixDQUFDLFFBQWdCO1FBQ2hDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQW9DLENBQUMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDMUcsQ0FBQztDQUNGOzs7SUFsQkMsdUNBQXFIOztJQUNySCx1Q0FBcUg7O0lBQ3JILGlDQUFvRzs7SUFDcEcsbUNBQTBHOztJQUMxRyw2QkFBd0Y7O0lBQ3hGLHFDQUErRzs7SUFDL0csbUNBQXlHOztJQUN6RyxzQ0FBa0g7O0lBQ2xILGdDQUFpRzs7SUFDakcsaUNBQW9HOztJQUVwRyx3Q0FBd0U7O0lBRTVELDhCQUFrQzs7SUFBRSxpQ0FBOEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ1JlZHV4IH0gZnJvbSAnQGFuZ3VsYXItcmVkdXgvc3RvcmUnO1xuaW1wb3J0IHsgQnlQaywgRW50aXR5TW9kZWxBbmRDbGFzcywgZ2V0RnJvbVRvLCBJQXBwU3RhdGUsIEluZGV4U3RhdGVtZW50QnlPYmplY3QsIGluZGV4U3RhdGVtZW50QnlPYmplY3QsIEluZGV4U3RhdGVtZW50QnlPYmplY3RQcm9wZXJ0eSwgaW5kZXhTdGF0ZW1lbnRCeU9iamVjdFByb3BlcnR5LCBJbmRleFN0YXRlbWVudEJ5U3ViamVjdCwgaW5kZXhTdGF0ZW1lbnRCeVN1YmplY3QsIEluZGV4U3RhdGVtZW50QnlTdWJqZWN0UHJvcGVydHksIGluZGV4U3RhdGVtZW50QnlTdWJqZWN0UHJvcGVydHksIGluZkRlZmluaXRpb25zLCBpbmZSb290LCBwYWdpbmF0ZUJ5LCBQUl9FTlRJVFlfTU9ERUxfTUFQLCBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbiwgc3ViZmllbGRJZFRvU3RyaW5nIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1yZWR1eCc7XG5pbXBvcnQgeyBJbmZBcHBlbGxhdGlvbiwgSW5mRGltZW5zaW9uLCBJbmZMYW5nU3RyaW5nLCBJbmZMYW5ndWFnZSwgSW5mUGVyc2lzdGVudEl0ZW0sIEluZlBsYWNlLCBJbmZTdGF0ZW1lbnQsIEluZlRlbXBvcmFsRW50aXR5LCBJbmZUZXh0UHJvcGVydHksIEluZlRpbWVQcmltaXRpdmUsIFByb0luZm9Qcm9qUmVsIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcbmltcG9ydCB7IEd2U3ViZmllbGRJZCwgR3ZTdWJmaWVsZFBhZ2UgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgY29tYmluZUxhdGVzdE9yRW1wdHkgfSBmcm9tICdAa2xlaW9sYWIvbGliLXV0aWxzJztcbmltcG9ydCB7IHZhbHVlcyB9IGZyb20gJ2QzJztcbmltcG9ydCB7IGVxdWFscyB9IGZyb20gJ3JhbWRhJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mLCBwaXBlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIGZpcnN0LCBtYXAsIHN3aXRjaE1hcCwgdGhyb3R0bGVUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuZXhwb3J0IHR5cGUgSW5mTW9kZWxOYW1lID0gJ3BlcnNpc3RlbnRfaXRlbScgfCAndGVtcG9yYWxfZW50aXR5JyB8ICdzdGF0ZW1lbnQnIHwgJ3RleHRfcHJvcGVydHknIHwgJ2FwcGVsbGF0aW9uJyB8ICdsYW5ndWFnZScgfCAncGxhY2UnIHwgJ2RpbWVuc2lvbicgfCAnbGFuZ19zdHJpbmcnIHwgJ3RpbWVfcHJpbWl0aXZlJztcblxuY2xhc3MgU2VsZWN0b3Ige1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBwa1Byb2plY3QkOiBPYnNlcnZhYmxlPG51bWJlciB8IHN0cmluZz4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyB9XG5cbiAgc2VsZWN0b3I8TT4oaW5kZXhLZXk6IHN0cmluZyk6IHsgYWxsJDogT2JzZXJ2YWJsZTxCeVBrPE0+Piwga2V5OiAoeCkgPT4gT2JzZXJ2YWJsZTxNPiB9IHtcblxuICAgIGNvbnN0IGFsbCQgPSB0aGlzLm5nUmVkdXguc2VsZWN0PEJ5UGs8TT4+KFtpbmZSb290LCB0aGlzLm1vZGVsLCBpbmRleEtleV0pXG4gICAgY29uc3Qga2V5ID0gKHgpOiBPYnNlcnZhYmxlPE0+ID0+IHtcbiAgICAgIC8vIFJFTUFSSzogJ2VxdWFscycgY29tcGFyYXRvciBpcyB2ZXJ5IHZlcnkgaW1wb3J0YW50IGZvciBwZXJmb3JtYW5jZSAhXG4gICAgICByZXR1cm4gdGhpcy5uZ1JlZHV4LnNlbGVjdDxNPihbaW5mUm9vdCwgdGhpcy5tb2RlbCwgaW5kZXhLZXksIHhdLCBlcXVhbHMpXG4gICAgfVxuICAgIHJldHVybiB7IGFsbCQsIGtleSB9XG4gIH1cblxuICBwYWdpbmF0aW9uU2VsZWN0b3I8TT4oKSB7XG5cbiAgICBjb25zdCBwaXBlUGFnZSA9IChwYWdlOiBHdlN1YmZpZWxkUGFnZSk6IE9ic2VydmFibGU8TVtdPiA9PiB7XG4gICAgICBsZXQgcGF0aDogYW55W107XG4gICAgICBjb25zdCBwYWdCeSA9IHBhZ2luYXRlQnlcbiAgICAgIGNvbnN0IGtleSA9IHN1YmZpZWxkSWRUb1N0cmluZyhwYWdlKVxuICAgICAgcGF0aCA9IFtpbmZSb290LCB0aGlzLm1vZGVsLCBwYWdCeSwga2V5XTtcbiAgICAgIHJldHVybiB0aGlzLm5nUmVkdXguc2VsZWN0PG51bWJlcj4oWy4uLnBhdGgsICdjb3VudCddKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBmaWx0ZXIoY291bnQgPT4gY291bnQgIT09IHVuZGVmaW5lZCksXG4gICAgICAgICAgc3dpdGNoTWFwKGNvdW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gcGFnZS5vZmZzZXQ7XG4gICAgICAgICAgICBjb25zdCBlbmQgPSBjb3VudCA8PSAoc3RhcnQgKyBwYWdlLmxpbWl0KSA/IGNvdW50IDogKHN0YXJ0ICsgcGFnZS5saW1pdCk7XG4gICAgICAgICAgICBjb25zdCBvYnMkOiBPYnNlcnZhYmxlPE0+W10gPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgICAgICAgICAgIG9icyQucHVzaChcbiAgICAgICAgICAgICAgICB0aGlzLm5nUmVkdXguc2VsZWN0PE0+KFsuLi5wYXRoLCAncm93cycsIGldKS5waXBlKGZpbHRlcih4ID0+ICEheCkpXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0T3JFbXB0eShvYnMkKVxuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICB9XG5cblxuICAgIGNvbnN0IHBpcGVQYWdlTG9hZE5lZWRlZCA9IChwYWdlOiBHdlN1YmZpZWxkUGFnZSwgdHJpZ2dlciQ6IE9ic2VydmFibGU8YW55Pik6IE9ic2VydmFibGU8Ym9vbGVhbj4gPT4ge1xuICAgICAgbGV0IHBhdGg6IGFueVtdO1xuICAgICAgY29uc3QgcGFnQnkgPSBwYWdpbmF0ZUJ5XG4gICAgICBjb25zdCBrZXkgPSBzdWJmaWVsZElkVG9TdHJpbmcocGFnZSlcblxuICAgICAgcGF0aCA9IFtpbmZSb290LCB0aGlzLm1vZGVsLCBwYWdCeSwga2V5XTtcbiAgICAgIGNvbnN0IGZyb21Ub1N0cmluZyA9IGdldEZyb21UbyhwYWdlLmxpbWl0LCBwYWdlLm9mZnNldClcbiAgICAgIC8vIHJldHVybiB0aGlzLm5nUmVkdXguc2VsZWN0PGJvb2xlYW4+KFsuLi5wYXRoLCAnbG9hZGluZycsIGZyb21Ub1N0cmluZ10pXG4gICAgICAvLyAgIC5waXBlKFxuICAgICAgLy8gICAgIC8vIG1hcChsb2FkaW5nID0+ICFsb2FkaW5nKSxcbiAgICAgIC8vICAgICBzd2l0Y2hNYXAoKGxvYWRpbmcpID0+IHtcbiAgICAgIC8vICAgICAgIGlmIChsb2FkaW5nKSByZXR1cm4gb2YoZmFsc2UpXG4gICAgICAvLyAgICAgICBlbHNlIHJldHVybiB0cmlnZ2VyJC5waXBlKG1hcFRvKHRydWUpKVxuICAgICAgLy8gICAgIH0pLFxuICAgICAgLy8gICAgIC8vIGZpcnN0KCksXG4gICAgICAvLyAgIClcblxuICAgICAgcmV0dXJuIHRyaWdnZXIkLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PiB0aGlzLm5nUmVkdXguc2VsZWN0PGJvb2xlYW4+KFsuLi5wYXRoLCAnbG9hZGluZycsIGZyb21Ub1N0cmluZ10pXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBmaXJzdCgpLFxuICAgICAgICAgICAgbWFwKGxvYWRpbmcgPT4gIWxvYWRpbmcpXG4gICAgICAgICAgKVxuICAgICAgICApKVxuXG4gICAgfVxuXG5cbiAgICBjb25zdCBwaXBlQ291bnQgPSAocGFnZTogR3ZTdWJmaWVsZElkKTogT2JzZXJ2YWJsZTxudW1iZXIgfCB1bmRlZmluZWQ+ID0+IHtcbiAgICAgIGxldCBwYXRoOiBhbnlbXTtcbiAgICAgIGNvbnN0IHBhZ0J5ID0gcGFnaW5hdGVCeVxuICAgICAgY29uc3Qga2V5ID0gc3ViZmllbGRJZFRvU3RyaW5nKHBhZ2UpXG5cbiAgICAgIHBhdGggPSBbaW5mUm9vdCwgdGhpcy5tb2RlbCwgcGFnQnksIGtleV07XG4gICAgICByZXR1cm4gdGhpcy5uZ1JlZHV4LnNlbGVjdDxudW1iZXI+KFsuLi5wYXRoLCAnY291bnQnXSlcbiAgICB9XG5cblxuICAgIHJldHVybiB7IHBpcGVQYWdlLCBwaXBlQ291bnQsIHBpcGVQYWdlTG9hZE5lZWRlZCB9XG5cbiAgfVxuXG5cbiAgcGlwZUl0ZW1zSW5Qcm9qZWN0PE0+KHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPiwgZ2V0RmtFbnRpdHk6IChpdGVtOiBNKSA9PiBudW1iZXIpIHtcblxuICAgIHJldHVybiBwaXBlKFxuICAgICAgc3dpdGNoTWFwKChpdGVtczogQnlQazxNPikgPT4ge1xuICAgICAgICByZXR1cm4gcGtQcm9qZWN0JC5waXBlKFxuICAgICAgICAgIHN3aXRjaE1hcChwa1Byb2plY3QgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJvUmVsc0FuZEtleSQ6IE9ic2VydmFibGU8eyBrZXk6IHN0cmluZywgcmVsOiBQcm9JbmZvUHJvalJlbCB9PltdID0gW107XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGsgaW4gaXRlbXMpIHtcbiAgICAgICAgICAgICAgaWYgKGl0ZW1zLmhhc093blByb3BlcnR5KGspKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IGl0ZW1zW2tdO1xuICAgICAgICAgICAgICAgIHByb1JlbHNBbmRLZXkkLnB1c2goXG4gICAgICAgICAgICAgICAgICB0aGlzLm5nUmVkdXguc2VsZWN0PFByb0luZm9Qcm9qUmVsPihbJ3BybycsICdpbmZvX3Byb2pfcmVsJywgJ2J5X2ZrX3Byb2plY3RfX2ZrX2VudGl0eScsIHBrUHJvamVjdCArICdfJyArIGdldEZrRW50aXR5KGl0ZW0pXSlcbiAgICAgICAgICAgICAgICAgICAgLnBpcGUobWFwKHJlbCA9PiAoeyBrZXk6IGssIHJlbCB9KSkpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdE9yRW1wdHkocHJvUmVsc0FuZEtleSQpLnBpcGUoXG4gICAgICAgICAgICAgIHRocm90dGxlVGltZSgwKSxcbiAgICAgICAgICAgICAgbWFwKHByb1JlbHMgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1zSW5Qcm9qZWN0OiBCeVBrPE0+ID0ge307XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9SZWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBwcm9SZWwgPSBwcm9SZWxzW2ldO1xuICAgICAgICAgICAgICAgICAgaWYgKHByb1JlbC5yZWwgJiYgcHJvUmVsLnJlbC5pc19pbl9wcm9qZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zSW5Qcm9qZWN0W3Byb1JlbC5rZXldID0gaXRlbXNbcHJvUmVsLmtleV1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW1zSW5Qcm9qZWN0O1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0pXG4gICAgICAgIClcblxuICAgICAgfSlcbiAgICApXG5cbiAgfVxuXG4gIHBpcGVJdGVtSW5Qcm9qZWN0PE0+KHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPiwgZ2V0RmtFbnRpdHk6IChpdGVtOiBNKSA9PiBudW1iZXIpIHtcbiAgICByZXR1cm4gcGlwZShcbiAgICAgIHN3aXRjaE1hcCgoaXRlbTogTSkgPT4ge1xuICAgICAgICBpZiAoIWl0ZW0pIHJldHVybiBvZih1bmRlZmluZWQpO1xuICAgICAgICByZXR1cm4gcGtQcm9qZWN0JC5waXBlKFxuICAgICAgICAgIHN3aXRjaE1hcChwa1Byb2plY3QgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJvUmVsJCA9IHRoaXMubmdSZWR1eC5zZWxlY3Q8UHJvSW5mb1Byb2pSZWw+KFsncHJvJywgJ2luZm9fcHJval9yZWwnLCAnYnlfZmtfcHJvamVjdF9fZmtfZW50aXR5JywgcGtQcm9qZWN0ICsgJ18nICsgZ2V0RmtFbnRpdHkoaXRlbSldKVxuICAgICAgICAgICAgcmV0dXJuIHByb1JlbCQucGlwZShcbiAgICAgICAgICAgICAgLy8gZmlsdGVyKHByb1JlbCA9PiBwcm9SZWwuaXNfaW5fcHJvamVjdCA9PSB0cnVlKSxcbiAgICAgICAgICAgICAgbWFwKChwcm9SZWwpID0+IHByb1JlbCAmJiBwcm9SZWwuaXNfaW5fcHJvamVjdCA9PSB0cnVlID8gaXRlbSA6IHVuZGVmaW5lZClcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICB9KVxuICAgIClcbiAgfVxufVxuXG5jbGFzcyBJbmZQZXJzaXN0ZW50SXRlbVNlbGVjdGlvbnMgZXh0ZW5kcyBTZWxlY3RvciB7XG4gIHByaXZhdGUgX2J5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPEluZlBlcnNpc3RlbnRJdGVtPignYnlfcGtfZW50aXR5JylcbiAgcHJpdmF0ZSBfYnlfZmtfY2xhc3MkID0gdGhpcy5zZWxlY3RvcjxCeVBrPEluZlBlcnNpc3RlbnRJdGVtPj4oJ2J5X2ZrX2NsYXNzJylcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBwa1Byb2plY3QkOiBPYnNlcnZhYmxlPG51bWJlciB8IHN0cmluZz4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBwa1Byb2plY3QkLCBjb25maWdzLCBtb2RlbCkgfVxuXG4gIGJ5X3BrX2VudGl0eV9rZXkkKGtleTogc3RyaW5nIHwgbnVtYmVyLCBvZlByb2plY3QgPSB0cnVlKSB7XG4gICAgY29uc3Qgc2VsZWN0aW9uJCA9IHRoaXMuX2J5X3BrX2VudGl0eSQua2V5KGtleSlcbiAgICBpZiAob2ZQcm9qZWN0KSByZXR1cm4gc2VsZWN0aW9uJC5waXBlKHRoaXMucGlwZUl0ZW1JblByb2plY3QodGhpcy5wa1Byb2plY3QkLCAoaSkgPT4gaS5wa19lbnRpdHkpKVxuICAgIHJldHVybiBzZWxlY3Rpb24kXG4gIH1cbiAgYnlfcGtfZW50aXR5X2FsbCQob2ZQcm9qZWN0ID0gdHJ1ZSkge1xuICAgIGNvbnN0IHNlbGVjdGlvbiQgPSB0aGlzLl9ieV9wa19lbnRpdHkkLmFsbCRcbiAgICBpZiAob2ZQcm9qZWN0KSByZXR1cm4gc2VsZWN0aW9uJC5waXBlKHRoaXMucGlwZUl0ZW1zSW5Qcm9qZWN0KHRoaXMucGtQcm9qZWN0JCwgKGkpID0+IGkucGtfZW50aXR5KSlcbiAgICByZXR1cm4gc2VsZWN0aW9uJFxuICB9XG4gIGJ5X2ZrX2NsYXNzX2tleSQoa2V5OiBzdHJpbmcgfCBudW1iZXIsIG9mUHJvamVjdCA9IHRydWUpIHtcbiAgICBjb25zdCBzZWxlY3Rpb24kID0gdGhpcy5fYnlfZmtfY2xhc3MkLmtleShrZXkpXG4gICAgaWYgKG9mUHJvamVjdCkgcmV0dXJuIHNlbGVjdGlvbiQucGlwZSh0aGlzLnBpcGVJdGVtc0luUHJvamVjdCh0aGlzLnBrUHJvamVjdCQsIChpKSA9PiBpLnBrX2VudGl0eSkpXG4gICAgcmV0dXJuIHNlbGVjdGlvbiRcbiAgfVxufVxuXG5jbGFzcyBJbmZUZW1wb3JhbEVudGl0eVNlbGVjdGlvbnMgZXh0ZW5kcyBTZWxlY3RvciB7XG4gIHByaXZhdGUgX2J5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPEluZlRlbXBvcmFsRW50aXR5PignYnlfcGtfZW50aXR5JylcbiAgLy8gcHVibGljIGJ5X2ZrX2NsYXNzJCA9IHRoaXMuc2VsZWN0b3I8QnlQazxJbmZUZW1wb3JhbEVudGl0eT4+KCdieV9ma19jbGFzcycpXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgcGtQcm9qZWN0JDogT2JzZXJ2YWJsZTxudW1iZXIgfCBzdHJpbmc+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuICApIHsgc3VwZXIobmdSZWR1eCwgcGtQcm9qZWN0JCwgY29uZmlncywgbW9kZWwpIH1cblxuICBieV9wa19lbnRpdHlfa2V5JChrZXk6IHN0cmluZyB8IG51bWJlciwgb2ZQcm9qZWN0ID0gdHJ1ZSkge1xuICAgIGNvbnN0IHNlbGVjdGlvbiQgPSB0aGlzLl9ieV9wa19lbnRpdHkkLmtleShrZXkpXG4gICAgaWYgKG9mUHJvamVjdCkgcmV0dXJuIHNlbGVjdGlvbiQucGlwZSh0aGlzLnBpcGVJdGVtSW5Qcm9qZWN0KHRoaXMucGtQcm9qZWN0JCwgKGkpID0+IGkucGtfZW50aXR5KSlcbiAgICByZXR1cm4gc2VsZWN0aW9uJFxuICB9XG59XG5cblxuY2xhc3MgSW5mU3RhdGVtZW50U2VsZWN0aW9ucyBleHRlbmRzIFNlbGVjdG9yIHtcblxuICBwdWJsaWMgYnlfcGtfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8SW5mU3RhdGVtZW50PignYnlfcGtfZW50aXR5JylcbiAgcHVibGljIGJ5X2ZrX3N1YmplY3RfZGF0YSQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8SW5mU3RhdGVtZW50Pj4oJ2J5X2ZrX3N1YmplY3RfZGF0YScpXG5cbiAgcHVibGljIHBhZ2luYXRpb24kID0gdGhpcy5wYWdpbmF0aW9uU2VsZWN0b3I8bnVtYmVyPigpXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgcGtQcm9qZWN0JDogT2JzZXJ2YWJsZTxudW1iZXIgfCBzdHJpbmc+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuICApIHsgc3VwZXIobmdSZWR1eCwgcGtQcm9qZWN0JCwgY29uZmlncywgbW9kZWwpIH1cblxuICBieV9wa19lbnRpdHlfa2V5JChrZXk6IHN0cmluZyB8IG51bWJlciwgb2ZQcm9qZWN0ID0gdHJ1ZSkge1xuICAgIGNvbnN0IHNlbGVjdGlvbiQgPSB0aGlzLmJ5X3BrX2VudGl0eSQua2V5KGtleSlcbiAgICBpZiAob2ZQcm9qZWN0KSByZXR1cm4gc2VsZWN0aW9uJC5waXBlKHRoaXMucGlwZUl0ZW1JblByb2plY3QodGhpcy5wa1Byb2plY3QkLCAoaSkgPT4gaS5wa19lbnRpdHkpKVxuICAgIHJldHVybiBzZWxlY3Rpb24kXG4gIH1cblxuICBieV9zdWJqZWN0JChmb3JlaWduS2V5czogSW5kZXhTdGF0ZW1lbnRCeVN1YmplY3QsIG9mUHJvamVjdCA9IHRydWUpOiBPYnNlcnZhYmxlPEluZlN0YXRlbWVudFtdPiB7XG4gICAgY29uc3Qga2V5ID0gaW5kZXhTdGF0ZW1lbnRCeVN1YmplY3QoZm9yZWlnbktleXMpO1xuICAgIGNvbnN0IHNlbGVjdGlvbiQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8SW5mU3RhdGVtZW50Pj4oJ2J5X3N1YmplY3QnKS5rZXkoa2V5KVxuICAgIGlmIChvZlByb2plY3QpIHtcbiAgICAgIHJldHVybiBzZWxlY3Rpb24kLnBpcGUoXG4gICAgICAgIHRoaXMucGlwZUl0ZW1zSW5Qcm9qZWN0KHRoaXMucGtQcm9qZWN0JCwgKGl0ZW0pID0+IGl0ZW0ucGtfZW50aXR5KSxcbiAgICAgICAgbWFwKGl0ZW1zID0+IHZhbHVlcyhpdGVtcykpXG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiBzZWxlY3Rpb24kLnBpcGUoXG4gICAgICBtYXAoaXRlbXMgPT4gdmFsdWVzKGl0ZW1zKSlcbiAgICApO1xuICB9XG5cbiAgYnlfc3ViamVjdF9hbmRfcHJvcGVydHkkKGZvcmVpZ25LZXlzOiBJbmRleFN0YXRlbWVudEJ5U3ViamVjdFByb3BlcnR5LCBvZlByb2plY3QgPSB0cnVlKTogT2JzZXJ2YWJsZTxJbmZTdGF0ZW1lbnRbXT4ge1xuICAgIHJldHVybiB0aGlzLmJ5X3N1YmplY3RfYW5kX3Byb3BlcnR5X2luZGV4ZWQkKGZvcmVpZ25LZXlzLCBvZlByb2plY3QpLnBpcGUoXG4gICAgICBtYXAoc3RhdGVtZW50SWR4ID0+IHZhbHVlcyhzdGF0ZW1lbnRJZHgpKVxuICAgIClcbiAgfVxuICBieV9zdWJqZWN0X2FuZF9wcm9wZXJ0eV9pbmRleGVkJChmb3JlaWduS2V5czogSW5kZXhTdGF0ZW1lbnRCeVN1YmplY3RQcm9wZXJ0eSwgb2ZQcm9qZWN0ID0gdHJ1ZSk6IE9ic2VydmFibGU8QnlQazxJbmZTdGF0ZW1lbnQ+PiB7XG4gICAgY29uc3Qga2V5ID0gaW5kZXhTdGF0ZW1lbnRCeVN1YmplY3RQcm9wZXJ0eShmb3JlaWduS2V5cyk7XG4gICAgY29uc3Qgc2VsZWN0aW9uJCA9IHRoaXMuc2VsZWN0b3I8QnlQazxJbmZTdGF0ZW1lbnQ+PignYnlfc3ViamVjdCtwcm9wZXJ0eScpLmtleShrZXkpXG4gICAgaWYgKG9mUHJvamVjdCkge1xuICAgICAgcmV0dXJuIHNlbGVjdGlvbiQucGlwZSh0aGlzLnBpcGVJdGVtc0luUHJvamVjdCh0aGlzLnBrUHJvamVjdCQsIChpdGVtKSA9PiBpdGVtLnBrX2VudGl0eSkpXG4gICAgfVxuICAgIHJldHVybiBzZWxlY3Rpb24kXG4gIH1cblxuICBieV9vYmplY3QkKGZvcmVpZ25LZXlzOiBJbmRleFN0YXRlbWVudEJ5T2JqZWN0LCBvZlByb2plY3QgPSB0cnVlKTogT2JzZXJ2YWJsZTxJbmZTdGF0ZW1lbnRbXT4ge1xuICAgIGNvbnN0IGtleSA9IGluZGV4U3RhdGVtZW50QnlPYmplY3QoZm9yZWlnbktleXMpO1xuICAgIGNvbnN0IHNlbGVjdGlvbiQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8SW5mU3RhdGVtZW50Pj4oJ2J5X29iamVjdCcpLmtleShrZXkpXG4gICAgaWYgKG9mUHJvamVjdCkge1xuICAgICAgcmV0dXJuIHNlbGVjdGlvbiQucGlwZShcbiAgICAgICAgdGhpcy5waXBlSXRlbXNJblByb2plY3QodGhpcy5wa1Byb2plY3QkLCAoaXRlbSkgPT4gaXRlbS5wa19lbnRpdHkpLFxuICAgICAgICBtYXAoaXRlbXMgPT4gdmFsdWVzKGl0ZW1zKSlcbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIHNlbGVjdGlvbiQucGlwZShcbiAgICAgIG1hcChpdGVtcyA9PiB2YWx1ZXMoaXRlbXMpKVxuICAgICk7XG4gIH1cblxuICBieV9vYmplY3RfYW5kX3Byb3BlcnR5JChmb3JlaWduS2V5czogSW5kZXhTdGF0ZW1lbnRCeU9iamVjdFByb3BlcnR5LCBvZlByb2plY3QgPSB0cnVlKTogT2JzZXJ2YWJsZTxJbmZTdGF0ZW1lbnRbXT4ge1xuICAgIHJldHVybiB0aGlzLmJ5X29iamVjdF9hbmRfcHJvcGVydHlfaW5kZXhlZCQoZm9yZWlnbktleXMsIG9mUHJvamVjdCkucGlwZShcbiAgICAgIG1hcChzdGF0ZW1lbnRJZHggPT4gdmFsdWVzKHN0YXRlbWVudElkeCkpXG4gICAgKVxuICB9XG5cbiAgYnlfb2JqZWN0X2FuZF9wcm9wZXJ0eV9pbmRleGVkJChmb3JlaWduS2V5czogSW5kZXhTdGF0ZW1lbnRCeU9iamVjdFByb3BlcnR5LCBvZlByb2plY3QgPSB0cnVlKTogT2JzZXJ2YWJsZTxCeVBrPEluZlN0YXRlbWVudD4+IHtcbiAgICBjb25zdCBrZXkgPSBpbmRleFN0YXRlbWVudEJ5T2JqZWN0UHJvcGVydHkoZm9yZWlnbktleXMpO1xuICAgIGNvbnN0IHNlbGVjdGlvbiQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8SW5mU3RhdGVtZW50Pj4oJ2J5X29iamVjdCtwcm9wZXJ0eScpLmtleShrZXkpXG4gICAgaWYgKG9mUHJvamVjdCkge1xuICAgICAgcmV0dXJuIHNlbGVjdGlvbiQucGlwZShcbiAgICAgICAgdGhpcy5waXBlSXRlbXNJblByb2plY3QodGhpcy5wa1Byb2plY3QkLCAoaXRlbSkgPT4gaXRlbS5wa19lbnRpdHkpLFxuICAgICAgKVxuICAgIH1cbiAgICByZXR1cm4gc2VsZWN0aW9uJFxuICB9XG5cbn1cblxuXG5jbGFzcyBJbmZUZXh0UHJvcGVydHlTZWxlY3Rpb25zIGV4dGVuZHMgU2VsZWN0b3Ige1xuICBwcml2YXRlIF9ieV9wa19lbnRpdHkkID0gdGhpcy5zZWxlY3RvcjxJbmZUZXh0UHJvcGVydHk+KCdieV9wa19lbnRpdHknKVxuICBwcml2YXRlIF9ieV9ma19jb25jZXJuZWRfZW50aXR5X19ma19jbGFzc19maWVsZCQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8SW5mVGV4dFByb3BlcnR5Pj4oJ2J5X2ZrX2NvbmNlcm5lZF9lbnRpdHlfX2ZrX2NsYXNzX2ZpZWxkJylcbiAgcHJpdmF0ZSBfYnlfZmtfY29uY2VybmVkX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8SW5mVGV4dFByb3BlcnR5Pj4oJ2J5X2ZrX2NvbmNlcm5lZF9lbnRpdHknKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIHBrUHJvamVjdCQsIGNvbmZpZ3MsIG1vZGVsKSB9XG5cbiAgYnlfcGtfZW50aXR5X2tleSQoa2V5OiBzdHJpbmcgfCBudW1iZXIsIG9mUHJvamVjdCA9IHRydWUpIHtcbiAgICBjb25zdCBzZWxlY3Rpb24kID0gdGhpcy5fYnlfcGtfZW50aXR5JC5rZXkoa2V5KVxuICAgIGlmIChvZlByb2plY3QpIHJldHVybiBzZWxlY3Rpb24kLnBpcGUodGhpcy5waXBlSXRlbUluUHJvamVjdCh0aGlzLnBrUHJvamVjdCQsIChpKSA9PiBpLnBrX2VudGl0eSkpXG4gICAgcmV0dXJuIHNlbGVjdGlvbiRcbiAgfVxuXG4gIGJ5X2ZrX2NvbmNlcm5lZF9lbnRpdHlfX2ZrX2NsYXNzX2ZpZWxkX2luZGV4ZWQkKGtleTogc3RyaW5nLCBvZlByb2plY3QgPSB0cnVlKTogT2JzZXJ2YWJsZTxCeVBrPEluZlRleHRQcm9wZXJ0eT4+IHtcbiAgICBjb25zdCBzZWxlY3Rpb24kID0gdGhpcy5fYnlfZmtfY29uY2VybmVkX2VudGl0eV9fZmtfY2xhc3NfZmllbGQkLmtleShrZXkpXG4gICAgaWYgKG9mUHJvamVjdCkge1xuICAgICAgcmV0dXJuIHNlbGVjdGlvbiQucGlwZShcbiAgICAgICAgdGhpcy5waXBlSXRlbXNJblByb2plY3QodGhpcy5wa1Byb2plY3QkLCAoaXRlbSkgPT4gaXRlbS5wa19lbnRpdHkpLFxuICAgICAgKVxuICAgIH1cbiAgICByZXR1cm4gc2VsZWN0aW9uJFxuICB9XG5cblxuICBieV9ma19jb25jZXJuZWRfZW50aXR5X2luZGV4ZWQkKGtleTogc3RyaW5nIHwgbnVtYmVyLCBvZlByb2plY3QgPSB0cnVlKTogT2JzZXJ2YWJsZTxCeVBrPEluZlRleHRQcm9wZXJ0eT4+IHtcbiAgICBjb25zdCBzZWxlY3Rpb24kID0gdGhpcy5fYnlfZmtfY29uY2VybmVkX2VudGl0eSQua2V5KGtleSlcbiAgICBpZiAob2ZQcm9qZWN0KSB7XG4gICAgICByZXR1cm4gc2VsZWN0aW9uJC5waXBlKFxuICAgICAgICB0aGlzLnBpcGVJdGVtc0luUHJvamVjdCh0aGlzLnBrUHJvamVjdCQsIChpdGVtKSA9PiBpdGVtLnBrX2VudGl0eSksXG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiBzZWxlY3Rpb24kXG4gIH1cblxufVxuXG5cbmNsYXNzIEluZkFwcGVsbGF0aW9uU2VsZWN0aW9ucyBleHRlbmRzIFNlbGVjdG9yIHtcbiAgcHVibGljIGJ5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPEluZkFwcGVsbGF0aW9uPignYnlfcGtfZW50aXR5JylcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBwa1Byb2plY3QkOiBPYnNlcnZhYmxlPG51bWJlciB8IHN0cmluZz4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBwa1Byb2plY3QkLCBjb25maWdzLCBtb2RlbCkgfVxufVxuXG5jbGFzcyBJbmZMYW5nU3RyaW5nU2VsZWN0aW9ucyBleHRlbmRzIFNlbGVjdG9yIHtcbiAgcHVibGljIGJ5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPEluZkxhbmdTdHJpbmc+KCdieV9wa19lbnRpdHknKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIHBrUHJvamVjdCQsIGNvbmZpZ3MsIG1vZGVsKSB9XG59XG5cbmNsYXNzIEluZlBsYWNlU2VsZWN0aW9ucyBleHRlbmRzIFNlbGVjdG9yIHtcbiAgcHVibGljIGJ5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPEluZlBsYWNlPignYnlfcGtfZW50aXR5JylcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBwa1Byb2plY3QkOiBPYnNlcnZhYmxlPG51bWJlciB8IHN0cmluZz4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBwa1Byb2plY3QkLCBjb25maWdzLCBtb2RlbCkgfVxufVxuXG5jbGFzcyBJbmZUaW1lUHJpbWl0aXZlU2VsZWN0aW9ucyBleHRlbmRzIFNlbGVjdG9yIHtcbiAgcHVibGljIGJ5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPEluZlRpbWVQcmltaXRpdmU+KCdieV9wa19lbnRpdHknKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIHBrUHJvamVjdCQsIGNvbmZpZ3MsIG1vZGVsKSB9XG59XG5cbmNsYXNzIEluZkxhbmd1YWdlU2VsZWN0aW9ucyBleHRlbmRzIFNlbGVjdG9yIHtcbiAgcHVibGljIGJ5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPEluZkxhbmd1YWdlPignYnlfcGtfZW50aXR5JylcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBwa1Byb2plY3QkOiBPYnNlcnZhYmxlPG51bWJlciB8IHN0cmluZz4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBwa1Byb2plY3QkLCBjb25maWdzLCBtb2RlbCkgfVxufVxuXG5jbGFzcyBJbmZEaW1lbnNpb25TZWxlY3Rpb25zIGV4dGVuZHMgU2VsZWN0b3Ige1xuICBwdWJsaWMgYnlfcGtfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8SW5mRGltZW5zaW9uPignYnlfcGtfZW50aXR5JylcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBwa1Byb2plY3QkOiBPYnNlcnZhYmxlPG51bWJlciB8IHN0cmluZz4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBwa1Byb2plY3QkLCBjb25maWdzLCBtb2RlbCkgfVxufVxuXG5leHBvcnQgY2xhc3MgSW5mU2VsZWN0b3Ige1xuXG4gIHBlcnNpc3RlbnRfaXRlbSQgPSBuZXcgSW5mUGVyc2lzdGVudEl0ZW1TZWxlY3Rpb25zKHRoaXMubmdSZWR1eCwgdGhpcy5wa1Byb2plY3QkLCBpbmZEZWZpbml0aW9ucywgJ3BlcnNpc3RlbnRfaXRlbScpO1xuICB0ZW1wb3JhbF9lbnRpdHkkID0gbmV3IEluZlRlbXBvcmFsRW50aXR5U2VsZWN0aW9ucyh0aGlzLm5nUmVkdXgsIHRoaXMucGtQcm9qZWN0JCwgaW5mRGVmaW5pdGlvbnMsICd0ZW1wb3JhbF9lbnRpdHknKTtcbiAgc3RhdGVtZW50JCA9IG5ldyBJbmZTdGF0ZW1lbnRTZWxlY3Rpb25zKHRoaXMubmdSZWR1eCwgdGhpcy5wa1Byb2plY3QkLCBpbmZEZWZpbml0aW9ucywgJ3N0YXRlbWVudCcpO1xuICBhcHBlbGxhdGlvbiQgPSBuZXcgSW5mQXBwZWxsYXRpb25TZWxlY3Rpb25zKHRoaXMubmdSZWR1eCwgdGhpcy5wa1Byb2plY3QkLCBpbmZEZWZpbml0aW9ucywgJ2FwcGVsbGF0aW9uJyk7XG4gIHBsYWNlJCA9IG5ldyBJbmZQbGFjZVNlbGVjdGlvbnModGhpcy5uZ1JlZHV4LCB0aGlzLnBrUHJvamVjdCQsIGluZkRlZmluaXRpb25zLCAncGxhY2UnKTtcbiAgdGV4dF9wcm9wZXJ0eSQgPSBuZXcgSW5mVGV4dFByb3BlcnR5U2VsZWN0aW9ucyh0aGlzLm5nUmVkdXgsIHRoaXMucGtQcm9qZWN0JCwgaW5mRGVmaW5pdGlvbnMsICd0ZXh0X3Byb3BlcnR5Jyk7XG4gIGxhbmdfc3RyaW5nJCA9IG5ldyBJbmZMYW5nU3RyaW5nU2VsZWN0aW9ucyh0aGlzLm5nUmVkdXgsIHRoaXMucGtQcm9qZWN0JCwgaW5mRGVmaW5pdGlvbnMsICdsYW5nX3N0cmluZycpO1xuICB0aW1lX3ByaW1pdGl2ZSQgPSBuZXcgSW5mVGltZVByaW1pdGl2ZVNlbGVjdGlvbnModGhpcy5uZ1JlZHV4LCB0aGlzLnBrUHJvamVjdCQsIGluZkRlZmluaXRpb25zLCAndGltZV9wcmltaXRpdmUnKTtcbiAgbGFuZ3VhZ2UkID0gbmV3IEluZkxhbmd1YWdlU2VsZWN0aW9ucyh0aGlzLm5nUmVkdXgsIHRoaXMucGtQcm9qZWN0JCwgaW5mRGVmaW5pdGlvbnMsICdsYW5ndWFnZScpO1xuICBkaW1lbnNpb24kID0gbmV3IEluZkRpbWVuc2lvblNlbGVjdGlvbnModGhpcy5uZ1JlZHV4LCB0aGlzLnBrUHJvamVjdCQsIGluZkRlZmluaXRpb25zLCAnZGltZW5zaW9uJyk7XG5cbiAgcGtFbnRpdHlNb2RlbE1hcCQgPSB0aGlzLm5nUmVkdXguc2VsZWN0KFtpbmZSb290LCBQUl9FTlRJVFlfTU9ERUxfTUFQXSk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPiwgcHVibGljIHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPikgeyB9XG5cbiAgZ2V0TW9kZWxPZkVudGl0eSQocGtFbnRpdHk6IG51bWJlcikge1xuICAgIHJldHVybiB0aGlzLm5nUmVkdXguc2VsZWN0PEVudGl0eU1vZGVsQW5kQ2xhc3M8SW5mTW9kZWxOYW1lPj4oW2luZlJvb3QsIFBSX0VOVElUWV9NT0RFTF9NQVAsIHBrRW50aXR5XSk7XG4gIH1cbn1cbiJdfQ==