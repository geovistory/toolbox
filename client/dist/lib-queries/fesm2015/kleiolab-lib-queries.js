import { shareReplay, map, switchMap, filter, first, throttleTime, distinctUntilChanged, tap, startWith } from 'rxjs/operators';
import { tag } from 'rxjs-spy/operators';
import { DfhConfig, ProConfig, SysConfig } from '@kleiolab/lib-config';
import { TimeSpanUtil, latestVersion, combineLatestOrEmpty, sortAbc, TimePrimitivePipe, TimeSpanPipe } from '@kleiolab/lib-utils';
import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf, Injectable, ɵɵdefineInjectable, ɵɵinject } from '@angular/core';
import { ReduxModule, datRoot, DatActions, datDefinitions, dfhRoot, DfhActions, dfhDefinitions, infRoot, paginateBy, subfieldIdToString, getFromTo, indexStatementBySubject, indexStatementBySubjectProperty, indexStatementByObject, indexStatementByObjectProperty, infDefinitions, PR_ENTITY_MODEL_MAP, proRoot, ProActions, proDefinitions, sysRoot, SysActions, sysDefinitions, tabRoot, TabActions, tabDefinitions, warRoot, WarActions, warDefinitions, SchemaService, proClassFieldConfgByProjectAndClassKey, textPropertyByFksKey, dfhLabelByFksKey } from '@kleiolab/lib-redux';
import { NgRedux } from '@angular-redux/store';
import { BehaviorSubject, empty, pipe, of, combineLatest, Observable, merge, iif } from 'rxjs';
import { values } from 'd3';
import { equals, toString, values as values$1, indexBy, uniq, flatten, omit } from 'ramda';
import { __decorate, __metadata, __rest } from 'tslib';
import { EntityPreviewSocket } from '@kleiolab/lib-sockets';
import { InfStatement } from '@kleiolab/lib-sdk-lb3';

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/decorators/method-decorators.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function CacheOptions() { }
if (false) {
    /** @type {?} */
    CacheOptions.prototype.refCount;
}
/**
 * Decorator function for methods that take any argument and return an
 * obsevable. Decorated Methods will be extended by a cache:
 * For each call to the method with the same input arguments a cache
 * shareReplay operator is added, acting as a middleman subcribing to
 * the Source (the observable returned by the decorated function) and
 * emtting the latest value. Read more about shareReplay here:
 * https://itnext.io/the-magic-of-rxjs-sharing-operators-and-their-differences-3a03d699d255
 *
 * \@options:
 * @type {?}
 */
const cache = (/**
 * @param {?=} options
 * @return {?}
 */
(options) => (/**
 * @param {?} target
 * @param {?} propertyKey
 * @param {?} descriptor
 * @return {?}
 */
(target, propertyKey, descriptor) => {
    /** @type {?} */
    const o = Object.assign({ refCount: true }, options);
    /** @type {?} */
    const c = new Map();
    /** @type {?} */
    const originalFunction = descriptor.value;
    descriptor.value = (/**
     * @param {...?} request
     * @return {?}
     */
    function (...request) {
        /** @type {?} */
        const uniq = JSON.stringify(request);
        if (!c.has(uniq)) {
            /** @type {?} */
            const boundOriginalFunction = originalFunction.bind(this)
            // const x = target, y = propertyKey;
            ;
            // const x = target, y = propertyKey;
            c.set(uniq, boundOriginalFunction(...request).pipe(shareReplay({ refCount: o.refCount, bufferSize: 1 }), tag(`FROM-CACHE-${target.constructor.name}::${propertyKey}::${request.join(':')}`)));
        }
        return c.get(uniq);
    });
    return descriptor;
}));
/**
 * @param {?} target
 * @param {?} propertyKey
 * @param {?} descriptor
 * @return {?}
 */
function spyTag(target, propertyKey, descriptor) {
    /** @type {?} */
    const originalFunction = descriptor.value;
    descriptor.value = (/**
     * @param {...?} request
     * @return {?}
     */
    function (...request) {
        /** @type {?} */
        const boundOriginalFunction = originalFunction.bind(this);
        return boundOriginalFunction(...request).pipe(tag(`${target.constructor.name}::${propertyKey}::${request.join(':')}`));
    });
    return descriptor;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/functions/functions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} timeSpanItem
 * @return {?}
 */
function timeSpanItemToTimeSpan(timeSpanItem) {
    /** @type {?} */
    const t = new TimeSpanUtil();
    timeSpanItem.properties.forEach((/**
     * @param {?} p
     * @return {?}
     */
    p => {
        /** @type {?} */
        const key = DfhConfig.PROPERTY_PK_TO_EXISTENCE_TIME_KEY[p.listDefinition.property.pkProperty];
        if (p.items && p.items.length)
            t[key] = p.items[0].timePrimitive;
    }));
    return t;
}
/**
 * @param {?} infTimePrim
 * @param {?} cal
 * @return {?}
 */
