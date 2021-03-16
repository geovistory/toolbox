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
    /** @type {?} */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXF1ZXJpZXMvc3JjL2xpYi9xdWVyaWVzLyIsInNvdXJjZXMiOlsic2VsZWN0b3JzL2luZi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUE2QixTQUFTLEVBQXFDLHNCQUFzQixFQUFrQyw4QkFBOEIsRUFBMkIsdUJBQXVCLEVBQW1DLCtCQUErQixFQUFFLGNBQWMsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLG1CQUFtQixFQUEyQixrQkFBa0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBR2phLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzNELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFDNUIsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUMvQixPQUFPLEVBQWMsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM1QyxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRzdFLE1BQU0sUUFBUTs7Ozs7OztJQUNaLFlBQ1MsT0FBMkIsRUFDM0IsVUFBdUMsRUFDdkMsT0FBZ0MsRUFDaEMsS0FBYTtRQUhiLFlBQU8sR0FBUCxPQUFPLENBQW9CO1FBQzNCLGVBQVUsR0FBVixVQUFVLENBQTZCO1FBQ3ZDLFlBQU8sR0FBUCxPQUFPLENBQXlCO1FBQ2hDLFVBQUssR0FBTCxLQUFLLENBQVE7SUFDbEIsQ0FBQzs7Ozs7O0lBRUwsUUFBUSxDQUFJLFFBQWdCOztjQUVwQixJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQVUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQzs7Y0FDcEUsR0FBRzs7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SCxjQUFTLEdBQUcsSUFBSSxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsY0FBYyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ2pHLGVBQVUsR0FBRyxJQUFJLHNCQUFzQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxjQUFjLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFFcEcsc0JBQWlCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO0lBQzBCLENBQUM7Ozs7O0lBRW5HLGlCQUFpQixDQUFDLFFBQWdCO1FBQ2hDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQW9DLENBQUMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDMUcsQ0FBQztDQUNGOzs7SUFqQkMsdUNBQXFIOztJQUNySCx1Q0FBcUg7O0lBQ3JILGlDQUFvRzs7SUFDcEcsbUNBQTBHOztJQUMxRyw2QkFBd0Y7O0lBQ3hGLHFDQUErRzs7SUFDL0csbUNBQXlHOztJQUN6RyxzQ0FBa0g7O0lBQ2xILGdDQUFpRzs7SUFDakcsaUNBQW9HOztJQUVwRyx3Q0FBd0U7O0lBQzVELDhCQUFrQzs7SUFBRSxpQ0FBOEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ1JlZHV4IH0gZnJvbSAnQGFuZ3VsYXItcmVkdXgvc3RvcmUnO1xuaW1wb3J0IHsgQnlQaywgRW50aXR5TW9kZWxBbmRDbGFzcywgZ2V0RnJvbVRvLCBJQXBwU3RhdGUsIEluZGV4U3RhdGVtZW50QnlPYmplY3QsIGluZGV4U3RhdGVtZW50QnlPYmplY3QsIEluZGV4U3RhdGVtZW50QnlPYmplY3RQcm9wZXJ0eSwgaW5kZXhTdGF0ZW1lbnRCeU9iamVjdFByb3BlcnR5LCBJbmRleFN0YXRlbWVudEJ5U3ViamVjdCwgaW5kZXhTdGF0ZW1lbnRCeVN1YmplY3QsIEluZGV4U3RhdGVtZW50QnlTdWJqZWN0UHJvcGVydHksIGluZGV4U3RhdGVtZW50QnlTdWJqZWN0UHJvcGVydHksIGluZkRlZmluaXRpb25zLCBpbmZSb290LCBwYWdpbmF0ZUJ5LCBQUl9FTlRJVFlfTU9ERUxfTUFQLCBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbiwgc3ViZmllbGRJZFRvU3RyaW5nIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1yZWR1eCc7XG5pbXBvcnQgeyBJbmZBcHBlbGxhdGlvbiwgSW5mRGltZW5zaW9uLCBJbmZMYW5nU3RyaW5nLCBJbmZMYW5ndWFnZSwgSW5mUGVyc2lzdGVudEl0ZW0sIEluZlBsYWNlLCBJbmZTdGF0ZW1lbnQsIEluZlRlbXBvcmFsRW50aXR5LCBJbmZUZXh0UHJvcGVydHksIEluZlRpbWVQcmltaXRpdmUsIFByb0luZm9Qcm9qUmVsIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcbmltcG9ydCB7IEd2RmllbGRJZCwgR3ZGaWVsZFBhZ2UgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgY29tYmluZUxhdGVzdE9yRW1wdHkgfSBmcm9tICdAa2xlaW9sYWIvbGliLXV0aWxzJztcbmltcG9ydCB7IHZhbHVlcyB9IGZyb20gJ2QzJztcbmltcG9ydCB7IGVxdWFscyB9IGZyb20gJ3JhbWRhJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mLCBwaXBlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIGZpcnN0LCBtYXAsIHN3aXRjaE1hcCwgdGhyb3R0bGVUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuZXhwb3J0IHR5cGUgSW5mTW9kZWxOYW1lID0gJ3BlcnNpc3RlbnRfaXRlbScgfCAndGVtcG9yYWxfZW50aXR5JyB8ICdzdGF0ZW1lbnQnIHwgJ3RleHRfcHJvcGVydHknIHwgJ2FwcGVsbGF0aW9uJyB8ICdsYW5ndWFnZScgfCAncGxhY2UnIHwgJ2RpbWVuc2lvbicgfCAnbGFuZ19zdHJpbmcnIHwgJ3RpbWVfcHJpbWl0aXZlJztcblxuY2xhc3MgU2VsZWN0b3Ige1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBwa1Byb2plY3QkOiBPYnNlcnZhYmxlPG51bWJlciB8IHN0cmluZz4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyB9XG5cbiAgc2VsZWN0b3I8TT4oaW5kZXhLZXk6IHN0cmluZyk6IHsgYWxsJDogT2JzZXJ2YWJsZTxCeVBrPE0+Piwga2V5OiAoeCkgPT4gT2JzZXJ2YWJsZTxNPiB9IHtcblxuICAgIGNvbnN0IGFsbCQgPSB0aGlzLm5nUmVkdXguc2VsZWN0PEJ5UGs8TT4+KFtpbmZSb290LCB0aGlzLm1vZGVsLCBpbmRleEtleV0pXG4gICAgY29uc3Qga2V5ID0gKHgpOiBPYnNlcnZhYmxlPE0+ID0+IHtcbiAgICAgIC8vIFJFTUFSSzogJ2VxdWFscycgY29tcGFyYXRvciBpcyB2ZXJ5IHZlcnkgaW1wb3J0YW50IGZvciBwZXJmb3JtYW5jZSAhXG4gICAgICByZXR1cm4gdGhpcy5uZ1JlZHV4LnNlbGVjdDxNPihbaW5mUm9vdCwgdGhpcy5tb2RlbCwgaW5kZXhLZXksIHhdLCBlcXVhbHMpXG4gICAgfVxuICAgIHJldHVybiB7IGFsbCQsIGtleSB9XG4gIH1cblxuICBwYWdpbmF0aW9uU2VsZWN0b3I8TT4oKSB7XG5cbiAgICBjb25zdCBwaXBlUGFnZSA9IChwYWdlOiBHdkZpZWxkUGFnZSk6IE9ic2VydmFibGU8TVtdPiA9PiB7XG4gICAgICBsZXQgcGF0aDogYW55W107XG4gICAgICBjb25zdCBwYWdCeSA9IHBhZ2luYXRlQnlcbiAgICAgIGNvbnN0IGtleSA9IHN1YmZpZWxkSWRUb1N0cmluZyhwYWdlKVxuICAgICAgcGF0aCA9IFtpbmZSb290LCB0aGlzLm1vZGVsLCBwYWdCeSwga2V5XTtcbiAgICAgIHJldHVybiB0aGlzLm5nUmVkdXguc2VsZWN0PG51bWJlcj4oWy4uLnBhdGgsICdjb3VudCddKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBmaWx0ZXIoY291bnQgPT4gY291bnQgIT09IHVuZGVmaW5lZCksXG4gICAgICAgICAgc3dpdGNoTWFwKGNvdW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gcGFnZS5vZmZzZXQ7XG4gICAgICAgICAgICBjb25zdCBlbmQgPSBjb3VudCA8PSAoc3RhcnQgKyBwYWdlLmxpbWl0KSA/IGNvdW50IDogKHN0YXJ0ICsgcGFnZS5saW1pdCk7XG4gICAgICAgICAgICBjb25zdCBvYnMkOiBPYnNlcnZhYmxlPE0+W10gPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgICAgICAgICAgIG9icyQucHVzaChcbiAgICAgICAgICAgICAgICB0aGlzLm5nUmVkdXguc2VsZWN0PE0+KFsuLi5wYXRoLCAncm93cycsIGldKS5waXBlKGZpbHRlcih4ID0+ICEheCkpXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0T3JFbXB0eShvYnMkKVxuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICB9XG5cblxuICAgIGNvbnN0IHBpcGVQYWdlTG9hZE5lZWRlZCA9IChwYWdlOiBHdkZpZWxkUGFnZSwgdHJpZ2dlciQ6IE9ic2VydmFibGU8YW55Pik6IE9ic2VydmFibGU8Ym9vbGVhbj4gPT4ge1xuICAgICAgbGV0IHBhdGg6IGFueVtdO1xuICAgICAgY29uc3QgcGFnQnkgPSBwYWdpbmF0ZUJ5XG4gICAgICBjb25zdCBrZXkgPSBzdWJmaWVsZElkVG9TdHJpbmcocGFnZSlcblxuICAgICAgcGF0aCA9IFtpbmZSb290LCB0aGlzLm1vZGVsLCBwYWdCeSwga2V5XTtcbiAgICAgIGNvbnN0IGZyb21Ub1N0cmluZyA9IGdldEZyb21UbyhwYWdlLmxpbWl0LCBwYWdlLm9mZnNldClcbiAgICAgIC8vIHJldHVybiB0aGlzLm5nUmVkdXguc2VsZWN0PGJvb2xlYW4+KFsuLi5wYXRoLCAnbG9hZGluZycsIGZyb21Ub1N0cmluZ10pXG4gICAgICAvLyAgIC5waXBlKFxuICAgICAgLy8gICAgIC8vIG1hcChsb2FkaW5nID0+ICFsb2FkaW5nKSxcbiAgICAgIC8vICAgICBzd2l0Y2hNYXAoKGxvYWRpbmcpID0+IHtcbiAgICAgIC8vICAgICAgIGlmIChsb2FkaW5nKSByZXR1cm4gb2YoZmFsc2UpXG4gICAgICAvLyAgICAgICBlbHNlIHJldHVybiB0cmlnZ2VyJC5waXBlKG1hcFRvKHRydWUpKVxuICAgICAgLy8gICAgIH0pLFxuICAgICAgLy8gICAgIC8vIGZpcnN0KCksXG4gICAgICAvLyAgIClcblxuICAgICAgcmV0dXJuIHRyaWdnZXIkLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PiB0aGlzLm5nUmVkdXguc2VsZWN0PGJvb2xlYW4+KFsuLi5wYXRoLCAnbG9hZGluZycsIGZyb21Ub1N0cmluZ10pXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBmaXJzdCgpLFxuICAgICAgICAgICAgbWFwKGxvYWRpbmcgPT4gIWxvYWRpbmcpXG4gICAgICAgICAgKVxuICAgICAgICApKVxuXG4gICAgfVxuXG5cbiAgICBjb25zdCBwaXBlQ291bnQgPSAocGFnZTogR3ZGaWVsZElkKTogT2JzZXJ2YWJsZTxudW1iZXIgfCB1bmRlZmluZWQ+ID0+IHtcbiAgICAgIGxldCBwYXRoOiBhbnlbXTtcbiAgICAgIGNvbnN0IHBhZ0J5ID0gcGFnaW5hdGVCeVxuICAgICAgY29uc3Qga2V5ID0gc3ViZmllbGRJZFRvU3RyaW5nKHBhZ2UpXG5cbiAgICAgIHBhdGggPSBbaW5mUm9vdCwgdGhpcy5tb2RlbCwgcGFnQnksIGtleV07XG4gICAgICByZXR1cm4gdGhpcy5uZ1JlZHV4LnNlbGVjdDxudW1iZXI+KFsuLi5wYXRoLCAnY291bnQnXSlcbiAgICB9XG5cblxuICAgIHJldHVybiB7IHBpcGVQYWdlLCBwaXBlQ291bnQsIHBpcGVQYWdlTG9hZE5lZWRlZCB9XG5cbiAgfVxuXG5cbiAgcGlwZUl0ZW1zSW5Qcm9qZWN0PE0+KHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPiwgZ2V0RmtFbnRpdHk6IChpdGVtOiBNKSA9PiBudW1iZXIpIHtcblxuICAgIHJldHVybiBwaXBlKFxuICAgICAgc3dpdGNoTWFwKChpdGVtczogQnlQazxNPikgPT4ge1xuICAgICAgICByZXR1cm4gcGtQcm9qZWN0JC5waXBlKFxuICAgICAgICAgIHN3aXRjaE1hcChwa1Byb2plY3QgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJvUmVsc0FuZEtleSQ6IE9ic2VydmFibGU8eyBrZXk6IHN0cmluZywgcmVsOiBQcm9JbmZvUHJvalJlbCB9PltdID0gW107XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGsgaW4gaXRlbXMpIHtcbiAgICAgICAgICAgICAgaWYgKGl0ZW1zLmhhc093blByb3BlcnR5KGspKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IGl0ZW1zW2tdO1xuICAgICAgICAgICAgICAgIHByb1JlbHNBbmRLZXkkLnB1c2goXG4gICAgICAgICAgICAgICAgICB0aGlzLm5nUmVkdXguc2VsZWN0PFByb0luZm9Qcm9qUmVsPihbJ3BybycsICdpbmZvX3Byb2pfcmVsJywgJ2J5X2ZrX3Byb2plY3RfX2ZrX2VudGl0eScsIHBrUHJvamVjdCArICdfJyArIGdldEZrRW50aXR5KGl0ZW0pXSlcbiAgICAgICAgICAgICAgICAgICAgLnBpcGUobWFwKHJlbCA9PiAoeyBrZXk6IGssIHJlbCB9KSkpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdE9yRW1wdHkocHJvUmVsc0FuZEtleSQpLnBpcGUoXG4gICAgICAgICAgICAgIHRocm90dGxlVGltZSgwKSxcbiAgICAgICAgICAgICAgbWFwKHByb1JlbHMgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1zSW5Qcm9qZWN0OiBCeVBrPE0+ID0ge307XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9SZWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBwcm9SZWwgPSBwcm9SZWxzW2ldO1xuICAgICAgICAgICAgICAgICAgaWYgKHByb1JlbC5yZWwgJiYgcHJvUmVsLnJlbC5pc19pbl9wcm9qZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zSW5Qcm9qZWN0W3Byb1JlbC5rZXldID0gaXRlbXNbcHJvUmVsLmtleV1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW1zSW5Qcm9qZWN0O1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0pXG4gICAgICAgIClcblxuICAgICAgfSlcbiAgICApXG5cbiAgfVxuXG4gIHBpcGVJdGVtSW5Qcm9qZWN0PE0+KHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPiwgZ2V0RmtFbnRpdHk6IChpdGVtOiBNKSA9PiBudW1iZXIpIHtcbiAgICByZXR1cm4gcGlwZShcbiAgICAgIHN3aXRjaE1hcCgoaXRlbTogTSkgPT4ge1xuICAgICAgICBpZiAoIWl0ZW0pIHJldHVybiBvZih1bmRlZmluZWQpO1xuICAgICAgICByZXR1cm4gcGtQcm9qZWN0JC5waXBlKFxuICAgICAgICAgIHN3aXRjaE1hcChwa1Byb2plY3QgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJvUmVsJCA9IHRoaXMubmdSZWR1eC5zZWxlY3Q8UHJvSW5mb1Byb2pSZWw+KFsncHJvJywgJ2luZm9fcHJval9yZWwnLCAnYnlfZmtfcHJvamVjdF9fZmtfZW50aXR5JywgcGtQcm9qZWN0ICsgJ18nICsgZ2V0RmtFbnRpdHkoaXRlbSldKVxuICAgICAgICAgICAgcmV0dXJuIHByb1JlbCQucGlwZShcbiAgICAgICAgICAgICAgLy8gZmlsdGVyKHByb1JlbCA9PiBwcm9SZWwuaXNfaW5fcHJvamVjdCA9PSB0cnVlKSxcbiAgICAgICAgICAgICAgbWFwKChwcm9SZWwpID0+IHByb1JlbCAmJiBwcm9SZWwuaXNfaW5fcHJvamVjdCA9PSB0cnVlID8gaXRlbSA6IHVuZGVmaW5lZClcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICB9KVxuICAgIClcbiAgfVxufVxuXG5jbGFzcyBJbmZQZXJzaXN0ZW50SXRlbVNlbGVjdGlvbnMgZXh0ZW5kcyBTZWxlY3RvciB7XG4gIHByaXZhdGUgX2J5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPEluZlBlcnNpc3RlbnRJdGVtPignYnlfcGtfZW50aXR5JylcbiAgcHJpdmF0ZSBfYnlfZmtfY2xhc3MkID0gdGhpcy5zZWxlY3RvcjxCeVBrPEluZlBlcnNpc3RlbnRJdGVtPj4oJ2J5X2ZrX2NsYXNzJylcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBwa1Byb2plY3QkOiBPYnNlcnZhYmxlPG51bWJlciB8IHN0cmluZz4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBwa1Byb2plY3QkLCBjb25maWdzLCBtb2RlbCkgfVxuXG4gIGJ5X3BrX2VudGl0eV9rZXkkKGtleTogc3RyaW5nIHwgbnVtYmVyLCBvZlByb2plY3QgPSB0cnVlKSB7XG4gICAgY29uc3Qgc2VsZWN0aW9uJCA9IHRoaXMuX2J5X3BrX2VudGl0eSQua2V5KGtleSlcbiAgICBpZiAob2ZQcm9qZWN0KSByZXR1cm4gc2VsZWN0aW9uJC5waXBlKHRoaXMucGlwZUl0ZW1JblByb2plY3QodGhpcy5wa1Byb2plY3QkLCAoaSkgPT4gaS5wa19lbnRpdHkpKVxuICAgIHJldHVybiBzZWxlY3Rpb24kXG4gIH1cbiAgYnlfcGtfZW50aXR5X2FsbCQob2ZQcm9qZWN0ID0gdHJ1ZSkge1xuICAgIGNvbnN0IHNlbGVjdGlvbiQgPSB0aGlzLl9ieV9wa19lbnRpdHkkLmFsbCRcbiAgICBpZiAob2ZQcm9qZWN0KSByZXR1cm4gc2VsZWN0aW9uJC5waXBlKHRoaXMucGlwZUl0ZW1zSW5Qcm9qZWN0KHRoaXMucGtQcm9qZWN0JCwgKGkpID0+IGkucGtfZW50aXR5KSlcbiAgICByZXR1cm4gc2VsZWN0aW9uJFxuICB9XG4gIGJ5X2ZrX2NsYXNzX2tleSQoa2V5OiBzdHJpbmcgfCBudW1iZXIsIG9mUHJvamVjdCA9IHRydWUpIHtcbiAgICBjb25zdCBzZWxlY3Rpb24kID0gdGhpcy5fYnlfZmtfY2xhc3MkLmtleShrZXkpXG4gICAgaWYgKG9mUHJvamVjdCkgcmV0dXJuIHNlbGVjdGlvbiQucGlwZSh0aGlzLnBpcGVJdGVtc0luUHJvamVjdCh0aGlzLnBrUHJvamVjdCQsIChpKSA9PiBpLnBrX2VudGl0eSkpXG4gICAgcmV0dXJuIHNlbGVjdGlvbiRcbiAgfVxufVxuXG5jbGFzcyBJbmZUZW1wb3JhbEVudGl0eVNlbGVjdGlvbnMgZXh0ZW5kcyBTZWxlY3RvciB7XG4gIF9ieV9wa19lbnRpdHkkID0gdGhpcy5zZWxlY3RvcjxJbmZUZW1wb3JhbEVudGl0eT4oJ2J5X3BrX2VudGl0eScpXG4gIC8vIHB1YmxpYyBieV9ma19jbGFzcyQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8SW5mVGVtcG9yYWxFbnRpdHk+PignYnlfZmtfY2xhc3MnKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIHBrUHJvamVjdCQsIGNvbmZpZ3MsIG1vZGVsKSB9XG5cbiAgYnlfcGtfZW50aXR5X2tleSQoa2V5OiBzdHJpbmcgfCBudW1iZXIsIG9mUHJvamVjdCA9IHRydWUpIHtcbiAgICBjb25zdCBzZWxlY3Rpb24kID0gdGhpcy5fYnlfcGtfZW50aXR5JC5rZXkoa2V5KVxuICAgIGlmIChvZlByb2plY3QpIHJldHVybiBzZWxlY3Rpb24kLnBpcGUodGhpcy5waXBlSXRlbUluUHJvamVjdCh0aGlzLnBrUHJvamVjdCQsIChpKSA9PiBpLnBrX2VudGl0eSkpXG4gICAgcmV0dXJuIHNlbGVjdGlvbiRcbiAgfVxufVxuXG5cbmNsYXNzIEluZlN0YXRlbWVudFNlbGVjdGlvbnMgZXh0ZW5kcyBTZWxlY3RvciB7XG5cbiAgcHVibGljIGJ5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPEluZlN0YXRlbWVudD4oJ2J5X3BrX2VudGl0eScpXG4gIHB1YmxpYyBieV9ma19zdWJqZWN0X2RhdGEkID0gdGhpcy5zZWxlY3RvcjxCeVBrPEluZlN0YXRlbWVudD4+KCdieV9ma19zdWJqZWN0X2RhdGEnKVxuXG4gIHB1YmxpYyBwYWdpbmF0aW9uJCA9IHRoaXMucGFnaW5hdGlvblNlbGVjdG9yPG51bWJlcj4oKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIHBrUHJvamVjdCQsIGNvbmZpZ3MsIG1vZGVsKSB9XG5cbiAgYnlfcGtfZW50aXR5X2tleSQoa2V5OiBzdHJpbmcgfCBudW1iZXIsIG9mUHJvamVjdCA9IHRydWUpIHtcbiAgICBjb25zdCBzZWxlY3Rpb24kID0gdGhpcy5ieV9wa19lbnRpdHkkLmtleShrZXkpXG4gICAgaWYgKG9mUHJvamVjdCkgcmV0dXJuIHNlbGVjdGlvbiQucGlwZSh0aGlzLnBpcGVJdGVtSW5Qcm9qZWN0KHRoaXMucGtQcm9qZWN0JCwgKGkpID0+IGkucGtfZW50aXR5KSlcbiAgICByZXR1cm4gc2VsZWN0aW9uJFxuICB9XG5cbiAgYnlfc3ViamVjdCQoZm9yZWlnbktleXM6IEluZGV4U3RhdGVtZW50QnlTdWJqZWN0LCBvZlByb2plY3QgPSB0cnVlKTogT2JzZXJ2YWJsZTxJbmZTdGF0ZW1lbnRbXT4ge1xuICAgIGNvbnN0IGtleSA9IGluZGV4U3RhdGVtZW50QnlTdWJqZWN0KGZvcmVpZ25LZXlzKTtcbiAgICBjb25zdCBzZWxlY3Rpb24kID0gdGhpcy5zZWxlY3RvcjxCeVBrPEluZlN0YXRlbWVudD4+KCdieV9zdWJqZWN0Jykua2V5KGtleSlcbiAgICBpZiAob2ZQcm9qZWN0KSB7XG4gICAgICByZXR1cm4gc2VsZWN0aW9uJC5waXBlKFxuICAgICAgICB0aGlzLnBpcGVJdGVtc0luUHJvamVjdCh0aGlzLnBrUHJvamVjdCQsIChpdGVtKSA9PiBpdGVtLnBrX2VudGl0eSksXG4gICAgICAgIG1hcChpdGVtcyA9PiB2YWx1ZXMoaXRlbXMpKVxuICAgICAgKVxuICAgIH1cbiAgICByZXR1cm4gc2VsZWN0aW9uJC5waXBlKFxuICAgICAgbWFwKGl0ZW1zID0+IHZhbHVlcyhpdGVtcykpXG4gICAgKTtcbiAgfVxuXG4gIGJ5X3N1YmplY3RfYW5kX3Byb3BlcnR5JChmb3JlaWduS2V5czogSW5kZXhTdGF0ZW1lbnRCeVN1YmplY3RQcm9wZXJ0eSwgb2ZQcm9qZWN0ID0gdHJ1ZSk6IE9ic2VydmFibGU8SW5mU3RhdGVtZW50W10+IHtcbiAgICByZXR1cm4gdGhpcy5ieV9zdWJqZWN0X2FuZF9wcm9wZXJ0eV9pbmRleGVkJChmb3JlaWduS2V5cywgb2ZQcm9qZWN0KS5waXBlKFxuICAgICAgbWFwKHN0YXRlbWVudElkeCA9PiB2YWx1ZXMoc3RhdGVtZW50SWR4KSlcbiAgICApXG4gIH1cbiAgYnlfc3ViamVjdF9hbmRfcHJvcGVydHlfaW5kZXhlZCQoZm9yZWlnbktleXM6IEluZGV4U3RhdGVtZW50QnlTdWJqZWN0UHJvcGVydHksIG9mUHJvamVjdCA9IHRydWUpOiBPYnNlcnZhYmxlPEJ5UGs8SW5mU3RhdGVtZW50Pj4ge1xuICAgIGNvbnN0IGtleSA9IGluZGV4U3RhdGVtZW50QnlTdWJqZWN0UHJvcGVydHkoZm9yZWlnbktleXMpO1xuICAgIGNvbnN0IHNlbGVjdGlvbiQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8SW5mU3RhdGVtZW50Pj4oJ2J5X3N1YmplY3QrcHJvcGVydHknKS5rZXkoa2V5KVxuICAgIGlmIChvZlByb2plY3QpIHtcbiAgICAgIHJldHVybiBzZWxlY3Rpb24kLnBpcGUodGhpcy5waXBlSXRlbXNJblByb2plY3QodGhpcy5wa1Byb2plY3QkLCAoaXRlbSkgPT4gaXRlbS5wa19lbnRpdHkpKVxuICAgIH1cbiAgICByZXR1cm4gc2VsZWN0aW9uJFxuICB9XG5cbiAgYnlfb2JqZWN0JChmb3JlaWduS2V5czogSW5kZXhTdGF0ZW1lbnRCeU9iamVjdCwgb2ZQcm9qZWN0ID0gdHJ1ZSk6IE9ic2VydmFibGU8SW5mU3RhdGVtZW50W10+IHtcbiAgICBjb25zdCBrZXkgPSBpbmRleFN0YXRlbWVudEJ5T2JqZWN0KGZvcmVpZ25LZXlzKTtcbiAgICBjb25zdCBzZWxlY3Rpb24kID0gdGhpcy5zZWxlY3RvcjxCeVBrPEluZlN0YXRlbWVudD4+KCdieV9vYmplY3QnKS5rZXkoa2V5KVxuICAgIGlmIChvZlByb2plY3QpIHtcbiAgICAgIHJldHVybiBzZWxlY3Rpb24kLnBpcGUoXG4gICAgICAgIHRoaXMucGlwZUl0ZW1zSW5Qcm9qZWN0KHRoaXMucGtQcm9qZWN0JCwgKGl0ZW0pID0+IGl0ZW0ucGtfZW50aXR5KSxcbiAgICAgICAgbWFwKGl0ZW1zID0+IHZhbHVlcyhpdGVtcykpXG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiBzZWxlY3Rpb24kLnBpcGUoXG4gICAgICBtYXAoaXRlbXMgPT4gdmFsdWVzKGl0ZW1zKSlcbiAgICApO1xuICB9XG5cbiAgYnlfb2JqZWN0X2FuZF9wcm9wZXJ0eSQoZm9yZWlnbktleXM6IEluZGV4U3RhdGVtZW50QnlPYmplY3RQcm9wZXJ0eSwgb2ZQcm9qZWN0ID0gdHJ1ZSk6IE9ic2VydmFibGU8SW5mU3RhdGVtZW50W10+IHtcbiAgICByZXR1cm4gdGhpcy5ieV9vYmplY3RfYW5kX3Byb3BlcnR5X2luZGV4ZWQkKGZvcmVpZ25LZXlzLCBvZlByb2plY3QpLnBpcGUoXG4gICAgICBtYXAoc3RhdGVtZW50SWR4ID0+IHZhbHVlcyhzdGF0ZW1lbnRJZHgpKVxuICAgIClcbiAgfVxuXG4gIGJ5X29iamVjdF9hbmRfcHJvcGVydHlfaW5kZXhlZCQoZm9yZWlnbktleXM6IEluZGV4U3RhdGVtZW50QnlPYmplY3RQcm9wZXJ0eSwgb2ZQcm9qZWN0ID0gdHJ1ZSk6IE9ic2VydmFibGU8QnlQazxJbmZTdGF0ZW1lbnQ+PiB7XG4gICAgY29uc3Qga2V5ID0gaW5kZXhTdGF0ZW1lbnRCeU9iamVjdFByb3BlcnR5KGZvcmVpZ25LZXlzKTtcbiAgICBjb25zdCBzZWxlY3Rpb24kID0gdGhpcy5zZWxlY3RvcjxCeVBrPEluZlN0YXRlbWVudD4+KCdieV9vYmplY3QrcHJvcGVydHknKS5rZXkoa2V5KVxuICAgIGlmIChvZlByb2plY3QpIHtcbiAgICAgIHJldHVybiBzZWxlY3Rpb24kLnBpcGUoXG4gICAgICAgIHRoaXMucGlwZUl0ZW1zSW5Qcm9qZWN0KHRoaXMucGtQcm9qZWN0JCwgKGl0ZW0pID0+IGl0ZW0ucGtfZW50aXR5KSxcbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIHNlbGVjdGlvbiRcbiAgfVxuXG59XG5cblxuY2xhc3MgSW5mVGV4dFByb3BlcnR5U2VsZWN0aW9ucyBleHRlbmRzIFNlbGVjdG9yIHtcbiAgcHJpdmF0ZSBfYnlfcGtfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8SW5mVGV4dFByb3BlcnR5PignYnlfcGtfZW50aXR5JylcbiAgcHJpdmF0ZSBfYnlfZmtfY29uY2VybmVkX2VudGl0eV9fZmtfY2xhc3NfZmllbGQkID0gdGhpcy5zZWxlY3RvcjxCeVBrPEluZlRleHRQcm9wZXJ0eT4+KCdieV9ma19jb25jZXJuZWRfZW50aXR5X19ma19jbGFzc19maWVsZCcpXG4gIHByaXZhdGUgX2J5X2ZrX2NvbmNlcm5lZF9lbnRpdHkkID0gdGhpcy5zZWxlY3RvcjxCeVBrPEluZlRleHRQcm9wZXJ0eT4+KCdieV9ma19jb25jZXJuZWRfZW50aXR5JylcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBwa1Byb2plY3QkOiBPYnNlcnZhYmxlPG51bWJlciB8IHN0cmluZz4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBwa1Byb2plY3QkLCBjb25maWdzLCBtb2RlbCkgfVxuXG4gIGJ5X3BrX2VudGl0eV9rZXkkKGtleTogc3RyaW5nIHwgbnVtYmVyLCBvZlByb2plY3QgPSB0cnVlKSB7XG4gICAgY29uc3Qgc2VsZWN0aW9uJCA9IHRoaXMuX2J5X3BrX2VudGl0eSQua2V5KGtleSlcbiAgICBpZiAob2ZQcm9qZWN0KSByZXR1cm4gc2VsZWN0aW9uJC5waXBlKHRoaXMucGlwZUl0ZW1JblByb2plY3QodGhpcy5wa1Byb2plY3QkLCAoaSkgPT4gaS5wa19lbnRpdHkpKVxuICAgIHJldHVybiBzZWxlY3Rpb24kXG4gIH1cblxuICBieV9ma19jb25jZXJuZWRfZW50aXR5X19ma19jbGFzc19maWVsZF9pbmRleGVkJChrZXk6IHN0cmluZywgb2ZQcm9qZWN0ID0gdHJ1ZSk6IE9ic2VydmFibGU8QnlQazxJbmZUZXh0UHJvcGVydHk+PiB7XG4gICAgY29uc3Qgc2VsZWN0aW9uJCA9IHRoaXMuX2J5X2ZrX2NvbmNlcm5lZF9lbnRpdHlfX2ZrX2NsYXNzX2ZpZWxkJC5rZXkoa2V5KVxuICAgIGlmIChvZlByb2plY3QpIHtcbiAgICAgIHJldHVybiBzZWxlY3Rpb24kLnBpcGUoXG4gICAgICAgIHRoaXMucGlwZUl0ZW1zSW5Qcm9qZWN0KHRoaXMucGtQcm9qZWN0JCwgKGl0ZW0pID0+IGl0ZW0ucGtfZW50aXR5KSxcbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIHNlbGVjdGlvbiRcbiAgfVxuXG5cbiAgYnlfZmtfY29uY2VybmVkX2VudGl0eV9pbmRleGVkJChrZXk6IHN0cmluZyB8IG51bWJlciwgb2ZQcm9qZWN0ID0gdHJ1ZSk6IE9ic2VydmFibGU8QnlQazxJbmZUZXh0UHJvcGVydHk+PiB7XG4gICAgY29uc3Qgc2VsZWN0aW9uJCA9IHRoaXMuX2J5X2ZrX2NvbmNlcm5lZF9lbnRpdHkkLmtleShrZXkpXG4gICAgaWYgKG9mUHJvamVjdCkge1xuICAgICAgcmV0dXJuIHNlbGVjdGlvbiQucGlwZShcbiAgICAgICAgdGhpcy5waXBlSXRlbXNJblByb2plY3QodGhpcy5wa1Byb2plY3QkLCAoaXRlbSkgPT4gaXRlbS5wa19lbnRpdHkpLFxuICAgICAgKVxuICAgIH1cbiAgICByZXR1cm4gc2VsZWN0aW9uJFxuICB9XG5cbn1cblxuXG5jbGFzcyBJbmZBcHBlbGxhdGlvblNlbGVjdGlvbnMgZXh0ZW5kcyBTZWxlY3RvciB7XG4gIHB1YmxpYyBieV9wa19lbnRpdHkkID0gdGhpcy5zZWxlY3RvcjxJbmZBcHBlbGxhdGlvbj4oJ2J5X3BrX2VudGl0eScpXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgcGtQcm9qZWN0JDogT2JzZXJ2YWJsZTxudW1iZXIgfCBzdHJpbmc+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuICApIHsgc3VwZXIobmdSZWR1eCwgcGtQcm9qZWN0JCwgY29uZmlncywgbW9kZWwpIH1cbn1cblxuY2xhc3MgSW5mTGFuZ1N0cmluZ1NlbGVjdGlvbnMgZXh0ZW5kcyBTZWxlY3RvciB7XG4gIHB1YmxpYyBieV9wa19lbnRpdHkkID0gdGhpcy5zZWxlY3RvcjxJbmZMYW5nU3RyaW5nPignYnlfcGtfZW50aXR5JylcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBwa1Byb2plY3QkOiBPYnNlcnZhYmxlPG51bWJlciB8IHN0cmluZz4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBwa1Byb2plY3QkLCBjb25maWdzLCBtb2RlbCkgfVxufVxuXG5jbGFzcyBJbmZQbGFjZVNlbGVjdGlvbnMgZXh0ZW5kcyBTZWxlY3RvciB7XG4gIHB1YmxpYyBieV9wa19lbnRpdHkkID0gdGhpcy5zZWxlY3RvcjxJbmZQbGFjZT4oJ2J5X3BrX2VudGl0eScpXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgcGtQcm9qZWN0JDogT2JzZXJ2YWJsZTxudW1iZXIgfCBzdHJpbmc+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuICApIHsgc3VwZXIobmdSZWR1eCwgcGtQcm9qZWN0JCwgY29uZmlncywgbW9kZWwpIH1cbn1cblxuY2xhc3MgSW5mVGltZVByaW1pdGl2ZVNlbGVjdGlvbnMgZXh0ZW5kcyBTZWxlY3RvciB7XG4gIHB1YmxpYyBieV9wa19lbnRpdHkkID0gdGhpcy5zZWxlY3RvcjxJbmZUaW1lUHJpbWl0aXZlPignYnlfcGtfZW50aXR5JylcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBwa1Byb2plY3QkOiBPYnNlcnZhYmxlPG51bWJlciB8IHN0cmluZz4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBwa1Byb2plY3QkLCBjb25maWdzLCBtb2RlbCkgfVxufVxuXG5jbGFzcyBJbmZMYW5ndWFnZVNlbGVjdGlvbnMgZXh0ZW5kcyBTZWxlY3RvciB7XG4gIHB1YmxpYyBieV9wa19lbnRpdHkkID0gdGhpcy5zZWxlY3RvcjxJbmZMYW5ndWFnZT4oJ2J5X3BrX2VudGl0eScpXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgcGtQcm9qZWN0JDogT2JzZXJ2YWJsZTxudW1iZXIgfCBzdHJpbmc+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuICApIHsgc3VwZXIobmdSZWR1eCwgcGtQcm9qZWN0JCwgY29uZmlncywgbW9kZWwpIH1cbn1cblxuY2xhc3MgSW5mRGltZW5zaW9uU2VsZWN0aW9ucyBleHRlbmRzIFNlbGVjdG9yIHtcbiAgcHVibGljIGJ5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPEluZkRpbWVuc2lvbj4oJ2J5X3BrX2VudGl0eScpXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgcGtQcm9qZWN0JDogT2JzZXJ2YWJsZTxudW1iZXIgfCBzdHJpbmc+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuICApIHsgc3VwZXIobmdSZWR1eCwgcGtQcm9qZWN0JCwgY29uZmlncywgbW9kZWwpIH1cbn1cblxuZXhwb3J0IGNsYXNzIEluZlNlbGVjdG9yIHtcblxuICBwZXJzaXN0ZW50X2l0ZW0kID0gbmV3IEluZlBlcnNpc3RlbnRJdGVtU2VsZWN0aW9ucyh0aGlzLm5nUmVkdXgsIHRoaXMucGtQcm9qZWN0JCwgaW5mRGVmaW5pdGlvbnMsICdwZXJzaXN0ZW50X2l0ZW0nKTtcbiAgdGVtcG9yYWxfZW50aXR5JCA9IG5ldyBJbmZUZW1wb3JhbEVudGl0eVNlbGVjdGlvbnModGhpcy5uZ1JlZHV4LCB0aGlzLnBrUHJvamVjdCQsIGluZkRlZmluaXRpb25zLCAndGVtcG9yYWxfZW50aXR5Jyk7XG4gIHN0YXRlbWVudCQgPSBuZXcgSW5mU3RhdGVtZW50U2VsZWN0aW9ucyh0aGlzLm5nUmVkdXgsIHRoaXMucGtQcm9qZWN0JCwgaW5mRGVmaW5pdGlvbnMsICdzdGF0ZW1lbnQnKTtcbiAgYXBwZWxsYXRpb24kID0gbmV3IEluZkFwcGVsbGF0aW9uU2VsZWN0aW9ucyh0aGlzLm5nUmVkdXgsIHRoaXMucGtQcm9qZWN0JCwgaW5mRGVmaW5pdGlvbnMsICdhcHBlbGxhdGlvbicpO1xuICBwbGFjZSQgPSBuZXcgSW5mUGxhY2VTZWxlY3Rpb25zKHRoaXMubmdSZWR1eCwgdGhpcy5wa1Byb2plY3QkLCBpbmZEZWZpbml0aW9ucywgJ3BsYWNlJyk7XG4gIHRleHRfcHJvcGVydHkkID0gbmV3IEluZlRleHRQcm9wZXJ0eVNlbGVjdGlvbnModGhpcy5uZ1JlZHV4LCB0aGlzLnBrUHJvamVjdCQsIGluZkRlZmluaXRpb25zLCAndGV4dF9wcm9wZXJ0eScpO1xuICBsYW5nX3N0cmluZyQgPSBuZXcgSW5mTGFuZ1N0cmluZ1NlbGVjdGlvbnModGhpcy5uZ1JlZHV4LCB0aGlzLnBrUHJvamVjdCQsIGluZkRlZmluaXRpb25zLCAnbGFuZ19zdHJpbmcnKTtcbiAgdGltZV9wcmltaXRpdmUkID0gbmV3IEluZlRpbWVQcmltaXRpdmVTZWxlY3Rpb25zKHRoaXMubmdSZWR1eCwgdGhpcy5wa1Byb2plY3QkLCBpbmZEZWZpbml0aW9ucywgJ3RpbWVfcHJpbWl0aXZlJyk7XG4gIGxhbmd1YWdlJCA9IG5ldyBJbmZMYW5ndWFnZVNlbGVjdGlvbnModGhpcy5uZ1JlZHV4LCB0aGlzLnBrUHJvamVjdCQsIGluZkRlZmluaXRpb25zLCAnbGFuZ3VhZ2UnKTtcbiAgZGltZW5zaW9uJCA9IG5ldyBJbmZEaW1lbnNpb25TZWxlY3Rpb25zKHRoaXMubmdSZWR1eCwgdGhpcy5wa1Byb2plY3QkLCBpbmZEZWZpbml0aW9ucywgJ2RpbWVuc2lvbicpO1xuXG4gIHBrRW50aXR5TW9kZWxNYXAkID0gdGhpcy5uZ1JlZHV4LnNlbGVjdChbaW5mUm9vdCwgUFJfRU5USVRZX01PREVMX01BUF0pO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LCBwdWJsaWMgcGtQcm9qZWN0JDogT2JzZXJ2YWJsZTxudW1iZXIgfCBzdHJpbmc+KSB7IH1cblxuICBnZXRNb2RlbE9mRW50aXR5JChwa0VudGl0eTogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHRoaXMubmdSZWR1eC5zZWxlY3Q8RW50aXR5TW9kZWxBbmRDbGFzczxJbmZNb2RlbE5hbWU+PihbaW5mUm9vdCwgUFJfRU5USVRZX01PREVMX01BUCwgcGtFbnRpdHldKTtcbiAgfVxufVxuIl19