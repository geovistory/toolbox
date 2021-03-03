/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/selectors/inf.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { getFromTo, indexStatementByObject, indexStatementByObjectProperty, indexStatementBySubject, indexStatementBySubjectProperty, infDefinitions, infRoot, paginateBy, PR_ENTITY_MODEL_MAP, subfieldIdToString } from '@kleiolab/lib-redux';
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
        const all$ = this.ngRedux.select([infRoot, this.model, indexKey]);
        /** @type {?} */
        const key = (/**
         * @param {?} x
         * @return {?}
         */
        (x) => {
            return this.ngRedux.select([infRoot, this.model, indexKey, x]);
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
            const fromToString = getFromTo(page.limit, page.offset);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXF1ZXJpZXMvIiwic291cmNlcyI6WyJsaWIvcXVlcmllcy9zZWxlY3RvcnMvaW5mLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBQTZCLFNBQVMsRUFBcUMsc0JBQXNCLEVBQWtDLDhCQUE4QixFQUEyQix1QkFBdUIsRUFBbUMsK0JBQStCLEVBQUUsY0FBYyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsbUJBQW1CLEVBQTJCLGtCQUFrQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFHamEsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDM0QsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLElBQUksQ0FBQztBQUM1QixPQUFPLEVBQWMsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM1QyxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHL0QsTUFBTSxRQUFROzs7Ozs7O0lBQ1osWUFDUyxPQUEyQixFQUMzQixVQUF1QyxFQUN2QyxPQUFnQyxFQUNoQyxLQUFhO1FBSGIsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUFDM0IsZUFBVSxHQUFWLFVBQVUsQ0FBNkI7UUFDdkMsWUFBTyxHQUFQLE9BQU8sQ0FBeUI7UUFDaEMsVUFBSyxHQUFMLEtBQUssQ0FBUTtJQUNsQixDQUFDOzs7Ozs7SUFFTCxRQUFRLENBQUksUUFBZ0I7O2NBRXBCLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBVSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDOztjQUNwRSxHQUFHOzs7O1FBQUcsQ0FBQyxDQUFDLEVBQWlCLEVBQUU7WUFDL0IsT0FBTyxJQUFJLENBQUMsT0FBTyxD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QUNoQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFvQyxDQUFDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQzFHLENBQUM7Q0FDRjs7O0lBbEJDLHVDQUFxSDs7SUFDckgsdUNBQXFIOztJQUNySCxpQ0FBb0c7O0lBQ3BHLG1DQUEwRzs7SUFDMUcsNkJBQXdGOztJQUN4RixxQ0FBK0c7O0lBQy9HLG1DQUF5Rzs7SUFDekcsc0NBQWtIOztJQUNsSCxnQ0FBaUc7O0lBQ2pHLGlDQUFvRzs7SUFFcEcsd0NBQXdFOztJQUU1RCw4QkFBa0M7O0lBQUUsaUNBQThDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdSZWR1eCB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L3N0b3JlJztcbmltcG9ydCB7IEJ5UGssIEVudGl0eU1vZGVsQW5kQ2xhc3MsIGdldEZyb21UbywgSUFwcFN0YXRlLCBJbmRleFN0YXRlbWVudEJ5T2JqZWN0LCBpbmRleFN0YXRlbWVudEJ5T2JqZWN0LCBJbmRleFN0YXRlbWVudEJ5T2JqZWN0UHJvcGVydHksIGluZGV4U3RhdGVtZW50QnlPYmplY3RQcm9wZXJ0eSwgSW5kZXhTdGF0ZW1lbnRCeVN1YmplY3QsIGluZGV4U3RhdGVtZW50QnlTdWJqZWN0LCBJbmRleFN0YXRlbWVudEJ5U3ViamVjdFByb3BlcnR5LCBpbmRleFN0YXRlbWVudEJ5U3ViamVjdFByb3BlcnR5LCBpbmZEZWZpbml0aW9ucywgaW5mUm9vdCwgcGFnaW5hdGVCeSwgUFJfRU5USVRZX01PREVMX01BUCwgUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sIHN1YmZpZWxkSWRUb1N0cmluZyB9IGZyb20gJ0BrbGVpb2xhYi9saWItcmVkdXgnO1xuaW1wb3J0IHsgSW5mQXBwZWxsYXRpb24sIEluZkRpbWVuc2lvbiwgSW5mTGFuZ1N0cmluZywgSW5mTGFuZ3VhZ2UsIEluZlBlcnNpc3RlbnRJdGVtLCBJbmZQbGFjZSwgSW5mU3RhdGVtZW50LCBJbmZUZW1wb3JhbEVudGl0eSwgSW5mVGV4dFByb3BlcnR5LCBJbmZUaW1lUHJpbWl0aXZlLCBQcm9JbmZvUHJvalJlbCB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBHdlN1YmZpZWxkSWQsIEd2U3ViZmllbGRQYWdlIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3RPckVtcHR5IH0gZnJvbSAnQGtsZWlvbGFiL2xpYi11dGlscyc7XG5pbXBvcnQgeyB2YWx1ZXMgfSBmcm9tICdkMyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiwgcGlwZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBmaXJzdCwgbWFwLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5leHBvcnQgdHlwZSBJbmZNb2RlbE5hbWUgPSAncGVyc2lzdGVudF9pdGVtJyB8ICd0ZW1wb3JhbF9lbnRpdHknIHwgJ3N0YXRlbWVudCcgfCAndGV4dF9wcm9wZXJ0eScgfCAnYXBwZWxsYXRpb24nIHwgJ2xhbmd1YWdlJyB8ICdwbGFjZScgfCAnZGltZW5zaW9uJyB8ICdsYW5nX3N0cmluZycgfCAndGltZV9wcmltaXRpdmUnO1xuXG5jbGFzcyBTZWxlY3RvciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IH1cblxuICBzZWxlY3RvcjxNPihpbmRleEtleTogc3RyaW5nKTogeyBhbGwkOiBPYnNlcnZhYmxlPEJ5UGs8TT4+LCBrZXk6ICh4KSA9PiBPYnNlcnZhYmxlPE0+IH0ge1xuXG4gICAgY29uc3QgYWxsJCA9IHRoaXMubmdSZWR1eC5zZWxlY3Q8QnlQazxNPj4oW2luZlJvb3QsIHRoaXMubW9kZWwsIGluZGV4S2V5XSlcbiAgICBjb25zdCBrZXkgPSAoeCk6IE9ic2VydmFibGU8TT4gPT4ge1xuICAgICAgcmV0dXJuIHRoaXMubmdSZWR1eC5zZWxlY3Q8TT4oW2luZlJvb3QsIHRoaXMubW9kZWwsIGluZGV4S2V5LCB4XSlcbiAgICB9XG4gICAgcmV0dXJuIHsgYWxsJCwga2V5IH1cbiAgfVxuXG4gIHBhZ2luYXRpb25TZWxlY3RvcjxNPigpIHtcblxuICAgIGNvbnN0IHBpcGVQYWdlID0gKHBhZ2U6IEd2U3ViZmllbGRQYWdlKTogT2JzZXJ2YWJsZTxNW10+ID0+IHtcbiAgICAgIGxldCBwYXRoOiBhbnlbXTtcbiAgICAgIGNvbnN0IHBhZ0J5ID0gcGFnaW5hdGVCeVxuICAgICAgY29uc3Qga2V5ID0gc3ViZmllbGRJZFRvU3RyaW5nKHBhZ2UpXG4gICAgICBwYXRoID0gW2luZlJvb3QsIHRoaXMubW9kZWwsIHBhZ0J5LCBrZXldO1xuICAgICAgcmV0dXJuIHRoaXMubmdSZWR1eC5zZWxlY3Q8bnVtYmVyPihbLi4ucGF0aCwgJ2NvdW50J10pXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIGZpbHRlcihjb3VudCA9PiBjb3VudCAhPT0gdW5kZWZpbmVkKSxcbiAgICAgICAgICBzd2l0Y2hNYXAoY291bnQgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSBwYWdlLm9mZnNldDtcbiAgICAgICAgICAgIGNvbnN0IGVuZCA9IGNvdW50IDw9IChzdGFydCArIHBhZ2UubGltaXQpID8gY291bnQgOiAoc3RhcnQgKyBwYWdlLmxpbWl0KTtcbiAgICAgICAgICAgIGNvbnN0IG9icyQ6IE9ic2VydmFibGU8TT5bXSA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICAgICAgICAgICAgb2JzJC5wdXNoKFxuICAgICAgICAgICAgICAgIHRoaXMubmdSZWR1eC5zZWxlY3Q8TT4oWy4uLnBhdGgsICdyb3dzJywgaV0pLnBpcGUoZmlsdGVyKHggPT4gISF4KSlcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3RPckVtcHR5KG9icyQpXG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgIH1cblxuXG4gICAgY29uc3QgcGlwZVBhZ2VMb2FkTmVlZGVkID0gKHBhZ2U6IEd2U3ViZmllbGRQYWdlLCB0cmlnZ2VyJDogT2JzZXJ2YWJsZTxhbnk+KTogT2JzZXJ2YWJsZTxib29sZWFuPiA9PiB7XG4gICAgICBsZXQgcGF0aDogYW55W107XG4gICAgICBjb25zdCBwYWdCeSA9IHBhZ2luYXRlQnlcbiAgICAgIGNvbnN0IGtleSA9IHN1YmZpZWxkSWRUb1N0cmluZyhwYWdlKVxuXG4gICAgICBwYXRoID0gW2luZlJvb3QsIHRoaXMubW9kZWwsIHBhZ0J5LCBrZXldO1xuICAgICAgY29uc3QgZnJvbVRvU3RyaW5nID0gZ2V0RnJvbVRvKHBhZ2UubGltaXQsIHBhZ2Uub2Zmc2V0KVxuICAgICAgcmV0dXJuIHRyaWdnZXIkLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PiB0aGlzLm5nUmVkdXguc2VsZWN0PGJvb2xlYW4+KFsuLi5wYXRoLCAnbG9hZGluZycsIGZyb21Ub1N0cmluZ10pXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBmaXJzdCgpLFxuICAgICAgICAgICAgbWFwKGxvYWRpbmcgPT4gIWxvYWRpbmcpXG4gICAgICAgICAgKVxuICAgICAgICApKVxuXG4gICAgfVxuXG5cbiAgICBjb25zdCBwaXBlQ291bnQgPSAocGFnZTogR3ZTdWJmaWVsZElkKTogT2JzZXJ2YWJsZTxudW1iZXIgfCB1bmRlZmluZWQ+ID0+IHtcbiAgICAgIGxldCBwYXRoOiBhbnlbXTtcbiAgICAgIGNvbnN0IHBhZ0J5ID0gcGFnaW5hdGVCeVxuICAgICAgY29uc3Qga2V5ID0gc3ViZmllbGRJZFRvU3RyaW5nKHBhZ2UpXG5cbiAgICAgIHBhdGggPSBbaW5mUm9vdCwgdGhpcy5tb2RlbCwgcGFnQnksIGtleV07XG4gICAgICByZXR1cm4gdGhpcy5uZ1JlZHV4LnNlbGVjdDxudW1iZXI+KFsuLi5wYXRoLCAnY291bnQnXSlcbiAgICB9XG5cblxuICAgIHJldHVybiB7IHBpcGVQYWdlLCBwaXBlQ291bnQsIHBpcGVQYWdlTG9hZE5lZWRlZCB9XG5cbiAgfVxuXG5cbiAgcGlwZUl0ZW1zSW5Qcm9qZWN0PE0+KHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPiwgZ2V0RmtFbnRpdHk6IChpdGVtOiBNKSA9PiBudW1iZXIpIHtcbiAgICByZXR1cm4gcGlwZShcbiAgICAgIHN3aXRjaE1hcCgoaXRlbXM6IEJ5UGs8TT4pID0+IHtcbiAgICAgICAgcmV0dXJuIHBrUHJvamVjdCQucGlwZShcbiAgICAgICAgICBzd2l0Y2hNYXAocGtQcm9qZWN0ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHByb1JlbHNBbmRLZXkkOiBPYnNlcnZhYmxlPHsga2V5OiBzdHJpbmcsIHJlbDogUHJvSW5mb1Byb2pSZWwgfT5bXSA9IFtdO1xuICAgICAgICAgICAgZm9yIChjb25zdCBrIGluIGl0ZW1zKSB7XG4gICAgICAgICAgICAgIGlmIChpdGVtcy5oYXNPd25Qcm9wZXJ0eShrKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBpdGVtc1trXTtcbiAgICAgICAgICAgICAgICBwcm9SZWxzQW5kS2V5JC5wdXNoKFxuICAgICAgICAgICAgICAgICAgdGhpcy5uZ1JlZHV4LnNlbGVjdDxQcm9JbmZvUHJvalJlbD4oWydwcm8nLCAnaW5mb19wcm9qX3JlbCcsICdieV9ma19wcm9qZWN0X19ma19lbnRpdHknLCBwa1Byb2plY3QgKyAnXycgKyBnZXRGa0VudGl0eShpdGVtKV0pXG4gICAgICAgICAgICAgICAgICAgIC5waXBlKG1hcChyZWwgPT4gKHsga2V5OiBrLCByZWwgfSkpKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3RPckVtcHR5KHByb1JlbHNBbmRLZXkkKS5waXBlKFxuICAgICAgICAgICAgICBtYXAocHJvUmVscyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbXNJblByb2plY3Q6IEJ5UGs8TT4gPSB7fTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb1JlbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHByb1JlbCA9IHByb1JlbHNbaV07XG4gICAgICAgICAgICAgICAgICBpZiAocHJvUmVsLnJlbCAmJiBwcm9SZWwucmVsLmlzX2luX3Byb2plY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbXNJblByb2plY3RbcHJvUmVsLmtleV0gPSBpdGVtc1twcm9SZWwua2V5XVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbXNJblByb2plY3Q7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuXG4gICAgICB9KVxuICAgIClcbiAgfVxuXG4gIHBpcGVJdGVtSW5Qcm9qZWN0PE0+KHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPiwgZ2V0RmtFbnRpdHk6IChpdGVtOiBNKSA9PiBudW1iZXIpIHtcbiAgICByZXR1cm4gcGlwZShcbiAgICAgIHN3aXRjaE1hcCgoaXRlbTogTSkgPT4ge1xuICAgICAgICBpZiAoIWl0ZW0pIHJldHVybiBvZih1bmRlZmluZWQpO1xuICAgICAgICByZXR1cm4gcGtQcm9qZWN0JC5waXBlKFxuICAgICAgICAgIHN3aXRjaE1hcChwa1Byb2plY3QgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJvUmVsJCA9IHRoaXMubmdSZWR1eC5zZWxlY3Q8UHJvSW5mb1Byb2pSZWw+KFsncHJvJywgJ2luZm9fcHJval9yZWwnLCAnYnlfZmtfcHJvamVjdF9fZmtfZW50aXR5JywgcGtQcm9qZWN0ICsgJ18nICsgZ2V0RmtFbnRpdHkoaXRlbSldKVxuICAgICAgICAgICAgcmV0dXJuIHByb1JlbCQucGlwZShcbiAgICAgICAgICAgICAgLy8gZmlsdGVyKHByb1JlbCA9PiBwcm9SZWwuaXNfaW5fcHJvamVjdCA9PSB0cnVlKSxcbiAgICAgICAgICAgICAgbWFwKChwcm9SZWwpID0+IHByb1JlbCAmJiBwcm9SZWwuaXNfaW5fcHJvamVjdCA9PSB0cnVlID8gaXRlbSA6IHVuZGVmaW5lZClcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICB9KVxuICAgIClcbiAgfVxufVxuXG5jbGFzcyBJbmZQZXJzaXN0ZW50SXRlbVNlbGVjdGlvbnMgZXh0ZW5kcyBTZWxlY3RvciB7XG4gIHByaXZhdGUgX2J5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPEluZlBlcnNpc3RlbnRJdGVtPignYnlfcGtfZW50aXR5JylcbiAgcHJpdmF0ZSBfYnlfZmtfY2xhc3MkID0gdGhpcy5zZWxlY3RvcjxCeVBrPEluZlBlcnNpc3RlbnRJdGVtPj4oJ2J5X2ZrX2NsYXNzJylcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBwa1Byb2plY3QkOiBPYnNlcnZhYmxlPG51bWJlciB8IHN0cmluZz4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBwa1Byb2plY3QkLCBjb25maWdzLCBtb2RlbCkgfVxuXG4gIGJ5X3BrX2VudGl0eV9rZXkkKGtleTogc3RyaW5nIHwgbnVtYmVyLCBvZlByb2plY3QgPSB0cnVlKSB7XG4gICAgY29uc3Qgc2VsZWN0aW9uJCA9IHRoaXMuX2J5X3BrX2VudGl0eSQua2V5KGtleSlcbiAgICBpZiAob2ZQcm9qZWN0KSByZXR1cm4gc2VsZWN0aW9uJC5waXBlKHRoaXMucGlwZUl0ZW1JblByb2plY3QodGhpcy5wa1Byb2plY3QkLCAoaSkgPT4gaS5wa19lbnRpdHkpKVxuICAgIHJldHVybiBzZWxlY3Rpb24kXG4gIH1cbiAgYnlfcGtfZW50aXR5X2FsbCQob2ZQcm9qZWN0ID0gdHJ1ZSkge1xuICAgIGNvbnN0IHNlbGVjdGlvbiQgPSB0aGlzLl9ieV9wa19lbnRpdHkkLmFsbCRcbiAgICBpZiAob2ZQcm9qZWN0KSByZXR1cm4gc2VsZWN0aW9uJC5waXBlKHRoaXMucGlwZUl0ZW1zSW5Qcm9qZWN0KHRoaXMucGtQcm9qZWN0JCwgKGkpID0+IGkucGtfZW50aXR5KSlcbiAgICByZXR1cm4gc2VsZWN0aW9uJFxuICB9XG4gIGJ5X2ZrX2NsYXNzX2tleSQoa2V5OiBzdHJpbmcgfCBudW1iZXIsIG9mUHJvamVjdCA9IHRydWUpIHtcbiAgICBjb25zdCBzZWxlY3Rpb24kID0gdGhpcy5fYnlfZmtfY2xhc3MkLmtleShrZXkpXG4gICAgaWYgKG9mUHJvamVjdCkgcmV0dXJuIHNlbGVjdGlvbiQucGlwZSh0aGlzLnBpcGVJdGVtc0luUHJvamVjdCh0aGlzLnBrUHJvamVjdCQsIChpKSA9PiBpLnBrX2VudGl0eSkpXG4gICAgcmV0dXJuIHNlbGVjdGlvbiRcbiAgfVxufVxuXG5jbGFzcyBJbmZUZW1wb3JhbEVudGl0eVNlbGVjdGlvbnMgZXh0ZW5kcyBTZWxlY3RvciB7XG4gIHByaXZhdGUgX2J5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPEluZlRlbXBvcmFsRW50aXR5PignYnlfcGtfZW50aXR5JylcbiAgLy8gcHVibGljIGJ5X2ZrX2NsYXNzJCA9IHRoaXMuc2VsZWN0b3I8QnlQazxJbmZUZW1wb3JhbEVudGl0eT4+KCdieV9ma19jbGFzcycpXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgcGtQcm9qZWN0JDogT2JzZXJ2YWJsZTxudW1iZXIgfCBzdHJpbmc+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuICApIHsgc3VwZXIobmdSZWR1eCwgcGtQcm9qZWN0JCwgY29uZmlncywgbW9kZWwpIH1cblxuICBieV9wa19lbnRpdHlfa2V5JChrZXk6IHN0cmluZyB8IG51bWJlciwgb2ZQcm9qZWN0ID0gdHJ1ZSkge1xuICAgIGNvbnN0IHNlbGVjdGlvbiQgPSB0aGlzLl9ieV9wa19lbnRpdHkkLmtleShrZXkpXG4gICAgaWYgKG9mUHJvamVjdCkgcmV0dXJuIHNlbGVjdGlvbiQucGlwZSh0aGlzLnBpcGVJdGVtSW5Qcm9qZWN0KHRoaXMucGtQcm9qZWN0JCwgKGkpID0+IGkucGtfZW50aXR5KSlcbiAgICByZXR1cm4gc2VsZWN0aW9uJFxuICB9XG59XG5cblxuY2xhc3MgSW5mU3RhdGVtZW50U2VsZWN0aW9ucyBleHRlbmRzIFNlbGVjdG9yIHtcblxuICBwdWJsaWMgYnlfcGtfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8SW5mU3RhdGVtZW50PignYnlfcGtfZW50aXR5JylcbiAgcHVibGljIGJ5X2ZrX3N1YmplY3RfZGF0YSQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8SW5mU3RhdGVtZW50Pj4oJ2J5X2ZrX3N1YmplY3RfZGF0YScpXG5cbiAgcHVibGljIHBhZ2luYXRpb24kID0gdGhpcy5wYWdpbmF0aW9uU2VsZWN0b3I8bnVtYmVyPigpXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgcGtQcm9qZWN0JDogT2JzZXJ2YWJsZTxudW1iZXIgfCBzdHJpbmc+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuICApIHsgc3VwZXIobmdSZWR1eCwgcGtQcm9qZWN0JCwgY29uZmlncywgbW9kZWwpIH1cblxuICBieV9wa19lbnRpdHlfa2V5JChrZXk6IHN0cmluZyB8IG51bWJlciwgb2ZQcm9qZWN0ID0gdHJ1ZSkge1xuICAgIGNvbnN0IHNlbGVjdGlvbiQgPSB0aGlzLmJ5X3BrX2VudGl0eSQua2V5KGtleSlcbiAgICBpZiAob2ZQcm9qZWN0KSByZXR1cm4gc2VsZWN0aW9uJC5waXBlKHRoaXMucGlwZUl0ZW1JblByb2plY3QodGhpcy5wa1Byb2plY3QkLCAoaSkgPT4gaS5wa19lbnRpdHkpKVxuICAgIHJldHVybiBzZWxlY3Rpb24kXG4gIH1cblxuICBieV9zdWJqZWN0JChmb3JlaWduS2V5czogSW5kZXhTdGF0ZW1lbnRCeVN1YmplY3QsIG9mUHJvamVjdCA9IHRydWUpOiBPYnNlcnZhYmxlPEluZlN0YXRlbWVudFtdPiB7XG4gICAgY29uc3Qga2V5ID0gaW5kZXhTdGF0ZW1lbnRCeVN1YmplY3QoZm9yZWlnbktleXMpO1xuICAgIGNvbnN0IHNlbGVjdGlvbiQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8SW5mU3RhdGVtZW50Pj4oJ2J5X3N1YmplY3QnKS5rZXkoa2V5KVxuICAgIGlmIChvZlByb2plY3QpIHtcbiAgICAgIHJldHVybiBzZWxlY3Rpb24kLnBpcGUoXG4gICAgICAgIHRoaXMucGlwZUl0ZW1zSW5Qcm9qZWN0KHRoaXMucGtQcm9qZWN0JCwgKGl0ZW0pID0+IGl0ZW0ucGtfZW50aXR5KSxcbiAgICAgICAgbWFwKGl0ZW1zID0+IHZhbHVlcyhpdGVtcykpXG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiBzZWxlY3Rpb24kLnBpcGUoXG4gICAgICBtYXAoaXRlbXMgPT4gdmFsdWVzKGl0ZW1zKSlcbiAgICApO1xuICB9XG5cbiAgYnlfc3ViamVjdF9hbmRfcHJvcGVydHkkKGZvcmVpZ25LZXlzOiBJbmRleFN0YXRlbWVudEJ5U3ViamVjdFByb3BlcnR5LCBvZlByb2plY3QgPSB0cnVlKTogT2JzZXJ2YWJsZTxJbmZTdGF0ZW1lbnRbXT4ge1xuICAgIHJldHVybiB0aGlzLmJ5X3N1YmplY3RfYW5kX3Byb3BlcnR5X2luZGV4ZWQkKGZvcmVpZ25LZXlzLCBvZlByb2plY3QpLnBpcGUoXG4gICAgICBtYXAoc3RhdGVtZW50SWR4ID0+IHZhbHVlcyhzdGF0ZW1lbnRJZHgpKVxuICAgIClcbiAgfVxuICBieV9zdWJqZWN0X2FuZF9wcm9wZXJ0eV9pbmRleGVkJChmb3JlaWduS2V5czogSW5kZXhTdGF0ZW1lbnRCeVN1YmplY3RQcm9wZXJ0eSwgb2ZQcm9qZWN0ID0gdHJ1ZSk6IE9ic2VydmFibGU8QnlQazxJbmZTdGF0ZW1lbnQ+PiB7XG4gICAgY29uc3Qga2V5ID0gaW5kZXhTdGF0ZW1lbnRCeVN1YmplY3RQcm9wZXJ0eShmb3JlaWduS2V5cyk7XG4gICAgY29uc3Qgc2VsZWN0aW9uJCA9IHRoaXMuc2VsZWN0b3I8QnlQazxJbmZTdGF0ZW1lbnQ+PignYnlfc3ViamVjdCtwcm9wZXJ0eScpLmtleShrZXkpXG4gICAgaWYgKG9mUHJvamVjdCkge1xuICAgICAgcmV0dXJuIHNlbGVjdGlvbiQucGlwZSh0aGlzLnBpcGVJdGVtc0luUHJvamVjdCh0aGlzLnBrUHJvamVjdCQsIChpdGVtKSA9PiBpdGVtLnBrX2VudGl0eSkpXG4gICAgfVxuICAgIHJldHVybiBzZWxlY3Rpb24kXG4gIH1cblxuICBieV9vYmplY3QkKGZvcmVpZ25LZXlzOiBJbmRleFN0YXRlbWVudEJ5T2JqZWN0LCBvZlByb2plY3QgPSB0cnVlKTogT2JzZXJ2YWJsZTxJbmZTdGF0ZW1lbnRbXT4ge1xuICAgIGNvbnN0IGtleSA9IGluZGV4U3RhdGVtZW50QnlPYmplY3QoZm9yZWlnbktleXMpO1xuICAgIGNvbnN0IHNlbGVjdGlvbiQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8SW5mU3RhdGVtZW50Pj4oJ2J5X29iamVjdCcpLmtleShrZXkpXG4gICAgaWYgKG9mUHJvamVjdCkge1xuICAgICAgcmV0dXJuIHNlbGVjdGlvbiQucGlwZShcbiAgICAgICAgdGhpcy5waXBlSXRlbXNJblByb2plY3QodGhpcy5wa1Byb2plY3QkLCAoaXRlbSkgPT4gaXRlbS5wa19lbnRpdHkpLFxuICAgICAgICBtYXAoaXRlbXMgPT4gdmFsdWVzKGl0ZW1zKSlcbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIHNlbGVjdGlvbiQucGlwZShcbiAgICAgIG1hcChpdGVtcyA9PiB2YWx1ZXMoaXRlbXMpKVxuICAgICk7XG4gIH1cblxuICBieV9vYmplY3RfYW5kX3Byb3BlcnR5JChmb3JlaWduS2V5czogSW5kZXhTdGF0ZW1lbnRCeU9iamVjdFByb3BlcnR5LCBvZlByb2plY3QgPSB0cnVlKTogT2JzZXJ2YWJsZTxJbmZTdGF0ZW1lbnRbXT4ge1xuICAgIHJldHVybiB0aGlzLmJ5X29iamVjdF9hbmRfcHJvcGVydHlfaW5kZXhlZCQoZm9yZWlnbktleXMsIG9mUHJvamVjdCkucGlwZShcbiAgICAgIG1hcChzdGF0ZW1lbnRJZHggPT4gdmFsdWVzKHN0YXRlbWVudElkeCkpXG4gICAgKVxuICB9XG5cbiAgYnlfb2JqZWN0X2FuZF9wcm9wZXJ0eV9pbmRleGVkJChmb3JlaWduS2V5czogSW5kZXhTdGF0ZW1lbnRCeU9iamVjdFByb3BlcnR5LCBvZlByb2plY3QgPSB0cnVlKTogT2JzZXJ2YWJsZTxCeVBrPEluZlN0YXRlbWVudD4+IHtcbiAgICBjb25zdCBrZXkgPSBpbmRleFN0YXRlbWVudEJ5T2JqZWN0UHJvcGVydHkoZm9yZWlnbktleXMpO1xuICAgIGNvbnN0IHNlbGVjdGlvbiQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8SW5mU3RhdGVtZW50Pj4oJ2J5X29iamVjdCtwcm9wZXJ0eScpLmtleShrZXkpXG4gICAgaWYgKG9mUHJvamVjdCkge1xuICAgICAgcmV0dXJuIHNlbGVjdGlvbiQucGlwZShcbiAgICAgICAgdGhpcy5waXBlSXRlbXNJblByb2plY3QodGhpcy5wa1Byb2plY3QkLCAoaXRlbSkgPT4gaXRlbS5wa19lbnRpdHkpLFxuICAgICAgKVxuICAgIH1cbiAgICByZXR1cm4gc2VsZWN0aW9uJFxuICB9XG5cbn1cblxuXG5jbGFzcyBJbmZUZXh0UHJvcGVydHlTZWxlY3Rpb25zIGV4dGVuZHMgU2VsZWN0b3Ige1xuICBwcml2YXRlIF9ieV9wa19lbnRpdHkkID0gdGhpcy5zZWxlY3RvcjxJbmZUZXh0UHJvcGVydHk+KCdieV9wa19lbnRpdHknKVxuICBwcml2YXRlIF9ieV9ma19jb25jZXJuZWRfZW50aXR5X19ma19jbGFzc19maWVsZCQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8SW5mVGV4dFByb3BlcnR5Pj4oJ2J5X2ZrX2NvbmNlcm5lZF9lbnRpdHlfX2ZrX2NsYXNzX2ZpZWxkJylcbiAgcHJpdmF0ZSBfYnlfZmtfY29uY2VybmVkX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8SW5mVGV4dFByb3BlcnR5Pj4oJ2J5X2ZrX2NvbmNlcm5lZF9lbnRpdHknKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIHBrUHJvamVjdCQsIGNvbmZpZ3MsIG1vZGVsKSB9XG5cbiAgYnlfcGtfZW50aXR5X2tleSQoa2V5OiBzdHJpbmcgfCBudW1iZXIsIG9mUHJvamVjdCA9IHRydWUpIHtcbiAgICBjb25zdCBzZWxlY3Rpb24kID0gdGhpcy5fYnlfcGtfZW50aXR5JC5rZXkoa2V5KVxuICAgIGlmIChvZlByb2plY3QpIHJldHVybiBzZWxlY3Rpb24kLnBpcGUodGhpcy5waXBlSXRlbUluUHJvamVjdCh0aGlzLnBrUHJvamVjdCQsIChpKSA9PiBpLnBrX2VudGl0eSkpXG4gICAgcmV0dXJuIHNlbGVjdGlvbiRcbiAgfVxuXG4gIGJ5X2ZrX2NvbmNlcm5lZF9lbnRpdHlfX2ZrX2NsYXNzX2ZpZWxkX2luZGV4ZWQkKGtleTogc3RyaW5nLCBvZlByb2plY3QgPSB0cnVlKTogT2JzZXJ2YWJsZTxCeVBrPEluZlRleHRQcm9wZXJ0eT4+IHtcbiAgICBjb25zdCBzZWxlY3Rpb24kID0gdGhpcy5fYnlfZmtfY29uY2VybmVkX2VudGl0eV9fZmtfY2xhc3NfZmllbGQkLmtleShrZXkpXG4gICAgaWYgKG9mUHJvamVjdCkge1xuICAgICAgcmV0dXJuIHNlbGVjdGlvbiQucGlwZShcbiAgICAgICAgdGhpcy5waXBlSXRlbXNJblByb2plY3QodGhpcy5wa1Byb2plY3QkLCAoaXRlbSkgPT4gaXRlbS5wa19lbnRpdHkpLFxuICAgICAgKVxuICAgIH1cbiAgICByZXR1cm4gc2VsZWN0aW9uJFxuICB9XG5cblxuICBieV9ma19jb25jZXJuZWRfZW50aXR5X2luZGV4ZWQkKGtleTogc3RyaW5nIHwgbnVtYmVyLCBvZlByb2plY3QgPSB0cnVlKTogT2JzZXJ2YWJsZTxCeVBrPEluZlRleHRQcm9wZXJ0eT4+IHtcbiAgICBjb25zdCBzZWxlY3Rpb24kID0gdGhpcy5fYnlfZmtfY29uY2VybmVkX2VudGl0eSQua2V5KGtleSlcbiAgICBpZiAob2ZQcm9qZWN0KSB7XG4gICAgICByZXR1cm4gc2VsZWN0aW9uJC5waXBlKFxuICAgICAgICB0aGlzLnBpcGVJdGVtc0luUHJvamVjdCh0aGlzLnBrUHJvamVjdCQsIChpdGVtKSA9PiBpdGVtLnBrX2VudGl0eSksXG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiBzZWxlY3Rpb24kXG4gIH1cblxufVxuXG5cbmNsYXNzIEluZkFwcGVsbGF0aW9uU2VsZWN0aW9ucyBleHRlbmRzIFNlbGVjdG9yIHtcbiAgcHVibGljIGJ5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPEluZkFwcGVsbGF0aW9uPignYnlfcGtfZW50aXR5JylcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBwa1Byb2plY3QkOiBPYnNlcnZhYmxlPG51bWJlciB8IHN0cmluZz4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBwa1Byb2plY3QkLCBjb25maWdzLCBtb2RlbCkgfVxufVxuXG5jbGFzcyBJbmZMYW5nU3RyaW5nU2VsZWN0aW9ucyBleHRlbmRzIFNlbGVjdG9yIHtcbiAgcHVibGljIGJ5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPEluZkxhbmdTdHJpbmc+KCdieV9wa19lbnRpdHknKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIHBrUHJvamVjdCQsIGNvbmZpZ3MsIG1vZGVsKSB9XG59XG5cbmNsYXNzIEluZlBsYWNlU2VsZWN0aW9ucyBleHRlbmRzIFNlbGVjdG9yIHtcbiAgcHVibGljIGJ5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPEluZlBsYWNlPignYnlfcGtfZW50aXR5JylcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBwa1Byb2plY3QkOiBPYnNlcnZhYmxlPG51bWJlciB8IHN0cmluZz4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBwa1Byb2plY3QkLCBjb25maWdzLCBtb2RlbCkgfVxufVxuXG5jbGFzcyBJbmZUaW1lUHJpbWl0aXZlU2VsZWN0aW9ucyBleHRlbmRzIFNlbGVjdG9yIHtcbiAgcHVibGljIGJ5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPEluZlRpbWVQcmltaXRpdmU+KCdieV9wa19lbnRpdHknKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIHBrUHJvamVjdCQsIGNvbmZpZ3MsIG1vZGVsKSB9XG59XG5cbmNsYXNzIEluZkxhbmd1YWdlU2VsZWN0aW9ucyBleHRlbmRzIFNlbGVjdG9yIHtcbiAgcHVibGljIGJ5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPEluZkxhbmd1YWdlPignYnlfcGtfZW50aXR5JylcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBwa1Byb2plY3QkOiBPYnNlcnZhYmxlPG51bWJlciB8IHN0cmluZz4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBwa1Byb2plY3QkLCBjb25maWdzLCBtb2RlbCkgfVxufVxuXG5jbGFzcyBJbmZEaW1lbnNpb25TZWxlY3Rpb25zIGV4dGVuZHMgU2VsZWN0b3Ige1xuICBwdWJsaWMgYnlfcGtfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8SW5mRGltZW5zaW9uPignYnlfcGtfZW50aXR5JylcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBwa1Byb2plY3QkOiBPYnNlcnZhYmxlPG51bWJlciB8IHN0cmluZz4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBwa1Byb2plY3QkLCBjb25maWdzLCBtb2RlbCkgfVxufVxuXG5leHBvcnQgY2xhc3MgSW5mU2VsZWN0b3Ige1xuXG4gIHBlcnNpc3RlbnRfaXRlbSQgPSBuZXcgSW5mUGVyc2lzdGVudEl0ZW1TZWxlY3Rpb25zKHRoaXMubmdSZWR1eCwgdGhpcy5wa1Byb2plY3QkLCBpbmZEZWZpbml0aW9ucywgJ3BlcnNpc3RlbnRfaXRlbScpO1xuICB0ZW1wb3JhbF9lbnRpdHkkID0gbmV3IEluZlRlbXBvcmFsRW50aXR5U2VsZWN0aW9ucyh0aGlzLm5nUmVkdXgsIHRoaXMucGtQcm9qZWN0JCwgaW5mRGVmaW5pdGlvbnMsICd0ZW1wb3JhbF9lbnRpdHknKTtcbiAgc3RhdGVtZW50JCA9IG5ldyBJbmZTdGF0ZW1lbnRTZWxlY3Rpb25zKHRoaXMubmdSZWR1eCwgdGhpcy5wa1Byb2plY3QkLCBpbmZEZWZpbml0aW9ucywgJ3N0YXRlbWVudCcpO1xuICBhcHBlbGxhdGlvbiQgPSBuZXcgSW5mQXBwZWxsYXRpb25TZWxlY3Rpb25zKHRoaXMubmdSZWR1eCwgdGhpcy5wa1Byb2plY3QkLCBpbmZEZWZpbml0aW9ucywgJ2FwcGVsbGF0aW9uJyk7XG4gIHBsYWNlJCA9IG5ldyBJbmZQbGFjZVNlbGVjdGlvbnModGhpcy5uZ1JlZHV4LCB0aGlzLnBrUHJvamVjdCQsIGluZkRlZmluaXRpb25zLCAncGxhY2UnKTtcbiAgdGV4dF9wcm9wZXJ0eSQgPSBuZXcgSW5mVGV4dFByb3BlcnR5U2VsZWN0aW9ucyh0aGlzLm5nUmVkdXgsIHRoaXMucGtQcm9qZWN0JCwgaW5mRGVmaW5pdGlvbnMsICd0ZXh0X3Byb3BlcnR5Jyk7XG4gIGxhbmdfc3RyaW5nJCA9IG5ldyBJbmZMYW5nU3RyaW5nU2VsZWN0aW9ucyh0aGlzLm5nUmVkdXgsIHRoaXMucGtQcm9qZWN0JCwgaW5mRGVmaW5pdGlvbnMsICdsYW5nX3N0cmluZycpO1xuICB0aW1lX3ByaW1pdGl2ZSQgPSBuZXcgSW5mVGltZVByaW1pdGl2ZVNlbGVjdGlvbnModGhpcy5uZ1JlZHV4LCB0aGlzLnBrUHJvamVjdCQsIGluZkRlZmluaXRpb25zLCAndGltZV9wcmltaXRpdmUnKTtcbiAgbGFuZ3VhZ2UkID0gbmV3IEluZkxhbmd1YWdlU2VsZWN0aW9ucyh0aGlzLm5nUmVkdXgsIHRoaXMucGtQcm9qZWN0JCwgaW5mRGVmaW5pdGlvbnMsICdsYW5ndWFnZScpO1xuICBkaW1lbnNpb24kID0gbmV3IEluZkRpbWVuc2lvblNlbGVjdGlvbnModGhpcy5uZ1JlZHV4LCB0aGlzLnBrUHJvamVjdCQsIGluZkRlZmluaXRpb25zLCAnZGltZW5zaW9uJyk7XG5cbiAgcGtFbnRpdHlNb2RlbE1hcCQgPSB0aGlzLm5nUmVkdXguc2VsZWN0KFtpbmZSb290LCBQUl9FTlRJVFlfTU9ERUxfTUFQXSk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPiwgcHVibGljIHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPikgeyB9XG5cbiAgZ2V0TW9kZWxPZkVudGl0eSQocGtFbnRpdHk6IG51bWJlcikge1xuICAgIHJldHVybiB0aGlzLm5nUmVkdXguc2VsZWN0PEVudGl0eU1vZGVsQW5kQ2xhc3M8SW5mTW9kZWxOYW1lPj4oW2luZlJvb3QsIFBSX0VOVElUWV9NT0RFTF9NQVAsIHBrRW50aXR5XSk7XG4gIH1cbn1cbiJdfQ==