function infTimePrimToTimePrimWithCal(infTimePrim, cal) {
    return {
        julianDay: infTimePrim.julian_day,
        duration: (/** @type {?} */ (infTimePrim.duration)),
        calendar: cal,
    };
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/models/AppellationItem.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function AppellationItem() { }
if (false) {
    /** @type {?} */
    AppellationItem.prototype.fkClass;
    /** @type {?} */
    AppellationItem.prototype.label;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/models/BasicStatementItem.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function BasicStatementItem() { }
if (false) {
    /** @type {?} */
    BasicStatementItem.prototype.statement;
    /** @type {?|undefined} */
    BasicStatementItem.prototype.isOutgoing;
    /** @type {?|undefined} */
    BasicStatementItem.prototype.error;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/models/ClassAndTypeNode.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function ClassAndTypeNode() { }
if (false) {
    /** @type {?} */
    ClassAndTypeNode.prototype.label;
    /** @type {?} */
    ClassAndTypeNode.prototype.data;
    /** @type {?|undefined} */
    ClassAndTypeNode.prototype.children;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/models/ClassAndTypePk.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function ClassAndTypePk() { }
if (false) {
    /** @type {?} */
    ClassAndTypePk.prototype.pkClass;
    /** @type {?} */
    ClassAndTypePk.prototype.pkType;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/models/ClassAndTypeSelectModel.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function ClassAndTypeSelectModel() { }
if (false) {
    /** @type {?|undefined} */
    ClassAndTypeSelectModel.prototype.classes;
    /** @type {?|undefined} */
    ClassAndTypeSelectModel.prototype.types;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/models/CtrlTimeSpanDialogData.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function CtrlTimeSpanDialogData() { }
if (false) {
    /** @type {?} */
    CtrlTimeSpanDialogData.prototype.timePrimitives;
    /** @type {?|undefined} */
    CtrlTimeSpanDialogData.prototype.beforeCloseCallback;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/models/CtrlTimeSpanDialogResult.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function CtrlTimeSpanDialogResult() { }
if (false) {
    /* Skipping unnamed member:
    72?: InfTimePrimitiveWithCalendar;*/
    /* Skipping unnamed member:
    152?: InfTimePrimitiveWithCalendar;*/
    /* Skipping unnamed member:
    153?: InfTimePrimitiveWithCalendar;*/
    /* Skipping unnamed member:
    71?: InfTimePrimitiveWithCalendar;*/
    /* Skipping unnamed member:
    150?: InfTimePrimitiveWithCalendar;*/
    /* Skipping unnamed member:
    151?: InfTimePrimitiveWithCalendar;*/
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/models/DimensionItem.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function DimensionItem() { }
if (false) {
    /** @type {?} */
    DimensionItem.prototype.fkClass;
    /** @type {?} */
    DimensionItem.prototype.label;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/models/EntityPreviewItem.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function EntityPreviewItem() { }
if (false) {
    /** @type {?} */
    EntityPreviewItem.prototype.preview;
    /** @type {?} */
    EntityPreviewItem.prototype.fkClass;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/models/EntityProperties.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function EntityProperties() { }
if (false) {
    /** @type {?} */
    EntityProperties.prototype.listDefinition;
    /** @type {?} */
    EntityProperties.prototype.items;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/models/Field.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A Field contains all information to create the different GUI's to display and edit
 * statements of an entity.
 *
 * The Fields of an entity depend on the properties of its class. Each Field contains or represents
 * the properties that have the given class as as domain or range and share the same pk_property.
 *
 * Explanation:
 * The identity (uniqueness) of a property is defined by its domain, pk_propery and its range,
 * It is possible that one class has two outgoing properties with the same pk_property but different
 * ranges. The Field then contains both of them.
 *
 * The Subfields (listDefinitions) are then representing only one property with a uniqur domain, pk_propery and range
 * All Subfields of a Field share all properties defined in FieldBase.
 *
 * In practice the Field a wrapper for SubFileds containing all information that is equal amongst all Subfields.
 * @record
 */
function Field() { }
if (false) {
    /** @type {?} */
    Field.prototype.placeOfDisplay;
    /** @type {?|undefined} */
    Field.prototype.fieldConfig;
    /** @type {?} */
    Field.prototype.targetClasses;
    /** @type {?} */
    Field.prototype.allSubfieldsRemovedFromAllProfiles;
    /** @type {?} */
    Field.prototype.isSpecialField;
    /** @type {?} */
    Field.prototype.targets;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/models/FieldBase.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function FieldBase() { }
if (false) {
    /** @type {?} */
    FieldBase.prototype.label;
    /** @type {?} */
    FieldBase.prototype.ontoInfoUrl;
    /** @type {?} */
    FieldBase.prototype.ontoInfoLabel;
    /** @type {?} */
    FieldBase.prototype.property;
    /** @type {?} */
    FieldBase.prototype.isHasTypeField;
    /** @type {?} */
    FieldBase.prototype.isOutgoing;
    /** @type {?} */
    FieldBase.prototype.sourceClass;
    /** @type {?} */
    FieldBase.prototype.sourceClassLabel;
    /** @type {?} */
    FieldBase.prototype.targetMinQuantity;
    /** @type {?} */
    FieldBase.prototype.targetMaxQuantity;
    /** @type {?} */
    FieldBase.prototype.sourceMinQuantity;
    /** @type {?} */
    FieldBase.prototype.sourceMaxQuantity;
    /** @type {?} */
    FieldBase.prototype.identityDefiningForSource;
    /** @type {?} */
    FieldBase.prototype.identityDefiningForTarget;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/models/FieldPosition.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function FieldPosition() { }
if (false) {
    /** @type {?|undefined} */
    FieldPosition.prototype.position;
}
/**
 * @record
 */
function FieldPlaceOfDisplay() { }
if (false) {
    /** @type {?|undefined} */
    FieldPlaceOfDisplay.prototype.basicFields;
    /** @type {?|undefined} */
    FieldPlaceOfDisplay.prototype.specificFields;
    /** @type {?|undefined} */
    FieldPlaceOfDisplay.prototype.hidden;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/models/FieldProperty.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function FieldProperty() { }
if (false) {
    /** @type {?|undefined} */
    FieldProperty.prototype.pkProperty;
    /** @type {?|undefined} */
    FieldProperty.prototype.pkPropertyOfProperty;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/models/FieldTargetClass.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function FieldTargetClass() { }
if (false) {
    /** @type {?} */
    FieldTargetClass.prototype.listType;
    /** @type {?} */
    FieldTargetClass.prototype.targetClass;
    /** @type {?} */
    FieldTargetClass.prototype.targetClassLabel;
    /** @type {?} */
    FieldTargetClass.prototype.removedFromAllProfiles;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/models/Item.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/models/ItemBasics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function ItemBasics() { }
if (false) {
    /** @type {?} */
    ItemBasics.prototype.projRel;
    /** @type {?} */
    ItemBasics.prototype.ordNum;
    /** @type {?} */
    ItemBasics.prototype.label;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/models/ItemList.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/models/ItemType.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/models/LangStringItem.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function LangStringItem() { }
if (false) {
    /** @type {?} */
    LangStringItem.prototype.fkClass;
    /** @type {?} */
    LangStringItem.prototype.label;
    /** @type {?} */
    LangStringItem.prototype.fkLanguage;
    /** @type {?} */
    LangStringItem.prototype.language;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/models/LanguageItem.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function LanguageItem() { }
if (false) {
    /** @type {?} */
    LanguageItem.prototype.fkClass;
    /** @type {?} */
    LanguageItem.prototype.label;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/models/PlaceItem.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function PlaceItem() { }
if (false) {
    /** @type {?} */
    PlaceItem.prototype.fkClass;
    /** @type {?} */
    PlaceItem.prototype.label;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/models/Profiles.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/models/PropertyItemTypeMap.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function PropertyItemTypeMap() { }

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/models/PropertyOption.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function PropertyOption() { }
if (false) {
    /** @type {?} */
    PropertyOption.prototype.propertyFieldKey;
    /** @type {?} */
    PropertyOption.prototype.isOutgoing;
    /** @type {?} */
    PropertyOption.prototype.pk;
    /** @type {?} */
    PropertyOption.prototype.label;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/models/PropertySelectModel.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function PropertySelectModel() { }
if (false) {
    /** @type {?|undefined} */
    PropertySelectModel.prototype.outgoingProperties;
    /** @type {?|undefined} */
    PropertySelectModel.prototype.ingoingProperties;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/models/SpecialFieldType.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/models/StatementItem.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/models/StatementWithTarget.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function SubentitySubfieldPage() { }
if (false) {
    /** @type {?} */
    SubentitySubfieldPage.prototype.subfield;
    /** @type {?} */
    SubentitySubfieldPage.prototype.count;
    /** @type {?} */
    SubentitySubfieldPage.prototype.statements;
}
/**
 * @record
 */
function StatementTargetTimeSpan() { }
if (false) {
    /** @type {?} */
    StatementTargetTimeSpan.prototype.subfields;
    /** @type {?} */
    StatementTargetTimeSpan.prototype.preview;
}
/**
 * @record
 */
function StatementTargetEntity() { }
if (false) {
    /** @type {?} */
    StatementTargetEntity.prototype.pkEntity;
    /** @type {?} */
    StatementTargetEntity.prototype.fkClass;
}
/**
 * @record
 */
function StatementTarget() { }
if (false) {
    /** @type {?} */
    StatementTarget.prototype.statement;
    /** @type {?} */
    StatementTarget.prototype.isOutgoing;
    /** @type {?} */
    StatementTarget.prototype.targetLabel;
    /** @type {?} */
    StatementTarget.prototype.targetClass;
    /** @type {?} */
    StatementTarget.prototype.target;
}
/**
 * @record
 */
function StatementProjRel() { }
if (false) {
    /** @type {?|undefined} */
    StatementProjRel.prototype.projRel;
    /** @type {?} */
    StatementProjRel.prototype.ordNum;
}
/**
 * @record
 */
function SubfieldPage() { }
if (false) {
    /** @type {?} */
    SubfieldPage.prototype.statements;
    /** @type {?} */
    SubfieldPage.prototype.count;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/models/Subfield.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A Subfiel contains contains information to create the different GUI's to display and edit
 * statements of an entity.
 *
 * Each Subfield stands for one property with a unique domain, pk_propery and range.
 *
 * Since the display of the statement and its target value depends on the target class, the Subfield
 * has a SubfieldType. This SubfieldType determines what components are used to create, edit or display
 * the statement and its target.
 * @record
 */
function Subfield() { }
if (false) {
    /** @type {?} */
    Subfield.prototype.listType;
    /** @type {?} */
    Subfield.prototype.targetClass;
    /** @type {?} */
    Subfield.prototype.targetClassLabel;
    /** @type {?} */
    Subfield.prototype.removedFromAllProfiles;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/models/TemporalEntityCell.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function TemporalEntityCell() { }
if (false) {
    /** @type {?} */
    TemporalEntityCell.prototype.pkProperty;
    /** @type {?} */
    TemporalEntityCell.prototype.isOutgoing;
    /** @type {?} */
    TemporalEntityCell.prototype.label;
    /** @type {?} */
    TemporalEntityCell.prototype.entityPreview;
    /** @type {?|undefined} */
    TemporalEntityCell.prototype.items;
    /** @type {?|undefined} */
    TemporalEntityCell.prototype.firstItem;
    /** @type {?} */
    TemporalEntityCell.prototype.itemsCount;
    /** @type {?|undefined} */
    TemporalEntityCell.prototype.isTimeSpan;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/models/TemporalEntityItem.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function TemporalEntityItem() { }
if (false) {
    /** @type {?} */
    TemporalEntityItem.prototype.row;
    /** @type {?} */
    TemporalEntityItem.prototype.pkEntity;
    /** @type {?} */
    TemporalEntityItem.prototype.teEnProjRel;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/models/TemporalEntityRemoveProperties.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This interface is used for creating objects containing all the
 * information related to a temporal entity that should be removed
 * from project, when the temporal entity is removed
 * @record
 */
function TemporalEntityRemoveProperties() { }
if (false) {
    /** @type {?} */
    TemporalEntityRemoveProperties.prototype.temporalEntity;
    /** @type {?} */
    TemporalEntityRemoveProperties.prototype.statements;
    /** @type {?} */
    TemporalEntityRemoveProperties.prototype.textProperties;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/models/TemporalEntityRow.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function TemporalEntityRow() { }

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/models/TemporalEntityTableI.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function TemporalEntityTableI() { }
if (false) {
    /** @type {?} */
    TemporalEntityTableI.prototype.rows$;
    /** @type {?} */
    TemporalEntityTableI.prototype.columns$;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/models/TextPropertyItem.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function TextPropertyItem() { }
if (false) {
    /** @type {?} */
    TextPropertyItem.prototype.textProperty;
    /** @type {?} */
    TextPropertyItem.prototype.language;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/models/TimePrimitiveItem.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function TimePrimitiveItem() { }
if (false) {
    /** @type {?} */
    TimePrimitiveItem.prototype.fkClass;
    /** @type {?} */
    TimePrimitiveItem.prototype.label;
    /** @type {?} */
    TimePrimitiveItem.prototype.timePrimitive;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/models/TimeSpanItem.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function TimeSpanItem() { }
if (false) {
    /** @type {?} */
    TimeSpanItem.prototype.label;
    /** @type {?} */
    TimeSpanItem.prototype.properties;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/models/TimeSpanProperty.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function TimeSpanProperty() { }
if (false) {
    /** @type {?} */
    TimeSpanProperty.prototype.listDefinition;
    /** @type {?} */
    TimeSpanProperty.prototype.items;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/module/redux-queries.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ReduxQueriesModule {
    /**
     * @param {?} parentModule
     * @param {?} reduxModule
     */
    constructor(parentModule, reduxModule) {
        /** @type {?} */
        const errors = [];
        if (parentModule)
            errors.push('ReduxQueriesModule is already loaded. Import in your base AppModule only.');
        if (!reduxModule)
            errors.push('You need to import the ReduxModule in your AppModule!');
        if (errors.length)
            throw new Error(errors.join('\n'));
    }
}
ReduxQueriesModule.decorators = [
    { type: NgModule, args: [{
                declarations: [],
                imports: [
                    CommonModule,
                ],
                providers: []
            },] }
];
/** @nocollapse */
ReduxQueriesModule.ctorParameters = () => [
    { type: ReduxQueriesModule, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: ReduxModule, decorators: [{ type: Optional }] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/selectors/dat.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Selector {
    /**
     * @param {?} ngRedux
     * @param {?} configs
     * @param {?} model
     */
    constructor(ngRedux, configs, model) {
        this.ngRedux = ngRedux;
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
        const all$ = this.ngRedux.select([datRoot, this.model, indexKey])
        // .pipe(
        //   distinctUntilChanged<M>(equals)
        // )
        ;
        // .pipe(
        //   distinctUntilChanged<M>(equals)
        // )
        /** @type {?} */
        const key = (/**
         * @param {?} x
         * @return {?}
         */
        (x) => this.ngRedux.select([datRoot, this.model, indexKey, x]))
        // .pipe(
        //   distinctUntilChanged<M>(equals)
        // )
        ;
        // .pipe(
        //   distinctUntilChanged<M>(equals)
        // )
        return { all$, key };
    }
}
if (false) {
    /** @type {?} */
    Selector.prototype.ngRedux;
    /** @type {?} */
    Selector.prototype.configs;
    /** @type {?} */
    Selector.prototype.model;
}
class DatDigitalSelections extends Selector {
    /**
     * @param {?} ngRedux
     * @param {?} configs
     * @param {?} model
     */
    constructor(ngRedux, configs, model) {
        super(ngRedux, configs, model);
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
        this.by_pk_entity__entity_version$ = this.selector('by_pk_entity__entity_version');
        this.by_pk_entity$ = this.selector('by_pk_entity');
        this.by_pk_text$ = this.selector('by_pk_text');
    }
    /**
     * @param {?} pkDigital
     * @return {?}
     */
    latestVersion(pkDigital) {
        return this.by_pk_entity$.key(pkDigital).pipe(map((/**
         * @param {?} versions
         * @return {?}
         */
        versions => latestVersion(versions))));
    }
}
if (false) {
    /** @type {?} */
    DatDigitalSelections.prototype.by_pk_entity__entity_version$;
    /** @type {?} */
    DatDigitalSelections.prototype.by_pk_entity$;
    /** @type {?} */
    DatDigitalSelections.prototype.by_pk_text$;
    /** @type {?} */
    DatDigitalSelections.prototype.ngRedux;
    /** @type {?} */
    DatDigitalSelections.prototype.configs;
    /** @type {?} */
    DatDigitalSelections.prototype.model;
}
class DatNamespaceSelections extends Selector {
    /**
     * @param {?} ngRedux
     * @param {?} configs
     * @param {?} model
     */
    constructor(ngRedux, configs, model) {
        super(ngRedux, configs, model);
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
        this.by_pk_entity$ = this.selector('by_pk_entity');
        this.by_fk_project$ = this.selector('by_fk_project');
    }
}
if (false) {
    /** @type {?} */
    DatNamespaceSelections.prototype.by_pk_entity$;
    /** @type {?} */
    DatNamespaceSelections.prototype.by_fk_project$;
    /** @type {?} */
    DatNamespaceSelections.prototype.ngRedux;
    /** @type {?} */
    DatNamespaceSelections.prototype.configs;
    /** @type {?} */
    DatNamespaceSelections.prototype.model;
}
class DatChunkSelections extends Selector {
    /**
     * @param {?} ngRedux
     * @param {?} configs
     * @param {?} model
     */
    constructor(ngRedux, configs, model) {
        super(ngRedux, configs, model);
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
        this.by_pk_entity$ = this.selector('by_pk_entity');
        this.by_fk_text$ = this.selector('by_fk_text');
    }
}
if (false) {
    /** @type {?} */
    DatChunkSelections.prototype.by_pk_entity$;
    /** @type {?} */
    DatChunkSelections.prototype.by_fk_text$;
    /** @type {?} */
    DatChunkSelections.prototype.ngRedux;
    /** @type {?} */
    DatChunkSelections.prototype.configs;
    /** @type {?} */
    DatChunkSelections.prototype.model;
}
class DatClassColumnMappingSelections extends Selector {
    /**
     * @param {?} ngRedux
     * @param {?} configs
     * @param {?} model
     */
    constructor(ngRedux, configs, model) {
        super(ngRedux, configs, model);
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
        this.by_pk_entity$ = this.selector('by_pk_entity');
        this.by_fk_column$ = this.selector('by_fk_column');
    }
}
if (false) {
    /** @type {?} */
    DatClassColumnMappingSelections.prototype.by_pk_entity$;
    /** @type {?} */
    DatClassColumnMappingSelections.prototype.by_fk_column$;
    /** @type {?} */
    DatClassColumnMappingSelections.prototype.ngRedux;
    /** @type {?} */
    DatClassColumnMappingSelections.prototype.configs;
    /** @type {?} */
    DatClassColumnMappingSelections.prototype.model;
}
class DatColumnSelections extends Selector {
    /**
     * @param {?} ngRedux
     * @param {?} configs
     * @param {?} model
     */
    constructor(ngRedux, configs, model) {
        super(ngRedux, configs, model);
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
        this.by_pk_entity$ = this.selector('by_pk_entity');
        this.by_fk_digital$ = this.selector('by_fk_digital');
    }
}
if (false) {
    /** @type {?} */
    DatColumnSelections.prototype.by_pk_entity$;
    /** @type {?} */
    DatColumnSelections.prototype.by_fk_digital$;
    /** @type {?} */
    DatColumnSelections.prototype.ngRedux;
    /** @type {?} */
    DatColumnSelections.prototype.configs;
    /** @type {?} */
    DatColumnSelections.prototype.model;
}
class DatTextPropertySelections extends Selector {
    /**
     * @param {?} ngRedux
     * @param {?} configs
     * @param {?} model
     */
    constructor(ngRedux, configs, model) {
        super(ngRedux, configs, model);
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
        this.by_pk_entity$ = this.selector('by_pk_entity');
        this.by_fk_entity__fk_system_type$ = this.selector('by_fk_entity__fk_system_type');
    }
}
if (false) {
    /** @type {?} */
    DatTextPropertySelections.prototype.by_pk_entity$;
    /** @type {?} */
    DatTextPropertySelections.prototype.by_fk_entity__fk_system_type$;
    /** @type {?} */
    DatTextPropertySelections.prototype.ngRedux;
    /** @type {?} */
    DatTextPropertySelections.prototype.configs;
    /** @type {?} */
    DatTextPropertySelections.prototype.model;
}
class DatSelector extends DatActions {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
        this.digital$ = new DatDigitalSelections(this.ngRedux, datDefinitions, 'digital');
        this.namespace$ = new DatNamespaceSelections(this.ngRedux, datDefinitions, 'namespace');
        this.chunk$ = new DatChunkSelections(this.ngRedux, datDefinitions, 'chunk');
        this.column$ = new DatColumnSelections(this.ngRedux, datDefinitions, 'column');
        this.class_column_mapping$ = new DatClassColumnMappingSelections(this.ngRedux, datDefinitions, 'class_column_mapping');
        this.text_property$ = new DatTextPropertySelections(this.ngRedux, datDefinitions, 'text_property');
    }
}
DatSelector.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
DatSelector.ctorParameters = () => [
    { type: NgRedux }
];
/** @nocollapse */ DatSelector.ngInjectableDef = ɵɵdefineInjectable({ factory: function DatSelector_Factory() { return new DatSelector(ɵɵinject(NgRedux)); }, token: DatSelector, providedIn: "root" });
if (false) {
    /** @type {?} */
    DatSelector.prototype.digital$;
    /** @type {?} */
    DatSelector.prototype.namespace$;
    /** @type {?} */
    DatSelector.prototype.chunk$;
    /** @type {?} */
    DatSelector.prototype.column$;
    /** @type {?} */
    DatSelector.prototype.class_column_mapping$;
    /** @type {?} */
    DatSelector.prototype.text_property$;
    /** @type {?} */
    DatSelector.prototype.ngRedux;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/services/should-pause.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ShouldPauseService {
    constructor() {
        this.shouldPause$ = new BehaviorSubject(false);
    }
}
ShouldPauseService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
ShouldPauseService.ctorParameters = () => [];
/** @nocollapse */ ShouldPauseService.ngInjectableDef = ɵɵdefineInjectable({ factory: function ShouldPauseService_Factory() { return new ShouldPauseService(); }, token: ShouldPauseService, providedIn: "root" });
if (false) {
    /** @type {?} */
    ShouldPauseService.prototype.shouldPause$;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/selectors/dfh.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template Slice
 */
class Selector$1 {
    /**
     * @param {?} ngRedux
     * @param {?} configs
     * @param {?} model
     * @param {?} shouldPause$
     */
    constructor(ngRedux, configs, model, shouldPause$) {
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
        this.shouldPause$ = shouldPause$;
        this.slice$ = this.ngRedux.select([dfhRoot, this.model]);
    }
    /**
     * @template M
     * @param {?} indexKey
     * @return {?}
     */
    selector(indexKey) {
        /** @type {?} */
        const allNoPause$ = this.ngRedux.select([dfhRoot, this.model, indexKey]);
        /** @type {?} */
        const all$ = this.shouldPause$.pipe(switchMap((/**
         * @param {?} shouldPause
         * @return {?}
         */
        shouldPause => shouldPause ?
            empty() :
            allNoPause$)));
        /** @type {?} */
        const keyNoPause = (/**
         * @param {?} x
         * @return {?}
         */
        (x) => this.ngRedux.select([dfhRoot, this.model, indexKey, x]));
        /** @type {?} */
        const key = (/**
         * @param {?} x
         * @return {?}
         */
        (x) => this.shouldPause$.pipe(switchMap((/**
         * @param {?} shouldPause
         * @return {?}
         */
        shouldPause => shouldPause ?
            empty() :
            this.ngRedux.select([dfhRoot, this.model, indexKey, x])))));
        return { all$, key, noPause: { all$: allNoPause$, key: keyNoPause } };
    }
}
if (false) {
    /** @type {?} */
    Selector$1.prototype.slice$;
    /** @type {?} */
    Selector$1.prototype.ngRedux;
    /** @type {?} */
    Selector$1.prototype.configs;
    /** @type {?} */
    Selector$1.prototype.model;
    /** @type {?} */
    Selector$1.prototype.shouldPause$;
}
// Profile Selectors
class DfhProfileSelections extends Selector$1 {
    constructor() {
        super(...arguments);
        this.by_pk_profile$ = this.selector('by_pk_profile');
    }
}
if (false) {
    /** @type {?} */
    DfhProfileSelections.prototype.by_pk_profile$;
}
// Class Selectors
class DfhClassSelections extends Selector$1 {
    constructor() {
        super(...arguments);
        this.by_pk_class$ = this.selector('by_pk_class');
        this.by_basic_type$ = this.selector('by_basic_type');
    }
}
if (false) {
    /** @type {?} */
    DfhClassSelections.prototype.by_pk_class$;
    /** @type {?} */
    DfhClassSelections.prototype.by_basic_type$;
}
// Property Selectors
class DfhPropertySelections extends Selector$1 {
    constructor() {
        super(...arguments);
        this.pk_property__has_domain__has_range$ = this.selector('by_pk_property__has_domain__has_range');
        this.by_pk_property$ = this.selector('by_pk_property');
        // public by_has_domain__pk_property$ = this.selector<ByPk<DfhProperty>>('by_has_domain__fk_property');
        // public by_has_range__pk_property$ = this.selector<ByPk<DfhProperty>>('by_has_range__fk_property');
        this.by_has_domain$ = this.selector('by_has_domain');
        this.by_has_range$ = this.selector('by_has_range');
        this.by_is_has_type_subproperty$ = this.selector('by_is_has_type_subproperty');
    }
}
if (false) {
    /** @type {?} */
    DfhPropertySelections.prototype.pk_property__has_domain__has_range$;
    /** @type {?} */
    DfhPropertySelections.prototype.by_pk_property$;
    /** @type {?} */
    DfhPropertySelections.prototype.by_has_domain$;
    /** @type {?} */
    DfhPropertySelections.prototype.by_has_range$;
    /** @type {?} */
    DfhPropertySelections.prototype.by_is_has_type_subproperty$;
}
// Label Selectors
class DfhLabelSelections extends Selector$1 {
    constructor() {
        super(...arguments);
        this.by_fks$ = this.selector('by_fks');
        this.by_fk_class__type$ = this.selector('by_fk_class__type');
        this.by_fk_property__type$ = this.selector('by_fk_property__type');
        this.by_fk_profile__type$ = this.selector('by_fk_profile__type');
    }
}
if (false) {
    /** @type {?} */
    DfhLabelSelections.prototype.by_fks$;
    /** @type {?} */
    DfhLabelSelections.prototype.by_fk_class__type$;
    /** @type {?} */
    DfhLabelSelections.prototype.by_fk_property__type$;
    /** @type {?} */
    DfhLabelSelections.prototype.by_fk_profile__type$;
}
class DfhSelector extends DfhActions {
    /**
     * @param {?} ngRedux
     * @param {?} pause
     */
    constructor(ngRedux, pause) {
        super(ngRedux);
        this.ngRedux = ngRedux;
        this.pause = pause;
        this.profile$ = new DfhProfileSelections(this.ngRedux, dfhDefinitions, 'profile', this.pause.shouldPause$);
        this.class$ = new DfhClassSelections(this.ngRedux, dfhDefinitions, 'klass', this.pause.shouldPause$);
        this.property$ = new DfhPropertySelections(this.ngRedux, dfhDefinitions, 'property', this.pause.shouldPause$);
        this.label$ = new DfhLabelSelections(this.ngRedux, dfhDefinitions, 'label', this.pause.shouldPause$);
    }
}
DfhSelector.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
DfhSelector.ctorParameters = () => [
    { type: NgRedux },
    { type: ShouldPauseService }
];
/** @nocollapse */ DfhSelector.ngInjectableDef = ɵɵdefineInjectable({ factory: function DfhSelector_Factory() { return new DfhSelector(ɵɵinject(NgRedux), ɵɵinject(ShouldPauseService)); }, token: DfhSelector, providedIn: "root" });
if (false) {
    /** @type {?} */
    DfhSelector.prototype.profile$;
    /** @type {?} */
    DfhSelector.prototype.class$;
    /** @type {?} */
    DfhSelector.prototype.property$;
    /** @type {?} */
    DfhSelector.prototype.label$;
    /** @type {?} */
    DfhSelector.prototype.ngRedux;
    /** @type {?} */
    DfhSelector.prototype.pause;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/selectors/inf.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Selector$2 {
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
    Selector$2.prototype.ngRedux;
    /** @type {?} */
    Selector$2.prototype.pkProject$;
    /** @type {?} */
    Selector$2.prototype.configs;
    /** @type {?} */
    Selector$2.prototype.model;
}
class InfPersistentItemSelections extends Selector$2 {
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
class InfTemporalEntitySelections extends Selector$2 {
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
class InfStatementSelections extends Selector$2 {
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
class InfTextPropertySelections extends Selector$2 {
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
class InfAppellationSelections extends Selector$2 {
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
class InfLangStringSelections extends Selector$2 {
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
class InfPlaceSelections extends Selector$2 {
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
class InfTimePrimitiveSelections extends Selector$2 {
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
class InfLanguageSelections extends Selector$2 {
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
class InfDimensionSelections extends Selector$2 {
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
class InfSelector {
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

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/selectors/pro.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Selector$3 {
    /**
     * @param {?} ngRedux
     * @param {?} configs
     * @param {?} model
     */
    constructor(ngRedux, configs, model) {
        this.ngRedux = ngRedux;
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
        const all$ = this.ngRedux.select([proRoot, this.model, indexKey]);
        /** @type {?} */
        const key = (/**
         * @param {?} x
         * @return {?}
         */
        (x) => {
            /** @type {?} */
            const k = typeof x === 'string' ? x : x.map((/**
             * @param {?} part
             * @return {?}
             */
            (part) => toString(part))).join('_');
            ;
            return this.ngRedux.select([proRoot, this.model, indexKey, k]);
        });
        return { all$, key };
    }
}
if (false) {
    /** @type {?} */
    Selector$3.prototype.ngRedux;
    /** @type {?} */
    Selector$3.prototype.configs;
    /** @type {?} */
    Selector$3.prototype.model;
}
class ProProjectSelector extends Selector$3 {
    /**
     * @param {?} ngRedux
     * @param {?} configs
     * @param {?} model
     */
    constructor(ngRedux, configs, model) {
        super(ngRedux, configs, model);
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
        this.by_pk_entity$ = this.selector('by_pk_entity');
    }
}
if (false) {
    /** @type {?} */
    ProProjectSelector.prototype.by_pk_entity$;
    /** @type {?} */
    ProProjectSelector.prototype.ngRedux;
    /** @type {?} */
    ProProjectSelector.prototype.configs;
    /** @type {?} */
    ProProjectSelector.prototype.model;
}
class ProInfoProjRelSelector extends Selector$3 {
    /**
     * @param {?} ngRedux
     * @param {?} configs
     * @param {?} model
     */
    constructor(ngRedux, configs, model) {
        super(ngRedux, configs, model);
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
        this.by_fk_project__fk_entity$ = this.selector('by_fk_project__fk_entity');
    }
}
if (false) {
    /** @type {?} */
    ProInfoProjRelSelector.prototype.by_fk_project__fk_entity$;
    /** @type {?} */
    ProInfoProjRelSelector.prototype.ngRedux;
    /** @type {?} */
    ProInfoProjRelSelector.prototype.configs;
    /** @type {?} */
    ProInfoProjRelSelector.prototype.model;
}
class ProDfhClassProjRelSelector extends Selector$3 {
    /**
     * @param {?} ngRedux
     * @param {?} configs
     * @param {?} model
     */
    constructor(ngRedux, configs, model) {
        super(ngRedux, configs, model);
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
        this.by_fk_project__enabled_in_entities$ = this.selector('by_fk_project__enabled_in_entities');
        this.by_fk_project__fk_class$ = this.selector('by_fk_project__fk_class');
        this.by_fk_project$ = this.selector('by_fk_project');
    }
}
if (false) {
    /** @type {?} */
    ProDfhClassProjRelSelector.prototype.by_fk_project__enabled_in_entities$;
    /** @type {?} */
    ProDfhClassProjRelSelector.prototype.by_fk_project__fk_class$;
    /** @type {?} */
    ProDfhClassProjRelSelector.prototype.by_fk_project$;
    /** @type {?} */
    ProDfhClassProjRelSelector.prototype.ngRedux;
    /** @type {?} */
    ProDfhClassProjRelSelector.prototype.configs;
    /** @type {?} */
    ProDfhClassProjRelSelector.prototype.model;
}
class ProDfhProfileProjRelSelector extends Selector$3 {
    /**
     * @param {?} ngRedux
     * @param {?} configs
     * @param {?} model
     */
    constructor(ngRedux, configs, model) {
        super(ngRedux, configs, model);
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
        this.by_fk_project__enabled$ = this.selector('by_fk_project__enabled');
        this.by_fk_project__fk_profile$ = this.selector('by_fk_project__fk_profile');
        this.by_fk_project$ = this.selector('by_fk_project');
    }
}
if (false) {
    /** @type {?} */
    ProDfhProfileProjRelSelector.prototype.by_fk_project__enabled$;
    /** @type {?} */
    ProDfhProfileProjRelSelector.prototype.by_fk_project__fk_profile$;
    /** @type {?} */
    ProDfhProfileProjRelSelector.prototype.by_fk_project$;
    /** @type {?} */
    ProDfhProfileProjRelSelector.prototype.ngRedux;
    /** @type {?} */
    ProDfhProfileProjRelSelector.prototype.configs;
    /** @type {?} */
    ProDfhProfileProjRelSelector.prototype.model;
}
class ProClassFieldConfigSelector extends Selector$3 {
    /**
     * @param {?} ngRedux
     * @param {?} configs
     * @param {?} model
     */
    constructor(ngRedux, configs, model) {
        super(ngRedux, configs, model);
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
        this.by_fk_project__fk_class$ = this.selector('by_fk_project__fk_class');
        this.by_pk_entity$ = this.selector('by_pk_entity');
    }
}
if (false) {
    /** @type {?} */
    ProClassFieldConfigSelector.prototype.by_fk_project__fk_class$;
    /** @type {?} */
    ProClassFieldConfigSelector.prototype.by_pk_entity$;
    /** @type {?} */
    ProClassFieldConfigSelector.prototype.ngRedux;
    /** @type {?} */
    ProClassFieldConfigSelector.prototype.configs;
    /** @type {?} */
    ProClassFieldConfigSelector.prototype.model;
}
class ProTextPropertySelector extends Selector$3 {
    // public fk_project__fk_dfh_property__fk_dfh_property_domain__fk_system_type__fk_language$ = this.selector<ByPk<ProTextProperty>>('fk_project__fk_dfh_property__fk_dfh_property_domain__fk_system_type__fk_language')
    // public fk_project__fk_dfh_property__fk_dfh_property_range__fk_system_type__fk_language$ = this.selector<ByPk<ProTextProperty>>('fk_project__fk_dfh_property__fk_dfh_property_range__fk_system_type__fk_language')
    /**
     * @param {?} ngRedux
     * @param {?} configs
     * @param {?} model
     */
    constructor(ngRedux, configs, model) {
        super(ngRedux, configs, model);
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
        this.by_fks$ = this.selector('by_fks');
        this.by_fks_without_lang$ = this.selector('by_fks_without_lang');
    }
}
if (false) {
    /** @type {?} */
    ProTextPropertySelector.prototype.by_fks$;
    /** @type {?} */
    ProTextPropertySelector.prototype.by_fks_without_lang$;
    /** @type {?} */
    ProTextPropertySelector.prototype.ngRedux;
    /** @type {?} */
    ProTextPropertySelector.prototype.configs;
    /** @type {?} */
    ProTextPropertySelector.prototype.model;
}
class ProAnalysisSelector extends Selector$3 {
    /**
     * @param {?} ngRedux
     * @param {?} configs
     * @param {?} model
     */
    constructor(ngRedux, configs, model) {
        super(ngRedux, configs, model);
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
        this.by_pk_entity$ = this.selector('by_pk_entity');
    }
}
if (false) {
    /** @type {?} */
    ProAnalysisSelector.prototype.by_pk_entity$;
    /** @type {?} */
    ProAnalysisSelector.prototype.ngRedux;
    /** @type {?} */
    ProAnalysisSelector.prototype.configs;
    /** @type {?} */
    ProAnalysisSelector.prototype.model;
}
class ProSelector extends ProActions {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
        this.project$ = new ProProjectSelector(this.ngRedux, proDefinitions, 'project');
        this.info_proj_rel$ = new ProInfoProjRelSelector(this.ngRedux, proDefinitions, 'info_proj_rel');
        this.dfh_class_proj_rel$ = new ProDfhClassProjRelSelector(this.ngRedux, proDefinitions, 'dfh_class_proj_rel');
        this.dfh_profile_proj_rel$ = new ProDfhProfileProjRelSelector(this.ngRedux, proDefinitions, 'dfh_profile_proj_rel');
        this.class_field_config$ = new ProClassFieldConfigSelector(this.ngRedux, proDefinitions, 'class_field_config');
        this.text_property$ = new ProTextPropertySelector(this.ngRedux, proDefinitions, 'text_property');
        this.analysis$ = new ProAnalysisSelector(this.ngRedux, proDefinitions, 'analysis');
    }
}
ProSelector.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
ProSelector.ctorParameters = () => [
    { type: NgRedux }
];
/** @nocollapse */ ProSelector.ngInjectableDef = ɵɵdefineInjectable({ factory: function ProSelector_Factory() { return new ProSelector(ɵɵinject(NgRedux)); }, token: ProSelector, providedIn: "root" });
if (false) {
    /** @type {?} */
    ProSelector.prototype.project$;
    /** @type {?} */
    ProSelector.prototype.info_proj_rel$;
    /** @type {?} */
    ProSelector.prototype.dfh_class_proj_rel$;
    /** @type {?} */
    ProSelector.prototype.dfh_profile_proj_rel$;
    /** @type {?} */
    ProSelector.prototype.class_field_config$;
    /** @type {?} */
    ProSelector.prototype.text_property$;
    /** @type {?} */
    ProSelector.prototype.analysis$;
    /** @type {?} */
    ProSelector.prototype.ngRedux;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/selectors/sys.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template Slice
 */
class Selector$4 {
    /**
     * @param {?} ngRedux
     * @param {?} configs
     * @param {?} model
     */
    constructor(ngRedux, configs, model) {
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
        this.slice$ = this.ngRedux.select([sysRoot, this.model]);
    }
    /**
     * @template M
     * @param {?} indexKey
     * @return {?}
     */
    selector(indexKey) {
        /** @type {?} */
        const all$ = this.ngRedux.select([sysRoot, this.model, indexKey]);
        /** @type {?} */
        const key = (/**
         * @param {?} x
         * @return {?}
         */
        (x) => this.ngRedux.select([sysRoot, this.model, indexKey, x]));
        return { all$, key };
    }
}
if (false) {
    /** @type {?} */
    Selector$4.prototype.slice$;
    /** @type {?} */
    Selector$4.prototype.ngRedux;
    /** @type {?} */
    Selector$4.prototype.configs;
    /** @type {?} */
    Selector$4.prototype.model;
}
// SystemRelevantClass Selectors
class SysSystemRelevantClassSelections extends Selector$4 {
    /**
     * @param {?} ngRedux
     * @param {?} configs
     * @param {?} model
     */
    constructor(ngRedux, configs, model) {
        super(ngRedux, configs, model);
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
        this.by_pk_entity$ = this.selector('by_pk_entity');
        this.by_fk_class$ = this.selector('by_fk_class');
        this.by_required_by_sources$ = this.selector('by_required_by_sources');
        this.by_required$ = this.selector('by_required');
    }
}
if (false) {
    /** @type {?} */
    SysSystemRelevantClassSelections.prototype.by_pk_entity$;
    /** @type {?} */
    SysSystemRelevantClassSelections.prototype.by_fk_class$;
    /** @type {?} */
    SysSystemRelevantClassSelections.prototype.by_required_by_sources$;
    /** @type {?} */
    SysSystemRelevantClassSelections.prototype.by_required$;
    /** @type {?} */
    SysSystemRelevantClassSelections.prototype.ngRedux;
    /** @type {?} */
    SysSystemRelevantClassSelections.prototype.configs;
    /** @type {?} */
    SysSystemRelevantClassSelections.prototype.model;
}
// // AnalysisType Selectors
// class SysAnalysisTypeSelections extends Selector<SysAnalysisTypeSlice> {
//   public by_pk_entity$ = this.selector<SysAnalysisType>('by_pk_entity');
//   constructor(
//     public ngRedux: NgRedux<IAppState>,
//     public configs: ReducerConfigCollection,
//     public model: string
//   ) { super(ngRedux, configs, model) }
// }
// Config Selectors
class SysConfigSelections extends Selector$4 {
    /**
     * @param {?} ngRedux
     * @param {?} configs
     * @param {?} model
     */
    constructor(ngRedux, configs, model) {
        super(ngRedux, configs, model);
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
        this.main$ = this.ngRedux.select([sysRoot, this.model, 'by_main', 'main']);
    }
}
if (false) {
    /** @type {?} */
    SysConfigSelections.prototype.main$;
    /** @type {?} */
    SysConfigSelections.prototype.ngRedux;
    /** @type {?} */
    SysConfigSelections.prototype.configs;
    /** @type {?} */
    SysConfigSelections.prototype.model;
}
class SysSelector extends SysActions {
    constructor() {
        super(...arguments);
        this.system_relevant_class$ = new SysSystemRelevantClassSelections(this.ngRedux, sysDefinitions, 'system_relevant_class');
        // analysis_type$ = new SysAnalysisTypeSelections(this.ngRedux, sysDefinitions, 'analysis_type')
        this.config$ = new SysConfigSelections(this.ngRedux, sysDefinitions, 'config');
    }
}
SysSelector.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */ SysSelector.ngInjectableDef = ɵɵdefineInjectable({ factory: function SysSelector_Factory() { return new SysSelector(ɵɵinject(NgRedux)); }, token: SysSelector, providedIn: "root" });
if (false) {
    /** @type {?} */
    SysSelector.prototype.system_relevant_class$;
    /** @type {?} */
    SysSelector.prototype.config$;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/selectors/tab.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Selector$5 {
    /**
     * @param {?} ngRedux
     * @param {?} configs
     * @param {?} model
     */
    constructor(ngRedux, configs, model) {
        this.ngRedux = ngRedux;
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
        const all$ = this.ngRedux.select([tabRoot, this.model, indexKey]);
        /** @type {?} */
        const key = (/**
         * @param {?} x
         * @return {?}
         */
        (x) => this.ngRedux.select([tabRoot, this.model, indexKey, x]));
        return { all$, key };
    }
}
if (false) {
    /** @type {?} */
    Selector$5.prototype.ngRedux;
    /** @type {?} */
    Selector$5.prototype.configs;
    /** @type {?} */
    Selector$5.prototype.model;
}
class TabCellSelections extends Selector$5 {
    /**
     * @param {?} ngRedux
     * @param {?} configs
     * @param {?} model
     */
    constructor(ngRedux, configs, model) {
        super(ngRedux, configs, model);
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
        this.by_pk_cell$ = this.selector('by_pk_cell');
        this.by_fk_column_fk_row$ = this.selector('by_fk_column_fk_row');
    }
}
if (false) {
    /** @type {?} */
    TabCellSelections.prototype.by_pk_cell$;
    /** @type {?} */
    TabCellSelections.prototype.by_fk_column_fk_row$;
    /** @type {?} */
    TabCellSelections.prototype.ngRedux;
    /** @type {?} */
    TabCellSelections.prototype.configs;
    /** @type {?} */
    TabCellSelections.prototype.model;
}
class TabSelector extends TabActions {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
        this.cell$ = new TabCellSelections(this.ngRedux, tabDefinitions, 'cell');
    }
}
TabSelector.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
TabSelector.ctorParameters = () => [
    { type: NgRedux }
];
/** @nocollapse */ TabSelector.ngInjectableDef = ɵɵdefineInjectable({ factory: function TabSelector_Factory() { return new TabSelector(ɵɵinject(NgRedux)); }, token: TabSelector, providedIn: "root" });
if (false) {
    /** @type {?} */
    TabSelector.prototype.cell$;
    /** @type {?} */
    TabSelector.prototype.ngRedux;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/selectors/war.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Selector$6 {
    /**
     * @param {?} ngRedux
     * @param {?} configs
     * @param {?} model
     */
    constructor(ngRedux, configs, model) {
        this.ngRedux = ngRedux;
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
        const all$ = this.ngRedux.select([warRoot, this.model, indexKey]);
        /** @type {?} */
        const key = (/**
         * @param {?} x
         * @return {?}
         */
        (x) => {
            /** @type {?} */
            const k = typeof x === 'string' ? x : x.map((/**
             * @param {?} part
             * @return {?}
             */
            (part) => toString(part))).join('_');
            ;
            return this.ngRedux.select([warRoot, this.model, indexKey, k]);
        });
        return { all$, key };
    }
}
if (false) {
    /** @type {?} */
    Selector$6.prototype.ngRedux;
    /** @type {?} */
    Selector$6.prototype.configs;
    /** @type {?} */
    Selector$6.prototype.model;
}
class WarEntityPreviewSelector extends Selector$6 {
    /**
     * @param {?} ngRedux
     * @param {?} configs
     * @param {?} model
     */
    constructor(ngRedux, configs, model) {
        super(ngRedux, configs, model);
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
        this.by_pk_entity$ = this.selector('by_pk_entity');
    }
}
if (false) {
    /** @type {?} */
    WarEntityPreviewSelector.prototype.by_pk_entity$;
    /** @type {?} */
    WarEntityPreviewSelector.prototype.ngRedux;
    /** @type {?} */
    WarEntityPreviewSelector.prototype.configs;
    /** @type {?} */
    WarEntityPreviewSelector.prototype.model;
}
class WarSelector extends WarActions {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
        this.entity_preview$ = new WarEntityPreviewSelector(this.ngRedux, warDefinitions, 'entity_preview');
    }
}
WarSelector.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
WarSelector.ctorParameters = () => [
    { type: NgRedux }
];
/** @nocollapse */ WarSelector.ngInjectableDef = ɵɵdefineInjectable({ factory: function WarSelector_Factory() { return new WarSelector(ɵɵinject(NgRedux)); }, token: WarSelector, providedIn: "root" });
if (false) {
    /** @type {?} */
    WarSelector.prototype.entity_preview$;
    /** @type {?} */
    WarSelector.prototype.ngRedux;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/services/schema-selectors.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This class provides access to the part of the redux store
 * that mirrors the geovistory schema (inf, dat, sys, etc.)
 *
 * The selecors of inf are wrapped into helpers that select
 * the items that are in the current project (redux.activeProject)
 * using pro.info_proj_rel
 *
 * All other selectors (dat, sys, tab, pro, dfh) are directly
 * accessing the store.
 */
class SchemaSelectorsService {
    /**
     * @param {?} ngRedux
     * @param {?} dat$
     * @param {?} tab$
     * @param {?} pro$
     * @param {?} dfh$
     * @param {?} sys$
     */
    constructor(ngRedux, dat$, tab$, pro$, dfh$, sys$) {
        this.dat$ = dat$;
        this.tab$ = tab$;
        this.pro$ = pro$;
        this.dfh$ = dfh$;
        this.sys$ = sys$;
        /** @type {?} */
        const pkProject$ = ngRedux.select(['activeProject', 'pk_project']).pipe(filter((/**
         * @param {?} p
         * @return {?}
         */
        p => p !== undefined)), distinctUntilChanged((/**
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        (x, y) => {
            return x === y;
        })));
        this.inf$ = new InfSelector(ngRedux, pkProject$);
    }
}
SchemaSelectorsService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
SchemaSelectorsService.ctorParameters = () => [
    { type: NgRedux },
    { type: DatSelector },
    { type: TabSelector },
    { type: ProSelector },
    { type: DfhSelector },
    { type: SysSelector }
];
/** @nocollapse */ SchemaSelectorsService.ngInjectableDef = ɵɵdefineInjectable({ factory: function SchemaSelectorsService_Factory() { return new SchemaSelectorsService(ɵɵinject(NgRedux), ɵɵinject(DatSelector), ɵɵinject(TabSelector), ɵɵinject(ProSelector), ɵɵinject(DfhSelector), ɵɵinject(SysSelector)); }, token: SchemaSelectorsService, providedIn: "root" });
if (false) {
    /** @type {?} */
    SchemaSelectorsService.prototype.inf$;
    /** @type {?} */
    SchemaSelectorsService.prototype.dat$;
    /** @type {?} */
    SchemaSelectorsService.prototype.tab$;
    /** @type {?} */
    SchemaSelectorsService.prototype.pro$;
    /** @type {?} */
    SchemaSelectorsService.prototype.dfh$;
    /** @type {?} */
    SchemaSelectorsService.prototype.sys$;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/services/active-project-pipes.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ActiveProjectPipesService {
    /**
     * @param {?} ngRedux
     * @param {?} s
     * @param {?} entityPreviewSocket
     * @param {?} schemaService
     */
    constructor(ngRedux, s, entityPreviewSocket, schemaService) {
        this.ngRedux = ngRedux;
        this.s = s;
        this.entityPreviewSocket = entityPreviewSocket;
        this.schemaService = schemaService;
        this.requestedEntityPreviews = {};
        this.pkProject$ = ngRedux.select(['activeProject', 'pk_project'])
            .pipe(filter((/**
         * @param {?} p
         * @return {?}
         */
        p => p !== undefined)), distinctUntilChanged((/**
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        (x, y) => {
            return x === y;
        })));
        this.entityPreviewSocket.fromEvent('reconnect').subscribe((/**
         * @param {?} disconnect
         * @return {?}
         */
        disconnect => {
            // get all EntityPreview keys from state and send them to the
            // server so that they will be streamed. This is important for
            // when connection was lost.
            this.pkProject$.pipe(first())
                .subscribe((/**
             * @param {?} pkProject
             * @return {?}
             */
            (pkProject) => {
                /** @type {?} */
                const pks = Object.keys(Object.assign({}, this.ngRedux.getState().war.entity_preview, this.requestedEntityPreviews));
                if (pks.length) {
                    this.entityPreviewSocket.emit('addToStream', {
                        pkProject,
                        pks
                    });
                }
            }));
        }));
        combineLatest(this.schemaService.schemaObjectStored$, this.pkProject$).subscribe((/**
         * @param {?} __0
         * @return {?}
         */
        ([object, pkProject]) => {
            this.extendEntityPreviewStream(object, pkProject);
        }));
    }
    /**
     * @return {?}
     */
    pipeActiveProject() {
        return this.pkProject$.pipe(switchMap((/**
         * @param {?} pkProject
         * @return {?}
         */
        pkProject => this.s.pro$.project$.by_pk_entity$.key(pkProject.toString())))).pipe(filter((/**
         * @param {?} l
         * @return {?}
         */
        l => !!l)));
    }
    /**
     * @return {?}
     */
    pipeActiveDefaultLanguage() {
        return this.pipeActiveProject().pipe(filter((/**
         * @param {?} p
         * @return {?}
         */
        p => !!p)), switchMap((/**
         * @param {?} project
         * @return {?}
         */
        project => {
            return this.s.inf$.language$.by_pk_entity$.key(project.fk_language.toString());
        }))).pipe(filter((/**
         * @param {?} l
         * @return {?}
         */
        l => !!l)));
    }
    /**
     * Loads a data unit preview, if it is not yet available in state or if
     * forceReload is true;
     *
     * @param {?} pkEntity
     * @param {?=} forceReload
     * @return {?}
     */
    streamEntityPreview(pkEntity, forceReload) {
        /** @type {?} */
        const state = this.ngRedux.getState();
        if ((!(((state.war || {}).entity_preview || {}).by_pk_entity || {})[pkEntity] &&
            !this.requestedEntityPreviews[pkEntity]) || forceReload) {
            this.pkProject$.pipe(first((/**
             * @param {?} pk
             * @return {?}
             */
            pk => !!pk))).subscribe((/**
             * @param {?} pkProject
             * @return {?}
             */
            pkProject => {
                this.entityPreviewSocket.emit('addToStream', {
                    pkProject,
                    pks: [pkEntity]
                });
                // const pkUiContext = SysConfig.PK_UI_CONTEXT_DATAUNITS_EDITABLE;
                // this.ngRedux.dispatch(this.actions.loadEntityPreview(pkProject, pkEntity, pkUiContext))
                this.requestedEntityPreviews[pkEntity] = true;
            }));
        }
        return this.ngRedux.select(['war', 'entity_preview', 'by_pk_entity', pkEntity])
            .pipe(distinctUntilChanged(equals), filter((/**
         * @param {?} prev
         * @return {?}
         */
        prev => (!!prev))));
    }
    /**
     * Adds the entity previews to the streamed entity previews (for ws communication)
     * @private
     * @param {?} object
     * @param {?} pkProject
     * @return {?}
     */
    extendEntityPreviewStream(object, pkProject) {
        if (object && object.war && object.war.entity_preview && object.war.entity_preview.length) {
            this.entityPreviewSocket.emit('extendStream', {
                pkProject,
                pks: object.war.entity_preview.map((/**
                 * @param {?} p
                 * @return {?}
                 */
                p => p.pk_entity))
            });
        }
    }
}
ActiveProjectPipesService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
ActiveProjectPipesService.ctorParameters = () => [
    { type: NgRedux },
    { type: SchemaSelectorsService },
    { type: EntityPreviewSocket },
    { type: SchemaService }
];
/** @nocollapse */ ActiveProjectPipesService.ngInjectableDef = ɵɵdefineInjectable({ factory: function ActiveProjectPipesService_Factory() { return new ActiveProjectPipesService(ɵɵinject(NgRedux), ɵɵinject(SchemaSelectorsService), ɵɵinject(EntityPreviewSocket), ɵɵinject(SchemaService)); }, token: ActiveProjectPipesService, providedIn: "root" });
__decorate([
    cache({ refCount: false }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Observable)
], ActiveProjectPipesService.prototype, "pipeActiveProject", null);
__decorate([
    cache({ refCount: false }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Observable)
], ActiveProjectPipesService.prototype, "pipeActiveDefaultLanguage", null);
if (false) {
    /** @type {?} */
    ActiveProjectPipesService.prototype.pkProject$;
    /** @type {?} */
    ActiveProjectPipesService.prototype.requestedEntityPreviews;
    /**
     * @type {?}
     * @private
     */
    ActiveProjectPipesService.prototype.ngRedux;
    /**
     * @type {?}
     * @private
     */
    ActiveProjectPipesService.prototype.s;
    /**
     * @type {?}
     * @private
     */
    ActiveProjectPipesService.prototype.entityPreviewSocket;
    /**
     * @type {?}
     * @private
     */
    ActiveProjectPipesService.prototype.schemaService;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/services/configuration-pipes.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function DfhPropertyStatus() { }
if (false) {
    /** @type {?} */
    DfhPropertyStatus.prototype.removedFromAllProfiles;
}
/**
 * This Service provides a collection of pipes that aggregate or transform configuration data.
 * When talking about configuration, we mean the conceptual reference model and the additional
 * configurations on system and project level.
 * For Example
 * - the fields of a class
 * - the labels of classes and properties
 */
class ConfigurationPipesService {
    /**
     * @param {?} a
     * @param {?} s
     */
    constructor(a, s) {
        this.a = a;
        this.s = s;
    }
    /**
     * returns observable number[] wher the numbers are the pk_profile
     * of all profiles that are enabled by the given project.
     * The array will always include PK_PROFILE_GEOVISTORY_BASIC
     * @return {?}
     */
    // @spyTag
    // @cache({ refCount: false })
    pipeProfilesEnabledByProject() {
        return this.a.pkProject$.pipe(switchMap((/**
         * @param {?} pkProject
         * @return {?}
         */
        pkProject => this.s.pro$.dfh_profile_proj_rel$.by_fk_project__enabled$
            .key(pkProject + '_true').pipe(map((/**
         * @param {?} projectProfileRels
         * @return {?}
         */
        projectProfileRels => values$1(projectProfileRels)
            .filter((/**
         * @param {?} rel
         * @return {?}
         */
        rel => rel.enabled))
            .map((/**
         * @param {?} rel
         * @return {?}
         */
        rel => rel.fk_profile)))), map((/**
         * @param {?} enabled
         * @return {?}
         */
        enabled => [...enabled, DfhConfig.PK_PROFILE_GEOVISTORY_BASIC]))))), shareReplay());
    }
    /**
     * Pipe all fields of given class
     * The Fields are not ordered and not filtered
     * If you want specific subsets of Fields and/or ordered Fields, use the pipes
     * that build on this pipe.
     * @param {?} pkClass
     * @param {?=} noNesting
     * @return {?}
     */
    pipeFields(pkClass, noNesting = false) {
        return combineLatest(
        // pipe source class
        this.s.dfh$.class$.by_pk_class$.key(pkClass), 
        // pipe outgoing properties
        this.s.dfh$.property$.by_has_domain$.key(pkClass).pipe(map((/**
         * @param {?} indexed
         * @return {?}
         */
        indexed => values$1(indexed)))), 
        // pipe ingoing properties
        this.s.dfh$.property$.by_has_range$.key(pkClass).pipe(map((/**
         * @param {?} indexed
         * @return {?}
         */
        indexed => values$1(indexed)))), 
        // pipe sys config
        this.s.sys$.config$.main$.pipe(filter((/**
         * @param {?} x
         * @return {?}
         */
        x => !!x))), 
        // pipe enabled profiles
        this.pipeProfilesEnabledByProject()).pipe(switchMap((/**
         * @param {?} __0
         * @return {?}
         */
        ([sourceKlass, outgoingProps, ingoingProps, sysConfig, enabledProfiles]) => {
            /** @type {?} */
            const isEnabled = (/**
             * @param {?} prop
             * @return {?}
             */
            (prop) => enabledProfiles.some((/**
             * @param {?} enabled
             * @return {?}
             */
            (enabled) => prop.profiles.map((/**
             * @param {?} p
             * @return {?}
             */
            p => p.fk_profile)).includes(enabled))));
            /** @type {?} */
            const outP = outgoingProps.filter((/**
             * @param {?} prop
             * @return {?}
             */
            (prop) => isEnabled(prop)));
            /** @type {?} */
            let inP = ingoingProps.filter((/**
             * @param {?} prop
             * @return {?}
             */
            (prop) => isEnabled(prop)));
            if (pkClass === DfhConfig.ClASS_PK_TIME_SPAN) {
                // remove the has time span property
                inP = [];
            }
            else {
                // // if class is not appellation for language, add appellation for language (1111) property
                // if (pkClass !== DfhConfig.CLASS_PK_APPELLATION_FOR_LANGUAGE) {
                //   ingoingProps.push(createAppellationProperty(pkClass))
                // }
                // if is temporal entity, add has time span property
                if (sourceKlass.basic_type === 9) {
                    outP.push(createHasTimeSpanProperty(pkClass));
                }
                outP.push(createHasDefinitionProperty(pkClass));
            }
            return combineLatest(this.pipePropertiesToSubfields(outP, true, enabledProfiles, sysConfig, noNesting), this.pipePropertiesToSubfields(inP, false, enabledProfiles, sysConfig, noNesting), this.pipeFieldConfigs(pkClass)).pipe(map((/**
             * @param {?} __0
             * @return {?}
             */
            ([subfields1, subfields2, fieldConfigs]) => {
                /** @type {?} */
                const subfields = [...subfields1, ...subfields2];
                /** @type {?} */
                const fieldConfigIdx = indexBy((/**
                 * @param {?} x
                 * @return {?}
                 */
                (x) => [
                    (x.fk_domain_class || x.fk_range_class),
                    x.fk_property,
                    !!x.fk_domain_class
                ].join('_')), fieldConfigs);
                /** @type {?} */
                const uniqFields = {};
                /** @type {?} */
                const uniqSubfieldCache = {}
                // group by source, pkProperty and isOutgoing
                ;
                // group by source, pkProperty and isOutgoing
                for (const s of subfields) {
                    /** @type {?} */
                    const fieldId = [s.sourceClass, s.property.pkProperty, s.isOutgoing].join('_');
                    /** @type {?} */
                    const subfieldId = [s.sourceClass, s.property.pkProperty, s.isOutgoing, s.targetClass].join('_');
                    /** @type {?} */
                    const fieldConfig = fieldConfigIdx[fieldId];
                    // the first time the group is established
                    if (!uniqFields[fieldId]) {
                        /** @type {?} */
                        let isSpecialField = false;
                        if (s.isHasTypeField)
                            isSpecialField = 'has-type';
                        else if (s.property.pkProperty === DfhConfig.PROPERTY_PK_HAS_TIME_SPAN)
                            isSpecialField = 'time-span';
                        uniqFields[fieldId] = {
                            sourceClass: s.sourceClass,
                            sourceClassLabel: s.sourceClassLabel,
                            sourceMaxQuantity: s.sourceMaxQuantity,
                            sourceMinQuantity: s.sourceMinQuantity,
                            targetMinQuantity: s.targetMinQuantity,
                            targetMaxQuantity: s.targetMaxQuantity,
                            label: s.label,
                            isHasTypeField: s.isHasTypeField,
                            property: s.property,
                            isOutgoing: s.isOutgoing,
                            identityDefiningForSource: s.identityDefiningForSource,
                            identityDefiningForTarget: s.identityDefiningForTarget,
                            ontoInfoLabel: s.ontoInfoLabel,
                            ontoInfoUrl: s.ontoInfoUrl,
                            allSubfieldsRemovedFromAllProfiles: s.removedFromAllProfiles,
                            targetClasses: [s.targetClass],
                            fieldConfig,
                            placeOfDisplay: getPlaceOfDisplay(sysConfig.specialFields, s, fieldConfig),
                            isSpecialField,
                            targets: {
                                [s.targetClass]: {
                                    listType: s.listType,
                                    removedFromAllProfiles: s.removedFromAllProfiles,
                                    targetClass: s.targetClass,
                                    targetClassLabel: s.targetClassLabel
                                }
                            }
                        };
                        // mark subfield as added
                        uniqSubfieldCache[subfieldId] = true;
                    }
                    // ignore duplications of subfields
                    else if (!uniqSubfieldCache[subfieldId]) {
                        uniqFields[fieldId].allSubfieldsRemovedFromAllProfiles === false ?
                            uniqFields[fieldId].allSubfieldsRemovedFromAllProfiles = false :
                            uniqFields[fieldId].allSubfieldsRemovedFromAllProfiles = s.removedFromAllProfiles;
                        uniqFields[fieldId].targetClasses.push(s.targetClass);
                        uniqFields[fieldId].targets[s.targetClass] = {
                            listType: s.listType,
                            removedFromAllProfiles: s.removedFromAllProfiles,
                            targetClass: s.targetClass,
                            targetClassLabel: s.targetClassLabel
                        };
                    }
                }
                return values$1(uniqFields);
            })));
        })));
    }
    /**
     * pipe all the specific fields of a class,
     * ordered by the position of the field within the specific fields
     * @param {?} pkClass
     * @param {?=} noNesting
     * @return {?}
     */
    // @spyTag
    pipeSpecificFieldOfClass(pkClass, noNesting = false) {
        return this.pipeFields(pkClass, noNesting).pipe(map((/**
         * @param {?} fields
         * @return {?}
         */
        fields => fields
            // filter fields that are displayd in specific fields
            .filter((/**
         * @param {?} field
         * @return {?}
         */
        field => field.placeOfDisplay.specificFields))
            // sort fields by the position defined in the specific fields
            .sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        (a, b) => a.placeOfDisplay.specificFields.position - b.placeOfDisplay.specificFields.position)))));
    }
    /**
     * pipe all the basic fields of a class,
     * ordered by the position of the field within the basic fields
     * @param {?} pkClass
     * @param {?=} noNesting
     * @return {?}
     */
    // @spyTag
    pipeBasicFieldsOfClass(pkClass, noNesting = false) {
        return this.pipeFields(pkClass, noNesting).pipe(map((/**
         * @param {?} fields
         * @return {?}
         */
        fields => fields
            // filter fields that are displayd in basic fields
            .filter((/**
         * @param {?} field
         * @return {?}
         */
        field => field.placeOfDisplay.basicFields))
            // sort fields by the position defined in the basic fields
            .sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        (a, b) => a.placeOfDisplay.basicFields.position - b.placeOfDisplay.basicFields.position)))));
    }
    /**
     * Pipes the fields for temporal entity forms
     * - the specific fields
     * - the when field
     * - if available: the type field
     * @param {?} pkClass
     * @param {?=} noNesting
     * @return {?}
     */
    // @spyTag
    pipeFieldsForTeEnForm(pkClass, noNesting = false) {
        return this.pipeFields(pkClass, noNesting).pipe(
        // filter fields that are displayd in specific fields
        map((/**
         * @param {?} allFields
         * @return {?}
         */
        allFields => {
            /** @type {?} */
            const fields = allFields
                // filter fields that are displayd in specific fields and not removed from all profiles
                .filter((/**
             * @param {?} field
             * @return {?}
             */
            field => (field.placeOfDisplay.specificFields && field.allSubfieldsRemovedFromAllProfiles === false)))
                // sort fields by the position defined in the specific fields
                .sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            (a, b) => a.placeOfDisplay.specificFields.position - a.placeOfDisplay.specificFields.position));
            /** @type {?} */
            const whenField = allFields.find((/**
             * @param {?} field
             * @return {?}
             */
            field => field.property.pkProperty === DfhConfig.PROPERTY_PK_HAS_TIME_SPAN));
            if (whenField)
                fields.push(whenField);
            /** @type {?} */
            const typeField = allFields.find((/**
             * @param {?} field
             * @return {?}
             */
            field => field.isHasTypeField));
            if (typeField)
                fields.push(typeField);
            return fields;
        })));
    }
    /**
     * Pipes the fields of given class in this order:
     * - basic fields
     * - specific fields
     * @param {?} pkClass
     * @param {?=} noNesting
     * @return {?}
     */
    // @spyTag
    pipeBasicAndSpecificFields(pkClass, noNesting = false) {
        return combineLatest(this.pipeBasicFieldsOfClass(pkClass, noNesting), this.pipeSpecificFieldOfClass(pkClass, noNesting))
            .pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        ([a, b]) => [...a, ...b])));
    }
    /**
     * Pipes the fields of given class in this order:
     * - specific fields
     * - basic fields
     * @param {?} pkClass
     * @param {?=} noNesting
     * @return {?}
     */
    // @spyTag
    pipeSpecificAndBasicFields(pkClass, noNesting = false) {
        return combineLatest(this.pipeSpecificFieldOfClass(pkClass, noNesting), this.pipeBasicFieldsOfClass(pkClass, noNesting))
            .pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        ([a, b]) => [...a, ...b])));
    }
    /**
     * @param {?} properties
     * @param {?} isOutgoing
     * @param {?} enabledProfiles
     * @param {?} sysConfig
     * @param {?=} noNesting
     * @return {?}
     */
    pipePropertiesToSubfields(properties, isOutgoing, enabledProfiles, sysConfig, noNesting = false) {
        return combineLatestOrEmpty(properties.map((/**
         * @param {?} p
         * @return {?}
         */
        p => {
            return this.pipeSubfield(isOutgoing, p, sysConfig, enabledProfiles, noNesting);
        })));
    }
    /**
     * @param {?} sourceClass
     * @param {?} property
     * @param {?} targetClass
     * @param {?} isOutgoing
     * @param {?=} noNesting
     * @return {?}
     */
    pipeSubfieldIdToSubfield(sourceClass, property, targetClass, isOutgoing, noNesting = false) {
        /** @type {?} */
        const domain = isOutgoing ? sourceClass : targetClass;
        /** @type {?} */
        const range = isOutgoing ? targetClass : sourceClass;
        return combineLatest(this.s.dfh$.property$.pk_property__has_domain__has_range$.key([property, domain, range].join('_'))
            .pipe(filter((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            return !!x;
        }))), this.s.sys$.config$.main$.pipe(filter((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            return !!x;
        }))), this.pipeProfilesEnabledByProject().pipe(filter((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            return !!x;
        })))).pipe(switchMap((/**
         * @param {?} __0
         * @return {?}
         */
        ([dfhProp, sysConf, enabledProfiles]) => this.pipeSubfield(isOutgoing, dfhProp, sysConf, enabledProfiles, noNesting))));
    }
    /**
     * @private
     * @param {?} isOutgoing
     * @param {?} p
     * @param {?} sysConfig
     * @param {?} enabledProfiles
     * @param {?=} noNesting
     * @return {?}
     */
    pipeSubfield(isOutgoing, p, sysConfig, enabledProfiles, noNesting = false) {
        /** @type {?} */
        const o = isOutgoing;
        /** @type {?} */
        const targetClass = o ? p.has_range : p.has_domain;
        /** @type {?} */
        const sourceClass = o ? p.has_domain : p.has_range;
        /** @type {?} */
        const targetMaxQuantity = o ?
            p.range_instances_max_quantifier :
            p.domain_instances_max_quantifier;
        /** @type {?} */
        const sourceMaxQuantity = o ?
            p.domain_instances_max_quantifier :
            p.range_instances_max_quantifier;
        /** @type {?} */
        const targetMinQuantity = o ?
            p.range_instances_min_quantifier :
            p.domain_instances_min_quantifier;
        /** @type {?} */
        const sourceMinQuantity = o ?
            p.domain_instances_min_quantifier :
            p.range_instances_min_quantifier;
        // console.log('pppp wanted: ', [sourceClass, p.pk_property, targetClass, isOutgoing])
        return combineLatest(this.pipeClassLabel(sourceClass).pipe(tap((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            // console.log('pppp found sourceClassLabel: ', [sourceClass, p.pk_property, targetClass, isOutgoing])
            return x;
        }))), this.pipeClassLabel(targetClass).pipe(tap((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            // console.log('pppp found targetClassLabel: ', [sourceClass, p.pk_property, targetClass, isOutgoing])
            return x;
        }))), this.pipeSubfieldTypeOfClass(sysConfig, targetClass, targetMaxQuantity, p.pk_property, noNesting).pipe(tap((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            // console.log('pppp found subfieldType: ', [sourceClass, p.pk_property, targetClass, isOutgoing])
            return x;
        }))), this.pipeFieldLabel(p.pk_property, isOutgoing ? p.has_domain : null, isOutgoing ? null : p.has_range).pipe(tap((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            // console.log('pppp found fieldLabel: ', [sourceClass, p.pk_property, targetClass, isOutgoing])
            return x;
        }))))
            .pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        ([sourceClassLabel, targetClassLabel, listType, label]) => {
            // console.log('pppp found: ', [sourceClass, p.pk_property, targetClass, isOutgoing])
            // console.log('pppp found: ', [sourceClass, p.pk_property, targetClass, isOutgoing])
            /** @type {?} */
            const node = {
                listType,
                sourceClass,
                sourceClassLabel,
                sourceMaxQuantity,
                sourceMinQuantity,
                targetClass,
                targetClassLabel,
                targetMinQuantity,
                targetMaxQuantity,
                label,
                isHasTypeField: o && p.is_has_type_subproperty,
                property: { pkProperty: p.pk_property },
                isOutgoing: o,
                identityDefiningForSource: o ? p.identity_defining : false,
                identityDefiningForTarget: o ? false : p.identity_defining,
                ontoInfoLabel: p.identifier_in_namespace,
                ontoInfoUrl: 'https://ontome.dataforhistory.org/property/' + p.pk_property,
                removedFromAllProfiles: isRemovedFromAllProfiles(enabledProfiles, (p.profiles || [])),
            };
            return node;
        })));
    }
    /**
     * Pipes the type of Subfield for a given class
     *
     * Currently (to be revised if good) sublcasses of E55 Type,
     * that are the target of a field with targetMaxQantity=1,
     * get Subfield type 'hasType'.
     * Therefore targetMaxQuantity is needed.
     *
     * If we are nesting subfields, we'll end up with circular fields.
     * E.g.: Person 21 -> has appellation 1111 -> AppeTeEn 365 -> is appellation of 1111 -> Person 21
     * In order to detect them, we can additionally pass in the parent property.
     *
     * This behavior has to be revised, because it can lead to problems
     * when the Subfield belongs to a Field with multiple target classes
     * (and thus Subfields) because the UI then does not allow to choose
     * the right target class.
     * @param {?} config
     * @param {?} pkClass
     * @param {?} targetMaxQuantity
     * @param {?=} parentProperty
     * @param {?=} noNesting
     * @return {?}
     */
    // @spyTag
    pipeSubfieldTypeOfClass(config, pkClass, targetMaxQuantity, parentProperty, noNesting = false) {
        return this.s.dfh$.class$.by_pk_class$.key(pkClass).pipe(filter((/**
         * @param {?} i
         * @return {?}
         */
        i => !!i)), switchMap((/**
         * @param {?} klass
         * @return {?}
         */
        (klass) => this.pipeSubfieldType(config, klass, targetMaxQuantity, parentProperty, noNesting))));
    }
    /**
     * @param {?} config
     * @param {?} klass
     * @param {?} targetMaxQuantity
     * @param {?=} parentProperty
     * @param {?=} noNesting
     * @return {?}
     */
    pipeSubfieldType(config, klass, targetMaxQuantity, parentProperty, noNesting = false) {
        /** @type {?} */
        const res = (/**
         * @param {?} x
         * @return {?}
         */
        (x) => new BehaviorSubject(x));
        /** @type {?} */
        let classConfig;
        if (config)
            classConfig = config.classes[klass.pk_class];
        if (classConfig && classConfig.valueObjectType) {
            return res(classConfig.valueObjectType);
        }
        else if (klass.basic_type === 30 && targetMaxQuantity == 1) {
            return res({ typeItem: 'true' });
        }
        // TODO add this to sysConfigValue
        else if (klass.pk_class === DfhConfig.ClASS_PK_TIME_SPAN) {
            return res({ timeSpan: 'true' });
        }
        else if (klass.basic_type === 8 || klass.basic_type === 30 || noNesting) {
            return res({ entityPreview: 'true' });
        }
        else {
            // pipe the subfields of the temporalEntity class
            /** @type {?} */
            const noNest = true;
            return this.pipeSpecificAndBasicFields(klass.pk_class, noNest).pipe(map((/**
             * @param {?} fields
             * @return {?}
             */
            fields => {
                /** @type {?} */
                const subentitySubfieldPage = [];
                for (const field of fields) {
                    // for each of these subfields
                    // create page:GvSubfieldPage
                    /** @type {?} */
                    const nestedTargets = {};
                    for (const key in field.targets) {
                        if (Object.prototype.hasOwnProperty.call(field.targets, key)) {
                            /** @type {?} */
                            const listType = field.targets[key].listType;
                            // put temporalEntity to entityPreview
                            /** @type {?} */
                            const subTargetType = listType.temporalEntity ?
                                { entityPreview: 'true' } :
                                listType;
                            nestedTargets[key] = subTargetType;
                        }
                    }
                    /** @type {?} */
                    let isCircular = false;
                    if (parentProperty &&
                        field.property.pkProperty == parentProperty &&
                        field.targetMaxQuantity === 1) {
                        isCircular = true;
                    }
                    /** @type {?} */
                    const nestedPage = {
                        targets: nestedTargets,
                        page: {
                            fkProperty: field.property.pkProperty,
                            isOutgoing: field.isOutgoing,
                            limit: 1,
                            offset: 0,
                            isCircular
                        }
                    };
                    subentitySubfieldPage.push(nestedPage);
                }
                return { temporalEntity: subentitySubfieldPage };
            })));
        }
    }
    /**
     * Gets class field configs of given pkClass
     *
     * - of active project, if any, else
     * - of default config project, else
     * - empty array
     *
     * @param {?} pkClass
     * @return {?}
     */
    // @spyTag
    pipeFieldConfigs(pkClass) {
        return this.a.pkProject$.pipe(switchMap((/**
         * @param {?} fkProject
         * @return {?}
         */
        (fkProject) => {
            /** @type {?} */
            const activeProjectkey = proClassFieldConfgByProjectAndClassKey({
                fk_class_for_class_field: pkClass,
                fk_project: fkProject
            });
            /** @type {?} */
            const defaultProjectkey = proClassFieldConfgByProjectAndClassKey({
                fk_class_for_class_field: pkClass,
                fk_project: ProConfig.PK_PROJECT_OF_DEFAULT_CONFIG_PROJECT
            });
            return combineLatest(this.s.pro$.class_field_config$.by_fk_project__fk_class$.key(activeProjectkey), this.s.pro$.class_field_config$.by_fk_project__fk_class$.key(defaultProjectkey))
                .pipe(map((/**
             * @param {?} __0
             * @return {?}
             */
            ([activeProjectFields, defaultProjectFields]) => {
                if (activeProjectFields && values$1(activeProjectFields).length)
                    return activeProjectFields;
                return defaultProjectFields;
            })), map((/**
             * @param {?} items
             * @return {?}
             */
            (items) => values$1(items).sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            (a, b) => (a.ord_num > b.ord_num ? 1 : -1))))));
        })));
    }
    /********************************************** */
    /**
     * Delivers class label for active project
     * @param {?=} pkClass
     * @return {?}
     */
    // @spyTag
    pipeClassLabel(pkClass) {
        return combineLatest(this.a.pkProject$, this.a.pipeActiveDefaultLanguage()).pipe(switchMap((/**
         * @param {?} __0
         * @return {?}
         */
        ([fkProject, language]) => this.pipeLabels({ pkClass, fkProject, language, type: 'label' })
            .pipe(map((/**
         * @param {?} items
         * @return {?}
         */
        items => {
            /** @type {?} */
            const i = items.find((/**
             * @param {?} item
             * @return {?}
             */
            item => !!item));
            return i ? i.text : `* no label (id: ${pkClass}) *`;
        }))))));
    }
    /**
     * Delivers array of objects with
     * text ~ the text of the property
     * origin, in this order:
     * - origin == 'of project in project lang'         (from projects.text_property)
     * - origin == 'of default project in project lang' (from projects.text_property)
     * - origin == 'of default project in english'      (from projects.text_property)
     * - origin == 'of ontome in project lang'          (from data_for_history.label)
     * - origin == 'of ontome in english'               (from data_for_history.label)
     * @param {?} d
     * @return {?}
     */
    // @spyTag
    pipeLabels(d) {
        /** @type {?} */
        let fk_system_type;
        if (d.pkClass) {
            switch (d.type) {
                case 'label':
                    fk_system_type = SysConfig.PK_SYSTEM_TYPE__TEXT_PROPERTY__LABEL;
                    break;
                default:
                    console.warn('fk_system_type not found');
                    break;
            }
        }
        else if (d.fkProperty) {
            switch (d.type) {
                case 'label':
                    fk_system_type = SysConfig.PK_SYSTEM_TYPE__TEXT_PROPERTY__LABEL;
                    break;
                default:
                    console.warn('fk_system_type not found');
                    break;
            }
        }
        return combineLatest(
        // label of project in default language of project
        this.pipeProTextProperty({
            fk_project: d.fkProject,
            fk_language: d.language.pk_entity,
            fk_system_type,
            fk_dfh_class: d.pkClass,
            fk_dfh_property: d.fkProperty,
            fk_dfh_property_domain: d.fkPropertyDomain,
            fk_dfh_property_range: d.fkPropertyRange
        }).pipe(map((/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            if (!item)
                return undefined;
            /** @type {?} */
            const origin = 'of project in project lang';
            return { origin, text: item.string };
        }))), 
        // label of default project
        this.pipeProTextProperty({
            fk_project: ProConfig.PK_PROJECT_OF_DEFAULT_CONFIG_PROJECT,
            fk_language: d.language.pk_entity,
            fk_system_type,
            fk_dfh_class: d.pkClass,
            fk_dfh_property: d.fkProperty,
            fk_dfh_property_domain: d.fkPropertyDomain,
            fk_dfh_property_range: d.fkPropertyRange
        }).pipe(map((/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            if (!item)
                return undefined;
            /** @type {?} */
            const origin = 'of default project in project lang';
            return { origin, text: item.string };
        }))), 
        // label of default project
        this.pipeProTextProperty({
            fk_project: ProConfig.PK_PROJECT_OF_DEFAULT_CONFIG_PROJECT,
            fk_language: 18889,
            fk_system_type,
            fk_dfh_class: d.pkClass,
            fk_dfh_property: d.fkProperty,
            fk_dfh_property_domain: d.fkPropertyDomain,
            fk_dfh_property_range: d.fkPropertyRange
        }).pipe(map((/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            if (!item)
                return undefined;
            /** @type {?} */
            const origin = 'of default project in english';
            return { origin, text: item.string };
        }))), 
        // label from ontome in default language of project
        this.pipeDfhLabel({
            language: d.language.iso6391.trim(),
            type: 'label',
            fk_class: d.pkClass,
            fk_property: d.fkProperty
        }).pipe(map((/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            if (!item)
                return undefined;
            /** @type {?} */
            const origin = 'of ontome in project lang';
            return { origin, text: item.label };
        }))), 
        // label from ontome in english
        this.pipeDfhLabel({
            language: 'en',
            type: 'label',
            fk_class: d.pkClass,
            fk_property: d.fkProperty
        }).pipe(map((/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            if (!item)
                return undefined;
            /** @type {?} */
            const origin = 'of ontome in english';
            return { origin, text: item.label };
        }))));
    }
    /**
     * Pipes ProTextProperty
     * @param {?} d
     * @return {?}
     */
    // @spyTag
    pipeProTextProperty(d) {
        /** @type {?} */
        const key = textPropertyByFksKey(d);
        return this.s.pro$.text_property$.by_fks$.key(key);
    }
    /**
     * Pipes DfhLabel
     * @param {?} d
     * @return {?}
     */
    // @spyTag
    pipeDfhLabel(d) {
        /** @type {?} */
        const key = dfhLabelByFksKey(d);
        return this.s.dfh$.label$.by_fks$.key(key);
    }
    /**
     * Delivers best fitting field label for active project
     * @param {?} fkProperty
     * @param {?} fkPropertyDomain
     * @param {?} fkPropertyRange
     * @return {?}
     */
    // @spyTag
    pipeFieldLabel(fkProperty, fkPropertyDomain, fkPropertyRange) {
        /** @type {?} */
        const isOutgoing = !!fkPropertyDomain;
        // const system_type = isOutgoing ? (singular ? 180 : 181) : (singular ? 182 : 183)
        return combineLatest(this.a.pkProject$, this.a.pipeActiveDefaultLanguage()).pipe(switchMap((/**
         * @param {?} __0
         * @return {?}
         */
        ([fkProject, language]) => this.pipeLabels({
            fkProject,
            type: 'label',
            language,
            fkProperty,
            fkPropertyDomain,
            fkPropertyRange
        })
            .pipe(map((/**
         * @param {?} items
         * @return {?}
         */
        items => {
            /** @type {?} */
            let label = `* no label (id: ${fkProperty}) *`;
            items.some((/**
             * @param {?} item
             * @return {?}
             */
            (item) => {
                if (item &&
                    (item.origin === 'of project in project lang' ||
                        item.origin === 'of default project in project lang' ||
                        item.origin === 'of default project in english')) {
                    label = item.text;
                    return true;
                }
                else if (item &&
                    (item.origin === 'of ontome in project lang' ||
                        item.origin === 'of ontome in english')) {
                    label = isOutgoing ? item.text : '* reverse of: ' + item.text + '*';
                    return true;
                }
            }));
            return label;
        }))))));
    }
    /**
     * maps the class to the corresponding model (database table)
     * this is used by Forms to create new data in the shape of
     * the data model
     * @param {?} targetClassPk
     * @return {?}
     */
    // @spyTag
    pipeTableNameOfClass(targetClassPk) {
        return combineLatest(this.s.sys$.config$.main$, this.s.dfh$.class$.by_pk_class$.key(targetClassPk)).pipe(filter((/**
         * @param {?} i
         * @return {?}
         */
        i => !i.includes(undefined))), map((/**
         * @param {?} __0
         * @return {?}
         */
        ([config, klass]) => {
            /** @type {?} */
            const classConfig = config.classes[targetClassPk];
            if (classConfig && classConfig.valueObjectType) {
                /** @type {?} */
                const keys = Object.keys(classConfig.valueObjectType);
                if (classConfig.valueObjectType.appellation)
                    return;
                /** @type {?} */
                const key = keys[0];
                if (classConfig.valueObjectType.appellation)
                    return 'appellation';
                else if (classConfig.valueObjectType.language)
                    return 'language';
                else if (classConfig.valueObjectType.place)
                    return 'place';
                else if (classConfig.valueObjectType.timePrimitive)
                    return 'time_primitive';
                else if (classConfig.valueObjectType.langString)
                    return 'lang_string';
                else if (classConfig.valueObjectType.dimension)
                    return 'dimension';
                else {
                    console.warn('unsupported list type');
                }
            }
            else if (klass.basic_type === 8 || klass.basic_type === 30) {
                return 'persistent_item';
            }
            else {
                return 'temporal_entity';
            }
        })));
    }
    /**
     * returns an object where the keys are the pks of the Classes
     * used by the given project:
     * - or because the class is enabled by class_proj_rel
     * - or because the class is required by sources
     *
     * This is usefull to create select dropdowns of classes users will know
     * @return {?}
     */
    // @spyTag
    pipeClassesInEntitiesOrSources() {
        return combineLatest(this.pipeClassesEnabledInEntities(), this.pipeClassesRequiredBySources()).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        ([a, b]) => indexBy((/**
         * @param {?} x
         * @return {?}
         */
        (x) => x.toString()), uniq([...a, ...b])))), startWith({}));
    }
    // @spyTag
    /**
     * @return {?}
     */
    pipeClassesRequiredBySources() {
        return this.s.sys$.system_relevant_class$.by_required_by_sources$.key('true')
            .pipe(map((/**
         * @param {?} c
         * @return {?}
         */
        c => values$1(c).map((/**
         * @param {?} k
         * @return {?}
         */
        k => k.fk_class)))));
    }
    /**
     * returns observable number[] wher the numbers are the pk_class
     * of all classes that are enabled by at least one of the activated profiles
     * of thte given project
     * @return {?}
     */
    // @spyTag
    pipeClassesEnabledByProjectProfiles() {
        return this.a.pkProject$.pipe(switchMap((/**
         * @param {?} pkProject
         * @return {?}
         */
        pkProject => combineLatest([
            this.s.dfh$.class$.by_pk_class$.all$,
            this.pipeProfilesEnabledByProject()
        ]).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        ([classesByPk, enabledProfiles]) => {
            /** @type {?} */
            const profilesMap = indexBy((/**
             * @param {?} k
             * @return {?}
             */
            (k) => k.toString()), values$1(enabledProfiles));
            return values$1(classesByPk)
                .filter((/**
             * @param {?} klass
             * @return {?}
             */
            klass => klass.profiles.some((/**
             * @param {?} profile
             * @return {?}
             */
            profile => profilesMap[profile.fk_profile]))));
        }))))));
    }
    /**
     * returns observable number[] wher the numbers are the pk_class
     * of all type classes that are enabled by at least one of the activated profiles
     * of thte given project
     * @return {?}
     */
    // @spyTag
    pipeTypeClassesEnabledByProjectProfiles() {
        return combineLatest([
            this.s.dfh$.class$.by_basic_type$.key(30),
            this.pipeProfilesEnabledByProject()
        ]).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        ([classesByPk, enabledProfiles]) => {
            /** @type {?} */
            const profilesMap = indexBy((/**
             * @param {?} k
             * @return {?}
             */
            (k) => k.toString()), values$1(enabledProfiles));
            return values$1(classesByPk)
                .filter((/**
             * @param {?} klass
             * @return {?}
             */
            klass => {
                return klass.profiles.some((/**
                 * @param {?} profile
                 * @return {?}
                 */
                profile => profilesMap[profile.fk_profile])) &&
                    // Exclude Manifestation product type and language
                    ![
                        DfhConfig.CLASS_PK_LANGUAGE,
                        DfhConfig.CLASS_PK_MANIFESTATION_PRODUCT_TYPE
                    ].includes(klass.pk_class);
            }));
        })));
    }
    /**
     * returns observable number[] where the numbers are the pk_class
     * of all classes that are enabled by active project (using class_proj_rel)
     * @return {?}
     */
    // @spyTag
    pipeClassesEnabledInEntities() {
        return this.a.pkProject$.pipe(switchMap((/**
         * @param {?} pkProject
         * @return {?}
         */
        pkProject => this.s.pro$.dfh_class_proj_rel$.by_fk_project__enabled_in_entities$.key(pkProject + '_true')
            .pipe(map((/**
         * @param {?} rels
         * @return {?}
         */
        (rels) => values$1(rels).map((/**
         * @param {?} rel
         * @return {?}
         */
        rel => rel.fk_class))))))));
    }
    /**
     * returns an object where the keys are the pks of the TeEn Classes
     * used by the given project
     * @return {?}
     */
    // @spyTag
    pipeSelectedTeEnClassesInProject() {
        return combineLatest(this.pipeTeEnClassesEnabledInEntities(), this.pipeTeEnClassesRequiredBySources()).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        ([a, b]) => indexBy((/**
         * @param {?} x
         * @return {?}
         */
        (x) => x.toString()), uniq([...a, ...b])))), startWith({}));
    }
    /**
     * Gets array of pk_class with teEn classes enabled in entities
     * @return {?}
     */
    // @spyTag
    pipeTeEnClassesEnabledInEntities() {
        return this.a.pkProject$.pipe(switchMap((/**
         * @param {?} pkProject
         * @return {?}
         */
        pkProject => this.s.pro$.dfh_class_proj_rel$.by_fk_project__enabled_in_entities$.key(pkProject + '_true')
            .pipe(switchMap((/**
         * @param {?} cs
         * @return {?}
         */
        (cs) => combineLatest(values$1(cs).map((/**
         * @param {?} c
         * @return {?}
         */
        c => this.s.dfh$.class$.by_pk_class$.key(c.fk_class).pipe(filter((/**
         * @param {?} item
         * @return {?}
         */
        item => !!item)))))).pipe(map((/**
         * @param {?} dfhClasses
         * @return {?}
         */
        dfhClasses => this.filterTeEnCasses(dfhClasses))))))))));
    }
    /**
     * Filters array of DfhClass for TeEn Classes and returns array of pk_class
     * @private
     * @param {?} dfhClasses array of DfhClass
     * @return {?} returns array of pk_class where class is TeEn class
     */
    filterTeEnCasses(dfhClasses) {
        /** @type {?} */
        const pks = [];
        for (let i = 0; i < dfhClasses.length; i++) {
            /** @type {?} */
            const c = dfhClasses[i];
            if (c.basic_type === 9)
                pks.push(c.pk_class);
        }
        return pks;
    }
    /**
     * Gets array of pk_class with teEn classes required by sources
     * @return {?}
     */
    // @spyTag
    pipeTeEnClassesRequiredBySources() {
        return this.s.sys$.system_relevant_class$.by_required_by_sources$.key('true')
            .pipe(switchMap((/**
         * @param {?} cs
         * @return {?}
         */
        (cs) => combineLatest(values$1(cs).map((/**
         * @param {?} c
         * @return {?}
         */
        c => this.s.dfh$.class$.by_pk_class$.key(c.fk_class).pipe(filter((/**
         * @param {?} item
         * @return {?}
         */
        item => !!item)))))).pipe(map((/**
         * @param {?} dfhClasses
         * @return {?}
         */
        dfhClasses => {
            return this.filterTeEnCasses(dfhClasses);
        }))))));
    }
    /**
     *
     * @param {?=} enabledIn
     * @return {?}
     */
    // @spyTag
    pipeTypeAndTypedClasses(enabledIn) {
        /** @type {?} */
        let pks$;
        /** @type {?} */
        const fromSources$ = this.s.sys$.system_relevant_class$.by_required_by_sources$.key('true').pipe(map((/**
         * @param {?} classes
         * @return {?}
         */
        classes => values$1(classes).map((/**
         * @param {?} k
         * @return {?}
         */
        k => k.fk_class)))));
        /** @type {?} */
        const fromEntities$ = this.pipeClassesEnabledInEntities();
        if (enabledIn === 'sources') {
            pks$ = [fromSources$];
        }
        else if (enabledIn === 'entities') {
            pks$ = [fromEntities$];
        }
        else {
            pks$ = [fromSources$, fromEntities$];
        }
        return combineLatest(pks$).pipe(map((/**
         * @param {?} arrayOfPkArrays
         * @return {?}
         */
        arrayOfPkArrays => uniq(flatten(arrayOfPkArrays)))), switchMap((/**
         * @param {?} pks
         * @return {?}
         */
        pks => this.pipeTypeAndTypedClassesOfTypedClasses(pks))));
    }
    // @spyTag
    /**
     * @param {?} pkTypedClasses
     * @return {?}
     */
    pipeTypeAndTypedClassesOfTypedClasses(pkTypedClasses) {
        return this.s.dfh$.property$.by_is_has_type_subproperty$.key('true').pipe(map((/**
         * @param {?} allHasTypeProps
         * @return {?}
         */
        (allHasTypeProps) => {
            /** @type {?} */
            const byDomain = indexBy((/**
             * @param {?} k
             * @return {?}
             */
            k => k.has_domain.toString()), values$1(allHasTypeProps));
            return pkTypedClasses.map((/**
             * @param {?} pk
             * @return {?}
             */
            pk => ({
                typedClass: pk,
                typeClass: byDomain[pk] ? byDomain[pk].has_range : undefined
            })));
        })));
    }
    // @spyTag
    /**
     * @param {?} pkTypedClass
     * @return {?}
     */
    pipeTypeClassOfTypedClass(pkTypedClass) {
        return this.s.dfh$.property$.by_is_has_type_subproperty$.key('true').pipe(map((/**
         * @param {?} allHasTypeProps
         * @return {?}
         */
        (allHasTypeProps) => {
            /** @type {?} */
            const byDomain = indexBy((/**
             * @param {?} k
             * @return {?}
             */
            k => k.has_domain.toString()), values$1(allHasTypeProps));
            return byDomain[pkTypedClass] ? byDomain[pkTypedClass].has_range : undefined;
        })));
    }
    // @spyTag
    /**
     * @param {?} pkTypeClasses
     * @return {?}
     */
    pipeTypedClassesOfTypeClasses(pkTypeClasses) {
        return this.s.dfh$.property$.by_is_has_type_subproperty$.key('true').pipe(map((/**
         * @param {?} allHasTypeProps
         * @return {?}
         */
        (allHasTypeProps) => {
            /** @type {?} */
            const byDomain = indexBy((/**
             * @param {?} k
             * @return {?}
             */
            k => k.has_range.toString()), values$1(allHasTypeProps));
            return pkTypeClasses.map((/**
             * @param {?} pk
             * @return {?}
             */
            pk => byDomain[pk] ? byDomain[pk].has_domain : undefined));
        })));
    }
    // @spyTag
    /**
     * @param {?} pkTypedClass
     * @return {?}
     */
    pipeTypePropertyOfTypedClass(pkTypedClass) {
        return this.s.dfh$.property$.by_is_has_type_subproperty$.key('true').pipe(map((/**
         * @param {?} allHasTypeProps
         * @return {?}
         */
        (allHasTypeProps) => {
            /** @type {?} */
            const typeProp = values$1(allHasTypeProps).find((/**
             * @param {?} p
             * @return {?}
             */
            p => p.has_domain === pkTypedClass));
            return typeProp ? typeProp.pk_property : undefined;
        })));
    }
    // @spyTag
    /**
     * @param {?} pkProperties
     * @param {?} isOutgoing
     * @return {?}
     */
    pipeTargetClassesOfProperties(pkProperties, isOutgoing) {
        return this.s.dfh$.property$.by_pk_property$.all$.pipe(map((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            if (!pkProperties || !pkProperties.length)
                return [];
            /** @type {?} */
            const res = [];
            /** @type {?} */
            const targetClasses = {};
            pkProperties.forEach((/**
             * @param {?} pkProp
             * @return {?}
             */
            pkProp => {
                /** @type {?} */
                const props = values$1(x[pkProp]);
                props.forEach((/**
                 * @param {?} prop
                 * @return {?}
                 */
                prop => {
                    /** @type {?} */
                    const targetClass = isOutgoing ? prop.has_range : prop.has_domain;
                    if (!targetClasses[targetClass]) {
                        targetClasses[targetClass] = true;
                        res.push(targetClass);
                    }
                }));
            }));
            return res;
        })));
    }
}
ConfigurationPipesService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
ConfigurationPipesService.ctorParameters = () => [
    { type: ActiveProjectPipesService },
    { type: SchemaSelectorsService }
];
/** @nocollapse */ ConfigurationPipesService.ngInjectableDef = ɵɵdefineInjectable({ factory: function ConfigurationPipesService_Factory() { return new ConfigurationPipesService(ɵɵinject(ActiveProjectPipesService), ɵɵinject(SchemaSelectorsService)); }, token: ConfigurationPipesService, providedIn: "root" });
__decorate([
    cache({ refCount: false }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Observable)
], ConfigurationPipesService.prototype, "pipeFields", null);
__decorate([
    cache({ refCount: false }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Observable)
], ConfigurationPipesService.prototype, "pipeSpecificFieldOfClass", null);
__decorate([
    cache({ refCount: false }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Observable)
], ConfigurationPipesService.prototype, "pipeBasicFieldsOfClass", null);
__decorate([
    cache({ refCount: false }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Observable)
], ConfigurationPipesService.prototype, "pipeFieldsForTeEnForm", null);
__decorate([
    cache({ refCount: false }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Observable)
], ConfigurationPipesService.prototype, "pipeBasicAndSpecificFields", null);
__decorate([
    cache({ refCount: false }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Observable)
], ConfigurationPipesService.prototype, "pipeSpecificAndBasicFields", null);
__decorate([
    cache({ refCount: false }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Boolean, Array, Object, Object]),
    __metadata("design:returntype", Observable)
], ConfigurationPipesService.prototype, "pipePropertiesToSubfields", null);
__decorate([
    cache({ refCount: false }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, Boolean, Object]),
    __metadata("design:returntype", Observable)
], ConfigurationPipesService.prototype, "pipeSubfieldIdToSubfield", null);
__decorate([
    cache({ refCount: false }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number, Number, Object]),
    __metadata("design:returntype", Observable)
], ConfigurationPipesService.prototype, "pipeSubfieldTypeOfClass", null);
__decorate([
    cache({ refCount: false }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Observable)
], ConfigurationPipesService.prototype, "pipeFieldConfigs", null);
__decorate([
    cache({ refCount: false }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Observable)
], ConfigurationPipesService.prototype, "pipeClassLabel", null);
__decorate([
    cache({ refCount: false }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Observable)
], ConfigurationPipesService.prototype, "pipeLabels", null);
__decorate([
    cache({ refCount: false }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Observable)
], ConfigurationPipesService.prototype, "pipeProTextProperty", null);
__decorate([
    cache({ refCount: false }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Observable)
], ConfigurationPipesService.prototype, "pipeDfhLabel", null);
__decorate([
    cache({ refCount: false }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Observable)
], ConfigurationPipesService.prototype, "pipeFieldLabel", null);
__decorate([
    cache({ refCount: false }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Observable)
], ConfigurationPipesService.prototype, "pipeTableNameOfClass", null);
__decorate([
    cache({ refCount: false }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Observable)
], ConfigurationPipesService.prototype, "pipeClassesInEntitiesOrSources", null);
__decorate([
    cache({ refCount: false }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ConfigurationPipesService.prototype, "pipeClassesRequiredBySources", null);
__decorate([
    cache({ refCount: false }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Observable)
], ConfigurationPipesService.prototype, "pipeClassesEnabledByProjectProfiles", null);
__decorate([
    cache({ refCount: false }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Observable)
], ConfigurationPipesService.prototype, "pipeTypeClassesEnabledByProjectProfiles", null);
__decorate([
    cache({ refCount: false }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ConfigurationPipesService.prototype, "pipeClassesEnabledInEntities", null);
__decorate([
    cache({ refCount: false }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Observable)
], ConfigurationPipesService.prototype, "pipeSelectedTeEnClassesInProject", null);
__decorate([
    cache({ refCount: false }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ConfigurationPipesService.prototype, "pipeTeEnClassesEnabledInEntities", null);
__decorate([
    cache({ refCount: false }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ConfigurationPipesService.prototype, "pipeTeEnClassesRequiredBySources", null);
__decorate([
    cache({ refCount: false }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Observable)
], ConfigurationPipesService.prototype, "pipeTypeAndTypedClasses", null);
__decorate([
    cache({ refCount: false }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Observable)
], ConfigurationPipesService.prototype, "pipeTypeAndTypedClassesOfTypedClasses", null);
__decorate([
    cache({ refCount: false }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Observable)
], ConfigurationPipesService.prototype, "pipeTypeClassOfTypedClass", null);
__decorate([
    cache({ refCount: false }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Observable)
], ConfigurationPipesService.prototype, "pipeTypedClassesOfTypeClasses", null);
__decorate([
    cache({ refCount: false }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Observable)
], ConfigurationPipesService.prototype, "pipeTypePropertyOfTypedClass", null);
__decorate([
    cache({ refCount: false }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Boolean]),
    __metadata("design:returntype", Observable)
], ConfigurationPipesService.prototype, "pipeTargetClassesOfProperties", null);
if (false) {
    /**
     * @type {?}
     * @private
     */
    ConfigurationPipesService.prototype.a;
    /**
     * @type {?}
     * @private
     */
    ConfigurationPipesService.prototype.s;
}
/**
 * @param {?} domainClass
 * @return {?}
 */
function createHasDefinitionProperty(domainClass) {
    /** @type {?} */
    const profiles = [
        {
            removed_from_api: false,
            fk_profile: DfhConfig.PK_PROFILE_GEOVISTORY_BASIC
        }
    ];
    /** @type {?} */
    const hasDefinition = {
        has_domain: domainClass,
        pk_property: DfhConfig.PROPERTY_PK_P18_HAS_DEFINITION,
        has_range: 785,
        domain_instances_max_quantifier: -1,
        domain_instances_min_quantifier: 1,
        range_instances_max_quantifier: 1,
        range_instances_min_quantifier: 1,
        identifier_in_namespace: 'P18',
        identity_defining: false,
        is_inherited: true,
        is_has_type_subproperty: false,
        profiles
    };
    return hasDefinition;
}
/**
 * @param {?} domainClass
 * @return {?}
 */
function createHasTimeSpanProperty(domainClass) {
    /** @type {?} */
    const profiles = [
        {
            removed_from_api: false,
            fk_profile: DfhConfig.PK_PROFILE_GEOVISTORY_BASIC
        }
    ];
    /** @type {?} */
    const hasAppeProp = {
        has_domain: domainClass,
        pk_property: DfhConfig.PROPERTY_PK_HAS_TIME_SPAN,
        has_range: DfhConfig.ClASS_PK_TIME_SPAN,
        domain_instances_max_quantifier: -1,
        domain_instances_min_quantifier: 1,
        range_instances_max_quantifier: 1,
        range_instances_min_quantifier: 1,
        identifier_in_namespace: 'P4',
        identity_defining: false,
        is_inherited: true,
        is_has_type_subproperty: false,
        profiles
    };
    return hasAppeProp;
}
/**
 * @param {?} enabledProfiles
 * @param {?} profiles
 * @return {?}
 */
function isRemovedFromAllProfiles(enabledProfiles, profiles) {
    return !profiles.some((/**
     * @param {?} p
     * @return {?}
     */
    p => p.removed_from_api === false && enabledProfiles.includes(p.fk_profile)));
}
/**
 * @param {?} specialFields
 * @param {?} subfield
 * @param {?=} projectFieldConfig
 * @return {?}
 */
function getPlaceOfDisplay(specialFields, subfield, projectFieldConfig) {
    /** @type {?} */
    let settings;
    settings = getSettingsFromSysConfig(subfield, specialFields, settings);
    // if this is a special field, create corresponding display settings and return it
    if (settings) {
        if (settings.displayInBasicFields) {
            return { basicFields: { position: settings.displayInBasicFields.position } };
        }
        else if (settings.hidden) {
            return { hidden: true };
        }
    }
    // otherwise display the field in specific fields (default)
    /** @type {?} */
    let position = Number.POSITIVE_INFINITY;
    if (projectFieldConfig)
        position = projectFieldConfig.ord_num;
    return { specificFields: { position } };
}
/**
 * @param {?} subfield
 * @param {?} specialFields
 * @param {?} settings
 * @return {?}
 */
function getSettingsFromSysConfig(subfield, specialFields, settings) {
    if (subfield.isOutgoing) {
        // get settings by has-type-subproperty
        if (subfield.isHasTypeField &&
            specialFields.hasTypeSubproperties) {
            settings = specialFields.hasTypeSubproperties;
        }
        // get settings by source class and property
        else if (specialFields.bySourceClass &&
            specialFields.bySourceClass[subfield.sourceClass] &&
            specialFields.bySourceClass[subfield.sourceClass].outgoingProperties &&
            specialFields.bySourceClass[subfield.sourceClass].outgoingProperties[subfield.property.pkProperty]) {
            settings = specialFields.bySourceClass[subfield.sourceClass].outgoingProperties[subfield.property.pkProperty];
        }
        // get seetings by property
        else if (specialFields.outgoingProperties &&
            specialFields.outgoingProperties[subfield.property.pkProperty]) {
            settings = specialFields.outgoingProperties[subfield.property.pkProperty];
        }
    }
    else {
        // get settings by source class and property
        if (specialFields.bySourceClass &&
            specialFields.bySourceClass[subfield.sourceClass] &&
            specialFields.bySourceClass[subfield.sourceClass].incomingProperties &&
            specialFields.bySourceClass[subfield.sourceClass].incomingProperties[subfield.property.pkProperty]) {
            settings = specialFields.bySourceClass[subfield.sourceClass].incomingProperties[subfield.property.pkProperty];
        }
        // get seetings by property
        else if (specialFields.incomingProperties &&
            specialFields.incomingProperties[subfield.property.pkProperty]) {
            settings = specialFields.incomingProperties[subfield.property.pkProperty];
        }
    }
    return settings;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/services/information-basic-pipes.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This service contains a basic pipes for creating more complex
 * rxjs pipes. Each pipe takes non-observable parameters and
 * returns an observable. The method names are mainly
 * based on the type of the observable data
 */
class InformationBasicPipesService {
    // infRepo: InfSelector;
    /**
     * @param {?} p
     * @param {?} s
     */
    constructor(p, s) {
        this.p = p;
        this.s = s;
        /**
         * Pipes max. one time primitive for an array of statements, assuming that the statements
         * are of the same properties.
         */
        this.timePrimitiveOfStatements = (/**
         * @return {?}
         */
        () => pipe(map((/**
         * @param {?} r
         * @return {?}
         */
        (r) => r[0])), switchMap((/**
         * @param {?} r
         * @return {?}
         */
        (r) => {
            if (!r)
                return new BehaviorSubject(undefined);
            return this.pipeInfTimePrimitive(r.fk_object_info).pipe(switchMap((/**
             * @param {?} infTimePrimitive
             * @return {?}
             */
            (infTimePrimitive) => this.p.pkProject$.pipe(switchMap((/**
             * @param {?} pkProject
             * @return {?}
             */
            (pkProject) => this.s.pro$.info_proj_rel$.by_fk_project__fk_entity$
                .key(pkProject + '_' + r[0].pk_entity).pipe(filter((/**
             * @param {?} statement
             * @return {?}
             */
            statement => !!statement)), map((/**
             * @param {?} ipr
             * @return {?}
             */
            ipr => {
                /** @type {?} */
                const y = {
                    calendar: (/** @type {?} */ ((ipr.calendar ? ipr.calendar : 'gregorian'))),
                    julianDay: infTimePrimitive.julian_day,
                    duration: (/** @type {?} */ (infTimePrimitive.duration))
                };
                return y;
            })))))))));
        }))));
    }
    /*********************************************************************
       * Project
      *********************************************************************/
    // @spyTag pipeRelatedTemporalEntities(pkEntity: number): Observable<InfTemporalEntity[]> {
    //   return this.s.inf$.statement$
    //     .by_object$({ fk_object_info: pkEntity })
    //     .pipe(
    //       auditTime(1),
    //       switchMapOr([], (statements) => combineLatest(
    //         statements.map(statement => this.s.inf$.temporal_entity$.by_pk_entity_key$(statement.fk_subject_info).pipe(
    //         ))
    //       ).pipe(
    //         map(x => x.filter((y) => !!y)),
    //       )),
    //     )
    // }
    /**
     * Pipe statements of an entity
     * @param {?} pkEntity
     * @param {?} isOutgoing
     * @return {?}
     */
    pipeStatements(pkEntity, isOutgoing) {
        return isOutgoing ? this.pipeOutgoingStatements(pkEntity) : this.pipeIngoingStatements(pkEntity);
    }
    /**
     * Pipe outgoing statements of an entity
     * @param {?} pkEntity
     * @return {?}
     */
    pipeOutgoingStatements(pkEntity) {
        return this.s.inf$.statement$.by_subject$({ fk_subject_info: pkEntity });
    }
    /**
     * Pipe ingoing statements of an entity
     * @param {?} pkEntity
     * @return {?}
     */
    pipeIngoingStatements(pkEntity) {
        return this.s.inf$.statement$.by_object$({ fk_object_info: pkEntity });
    }
    // pipeStatementsOfList(listDefinition: Subfield, pkEntity): Observable<InfStatement[]> {
    //   if (listDefinition.isOutgoing) {
    //     return this.s.inf$.statement$.by_subject_and_property$({
    //       fk_property: listDefinition.property.pkProperty,
    //       fk_property_of_property: listDefinition.property.pkPropertyOfProperty,
    //       fk_subject_info: pkEntity
    //     })
    //   } else {
    //     return this.s.inf$.statement$.by_object_and_property$({
    //       fk_property: listDefinition.property.pkProperty,
    //       fk_property_of_property: listDefinition.property.pkPropertyOfProperty,
    //       fk_object_info: pkEntity
    //     })
    //   }
    // }
    /**
     * Pipe outgoing statements of temporal entity
     * @param {?} pkProperty
     * @param {?} pkEntity
     * @return {?}
     */
    pipeOutgoingStatementsByProperty(pkProperty, pkEntity) {
        return this.s.inf$.statement$.by_subject_and_property$({
            fk_property: pkProperty,
            fk_subject_info: pkEntity
        });
    }
    /**
     * Pipe ingoing statements of an entity
     * @param {?} pkProperty
     * @param {?} pkEntity
     * @return {?}
     */
    pipeIngoingStatementsByProperty(pkProperty, pkEntity) {
        return this.s.inf$.statement$.by_object_and_property$({
            fk_property: pkProperty,
            fk_object_info: pkEntity
        });
    }
    /**
     * Pipe outgoing statements of temporal entity
     * @param {?} pkProperty
     * @param {?} pkEntity
     * @param {?} pkProject
     * @return {?}
     */
    pipeOutgoingBasicStatementItemsByProperty(pkProperty, pkEntity, pkProject) {
        return this.s.inf$.statement$.by_subject_and_property$({
            fk_property: pkProperty,
            fk_subject_info: pkEntity
        }).pipe(switchMap((/**
         * @param {?} statements
         * @return {?}
         */
        statements => combineLatestOrEmpty(statements.map((/**
         * @param {?} statement
         * @return {?}
         */
        statement => this.pipeBasicStatementItem(pkProject, statement, true)))))));
    }
    /**
     * Pipe ingoing statements of an entity
     * @param {?} pkProperty
     * @param {?} pkEntity
     * @param {?} pkProject
     * @return {?}
     */
    pipeIngoingBasicStatementItemsByProperty(pkProperty, pkEntity, pkProject) {
        return this.s.inf$.statement$.by_object_and_property$({
            fk_property: pkProperty,
            fk_object_info: pkEntity
        }).pipe(switchMap((/**
         * @param {?} statements
         * @return {?}
         */
        statements => combineLatestOrEmpty(statements.map((/**
         * @param {?} statement
         * @return {?}
         */
        statement => this.pipeBasicStatementItem(pkProject, statement, false)))))));
    }
    /**
     * @private
     * @param {?} pkProject
     * @param {?} statement
     * @param {?} isOutgoing
     * @return {?}
     */
    pipeBasicStatementItem(pkProject, statement, isOutgoing) {
        return this.s.pro$.info_proj_rel$.by_fk_project__fk_entity$.key(pkProject + '_' + statement.pk_entity).pipe(filter((/**
         * @param {?} x
         * @return {?}
         */
        x => !!x)), map((/**
         * @param {?} projRel
         * @return {?}
         */
        projRel => ({
            projRel, statement, label: '', ordNum: (isOutgoing ? projRel.ord_num_of_range : projRel.ord_num_of_domain), isOutgoing
        }))));
    }
    /**
     * @param {?} pkProject
     * @param {?} pkStatement
     * @param {?} isOutgoing
     * @return {?}
     */
    pipeBasicStatementItemByPkStatement(pkProject, pkStatement, isOutgoing) {
        return this.s.inf$.statement$.by_pk_entity_key$(pkStatement).pipe(switchMap((/**
         * @param {?} statement
         * @return {?}
         */
        statement => (!statement) ? of(undefined) : this.pipeBasicStatementItem(pkProject, statement, isOutgoing))));
    }
    /**
     * @param {?} pkEntity
     * @return {?}
     */
    pipeInfTimePrimitive(pkEntity) {
        return this.s.inf$.time_primitive$.by_pk_entity$.key(pkEntity);
    }
    /**
     * pipes the TimeSpan of a temporal entity
     * @param {?} pkEntity the pk_entity of the termporal entity
     * @return {?}
     */
    pipeTimeSpan(pkEntity) {
        // Get the properties leading to presences
        return combineLatest(this.pipeOutgoingStatementsByProperty(72, pkEntity).pipe(this.timePrimitiveOfStatements()), this.pipeOutgoingStatementsByProperty(71, pkEntity).pipe(this.timePrimitiveOfStatements()), this.pipeOutgoingStatementsByProperty(150, pkEntity).pipe(this.timePrimitiveOfStatements()), this.pipeOutgoingStatementsByProperty(151, pkEntity).pipe(this.timePrimitiveOfStatements()), this.pipeOutgoingStatementsByProperty(152, pkEntity).pipe(this.timePrimitiveOfStatements()), this.pipeOutgoingStatementsByProperty(153, pkEntity).pipe(this.timePrimitiveOfStatements())).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        ([_72, _71, _150, _151, _152, _153]) => new TimeSpanUtil({
            p82: _72,
            p81: _71,
            p82a: _152,
            p81a: _150,
            p81b: _151,
            p82b: _153,
        }))));
    }
    /**
     * Pipes the fk_class of the given entity
     * @param {?} pkEntity
     * @return {?}
     */
    pipeClassOfEntity(pkEntity) {
        return merge(this.s.inf$.persistent_item$.by_pk_entity_key$(pkEntity).pipe(filter((/**
         * @param {?} e
         * @return {?}
         */
        e => !!e)), map((/**
         * @param {?} e
         * @return {?}
         */
        e => e.fk_class))), this.s.inf$.temporal_entity$.by_pk_entity_key$(pkEntity).pipe(filter((/**
         * @param {?} e
         * @return {?}
         */
        e => !!e)), map((/**
         * @param {?} e
         * @return {?}
         */
        e => e.fk_class))));
    }
    /**
     * Pipes distinct fk_classes of the given persistent items
     * @param {?} pkEntities
     * @return {?}
     */
    pipeClassesOfPersistentItems(pkEntities) {
        return this.s.inf$.persistent_item$.by_pk_entity_all$().pipe(map((/**
         * @param {?} peIts
         * @return {?}
         */
        (peIts) => {
            if (!pkEntities || pkEntities.length === 0) {
                return [];
            }
            /** @type {?} */
            const classes = {};
            /** @type {?} */
            const a = [];
            pkEntities.forEach((/**
             * @param {?} typePk
             * @return {?}
             */
            typePk => {
                if (!classes[peIts[typePk].fk_class]) {
                    classes[peIts[typePk].fk_class] = true;
                    a.push(peIts[typePk].fk_class);
                }
            }));
            return a;
        })));
    }
    /*********************************************************************
       * Repo
      *********************************************************************/
    /**
     * Pipe repo outgoing statements.
     * @param {?} pkEntity
     * @return {?}
     */
    pipeRepoOutgoingStatements(pkEntity) {
        return this.s.inf$.statement$.by_subject$({ fk_subject_info: pkEntity }, false);
    }
    /**
     * Pipe repo ingoing statements.
     * @param {?} pkEntity
     * @return {?}
     */
    pipeRepoIngoingStatements(pkEntity) {
        return this.s.inf$.statement$.by_object$({ fk_object_info: pkEntity }, false);
    }
    /**
     * Pipe repo outgoing statements.
     * If max quantity is limited, takes only max allowed number of statements, starting with highest is_in_project_count
     * @param {?} pkProperty
     * @param {?} pkEntity
     * @return {?}
     */
    pipeRepoOutgoingStatementsByProperty(pkProperty, pkEntity) {
        return combineLatest(this.s.dfh$.property$.by_pk_property$.key(pkProperty)
            .pipe(filter((/**
         * @param {?} x
         * @return {?}
         */
        x => !!x && Object.keys(x).length > 0)), map((/**
         * @param {?} p
         * @return {?}
         */
        p => values$1(p)[0].range_instances_max_quantifier))), this.s.inf$.statement$
            .by_subject_and_property$({
            fk_property: pkProperty,
            fk_subject_info: pkEntity
        }, false)
        // .pipe(filter(x => !!x))
        ).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        ([m, rs]) => {
            if (rs.length === 0)
                return rs;
            /** @type {?} */
            const r = this.sortStatementsByRepoPopularity(rs);
            return (m === -1 || m === null) ? r : r.slice(0, m);
        })));
    }
    /**
     * Pipe repo ingoing statements.
     * If max quantity is limited, takes only max allowed number of statements, starting with highest is_in_project_count
     * @param {?} pkProperty
     * @param {?} pkEntity
     * @return {?}
     */
    pipeRepoIngoingStatementsByProperty(pkProperty, pkEntity) {
        return combineLatest(this.s.dfh$.property$.by_pk_property$.key(pkProperty)
            .pipe(filter((/**
         * @param {?} x
         * @return {?}
         */
        x => !!x && Object.keys(x).length > 0)), map((/**
         * @param {?} p
         * @return {?}
         */
        p => values$1(p)[0].domain_instances_max_quantifier))), this.s.inf$.statement$
            .by_object_and_property$({
            fk_property: pkProperty,
            fk_object_info: pkEntity
        }, false)
        // .pipe(filter(x => !!x))
        ).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        ([m, rs]) => {
            if (rs.length === 0)
                return rs;
            /** @type {?} */
            const r = this.sortStatementsByRepoPopularity(rs);
            return (m === -1 || m === null) ? r : r.slice(0, m);
        })));
    }
    /**
     * ******************************************************************
     * Alternatives (Repo minus Project)
     * *******************************************************************
     * @param {?} pkStatement
     * @param {?} isOutgoing
     * @return {?}
     */
    pipeAlternativeBasicStatementItemByPkStatement(pkStatement, isOutgoing) {
        return combineLatest(this.s.inf$.statement$.by_pk_entity_key$(pkStatement, false), this.s.inf$.statement$.by_pk_entity_key$(pkStatement))
            .pipe(filter((/**
         * @param {?} __0
         * @return {?}
         */
        ([inrepo]) => !!inrepo)), map((/**
         * @param {?} __0
         * @return {?}
         */
        ([inrepo, inproject]) => {
            if (inproject) {
                return undefined;
            }
            else {
                /** @type {?} */
                const i = {
                    projRel: undefined,
                    statement: inrepo,
                    ordNum: undefined,
                    isOutgoing,
                    label: ''
                };
                return i;
            }
        })));
    }
    /**
     * Pipe alternative ingoing statements (= statements not in active project)
     * @param {?} pkProperty
     * @param {?} pkEntity
     * @return {?}
     */
    pipeAlternativeIngoingStatements(pkProperty, pkEntity) {
        return combineLatest(this.s.inf$.statement$.by_object_and_property_indexed$({
            fk_property: pkProperty,
            fk_object_info: pkEntity
        }, false), this.s.inf$.statement$.by_object_and_property_indexed$({
            fk_property: pkProperty,
            fk_object_info: pkEntity
        }).pipe(map((/**
         * @param {?} inproject
         * @return {?}
         */
        inproject => inproject ? Object.keys(inproject) : [])))).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        ([inrepo, inproject]) => omit(inproject, inrepo))), map((/**
         * @param {?} statements
         * @return {?}
         */
        statements => values$1(statements))));
    }
    /**
     * Pipe alternative outgoing statements (= statements not in active project)
     * @param {?} pkProperty
     * @param {?} pkEntity
     * @return {?}
     */
    pipeAlternativeOutgoingStatements(pkProperty, pkEntity) {
        return combineLatest(this.s.inf$.statement$.by_subject_and_property_indexed$({
            fk_property: pkProperty,
            fk_subject_info: pkEntity
        }, false), this.s.inf$.statement$.by_subject_and_property_indexed$({
            fk_property: pkProperty,
            fk_subject_info: pkEntity
        }).pipe(map((/**
         * @param {?} inproject
         * @return {?}
         */
        inproject => inproject ? Object.keys(inproject) : [])))).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        ([inrepo, inproject]) => omit(inproject, inrepo))), map((/**
         * @param {?} statements
         * @return {?}
         */
        statements => values$1(statements))));
    }
    /**
     * get array of pks of persistent items of a specific class
     * @param {?} pkClass
     * @return {?}
     */
    pipePersistentItemPksByClass(pkClass) {
        return this.s.inf$.persistent_item$.by_fk_class_key$(pkClass).pipe(map((/**
         * @param {?} ob
         * @return {?}
         */
        ob => {
            if (ob)
                return Object.keys(ob).map((/**
                 * @param {?} k
                 * @return {?}
                 */
                k => parseInt(k, 10)));
            return [];
        })));
    }
    /**
     * gets the css classes for that entity
     * @param {?} pkEntity
     * @return {?}
     */
    pipeIconType(pkEntity) {
        return this.p.streamEntityPreview(pkEntity).pipe(map((/**
         * @param {?} preview
         * @return {?}
         */
        preview => {
            if (preview.entity_type == 'teEn') {
                return 'temporal-entity';
            }
            if (preview.fk_class === DfhConfig.CLASS_PK_EXPRESSION_PORTION) {
                return 'expression-portion';
            }
            else if (DfhConfig.CLASS_PKS_SOURCE_PE_IT.includes(preview.fk_class)) {
                return 'source';
            }
            return 'persistent-entity';
        })));
    }
    /**
     * ******************************************************************
     * Helpers
     * *******************************************************************
     * @param {?} statements
     * @return {?}
     */
    sortStatementsByRepoPopularity(statements) {
        return statements.sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        (a, b) => a.is_in_project_count > b.is_in_project_count ? 1 : -1));
    }
}
InformationBasicPipesService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
InformationBasicPipesService.ctorParameters = () => [
    { type: ActiveProjectPipesService },
    { type: SchemaSelectorsService }
];
/** @nocollapse */ InformationBasicPipesService.ngInjectableDef = ɵɵdefineInjectable({ factory: function InformationBasicPipesService_Factory() { return new InformationBasicPipesService(ɵɵinject(ActiveProjectPipesService), ɵɵinject(SchemaSelectorsService)); }, token: InformationBasicPipesService, providedIn: "root" });
__decorate([
    spyTag,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Observable)
], InformationBasicPipesService.prototype, "pipeStatements", null);
__decorate([
    spyTag,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Observable)
], InformationBasicPipesService.prototype, "pipeOutgoingStatements", null);
__decorate([
    spyTag,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Observable)
], InformationBasicPipesService.prototype, "pipeIngoingStatements", null);
__decorate([
    spyTag,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Observable)
], InformationBasicPipesService.prototype, "pipeOutgoingStatementsByProperty", null);
__decorate([
    spyTag,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Observable)
], InformationBasicPipesService.prototype, "pipeIngoingStatementsByProperty", null);
__decorate([
    spyTag,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number]),
    __metadata("design:returntype", Observable)
], InformationBasicPipesService.prototype, "pipeOutgoingBasicStatementItemsByProperty", null);
__decorate([
    spyTag,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number]),
    __metadata("design:returntype", Observable)
], InformationBasicPipesService.prototype, "pipeIngoingBasicStatementItemsByProperty", null);
__decorate([
    spyTag,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, InfStatement, Boolean]),
    __metadata("design:returntype", Observable)
], InformationBasicPipesService.prototype, "pipeBasicStatementItem", null);
__decorate([
    spyTag,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Boolean]),
    __metadata("design:returntype", Observable)
], InformationBasicPipesService.prototype, "pipeBasicStatementItemByPkStatement", null);
__decorate([
    spyTag,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Observable)
], InformationBasicPipesService.prototype, "pipeInfTimePrimitive", null);
__decorate([
    spyTag,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Observable)
], InformationBasicPipesService.prototype, "pipeTimeSpan", null);
__decorate([
    spyTag,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Observable)
], InformationBasicPipesService.prototype, "pipeClassOfEntity", null);
__decorate([
    spyTag,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Observable)
], InformationBasicPipesService.prototype, "pipeClassesOfPersistentItems", null);
__decorate([
    spyTag,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Observable)
], InformationBasicPipesService.prototype, "pipeRepoOutgoingStatements", null);
__decorate([
    spyTag,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Observable)
], InformationBasicPipesService.prototype, "pipeRepoIngoingStatements", null);
__decorate([
    spyTag,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Observable)
], InformationBasicPipesService.prototype, "pipeRepoOutgoingStatementsByProperty", null);
__decorate([
    spyTag,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Observable)
], InformationBasicPipesService.prototype, "pipeRepoIngoingStatementsByProperty", null);
__decorate([
    spyTag,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Boolean]),
    __metadata("design:returntype", Observable)
], InformationBasicPipesService.prototype, "pipeAlternativeBasicStatementItemByPkStatement", null);
__decorate([
    spyTag,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Observable)
], InformationBasicPipesService.prototype, "pipeAlternativeIngoingStatements", null);
__decorate([
    spyTag,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Observable)
], InformationBasicPipesService.prototype, "pipeAlternativeOutgoingStatements", null);
__decorate([
    spyTag,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Observable)
], InformationBasicPipesService.prototype, "pipePersistentItemPksByClass", null);
if (false) {
    /**
     * Pipes max. one time primitive for an array of statements, assuming that the statements
     * are of the same properties.
     * @type {?}
     */
    InformationBasicPipesService.prototype.timePrimitiveOfStatements;
    /**
     * @type {?}
     * @private
     */
    InformationBasicPipesService.prototype.p;
    /**
     * @type {?}
     * @private
     */
    InformationBasicPipesService.prototype.s;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/services/information-pipes.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This Service provides a collecion of pipes that aggregate or transform information.
 * For Example
 * - the lists of text properties, appellaitons, places, time-primitives / time-spans etc.
 * - the label of temporal entity or persistent item
 *
 * This mainly selects data from the information schema and the relation to projects.
 * It combines pipes selecting data from the
 * - activated project
 * - alternatives (not in project but in others)
 * - repo
 *
 */
class InformationPipesService {
    /**
     * @param {?} b
     * @param {?} p
     * @param {?} s
     * @param {?} c
     * @param {?} timePrimitivePipe
     * @param {?} timeSpanPipe
     * @param {?} ngRedux
     */
    constructor(b, p, s, c, timePrimitivePipe, timeSpanPipe, ngRedux) {
        this.b = b;
        this.p = p;
        this.s = s;
        this.c = c;
        this.timePrimitivePipe = timePrimitivePipe;
        this.timeSpanPipe = timeSpanPipe;
        this.infRepo = new InfSelector(ngRedux, of('repo'));
    }
    /*********************************************************************
       * Pipe the project entities
       *********************************************************************/
    //   // @spyTag
    //   pipeListLength(l: Subfield, pkEntity: number): Observable<number> {
    //     switch (l.listType) {
    //       case 'appellation':
    //       case 'entity-preview':
    //       case 'language':
    //       case 'place':
    //       case 'dimension':
    //       case 'langString':
    //       case 'temporal-entity':
    //         return this.pipeList(l, pkEntity).pipe(map(items => items.length))
    //       case 'time-span':
    //         return combineLatest(
    //           this.b.pipeOutgoingStatementsByProperty(72, pkEntity),
    //           this.b.pipeOutgoingStatementsByProperty(71, pkEntity),
    //           this.b.pipeOutgoingStatementsByProperty(150, pkEntity),
    //           this.b.pipeOutgoingStatementsByProperty(151, pkEntity),
    //           this.b.pipeOutgoingStatementsByProperty(152, pkEntity),
    //           this.b.pipeOutgoingStatementsByProperty(153, pkEntity)
    //         ).pipe(
    //           tap((x) => {
    //           }),
    //           map(items => items.filter(x => x.length > 0).length))
    //       // case 'text-property':
    //       //   return this.pipeListTextProperty(l, pkEntity).pipe(map(items => items.length))
    //       default:
    //         console.warn('unsupported listType')
    //         return new BehaviorSubject(0);
    //     }
    //   }
    //   // @spyTag
    //   pipeList(l: Subfield, pkEntity, limit?: number): Observable<ItemList> {
    //     if (l.listType.appellation) return this.pipeListAppellation(l, pkEntity, limit)
    //     else if (l.listType.entityPreview) return this.pipeListEntityPreview(l, pkEntity, limit)
    //     else if (l.listType.language) return this.pipeListLanguage(l, pkEntity, limit)
    //     else if (l.listType.place) return this.pipeListPlace(l, pkEntity, limit)
    //     else if (l.listType.dimension) return this.pipeListDimension(l, pkEntity, limit)
    //     else if (l.listType.langString) return this.pipeListLangString(l, pkEntity, limit)
    //     else if (l.listType.temporalEntity) return this.pipeListEntityPreview(l, pkEntity, limit)
    //     else if (l.listType.timeSpan) {
    //       return this.pipeItemTimeSpan(pkEntity).pipe(
    //         map((ts) => [ts].filter(i => i.properties.length > 0))
    //       )
    //     }
    //     else console.warn('unsupported listType')
    //   }
    //   // @spyTag
    //   pipeListBasicStatementItems(listDefinition: Subfield, pkEntity: number, pkProject: number): Observable<BasicStatementItem[]> {
    //     return (listDefinition.isOutgoing ?
    //       this.b.pipeOutgoingBasicStatementItemsByProperty(listDefinition.property.pkProperty, pkEntity, pkProject) :
    //       this.b.pipeIngoingBasicStatementItemsByProperty(listDefinition.property.pkProperty, pkEntity, pkProject)
    //     )
    //   }
    //   /**
    //    * Pipe the items in appellation field
    //    */
    //   // @spyTag
    //   pipeListAppellation<T>(listDefinition: Subfield, pkEntity: number, limit?: number): Observable<AppellationItem[]> {
    //     return this.b.pipeStatementsOfList(listDefinition, pkEntity)
    //       .pipe(
    //         switchMap((statements) => {
    //           return combineLatest(statements.map((r, i) => this.pipeItemAppellation(r)))
    //             .pipe(
    //               map(nodes => nodes.filter(node => !!node && node.fkClass === listDefinition.targetClass)),
    //               limitTo(limit),
    //               startWith([]))
    //         }))
    //   }
    //   /**
    //  * Pipe the items in entity preview field
    //  */
    //   // @spyTag
    //   pipeListEntityPreview<T>(listDefinition: Subfield, pkEntity: number, limit?: number): Observable<EntityPreviewItem[]> {
    //     return this.b.pipeStatementsOfList(listDefinition, pkEntity)
    //       .pipe(
    //         tag(`before-${pkEntity}-${listDefinition.property.pkProperty}-${listDefinition.targetClass}`),
    //         switchMap((statements) => {
    //           return combineLatest(statements.map((r, i) => this.pipeItemEntityPreview(r, listDefinition.isOutgoing)))
    //             .pipe(
    //               map(nodes => nodes.filter(node => !!node && node.fkClass === listDefinition.targetClass)
    //                 .sort((a, b) => a.ordNum > b.ordNum ? 1 : -1),
    //                 limitTo(limit),
    //               ),
    //               startWith([])
    //             )
    //         }),
    //         tag(`after-${pkEntity}-${listDefinition.property.pkProperty}-${listDefinition.targetClass}`),
    //       )
    //   }
    //   // @spyTag
    //   pipeListLanguage<T>(listDefinition: Subfield, pkEntity: number, limit?: number): Observable<LanguageItem[]> {
    //     return this.b.pipeStatementsOfList(listDefinition, pkEntity)
    //       .pipe(
    //         switchMap((statements) => {
    //           return combineLatest(statements.map((r, i) => this.pipeItemLanguage(r)))
    //             .pipe(
    //               map(nodes => nodes.filter(node => !!node && node.fkClass === listDefinition.targetClass)),
    //               limitTo(limit),
    //               startWith([]))
    //         }))
    //   }
    //   /**
    //    * Pipe the items in place list
    //    */
    //   // @spyTag
    //   pipeListPlace<T>(listDefinition: Subfield, pkEntity: number, limit?: number): Observable<PlaceItem[]> {
    //     return this.b.pipeStatementsOfList(listDefinition, pkEntity)
    //       .pipe(
    //         switchMap((statements) => {
    //           return combineLatest(statements.map((r, i) => this.pipeItemPlace(r)))
    //             .pipe(
    //               map(nodes => nodes.filter(node => !!node && node.fkClass === listDefinition.targetClass)),
    //               limitTo(limit),
    //               startWith([]))
    //         }))
    //   }
    //   /**
    //    * Pipe the items in place list
    //    */
    //   // @spyTag
    //   pipeListDimension<T>(listDefinition: Subfield, pkEntity: number, limit?: number): Observable<DimensionItem[]> {
    //     return this.b.pipeStatementsOfList(listDefinition, pkEntity)
    //       .pipe(
    //         switchMap((statements) => {
    //           return combineLatest(statements.map((r, i) => this.pipeItemDimension(r)))
    //             .pipe(
    //               map(nodes => nodes.filter(node => !!node && node.fkClass === listDefinition.targetClass)),
    //               limitTo(limit),
    //               startWith([]))
    //         }))
    //   }
    //   /**
    //  * Pipe the items in langString list
    //  */
    //   // @spyTag
    //   pipeListLangString<T>(listDefinition: Subfield, pkEntity: number, limit?: number): Observable<LangStringItem[]> {
    //     return this.b.pipeStatementsOfList(listDefinition, pkEntity)
    //       .pipe(
    //         switchMap((statements) => {
    //           return combineLatest(statements.map((r, i) => this.pipeItemLangString(r)))
    //             .pipe(
    //               map(nodes => nodes.filter(node => !!node && node.fkClass === listDefinition.targetClass)),
    //               limitTo(limit),
    //               startWith([]))
    //         }))
    //   }
    /**
     * pipe the project relation of given statment, if the scope of this page is inProject
     * @param {?} stmt InfStatement to be completed with projRel
     * @param {?} page page for which we are piping this stuff
     * @return {?}
     */
    pipeProjRelOfStatement(stmt, page) {
        if (page.scope.inProject) {
            return this.s.pro$.info_proj_rel$.by_fk_project__fk_entity$
                .key(page.scope.inProject + '_' + stmt.pk_entity).pipe(map((/**
             * @param {?} projRel
             * @return {?}
             */
            projRel => ({
                projRel,
                ordNum: page.isOutgoing ? projRel.ord_num_of_range : projRel.ord_num_of_domain
            }))));
        }
        else {
            return new BehaviorSubject({
                projRel: undefined,
                ordNum: 0
            });
        }
    }
    /**
     * pipe the target of given statment
     * @param {?} stmt InfStatement to be completed with target
     * @param {?} page page for which we are piping this stuff
     * @param {?} targets
     * @return {?}
     */
    pipeTargetOfStatement(stmt, page, targets) {
        /** @type {?} */
        const isOutgoing = page.isOutgoing;
        /** @type {?} */
        const targetInfo = isOutgoing ? stmt.fk_object_info : stmt.fk_subject_info;
        // here you could add targetData or targetCell
        return this.s.inf$.getModelOfEntity$(targetInfo).pipe(filter((/**
         * @param {?} x
         * @return {?}
         */
        x => !!x)), switchMap((/**
         * @param {?} item
         * @return {?}
         */
        item => {
            /** @type {?} */
            const subfieldType = targets[item.fkClass];
            if (subfieldType.appellation) {
                return this.s.inf$.appellation$.by_pk_entity$.key(targetInfo).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => !!x)), map((/**
                 * @param {?} appellation
                 * @return {?}
                 */
                appellation => {
                    /** @type {?} */
                    const stmtTarget = {
                        statement: stmt,
                        isOutgoing,
                        targetLabel: appellation.string,
                        targetClass: appellation.fk_class,
                        target: {
                            appellation
                        }
                    };
                    return stmtTarget;
                })));
            }
            else if (subfieldType.place) {
                return this.s.inf$.place$.by_pk_entity$.key(targetInfo).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => !!x)), map((/**
                 * @param {?} place
                 * @return {?}
                 */
                place => {
                    /** @type {?} */
                    const stmtTarget = {
                        statement: stmt,
                        isOutgoing,
                        targetLabel: `WGS84: ${place.lat}°, ${place.long}°`,
                        targetClass: place.fk_class,
                        target: {
                            place
                        }
                    };
                    return stmtTarget;
                })));
            }
            else if (subfieldType.dimension) {
                return this.s.inf$.dimension$.by_pk_entity$.key(targetInfo).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => !!x)), switchMap((/**
                 * @param {?} dimension
                 * @return {?}
                 */
                dimension => {
                    return this.p.streamEntityPreview(dimension.fk_measurement_unit)
                        .pipe(map((/**
                     * @param {?} unitPreview
                     * @return {?}
                     */
                    unitPreview => {
                        /** @type {?} */
                        const stmtTarget = {
                            statement: stmt,
                            isOutgoing,
                            targetLabel: `${dimension.numeric_value} ${unitPreview.entity_label}`,
                            targetClass: dimension.fk_class,
                            target: {
                                dimension
                            }
                        };
                        return stmtTarget;
                    })));
                })));
            }
            else if (subfieldType.langString) {
                return this.s.inf$.lang_string$.by_pk_entity$.key(targetInfo).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => !!x)), switchMap((/**
                 * @param {?} langString
                 * @return {?}
                 */
                langString => {
                    return this.s.inf$.language$.by_pk_entity$.key(langString.fk_language)
                        .pipe(map((/**
                     * @param {?} language
                     * @return {?}
                     */
                    language => {
                        /** @type {?} */
                        const stmtTarget = {
                            statement: stmt,
                            isOutgoing,
                            targetLabel: `${langString.string} (${language.iso6391})`,
                            targetClass: langString.fk_class,
                            target: {
                                langString
                            }
                        };
                        return stmtTarget;
                    })));
                })));
            }
            else if (subfieldType.language) {
                return this.s.inf$.language$.by_pk_entity$.key(targetInfo).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => !!x)), map((/**
                 * @param {?} language
                 * @return {?}
                 */
                language => {
                    /** @type {?} */
                    const stmtTarget = {
                        statement: stmt,
                        isOutgoing,
                        targetLabel: `${language.notes || language.iso6391}`,
                        targetClass: language.fk_class,
                        target: {
                            language
                        }
                    };
                    return stmtTarget;
                })));
            }
            else if (subfieldType.entityPreview || subfieldType.typeItem) {
                return this.p.streamEntityPreview(targetInfo).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => !!x)), map((/**
                 * @param {?} entityPreview
                 * @return {?}
                 */
                entityPreview => {
                    /** @type {?} */
                    const stmtTarget = {
                        statement: stmt,
                        isOutgoing,
                        targetLabel: `${entityPreview.entity_label}`,
                        targetClass: entityPreview.fk_class,
                        target: {
                            entityPreview
                        }
                    };
                    return stmtTarget;
                })));
            }
            else if (subfieldType.temporalEntity) {
                return this.s.inf$.temporal_entity$._by_pk_entity$.key(targetInfo).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => !!x)), map((/**
                 * @param {?} temporalEntity
                 * @return {?}
                 */
                temporalEntity => {
                    /** @type {?} */
                    const stmtTarget = {
                        statement: stmt,
                        isOutgoing,
                        targetLabel: ``,
                        targetClass: temporalEntity.fk_class,
                        target: {
                            entity: {
                                pkEntity: temporalEntity.pk_entity,
                                fkClass: temporalEntity.fk_class
                            }
                        }
                    };
                    return stmtTarget;
                })));
                // console.log('subfieldType.temporalEntity.length', subfieldType.temporalEntity.length)
                // // for each of these subfields
                // const subentityPages$ = subfieldType.temporalEntity.map(subfieldReq => {
                //   // console.log('subentity subfield for targetInfo', targetInfo)
                //   // create page:GvSubfieldPage
                //   const { isCircular, ...p } = subfieldReq.page
                //   const scope = page.scope.notInProject ? { inRepo: true } : page.scope
                //   const nestedPage: GvFieldPage = {
                //     ...p,
                //     fkSourceEntity: targetInfo,
                //     scope,
                //   }
                //   return this.pipeSubfieldPage(nestedPage, subfieldReq.subfieldType).pipe(
                //     map(({ count, statements }) => {
                //       const { limit, offset, ...s } = nestedPage;
                //       const subentitySubfieldPage: SubentitySubfieldPage = {
                //         subfield: s,
                //         count,
                //         statements
                //       }
                //       return subentitySubfieldPage
                //     }),
                //     // startWith(undefined) // TODO remove! this is for debugging
                //   )
                // })
                // return combineLatestOrEmpty(subentityPages$)
                //   .pipe(
                //     // filter(subfields => {
                //     //   console.log('subfields\n', subfields.map((item, i) => {
                //     //     const req = subfieldType.temporalEntity[i]
                //     //     const fieldInfo = targetInfo + '_' + req.page.fkProperty + '_' + req.page.targetClass + '_' + keys(req.subfieldType)[0]
                //     //     return `${i}: ${item === undefined ?
                //     //       `undefined ${fieldInfo}` :
                //     //       `ok        ${fieldInfo}`
                //     //       }`
                //     //   }).join('\n'))
                //     //   return !subfields.includes(undefined)
                //     // }),
                //     map(
                //       subfields => {
                //         const stmtTarget: StatementTarget = {
                //           statement: stmt,
                //           isOutgoing,
                //           targetLabel: '',
                //           targetClass: page.targetClass,
                //           target: {
                //             entity: {
                //               pkEntity: targetInfo,
                //               subfields
                //             }
                //           }
                //         }
                //         return stmtTarget
                //       }
                //     )
                //   )
            }
            else if (subfieldType.timePrimitive) {
                return this.s.inf$.time_primitive$.by_pk_entity$.key(targetInfo).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => !!x)), switchMap((/**
                 * @param {?} timePrimitive
                 * @return {?}
                 */
                timePrimitive => {
                    // get calendar
                    /** @type {?} */
                    let cal$;
                    if (page.scope.inProject) {
                        cal$ = this.s.pro$.info_proj_rel$.by_fk_project__fk_entity$.key(page.scope.inProject + '_' + stmt.pk_entity)
                            .pipe(map((/**
                         * @param {?} infoProjRel
                         * @return {?}
                         */
                        infoProjRel => (/** @type {?} */ (infoProjRel.calendar)))));
                    }
                    else {
                        cal$ = new BehaviorSubject((/** @type {?} */ (stmt.community_favorite_calendar)));
                    }
                    // pipe target time primitive of stmt
                    return cal$.pipe(map((/**
                     * @param {?} cal
                     * @return {?}
                     */
                    cal => {
                        /** @type {?} */
                        const timePrimWithCal = infTimePrimToTimePrimWithCal(timePrimitive, cal);
                        /** @type {?} */
                        const stmtTarget = {
                            statement: stmt,
                            isOutgoing,
                            targetLabel: this.timePrimitivePipe.transform(timePrimWithCal),
                            targetClass: timePrimitive.fk_class,
                            target: {
                                timePrimitive: timePrimWithCal
                            }
                        };
                        return stmtTarget;
                    })));
                })));
            }
            throw new Error(`No implementation found for subfieldType ${JSON.stringify(subfieldType)}`);
        })));
    }
    /**
     * pipe target and projRel of the given statement
     * @param {?} stmt
     * @param {?} page
     * @param {?} targets
     * @return {?}
     */
    pipeStatementWithTarget(stmt, page, targets) {
        return combineLatest(this.pipeTargetOfStatement(stmt, page, targets), this.pipeProjRelOfStatement(stmt, page)).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        ([target, projRel]) => (Object.assign({}, target, projRel)))));
    }
    /**
     * @param {?} page
     * @param {?} targets
     * @return {?}
     */
    pipeSubfieldPage(page, targets) {
        if (page.fkProperty === DfhConfig.PROPERTY_PK_HAS_TIME_SPAN && page.isOutgoing) {
            // if timeSpan make a short cut: produce a virtual statementWithTarget from entity to timeSpan
            return this.pipeTimeSpan(page);
        }
        else {
            // get the statments of that page
            return combineLatest(this.s.inf$.statement$.pagination$.pipeCount(page), this.s.inf$.statement$.pagination$.pipePage(page)
                .pipe(switchMap((/**
             * @param {?} pkStmts
             * @return {?}
             */
            pkStmts => combineLatestOrEmpty(pkStmts.map((/**
             * @param {?} pkStmt
             * @return {?}
             */
            pkStmt => this.s.inf$.statement$.by_pk_entity$.key(pkStmt)
                // for each statement, depending on the subfieldType, load the corresponding target
                .pipe(filter((/**
             * @param {?} stmt
             * @return {?}
             */
            stmt => !!stmt)), switchMap((/**
             * @param {?} stmt
             * @return {?}
             */
            stmt => this.pipeStatementWithTarget(stmt, page, targets))))))))))).pipe(map((/**
             * @param {?} __0
             * @return {?}
             */
            ([count, statements]) => ({ count, statements }))));
        }
    }
    /**
     * @private
     * @param {?} page
     * @return {?}
     */
    pipeTimeSpan(page) {
        /** @type {?} */
        const virtualStatementToTimeSpan = { fk_object_info: page.fkSourceEntity };
        /** @type {?} */
        const targets = { [DfhConfig.ClASS_PK_TIME_SPAN]: { timeSpan: 'true' } }
        // console.log('subfieldType.temporalEntity.length', subfieldType.temporalEntity.length)
        // for each of these subfields
        ;
        // console.log('subfieldType.temporalEntity.length', subfieldType.temporalEntity.length)
        // for each of these subfields
        /** @type {?} */
        const subentityPages$ = DfhConfig.PROPERTY_PKS_WHERE_TIME_PRIMITIVE_IS_RANGE
            .map((/**
         * @param {?} fkProperty
         * @return {?}
         */
        fkProperty => {
            // console.log('subentity subfield for targetInfo', targetInfo)
            // console.log('subentity subfield for targetInfo', targetInfo)
            // create page:GvSubfieldPage
            /** @type {?} */
            const scope = page.scope.notInProject ? { inRepo: true } : page.scope;
            /** @type {?} */
            const nestedPage = {
                fkProperty,
                isOutgoing: true,
                limit: 1,
                offset: 0,
                fkSourceEntity: page.fkSourceEntity,
                scope,
            };
            /** @type {?} */
            const subfType = {
                timePrimitive: 'true'
            };
            /** @type {?} */
            const trgts = {
                [DfhConfig.CLASS_PK_TIME_PRIMITIVE]: subfType
            };
            return this.pipeSubfieldPage(nestedPage, trgts).pipe(map((/**
             * @param {?} __0
             * @return {?}
             */
            ({ count, statements }) => {
                const { limit, offset } = nestedPage, s = __rest(nestedPage, ["limit", "offset"]);
                /** @type {?} */
                const subentitySubfieldPage = {
                    subfield: s,
                    count,
                    statements
                };
                return subentitySubfieldPage;
            })));
        }));
        return combineLatestOrEmpty(subentityPages$)
            .pipe(map((/**
         * @param {?} subfields
         * @return {?}
         */
        subfields => {
            /** @type {?} */
            const timeSpanPreview = {};
            subfields.forEach((/**
             * @param {?} s
             * @return {?}
             */
            s => {
                if (s.statements[0]) {
                    /** @type {?} */
                    const st = s.statements[0];
                    /** @type {?} */
                    const key = DfhConfig.PROPERTY_PK_TO_EXISTENCE_TIME_KEY[st.statement.fk_property];
                    timeSpanPreview[key] = st.target.timePrimitive;
                }
            }));
            /** @type {?} */
            const stmtTarget = {
                statement: virtualStatementToTimeSpan,
                isOutgoing: page.isOutgoing,
                targetLabel: this.timeSpanPipe.transform(new TimeSpanUtil(timeSpanPreview)),
                targetClass: DfhConfig.ClASS_PK_TIME_SPAN,
                target: {
                    timeSpan: {
                        preview: timeSpanPreview,
                        subfields
                    }
                }
            };
            return stmtTarget;
        }))).pipe(map((/**
         * @param {?} stmtTarget
         * @return {?}
         */
        stmtTarget => {
            /** @type {?} */
            const stmtWT = Object.assign({}, stmtTarget, { projRel: undefined, ordNum: undefined });
            return { count: 1, statements: [stmtWT] };
        })));
    }
    // pipeStatementListPage(
    //   paginateBy: PaginateByParam[],
    //   limit: number,
    //   offset: number,
    //   pkProject: number,
    //   listDefinition: Subfield,
    //   alternative = false): Observable<EntityPreviewItem[]> {
    //   // prepare page loader
    //   const pageLoader$ = alternative ? this.infRepo.statement$.pagination$ : this.s.inf$.statement$.pagination$;
    //   // prepare basic statement item loader
    //   const basicStatementItemLoader = (pkStatement, isOutgoing, pkProj) => {
    //     return alternative ?
    //       this.b.pipeAlternativeBasicStatementItemByPkStatement(pkStatement, isOutgoing) :
    //       this.b.pipeBasicStatementItemByPkStatement(pkProj, pkStatement, isOutgoing)
    //   }
    //   const paginatedStatementPks$ = pageLoader$.pipePage(paginateBy, limit, offset)
    //   return paginatedStatementPks$.pipe(
    //     switchMap((paginatedStatementPks) => combineLatestOrEmpty(
    //       paginatedStatementPks.map(pkStatement => basicStatementItemLoader(pkStatement, listDefinition.isOutgoing, pkProject)
    //         .pipe(
    //           filter(x => !!x),
    //           switchMap(x => this.p.streamEntityPreview(x.isOutgoing ? x.statement.fk_object_info : x.statement.fk_subject_info)
    //             .pipe(
    //               map((preview) => {
    //                 const item: EntityPreviewItem = {
    //                   ...x,
    //                   preview,
    //                   fkClass: preview.fk_class
    //                 }
    //                 return item;
    //               })
    //             )
    //           ))
    //       )
    //     )
    //     ))
    // }
    // /**
    //  * Pipe the temporal entities connected to given entity by statements that are in the current project
    //  */
    // // @spyTag
    // // pipeTemporalEntityTableRows(
    // //   paginateBy: PaginateByParam[],
    // //   limit: number,
    // //   offset: number,
    // //   pkProject: number,
    // //   listDefinition: Subfield,
    // //   fieldDefinitions: Field[],
    // //   alternative = false): Observable<TemporalEntityItem[]> {
    // //   // const propertyItemType = this.propertyItemType(fieldDefinitions)
    // //   const targetEntityOfStatementItem = (r: BasicStatementItem) => r.isOutgoing ? r.statement.fk_object_info : r.statement.fk_subject_info;
    // //   // prepare page loader
    // //   const pageLoader$ = alternative ? this.infRepo.statement$.pagination$ : this.s.inf$.statement$.pagination$;
    // //   // prepare basic statement item loader
    // //   const basicStatementItemLoader = (pkStatement, isOutgoing, pkProj) => {
    // //     return alternative ?
    // //       this.b.pipeAlternativeBasicStatementItemByPkStatement(pkStatement, isOutgoing) :
    // //       this.b.pipeBasicStatementItemByPkStatement(pkProj, pkStatement, isOutgoing)
    // //   }
    // //   // prepare TeEnRow loader
    // //   const rowLoader = (targetEntityPk, fieldDef, pkProj) => {
    // //     return alternative ?
    // //       this.pipeItemTeEnRow(targetEntityPk, fieldDef, null, true) :
    // //       this.pipeItemTeEnRow(targetEntityPk, fieldDef, pkProj, false)
    // //   }
    // //   const paginatedStatementPks$ = pageLoader$.pipePage(paginateBy, limit, offset)
    // //   const rows$ = paginatedStatementPks$.pipe(
    // //     switchMap((paginatedStatementPks) => combineLatestOrEmpty(
    // //       paginatedStatementPks.map(pkStatement => basicStatementItemLoader(pkStatement, listDefinition.isOutgoing, pkProject)
    // //         .pipe(filter(x => !!x))
    // //       )
    // //     )
    // //       .pipe(
    // //         switchMap((teEnStatement) => combineLatestOrEmpty(
    // //           teEnStatement.map((basicStatementItem) => {
    // //             const pkTeEn = targetEntityOfStatementItem(basicStatementItem);
    // //             return combineLatest(
    // //               rowLoader(
    // //                 pkTeEn,
    // //                 fieldDefinitions,
    // //                 // propertyItemType,
    // //                 pkProject
    // //               ),
    // //               this.s.pro$.info_proj_rel$.by_fk_project__fk_entity$.key(pkProject + '_' + pkTeEn)
    // //             ).pipe(
    // //               map(([row, teEnProjRel]) => {
    // //                 const item: TemporalEntityItem = {
    // //                   ...basicStatementItem,
    // //                   row,
    // //                   pkEntity: pkTeEn,
    // //                   teEnProjRel
    // //                 };
    // //                 return item
    // //               })
    // //             )
    // //           })
    // //         )),
    // //       )),
    // //   )
    // //   return rows$
    // // }
    // // @spyTag
    // pipeItemTeEnRow(pkEntity: number, fieldDefinitions: Field[], pkProject: number, repo: boolean): Observable<TemporalEntityRow> {
    //   // pipe outgoing statements
    //   const outgoingStatements$ = repo ? this.b.pipeRepoOutgoingStatements(pkEntity) : this.b.pipeOutgoingStatements(pkEntity);
    //   // pipe ingoing statements
    //   const ingoingStatements$ = repo ? this.b.pipeRepoIngoingStatements(pkEntity) : this.b.pipeIngoingStatements(pkEntity);
    //   // pipe all statements with information leaf items
    //   const outgoingItems$: Observable<StatementItem[]> = outgoingStatements$.pipe(
    //     switchMap(statements => combineLatestOrEmpty(
    //       statements
    //         .filter(statement => !!statement.fk_object_info) // remove statements not pointing to information
    //         .map(s => {
    //           const isOutgoing = true;
    //           return this.pipeItem(s, pkProject, isOutgoing);
    //         })
    //     ))
    //   )
    //   const ingoingItems$: Observable<StatementItem[]> = ingoingStatements$.pipe(
    //     switchMap(statements => combineLatestOrEmpty(
    //       statements
    //         .filter(statement => !!statement.fk_subject_info) // remove statements not pointing to information
    //         .map(s => {
    //           const isOutgoing = false;
    //           return this.pipeItem(s, pkProject, isOutgoing);
    //         })
    //     ))
    //   )
    //   const sortItems = repo ?
    //     (item: StatementItem[]) => item.sort((a, b) => a.statement.is_in_project_count > b.statement.is_in_project_count ? 1 : -1) :
    //     (item: StatementItem[]) => item;
    //   return combineLatest(outgoingItems$, ingoingItems$).pipe(
    //     map(([outgoingItems, ingoingItems]) => {
    //       const groupedOut = groupBy((i) => (i && i.statement ? i.statement.fk_property.toString() : undefined), outgoingItems);
    //       const groupedIn = groupBy((i) => (i && i.statement ? i.statement.fk_property.toString() : undefined), ingoingItems);
    //       return { groupedOut, groupedIn }
    //     }),
    //     // auditTime(10),
    //     map((d) => {
    //       const row: TemporalEntityRow = {}
    //       fieldDefinitions.forEach(fieldDefinition => {
    //         let cell: TemporalEntityCell;
    //         fieldDefinition.listDefinitions.forEach(listDefinition => {
    //           if (listDefinition.listType.timeSpan) {
    //             const t = pick(['71', '72', '150', '151', '152', '153'], d.groupedOut);
    //             const keys = Object.keys(t);
    //             const itemsCount = keys.length;
    //             let label;
    //             if (itemsCount > 0) {
    //               const timeSpanKeys: CtrlTimeSpanDialogResult = {}
    //               keys.forEach(key => { timeSpanKeys[key] = t[key][0].timePrimitive })
    //               const timeSpan = TimeSpanUtil.fromTimeSpanDialogData(timeSpanKeys);
    //               label = this.timeSpanPipe.transform(timeSpan);
    //             }
    //             cell = {
    //               isOutgoing: listDefinition.isOutgoing,
    //               itemsCount,
    //               label,
    //               entityPreview: undefined,
    //               pkProperty: undefined,
    //               isTimeSpan: true
    //             }
    //           }
    //           else {
    //             if (listDefinition.isOutgoing) {
    //               if (d.groupedOut[listDefinition.property.pkProperty]) {
    //                 const items = sortItems(d.groupedOut[listDefinition.property.pkProperty])
    //                 const firstItem = items[0];
    //                 cell = {
    //                   isOutgoing: listDefinition.isOutgoing,
    //                   itemsCount: items.length,
    //                   entityPreview: ((firstItem || {}) as EntityPreviewItem).preview,
    //                   label: firstItem.label,
    //                   pkProperty: listDefinition.property.pkProperty,
    //                   firstItem,
    //                   items
    //                 }
    //               }
    //             } else {
    //               if (d.groupedIn[listDefinition.property.pkProperty]) {
    //                 const items = sortItems(d.groupedIn[listDefinition.property.pkProperty])
    //                 const firstItem = items[0];
    //                 cell = {
    //                   isOutgoing: listDefinition.isOutgoing,
    //                   itemsCount: items.length,
    //                   entityPreview: ((firstItem || {}) as EntityPreviewItem).preview,
    //                   label: firstItem.label,
    //                   pkProperty: listDefinition.property.pkProperty,
    //                   firstItem,
    //                   items
    //                 }
    //               }
    //             }
    //           }
    //         })
    //         row[fieldDefinition.label] = cell;
    //       })
    //       return row
    //     })
    //   )
    // }
    // // @spyTag
    // private pipeItem(r: InfStatement, pkProject: number, propIsOutgoing: boolean) {
    //   const targetEntity = propIsOutgoing ? r.fk_object_info : r.fk_subject_info;
    //   return this.s.inf$.getModelOfEntity$(targetEntity).pipe(
    //     switchMap(m => {
    //       const modelName: InfModelName = m ? m.modelName : undefined;
    //       switch (modelName) {
    //         case 'appellation':
    //           return this.pipeItemAppellation(r);
    //         case 'language':
    //           return this.pipeItemLanguage(r);
    //         case 'place':
    //           return this.pipeItemPlace(r);
    //         case 'dimension':
    //           return this.pipeItemDimension(r);
    //         case 'lang_string':
    //           return this.pipeItemLangString(r);
    //         case 'time_primitive':
    //           return this.pipeItemTimePrimitive(r, pkProject); // TODO: emits twice
    //         default:
    //           return this.pipeItemEntityPreview(r, propIsOutgoing);
    //       }
    //     })
    //   )
    // }
    // // @spyTag
    // pipeEntityProperties(listDef: Subfield, fkEntity: number, limit?: number): Observable<EntityProperties> {
    //   if (listDef.listType.appellation) {
    //     return this.pipeListAppellation(listDef, fkEntity, limit)
    //       .pipe(map((items) => this.getEntityProperties(listDef, items)))
    //   }
    //   else if (listDef.listType.language) {
    //     return this.pipeListLanguage(listDef, fkEntity, limit)
    //       .pipe(map((items) => this.getEntityProperties(listDef, items)))
    //   }
    //   else if (listDef.listType.place) {
    //     return this.pipeListPlace(listDef, fkEntity, limit)
    //       .pipe(map((items) => this.getEntityProperties(listDef, items)))
    //   }
    //   else if (listDef.listType.dimension) {
    //     return this.pipeListDimension(listDef, fkEntity, limit)
    //       .pipe(map((items) => this.getEntityProperties(listDef, items)))
    //   }
    //   else if (listDef.listType.langString) {
    //     return this.pipeListLangString(listDef, fkEntity, limit)
    //       .pipe(map((items) => this.getEntityProperties(listDef, items)))
    //   }
    //   else if (listDef.listType.entityPreview || listDef.listType.temporalEntity) {
    //     return this.pipeListEntityPreview(listDef, fkEntity, limit)
    //       .pipe(map((items) => this.getEntityProperties(listDef, items)))
    //   }
    //   else if (listDef.listType.timeSpan) {
    //     return this.pipeItemTimeSpan(fkEntity)
    //       .pipe(map((item) => {
    //         const items = item.properties.find(p => p.items.length > 0) ? [{
    //           label: this.timeSpanPipe.transform(timeSpanItemToTimeSpan(item)),
    //           properties: [] // TODO check if the properties or the item are really not needed
    //         }] : []
    //         return {
    //           listDefinition: listDef,
    //           items
    //         }
    //       }))
    //   }
    //   else return of(null)
    // }
    // // @spyTag
    // pipeTemporalEntityRemoveProperties(pkEntity: number): Observable<TemporalEntityRemoveProperties> {
    //   return combineLatest(
    //     this.s.inf$.temporal_entity$.by_pk_entity_key$(pkEntity),
    //     this.s.inf$.statement$.by_subject$({ fk_subject_info: pkEntity }),
    //     this.s.inf$.text_property$.by_fk_concerned_entity_indexed$(pkEntity)
    //   ).pipe(
    //     map(([temporalEntity, statements, textProperties]) => {
    //       const res: TemporalEntityRemoveProperties = {
    //         temporalEntity,
    //         statements: statements,
    //         textProperties: values(textProperties)
    //       }
    //       return res
    //     })
    //   )
    // }
    // getEntityProperties(listDefinition: Subfield, items): EntityProperties {
    //   return {
    //     listDefinition,
    //     items,
    //   }
    // }
    // /**
    //  * Pipe time span item in version of project
    //  */
    // // @spyTag
    // pipeItemTimeSpan(pkEntity): Observable<TimeSpanItem> {
    //   return this.p.pkProject$.pipe(
    //     switchMap(pkProject => {
    //       return this.c.pipeSpecificFieldOfClass(
    //         DfhConfig.ClASS_PK_TIME_SPAN
    //       ).pipe(
    //         switchMap(fieldDefs => {
    //           return combineLatest(fieldDefs.map(fieldDef => this.s.inf$.statement$.by_subject_and_property$({
    //             fk_property: fieldDef.property.pkProperty,
    //             fk_subject_info: pkEntity
    //           })
    //             .pipe(
    //               switchMapOr([], statements => combineLatest(
    //                 statements.map(statement => combineLatest(
    //                   this.s.inf$.time_primitive$.by_pk_entity$.key(statement.fk_object_info).pipe(filter(x => !!x)),
    //                   this.s.pro$.info_proj_rel$.by_fk_project__fk_entity$.key(pkProject + '_' + statement.pk_entity)
    //                 ).pipe(map(([infTimePrimitive, projRel]) => {
    //                   const timePrimitive = new TimePrimitive({
    //                     julianDay: infTimePrimitive.julian_day,
    //                     calendar: ((projRel.calendar || 'gregorian') as CalendarType),
    //                     duration: (infTimePrimitive.duration as Granularity)
    //                   })
    //                   const item: TimePrimitiveItem = {
    //                     statement,
    //                     ordNum: undefined,
    //                     projRel,
    //                     timePrimitive,
    //                     label: this.timePrimitivePipe.transform(timePrimitive),
    //                     fkClass: infTimePrimitive.fk_class
    //                   }
    //                   return item;
    //                 }))
    //                 )
    //               )),
    //               map(items => {
    //                 const res: TimeSpanProperty = {
    //                   listDefinition: fieldDef.listDefinitions[0], items
    //                 }
    //                 return res
    //               })
    //             )
    //           )).pipe(
    //             map((properties) => {
    //               const props = properties.filter(p => p.items.length > 0);
    //               const timespanitem: TimeSpanItem = {
    //                 label: '',
    //                 properties: props
    //               }
    //               return timespanitem
    //             })
    //           )
    //         })
    //       )
    //     })
    //   )
    // }
    // // @spyTag
    // pipeItemAppellation(statement: InfStatement): Observable<AppellationItem> {
    //   return this.s.inf$.appellation$.by_pk_entity$.key(statement.fk_object_info).pipe(
    //     filter(x => !!x),
    //     map(appellation => {
    //       if (!appellation) return null;
    //       const node: AppellationItem = {
    //         ordNum: undefined,
    //         projRel: undefined,
    //         statement,
    //         label: appellation.string,
    //         fkClass: appellation.fk_class
    //       }
    //       return node
    //     }))
    // }
    // // @spyTag
    // pipeItemLanguage(statement: InfStatement): Observable<LanguageItem> {
    //   return this.s.inf$.language$.by_pk_entity$.key(statement.fk_object_info).pipe(
    //     filter(x => !!x),
    //     map(language => {
    //       if (!language) return null;
    //       const node: LanguageItem = {
    //         ordNum: undefined,
    //         projRel: undefined,
    //         statement,
    //         label: language.notes,
    //         fkClass: language.fk_class
    //       }
    //       return node
    //     }))
    // }
    // // @spyTag
    // pipeItemPlace(statement: InfStatement): Observable<PlaceItem> {
    //   return this.s.inf$.place$.by_pk_entity$.key(statement.fk_object_info).pipe(
    //     filter(x => !!x),
    //     map(place => {
    //       if (!place) return null;
    //       const node: PlaceItem = {
    //         ordNum: undefined,
    //         projRel: undefined,
    //         statement,
    //         label: 'WGS84: ' + place.lat + '°, ' + place.long + '°',
    //         fkClass: place.fk_class
    //       }
    //       return node
    //     }))
    // }
    // // @spyTag
    // pipeItemDimension(statement: InfStatement): Observable<DimensionItem> {
    //   return this.s.inf$.dimension$.by_pk_entity$.key(statement.fk_object_info).pipe(
    //     filter(x => !!x),
    //     switchMap((dimension) => {
    //       return this.p.streamEntityPreview(dimension.fk_measurement_unit)
    //         .pipe(
    //           map(preview => {
    //             const node: DimensionItem = {
    //               ordNum: undefined,
    //               projRel: undefined,
    //               statement,
    //               label: `${dimension.numeric_value} ${preview.entity_label}`,
    //               fkClass: dimension.fk_class,
    //             }
    //             return node
    //           })
    //         )
    //     })
    //   )
    // }
    // // @spyTag
    // pipeItemLangString(statement: InfStatement): Observable<LangStringItem> {
    //   return this.s.inf$.lang_string$.by_pk_entity$.key(statement.fk_object_info).pipe(
    //     switchMap(
    //       (langString) => {
    //         if (!langString) return new BehaviorSubject(null)
    //         return this.s.inf$.language$.by_pk_entity$.key(langString.fk_language)
    //           .pipe(
    //             map(language => {
    //               if (!language) return null;
    //               let label = '';
    //               if (langString.string) label = langString.string
    //               else if (langString.quill_doc && langString.quill_doc.ops && langString.quill_doc.ops.length) {
    //                 label = langString.quill_doc.ops.map(op => op.insert).join('');
    //               }
    //               const node: LangStringItem = {
    //                 ordNum: undefined,
    //                 projRel: undefined,
    //                 statement,
    //                 label,
    //                 fkClass: langString.fk_class,
    //                 language,
    //                 fkLanguage: langString.fk_language
    //               }
    //               return node
    //             })
    //           )
    //       })
    //   )
    // }
    // // @spyTag
    // pipeItemEntityPreview(statement: InfStatement, isOutgoing: boolean): Observable<EntityPreviewItem> {
    //   return this.p.streamEntityPreview((isOutgoing ? statement.fk_object_info : statement.fk_subject_info)).pipe(
    //     // filter(preview => !preview.loading && !!preview && !!preview.entity_type),
    //     map(preview => {
    //       if (!preview) {
    //         return null;
    //       }
    //       const node: EntityPreviewItem = {
    //         ordNum: undefined,
    //         projRel: undefined,
    //         statement,
    //         preview,
    //         label: preview.entity_label || '',
    //         fkClass: preview.fk_class
    //       }
    //       return node
    //     }))
    // }
    // /**
    //  * @param pk
    //  */
    // // @spyTag
    // pipeItemTimePrimitive(statement: InfStatement, pkProject): Observable<TimePrimitiveItem> {
    //   if (pkProject) {
    //     return combineLatest(
    //       this.s.inf$.time_primitive$.by_pk_entity$.key(statement.fk_object_info).pipe(filter(x => !!x)),
    //       this.s.pro$.info_proj_rel$.by_fk_project__fk_entity$.key(pkProject + '_' + statement.pk_entity).pipe(filter(x => !!x))
    //     ).pipe(
    //       map(([infTimePrimitive, projRel]) => {
    //         if (!infTimePrimitive) return null;
    //         const timePrimitive = new TimePrimitive({
    //           julianDay: infTimePrimitive.julian_day,
    //           calendar: ((projRel.calendar || 'gregorian') as CalendarType),
    //           duration: (infTimePrimitive.duration as Granularity)
    //         })
    //         const node: TimePrimitiveItem = {
    //           ordNum: undefined,
    //           projRel: undefined,
    //           statement,
    //           timePrimitive,
    //           label: this.timePrimitivePipe.transform(timePrimitive),
    //           fkClass: infTimePrimitive.fk_class
    //         }
    //         return node
    //       }))
    //   } else {
    //     return this.infRepo.time_primitive$.by_pk_entity$.key(statement.fk_object_info).pipe(filter(x => !!x)).pipe(
    //       map(infTimePrimitive => {
    //         const timePrimitive = new TimePrimitive({
    //           julianDay: infTimePrimitive.julian_day,
    //           calendar: ((statement.community_favorite_calendar || 'gregorian') as CalendarType),
    //           duration: (infTimePrimitive.duration as Granularity)
    //         })
    //         const node: TimePrimitiveItem = {
    //           ordNum: undefined,
    //           projRel: undefined,
    //           statement,
    //           timePrimitive,
    //           label: this.timePrimitivePipe.transform(timePrimitive),
    //           fkClass: infTimePrimitive.fk_class
    //         }
    //         return node
    //       })
    //     )
    //   }
    // }
    // /*********************************************************************
    // * Pipe alternatives (not in project)
    // *********************************************************************/
    // // @spyTag
    // pipeAltListLength(l: Subfield, pkEntity: number): Observable<number> {
    //   switch (l.listType) {
    //     case 'appellation':
    //     case 'entity-preview':
    //     case 'language':
    //     case 'place':
    //     case 'langString':
    //     case 'temporal-entity':
    //     case 'time-span':
    //       return this.pipeAltListStatements(l, pkEntity).pipe(map(items => items.length))
    //     default:
    //       console.warn('unsupported listType')
    //       break;
    //   }
    // }
    // // @spyTag
    // pipeAltList(l: Subfield, pkEntity): Observable<ItemList> {
    //   if (l.listType.appellation) return this.pipeAltListAppellation(l, pkEntity)
    //   else if (l.listType.entityPreview) return this.pipeAltListEntityPreview(l, pkEntity)
    //   else if (l.listType.language) return this.pipeAltListLanguage(l, pkEntity)
    //   else if (l.listType.place) return this.pipeAltListPlace(l, pkEntity)
    //   else if (l.listType.dimension) return this.pipeAltListDimension(l, pkEntity)
    //   else if (l.listType.langString) return this.pipeAltListLangString(l, pkEntity)
    //   else if (l.listType.temporalEntity) return this.pipeAltListEntityPreview(l, pkEntity)
    //   else console.warn('unsupported listType')
    // }
    // // @spyTag
    // pipeAltListStatements(listDefinition: Subfield, pkEntity: number): Observable<InfStatement[]> {
    //   return (listDefinition.isOutgoing ?
    //     this.b.pipeAlternativeIngoingStatements(listDefinition.property.pkProperty, pkEntity) :
    //     this.b.pipeAlternativeIngoingStatements(listDefinition.property.pkProperty, pkEntity)
    //   )
    // }
    // /**
    // * Pipe the items in entity preview field
    // */
    // // @spyTag
    // pipeAltListEntityPreview<T>(listDefinition: Subfield, pkEntity): Observable<EntityPreviewItem[]> {
    //   return (listDefinition.isOutgoing ?
    //     this.b.pipeAlternativeOutgoingStatements(listDefinition.property.pkProperty, pkEntity) :
    //     this.b.pipeAlternativeIngoingStatements(listDefinition.property.pkProperty, pkEntity)
    //   ).pipe(
    //     switchMap((statements) => {
    //       return combineLatest(statements.map((r, i) => this.pipeItemEntityPreview(r, listDefinition.isOutgoing)))
    //         .pipe(
    //           map(nodes => nodes
    //             .filter(node => !!node)
    //             .sort((a, b) => a.ordNum > b.ordNum ? 1 : -1)
    //           ),
    //           startWith([]))
    //     }))
    // }
    // /**
    //  * Pipe the alternative items in place list
    //  */
    // // @spyTag
    // pipeAltListPlace<T>(listDefinition: Subfield, pkEntity): Observable<PlaceItem[]> {
    //   if (listDefinition.isOutgoing) {
    //     return this.b.pipeAlternativeOutgoingStatements(listDefinition.property.pkProperty, pkEntity).pipe(
    //       switchMap((statements) => {
    //         return combineLatest(statements.map((r, i) => this.pipeItemPlace(r)))
    //           .pipe(
    //             map(nodes => nodes.filter(node => !!node && node.fkClass === listDefinition.targetClass)),
    //             startWith([]))
    //       }))
    //   }
    // }
    // /**
    //  * Pipe the alternative items in dimension list
    //  */
    // // @spyTag
    // pipeAltListDimension<T>(listDefinition: Subfield, pkEntity): Observable<DimensionItem[]> {
    //   if (listDefinition.isOutgoing) {
    //     return this.b.pipeAlternativeOutgoingStatements(listDefinition.property.pkProperty, pkEntity).pipe(
    //       switchMap((statements) => {
    //         return combineLatest(statements.map((r, i) => this.pipeItemDimension(r)))
    //           .pipe(
    //             map(nodes => nodes.filter(node => !!node && node.fkClass === listDefinition.targetClass)),
    //             startWith([]))
    //       }))
    //   }
    // }
    // /**
    //  * Pipe the alternative items in langString list
    //  */
    // // @spyTag
    // pipeAltListLangString<T>(listDefinition: Subfield, pkEntity): Observable<LangStringItem[]> {
    //   if (listDefinition.isOutgoing) {
    //     return this.b.pipeAlternativeOutgoingStatements(listDefinition.property.pkProperty, pkEntity).pipe(
    //       switchMap((statements) => {
    //         return combineLatest(statements.map((r, i) => this.pipeItemLangString(r)))
    //           .pipe(
    //             map(nodes => nodes.filter(node => !!node && node.fkClass === listDefinition.targetClass)),
    //             startWith([]))
    //       }))
    //   }
    // }
    // /**
    //  * Pipe the alternative items in appellation field
    //  */
    // // @spyTag
    // pipeAltListAppellation<T>(listDefinition: Subfield, pkEntity): Observable<AppellationItem[]> {
    //   if (listDefinition.isOutgoing) {
    //     return this.b.pipeAlternativeOutgoingStatements(listDefinition.property.pkProperty, pkEntity).pipe(
    //       switchMap((statements) => {
    //         return combineLatest(statements.map((r, i) => this.pipeItemAppellation(r)))
    //           .pipe(
    //             map(nodes => nodes.filter(node => !!node && node.fkClass === listDefinition.targetClass)),
    //             startWith([]))
    //       }))
    //   }
    // }
    // /**
    //  * Pipe the alternative items in language field
    //  */
    // // @spyTag
    // pipeAltListLanguage<T>(listDefinition: Subfield, pkEntity): Observable<LanguageItem[]> {
    //   if (listDefinition.isOutgoing) {
    //     return this.b.pipeAlternativeOutgoingStatements(listDefinition.property.pkProperty, pkEntity).pipe(
    //       switchMap((statements) => {
    //         return combineLatest(statements.map((r, i) => this.pipeItemLanguage(r)))
    //           .pipe(
    //             map(nodes => nodes.filter(node => !!node && node.fkClass === listDefinition.targetClass)),
    //             startWith([]))
    //       }))
    //   }
    // }
    // /*********************************************************************
    //  * Pipe repo views (community favorites, where restricted by quantifiers)
    //  *********************************************************************/
    // /**
    //  * Pipe repository temporal entity item in the way it is defined by the repository
    //  */
    // /**
    //  * Pipe appellation list in the way it is defined by the repository
    //  */
    // // @spyTag
    // pipeRepoListAppellation<T>(listDefinition: Subfield, pkEntity): Observable<AppellationItem[]> {
    //   if (listDefinition.isOutgoing) {
    //     return this.b.pipeRepoOutgoingStatementsByProperty(listDefinition.property.pkProperty, pkEntity).pipe(
    //       switchMap((statements) => {
    //         return combineLatest(statements.map((r, i) => this.pipeItemAppellation(r)))
    //           .pipe(
    //             map(nodes => nodes.filter(node => !!node && node.fkClass === listDefinition.targetClass)),
    //             startWith([]))
    //       }))
    //   }
    // }
    // /**
    // * Pipe language list in the way it is defined by the repository
    // */
    // // @spyTag
    // pipeRepoListLanguage<T>(listDefinition: Subfield, pkEntity): Observable<LanguageItem[]> {
    //   if (listDefinition.isOutgoing) {
    //     return this.b.pipeRepoOutgoingStatementsByProperty(listDefinition.property.pkProperty, pkEntity).pipe(
    //       switchMap((statements) => {
    //         return combineLatest(statements.map((r, i) => this.pipeItemLanguage(r)))
    //           .pipe(
    //             map(nodes => nodes.filter(node => !!node && node.fkClass === listDefinition.targetClass)),
    //             startWith([]))
    //       }))
    //   }
    // }
    // /**
    //  * Pipe place list in the way it is defined by the repository
    //  */
    // // @spyTag
    // pipeRepoListPlace<T>(listDefinition: Subfield, pkEntity): Observable<PlaceItem[]> {
    //   if (listDefinition.isOutgoing) {
    //     return this.b.pipeRepoOutgoingStatementsByProperty(listDefinition.property.pkProperty, pkEntity).pipe(
    //       switchMap((statements) => {
    //         return combineLatest(statements.map((r, i) => this.pipeItemPlace(r)))
    //           .pipe(
    //             map(nodes => nodes.filter(node => !!node && node.fkClass === listDefinition.targetClass)),
    //             startWith([]))
    //       }))
    //   }
    // }
    // /**
    // * Pipe place list in the way it is defined by the repository
    // */
    // // @spyTag
    // pipeRepoListDimension<T>(listDefinition: Subfield, pkEntity): Observable<DimensionItem[]> {
    //   if (listDefinition.isOutgoing) {
    //     return this.b.pipeRepoOutgoingStatementsByProperty(listDefinition.property.pkProperty, pkEntity).pipe(
    //       switchMap((statements) => {
    //         return combineLatest(statements.map((r, i) => this.pipeItemDimension(r)))
    //           .pipe(
    //             map(nodes => nodes.filter(node => !!node && node.fkClass === listDefinition.targetClass)),
    //             startWith([]))
    //       }))
    //   }
    // }
    // /**
    // * Pipe the items in entity preview field, connected by community favorite statements
    // */
    // // @spyTag
    // pipeRepoListEntityPreview<T>(listDefinition: Subfield, pkEntity): Observable<EntityPreviewItem[]> {
    //   return (listDefinition.isOutgoing ?
    //     this.b.pipeRepoOutgoingStatementsByProperty(listDefinition.property.pkProperty, pkEntity) :
    //     this.b.pipeRepoIngoingStatementsByProperty(listDefinition.property.pkProperty, pkEntity)
    //   ).pipe(
    //     switchMap((statements) => {
    //       return combineLatest(statements.map((r, i) => this.pipeItemEntityPreview(r, listDefinition.isOutgoing)))
    //         .pipe(
    //           map(nodes => nodes.filter(node => !!node && node.fkClass === listDefinition.targetClass)
    //             // .sort((a, b) => a.ordNum > b.ordNum ? 1 : -1)
    //           ))
    //     }),
    //     startWith([])
    //   )
    // }
    // /**
    //  * Pipe repo time span item
    //  */
    // // @spyTag
    // pipeRepoItemTimeSpan(pkEntity): Observable<TimeSpanItem> {
    //   return this.p.pkProject$.pipe(
    //     switchMap(pkProject => {
    //       return this.c.pipeBasicAndSpecificFields(
    //         DfhConfig.ClASS_PK_TIME_SPAN
    //       ).pipe(
    //         switchMap(fieldDefinitions => {
    //           return combineLatest(fieldDefinitions.map(fieldDef =>
    //             this.b.pipeRepoOutgoingStatementsByProperty(fieldDef.property.pkProperty, pkEntity)
    //               .pipe(
    //                 switchMapOr([], statements => combineLatest(
    //                   statements.map(statement =>
    //                     this.infRepo.time_primitive$.by_pk_entity$.key(statement.fk_object_info)
    //                       .pipe(map((infTimePrimitive) => {
    //                         const timePrimitive = new TimePrimitive({
    //                           julianDay: infTimePrimitive.julian_day,
    //                           calendar: ((statement.community_favorite_calendar || 'gregorian') as CalendarType),
    //                           duration: (infTimePrimitive.duration as Granularity)
    //                         })
    //                         const item: TimePrimitiveItem = {
    //                           statement,
    //                           ordNum: undefined,
    //                           projRel: undefined,
    //                           timePrimitive,
    //                           label: this.timePrimitivePipe.transform(timePrimitive),
    //                           fkClass: infTimePrimitive.fk_class
    //                         }
    //                         return item;
    //                       }))
    //                   )
    //                 )),
    //                 map(items => {
    //                   const res: TimeSpanProperty = {
    //                     listDefinition: fieldDef.listDefinitions[0], items
    //                   }
    //                   return res
    //                 }),
    //                 startWith({ listDefinition: fieldDef.listDefinitions[0], items: [] } as TimeSpanProperty)
    //               )
    //           )).pipe(
    //             map((properties) => {
    //               const timespanitem: TimeSpanItem = {
    //                 label: '',
    //                 properties: properties.filter(props => props.items.length > 0)
    //               }
    //               return timespanitem
    //             })
    //           )
    //         })
    //       )
    //     })
    //   )
    // }
    /**
     * Pipes the label of given entity
     * This will use entity previews for getting strings of related temporal entities
     * So this may take a little while
     * @param {?} fkEntity
     * @return {?}
     */
    // @spyTag
    pipeLabelOfEntity(fkEntity) {
        return this.p.streamEntityPreview(fkEntity).pipe(map((/**
         * @param {?} p
         * @return {?}
         */
        p => p.entity_label)));
        // return this.b.pipeClassOfEntity(fkEntity).pipe(
        //   // get the definition of the first field
        //   switchMap(fkClass => this.c.pipeBasicAndSpecificFields(fkClass).pipe(
        //     // get the first item of that field
        //     switchMap(fields => this.pipeSubfieldPage(field[0],).pipe(
        //       map(props => {
        //         props = props.filter(prop => prop.items.length > 0)
        //         if (props.length && props[0].items.length) {
        //           return props[0].items[0].label
        //         }
        //         return ''
        //       })
        //     )))
        //   ))
    }
    /**
     * Pipes the class label of given entity
     * @param {?} fkEntity
     * @return {?}
     */
    // @spyTag
    pipeClassLabelOfEntity(fkEntity) {
        return this.b.pipeClassOfEntity(fkEntity).pipe(switchMap((/**
         * @param {?} pkClass
         * @return {?}
         */
        pkClass => this.c.pipeClassLabel(pkClass))));
    }
    /**
     * Pipes the pk_entity of the type of an entity
     * @param {?} pkEntity
     * @param {?} hasTypeProperty
     * @param {?} isOutgoing
     * @return {?}
     */
    // @spyTag
    pipeTypeOfEntity(pkEntity, hasTypeProperty, isOutgoing) {
        if (isOutgoing) {
            return this.s.inf$.statement$.by_subject_and_property_indexed$({ fk_property: hasTypeProperty, fk_subject_info: pkEntity }).pipe(map((/**
             * @param {?} items
             * @return {?}
             */
            items => {
                if (!items || Object.keys(items).length < 1)
                    return undefined;
                else
                    return values$1(items)[0];
            })));
        }
        else {
            return this.s.inf$.statement$.by_object_and_property_indexed$({ fk_property: hasTypeProperty, fk_object_info: pkEntity }).pipe(map((/**
             * @param {?} items
             * @return {?}
             */
            items => {
                if (!items || Object.keys(items).length < 1)
                    return undefined;
                else
                    return values$1(items)[0];
            })));
        }
    }
    /**
     * @param {?} enabledIn
     * @return {?}
     */
    pipeClassesAndTypes(enabledIn) {
        return this.c.pipeTypeAndTypedClasses(enabledIn).pipe(switchMap((/**
         * @param {?} items
         * @return {?}
         */
        items => this.pipeClassAndTypeNodes(items))));
    }
    /**
     * @param {?} classes
     * @return {?}
     */
    pipeClassesAndTypesOfClasses(classes) {
        return this.c.pipeTypeAndTypedClassesOfTypedClasses(classes).pipe(switchMap((/**
         * @param {?} items
         * @return {?}
         */
        items => this.pipeClassAndTypeNodes(items))));
    }
    /**
     * @param {?} typeAndTypedClasses
     * @return {?}
     */
    pipeClassAndTypeNodes(typeAndTypedClasses) {
        return combineLatestOrEmpty(typeAndTypedClasses.map((/**
         * @param {?} item
         * @return {?}
         */
        item => this.c.pipeClassLabel(item.typedClass).pipe(map((/**
         * @param {?} label
         * @return {?}
         */
        label => ((/** @type {?} */ ({
            label,
            data: { pkClass: item.typedClass, pkType: null }
        }))))), switchMap((/**
         * @param {?} node
         * @return {?}
         */
        node => iif((/**
         * @return {?}
         */
        () => !!item.typeClass), this.b.pipePersistentItemPksByClass(item.typeClass).pipe(switchMap((/**
         * @param {?} typePks
         * @return {?}
         */
        typePks => combineLatestOrEmpty(typePks.map((/**
         * @param {?} pkType
         * @return {?}
         */
        pkType => this.p.streamEntityPreview(pkType).pipe(map((/**
         * @param {?} preview
         * @return {?}
         */
        preview => ((/** @type {?} */ ({
            label: preview.entity_label,
            data: { pkClass: item.typedClass, pkType }
        }))))))))).pipe(sortAbc((/**
         * @param {?} n
         * @return {?}
         */
        n => n.label))))), map((/**
         * @param {?} children
         * @return {?}
         */
        children => {
            node.children = children;
            return node;
        }))), of((/** @type {?} */ (Object.assign({}, node, { children: [] }))))))))))).pipe(sortAbc((/**
         * @param {?} node
         * @return {?}
         */
        (node) => node.label)));
    }
    /**
     * returns array of pk_class of all classes and typed classes.
     * @param {?} classesAndTypes a object containing {classes: [], types[]}
     * @return {?}
     */
    pipeClassesFromClassesAndTypes(classesAndTypes) {
        /** @type {?} */
        const typedClasses$ = (!classesAndTypes || !classesAndTypes.types || !classesAndTypes.types.length) ?
            of((/** @type {?} */ ([]))) :
            this.b.pipeClassesOfPersistentItems(classesAndTypes.types)
                .pipe(filter((/**
             * @param {?} pks
             * @return {?}
             */
            (pks) => !!pks)), switchMap((/**
             * @param {?} typeClasses
             * @return {?}
             */
            typeClasses => this.c.pipeTypedClassesOfTypeClasses(typeClasses))));
        return typedClasses$.pipe(map((/**
         * @param {?} typedClasses
         * @return {?}
         */
        typedClasses => uniq([...typedClasses, ...((classesAndTypes || { classes: [] }).classes || [])]))));
    }
    /**
     * @param {?} classesAndTypes
     * @return {?}
     */
    pipePropertyOptionsFromClassesAndTypes(classesAndTypes) {
        return this.pipeClassesFromClassesAndTypes(classesAndTypes).pipe(switchMap((/**
         * @param {?} classes
         * @return {?}
         */
        classes => this.pipePropertyOptionsFormClasses(classes))));
    }
    /**
     * @param {?} classes
     * @return {?}
     */
    pipePropertyOptionsFormClasses(classes) {
        return combineLatestOrEmpty(classes.map((/**
         * @param {?} pkClass
         * @return {?}
         */
        pkClass => this.s.dfh$.class$.by_pk_class$.key(pkClass).pipe(map((/**
         * @param {?} c
         * @return {?}
         */
        c => c.basic_type === 9)), switchMap((/**
         * @param {?} isTeEn
         * @return {?}
         */
        isTeEn => this.c.pipeSpecificAndBasicFields(pkClass)
            .pipe(map((/**
         * @param {?} classFields
         * @return {?}
         */
        classFields => classFields
            .filter((/**
         * @param {?} f
         * @return {?}
         */
        f => !!f.property.pkProperty))
            .map((/**
         * @param {?} f
         * @return {?}
         */
        f => ({
            isOutgoing: f.isOutgoing,
            fkPropertyDomain: f.isOutgoing ? f.sourceClass : null,
            fkPropertyRange: f.isOutgoing ? null : f.sourceClass,
            pkProperty: f.property.pkProperty
        }))))), switchMap((/**
         * @param {?} items
         * @return {?}
         */
        items => {
            if (isTeEn) {
                // add time properties (at some time within, ...)
                DfhConfig.PROPERTY_PKS_WHERE_TIME_PRIMITIVE_IS_RANGE.map((/**
                 * @param {?} pkProperty
                 * @return {?}
                 */
                pkProperty => {
                    items.push({
                        pkProperty,
                        fkPropertyDomain: pkClass,
                        fkPropertyRange: DfhConfig.CLASS_PK_TIME_PRIMITIVE,
                        isOutgoing: true
                    });
                }));
            }
            return combineLatestOrEmpty(items.map((/**
             * @param {?} item
             * @return {?}
             */
            item => this.c.pipeFieldLabel(item.pkProperty, item.fkPropertyDomain, item.fkPropertyRange).pipe(map((/**
             * @param {?} label
             * @return {?}
             */
            label => {
                /** @type {?} */
                const isOutgoing = item.isOutgoing;
                /** @type {?} */
                const o = {
                    isOutgoing,
                    label,
                    pk: item.pkProperty,
                    propertyFieldKey: propertyOptionFieldKey(item.pkProperty, isOutgoing)
                };
                return o;
            }))))));
        }))))))))).pipe(map((/**
         * @param {?} y
         * @return {?}
         */
        y => flatten(y))));
    }
    /**
     * @param {?} model
     * @return {?}
     */
    pipePkClassesFromPropertySelectModel(model) {
        return combineLatestOrEmpty([
            this.c.pipeTargetClassesOfProperties(model.outgoingProperties, true),
            this.c.pipeTargetClassesOfProperties(model.ingoingProperties, false),
        ]).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        ([out, ing]) => uniq([...out, ...ing]))));
    }
    /**
     * @param {?} model$
     * @return {?}
     */
    getPkClassesFromPropertySelectModel$(model$) {
        return model$.pipe(switchMap((/**
         * @param {?} model
         * @return {?}
         */
        model => combineLatestOrEmpty([
            this.c.pipeTargetClassesOfProperties(model.outgoingProperties, true),
            this.c.pipeTargetClassesOfProperties(model.ingoingProperties, false),
        ]).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        ([out, ing]) => uniq([...out, ...ing])))))));
    }
    /**
     * @param {?} classTypes$
     * @return {?}
     */
    getPropertyOptions$(classTypes$) {
        return classTypes$.pipe(
        // make sure only it passes only if data of the arrayClasses are changed (not children)
        distinctUntilChanged((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        (a, b) => {
            return equals(a, b);
        })), switchMap((/**
         * @param {?} x
         * @return {?}
         */
        (x) => !x ? empty() : this.b.pipeClassesOfPersistentItems(x.types)
            .pipe(filter((/**
         * @param {?} pks
         * @return {?}
         */
        (pks) => !!pks)), switchMap((/**
         * @param {?} typeClasses
         * @return {?}
         */
        typeClasses => this.c.pipeTypedClassesOfTypeClasses(typeClasses).pipe(switchMap((/**
         * @param {?} typedClasses
         * @return {?}
         */
        typedClasses => {
            /** @type {?} */
            const classes = uniq([...typedClasses, ...(x.classes || [])]);
            return this.pipePropertyOptionsFormClasses(classes);
        })))))))));
    }
}
InformationPipesService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
InformationPipesService.ctorParameters = () => [
    { type: InformationBasicPipesService },
    { type: ActiveProjectPipesService },
    { type: SchemaSelectorsService },
    { type: ConfigurationPipesService },
    { type: TimePrimitivePipe },
    { type: TimeSpanPipe },
    { type: NgRedux }
];
/** @nocollapse */ InformationPipesService.ngInjectableDef = ɵɵdefineInjectable({ factory: function InformationPipesService_Factory() { return new InformationPipesService(ɵɵinject(InformationBasicPipesService), ɵɵinject(ActiveProjectPipesService), ɵɵinject(SchemaSelectorsService), ɵɵinject(ConfigurationPipesService), ɵɵinject(TimePrimitivePipe), ɵɵinject(TimeSpanPipe), ɵɵinject(NgRedux)); }, token: InformationPipesService, providedIn: "root" });
__decorate([
    spyTag,
    cache({ refCount: false }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InformationPipesService.prototype, "pipeClassesAndTypes", null);
__decorate([
    spyTag,
    cache({ refCount: false }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], InformationPipesService.prototype, "pipeClassesAndTypesOfClasses", null);
__decorate([
    spyTag,
    cache({ refCount: false }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Observable)
], InformationPipesService.prototype, "pipeClassAndTypeNodes", null);
__decorate([
    cache({ refCount: false }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Observable)
], InformationPipesService.prototype, "pipePropertyOptionsFormClasses", null);
__decorate([
    cache({ refCount: false }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Observable)
], InformationPipesService.prototype, "pipePkClassesFromPropertySelectModel", null);
if (false) {
    /** @type {?} */
    InformationPipesService.prototype.infRepo;
    /**
     * @type {?}
     * @private
     */
    InformationPipesService.prototype.b;
    /**
     * @type {?}
     * @private
     */
    InformationPipesService.prototype.p;
    /**
     * @type {?}
     * @private
     */
    InformationPipesService.prototype.s;
    /**
     * @type {?}
     * @private
     */
    InformationPipesService.prototype.c;
    /** @type {?} */
    InformationPipesService.prototype.timePrimitivePipe;
    /**
     * @type {?}
     * @private
     */
    InformationPipesService.prototype.timeSpanPipe;
}
/**
 * @param {?} fkProperty
 * @param {?} isOutgoing
 * @return {?}
 */
function propertyOptionFieldKey(fkProperty, isOutgoing) {
    return '_' + fkProperty + '_' + (isOutgoing ? 'outgoing' : 'ingoing');
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: kleiolab-lib-queries.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { ActiveProjectPipesService, ConfigurationPipesService, DatSelector, DfhSelector, InfSelector, InformationBasicPipesService, InformationPipesService, ProSelector, ReduxQueriesModule, SchemaSelectorsService, ShouldPauseService, SysSelector, TabSelector, WarSelector, cache, createHasTimeSpanProperty, infTimePrimToTimePrimWithCal, propertyOptionFieldKey, spyTag, timeSpanItemToTimeSpan };
//# sourceMappingURL=kleiolab-lib-queries.js.map
