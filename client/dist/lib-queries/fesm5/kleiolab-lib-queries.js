import { __assign, __spread, __extends, __decorate, __metadata, __read, __values, __rest } from 'tslib';
import { shareReplay, map, switchMap, filter, first, distinctUntilChanged, tap, startWith } from 'rxjs/operators';
import { tag } from 'rxjs-spy/operators';
import { DfhConfig, ProConfig, SysConfig } from '@kleiolab/lib-config';
import { TimeSpanUtil, latestVersion, combineLatestOrEmpty, limitTo, switchMapOr, TimePrimitive, sortAbc, TimePrimitivePipe, TimeSpanPipe } from '@kleiolab/lib-utils';
import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf, Injectable, ɵɵdefineInjectable, ɵɵinject } from '@angular/core';
import { ReduxModule, datRoot, datDefinitions, DatActions, dfhRoot, dfhDefinitions, DfhActions, infRoot, paginateBy, subfieldIdToString, getFromTo, indexStatementBySubject, indexStatementBySubjectProperty, indexStatementByObject, indexStatementByObjectProperty, infDefinitions, PR_ENTITY_MODEL_MAP, proRoot, proDefinitions, ProActions, sysRoot, sysDefinitions, SysActions, tabRoot, tabDefinitions, TabActions, warRoot, warDefinitions, WarActions, proClassFieldConfgByProjectAndClassKey, textPropertyByFksKey, dfhLabelByFksKey } from '@kleiolab/lib-redux';
import { NgRedux } from '@angular-redux/store';
import { BehaviorSubject, empty, pipe, of, Observable, combineLatest, merge, iif } from 'rxjs';
import { values } from 'd3';
import { toString, equals, values as values$1, indexBy, uniq, flatten, omit, groupBy, pick } from 'ramda';
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
var cache = (/**
 * @param {?=} options
 * @return {?}
 */
function (options) { return (/**
 * @param {?} target
 * @param {?} propertyKey
 * @param {?} descriptor
 * @return {?}
 */
function (target, propertyKey, descriptor) {
    /** @type {?} */
    var o = __assign({ refCount: true }, options);
    /** @type {?} */
    var c = new Map();
    /** @type {?} */
    var originalFunction = descriptor.value;
    descriptor.value = (/**
     * @param {...?} request
     * @return {?}
     */
    function () {
        var request = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            request[_i] = arguments[_i];
        }
        /** @type {?} */
        var uniq = JSON.stringify(request);
        if (!c.has(uniq)) {
            /** @type {?} */
            var boundOriginalFunction = originalFunction.bind(this)
            // const x = target, y = propertyKey;
            ;
            // const x = target, y = propertyKey;
            c.set(uniq, boundOriginalFunction.apply(void 0, __spread(request)).pipe(shareReplay({ refCount: o.refCount, bufferSize: 1 }), tag("FROM-CACHE-" + target.constructor.name + "::" + propertyKey + "::" + request.join(':'))));
        }
        return c.get(uniq);
    });
    return descriptor;
}); });
/**
 * @param {?} target
 * @param {?} propertyKey
 * @param {?} descriptor
 * @return {?}
 */
function spyTag(target, propertyKey, descriptor) {
    /** @type {?} */
    var originalFunction = descriptor.value;
    descriptor.value = (/**
     * @param {...?} request
     * @return {?}
     */
    function () {
        var request = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            request[_i] = arguments[_i];
        }
        /** @type {?} */
        var boundOriginalFunction = originalFunction.bind(this);
        return boundOriginalFunction.apply(void 0, __spread(request)).pipe(tag(target.constructor.name + "::" + propertyKey + "::" + request.join(':')));
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
    var t = new TimeSpanUtil();
    timeSpanItem.properties.forEach((/**
     * @param {?} p
     * @return {?}
     */
    function (p) {
        /** @type {?} */
        var key = DfhConfig.PROPERTY_PK_TO_EXISTENCE_TIME_KEY[p.listDefinition.property.pkProperty];
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
    Field.prototype.listDefinitions;
    /** @type {?} */
    Field.prototype.allSubfieldsRemovedFromAllProfiles;
    /** @type {?} */
    Field.prototype.isSpecialField;
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
var ReduxQueriesModule = /** @class */ (function () {
    function ReduxQueriesModule(parentModule, reduxModule) {
        /** @type {?} */
        var errors = [];
        if (parentModule)
            errors.push('ReduxQueriesModule is already loaded. Import in your base AppModule only.');
        if (!reduxModule)
            errors.push('You need to import the ReduxModule in your AppModule!');
        if (errors.length)
            throw new Error(errors.join('\n'));
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
    ReduxQueriesModule.ctorParameters = function () { return [
        { type: ReduxQueriesModule, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: ReduxModule, decorators: [{ type: Optional }] }
    ]; };
    return ReduxQueriesModule;
}());

/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/selectors/dat.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Selector = /** @class */ (function () {
    function Selector(ngRedux, configs, model) {
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
    }
    /**
     * @template M
     * @param {?} indexKey
     * @return {?}
     */
    Selector.prototype.selector = /**
     * @template M
     * @param {?} indexKey
     * @return {?}
     */
    function (indexKey) {
        var _this = this;
        /** @type {?} */
        var all$ = this.ngRedux.select([datRoot, this.model, indexKey])
        // .pipe(
        //   distinctUntilChanged<M>(equals)
        // )
        ;
        // .pipe(
        //   distinctUntilChanged<M>(equals)
        // )
        /** @type {?} */
        var key = (/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return _this.ngRedux.select([datRoot, _this.model, indexKey, x]); })
        // .pipe(
        //   distinctUntilChanged<M>(equals)
        // )
        ;
        // .pipe(
        //   distinctUntilChanged<M>(equals)
        // )
        return { all$: all$, key: key };
    };
    return Selector;
}());
if (false) {
    /** @type {?} */
    Selector.prototype.ngRedux;
    /** @type {?} */
    Selector.prototype.configs;
    /** @type {?} */
    Selector.prototype.model;
}
var DatDigitalSelections = /** @class */ (function (_super) {
    __extends(DatDigitalSelections, _super);
    function DatDigitalSelections(ngRedux, configs, model) {
        var _this = _super.call(this, ngRedux, configs, model) || this;
        _this.ngRedux = ngRedux;
        _this.configs = configs;
        _this.model = model;
        _this.by_pk_entity__entity_version$ = _this.selector('by_pk_entity__entity_version');
        _this.by_pk_entity$ = _this.selector('by_pk_entity');
        _this.by_pk_text$ = _this.selector('by_pk_text');
        return _this;
    }
    /**
     * @param {?} pkDigital
     * @return {?}
     */
    DatDigitalSelections.prototype.latestVersion = /**
     * @param {?} pkDigital
     * @return {?}
     */
    function (pkDigital) {
        return this.by_pk_entity$.key(pkDigital).pipe(map((/**
         * @param {?} versions
         * @return {?}
         */
        function (versions) { return latestVersion(versions); })));
    };
    return DatDigitalSelections;
}(Selector));
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
var DatNamespaceSelections = /** @class */ (function (_super) {
    __extends(DatNamespaceSelections, _super);
    function DatNamespaceSelections(ngRedux, configs, model) {
        var _this = _super.call(this, ngRedux, configs, model) || this;
        _this.ngRedux = ngRedux;
        _this.configs = configs;
        _this.model = model;
        _this.by_pk_entity$ = _this.selector('by_pk_entity');
        _this.by_fk_project$ = _this.selector('by_fk_project');
        return _this;
    }
    return DatNamespaceSelections;
}(Selector));
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
var DatChunkSelections = /** @class */ (function (_super) {
    __extends(DatChunkSelections, _super);
    function DatChunkSelections(ngRedux, configs, model) {
        var _this = _super.call(this, ngRedux, configs, model) || this;
        _this.ngRedux = ngRedux;
        _this.configs = configs;
        _this.model = model;
        _this.by_pk_entity$ = _this.selector('by_pk_entity');
        _this.by_fk_text$ = _this.selector('by_fk_text');
        return _this;
    }
    return DatChunkSelections;
}(Selector));
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
var DatClassColumnMappingSelections = /** @class */ (function (_super) {
    __extends(DatClassColumnMappingSelections, _super);
    function DatClassColumnMappingSelections(ngRedux, configs, model) {
        var _this = _super.call(this, ngRedux, configs, model) || this;
        _this.ngRedux = ngRedux;
        _this.configs = configs;
        _this.model = model;
        _this.by_pk_entity$ = _this.selector('by_pk_entity');
        _this.by_fk_column$ = _this.selector('by_fk_column');
        return _this;
    }
    return DatClassColumnMappingSelections;
}(Selector));
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
var DatColumnSelections = /** @class */ (function (_super) {
    __extends(DatColumnSelections, _super);
    function DatColumnSelections(ngRedux, configs, model) {
        var _this = _super.call(this, ngRedux, configs, model) || this;
        _this.ngRedux = ngRedux;
        _this.configs = configs;
        _this.model = model;
        _this.by_pk_entity$ = _this.selector('by_pk_entity');
        _this.by_fk_digital$ = _this.selector('by_fk_digital');
        return _this;
    }
    return DatColumnSelections;
}(Selector));
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
var DatTextPropertySelections = /** @class */ (function (_super) {
    __extends(DatTextPropertySelections, _super);
    function DatTextPropertySelections(ngRedux, configs, model) {
        var _this = _super.call(this, ngRedux, configs, model) || this;
        _this.ngRedux = ngRedux;
        _this.configs = configs;
        _this.model = model;
        _this.by_pk_entity$ = _this.selector('by_pk_entity');
        _this.by_fk_entity__fk_system_type$ = _this.selector('by_fk_entity__fk_system_type');
        return _this;
    }
    return DatTextPropertySelections;
}(Selector));
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
var DatSelector = /** @class */ (function (_super) {
    __extends(DatSelector, _super);
    function DatSelector(ngRedux) {
        var _this = _super.call(this, ngRedux) || this;
        _this.ngRedux = ngRedux;
        _this.digital$ = new DatDigitalSelections(_this.ngRedux, datDefinitions, 'digital');
        _this.namespace$ = new DatNamespaceSelections(_this.ngRedux, datDefinitions, 'namespace');
        _this.chunk$ = new DatChunkSelections(_this.ngRedux, datDefinitions, 'chunk');
        _this.column$ = new DatColumnSelections(_this.ngRedux, datDefinitions, 'column');
        _this.class_column_mapping$ = new DatClassColumnMappingSelections(_this.ngRedux, datDefinitions, 'class_column_mapping');
        _this.text_property$ = new DatTextPropertySelections(_this.ngRedux, datDefinitions, 'text_property');
        return _this;
    }
    DatSelector.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    DatSelector.ctorParameters = function () { return [
        { type: NgRedux }
    ]; };
    /** @nocollapse */ DatSelector.ngInjectableDef = ɵɵdefineInjectable({ factory: function DatSelector_Factory() { return new DatSelector(ɵɵinject(NgRedux)); }, token: DatSelector, providedIn: "root" });
    return DatSelector;
}(DatActions));
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
var ShouldPauseService = /** @class */ (function () {
    function ShouldPauseService() {
        this.shouldPause$ = new BehaviorSubject(false);
    }
    ShouldPauseService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    ShouldPauseService.ctorParameters = function () { return []; };
    /** @nocollapse */ ShouldPauseService.ngInjectableDef = ɵɵdefineInjectable({ factory: function ShouldPauseService_Factory() { return new ShouldPauseService(); }, token: ShouldPauseService, providedIn: "root" });
    return ShouldPauseService;
}());
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
var /**
 * @template Slice
 */
Selector$1 = /** @class */ (function () {
    function Selector(ngRedux, configs, model, shouldPause$) {
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
    Selector.prototype.selector = /**
     * @template M
     * @param {?} indexKey
     * @return {?}
     */
    function (indexKey) {
        var _this = this;
        /** @type {?} */
        var allNoPause$ = this.ngRedux.select([dfhRoot, this.model, indexKey]);
        /** @type {?} */
        var all$ = this.shouldPause$.pipe(switchMap((/**
         * @param {?} shouldPause
         * @return {?}
         */
        function (shouldPause) { return shouldPause ?
            empty() :
            allNoPause$; })));
        /** @type {?} */
        var keyNoPause = (/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return _this.ngRedux.select([dfhRoot, _this.model, indexKey, x]); });
        /** @type {?} */
        var key = (/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return _this.shouldPause$.pipe(switchMap((/**
         * @param {?} shouldPause
         * @return {?}
         */
        function (shouldPause) { return shouldPause ?
            empty() :
            _this.ngRedux.select([dfhRoot, _this.model, indexKey, x]); }))); });
        return { all$: all$, key: key, noPause: { all$: allNoPause$, key: keyNoPause } };
    };
    return Selector;
}());
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
var 
// Profile Selectors
DfhProfileSelections = /** @class */ (function (_super) {
    __extends(DfhProfileSelections, _super);
    function DfhProfileSelections() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.by_pk_profile$ = _this.selector('by_pk_profile');
        return _this;
    }
    return DfhProfileSelections;
}(Selector$1));
if (false) {
    /** @type {?} */
    DfhProfileSelections.prototype.by_pk_profile$;
}
// Class Selectors
var 
// Class Selectors
DfhClassSelections = /** @class */ (function (_super) {
    __extends(DfhClassSelections, _super);
    function DfhClassSelections() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.by_pk_class$ = _this.selector('by_pk_class');
        _this.by_basic_type$ = _this.selector('by_basic_type');
        return _this;
    }
    return DfhClassSelections;
}(Selector$1));
if (false) {
    /** @type {?} */
    DfhClassSelections.prototype.by_pk_class$;
    /** @type {?} */
    DfhClassSelections.prototype.by_basic_type$;
}
// Property Selectors
var 
// Property Selectors
DfhPropertySelections = /** @class */ (function (_super) {
    __extends(DfhPropertySelections, _super);
    function DfhPropertySelections() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pk_property__has_domain__has_range$ = _this.selector('by_pk_property__has_domain__has_range');
        _this.by_pk_property$ = _this.selector('by_pk_property');
        // public by_has_domain__pk_property$ = this.selector<ByPk<DfhProperty>>('by_has_domain__fk_property');
        // public by_has_range__pk_property$ = this.selector<ByPk<DfhProperty>>('by_has_range__fk_property');
        _this.by_has_domain$ = _this.selector('by_has_domain');
        _this.by_has_range$ = _this.selector('by_has_range');
        _this.by_is_has_type_subproperty$ = _this.selector('by_is_has_type_subproperty');
        return _this;
    }
    return DfhPropertySelections;
}(Selector$1));
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
var 
// Label Selectors
DfhLabelSelections = /** @class */ (function (_super) {
    __extends(DfhLabelSelections, _super);
    function DfhLabelSelections() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.by_fks$ = _this.selector('by_fks');
        _this.by_fk_class__type$ = _this.selector('by_fk_class__type');
        _this.by_fk_property__type$ = _this.selector('by_fk_property__type');
        _this.by_fk_profile__type$ = _this.selector('by_fk_profile__type');
        return _this;
    }
    return DfhLabelSelections;
}(Selector$1));
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
var DfhSelector = /** @class */ (function (_super) {
    __extends(DfhSelector, _super);
    function DfhSelector(ngRedux, pause) {
        var _this = _super.call(this, ngRedux) || this;
        _this.ngRedux = ngRedux;
        _this.pause = pause;
        _this.profile$ = new DfhProfileSelections(_this.ngRedux, dfhDefinitions, 'profile', _this.pause.shouldPause$);
        _this.class$ = new DfhClassSelections(_this.ngRedux, dfhDefinitions, 'klass', _this.pause.shouldPause$);
        _this.property$ = new DfhPropertySelections(_this.ngRedux, dfhDefinitions, 'property', _this.pause.shouldPause$);
        _this.label$ = new DfhLabelSelections(_this.ngRedux, dfhDefinitions, 'label', _this.pause.shouldPause$);
        return _this;
    }
    DfhSelector.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    DfhSelector.ctorParameters = function () { return [
        { type: NgRedux },
        { type: ShouldPauseService }
    ]; };
    /** @nocollapse */ DfhSelector.ngInjectableDef = ɵɵdefineInjectable({ factory: function DfhSelector_Factory() { return new DfhSelector(ɵɵinject(NgRedux), ɵɵinject(ShouldPauseService)); }, token: DfhSelector, providedIn: "root" });
    return DfhSelector;
}(DfhActions));
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
var Selector$2 = /** @class */ (function () {
    function Selector(ngRedux, pkProject$, configs, model) {
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
    Selector.prototype.selector = /**
     * @template M
     * @param {?} indexKey
     * @return {?}
     */
    function (indexKey) {
        var _this = this;
        /** @type {?} */
        var all$ = this.ngRedux.select([infRoot, this.model, indexKey]);
        /** @type {?} */
        var key = (/**
         * @param {?} x
         * @return {?}
         */
        function (x) {
            return _this.ngRedux.select([infRoot, _this.model, indexKey, x]);
        });
        return { all$: all$, key: key };
    };
    /**
     * @template M
     * @return {?}
     */
    Selector.prototype.paginationSelector = /**
     * @template M
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var pipePage = (/**
         * @param {?} page
         * @return {?}
         */
        function (page) {
            /** @type {?} */
            var path;
            /** @type {?} */
            var pagBy = paginateBy;
            /** @type {?} */
            var key = subfieldIdToString(page);
            path = [infRoot, _this.model, pagBy, key];
            return _this.ngRedux.select(__spread(path, ['count']))
                .pipe(filter((/**
             * @param {?} count
             * @return {?}
             */
            function (count) { return count !== undefined; })), switchMap((/**
             * @param {?} count
             * @return {?}
             */
            function (count) {
                /** @type {?} */
                var start = page.offset;
                /** @type {?} */
                var end = count <= (start + page.limit) ? count : (start + page.limit);
                /** @type {?} */
                var obs$ = [];
                for (var i = start; i < end; i++) {
                    obs$.push(_this.ngRedux.select(__spread(path, ['rows', i])).pipe(filter((/**
                     * @param {?} x
                     * @return {?}
                     */
                    function (x) { return !!x; }))));
                }
                return combineLatestOrEmpty(obs$);
            })));
        });
        /** @type {?} */
        var pipePageLoadNeeded = (/**
         * @param {?} page
         * @param {?} trigger$
         * @return {?}
         */
        function (page, trigger$) {
            /** @type {?} */
            var path;
            /** @type {?} */
            var pagBy = paginateBy;
            /** @type {?} */
            var key = subfieldIdToString(page);
            path = [infRoot, _this.model, pagBy, key];
            /** @type {?} */
            var fromToString = getFromTo(page.limit, page.offset);
            return trigger$.pipe(switchMap((/**
             * @return {?}
             */
            function () { return _this.ngRedux.select(__spread(path, ['loading', fromToString]))
                .pipe(first(), map((/**
             * @param {?} loading
             * @return {?}
             */
            function (loading) { return !loading; }))); })));
        });
        /** @type {?} */
        var pipeCount = (/**
         * @param {?} page
         * @return {?}
         */
        function (page) {
            /** @type {?} */
            var path;
            /** @type {?} */
            var pagBy = paginateBy;
            /** @type {?} */
            var key = subfieldIdToString(page);
            path = [infRoot, _this.model, pagBy, key];
            return _this.ngRedux.select(__spread(path, ['count']));
        });
        return { pipePage: pipePage, pipeCount: pipeCount, pipePageLoadNeeded: pipePageLoadNeeded };
    };
    /**
     * @template M
     * @param {?} pkProject$
     * @param {?} getFkEntity
     * @return {?}
     */
    Selector.prototype.pipeItemsInProject = /**
     * @template M
     * @param {?} pkProject$
     * @param {?} getFkEntity
     * @return {?}
     */
    function (pkProject$, getFkEntity) {
        var _this = this;
        return pipe(switchMap((/**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            return pkProject$.pipe(switchMap((/**
             * @param {?} pkProject
             * @return {?}
             */
            function (pkProject) {
                /** @type {?} */
                var proRelsAndKey$ = [];
                var _loop_1 = function (k) {
                    if (items.hasOwnProperty(k)) {
                        /** @type {?} */
                        var item = items[k];
                        proRelsAndKey$.push(_this.ngRedux.select(['pro', 'info_proj_rel', 'by_fk_project__fk_entity', pkProject + '_' + getFkEntity(item)])
                            .pipe(map((/**
                         * @param {?} rel
                         * @return {?}
                         */
                        function (rel) { return ({ key: k, rel: rel }); }))));
                    }
                };
                for (var k in items) {
                    _loop_1(k);
                }
                return combineLatestOrEmpty(proRelsAndKey$).pipe(map((/**
                 * @param {?} proRels
                 * @return {?}
                 */
                function (proRels) {
                    /** @type {?} */
                    var itemsInProject = {};
                    for (var i = 0; i < proRels.length; i++) {
                        /** @type {?} */
                        var proRel = proRels[i];
                        if (proRel.rel && proRel.rel.is_in_project) {
                            itemsInProject[proRel.key] = items[proRel.key];
                        }
                    }
                    return itemsInProject;
                })));
            })));
        })));
    };
    /**
     * @template M
     * @param {?} pkProject$
     * @param {?} getFkEntity
     * @return {?}
     */
    Selector.prototype.pipeItemInProject = /**
     * @template M
     * @param {?} pkProject$
     * @param {?} getFkEntity
     * @return {?}
     */
    function (pkProject$, getFkEntity) {
        var _this = this;
        return pipe(switchMap((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            if (!item)
                return of(undefined);
            return pkProject$.pipe(switchMap((/**
             * @param {?} pkProject
             * @return {?}
             */
            function (pkProject) {
                /** @type {?} */
                var proRel$ = _this.ngRedux.select(['pro', 'info_proj_rel', 'by_fk_project__fk_entity', pkProject + '_' + getFkEntity(item)]);
                return proRel$.pipe(
                // filter(proRel => proRel.is_in_project == true),
                map((/**
                 * @param {?} proRel
                 * @return {?}
                 */
                function (proRel) { return proRel && proRel.is_in_project == true ? item : undefined; })));
            })));
        })));
    };
    return Selector;
}());
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
var InfPersistentItemSelections = /** @class */ (function (_super) {
    __extends(InfPersistentItemSelections, _super);
    function InfPersistentItemSelections(ngRedux, pkProject$, configs, model) {
        var _this = _super.call(this, ngRedux, pkProject$, configs, model) || this;
        _this.ngRedux = ngRedux;
        _this.pkProject$ = pkProject$;
        _this.configs = configs;
        _this.model = model;
        _this._by_pk_entity$ = _this.selector('by_pk_entity');
        _this._by_fk_class$ = _this.selector('by_fk_class');
        return _this;
    }
    /**
     * @param {?} key
     * @param {?=} ofProject
     * @return {?}
     */
    InfPersistentItemSelections.prototype.by_pk_entity_key$ = /**
     * @param {?} key
     * @param {?=} ofProject
     * @return {?}
     */
    function (key, ofProject) {
        if (ofProject === void 0) { ofProject = true; }
        /** @type {?} */
        var selection$ = this._by_pk_entity$.key(key);
        if (ofProject)
            return selection$.pipe(this.pipeItemInProject(this.pkProject$, (/**
             * @param {?} i
             * @return {?}
             */
            function (i) { return i.pk_entity; })));
        return selection$;
    };
    /**
     * @param {?=} ofProject
     * @return {?}
     */
    InfPersistentItemSelections.prototype.by_pk_entity_all$ = /**
     * @param {?=} ofProject
     * @return {?}
     */
    function (ofProject) {
        if (ofProject === void 0) { ofProject = true; }
        /** @type {?} */
        var selection$ = this._by_pk_entity$.all$;
        if (ofProject)
            return selection$.pipe(this.pipeItemsInProject(this.pkProject$, (/**
             * @param {?} i
             * @return {?}
             */
            function (i) { return i.pk_entity; })));
        return selection$;
    };
    /**
     * @param {?} key
     * @param {?=} ofProject
     * @return {?}
     */
    InfPersistentItemSelections.prototype.by_fk_class_key$ = /**
     * @param {?} key
     * @param {?=} ofProject
     * @return {?}
     */
    function (key, ofProject) {
        if (ofProject === void 0) { ofProject = true; }
        /** @type {?} */
        var selection$ = this._by_fk_class$.key(key);
        if (ofProject)
            return selection$.pipe(this.pipeItemsInProject(this.pkProject$, (/**
             * @param {?} i
             * @return {?}
             */
            function (i) { return i.pk_entity; })));
        return selection$;
    };
    return InfPersistentItemSelections;
}(Selector$2));
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
var InfTemporalEntitySelections = /** @class */ (function (_super) {
    __extends(InfTemporalEntitySelections, _super);
    // public by_fk_class$ = this.selector<ByPk<InfTemporalEntity>>('by_fk_class')
    function InfTemporalEntitySelections(ngRedux, pkProject$, configs, model) {
        var _this = _super.call(this, ngRedux, pkProject$, configs, model) || this;
        _this.ngRedux = ngRedux;
        _this.pkProject$ = pkProject$;
        _this.configs = configs;
        _this.model = model;
        _this._by_pk_entity$ = _this.selector('by_pk_entity');
        return _this;
    }
    /**
     * @param {?} key
     * @param {?=} ofProject
     * @return {?}
     */
    InfTemporalEntitySelections.prototype.by_pk_entity_key$ = /**
     * @param {?} key
     * @param {?=} ofProject
     * @return {?}
     */
    function (key, ofProject) {
        if (ofProject === void 0) { ofProject = true; }
        /** @type {?} */
        var selection$ = this._by_pk_entity$.key(key);
        if (ofProject)
            return selection$.pipe(this.pipeItemInProject(this.pkProject$, (/**
             * @param {?} i
             * @return {?}
             */
            function (i) { return i.pk_entity; })));
        return selection$;
    };
    return InfTemporalEntitySelections;
}(Selector$2));
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
var InfStatementSelections = /** @class */ (function (_super) {
    __extends(InfStatementSelections, _super);
    function InfStatementSelections(ngRedux, pkProject$, configs, model) {
        var _this = _super.call(this, ngRedux, pkProject$, configs, model) || this;
        _this.ngRedux = ngRedux;
        _this.pkProject$ = pkProject$;
        _this.configs = configs;
        _this.model = model;
        _this.by_pk_entity$ = _this.selector('by_pk_entity');
        _this.by_fk_subject_data$ = _this.selector('by_fk_subject_data');
        _this.pagination$ = _this.paginationSelector();
        return _this;
    }
    /**
     * @param {?} key
     * @param {?=} ofProject
     * @return {?}
     */
    InfStatementSelections.prototype.by_pk_entity_key$ = /**
     * @param {?} key
     * @param {?=} ofProject
     * @return {?}
     */
    function (key, ofProject) {
        if (ofProject === void 0) { ofProject = true; }
        /** @type {?} */
        var selection$ = this.by_pk_entity$.key(key);
        if (ofProject)
            return selection$.pipe(this.pipeItemInProject(this.pkProject$, (/**
             * @param {?} i
             * @return {?}
             */
            function (i) { return i.pk_entity; })));
        return selection$;
    };
    /**
     * @param {?} foreignKeys
     * @param {?=} ofProject
     * @return {?}
     */
    InfStatementSelections.prototype.by_subject$ = /**
     * @param {?} foreignKeys
     * @param {?=} ofProject
     * @return {?}
     */
    function (foreignKeys, ofProject) {
        if (ofProject === void 0) { ofProject = true; }
        /** @type {?} */
        var key = indexStatementBySubject(foreignKeys);
        /** @type {?} */
        var selection$ = this.selector('by_subject').key(key);
        if (ofProject) {
            return selection$.pipe(this.pipeItemsInProject(this.pkProject$, (/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item.pk_entity; })), map((/**
             * @param {?} items
             * @return {?}
             */
            function (items) { return values(items); })));
        }
        return selection$.pipe(map((/**
         * @param {?} items
         * @return {?}
         */
        function (items) { return values(items); })));
    };
    /**
     * @param {?} foreignKeys
     * @param {?=} ofProject
     * @return {?}
     */
    InfStatementSelections.prototype.by_subject_and_property$ = /**
     * @param {?} foreignKeys
     * @param {?=} ofProject
     * @return {?}
     */
    function (foreignKeys, ofProject) {
        if (ofProject === void 0) { ofProject = true; }
        return this.by_subject_and_property_indexed$(foreignKeys, ofProject).pipe(map((/**
         * @param {?} statementIdx
         * @return {?}
         */
        function (statementIdx) { return values(statementIdx); })));
    };
    /**
     * @param {?} foreignKeys
     * @param {?=} ofProject
     * @return {?}
     */
    InfStatementSelections.prototype.by_subject_and_property_indexed$ = /**
     * @param {?} foreignKeys
     * @param {?=} ofProject
     * @return {?}
     */
    function (foreignKeys, ofProject) {
        if (ofProject === void 0) { ofProject = true; }
        /** @type {?} */
        var key = indexStatementBySubjectProperty(foreignKeys);
        /** @type {?} */
        var selection$ = this.selector('by_subject+property').key(key);
        if (ofProject) {
            return selection$.pipe(this.pipeItemsInProject(this.pkProject$, (/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item.pk_entity; })));
        }
        return selection$;
    };
    /**
     * @param {?} foreignKeys
     * @param {?=} ofProject
     * @return {?}
     */
    InfStatementSelections.prototype.by_object$ = /**
     * @param {?} foreignKeys
     * @param {?=} ofProject
     * @return {?}
     */
    function (foreignKeys, ofProject) {
        if (ofProject === void 0) { ofProject = true; }
        /** @type {?} */
        var key = indexStatementByObject(foreignKeys);
        /** @type {?} */
        var selection$ = this.selector('by_object').key(key);
        if (ofProject) {
            return selection$.pipe(this.pipeItemsInProject(this.pkProject$, (/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item.pk_entity; })), map((/**
             * @param {?} items
             * @return {?}
             */
            function (items) { return values(items); })));
        }
        return selection$.pipe(map((/**
         * @param {?} items
         * @return {?}
         */
        function (items) { return values(items); })));
    };
    /**
     * @param {?} foreignKeys
     * @param {?=} ofProject
     * @return {?}
     */
    InfStatementSelections.prototype.by_object_and_property$ = /**
     * @param {?} foreignKeys
     * @param {?=} ofProject
     * @return {?}
     */
    function (foreignKeys, ofProject) {
        if (ofProject === void 0) { ofProject = true; }
        return this.by_object_and_property_indexed$(foreignKeys, ofProject).pipe(map((/**
         * @param {?} statementIdx
         * @return {?}
         */
        function (statementIdx) { return values(statementIdx); })));
    };
    /**
     * @param {?} foreignKeys
     * @param {?=} ofProject
     * @return {?}
     */
    InfStatementSelections.prototype.by_object_and_property_indexed$ = /**
     * @param {?} foreignKeys
     * @param {?=} ofProject
     * @return {?}
     */
    function (foreignKeys, ofProject) {
        if (ofProject === void 0) { ofProject = true; }
        /** @type {?} */
        var key = indexStatementByObjectProperty(foreignKeys);
        /** @type {?} */
        var selection$ = this.selector('by_object+property').key(key);
        if (ofProject) {
            return selection$.pipe(this.pipeItemsInProject(this.pkProject$, (/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item.pk_entity; })));
        }
        return selection$;
    };
    return InfStatementSelections;
}(Selector$2));
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
var InfTextPropertySelections = /** @class */ (function (_super) {
    __extends(InfTextPropertySelections, _super);
    function InfTextPropertySelections(ngRedux, pkProject$, configs, model) {
        var _this = _super.call(this, ngRedux, pkProject$, configs, model) || this;
        _this.ngRedux = ngRedux;
        _this.pkProject$ = pkProject$;
        _this.configs = configs;
        _this.model = model;
        _this._by_pk_entity$ = _this.selector('by_pk_entity');
        _this._by_fk_concerned_entity__fk_class_field$ = _this.selector('by_fk_concerned_entity__fk_class_field');
        _this._by_fk_concerned_entity$ = _this.selector('by_fk_concerned_entity');
        return _this;
    }
    /**
     * @param {?} key
     * @param {?=} ofProject
     * @return {?}
     */
    InfTextPropertySelections.prototype.by_pk_entity_key$ = /**
     * @param {?} key
     * @param {?=} ofProject
     * @return {?}
     */
    function (key, ofProject) {
        if (ofProject === void 0) { ofProject = true; }
        /** @type {?} */
        var selection$ = this._by_pk_entity$.key(key);
        if (ofProject)
            return selection$.pipe(this.pipeItemInProject(this.pkProject$, (/**
             * @param {?} i
             * @return {?}
             */
            function (i) { return i.pk_entity; })));
        return selection$;
    };
    /**
     * @param {?} key
     * @param {?=} ofProject
     * @return {?}
     */
    InfTextPropertySelections.prototype.by_fk_concerned_entity__fk_class_field_indexed$ = /**
     * @param {?} key
     * @param {?=} ofProject
     * @return {?}
     */
    function (key, ofProject) {
        if (ofProject === void 0) { ofProject = true; }
        /** @type {?} */
        var selection$ = this._by_fk_concerned_entity__fk_class_field$.key(key);
        if (ofProject) {
            return selection$.pipe(this.pipeItemsInProject(this.pkProject$, (/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item.pk_entity; })));
        }
        return selection$;
    };
    /**
     * @param {?} key
     * @param {?=} ofProject
     * @return {?}
     */
    InfTextPropertySelections.prototype.by_fk_concerned_entity_indexed$ = /**
     * @param {?} key
     * @param {?=} ofProject
     * @return {?}
     */
    function (key, ofProject) {
        if (ofProject === void 0) { ofProject = true; }
        /** @type {?} */
        var selection$ = this._by_fk_concerned_entity$.key(key);
        if (ofProject) {
            return selection$.pipe(this.pipeItemsInProject(this.pkProject$, (/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item.pk_entity; })));
        }
        return selection$;
    };
    return InfTextPropertySelections;
}(Selector$2));
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
var InfAppellationSelections = /** @class */ (function (_super) {
    __extends(InfAppellationSelections, _super);
    function InfAppellationSelections(ngRedux, pkProject$, configs, model) {
        var _this = _super.call(this, ngRedux, pkProject$, configs, model) || this;
        _this.ngRedux = ngRedux;
        _this.pkProject$ = pkProject$;
        _this.configs = configs;
        _this.model = model;
        _this.by_pk_entity$ = _this.selector('by_pk_entity');
        return _this;
    }
    return InfAppellationSelections;
}(Selector$2));
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
var InfLangStringSelections = /** @class */ (function (_super) {
    __extends(InfLangStringSelections, _super);
    function InfLangStringSelections(ngRedux, pkProject$, configs, model) {
        var _this = _super.call(this, ngRedux, pkProject$, configs, model) || this;
        _this.ngRedux = ngRedux;
        _this.pkProject$ = pkProject$;
        _this.configs = configs;
        _this.model = model;
        _this.by_pk_entity$ = _this.selector('by_pk_entity');
        return _this;
    }
    return InfLangStringSelections;
}(Selector$2));
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
var InfPlaceSelections = /** @class */ (function (_super) {
    __extends(InfPlaceSelections, _super);
    function InfPlaceSelections(ngRedux, pkProject$, configs, model) {
        var _this = _super.call(this, ngRedux, pkProject$, configs, model) || this;
        _this.ngRedux = ngRedux;
        _this.pkProject$ = pkProject$;
        _this.configs = configs;
        _this.model = model;
        _this.by_pk_entity$ = _this.selector('by_pk_entity');
        return _this;
    }
    return InfPlaceSelections;
}(Selector$2));
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
var InfTimePrimitiveSelections = /** @class */ (function (_super) {
    __extends(InfTimePrimitiveSelections, _super);
    function InfTimePrimitiveSelections(ngRedux, pkProject$, configs, model) {
        var _this = _super.call(this, ngRedux, pkProject$, configs, model) || this;
        _this.ngRedux = ngRedux;
        _this.pkProject$ = pkProject$;
        _this.configs = configs;
        _this.model = model;
        _this.by_pk_entity$ = _this.selector('by_pk_entity');
        return _this;
    }
    return InfTimePrimitiveSelections;
}(Selector$2));
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
var InfLanguageSelections = /** @class */ (function (_super) {
    __extends(InfLanguageSelections, _super);
    function InfLanguageSelections(ngRedux, pkProject$, configs, model) {
        var _this = _super.call(this, ngRedux, pkProject$, configs, model) || this;
        _this.ngRedux = ngRedux;
        _this.pkProject$ = pkProject$;
        _this.configs = configs;
        _this.model = model;
        _this.by_pk_entity$ = _this.selector('by_pk_entity');
        return _this;
    }
    return InfLanguageSelections;
}(Selector$2));
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
var InfDimensionSelections = /** @class */ (function (_super) {
    __extends(InfDimensionSelections, _super);
    function InfDimensionSelections(ngRedux, pkProject$, configs, model) {
        var _this = _super.call(this, ngRedux, pkProject$, configs, model) || this;
        _this.ngRedux = ngRedux;
        _this.pkProject$ = pkProject$;
        _this.configs = configs;
        _this.model = model;
        _this.by_pk_entity$ = _this.selector('by_pk_entity');
        return _this;
    }
    return InfDimensionSelections;
}(Selector$2));
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
var InfSelector = /** @class */ (function () {
    function InfSelector(ngRedux, pkProject$) {
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
    InfSelector.prototype.getModelOfEntity$ = /**
     * @param {?} pkEntity
     * @return {?}
     */
    function (pkEntity) {
        return this.ngRedux.select([infRoot, PR_ENTITY_MODEL_MAP, pkEntity]);
    };
    return InfSelector;
}());
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
var Selector$3 = /** @class */ (function () {
    function Selector(ngRedux, configs, model) {
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
    }
    /**
     * @template M
     * @param {?} indexKey
     * @return {?}
     */
    Selector.prototype.selector = /**
     * @template M
     * @param {?} indexKey
     * @return {?}
     */
    function (indexKey) {
        var _this = this;
        /** @type {?} */
        var all$ = this.ngRedux.select([proRoot, this.model, indexKey]);
        /** @type {?} */
        var key = (/**
         * @param {?} x
         * @return {?}
         */
        function (x) {
            /** @type {?} */
            var k = typeof x === 'string' ? x : x.map((/**
             * @param {?} part
             * @return {?}
             */
            function (part) { return toString(part); })).join('_');
            ;
            return _this.ngRedux.select([proRoot, _this.model, indexKey, k]);
        });
        return { all$: all$, key: key };
    };
    return Selector;
}());
if (false) {
    /** @type {?} */
    Selector$3.prototype.ngRedux;
    /** @type {?} */
    Selector$3.prototype.configs;
    /** @type {?} */
    Selector$3.prototype.model;
}
var ProProjectSelector = /** @class */ (function (_super) {
    __extends(ProProjectSelector, _super);
    function ProProjectSelector(ngRedux, configs, model) {
        var _this = _super.call(this, ngRedux, configs, model) || this;
        _this.ngRedux = ngRedux;
        _this.configs = configs;
        _this.model = model;
        _this.by_pk_entity$ = _this.selector('by_pk_entity');
        return _this;
    }
    return ProProjectSelector;
}(Selector$3));
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
var ProInfoProjRelSelector = /** @class */ (function (_super) {
    __extends(ProInfoProjRelSelector, _super);
    function ProInfoProjRelSelector(ngRedux, configs, model) {
        var _this = _super.call(this, ngRedux, configs, model) || this;
        _this.ngRedux = ngRedux;
        _this.configs = configs;
        _this.model = model;
        _this.by_fk_project__fk_entity$ = _this.selector('by_fk_project__fk_entity');
        return _this;
    }
    return ProInfoProjRelSelector;
}(Selector$3));
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
var ProDfhClassProjRelSelector = /** @class */ (function (_super) {
    __extends(ProDfhClassProjRelSelector, _super);
    function ProDfhClassProjRelSelector(ngRedux, configs, model) {
        var _this = _super.call(this, ngRedux, configs, model) || this;
        _this.ngRedux = ngRedux;
        _this.configs = configs;
        _this.model = model;
        _this.by_fk_project__enabled_in_entities$ = _this.selector('by_fk_project__enabled_in_entities');
        _this.by_fk_project__fk_class$ = _this.selector('by_fk_project__fk_class');
        _this.by_fk_project$ = _this.selector('by_fk_project');
        return _this;
    }
    return ProDfhClassProjRelSelector;
}(Selector$3));
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
var ProDfhProfileProjRelSelector = /** @class */ (function (_super) {
    __extends(ProDfhProfileProjRelSelector, _super);
    function ProDfhProfileProjRelSelector(ngRedux, configs, model) {
        var _this = _super.call(this, ngRedux, configs, model) || this;
        _this.ngRedux = ngRedux;
        _this.configs = configs;
        _this.model = model;
        _this.by_fk_project__enabled$ = _this.selector('by_fk_project__enabled');
        _this.by_fk_project__fk_profile$ = _this.selector('by_fk_project__fk_profile');
        _this.by_fk_project$ = _this.selector('by_fk_project');
        return _this;
    }
    return ProDfhProfileProjRelSelector;
}(Selector$3));
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
var ProClassFieldConfigSelector = /** @class */ (function (_super) {
    __extends(ProClassFieldConfigSelector, _super);
    function ProClassFieldConfigSelector(ngRedux, configs, model) {
        var _this = _super.call(this, ngRedux, configs, model) || this;
        _this.ngRedux = ngRedux;
        _this.configs = configs;
        _this.model = model;
        _this.by_fk_project__fk_class$ = _this.selector('by_fk_project__fk_class');
        _this.by_pk_entity$ = _this.selector('by_pk_entity');
        return _this;
    }
    return ProClassFieldConfigSelector;
}(Selector$3));
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
var ProTextPropertySelector = /** @class */ (function (_super) {
    __extends(ProTextPropertySelector, _super);
    // public fk_project__fk_dfh_property__fk_dfh_property_domain__fk_system_type__fk_language$ = this.selector<ByPk<ProTextProperty>>('fk_project__fk_dfh_property__fk_dfh_property_domain__fk_system_type__fk_language')
    // public fk_project__fk_dfh_property__fk_dfh_property_range__fk_system_type__fk_language$ = this.selector<ByPk<ProTextProperty>>('fk_project__fk_dfh_property__fk_dfh_property_range__fk_system_type__fk_language')
    function ProTextPropertySelector(ngRedux, configs, model) {
        var _this = _super.call(this, ngRedux, configs, model) || this;
        _this.ngRedux = ngRedux;
        _this.configs = configs;
        _this.model = model;
        _this.by_fks$ = _this.selector('by_fks');
        _this.by_fks_without_lang$ = _this.selector('by_fks_without_lang');
        return _this;
    }
    return ProTextPropertySelector;
}(Selector$3));
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
var ProAnalysisSelector = /** @class */ (function (_super) {
    __extends(ProAnalysisSelector, _super);
    function ProAnalysisSelector(ngRedux, configs, model) {
        var _this = _super.call(this, ngRedux, configs, model) || this;
        _this.ngRedux = ngRedux;
        _this.configs = configs;
        _this.model = model;
        _this.by_pk_entity$ = _this.selector('by_pk_entity');
        return _this;
    }
    return ProAnalysisSelector;
}(Selector$3));
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
var ProSelector = /** @class */ (function (_super) {
    __extends(ProSelector, _super);
    function ProSelector(ngRedux) {
        var _this = _super.call(this, ngRedux) || this;
        _this.ngRedux = ngRedux;
        _this.project$ = new ProProjectSelector(_this.ngRedux, proDefinitions, 'project');
        _this.info_proj_rel$ = new ProInfoProjRelSelector(_this.ngRedux, proDefinitions, 'info_proj_rel');
        _this.dfh_class_proj_rel$ = new ProDfhClassProjRelSelector(_this.ngRedux, proDefinitions, 'dfh_class_proj_rel');
        _this.dfh_profile_proj_rel$ = new ProDfhProfileProjRelSelector(_this.ngRedux, proDefinitions, 'dfh_profile_proj_rel');
        _this.class_field_config$ = new ProClassFieldConfigSelector(_this.ngRedux, proDefinitions, 'class_field_config');
        _this.text_property$ = new ProTextPropertySelector(_this.ngRedux, proDefinitions, 'text_property');
        _this.analysis$ = new ProAnalysisSelector(_this.ngRedux, proDefinitions, 'analysis');
        return _this;
    }
    ProSelector.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    ProSelector.ctorParameters = function () { return [
        { type: NgRedux }
    ]; };
    /** @nocollapse */ ProSelector.ngInjectableDef = ɵɵdefineInjectable({ factory: function ProSelector_Factory() { return new ProSelector(ɵɵinject(NgRedux)); }, token: ProSelector, providedIn: "root" });
    return ProSelector;
}(ProActions));
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
var /**
 * @template Slice
 */
Selector$4 = /** @class */ (function () {
    function Selector(ngRedux, configs, model) {
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
    Selector.prototype.selector = /**
     * @template M
     * @param {?} indexKey
     * @return {?}
     */
    function (indexKey) {
        var _this = this;
        /** @type {?} */
        var all$ = this.ngRedux.select([sysRoot, this.model, indexKey]);
        /** @type {?} */
        var key = (/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return _this.ngRedux.select([sysRoot, _this.model, indexKey, x]); });
        return { all$: all$, key: key };
    };
    return Selector;
}());
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
var 
// SystemRelevantClass Selectors
SysSystemRelevantClassSelections = /** @class */ (function (_super) {
    __extends(SysSystemRelevantClassSelections, _super);
    function SysSystemRelevantClassSelections(ngRedux, configs, model) {
        var _this = _super.call(this, ngRedux, configs, model) || this;
        _this.ngRedux = ngRedux;
        _this.configs = configs;
        _this.model = model;
        _this.by_pk_entity$ = _this.selector('by_pk_entity');
        _this.by_fk_class$ = _this.selector('by_fk_class');
        _this.by_required_by_sources$ = _this.selector('by_required_by_sources');
        _this.by_required$ = _this.selector('by_required');
        return _this;
    }
    return SysSystemRelevantClassSelections;
}(Selector$4));
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
var 
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
SysConfigSelections = /** @class */ (function (_super) {
    __extends(SysConfigSelections, _super);
    function SysConfigSelections(ngRedux, configs, model) {
        var _this = _super.call(this, ngRedux, configs, model) || this;
        _this.ngRedux = ngRedux;
        _this.configs = configs;
        _this.model = model;
        _this.main$ = _this.ngRedux.select([sysRoot, _this.model, 'by_main', 'main']);
        return _this;
    }
    return SysConfigSelections;
}(Selector$4));
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
var SysSelector = /** @class */ (function (_super) {
    __extends(SysSelector, _super);
    function SysSelector() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.system_relevant_class$ = new SysSystemRelevantClassSelections(_this.ngRedux, sysDefinitions, 'system_relevant_class');
        // analysis_type$ = new SysAnalysisTypeSelections(this.ngRedux, sysDefinitions, 'analysis_type')
        _this.config$ = new SysConfigSelections(_this.ngRedux, sysDefinitions, 'config');
        return _this;
    }
    SysSelector.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */ SysSelector.ngInjectableDef = ɵɵdefineInjectable({ factory: function SysSelector_Factory() { return new SysSelector(ɵɵinject(NgRedux)); }, token: SysSelector, providedIn: "root" });
    return SysSelector;
}(SysActions));
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
var Selector$5 = /** @class */ (function () {
    function Selector(ngRedux, configs, model) {
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
    }
    /**
     * @template M
     * @param {?} indexKey
     * @return {?}
     */
    Selector.prototype.selector = /**
     * @template M
     * @param {?} indexKey
     * @return {?}
     */
    function (indexKey) {
        var _this = this;
        /** @type {?} */
        var all$ = this.ngRedux.select([tabRoot, this.model, indexKey]);
        /** @type {?} */
        var key = (/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return _this.ngRedux.select([tabRoot, _this.model, indexKey, x]); });
        return { all$: all$, key: key };
    };
    return Selector;
}());
if (false) {
    /** @type {?} */
    Selector$5.prototype.ngRedux;
    /** @type {?} */
    Selector$5.prototype.configs;
    /** @type {?} */
    Selector$5.prototype.model;
}
var TabCellSelections = /** @class */ (function (_super) {
    __extends(TabCellSelections, _super);
    function TabCellSelections(ngRedux, configs, model) {
        var _this = _super.call(this, ngRedux, configs, model) || this;
        _this.ngRedux = ngRedux;
        _this.configs = configs;
        _this.model = model;
        _this.by_pk_cell$ = _this.selector('by_pk_cell');
        _this.by_fk_column_fk_row$ = _this.selector('by_fk_column_fk_row');
        return _this;
    }
    return TabCellSelections;
}(Selector$5));
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
var TabSelector = /** @class */ (function (_super) {
    __extends(TabSelector, _super);
    function TabSelector(ngRedux) {
        var _this = _super.call(this, ngRedux) || this;
        _this.ngRedux = ngRedux;
        _this.cell$ = new TabCellSelections(_this.ngRedux, tabDefinitions, 'cell');
        return _this;
    }
    TabSelector.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    TabSelector.ctorParameters = function () { return [
        { type: NgRedux }
    ]; };
    /** @nocollapse */ TabSelector.ngInjectableDef = ɵɵdefineInjectable({ factory: function TabSelector_Factory() { return new TabSelector(ɵɵinject(NgRedux)); }, token: TabSelector, providedIn: "root" });
    return TabSelector;
}(TabActions));
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
var Selector$6 = /** @class */ (function () {
    function Selector(ngRedux, configs, model) {
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
    }
    /**
     * @template M
     * @param {?} indexKey
     * @return {?}
     */
    Selector.prototype.selector = /**
     * @template M
     * @param {?} indexKey
     * @return {?}
     */
    function (indexKey) {
        var _this = this;
        /** @type {?} */
        var all$ = this.ngRedux.select([warRoot, this.model, indexKey]);
        /** @type {?} */
        var key = (/**
         * @param {?} x
         * @return {?}
         */
        function (x) {
            /** @type {?} */
            var k = typeof x === 'string' ? x : x.map((/**
             * @param {?} part
             * @return {?}
             */
            function (part) { return toString(part); })).join('_');
            ;
            return _this.ngRedux.select([warRoot, _this.model, indexKey, k]);
        });
        return { all$: all$, key: key };
    };
    return Selector;
}());
if (false) {
    /** @type {?} */
    Selector$6.prototype.ngRedux;
    /** @type {?} */
    Selector$6.prototype.configs;
    /** @type {?} */
    Selector$6.prototype.model;
}
var WarEntityPreviewSelector = /** @class */ (function (_super) {
    __extends(WarEntityPreviewSelector, _super);
    function WarEntityPreviewSelector(ngRedux, configs, model) {
        var _this = _super.call(this, ngRedux, configs, model) || this;
        _this.ngRedux = ngRedux;
        _this.configs = configs;
        _this.model = model;
        _this.by_pk_entity$ = _this.selector('by_pk_entity');
        return _this;
    }
    return WarEntityPreviewSelector;
}(Selector$6));
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
var WarSelector = /** @class */ (function (_super) {
    __extends(WarSelector, _super);
    function WarSelector(ngRedux) {
        var _this = _super.call(this, ngRedux) || this;
        _this.ngRedux = ngRedux;
        _this.entity_preview$ = new WarEntityPreviewSelector(_this.ngRedux, warDefinitions, 'entity_preview');
        return _this;
    }
    WarSelector.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    WarSelector.ctorParameters = function () { return [
        { type: NgRedux }
    ]; };
    /** @nocollapse */ WarSelector.ngInjectableDef = ɵɵdefineInjectable({ factory: function WarSelector_Factory() { return new WarSelector(ɵɵinject(NgRedux)); }, token: WarSelector, providedIn: "root" });
    return WarSelector;
}(WarActions));
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
var SchemaSelectorsService = /** @class */ (function () {
    function SchemaSelectorsService(ngRedux, dat$, tab$, pro$, dfh$, sys$) {
        this.dat$ = dat$;
        this.tab$ = tab$;
        this.pro$ = pro$;
        this.dfh$ = dfh$;
        this.sys$ = sys$;
        /** @type {?} */
        var pkProject$ = ngRedux.select(['activeProject', 'pk_project']).pipe(filter((/**
         * @param {?} p
         * @return {?}
         */
        function (p) { return p !== undefined; })), distinctUntilChanged((/**
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        function (x, y) {
            return x === y;
        })));
        this.inf$ = new InfSelector(ngRedux, pkProject$);
    }
    SchemaSelectorsService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    SchemaSelectorsService.ctorParameters = function () { return [
        { type: NgRedux },
        { type: DatSelector },
        { type: TabSelector },
        { type: ProSelector },
        { type: DfhSelector },
        { type: SysSelector }
    ]; };
    /** @nocollapse */ SchemaSelectorsService.ngInjectableDef = ɵɵdefineInjectable({ factory: function SchemaSelectorsService_Factory() { return new SchemaSelectorsService(ɵɵinject(NgRedux), ɵɵinject(DatSelector), ɵɵinject(TabSelector), ɵɵinject(ProSelector), ɵɵinject(DfhSelector), ɵɵinject(SysSelector)); }, token: SchemaSelectorsService, providedIn: "root" });
    return SchemaSelectorsService;
}());
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
var ActiveProjectPipesService = /** @class */ (function () {
    function ActiveProjectPipesService(ngRedux, s, entityPreviewSocket) {
        var _this = this;
        this.ngRedux = ngRedux;
        this.s = s;
        this.entityPreviewSocket = entityPreviewSocket;
        this.requestedEntityPreviews = {};
        this.pkProject$ = ngRedux.select(['activeProject', 'pk_project'])
            .pipe(filter((/**
         * @param {?} p
         * @return {?}
         */
        function (p) { return p !== undefined; })), distinctUntilChanged((/**
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        function (x, y) {
            return x === y;
        })));
        this.entityPreviewSocket.fromEvent('reconnect').subscribe((/**
         * @param {?} disconnect
         * @return {?}
         */
        function (disconnect) {
            // get all EntityPreview keys from state and send them to the
            // server so that they will be streamed. This is important for
            // when connection was lost.
            _this.pkProject$.pipe(first())
                .subscribe((/**
             * @param {?} pkProject
             * @return {?}
             */
            function (pkProject) {
                /** @type {?} */
                var pks = Object.keys(__assign({}, _this.ngRedux.getState().war.entity_preview, _this.requestedEntityPreviews));
                if (pks.length) {
                    _this.entityPreviewSocket.emit('addToStream', {
                        pkProject: pkProject,
                        pks: pks
                    });
                }
            }));
        }));
    }
    /**
     * @return {?}
     */
    ActiveProjectPipesService.prototype.pipeActiveProject = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return this.pkProject$.pipe(switchMap((/**
         * @param {?} pkProject
         * @return {?}
         */
        function (pkProject) { return _this.s.pro$.project$.by_pk_entity$.key(pkProject.toString()); }))).pipe(filter((/**
         * @param {?} l
         * @return {?}
         */
        function (l) { return !!l; })));
    };
    /**
     * @return {?}
     */
    ActiveProjectPipesService.prototype.pipeActiveDefaultLanguage = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return this.pipeActiveProject().pipe(filter((/**
         * @param {?} p
         * @return {?}
         */
        function (p) { return !!p; })), switchMap((/**
         * @param {?} project
         * @return {?}
         */
        function (project) {
            return _this.s.inf$.language$.by_pk_entity$.key(project.fk_language.toString());
        }))).pipe(filter((/**
         * @param {?} l
         * @return {?}
         */
        function (l) { return !!l; })));
    };
    /**
     * Loads a data unit preview, if it is not yet available in state or if
     * forceReload is true;
     *
     * @param pkEntity
     * @param forceReload
     */
    /**
     * Loads a data unit preview, if it is not yet available in state or if
     * forceReload is true;
     *
     * @param {?} pkEntity
     * @param {?=} forceReload
     * @return {?}
     */
    ActiveProjectPipesService.prototype.streamEntityPreview = /**
     * Loads a data unit preview, if it is not yet available in state or if
     * forceReload is true;
     *
     * @param {?} pkEntity
     * @param {?=} forceReload
     * @return {?}
     */
    function (pkEntity, forceReload) {
        var _this = this;
        /** @type {?} */
        var state = this.ngRedux.getState();
        if ((!(((state.war || {}).entity_preview || {}).by_pk_entity || {})[pkEntity] &&
            !this.requestedEntityPreviews[pkEntity]) || forceReload) {
            this.pkProject$.pipe(first((/**
             * @param {?} pk
             * @return {?}
             */
            function (pk) { return !!pk; }))).subscribe((/**
             * @param {?} pkProject
             * @return {?}
             */
            function (pkProject) {
                _this.entityPreviewSocket.emit('addToStream', {
                    pkProject: pkProject,
                    pks: [pkEntity]
                });
                // const pkUiContext = SysConfig.PK_UI_CONTEXT_DATAUNITS_EDITABLE;
                // this.ngRedux.dispatch(this.actions.loadEntityPreview(pkProject, pkEntity, pkUiContext))
                _this.requestedEntityPreviews[pkEntity] = true;
            }));
        }
        return this.ngRedux.select(['war', 'entity_preview', 'by_pk_entity', pkEntity])
            .pipe(distinctUntilChanged(equals), filter((/**
         * @param {?} prev
         * @return {?}
         */
        function (prev) { return (!!prev); })));
    };
    ActiveProjectPipesService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    ActiveProjectPipesService.ctorParameters = function () { return [
        { type: NgRedux },
        { type: SchemaSelectorsService },
        { type: EntityPreviewSocket }
    ]; };
    /** @nocollapse */ ActiveProjectPipesService.ngInjectableDef = ɵɵdefineInjectable({ factory: function ActiveProjectPipesService_Factory() { return new ActiveProjectPipesService(ɵɵinject(NgRedux), ɵɵinject(SchemaSelectorsService), ɵɵinject(EntityPreviewSocket)); }, token: ActiveProjectPipesService, providedIn: "root" });
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
    return ActiveProjectPipesService;
}());
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
var ConfigurationPipesService = /** @class */ (function () {
    function ConfigurationPipesService(a, s) {
        this.a = a;
        this.s = s;
    }
    /**
    * returns observable number[] wher the numbers are the pk_profile
    * of all profiles that are enabled by the given project.
    * The array will always include PK_PROFILE_GEOVISTORY_BASIC
    */
    // @spyTag
    // @cache({ refCount: false })
    /**
     * returns observable number[] wher the numbers are the pk_profile
     * of all profiles that are enabled by the given project.
     * The array will always include PK_PROFILE_GEOVISTORY_BASIC
     * @return {?}
     */
    // @spyTag
    // @cache({ refCount: false })
    ConfigurationPipesService.prototype.pipeProfilesEnabledByProject = /**
     * returns observable number[] wher the numbers are the pk_profile
     * of all profiles that are enabled by the given project.
     * The array will always include PK_PROFILE_GEOVISTORY_BASIC
     * @return {?}
     */
    // @spyTag
    // @cache({ refCount: false })
    function () {
        var _this = this;
        return this.a.pkProject$.pipe(switchMap((/**
         * @param {?} pkProject
         * @return {?}
         */
        function (pkProject) { return _this.s.pro$.dfh_profile_proj_rel$.by_fk_project__enabled$
            .key(pkProject + '_true').pipe(map((/**
         * @param {?} projectProfileRels
         * @return {?}
         */
        function (projectProfileRels) { return values$1(projectProfileRels)
            .filter((/**
         * @param {?} rel
         * @return {?}
         */
        function (rel) { return rel.enabled; }))
            .map((/**
         * @param {?} rel
         * @return {?}
         */
        function (rel) { return rel.fk_profile; })); })), map((/**
         * @param {?} enabled
         * @return {?}
         */
        function (enabled) { return __spread(enabled, [DfhConfig.PK_PROFILE_GEOVISTORY_BASIC]); }))); })), shareReplay());
    };
    /**
     * Pipe all fields of given class
     * The Fields are not ordered and not filtered
     * If you want specific subsets of Fields and/or ordered Fields, use the pipes
     * that build on this pipe.
     */
    /**
     * Pipe all fields of given class
     * The Fields are not ordered and not filtered
     * If you want specific subsets of Fields and/or ordered Fields, use the pipes
     * that build on this pipe.
     * @param {?} pkClass
     * @return {?}
     */
    ConfigurationPipesService.prototype.pipeFields = /**
     * Pipe all fields of given class
     * The Fields are not ordered and not filtered
     * If you want specific subsets of Fields and/or ordered Fields, use the pipes
     * that build on this pipe.
     * @param {?} pkClass
     * @return {?}
     */
    function (pkClass) {
        var _this = this;
        return combineLatest(
        // pipe source class
        this.s.dfh$.class$.by_pk_class$.key(pkClass), 
        // pipe outgoing properties
        this.s.dfh$.property$.by_has_domain$.key(pkClass).pipe(map((/**
         * @param {?} indexed
         * @return {?}
         */
        function (indexed) { return values$1(indexed); }))), 
        // pipe ingoing properties
        this.s.dfh$.property$.by_has_range$.key(pkClass).pipe(map((/**
         * @param {?} indexed
         * @return {?}
         */
        function (indexed) { return values$1(indexed); }))), 
        // pipe sys config
        this.s.sys$.config$.main$.pipe(filter((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return !!x; }))), 
        // pipe enabled profiles
        this.pipeProfilesEnabledByProject()).pipe(switchMap((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = __read(_a, 5), sourceKlass = _b[0], outgoingProps = _b[1], ingoingProps = _b[2], sysConfig = _b[3], enabledProfiles = _b[4];
            if (pkClass === DfhConfig.ClASS_PK_TIME_SPAN) {
                // remove the has time span property
                ingoingProps = [];
            }
            else {
                // if class is not appellation for language, add appellation for language (1111) property
                if (pkClass !== DfhConfig.CLASS_PK_APPELLATION_FOR_LANGUAGE) {
                    ingoingProps.push(createAppellationProperty(pkClass));
                }
                // if is temporal entity, add has time span property
                if (sourceKlass.basic_type === 9) {
                    outgoingProps.push(createHasTimeSpanProperty(pkClass));
                }
                outgoingProps.push(createHasDefinitionProperty(pkClass));
            }
            return combineLatest(_this.pipePropertiesToSubfields(outgoingProps, true, enabledProfiles, sysConfig), _this.pipePropertiesToSubfields(ingoingProps, false, enabledProfiles, sysConfig), _this.pipeFieldConfigs(pkClass)).pipe(map((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var e_1, _b;
                var _c = __read(_a, 3), subfields1 = _c[0], subfields2 = _c[1], fieldConfigs = _c[2];
                /** @type {?} */
                var subfields = __spread(subfields1, subfields2);
                /** @type {?} */
                var fieldConfigIdx = indexBy((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) { return [
                    (x.fk_domain_class || x.fk_range_class),
                    x.fk_property,
                    !!x.fk_domain_class
                ].join('_'); }), fieldConfigs);
                /** @type {?} */
                var uniqFields = {};
                /** @type {?} */
                var uniqSubfieldCache = {}
                // group by source, pkProperty and isOutgoing
                ;
                try {
                    // group by source, pkProperty and isOutgoing
                    for (var subfields_1 = __values(subfields), subfields_1_1 = subfields_1.next(); !subfields_1_1.done; subfields_1_1 = subfields_1.next()) {
                        var s = subfields_1_1.value;
                        /** @type {?} */
                        var fieldId = [s.sourceClass, s.property.pkProperty, s.isOutgoing].join('_');
                        /** @type {?} */
                        var subfieldId = [s.sourceClass, s.property.pkProperty, s.isOutgoing, s.targetClass].join('_');
                        /** @type {?} */
                        var fieldConfig = fieldConfigIdx[fieldId];
                        // the first time the group is established
                        if (!uniqFields[fieldId]) {
                            /** @type {?} */
                            var isSpecialField = false;
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
                                listDefinitions: [s],
                                fieldConfig: fieldConfig,
                                placeOfDisplay: getPlaceOfDisplay(sysConfig.specialFields, s, fieldConfig),
                                isSpecialField: isSpecialField
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
                            uniqFields[fieldId].listDefinitions.push(s);
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (subfields_1_1 && !subfields_1_1.done && (_b = subfields_1.return)) _b.call(subfields_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return values$1(uniqFields);
            })));
        })));
    };
    /**
     * pipe all the specific fields of a class,
     * ordered by the position of the field within the specific fields
     */
    // @spyTag
    /**
     * pipe all the specific fields of a class,
     * ordered by the position of the field within the specific fields
     * @param {?} pkClass
     * @return {?}
     */
    // @spyTag
    ConfigurationPipesService.prototype.pipeSpecificFieldOfClass = /**
     * pipe all the specific fields of a class,
     * ordered by the position of the field within the specific fields
     * @param {?} pkClass
     * @return {?}
     */
    // @spyTag
    function (pkClass) {
        return this.pipeFields(pkClass).pipe(map((/**
         * @param {?} fields
         * @return {?}
         */
        function (fields) { return fields
            // filter fields that are displayd in specific fields
            .filter((/**
         * @param {?} field
         * @return {?}
         */
        function (field) { return field.placeOfDisplay.specificFields; }))
            // sort fields by the position defined in the specific fields
            .sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        function (a, b) { return a.placeOfDisplay.specificFields.position - b.placeOfDisplay.specificFields.position; })); })));
    };
    /**
      * pipe all the basic fields of a class,
      * ordered by the position of the field within the basic fields
      */
    // @spyTag
    /**
     * pipe all the basic fields of a class,
     * ordered by the position of the field within the basic fields
     * @param {?} pkClass
     * @return {?}
     */
    // @spyTag
    ConfigurationPipesService.prototype.pipeBasicFieldsOfClass = /**
     * pipe all the basic fields of a class,
     * ordered by the position of the field within the basic fields
     * @param {?} pkClass
     * @return {?}
     */
    // @spyTag
    function (pkClass) {
        return this.pipeFields(pkClass).pipe(map((/**
         * @param {?} fields
         * @return {?}
         */
        function (fields) { return fields
            // filter fields that are displayd in basic fields
            .filter((/**
         * @param {?} field
         * @return {?}
         */
        function (field) { return field.placeOfDisplay.basicFields; }))
            // sort fields by the position defined in the basic fields
            .sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        function (a, b) { return a.placeOfDisplay.basicFields.position - b.placeOfDisplay.basicFields.position; })); })));
    };
    /**
       * Pipes the fields for temporal entity forms
       * - the specific fields
       * - the when field
       * - if available: the type field
       */
    // @spyTag
    /**
     * Pipes the fields for temporal entity forms
     * - the specific fields
     * - the when field
     * - if available: the type field
     * @param {?} pkClass
     * @return {?}
     */
    // @spyTag
    ConfigurationPipesService.prototype.pipeFieldsForTeEnForm = /**
     * Pipes the fields for temporal entity forms
     * - the specific fields
     * - the when field
     * - if available: the type field
     * @param {?} pkClass
     * @return {?}
     */
    // @spyTag
    function (pkClass) {
        return this.pipeFields(pkClass).pipe(
        // filter fields that are displayd in specific fields
        map((/**
         * @param {?} allFields
         * @return {?}
         */
        function (allFields) {
            /** @type {?} */
            var fields = allFields
                // filter fields that are displayd in specific fields
                .filter((/**
             * @param {?} field
             * @return {?}
             */
            function (field) { return field.placeOfDisplay.specificFields; }))
                // sort fields by the position defined in the specific fields
                .sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            function (a, b) { return a.placeOfDisplay.specificFields.position - a.placeOfDisplay.specificFields.position; }));
            /** @type {?} */
            var whenField = allFields.find((/**
             * @param {?} field
             * @return {?}
             */
            function (field) { return field.property.pkProperty === DfhConfig.PROPERTY_PK_HAS_TIME_SPAN; }));
            if (whenField)
                fields.push(whenField);
            /** @type {?} */
            var typeField = allFields.find((/**
             * @param {?} field
             * @return {?}
             */
            function (field) { return field.isHasTypeField; }));
            if (typeField)
                fields.push(typeField);
            return fields;
        })));
    };
    /**
     * Pipes the fields of given class in this order:
     * - basic fields
     * - specific fields
     */
    // @spyTag
    /**
     * Pipes the fields of given class in this order:
     * - basic fields
     * - specific fields
     * @param {?} pkClass
     * @return {?}
     */
    // @spyTag
    ConfigurationPipesService.prototype.pipeBasicAndSpecificFields = /**
     * Pipes the fields of given class in this order:
     * - basic fields
     * - specific fields
     * @param {?} pkClass
     * @return {?}
     */
    // @spyTag
    function (pkClass) {
        return combineLatest(this.pipeBasicFieldsOfClass(pkClass), this.pipeSpecificFieldOfClass(pkClass))
            .pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = __read(_a, 2), a = _b[0], b = _b[1];
            return __spread(a, b);
        })));
    };
    /**
    * Pipes the fields of given class in this order:
    * - specific fields
    * - basic fields
    */
    // @spyTag
    /**
     * Pipes the fields of given class in this order:
     * - specific fields
     * - basic fields
     * @param {?} pkClass
     * @return {?}
     */
    // @spyTag
    ConfigurationPipesService.prototype.pipeSpecificAndBasicFields = /**
     * Pipes the fields of given class in this order:
     * - specific fields
     * - basic fields
     * @param {?} pkClass
     * @return {?}
     */
    // @spyTag
    function (pkClass) {
        return combineLatest(this.pipeSpecificFieldOfClass(pkClass), this.pipeBasicFieldsOfClass(pkClass))
            .pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = __read(_a, 2), a = _b[0], b = _b[1];
            return __spread(a, b);
        })));
    };
    /**
     * @param {?} properties
     * @param {?} isOutgoing
     * @param {?} enabledProfiles
     * @param {?} sysConfig
     * @return {?}
     */
    ConfigurationPipesService.prototype.pipePropertiesToSubfields = /**
     * @param {?} properties
     * @param {?} isOutgoing
     * @param {?} enabledProfiles
     * @param {?} sysConfig
     * @return {?}
     */
    function (properties, isOutgoing, enabledProfiles, sysConfig) {
        var _this = this;
        return combineLatestOrEmpty(properties.map((/**
         * @param {?} p
         * @return {?}
         */
        function (p) {
            return _this.pipeSubfield(isOutgoing, p, sysConfig, enabledProfiles);
        })));
    };
    /**
     * @param {?} sourceClass
     * @param {?} property
     * @param {?} targetClass
     * @param {?} isOutgoing
     * @return {?}
     */
    ConfigurationPipesService.prototype.pipeSubfieldIdToSubfield = /**
     * @param {?} sourceClass
     * @param {?} property
     * @param {?} targetClass
     * @param {?} isOutgoing
     * @return {?}
     */
    function (sourceClass, property, targetClass, isOutgoing) {
        var _this = this;
        /** @type {?} */
        var domain = isOutgoing ? sourceClass : targetClass;
        /** @type {?} */
        var range = isOutgoing ? targetClass : sourceClass;
        return combineLatest(this.s.dfh$.property$.pk_property__has_domain__has_range$.key([property, domain, range].join('_'))
            .pipe(filter((/**
         * @param {?} x
         * @return {?}
         */
        function (x) {
            return !!x;
        }))), this.s.sys$.config$.main$.pipe(filter((/**
         * @param {?} x
         * @return {?}
         */
        function (x) {
            return !!x;
        }))), this.pipeProfilesEnabledByProject().pipe(filter((/**
         * @param {?} x
         * @return {?}
         */
        function (x) {
            return !!x;
        })))).pipe(switchMap((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = __read(_a, 3), dfhProp = _b[0], sysConf = _b[1], enabledProfiles = _b[2];
            return _this.pipeSubfield(isOutgoing, dfhProp, sysConf, enabledProfiles);
        })));
    };
    /**
     * @private
     * @param {?} isOutgoing
     * @param {?} p
     * @param {?} sysConfig
     * @param {?} enabledProfiles
     * @return {?}
     */
    ConfigurationPipesService.prototype.pipeSubfield = /**
     * @private
     * @param {?} isOutgoing
     * @param {?} p
     * @param {?} sysConfig
     * @param {?} enabledProfiles
     * @return {?}
     */
    function (isOutgoing, p, sysConfig, enabledProfiles) {
        /** @type {?} */
        var o = isOutgoing;
        /** @type {?} */
        var targetClass = o ? p.has_range : p.has_domain;
        /** @type {?} */
        var sourceClass = o ? p.has_domain : p.has_range;
        /** @type {?} */
        var targetMaxQuantity = o ?
            p.range_instances_max_quantifier :
            p.domain_instances_max_quantifier;
        /** @type {?} */
        var sourceMaxQuantity = o ?
            p.domain_instances_max_quantifier :
            p.range_instances_max_quantifier;
        /** @type {?} */
        var targetMinQuantity = o ?
            p.range_instances_min_quantifier :
            p.domain_instances_min_quantifier;
        /** @type {?} */
        var sourceMinQuantity = o ?
            p.domain_instances_min_quantifier :
            p.range_instances_min_quantifier;
        return combineLatest(this.pipeClassLabel(sourceClass).pipe(tap((/**
         * @param {?} x
         * @return {?}
         */
        function (x) {
            return x;
        }))), this.pipeClassLabel(targetClass).pipe(tap((/**
         * @param {?} x
         * @return {?}
         */
        function (x) {
            return x;
        }))), this.pipeSubfieldTypeOfClass(sysConfig, targetClass, targetMaxQuantity, p.pk_property).pipe(tap((/**
         * @param {?} x
         * @return {?}
         */
        function (x) {
            return x;
        }))), this.pipeFieldLabel(p.pk_property, isOutgoing ? p.has_domain : null, isOutgoing ? null : p.has_range).pipe(tap((/**
         * @param {?} x
         * @return {?}
         */
        function (x) {
            return x;
        }))))
            .pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = __read(_a, 4), sourceClassLabel = _b[0], targetClassLabel = _b[1], listType = _b[2], label = _b[3];
            /** @type {?} */
            var node = {
                listType: listType,
                sourceClass: sourceClass,
                sourceClassLabel: sourceClassLabel,
                sourceMaxQuantity: sourceMaxQuantity,
                sourceMinQuantity: sourceMinQuantity,
                targetClass: targetClass,
                targetClassLabel: targetClassLabel,
                targetMinQuantity: targetMinQuantity,
                targetMaxQuantity: targetMaxQuantity,
                label: label,
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
    };
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
     */
    // @spyTag
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
     * @return {?}
     */
    // @spyTag
    ConfigurationPipesService.prototype.pipeSubfieldTypeOfClass = /**
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
     * @return {?}
     */
    // @spyTag
    function (config, pkClass, targetMaxQuantity, parentProperty) {
        var _this = this;
        return this.s.dfh$.class$.by_pk_class$.key(pkClass).pipe(filter((/**
         * @param {?} i
         * @return {?}
         */
        function (i) { return !!i; })), switchMap((/**
         * @param {?} klass
         * @return {?}
         */
        function (klass) { return _this.pipeSubfieldType(config, klass, targetMaxQuantity, parentProperty); })));
    };
    /**
     * @param {?} config
     * @param {?} klass
     * @param {?} targetMaxQuantity
     * @param {?=} parentProperty
     * @return {?}
     */
    ConfigurationPipesService.prototype.pipeSubfieldType = /**
     * @param {?} config
     * @param {?} klass
     * @param {?} targetMaxQuantity
     * @param {?=} parentProperty
     * @return {?}
     */
    function (config, klass, targetMaxQuantity, parentProperty) {
        /** @type {?} */
        var res = (/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return new BehaviorSubject(x); });
        /** @type {?} */
        var classConfig;
        if (config)
            classConfig = config.classes[klass.pk_class];
        if (classConfig && classConfig.valueObjectType) {
            return res(classConfig.valueObjectType);
        }
        else if (klass.basic_type === 30 && targetMaxQuantity == 1) {
            return res({ typeItem: 'true' });
        }
        else if (klass.basic_type === 8 || klass.basic_type === 30) {
            return res({ entityPreview: 'true' });
        }
        // TODO add this to sysConfigValue
        else if (klass.pk_class === DfhConfig.ClASS_PK_TIME_SPAN) {
            return res({ timeSpan: 'true' });
        }
        else {
            // pipe the subfields of the temporalEntity class
            return this.pipeBasicAndSpecificFields(klass.pk_class).pipe(map((/**
             * @param {?} fields
             * @return {?}
             */
            function (fields) {
                var e_2, _a, e_3, _b;
                /** @type {?} */
                var subentitySubfieldPage = [];
                try {
                    for (var fields_1 = __values(fields), fields_1_1 = fields_1.next(); !fields_1_1.done; fields_1_1 = fields_1.next()) {
                        var field = fields_1_1.value;
                        try {
                            // for each of these subfields
                            for (var _c = (e_3 = void 0, __values(field.listDefinitions)), _d = _c.next(); !_d.done; _d = _c.next()) {
                                var subfield = _d.value;
                                // create page:GvSubfieldPage
                                /** @type {?} */
                                var nestedSubfieldType = { entityPreview: 'true' };
                                if (!subfield.listType.temporalEntity)
                                    nestedSubfieldType = subfield.listType;
                                /** @type {?} */
                                var isCircular = false;
                                if (parentProperty &&
                                    subfield.property.pkProperty == parentProperty &&
                                    subfield.targetMaxQuantity === 1) {
                                    isCircular = true;
                                }
                                /** @type {?} */
                                var nestedPage = {
                                    subfieldType: nestedSubfieldType,
                                    page: {
                                        fkProperty: subfield.property.pkProperty,
                                        isOutgoing: subfield.isOutgoing,
                                        limit: 1,
                                        offset: 0,
                                        targetClass: subfield.targetClass,
                                        isCircular: isCircular
                                    }
                                };
                                subentitySubfieldPage.push(nestedPage);
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (fields_1_1 && !fields_1_1.done && (_a = fields_1.return)) _a.call(fields_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                return { temporalEntity: subentitySubfieldPage };
            })));
        }
    };
    /**
     * Gets class field configs of given pkClass
     *
     * - of active project, if any, else
     * - of default config project, else
     * - empty array
     *
     */
    // @spyTag
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
    ConfigurationPipesService.prototype.pipeFieldConfigs = /**
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
    function (pkClass) {
        var _this = this;
        return this.a.pkProject$.pipe(switchMap((/**
         * @param {?} fkProject
         * @return {?}
         */
        function (fkProject) {
            /** @type {?} */
            var activeProjectkey = proClassFieldConfgByProjectAndClassKey({
                fk_class_for_class_field: pkClass,
                fk_project: fkProject
            });
            /** @type {?} */
            var defaultProjectkey = proClassFieldConfgByProjectAndClassKey({
                fk_class_for_class_field: pkClass,
                fk_project: ProConfig.PK_PROJECT_OF_DEFAULT_CONFIG_PROJECT
            });
            return combineLatest(_this.s.pro$.class_field_config$.by_fk_project__fk_class$.key(activeProjectkey), _this.s.pro$.class_field_config$.by_fk_project__fk_class$.key(defaultProjectkey))
                .pipe(map((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var _b = __read(_a, 2), activeProjectFields = _b[0], defaultProjectFields = _b[1];
                if (activeProjectFields && values$1(activeProjectFields).length)
                    return activeProjectFields;
                return defaultProjectFields;
            })), map((/**
             * @param {?} items
             * @return {?}
             */
            function (items) { return values$1(items).sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            function (a, b) { return (a.ord_num > b.ord_num ? 1 : -1); })); })));
        })));
    };
    /********************************************** */
    /**
     * Delivers class label for active project
     */
    // @spyTag
    /********************************************** */
    /**
     * Delivers class label for active project
     * @param {?=} pkClass
     * @return {?}
     */
    // @spyTag
    ConfigurationPipesService.prototype.pipeClassLabel = /********************************************** */
    /**
     * Delivers class label for active project
     * @param {?=} pkClass
     * @return {?}
     */
    // @spyTag
    function (pkClass) {
        var _this = this;
        return combineLatest(this.a.pkProject$, this.a.pipeActiveDefaultLanguage()).pipe(switchMap((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = __read(_a, 2), fkProject = _b[0], language = _b[1];
            return _this.pipeLabels({ pkClass: pkClass, fkProject: fkProject, language: language, type: 'label' })
                .pipe(map((/**
             * @param {?} items
             * @return {?}
             */
            function (items) {
                /** @type {?} */
                var i = items.find((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return !!item; }));
                return i ? i.text : "* no label (id: " + pkClass + ") *";
            })));
        })));
    };
    /**
     * Delivers array of objects with
     * text ~ the text of the property
     * origin, in this order:
     * - origin == 'of project in project lang'         (from projects.text_property)
     * - origin == 'of default project in project lang' (from projects.text_property)
     * - origin == 'of default project in english'      (from projects.text_property)
     * - origin == 'of ontome in project lang'          (from data_for_history.label)
     * - origin == 'of ontome in english'               (from data_for_history.label)
     */
    // @spyTag
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
    ConfigurationPipesService.prototype.pipeLabels = /**
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
    function (d) {
        /** @type {?} */
        var fk_system_type;
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
            fk_system_type: fk_system_type,
            fk_dfh_class: d.pkClass,
            fk_dfh_property: d.fkProperty,
            fk_dfh_property_domain: d.fkPropertyDomain,
            fk_dfh_property_range: d.fkPropertyRange
        }).pipe(map((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            if (!item)
                return undefined;
            /** @type {?} */
            var origin = 'of project in project lang';
            return { origin: origin, text: item.string };
        }))), 
        // label of default project
        this.pipeProTextProperty({
            fk_project: ProConfig.PK_PROJECT_OF_DEFAULT_CONFIG_PROJECT,
            fk_language: d.language.pk_entity,
            fk_system_type: fk_system_type,
            fk_dfh_class: d.pkClass,
            fk_dfh_property: d.fkProperty,
            fk_dfh_property_domain: d.fkPropertyDomain,
            fk_dfh_property_range: d.fkPropertyRange
        }).pipe(map((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            if (!item)
                return undefined;
            /** @type {?} */
            var origin = 'of default project in project lang';
            return { origin: origin, text: item.string };
        }))), 
        // label of default project
        this.pipeProTextProperty({
            fk_project: ProConfig.PK_PROJECT_OF_DEFAULT_CONFIG_PROJECT,
            fk_language: 18889,
            fk_system_type: fk_system_type,
            fk_dfh_class: d.pkClass,
            fk_dfh_property: d.fkProperty,
            fk_dfh_property_domain: d.fkPropertyDomain,
            fk_dfh_property_range: d.fkPropertyRange
        }).pipe(map((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            if (!item)
                return undefined;
            /** @type {?} */
            var origin = 'of default project in english';
            return { origin: origin, text: item.string };
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
        function (item) {
            if (!item)
                return undefined;
            /** @type {?} */
            var origin = 'of ontome in project lang';
            return { origin: origin, text: item.label };
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
        function (item) {
            if (!item)
                return undefined;
            /** @type {?} */
            var origin = 'of ontome in english';
            return { origin: origin, text: item.label };
        }))));
    };
    /**
     * Pipes ProTextProperty
     */
    // @spyTag
    /**
     * Pipes ProTextProperty
     * @param {?} d
     * @return {?}
     */
    // @spyTag
    ConfigurationPipesService.prototype.pipeProTextProperty = /**
     * Pipes ProTextProperty
     * @param {?} d
     * @return {?}
     */
    // @spyTag
    function (d) {
        /** @type {?} */
        var key = textPropertyByFksKey(d);
        return this.s.pro$.text_property$.by_fks$.key(key);
    };
    /**
     * Pipes DfhLabel
     */
    // @spyTag
    /**
     * Pipes DfhLabel
     * @param {?} d
     * @return {?}
     */
    // @spyTag
    ConfigurationPipesService.prototype.pipeDfhLabel = /**
     * Pipes DfhLabel
     * @param {?} d
     * @return {?}
     */
    // @spyTag
    function (d) {
        /** @type {?} */
        var key = dfhLabelByFksKey(d);
        return this.s.dfh$.label$.by_fks$.key(key);
    };
    /**
     * Delivers best fitting field label for active project
    */
    // @spyTag
    /**
     * Delivers best fitting field label for active project
     * @param {?} fkProperty
     * @param {?} fkPropertyDomain
     * @param {?} fkPropertyRange
     * @return {?}
     */
    // @spyTag
    ConfigurationPipesService.prototype.pipeFieldLabel = /**
     * Delivers best fitting field label for active project
     * @param {?} fkProperty
     * @param {?} fkPropertyDomain
     * @param {?} fkPropertyRange
     * @return {?}
     */
    // @spyTag
    function (fkProperty, fkPropertyDomain, fkPropertyRange) {
        var _this = this;
        /** @type {?} */
        var isOutgoing = !!fkPropertyDomain;
        // const system_type = isOutgoing ? (singular ? 180 : 181) : (singular ? 182 : 183)
        return combineLatest(this.a.pkProject$, this.a.pipeActiveDefaultLanguage()).pipe(switchMap((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = __read(_a, 2), fkProject = _b[0], language = _b[1];
            return _this.pipeLabels({
                fkProject: fkProject,
                type: 'label',
                language: language,
                fkProperty: fkProperty,
                fkPropertyDomain: fkPropertyDomain,
                fkPropertyRange: fkPropertyRange
            })
                .pipe(map((/**
             * @param {?} items
             * @return {?}
             */
            function (items) {
                /** @type {?} */
                var label = "* no label (id: " + fkProperty + ") *";
                items.some((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) {
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
            })));
        })));
    };
    /**
     * maps the class to the corresponding model (database table)
     * this is used by Forms to create new data in the shape of
     * the data model
     */
    // @spyTag
    /**
     * maps the class to the corresponding model (database table)
     * this is used by Forms to create new data in the shape of
     * the data model
     * @param {?} targetClassPk
     * @return {?}
     */
    // @spyTag
    ConfigurationPipesService.prototype.pipeTableNameOfClass = /**
     * maps the class to the corresponding model (database table)
     * this is used by Forms to create new data in the shape of
     * the data model
     * @param {?} targetClassPk
     * @return {?}
     */
    // @spyTag
    function (targetClassPk) {
        return combineLatest(this.s.sys$.config$.main$, this.s.dfh$.class$.by_pk_class$.key(targetClassPk)).pipe(filter((/**
         * @param {?} i
         * @return {?}
         */
        function (i) { return !i.includes(undefined); })), map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = __read(_a, 2), config = _b[0], klass = _b[1];
            /** @type {?} */
            var classConfig = config.classes[targetClassPk];
            if (classConfig && classConfig.valueObjectType) {
                /** @type {?} */
                var keys = Object.keys(classConfig.valueObjectType);
                if (classConfig.valueObjectType.appellation)
                    return;
                /** @type {?} */
                var key = keys[0];
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
    };
    /**
     * returns an object where the keys are the pks of the Classes
     * used by the given project:
     * - or because the class is enabled by class_proj_rel
     * - or because the class is required by sources
     *
     * This is usefull to create select dropdowns of classes users will know
     */
    // @spyTag
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
    ConfigurationPipesService.prototype.pipeClassesInEntitiesOrSources = /**
     * returns an object where the keys are the pks of the Classes
     * used by the given project:
     * - or because the class is enabled by class_proj_rel
     * - or because the class is required by sources
     *
     * This is usefull to create select dropdowns of classes users will know
     * @return {?}
     */
    // @spyTag
    function () {
        return combineLatest(this.pipeClassesEnabledInEntities(), this.pipeClassesRequiredBySources()).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = __read(_a, 2), a = _b[0], b = _b[1];
            return indexBy((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return x.toString(); }), uniq(__spread(a, b)));
        })), startWith({}));
    };
    // @spyTag
    // @spyTag
    /**
     * @return {?}
     */
    ConfigurationPipesService.prototype.pipeClassesRequiredBySources = 
    // @spyTag
    /**
     * @return {?}
     */
    function () {
        return this.s.sys$.system_relevant_class$.by_required_by_sources$.key('true')
            .pipe(map((/**
         * @param {?} c
         * @return {?}
         */
        function (c) { return values$1(c).map((/**
         * @param {?} k
         * @return {?}
         */
        function (k) { return k.fk_class; })); })));
    };
    /**
     * returns observable number[] wher the numbers are the pk_class
     * of all classes that are enabled by at least one of the activated profiles
     * of thte given project
     */
    // @spyTag
    /**
     * returns observable number[] wher the numbers are the pk_class
     * of all classes that are enabled by at least one of the activated profiles
     * of thte given project
     * @return {?}
     */
    // @spyTag
    ConfigurationPipesService.prototype.pipeClassesEnabledByProjectProfiles = /**
     * returns observable number[] wher the numbers are the pk_class
     * of all classes that are enabled by at least one of the activated profiles
     * of thte given project
     * @return {?}
     */
    // @spyTag
    function () {
        var _this = this;
        return this.a.pkProject$.pipe(switchMap((/**
         * @param {?} pkProject
         * @return {?}
         */
        function (pkProject) { return combineLatest([
            _this.s.dfh$.class$.by_pk_class$.all$,
            _this.pipeProfilesEnabledByProject()
        ]).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = __read(_a, 2), classesByPk = _b[0], enabledProfiles = _b[1];
            /** @type {?} */
            var profilesMap = indexBy((/**
             * @param {?} k
             * @return {?}
             */
            function (k) { return k.toString(); }), values$1(enabledProfiles));
            return values$1(classesByPk)
                .filter((/**
             * @param {?} klass
             * @return {?}
             */
            function (klass) { return klass.profiles.some((/**
             * @param {?} profile
             * @return {?}
             */
            function (profile) { return profilesMap[profile.fk_profile]; })); }));
        }))); })));
    };
    /**
    * returns observable number[] wher the numbers are the pk_class
    * of all type classes that are enabled by at least one of the activated profiles
    * of thte given project
    */
    // @spyTag
    /**
     * returns observable number[] wher the numbers are the pk_class
     * of all type classes that are enabled by at least one of the activated profiles
     * of thte given project
     * @return {?}
     */
    // @spyTag
    ConfigurationPipesService.prototype.pipeTypeClassesEnabledByProjectProfiles = /**
     * returns observable number[] wher the numbers are the pk_class
     * of all type classes that are enabled by at least one of the activated profiles
     * of thte given project
     * @return {?}
     */
    // @spyTag
    function () {
        return combineLatest([
            this.s.dfh$.class$.by_basic_type$.key(30),
            this.pipeProfilesEnabledByProject()
        ]).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = __read(_a, 2), classesByPk = _b[0], enabledProfiles = _b[1];
            /** @type {?} */
            var profilesMap = indexBy((/**
             * @param {?} k
             * @return {?}
             */
            function (k) { return k.toString(); }), values$1(enabledProfiles));
            return values$1(classesByPk)
                .filter((/**
             * @param {?} klass
             * @return {?}
             */
            function (klass) {
                return klass.profiles.some((/**
                 * @param {?} profile
                 * @return {?}
                 */
                function (profile) { return profilesMap[profile.fk_profile]; })) &&
                    // Exclude Manifestation product type and language
                    ![
                        DfhConfig.CLASS_PK_LANGUAGE,
                        DfhConfig.CLASS_PK_MANIFESTATION_PRODUCT_TYPE
                    ].includes(klass.pk_class);
            }));
        })));
    };
    /**
     * returns observable number[] where the numbers are the pk_class
     * of all classes that are enabled by active project (using class_proj_rel)
     */
    // @spyTag
    /**
     * returns observable number[] where the numbers are the pk_class
     * of all classes that are enabled by active project (using class_proj_rel)
     * @return {?}
     */
    // @spyTag
    ConfigurationPipesService.prototype.pipeClassesEnabledInEntities = /**
     * returns observable number[] where the numbers are the pk_class
     * of all classes that are enabled by active project (using class_proj_rel)
     * @return {?}
     */
    // @spyTag
    function () {
        var _this = this;
        return this.a.pkProject$.pipe(switchMap((/**
         * @param {?} pkProject
         * @return {?}
         */
        function (pkProject) { return _this.s.pro$.dfh_class_proj_rel$.by_fk_project__enabled_in_entities$.key(pkProject + '_true')
            .pipe(map((/**
         * @param {?} rels
         * @return {?}
         */
        function (rels) { return values$1(rels).map((/**
         * @param {?} rel
         * @return {?}
         */
        function (rel) { return rel.fk_class; })); }))); })));
    };
    /**
    * returns an object where the keys are the pks of the TeEn Classes
    * used by the given project
    */
    // @spyTag
    /**
     * returns an object where the keys are the pks of the TeEn Classes
     * used by the given project
     * @return {?}
     */
    // @spyTag
    ConfigurationPipesService.prototype.pipeSelectedTeEnClassesInProject = /**
     * returns an object where the keys are the pks of the TeEn Classes
     * used by the given project
     * @return {?}
     */
    // @spyTag
    function () {
        return combineLatest(this.pipeTeEnClassesEnabledInEntities(), this.pipeTeEnClassesRequiredBySources()).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = __read(_a, 2), a = _b[0], b = _b[1];
            return indexBy((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return x.toString(); }), uniq(__spread(a, b)));
        })), startWith({}));
    };
    /**
     * Gets array of pk_class with teEn classes enabled in entities
     */
    // @spyTag
    /**
     * Gets array of pk_class with teEn classes enabled in entities
     * @return {?}
     */
    // @spyTag
    ConfigurationPipesService.prototype.pipeTeEnClassesEnabledInEntities = /**
     * Gets array of pk_class with teEn classes enabled in entities
     * @return {?}
     */
    // @spyTag
    function () {
        var _this = this;
        return this.a.pkProject$.pipe(switchMap((/**
         * @param {?} pkProject
         * @return {?}
         */
        function (pkProject) { return _this.s.pro$.dfh_class_proj_rel$.by_fk_project__enabled_in_entities$.key(pkProject + '_true')
            .pipe(switchMap((/**
         * @param {?} cs
         * @return {?}
         */
        function (cs) { return combineLatest(values$1(cs).map((/**
         * @param {?} c
         * @return {?}
         */
        function (c) { return _this.s.dfh$.class$.by_pk_class$.key(c.fk_class).pipe(filter((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return !!item; }))); }))).pipe(map((/**
         * @param {?} dfhClasses
         * @return {?}
         */
        function (dfhClasses) { return _this.filterTeEnCasses(dfhClasses); }))); }))); })));
    };
    /**
     * Filters array of DfhClass for TeEn Classes and returns array of pk_class
     * @param dfhClasses array of DfhClass
     * @returns returns array of pk_class where class is TeEn class
     */
    /**
     * Filters array of DfhClass for TeEn Classes and returns array of pk_class
     * @private
     * @param {?} dfhClasses array of DfhClass
     * @return {?} returns array of pk_class where class is TeEn class
     */
    ConfigurationPipesService.prototype.filterTeEnCasses = /**
     * Filters array of DfhClass for TeEn Classes and returns array of pk_class
     * @private
     * @param {?} dfhClasses array of DfhClass
     * @return {?} returns array of pk_class where class is TeEn class
     */
    function (dfhClasses) {
        /** @type {?} */
        var pks = [];
        for (var i = 0; i < dfhClasses.length; i++) {
            /** @type {?} */
            var c = dfhClasses[i];
            if (c.basic_type === 9)
                pks.push(c.pk_class);
        }
        return pks;
    };
    /**
     * Gets array of pk_class with teEn classes required by sources
     */
    // @spyTag
    /**
     * Gets array of pk_class with teEn classes required by sources
     * @return {?}
     */
    // @spyTag
    ConfigurationPipesService.prototype.pipeTeEnClassesRequiredBySources = /**
     * Gets array of pk_class with teEn classes required by sources
     * @return {?}
     */
    // @spyTag
    function () {
        var _this = this;
        return this.s.sys$.system_relevant_class$.by_required_by_sources$.key('true')
            .pipe(switchMap((/**
         * @param {?} cs
         * @return {?}
         */
        function (cs) { return combineLatest(values$1(cs).map((/**
         * @param {?} c
         * @return {?}
         */
        function (c) { return _this.s.dfh$.class$.by_pk_class$.key(c.fk_class).pipe(filter((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return !!item; }))); }))).pipe(map((/**
         * @param {?} dfhClasses
         * @return {?}
         */
        function (dfhClasses) {
            return _this.filterTeEnCasses(dfhClasses);
        }))); })));
    };
    /**
     *
     */
    // @spyTag
    /**
     *
     * @param {?=} enabledIn
     * @return {?}
     */
    // @spyTag
    ConfigurationPipesService.prototype.pipeTypeAndTypedClasses = /**
     *
     * @param {?=} enabledIn
     * @return {?}
     */
    // @spyTag
    function (enabledIn) {
        var _this = this;
        /** @type {?} */
        var pks$;
        /** @type {?} */
        var fromSources$ = this.s.sys$.system_relevant_class$.by_required_by_sources$.key('true').pipe(map((/**
         * @param {?} classes
         * @return {?}
         */
        function (classes) { return values$1(classes).map((/**
         * @param {?} k
         * @return {?}
         */
        function (k) { return k.fk_class; })); })));
        /** @type {?} */
        var fromEntities$ = this.pipeClassesEnabledInEntities();
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
        function (arrayOfPkArrays) { return uniq(flatten(arrayOfPkArrays)); })), switchMap((/**
         * @param {?} pks
         * @return {?}
         */
        function (pks) { return _this.pipeTypeAndTypedClassesOfTypedClasses(pks); })));
    };
    // @spyTag
    // @spyTag
    /**
     * @param {?} pkTypedClasses
     * @return {?}
     */
    ConfigurationPipesService.prototype.pipeTypeAndTypedClassesOfTypedClasses = 
    // @spyTag
    /**
     * @param {?} pkTypedClasses
     * @return {?}
     */
    function (pkTypedClasses) {
        return this.s.dfh$.property$.by_is_has_type_subproperty$.key('true').pipe(map((/**
         * @param {?} allHasTypeProps
         * @return {?}
         */
        function (allHasTypeProps) {
            /** @type {?} */
            var byDomain = indexBy((/**
             * @param {?} k
             * @return {?}
             */
            function (k) { return k.has_domain.toString(); }), values$1(allHasTypeProps));
            return pkTypedClasses.map((/**
             * @param {?} pk
             * @return {?}
             */
            function (pk) { return ({
                typedClass: pk,
                typeClass: byDomain[pk] ? byDomain[pk].has_range : undefined
            }); }));
        })));
    };
    // @spyTag
    // @spyTag
    /**
     * @param {?} pkTypedClass
     * @return {?}
     */
    ConfigurationPipesService.prototype.pipeTypeClassOfTypedClass = 
    // @spyTag
    /**
     * @param {?} pkTypedClass
     * @return {?}
     */
    function (pkTypedClass) {
        return this.s.dfh$.property$.by_is_has_type_subproperty$.key('true').pipe(map((/**
         * @param {?} allHasTypeProps
         * @return {?}
         */
        function (allHasTypeProps) {
            /** @type {?} */
            var byDomain = indexBy((/**
             * @param {?} k
             * @return {?}
             */
            function (k) { return k.has_domain.toString(); }), values$1(allHasTypeProps));
            return byDomain[pkTypedClass] ? byDomain[pkTypedClass].has_range : undefined;
        })));
    };
    // @spyTag
    // @spyTag
    /**
     * @param {?} pkTypeClasses
     * @return {?}
     */
    ConfigurationPipesService.prototype.pipeTypedClassesOfTypeClasses = 
    // @spyTag
    /**
     * @param {?} pkTypeClasses
     * @return {?}
     */
    function (pkTypeClasses) {
        return this.s.dfh$.property$.by_is_has_type_subproperty$.key('true').pipe(map((/**
         * @param {?} allHasTypeProps
         * @return {?}
         */
        function (allHasTypeProps) {
            /** @type {?} */
            var byDomain = indexBy((/**
             * @param {?} k
             * @return {?}
             */
            function (k) { return k.has_range.toString(); }), values$1(allHasTypeProps));
            return pkTypeClasses.map((/**
             * @param {?} pk
             * @return {?}
             */
            function (pk) { return byDomain[pk] ? byDomain[pk].has_domain : undefined; }));
        })));
    };
    // @spyTag
    // @spyTag
    /**
     * @param {?} pkTypedClass
     * @return {?}
     */
    ConfigurationPipesService.prototype.pipeTypePropertyOfTypedClass = 
    // @spyTag
    /**
     * @param {?} pkTypedClass
     * @return {?}
     */
    function (pkTypedClass) {
        return this.s.dfh$.property$.by_is_has_type_subproperty$.key('true').pipe(map((/**
         * @param {?} allHasTypeProps
         * @return {?}
         */
        function (allHasTypeProps) {
            /** @type {?} */
            var typeProp = values$1(allHasTypeProps).find((/**
             * @param {?} p
             * @return {?}
             */
            function (p) { return p.has_domain === pkTypedClass; }));
            return typeProp ? typeProp.pk_property : undefined;
        })));
    };
    // @spyTag
    // @spyTag
    /**
     * @param {?} pkProperties
     * @param {?} isOutgoing
     * @return {?}
     */
    ConfigurationPipesService.prototype.pipeTargetClassesOfProperties = 
    // @spyTag
    /**
     * @param {?} pkProperties
     * @param {?} isOutgoing
     * @return {?}
     */
    function (pkProperties, isOutgoing) {
        return this.s.dfh$.property$.by_pk_property$.all$.pipe(map((/**
         * @param {?} x
         * @return {?}
         */
        function (x) {
            if (!pkProperties || !pkProperties.length)
                return [];
            /** @type {?} */
            var res = [];
            /** @type {?} */
            var targetClasses = {};
            pkProperties.forEach((/**
             * @param {?} pkProp
             * @return {?}
             */
            function (pkProp) {
                /** @type {?} */
                var props = values$1(x[pkProp]);
                props.forEach((/**
                 * @param {?} prop
                 * @return {?}
                 */
                function (prop) {
                    /** @type {?} */
                    var targetClass = isOutgoing ? prop.has_range : prop.has_domain;
                    if (!targetClasses[targetClass]) {
                        targetClasses[targetClass] = true;
                        res.push(targetClass);
                    }
                }));
            }));
            return res;
        })));
    };
    ConfigurationPipesService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    ConfigurationPipesService.ctorParameters = function () { return [
        { type: ActiveProjectPipesService },
        { type: SchemaSelectorsService }
    ]; };
    /** @nocollapse */ ConfigurationPipesService.ngInjectableDef = ɵɵdefineInjectable({ factory: function ConfigurationPipesService_Factory() { return new ConfigurationPipesService(ɵɵinject(ActiveProjectPipesService), ɵɵinject(SchemaSelectorsService)); }, token: ConfigurationPipesService, providedIn: "root" });
    __decorate([
        cache({ refCount: false }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeFields", null);
    __decorate([
        cache({ refCount: false }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeSpecificFieldOfClass", null);
    __decorate([
        cache({ refCount: false }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeBasicFieldsOfClass", null);
    __decorate([
        cache({ refCount: false }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeFieldsForTeEnForm", null);
    __decorate([
        cache({ refCount: false }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeBasicAndSpecificFields", null);
    __decorate([
        cache({ refCount: false }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeSpecificAndBasicFields", null);
    __decorate([
        cache({ refCount: false }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array, Boolean, Array, Object]),
        __metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipePropertiesToSubfields", null);
    __decorate([
        cache({ refCount: false }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Number, Number, Boolean]),
        __metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeSubfieldIdToSubfield", null);
    __decorate([
        cache({ refCount: false }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Number, Number, Number]),
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
    return ConfigurationPipesService;
}());
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
    var profiles = [
        {
            removed_from_api: false,
            fk_profile: DfhConfig.PK_PROFILE_GEOVISTORY_BASIC
        }
    ];
    /** @type {?} */
    var hasDefinition = {
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
        profiles: profiles
    };
    return hasDefinition;
}
/**
 * @param {?} rangeClass
 * @return {?}
 */
function createAppellationProperty(rangeClass) {
    /** @type {?} */
    var profiles = [
        {
            removed_from_api: false,
            fk_profile: DfhConfig.PK_PROFILE_GEOVISTORY_BASIC
        }
    ];
    /** @type {?} */
    var hasAppeProp = {
        has_domain: DfhConfig.CLASS_PK_APPELLATION_FOR_LANGUAGE,
        pk_property: DfhConfig.PROPERTY_PK_IS_APPELLATION_OF,
        has_range: rangeClass,
        domain_instances_max_quantifier: -1,
        domain_instances_min_quantifier: 0,
        range_instances_max_quantifier: 1,
        range_instances_min_quantifier: 1,
        identifier_in_namespace: 'histP9',
        identity_defining: true,
        is_inherited: true,
        is_has_type_subproperty: false,
        profiles: profiles
    };
    return hasAppeProp;
}
/**
 * @param {?} domainClass
 * @return {?}
 */
function createHasTimeSpanProperty(domainClass) {
    /** @type {?} */
    var profiles = [
        {
            removed_from_api: false,
            fk_profile: DfhConfig.PK_PROFILE_GEOVISTORY_BASIC
        }
    ];
    /** @type {?} */
    var hasAppeProp = {
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
        profiles: profiles
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
    function (p) { return p.removed_from_api === false && enabledProfiles.includes(p.fk_profile); }));
}
/**
 * @param {?} specialFields
 * @param {?} subfield
 * @param {?=} projectFieldConfig
 * @return {?}
 */
function getPlaceOfDisplay(specialFields, subfield, projectFieldConfig) {
    /** @type {?} */
    var settings;
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
    var position = Number.POSITIVE_INFINITY;
    if (projectFieldConfig)
        position = projectFieldConfig.ord_num;
    return { specificFields: { position: position } };
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
var InformationBasicPipesService = /** @class */ (function () {
    // infRepo: InfSelector;
    function InformationBasicPipesService(p, s) {
        var _this = this;
        this.p = p;
        this.s = s;
        /**
         * Pipes max. one time primitive for an array of statements, assuming that the statements
         * are of the same properties.
         */
        this.timePrimitiveOfStatements = (/**
         * @return {?}
         */
        function () { return pipe(map((/**
         * @param {?} r
         * @return {?}
         */
        function (r) { return r[0]; })), switchMap((/**
         * @param {?} r
         * @return {?}
         */
        function (r) {
            if (!r)
                return new BehaviorSubject(undefined);
            return _this.pipeInfTimePrimitive(r.fk_object_info).pipe(switchMap((/**
             * @param {?} infTimePrimitive
             * @return {?}
             */
            function (infTimePrimitive) { return _this.p.pkProject$.pipe(switchMap((/**
             * @param {?} pkProject
             * @return {?}
             */
            function (pkProject) { return _this.s.pro$.info_proj_rel$.by_fk_project__fk_entity$
                .key(pkProject + '_' + r[0].pk_entity).pipe(filter((/**
             * @param {?} statement
             * @return {?}
             */
            function (statement) { return !!statement; })), map((/**
             * @param {?} ipr
             * @return {?}
             */
            function (ipr) {
                /** @type {?} */
                var y = {
                    calendar: (/** @type {?} */ ((ipr.calendar ? ipr.calendar : 'gregorian'))),
                    julianDay: infTimePrimitive.julian_day,
                    duration: (/** @type {?} */ (infTimePrimitive.duration))
                };
                return y;
            }))); }))); })));
        }))); });
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
   */
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
    InformationBasicPipesService.prototype.pipeStatements = /*********************************************************************
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
    function (pkEntity, isOutgoing) {
        return isOutgoing ? this.pipeOutgoingStatements(pkEntity) : this.pipeIngoingStatements(pkEntity);
    };
    /**
    * Pipe outgoing statements of an entity
    */
    /**
     * Pipe outgoing statements of an entity
     * @param {?} pkEntity
     * @return {?}
     */
    InformationBasicPipesService.prototype.pipeOutgoingStatements = /**
     * Pipe outgoing statements of an entity
     * @param {?} pkEntity
     * @return {?}
     */
    function (pkEntity) {
        return this.s.inf$.statement$.by_subject$({ fk_subject_info: pkEntity });
    };
    /**
     * Pipe ingoing statements of an entity
     */
    /**
     * Pipe ingoing statements of an entity
     * @param {?} pkEntity
     * @return {?}
     */
    InformationBasicPipesService.prototype.pipeIngoingStatements = /**
     * Pipe ingoing statements of an entity
     * @param {?} pkEntity
     * @return {?}
     */
    function (pkEntity) {
        return this.s.inf$.statement$.by_object$({ fk_object_info: pkEntity });
    };
    /**
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    InformationBasicPipesService.prototype.pipeStatementsOfList = /**
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    function (listDefinition, pkEntity) {
        if (listDefinition.isOutgoing) {
            return this.s.inf$.statement$.by_subject_and_property$({
                fk_property: listDefinition.property.pkProperty,
                fk_property_of_property: listDefinition.property.pkPropertyOfProperty,
                fk_subject_info: pkEntity
            });
        }
        else {
            return this.s.inf$.statement$.by_object_and_property$({
                fk_property: listDefinition.property.pkProperty,
                fk_property_of_property: listDefinition.property.pkPropertyOfProperty,
                fk_object_info: pkEntity
            });
        }
    };
    /**
     * Pipe outgoing statements of temporal entity
     */
    /**
     * Pipe outgoing statements of temporal entity
     * @param {?} pkProperty
     * @param {?} pkEntity
     * @return {?}
     */
    InformationBasicPipesService.prototype.pipeOutgoingStatementsByProperty = /**
     * Pipe outgoing statements of temporal entity
     * @param {?} pkProperty
     * @param {?} pkEntity
     * @return {?}
     */
    function (pkProperty, pkEntity) {
        return this.s.inf$.statement$.by_subject_and_property$({
            fk_property: pkProperty,
            fk_subject_info: pkEntity
        });
    };
    /**
     * Pipe ingoing statements of an entity
     */
    /**
     * Pipe ingoing statements of an entity
     * @param {?} pkProperty
     * @param {?} pkEntity
     * @return {?}
     */
    InformationBasicPipesService.prototype.pipeIngoingStatementsByProperty = /**
     * Pipe ingoing statements of an entity
     * @param {?} pkProperty
     * @param {?} pkEntity
     * @return {?}
     */
    function (pkProperty, pkEntity) {
        return this.s.inf$.statement$.by_object_and_property$({
            fk_property: pkProperty,
            fk_object_info: pkEntity
        });
    };
    /**
   * Pipe outgoing statements of temporal entity
   */
    /**
     * Pipe outgoing statements of temporal entity
     * @param {?} pkProperty
     * @param {?} pkEntity
     * @param {?} pkProject
     * @return {?}
     */
    InformationBasicPipesService.prototype.pipeOutgoingBasicStatementItemsByProperty = /**
     * Pipe outgoing statements of temporal entity
     * @param {?} pkProperty
     * @param {?} pkEntity
     * @param {?} pkProject
     * @return {?}
     */
    function (pkProperty, pkEntity, pkProject) {
        var _this = this;
        return this.s.inf$.statement$.by_subject_and_property$({
            fk_property: pkProperty,
            fk_subject_info: pkEntity
        }).pipe(switchMap((/**
         * @param {?} statements
         * @return {?}
         */
        function (statements) { return combineLatestOrEmpty(statements.map((/**
         * @param {?} statement
         * @return {?}
         */
        function (statement) { return _this.pipeBasicStatementItem(pkProject, statement, true); }))); })));
    };
    /**
     * Pipe ingoing statements of an entity
     */
    /**
     * Pipe ingoing statements of an entity
     * @param {?} pkProperty
     * @param {?} pkEntity
     * @param {?} pkProject
     * @return {?}
     */
    InformationBasicPipesService.prototype.pipeIngoingBasicStatementItemsByProperty = /**
     * Pipe ingoing statements of an entity
     * @param {?} pkProperty
     * @param {?} pkEntity
     * @param {?} pkProject
     * @return {?}
     */
    function (pkProperty, pkEntity, pkProject) {
        var _this = this;
        return this.s.inf$.statement$.by_object_and_property$({
            fk_property: pkProperty,
            fk_object_info: pkEntity
        }).pipe(switchMap((/**
         * @param {?} statements
         * @return {?}
         */
        function (statements) { return combineLatestOrEmpty(statements.map((/**
         * @param {?} statement
         * @return {?}
         */
        function (statement) { return _this.pipeBasicStatementItem(pkProject, statement, false); }))); })));
    };
    /**
     * @private
     * @param {?} pkProject
     * @param {?} statement
     * @param {?} isOutgoing
     * @return {?}
     */
    InformationBasicPipesService.prototype.pipeBasicStatementItem = /**
     * @private
     * @param {?} pkProject
     * @param {?} statement
     * @param {?} isOutgoing
     * @return {?}
     */
    function (pkProject, statement, isOutgoing) {
        return this.s.pro$.info_proj_rel$.by_fk_project__fk_entity$.key(pkProject + '_' + statement.pk_entity).pipe(filter((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return !!x; })), map((/**
         * @param {?} projRel
         * @return {?}
         */
        function (projRel) { return ({
            projRel: projRel, statement: statement, label: '', ordNum: (isOutgoing ? projRel.ord_num_of_range : projRel.ord_num_of_domain), isOutgoing: isOutgoing
        }); })));
    };
    /**
     * @param {?} pkProject
     * @param {?} pkStatement
     * @param {?} isOutgoing
     * @return {?}
     */
    InformationBasicPipesService.prototype.pipeBasicStatementItemByPkStatement = /**
     * @param {?} pkProject
     * @param {?} pkStatement
     * @param {?} isOutgoing
     * @return {?}
     */
    function (pkProject, pkStatement, isOutgoing) {
        var _this = this;
        return this.s.inf$.statement$.by_pk_entity_key$(pkStatement).pipe(switchMap((/**
         * @param {?} statement
         * @return {?}
         */
        function (statement) { return (!statement) ? of(undefined) : _this.pipeBasicStatementItem(pkProject, statement, isOutgoing); })));
    };
    /**
     * @param {?} pkEntity
     * @return {?}
     */
    InformationBasicPipesService.prototype.pipeInfTimePrimitive = /**
     * @param {?} pkEntity
     * @return {?}
     */
    function (pkEntity) {
        return this.s.inf$.time_primitive$.by_pk_entity$.key(pkEntity);
    };
    /**
     * pipes the TimeSpan of a temporal entity
     * @param pkEntity the pk_entity of the termporal entity
     */
    /**
     * pipes the TimeSpan of a temporal entity
     * @param {?} pkEntity the pk_entity of the termporal entity
     * @return {?}
     */
    InformationBasicPipesService.prototype.pipeTimeSpan = /**
     * pipes the TimeSpan of a temporal entity
     * @param {?} pkEntity the pk_entity of the termporal entity
     * @return {?}
     */
    function (pkEntity) {
        // Get the properties leading to presences
        return combineLatest(this.pipeOutgoingStatementsByProperty(72, pkEntity).pipe(this.timePrimitiveOfStatements()), this.pipeOutgoingStatementsByProperty(71, pkEntity).pipe(this.timePrimitiveOfStatements()), this.pipeOutgoingStatementsByProperty(150, pkEntity).pipe(this.timePrimitiveOfStatements()), this.pipeOutgoingStatementsByProperty(151, pkEntity).pipe(this.timePrimitiveOfStatements()), this.pipeOutgoingStatementsByProperty(152, pkEntity).pipe(this.timePrimitiveOfStatements()), this.pipeOutgoingStatementsByProperty(153, pkEntity).pipe(this.timePrimitiveOfStatements())).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = __read(_a, 6), _72 = _b[0], _71 = _b[1], _150 = _b[2], _151 = _b[3], _152 = _b[4], _153 = _b[5];
            return new TimeSpanUtil({
                p82: _72,
                p81: _71,
                p82a: _152,
                p81a: _150,
                p81b: _151,
                p82b: _153,
            });
        })));
    };
    /**
     * Pipes the fk_class of the given entity
     */
    /**
     * Pipes the fk_class of the given entity
     * @param {?} pkEntity
     * @return {?}
     */
    InformationBasicPipesService.prototype.pipeClassOfEntity = /**
     * Pipes the fk_class of the given entity
     * @param {?} pkEntity
     * @return {?}
     */
    function (pkEntity) {
        return merge(this.s.inf$.persistent_item$.by_pk_entity_key$(pkEntity).pipe(filter((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return !!e; })), map((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return e.fk_class; }))), this.s.inf$.temporal_entity$.by_pk_entity_key$(pkEntity).pipe(filter((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return !!e; })), map((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return e.fk_class; }))));
    };
    /**
     * Pipes distinct fk_classes of the given persistent items
     */
    /**
     * Pipes distinct fk_classes of the given persistent items
     * @param {?} pkEntities
     * @return {?}
     */
    InformationBasicPipesService.prototype.pipeClassesOfPersistentItems = /**
     * Pipes distinct fk_classes of the given persistent items
     * @param {?} pkEntities
     * @return {?}
     */
    function (pkEntities) {
        return this.s.inf$.persistent_item$.by_pk_entity_all$().pipe(map((/**
         * @param {?} peIts
         * @return {?}
         */
        function (peIts) {
            if (!pkEntities || pkEntities.length === 0) {
                return [];
            }
            /** @type {?} */
            var classes = {};
            /** @type {?} */
            var a = [];
            pkEntities.forEach((/**
             * @param {?} typePk
             * @return {?}
             */
            function (typePk) {
                if (!classes[peIts[typePk].fk_class]) {
                    classes[peIts[typePk].fk_class] = true;
                    a.push(peIts[typePk].fk_class);
                }
            }));
            return a;
        })));
    };
    /*********************************************************************
     * Repo
    *********************************************************************/
    /**
      * Pipe repo outgoing statements.
      */
    /*********************************************************************
       * Repo
      *********************************************************************/
    /**
     * Pipe repo outgoing statements.
     * @param {?} pkEntity
     * @return {?}
     */
    InformationBasicPipesService.prototype.pipeRepoOutgoingStatements = /*********************************************************************
       * Repo
      *********************************************************************/
    /**
     * Pipe repo outgoing statements.
     * @param {?} pkEntity
     * @return {?}
     */
    function (pkEntity) {
        return this.s.inf$.statement$.by_subject$({ fk_subject_info: pkEntity }, false);
    };
    /**
    * Pipe repo ingoing statements.
    */
    /**
     * Pipe repo ingoing statements.
     * @param {?} pkEntity
     * @return {?}
     */
    InformationBasicPipesService.prototype.pipeRepoIngoingStatements = /**
     * Pipe repo ingoing statements.
     * @param {?} pkEntity
     * @return {?}
     */
    function (pkEntity) {
        return this.s.inf$.statement$.by_object$({ fk_object_info: pkEntity }, false);
    };
    /**
      * Pipe repo outgoing statements.
      * If max quantity is limited, takes only max allowed number of statements, starting with highest is_in_project_count
      */
    /**
     * Pipe repo outgoing statements.
     * If max quantity is limited, takes only max allowed number of statements, starting with highest is_in_project_count
     * @param {?} pkProperty
     * @param {?} pkEntity
     * @return {?}
     */
    InformationBasicPipesService.prototype.pipeRepoOutgoingStatementsByProperty = /**
     * Pipe repo outgoing statements.
     * If max quantity is limited, takes only max allowed number of statements, starting with highest is_in_project_count
     * @param {?} pkProperty
     * @param {?} pkEntity
     * @return {?}
     */
    function (pkProperty, pkEntity) {
        var _this = this;
        return combineLatest(this.s.dfh$.property$.by_pk_property$.key(pkProperty)
            .pipe(filter((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return !!x && Object.keys(x).length > 0; })), map((/**
         * @param {?} p
         * @return {?}
         */
        function (p) { return values$1(p)[0].range_instances_max_quantifier; }))), this.s.inf$.statement$
            .by_subject_and_property$({
            fk_property: pkProperty,
            fk_subject_info: pkEntity
        }, false)
        // .pipe(filter(x => !!x))
        ).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = __read(_a, 2), m = _b[0], rs = _b[1];
            if (rs.length === 0)
                return rs;
            /** @type {?} */
            var r = _this.sortStatementsByRepoPopularity(rs);
            return (m === -1 || m === null) ? r : r.slice(0, m);
        })));
    };
    /**
    * Pipe repo ingoing statements.
    * If max quantity is limited, takes only max allowed number of statements, starting with highest is_in_project_count
    */
    /**
     * Pipe repo ingoing statements.
     * If max quantity is limited, takes only max allowed number of statements, starting with highest is_in_project_count
     * @param {?} pkProperty
     * @param {?} pkEntity
     * @return {?}
     */
    InformationBasicPipesService.prototype.pipeRepoIngoingStatementsByProperty = /**
     * Pipe repo ingoing statements.
     * If max quantity is limited, takes only max allowed number of statements, starting with highest is_in_project_count
     * @param {?} pkProperty
     * @param {?} pkEntity
     * @return {?}
     */
    function (pkProperty, pkEntity) {
        var _this = this;
        return combineLatest(this.s.dfh$.property$.by_pk_property$.key(pkProperty)
            .pipe(filter((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return !!x && Object.keys(x).length > 0; })), map((/**
         * @param {?} p
         * @return {?}
         */
        function (p) { return values$1(p)[0].domain_instances_max_quantifier; }))), this.s.inf$.statement$
            .by_object_and_property$({
            fk_property: pkProperty,
            fk_object_info: pkEntity
        }, false)
        // .pipe(filter(x => !!x))
        ).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = __read(_a, 2), m = _b[0], rs = _b[1];
            if (rs.length === 0)
                return rs;
            /** @type {?} */
            var r = _this.sortStatementsByRepoPopularity(rs);
            return (m === -1 || m === null) ? r : r.slice(0, m);
        })));
    };
    /*********************************************************************
     * Alternatives (Repo minus Project)
    *********************************************************************/
    /**
     * ******************************************************************
     * Alternatives (Repo minus Project)
     * *******************************************************************
     * @param {?} pkStatement
     * @param {?} isOutgoing
     * @return {?}
     */
    InformationBasicPipesService.prototype.pipeAlternativeBasicStatementItemByPkStatement = /**
     * ******************************************************************
     * Alternatives (Repo minus Project)
     * *******************************************************************
     * @param {?} pkStatement
     * @param {?} isOutgoing
     * @return {?}
     */
    function (pkStatement, isOutgoing) {
        return combineLatest(this.s.inf$.statement$.by_pk_entity_key$(pkStatement, false), this.s.inf$.statement$.by_pk_entity_key$(pkStatement))
            .pipe(filter((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = __read(_a, 1), inrepo = _b[0];
            return !!inrepo;
        })), map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = __read(_a, 2), inrepo = _b[0], inproject = _b[1];
            if (inproject) {
                return undefined;
            }
            else {
                /** @type {?} */
                var i = {
                    projRel: undefined,
                    statement: inrepo,
                    ordNum: undefined,
                    isOutgoing: isOutgoing,
                    label: ''
                };
                return i;
            }
        })));
    };
    /**
       * Pipe alternative ingoing statements (= statements not in active project)
       */
    /**
     * Pipe alternative ingoing statements (= statements not in active project)
     * @param {?} pkProperty
     * @param {?} pkEntity
     * @return {?}
     */
    InformationBasicPipesService.prototype.pipeAlternativeIngoingStatements = /**
     * Pipe alternative ingoing statements (= statements not in active project)
     * @param {?} pkProperty
     * @param {?} pkEntity
     * @return {?}
     */
    function (pkProperty, pkEntity) {
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
        function (inproject) { return inproject ? Object.keys(inproject) : []; })))).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = __read(_a, 2), inrepo = _b[0], inproject = _b[1];
            return omit(inproject, inrepo);
        })), map((/**
         * @param {?} statements
         * @return {?}
         */
        function (statements) { return values$1(statements); })));
    };
    /**
     * Pipe alternative outgoing statements (= statements not in active project)
     */
    /**
     * Pipe alternative outgoing statements (= statements not in active project)
     * @param {?} pkProperty
     * @param {?} pkEntity
     * @return {?}
     */
    InformationBasicPipesService.prototype.pipeAlternativeOutgoingStatements = /**
     * Pipe alternative outgoing statements (= statements not in active project)
     * @param {?} pkProperty
     * @param {?} pkEntity
     * @return {?}
     */
    function (pkProperty, pkEntity) {
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
        function (inproject) { return inproject ? Object.keys(inproject) : []; })))).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = __read(_a, 2), inrepo = _b[0], inproject = _b[1];
            return omit(inproject, inrepo);
        })), map((/**
         * @param {?} statements
         * @return {?}
         */
        function (statements) { return values$1(statements); })));
    };
    /**
     * get array of pks of persistent items of a specific class
     */
    /**
     * get array of pks of persistent items of a specific class
     * @param {?} pkClass
     * @return {?}
     */
    InformationBasicPipesService.prototype.pipePersistentItemPksByClass = /**
     * get array of pks of persistent items of a specific class
     * @param {?} pkClass
     * @return {?}
     */
    function (pkClass) {
        return this.s.inf$.persistent_item$.by_fk_class_key$(pkClass).pipe(map((/**
         * @param {?} ob
         * @return {?}
         */
        function (ob) {
            if (ob)
                return Object.keys(ob).map((/**
                 * @param {?} k
                 * @return {?}
                 */
                function (k) { return parseInt(k, 10); }));
            return [];
        })));
    };
    /**
     * gets the css classes for that entity
     * @param pkEntity
     */
    /**
     * gets the css classes for that entity
     * @param {?} pkEntity
     * @return {?}
     */
    InformationBasicPipesService.prototype.pipeIconType = /**
     * gets the css classes for that entity
     * @param {?} pkEntity
     * @return {?}
     */
    function (pkEntity) {
        return this.p.streamEntityPreview(pkEntity).pipe(map((/**
         * @param {?} preview
         * @return {?}
         */
        function (preview) {
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
    };
    /*********************************************************************
     * Helpers
     *********************************************************************/
    /**
     * ******************************************************************
     * Helpers
     * *******************************************************************
     * @param {?} statements
     * @return {?}
     */
    InformationBasicPipesService.prototype.sortStatementsByRepoPopularity = /**
     * ******************************************************************
     * Helpers
     * *******************************************************************
     * @param {?} statements
     * @return {?}
     */
    function (statements) {
        return statements.sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        function (a, b) { return a.is_in_project_count > b.is_in_project_count ? 1 : -1; }));
    };
    InformationBasicPipesService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    InformationBasicPipesService.ctorParameters = function () { return [
        { type: ActiveProjectPipesService },
        { type: SchemaSelectorsService }
    ]; };
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
    return InformationBasicPipesService;
}());
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
var InformationPipesService = /** @class */ (function () {
    function InformationPipesService(b, p, s, c, timePrimitivePipe, timeSpanPipe, ngRedux) {
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
    // @spyTag
    /**
     * ******************************************************************
     * Pipe the project entities
     * *******************************************************************
     * @param {?} l
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    InformationPipesService.prototype.pipeListLength = /**
     * ******************************************************************
     * Pipe the project entities
     * *******************************************************************
     * @param {?} l
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    function (l, pkEntity) {
        switch (l.listType) {
            case 'appellation':
            case 'entity-preview':
            case 'language':
            case 'place':
            case 'dimension':
            case 'langString':
            case 'temporal-entity':
                return this.pipeList(l, pkEntity).pipe(map((/**
                 * @param {?} items
                 * @return {?}
                 */
                function (items) { return items.length; })));
            case 'time-span':
                return combineLatest(this.b.pipeOutgoingStatementsByProperty(72, pkEntity), this.b.pipeOutgoingStatementsByProperty(71, pkEntity), this.b.pipeOutgoingStatementsByProperty(150, pkEntity), this.b.pipeOutgoingStatementsByProperty(151, pkEntity), this.b.pipeOutgoingStatementsByProperty(152, pkEntity), this.b.pipeOutgoingStatementsByProperty(153, pkEntity)).pipe(tap((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) {
                })), map((/**
                 * @param {?} items
                 * @return {?}
                 */
                function (items) { return items.filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) { return x.length > 0; })).length; })));
            // case 'text-property':
            //   return this.pipeListTextProperty(l, pkEntity).pipe(map(items => items.length))
            default:
                console.warn('unsupported listType');
                return new BehaviorSubject(0);
        }
    };
    // @spyTag
    // @spyTag
    /**
     * @param {?} l
     * @param {?} pkEntity
     * @param {?=} limit
     * @return {?}
     */
    InformationPipesService.prototype.pipeList = 
    // @spyTag
    /**
     * @param {?} l
     * @param {?} pkEntity
     * @param {?=} limit
     * @return {?}
     */
    function (l, pkEntity, limit) {
        if (l.listType.appellation)
            return this.pipeListAppellation(l, pkEntity, limit);
        else if (l.listType.entityPreview)
            return this.pipeListEntityPreview(l, pkEntity, limit);
        else if (l.listType.language)
            return this.pipeListLanguage(l, pkEntity, limit);
        else if (l.listType.place)
            return this.pipeListPlace(l, pkEntity, limit);
        else if (l.listType.dimension)
            return this.pipeListDimension(l, pkEntity, limit);
        else if (l.listType.langString)
            return this.pipeListLangString(l, pkEntity, limit);
        else if (l.listType.temporalEntity)
            return this.pipeListEntityPreview(l, pkEntity, limit);
        else if (l.listType.timeSpan) {
            return this.pipeItemTimeSpan(pkEntity).pipe(map((/**
             * @param {?} ts
             * @return {?}
             */
            function (ts) { return [ts].filter((/**
             * @param {?} i
             * @return {?}
             */
            function (i) { return i.properties.length > 0; })); })));
        }
        else
            console.warn('unsupported listType');
    };
    // @spyTag
    // @spyTag
    /**
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @param {?} pkProject
     * @return {?}
     */
    InformationPipesService.prototype.pipeListBasicStatementItems = 
    // @spyTag
    /**
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @param {?} pkProject
     * @return {?}
     */
    function (listDefinition, pkEntity, pkProject) {
        return (listDefinition.isOutgoing ?
            this.b.pipeOutgoingBasicStatementItemsByProperty(listDefinition.property.pkProperty, pkEntity, pkProject) :
            this.b.pipeIngoingBasicStatementItemsByProperty(listDefinition.property.pkProperty, pkEntity, pkProject));
    };
    /**
     * Pipe the items in appellation field
     */
    // @spyTag
    /**
     * Pipe the items in appellation field
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @param {?=} limit
     * @return {?}
     */
    // @spyTag
    InformationPipesService.prototype.pipeListAppellation = /**
     * Pipe the items in appellation field
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @param {?=} limit
     * @return {?}
     */
    // @spyTag
    function (listDefinition, pkEntity, limit) {
        var _this = this;
        return this.b.pipeStatementsOfList(listDefinition, pkEntity)
            .pipe(switchMap((/**
         * @param {?} statements
         * @return {?}
         */
        function (statements) {
            return combineLatest(statements.map((/**
             * @param {?} r
             * @param {?} i
             * @return {?}
             */
            function (r, i) { return _this.pipeItemAppellation(r); })))
                .pipe(map((/**
             * @param {?} nodes
             * @return {?}
             */
            function (nodes) { return nodes.filter((/**
             * @param {?} node
             * @return {?}
             */
            function (node) { return !!node && node.fkClass === listDefinition.targetClass; })); })), limitTo(limit), startWith([]));
        })));
    };
    /**
   * Pipe the items in entity preview field
   */
    // @spyTag
    /**
     * Pipe the items in entity preview field
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @param {?=} limit
     * @return {?}
     */
    // @spyTag
    InformationPipesService.prototype.pipeListEntityPreview = /**
     * Pipe the items in entity preview field
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @param {?=} limit
     * @return {?}
     */
    // @spyTag
    function (listDefinition, pkEntity, limit) {
        var _this = this;
        return this.b.pipeStatementsOfList(listDefinition, pkEntity)
            .pipe(tag("before-" + pkEntity + "-" + listDefinition.property.pkProperty + "-" + listDefinition.targetClass), switchMap((/**
         * @param {?} statements
         * @return {?}
         */
        function (statements) {
            return combineLatest(statements.map((/**
             * @param {?} r
             * @param {?} i
             * @return {?}
             */
            function (r, i) { return _this.pipeItemEntityPreview(r, listDefinition.isOutgoing); })))
                .pipe(map((/**
             * @param {?} nodes
             * @return {?}
             */
            function (nodes) { return nodes.filter((/**
             * @param {?} node
             * @return {?}
             */
            function (node) { return !!node && node.fkClass === listDefinition.targetClass; }))
                .sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            function (a, b) { return a.ordNum > b.ordNum ? 1 : -1; })); }), limitTo(limit)), startWith([]));
        })), tag("after-" + pkEntity + "-" + listDefinition.property.pkProperty + "-" + listDefinition.targetClass));
    };
    // @spyTag
    // @spyTag
    /**
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @param {?=} limit
     * @return {?}
     */
    InformationPipesService.prototype.pipeListLanguage = 
    // @spyTag
    /**
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @param {?=} limit
     * @return {?}
     */
    function (listDefinition, pkEntity, limit) {
        var _this = this;
        return this.b.pipeStatementsOfList(listDefinition, pkEntity)
            .pipe(switchMap((/**
         * @param {?} statements
         * @return {?}
         */
        function (statements) {
            return combineLatest(statements.map((/**
             * @param {?} r
             * @param {?} i
             * @return {?}
             */
            function (r, i) { return _this.pipeItemLanguage(r); })))
                .pipe(map((/**
             * @param {?} nodes
             * @return {?}
             */
            function (nodes) { return nodes.filter((/**
             * @param {?} node
             * @return {?}
             */
            function (node) { return !!node && node.fkClass === listDefinition.targetClass; })); })), limitTo(limit), startWith([]));
        })));
    };
    /**
     * Pipe the items in place list
     */
    // @spyTag
    /**
     * Pipe the items in place list
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @param {?=} limit
     * @return {?}
     */
    // @spyTag
    InformationPipesService.prototype.pipeListPlace = /**
     * Pipe the items in place list
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @param {?=} limit
     * @return {?}
     */
    // @spyTag
    function (listDefinition, pkEntity, limit) {
        var _this = this;
        return this.b.pipeStatementsOfList(listDefinition, pkEntity)
            .pipe(switchMap((/**
         * @param {?} statements
         * @return {?}
         */
        function (statements) {
            return combineLatest(statements.map((/**
             * @param {?} r
             * @param {?} i
             * @return {?}
             */
            function (r, i) { return _this.pipeItemPlace(r); })))
                .pipe(map((/**
             * @param {?} nodes
             * @return {?}
             */
            function (nodes) { return nodes.filter((/**
             * @param {?} node
             * @return {?}
             */
            function (node) { return !!node && node.fkClass === listDefinition.targetClass; })); })), limitTo(limit), startWith([]));
        })));
    };
    /**
     * Pipe the items in place list
     */
    // @spyTag
    /**
     * Pipe the items in place list
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @param {?=} limit
     * @return {?}
     */
    // @spyTag
    InformationPipesService.prototype.pipeListDimension = /**
     * Pipe the items in place list
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @param {?=} limit
     * @return {?}
     */
    // @spyTag
    function (listDefinition, pkEntity, limit) {
        var _this = this;
        return this.b.pipeStatementsOfList(listDefinition, pkEntity)
            .pipe(switchMap((/**
         * @param {?} statements
         * @return {?}
         */
        function (statements) {
            return combineLatest(statements.map((/**
             * @param {?} r
             * @param {?} i
             * @return {?}
             */
            function (r, i) { return _this.pipeItemDimension(r); })))
                .pipe(map((/**
             * @param {?} nodes
             * @return {?}
             */
            function (nodes) { return nodes.filter((/**
             * @param {?} node
             * @return {?}
             */
            function (node) { return !!node && node.fkClass === listDefinition.targetClass; })); })), limitTo(limit), startWith([]));
        })));
    };
    /**
   * Pipe the items in langString list
   */
    // @spyTag
    /**
     * Pipe the items in langString list
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @param {?=} limit
     * @return {?}
     */
    // @spyTag
    InformationPipesService.prototype.pipeListLangString = /**
     * Pipe the items in langString list
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @param {?=} limit
     * @return {?}
     */
    // @spyTag
    function (listDefinition, pkEntity, limit) {
        var _this = this;
        return this.b.pipeStatementsOfList(listDefinition, pkEntity)
            .pipe(switchMap((/**
         * @param {?} statements
         * @return {?}
         */
        function (statements) {
            return combineLatest(statements.map((/**
             * @param {?} r
             * @param {?} i
             * @return {?}
             */
            function (r, i) { return _this.pipeItemLangString(r); })))
                .pipe(map((/**
             * @param {?} nodes
             * @return {?}
             */
            function (nodes) { return nodes.filter((/**
             * @param {?} node
             * @return {?}
             */
            function (node) { return !!node && node.fkClass === listDefinition.targetClass; })); })), limitTo(limit), startWith([]));
        })));
    };
    /**
     * pipe the project relation of given statment, if the scope of this page is inProject
     * @param stmt InfStatement to be completed with projRel
     * @param page page for which we are piping this stuff
     */
    /**
     * pipe the project relation of given statment, if the scope of this page is inProject
     * @param {?} stmt InfStatement to be completed with projRel
     * @param {?} page page for which we are piping this stuff
     * @return {?}
     */
    InformationPipesService.prototype.pipeProjRelOfStatement = /**
     * pipe the project relation of given statment, if the scope of this page is inProject
     * @param {?} stmt InfStatement to be completed with projRel
     * @param {?} page page for which we are piping this stuff
     * @return {?}
     */
    function (stmt, page) {
        if (page.scope.inProject) {
            return this.s.pro$.info_proj_rel$.by_fk_project__fk_entity$
                .key(page.scope.inProject + '_' + stmt.pk_entity).pipe(map((/**
             * @param {?} projRel
             * @return {?}
             */
            function (projRel) { return ({
                projRel: projRel,
                ordNum: page.isOutgoing ? projRel.ord_num_of_range : projRel.ord_num_of_domain
            }); })));
        }
    };
    /**
     * pipe the target of given statment
     * @param stmt InfStatement to be completed with target
     * @param page page for which we are piping this stuff
     * @param subfieldType type of subfield for which we pipe this stuff
     */
    /**
     * pipe the target of given statment
     * @param {?} stmt InfStatement to be completed with target
     * @param {?} page page for which we are piping this stuff
     * @param {?} subfieldType type of subfield for which we pipe this stuff
     * @return {?}
     */
    InformationPipesService.prototype.pipeTargetOfStatement = /**
     * pipe the target of given statment
     * @param {?} stmt InfStatement to be completed with target
     * @param {?} page page for which we are piping this stuff
     * @param {?} subfieldType type of subfield for which we pipe this stuff
     * @return {?}
     */
    function (stmt, page, subfieldType) {
        var _this = this;
        /** @type {?} */
        var isOutgoing = page.isOutgoing;
        /** @type {?} */
        var targetInfo = isOutgoing ? stmt.fk_object_info : stmt.fk_subject_info;
        // here you could add targetData or targetCell
        if (subfieldType.appellation) {
            return this.s.inf$.appellation$.by_pk_entity$.key(targetInfo).pipe(map((/**
             * @param {?} appellation
             * @return {?}
             */
            function (appellation) {
                /** @type {?} */
                var stmtTarget = {
                    statement: stmt,
                    isOutgoing: isOutgoing,
                    targetLabel: appellation.string,
                    targetClass: page.targetClass,
                    target: {
                        appellation: appellation
                    }
                };
                return stmtTarget;
            })));
        }
        else if (subfieldType.place) {
            return this.s.inf$.place$.by_pk_entity$.key(targetInfo).pipe(map((/**
             * @param {?} place
             * @return {?}
             */
            function (place) {
                /** @type {?} */
                var stmtTarget = {
                    statement: stmt,
                    isOutgoing: isOutgoing,
                    targetLabel: "WGS84: " + place.lat + "\u00B0, " + place.long + "\u00B0",
                    targetClass: page.targetClass,
                    target: {
                        place: place
                    }
                };
                return stmtTarget;
            })));
        }
        else if (subfieldType.dimension) {
            return this.s.inf$.dimension$.by_pk_entity$.key(targetInfo).pipe(switchMap((/**
             * @param {?} dimension
             * @return {?}
             */
            function (dimension) {
                return _this.p.streamEntityPreview(dimension.fk_measurement_unit)
                    .pipe(map((/**
                 * @param {?} unitPreview
                 * @return {?}
                 */
                function (unitPreview) {
                    /** @type {?} */
                    var stmtTarget = {
                        statement: stmt,
                        isOutgoing: isOutgoing,
                        targetLabel: dimension.numeric_value + " " + unitPreview.entity_label,
                        targetClass: page.targetClass,
                        target: {
                            dimension: dimension
                        }
                    };
                    return stmtTarget;
                })));
            })));
        }
        else if (subfieldType.langString) {
            return this.s.inf$.lang_string$.by_pk_entity$.key(targetInfo).pipe(switchMap((/**
             * @param {?} langString
             * @return {?}
             */
            function (langString) {
                return _this.s.inf$.language$.by_pk_entity$.key(langString.fk_language)
                    .pipe(map((/**
                 * @param {?} language
                 * @return {?}
                 */
                function (language) {
                    /** @type {?} */
                    var stmtTarget = {
                        statement: stmt,
                        isOutgoing: isOutgoing,
                        targetLabel: langString.string + " (" + language.iso6391 + ")",
                        targetClass: page.targetClass,
                        target: {
                            langString: langString
                        }
                    };
                    return stmtTarget;
                })));
            })));
        }
        else if (subfieldType.language) {
            return this.s.inf$.language$.by_pk_entity$.key(targetInfo).pipe(map((/**
             * @param {?} language
             * @return {?}
             */
            function (language) {
                /** @type {?} */
                var stmtTarget = {
                    statement: stmt,
                    isOutgoing: isOutgoing,
                    targetLabel: "" + (language.notes || language.iso6391),
                    targetClass: page.targetClass,
                    target: {
                        language: language
                    }
                };
                return stmtTarget;
            })));
        }
        else if (subfieldType.entityPreview) {
            return this.p.streamEntityPreview(targetInfo).pipe(map((/**
             * @param {?} entityPreview
             * @return {?}
             */
            function (entityPreview) {
                /** @type {?} */
                var stmtTarget = {
                    statement: stmt,
                    isOutgoing: isOutgoing,
                    targetLabel: "" + entityPreview.entity_label,
                    targetClass: page.targetClass,
                    target: {
                        entityPreview: entityPreview
                    }
                };
                return stmtTarget;
            })));
        }
        else if (subfieldType.temporalEntity) {
            // console.log('subfieldType.temporalEntity.length', subfieldType.temporalEntity.length)
            // for each of these subfields
            /** @type {?} */
            var subentityPages$ = subfieldType.temporalEntity.map((/**
             * @param {?} subfieldReq
             * @return {?}
             */
            function (subfieldReq) {
                // console.log('subentity subfield for targetInfo', targetInfo)
                // console.log('subentity subfield for targetInfo', targetInfo)
                // create page:GvSubfieldPage
                var _a = subfieldReq.page, isCircular = _a.isCircular, p = __rest(_a, ["isCircular"]);
                /** @type {?} */
                var nestedPage = __assign({}, p, { fkSourceEntity: targetInfo, scope: page.scope });
                return _this.pipeSubfieldPage(nestedPage, subfieldReq.subfieldType).pipe(map((/**
                 * @param {?} __0
                 * @return {?}
                 */
                function (_a) {
                    var count = _a.count, statements = _a.statements;
                    var limit = nestedPage.limit, offset = nestedPage.offset, s = __rest(nestedPage, ["limit", "offset"]);
                    /** @type {?} */
                    var subentitySubfieldPage = {
                        subfield: s,
                        count: count,
                        statements: statements
                    };
                    return subentitySubfieldPage;
                })));
            }));
            return combineLatestOrEmpty(subentityPages$)
                .pipe(map((/**
             * @param {?} subfields
             * @return {?}
             */
            function (subfields) {
                /** @type {?} */
                var stmtTarget = {
                    statement: stmt,
                    isOutgoing: isOutgoing,
                    targetLabel: '',
                    targetClass: page.targetClass,
                    target: {
                        entity: {
                            pkEntity: targetInfo,
                            subfields: subfields
                        }
                    }
                };
                return stmtTarget;
            })));
        }
        else if (subfieldType.timeSpan) {
            // console.log('subfieldType.temporalEntity.length', subfieldType.temporalEntity.length)
            // for each of these subfields
            /** @type {?} */
            var subentityPages$ = DfhConfig.PROPERTY_PKS_WHERE_TIME_PRIMITIVE_IS_RANGE
                .map((/**
             * @param {?} fkProperty
             * @return {?}
             */
            function (fkProperty) {
                // console.log('subentity subfield for targetInfo', targetInfo)
                // console.log('subentity subfield for targetInfo', targetInfo)
                // create page:GvSubfieldPage
                /** @type {?} */
                var nestedPage = {
                    fkProperty: fkProperty,
                    isOutgoing: true,
                    limit: 1,
                    offset: 0,
                    targetClass: DfhConfig.CLASS_PK_TIME_PRIMITIVE,
                    fkSourceEntity: targetInfo,
                    scope: page.scope,
                };
                /** @type {?} */
                var subfType = {
                    timePrimitive: 'true'
                };
                return _this.pipeSubfieldPage(nestedPage, subfType).pipe(map((/**
                 * @param {?} __0
                 * @return {?}
                 */
                function (_a) {
                    var count = _a.count, statements = _a.statements;
                    var limit = nestedPage.limit, offset = nestedPage.offset, s = __rest(nestedPage, ["limit", "offset"]);
                    /** @type {?} */
                    var subentitySubfieldPage = {
                        subfield: s,
                        count: count,
                        statements: statements
                    };
                    return subentitySubfieldPage;
                })));
            }));
            return combineLatestOrEmpty(subentityPages$)
                .pipe(map((/**
             * @param {?} subfields
             * @return {?}
             */
            function (subfields) {
                /** @type {?} */
                var timeSpanPreview = {};
                subfields.forEach((/**
                 * @param {?} s
                 * @return {?}
                 */
                function (s) {
                    if (s.statements[0]) {
                        /** @type {?} */
                        var st = s.statements[0];
                        /** @type {?} */
                        var key = DfhConfig.PROPERTY_PK_TO_EXISTENCE_TIME_KEY[st.statement.fk_property];
                        timeSpanPreview[key] = st.target.timePrimitive;
                    }
                }));
                /** @type {?} */
                var stmtTarget = {
                    statement: stmt,
                    isOutgoing: isOutgoing,
                    targetLabel: _this.timeSpanPipe.transform(new TimeSpanUtil(timeSpanPreview)),
                    targetClass: page.targetClass,
                    target: {
                        timeSpan: {
                            preview: timeSpanPreview,
                            subfields: subfields
                        }
                    }
                };
                return stmtTarget;
            })));
        }
        else if (subfieldType.timePrimitive) {
            return this.s.inf$.time_primitive$.by_pk_entity$.key(targetInfo).pipe(switchMap((/**
             * @param {?} timePrimitive
             * @return {?}
             */
            function (timePrimitive) {
                // get calendar
                /** @type {?} */
                var cal$;
                if (page.scope.inProject) {
                    cal$ = _this.s.pro$.info_proj_rel$.by_fk_project__fk_entity$.key(page.scope.inProject + '_' + stmt.pk_entity)
                        .pipe(map((/**
                     * @param {?} infoProjRel
                     * @return {?}
                     */
                    function (infoProjRel) { return (/** @type {?} */ (infoProjRel.calendar)); })));
                }
                else {
                    cal$ = new BehaviorSubject((/** @type {?} */ (stmt.community_favorite_calendar)));
                }
                // pipe target time primitive of stmt
                return cal$.pipe(map((/**
                 * @param {?} cal
                 * @return {?}
                 */
                function (cal) {
                    /** @type {?} */
                    var timePrimWithCal = infTimePrimToTimePrimWithCal(timePrimitive, cal);
                    /** @type {?} */
                    var stmtTarget = {
                        statement: stmt,
                        isOutgoing: isOutgoing,
                        targetLabel: _this.timePrimitivePipe.transform(timePrimWithCal),
                        targetClass: page.targetClass,
                        target: {
                            timePrimitive: timePrimWithCal
                        }
                    };
                    return stmtTarget;
                })));
            })));
        }
        throw new Error("No implementation found for subfieldType " + JSON.stringify(subfieldType));
    };
    /**
     * pipe target and projRel of the given statement
     */
    /**
     * pipe target and projRel of the given statement
     * @param {?} stmt
     * @param {?} page
     * @param {?} subfieldType
     * @return {?}
     */
    InformationPipesService.prototype.pipeStatementWithTarget = /**
     * pipe target and projRel of the given statement
     * @param {?} stmt
     * @param {?} page
     * @param {?} subfieldType
     * @return {?}
     */
    function (stmt, page, subfieldType) {
        return combineLatest(this.pipeTargetOfStatement(stmt, page, subfieldType), this.pipeProjRelOfStatement(stmt, page)).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = __read(_a, 2), target = _b[0], projRel = _b[1];
            return (__assign({}, target, projRel));
        })));
    };
    /**
     * @param {?} page
     * @param {?} subfieldType
     * @return {?}
     */
    InformationPipesService.prototype.pipeSubfieldPage = /**
     * @param {?} page
     * @param {?} subfieldType
     * @return {?}
     */
    function (page, subfieldType) {
        var _this = this;
        if (subfieldType.timeSpan) {
            // if timeSpan make a short cut: produce a virtual statementWithTarget from entity to timeSpan
            return this.pipeTimeSpan(page, subfieldType);
        }
        else {
            // get the statments of that page
            return combineLatest(this.s.inf$.statement$.pagination$.pipeCount(page), this.s.inf$.statement$.pagination$.pipePage(page)
                .pipe(switchMap((/**
             * @param {?} pkStmts
             * @return {?}
             */
            function (pkStmts) { return combineLatestOrEmpty(pkStmts.map((/**
             * @param {?} pkStmt
             * @return {?}
             */
            function (pkStmt) { return _this.s.inf$.statement$.by_pk_entity$.key(pkStmt)
                // for each statement, depending on the subfieldType, load the corresponding target
                .pipe(filter((/**
             * @param {?} stmt
             * @return {?}
             */
            function (stmt) { return !!stmt; })), switchMap((/**
             * @param {?} stmt
             * @return {?}
             */
            function (stmt) { return _this.pipeStatementWithTarget(stmt, page, subfieldType); }))); }))); })))).pipe(map((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var _b = __read(_a, 2), count = _b[0], statements = _b[1];
                return ({ count: count, statements: statements });
            })));
        }
    };
    /**
     * @private
     * @param {?} page
     * @param {?} subfieldType
     * @return {?}
     */
    InformationPipesService.prototype.pipeTimeSpan = /**
     * @private
     * @param {?} page
     * @param {?} subfieldType
     * @return {?}
     */
    function (page, subfieldType) {
        /** @type {?} */
        var virtualStatementToTimeSpan = { fk_object_info: page.fkSourceEntity };
        return this.pipeTargetOfStatement(virtualStatementToTimeSpan, page, subfieldType).pipe(map((/**
         * @param {?} stmtTarget
         * @return {?}
         */
        function (stmtTarget) {
            /** @type {?} */
            var stmtWT = __assign({}, stmtTarget, { projRel: undefined, ordNum: undefined });
            return { count: 1, statements: [stmtWT] };
        })));
    };
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
    /**
     * Pipe the temporal entities connected to given entity by statements that are in the current project
     */
    // @spyTag
    // pipeTemporalEntityTableRows(
    //   paginateBy: PaginateByParam[],
    //   limit: number,
    //   offset: number,
    //   pkProject: number,
    //   listDefinition: Subfield,
    //   fieldDefinitions: Field[],
    //   alternative = false): Observable<TemporalEntityItem[]> {
    //   // const propertyItemType = this.propertyItemType(fieldDefinitions)
    //   const targetEntityOfStatementItem = (r: BasicStatementItem) => r.isOutgoing ? r.statement.fk_object_info : r.statement.fk_subject_info;
    //   // prepare page loader
    //   const pageLoader$ = alternative ? this.infRepo.statement$.pagination$ : this.s.inf$.statement$.pagination$;
    //   // prepare basic statement item loader
    //   const basicStatementItemLoader = (pkStatement, isOutgoing, pkProj) => {
    //     return alternative ?
    //       this.b.pipeAlternativeBasicStatementItemByPkStatement(pkStatement, isOutgoing) :
    //       this.b.pipeBasicStatementItemByPkStatement(pkProj, pkStatement, isOutgoing)
    //   }
    //   // prepare TeEnRow loader
    //   const rowLoader = (targetEntityPk, fieldDef, pkProj) => {
    //     return alternative ?
    //       this.pipeItemTeEnRow(targetEntityPk, fieldDef, null, true) :
    //       this.pipeItemTeEnRow(targetEntityPk, fieldDef, pkProj, false)
    //   }
    //   const paginatedStatementPks$ = pageLoader$.pipePage(paginateBy, limit, offset)
    //   const rows$ = paginatedStatementPks$.pipe(
    //     switchMap((paginatedStatementPks) => combineLatestOrEmpty(
    //       paginatedStatementPks.map(pkStatement => basicStatementItemLoader(pkStatement, listDefinition.isOutgoing, pkProject)
    //         .pipe(filter(x => !!x))
    //       )
    //     )
    //       .pipe(
    //         switchMap((teEnStatement) => combineLatestOrEmpty(
    //           teEnStatement.map((basicStatementItem) => {
    //             const pkTeEn = targetEntityOfStatementItem(basicStatementItem);
    //             return combineLatest(
    //               rowLoader(
    //                 pkTeEn,
    //                 fieldDefinitions,
    //                 // propertyItemType,
    //                 pkProject
    //               ),
    //               this.s.pro$.info_proj_rel$.by_fk_project__fk_entity$.key(pkProject + '_' + pkTeEn)
    //             ).pipe(
    //               map(([row, teEnProjRel]) => {
    //                 const item: TemporalEntityItem = {
    //                   ...basicStatementItem,
    //                   row,
    //                   pkEntity: pkTeEn,
    //                   teEnProjRel
    //                 };
    //                 return item
    //               })
    //             )
    //           })
    //         )),
    //       )),
    //   )
    //   return rows$
    // }
    // @spyTag
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
    /**
     * Pipe the temporal entities connected to given entity by statements that are in the current project
     * @param {?} pkEntity
     * @param {?} fieldDefinitions
     * @param {?} pkProject
     * @param {?} repo
     * @return {?}
     */
    // @spyTag
    // pipeTemporalEntityTableRows(
    //   paginateBy: PaginateByParam[],
    //   limit: number,
    //   offset: number,
    //   pkProject: number,
    //   listDefinition: Subfield,
    //   fieldDefinitions: Field[],
    //   alternative = false): Observable<TemporalEntityItem[]> {
    //   // const propertyItemType = this.propertyItemType(fieldDefinitions)
    //   const targetEntityOfStatementItem = (r: BasicStatementItem) => r.isOutgoing ? r.statement.fk_object_info : r.statement.fk_subject_info;
    //   // prepare page loader
    //   const pageLoader$ = alternative ? this.infRepo.statement$.pagination$ : this.s.inf$.statement$.pagination$;
    //   // prepare basic statement item loader
    //   const basicStatementItemLoader = (pkStatement, isOutgoing, pkProj) => {
    //     return alternative ?
    //       this.b.pipeAlternativeBasicStatementItemByPkStatement(pkStatement, isOutgoing) :
    //       this.b.pipeBasicStatementItemByPkStatement(pkProj, pkStatement, isOutgoing)
    //   }
    //   // prepare TeEnRow loader
    //   const rowLoader = (targetEntityPk, fieldDef, pkProj) => {
    //     return alternative ?
    //       this.pipeItemTeEnRow(targetEntityPk, fieldDef, null, true) :
    //       this.pipeItemTeEnRow(targetEntityPk, fieldDef, pkProj, false)
    //   }
    //   const paginatedStatementPks$ = pageLoader$.pipePage(paginateBy, limit, offset)
    //   const rows$ = paginatedStatementPks$.pipe(
    //     switchMap((paginatedStatementPks) => combineLatestOrEmpty(
    //       paginatedStatementPks.map(pkStatement => basicStatementItemLoader(pkStatement, listDefinition.isOutgoing, pkProject)
    //         .pipe(filter(x => !!x))
    //       )
    //     )
    //       .pipe(
    //         switchMap((teEnStatement) => combineLatestOrEmpty(
    //           teEnStatement.map((basicStatementItem) => {
    //             const pkTeEn = targetEntityOfStatementItem(basicStatementItem);
    //             return combineLatest(
    //               rowLoader(
    //                 pkTeEn,
    //                 fieldDefinitions,
    //                 // propertyItemType,
    //                 pkProject
    //               ),
    //               this.s.pro$.info_proj_rel$.by_fk_project__fk_entity$.key(pkProject + '_' + pkTeEn)
    //             ).pipe(
    //               map(([row, teEnProjRel]) => {
    //                 const item: TemporalEntityItem = {
    //                   ...basicStatementItem,
    //                   row,
    //                   pkEntity: pkTeEn,
    //                   teEnProjRel
    //                 };
    //                 return item
    //               })
    //             )
    //           })
    //         )),
    //       )),
    //   )
    //   return rows$
    // }
    // @spyTag
    InformationPipesService.prototype.pipeItemTeEnRow = 
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
    /**
     * Pipe the temporal entities connected to given entity by statements that are in the current project
     * @param {?} pkEntity
     * @param {?} fieldDefinitions
     * @param {?} pkProject
     * @param {?} repo
     * @return {?}
     */
    // @spyTag
    // pipeTemporalEntityTableRows(
    //   paginateBy: PaginateByParam[],
    //   limit: number,
    //   offset: number,
    //   pkProject: number,
    //   listDefinition: Subfield,
    //   fieldDefinitions: Field[],
    //   alternative = false): Observable<TemporalEntityItem[]> {
    //   // const propertyItemType = this.propertyItemType(fieldDefinitions)
    //   const targetEntityOfStatementItem = (r: BasicStatementItem) => r.isOutgoing ? r.statement.fk_object_info : r.statement.fk_subject_info;
    //   // prepare page loader
    //   const pageLoader$ = alternative ? this.infRepo.statement$.pagination$ : this.s.inf$.statement$.pagination$;
    //   // prepare basic statement item loader
    //   const basicStatementItemLoader = (pkStatement, isOutgoing, pkProj) => {
    //     return alternative ?
    //       this.b.pipeAlternativeBasicStatementItemByPkStatement(pkStatement, isOutgoing) :
    //       this.b.pipeBasicStatementItemByPkStatement(pkProj, pkStatement, isOutgoing)
    //   }
    //   // prepare TeEnRow loader
    //   const rowLoader = (targetEntityPk, fieldDef, pkProj) => {
    //     return alternative ?
    //       this.pipeItemTeEnRow(targetEntityPk, fieldDef, null, true) :
    //       this.pipeItemTeEnRow(targetEntityPk, fieldDef, pkProj, false)
    //   }
    //   const paginatedStatementPks$ = pageLoader$.pipePage(paginateBy, limit, offset)
    //   const rows$ = paginatedStatementPks$.pipe(
    //     switchMap((paginatedStatementPks) => combineLatestOrEmpty(
    //       paginatedStatementPks.map(pkStatement => basicStatementItemLoader(pkStatement, listDefinition.isOutgoing, pkProject)
    //         .pipe(filter(x => !!x))
    //       )
    //     )
    //       .pipe(
    //         switchMap((teEnStatement) => combineLatestOrEmpty(
    //           teEnStatement.map((basicStatementItem) => {
    //             const pkTeEn = targetEntityOfStatementItem(basicStatementItem);
    //             return combineLatest(
    //               rowLoader(
    //                 pkTeEn,
    //                 fieldDefinitions,
    //                 // propertyItemType,
    //                 pkProject
    //               ),
    //               this.s.pro$.info_proj_rel$.by_fk_project__fk_entity$.key(pkProject + '_' + pkTeEn)
    //             ).pipe(
    //               map(([row, teEnProjRel]) => {
    //                 const item: TemporalEntityItem = {
    //                   ...basicStatementItem,
    //                   row,
    //                   pkEntity: pkTeEn,
    //                   teEnProjRel
    //                 };
    //                 return item
    //               })
    //             )
    //           })
    //         )),
    //       )),
    //   )
    //   return rows$
    // }
    // @spyTag
    function (pkEntity, fieldDefinitions, pkProject, repo) {
        var _this = this;
        // pipe outgoing statements
        /** @type {?} */
        var outgoingStatements$ = repo ? this.b.pipeRepoOutgoingStatements(pkEntity) : this.b.pipeOutgoingStatements(pkEntity);
        // pipe ingoing statements
        /** @type {?} */
        var ingoingStatements$ = repo ? this.b.pipeRepoIngoingStatements(pkEntity) : this.b.pipeIngoingStatements(pkEntity);
        // pipe all statements with information leaf items
        /** @type {?} */
        var outgoingItems$ = outgoingStatements$.pipe(switchMap((/**
         * @param {?} statements
         * @return {?}
         */
        function (statements) { return combineLatestOrEmpty(statements
            .filter((/**
         * @param {?} statement
         * @return {?}
         */
        function (statement) { return !!statement.fk_object_info; })) // remove statements not pointing to information
            .map((/**
         * @param {?} s
         * @return {?}
         */
        function (s) {
            /** @type {?} */
            var isOutgoing = true;
            return _this.pipeItem(s, pkProject, isOutgoing);
        }))); })));
        /** @type {?} */
        var ingoingItems$ = ingoingStatements$.pipe(switchMap((/**
         * @param {?} statements
         * @return {?}
         */
        function (statements) { return combineLatestOrEmpty(statements
            .filter((/**
         * @param {?} statement
         * @return {?}
         */
        function (statement) { return !!statement.fk_subject_info; })) // remove statements not pointing to information
            .map((/**
         * @param {?} s
         * @return {?}
         */
        function (s) {
            /** @type {?} */
            var isOutgoing = false;
            return _this.pipeItem(s, pkProject, isOutgoing);
        }))); })));
        /** @type {?} */
        var sortItems = repo ?
            (/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item.sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            function (a, b) { return a.statement.is_in_project_count > b.statement.is_in_project_count ? 1 : -1; })); }) :
            (/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item; });
        return combineLatest(outgoingItems$, ingoingItems$).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = __read(_a, 2), outgoingItems = _b[0], ingoingItems = _b[1];
            /** @type {?} */
            var groupedOut = groupBy((/**
             * @param {?} i
             * @return {?}
             */
            function (i) { return (i && i.statement ? i.statement.fk_property.toString() : undefined); }), outgoingItems);
            /** @type {?} */
            var groupedIn = groupBy((/**
             * @param {?} i
             * @return {?}
             */
            function (i) { return (i && i.statement ? i.statement.fk_property.toString() : undefined); }), ingoingItems);
            return { groupedOut: groupedOut, groupedIn: groupedIn };
        })), 
        // auditTime(10),
        map((/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            /** @type {?} */
            var row = {};
            fieldDefinitions.forEach((/**
             * @param {?} fieldDefinition
             * @return {?}
             */
            function (fieldDefinition) {
                /** @type {?} */
                var cell;
                fieldDefinition.listDefinitions.forEach((/**
                 * @param {?} listDefinition
                 * @return {?}
                 */
                function (listDefinition) {
                    if (listDefinition.listType.timeSpan) {
                        /** @type {?} */
                        var t_1 = pick(['71', '72', '150', '151', '152', '153'], d.groupedOut);
                        /** @type {?} */
                        var keys = Object.keys(t_1);
                        /** @type {?} */
                        var itemsCount = keys.length;
                        /** @type {?} */
                        var label = void 0;
                        if (itemsCount > 0) {
                            /** @type {?} */
                            var timeSpanKeys_1 = {};
                            keys.forEach((/**
                             * @param {?} key
                             * @return {?}
                             */
                            function (key) { timeSpanKeys_1[key] = t_1[key][0].timePrimitive; }));
                            /** @type {?} */
                            var timeSpan = TimeSpanUtil.fromTimeSpanDialogData(timeSpanKeys_1);
                            label = _this.timeSpanPipe.transform(timeSpan);
                        }
                        cell = {
                            isOutgoing: listDefinition.isOutgoing,
                            itemsCount: itemsCount,
                            label: label,
                            entityPreview: undefined,
                            pkProperty: undefined,
                            isTimeSpan: true
                        };
                    }
                    else {
                        if (listDefinition.isOutgoing) {
                            if (d.groupedOut[listDefinition.property.pkProperty]) {
                                /** @type {?} */
                                var items = sortItems(d.groupedOut[listDefinition.property.pkProperty]);
                                /** @type {?} */
                                var firstItem = items[0];
                                cell = {
                                    isOutgoing: listDefinition.isOutgoing,
                                    itemsCount: items.length,
                                    entityPreview: ((/** @type {?} */ ((firstItem || {})))).preview,
                                    label: firstItem.label,
                                    pkProperty: listDefinition.property.pkProperty,
                                    firstItem: firstItem,
                                    items: items
                                };
                            }
                        }
                        else {
                            if (d.groupedIn[listDefinition.property.pkProperty]) {
                                /** @type {?} */
                                var items = sortItems(d.groupedIn[listDefinition.property.pkProperty]);
                                /** @type {?} */
                                var firstItem = items[0];
                                cell = {
                                    isOutgoing: listDefinition.isOutgoing,
                                    itemsCount: items.length,
                                    entityPreview: ((/** @type {?} */ ((firstItem || {})))).preview,
                                    label: firstItem.label,
                                    pkProperty: listDefinition.property.pkProperty,
                                    firstItem: firstItem,
                                    items: items
                                };
                            }
                        }
                    }
                }));
                row[fieldDefinition.label] = cell;
            }));
            return row;
        })));
    };
    // @spyTag
    // @spyTag
    /**
     * @private
     * @param {?} r
     * @param {?} pkProject
     * @param {?} propIsOutgoing
     * @return {?}
     */
    InformationPipesService.prototype.pipeItem = 
    // @spyTag
    /**
     * @private
     * @param {?} r
     * @param {?} pkProject
     * @param {?} propIsOutgoing
     * @return {?}
     */
    function (r, pkProject, propIsOutgoing) {
        var _this = this;
        /** @type {?} */
        var targetEntity = propIsOutgoing ? r.fk_object_info : r.fk_subject_info;
        return this.s.inf$.getModelOfEntity$(targetEntity).pipe(switchMap((/**
         * @param {?} m
         * @return {?}
         */
        function (m) {
            /** @type {?} */
            var modelName = m ? m.modelName : undefined;
            switch (modelName) {
                case 'appellation':
                    return _this.pipeItemAppellation(r);
                case 'language':
                    return _this.pipeItemLanguage(r);
                case 'place':
                    return _this.pipeItemPlace(r);
                case 'dimension':
                    return _this.pipeItemDimension(r);
                case 'lang_string':
                    return _this.pipeItemLangString(r);
                case 'time_primitive':
                    return _this.pipeItemTimePrimitive(r, pkProject); // TODO: emits twice
                default:
                    return _this.pipeItemEntityPreview(r, propIsOutgoing);
            }
        })));
    };
    // @spyTag
    // @spyTag
    /**
     * @param {?} listDef
     * @param {?} fkEntity
     * @param {?=} limit
     * @return {?}
     */
    InformationPipesService.prototype.pipeEntityProperties = 
    // @spyTag
    /**
     * @param {?} listDef
     * @param {?} fkEntity
     * @param {?=} limit
     * @return {?}
     */
    function (listDef, fkEntity, limit) {
        var _this = this;
        if (listDef.listType.appellation) {
            return this.pipeListAppellation(listDef, fkEntity, limit)
                .pipe(map((/**
             * @param {?} items
             * @return {?}
             */
            function (items) { return _this.getEntityProperties(listDef, items); })));
        }
        else if (listDef.listType.language) {
            return this.pipeListLanguage(listDef, fkEntity, limit)
                .pipe(map((/**
             * @param {?} items
             * @return {?}
             */
            function (items) { return _this.getEntityProperties(listDef, items); })));
        }
        else if (listDef.listType.place) {
            return this.pipeListPlace(listDef, fkEntity, limit)
                .pipe(map((/**
             * @param {?} items
             * @return {?}
             */
            function (items) { return _this.getEntityProperties(listDef, items); })));
        }
        else if (listDef.listType.dimension) {
            return this.pipeListDimension(listDef, fkEntity, limit)
                .pipe(map((/**
             * @param {?} items
             * @return {?}
             */
            function (items) { return _this.getEntityProperties(listDef, items); })));
        }
        else if (listDef.listType.langString) {
            return this.pipeListLangString(listDef, fkEntity, limit)
                .pipe(map((/**
             * @param {?} items
             * @return {?}
             */
            function (items) { return _this.getEntityProperties(listDef, items); })));
        }
        else if (listDef.listType.entityPreview || listDef.listType.temporalEntity) {
            return this.pipeListEntityPreview(listDef, fkEntity, limit)
                .pipe(map((/**
             * @param {?} items
             * @return {?}
             */
            function (items) { return _this.getEntityProperties(listDef, items); })));
        }
        else if (listDef.listType.timeSpan) {
            return this.pipeItemTimeSpan(fkEntity)
                .pipe(map((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                /** @type {?} */
                var items = item.properties.find((/**
                 * @param {?} p
                 * @return {?}
                 */
                function (p) { return p.items.length > 0; })) ? [{
                        label: _this.timeSpanPipe.transform(timeSpanItemToTimeSpan(item)),
                        properties: [] // TODO check if the properties or the item are really not needed
                    }] : [];
                return {
                    listDefinition: listDef,
                    items: items
                };
            })));
        }
        else
            return of(null);
    };
    // @spyTag
    // @spyTag
    /**
     * @param {?} pkEntity
     * @return {?}
     */
    InformationPipesService.prototype.pipeTemporalEntityRemoveProperties = 
    // @spyTag
    /**
     * @param {?} pkEntity
     * @return {?}
     */
    function (pkEntity) {
        return combineLatest(this.s.inf$.temporal_entity$.by_pk_entity_key$(pkEntity), this.s.inf$.statement$.by_subject$({ fk_subject_info: pkEntity }), this.s.inf$.text_property$.by_fk_concerned_entity_indexed$(pkEntity)).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = __read(_a, 3), temporalEntity = _b[0], statements = _b[1], textProperties = _b[2];
            /** @type {?} */
            var res = {
                temporalEntity: temporalEntity,
                statements: statements,
                textProperties: values$1(textProperties)
            };
            return res;
        })));
    };
    /**
     * @param {?} listDefinition
     * @param {?} items
     * @return {?}
     */
    InformationPipesService.prototype.getEntityProperties = /**
     * @param {?} listDefinition
     * @param {?} items
     * @return {?}
     */
    function (listDefinition, items) {
        return {
            listDefinition: listDefinition,
            items: items,
        };
    };
    /**
     * Pipe time span item in version of project
     */
    // @spyTag
    /**
     * Pipe time span item in version of project
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    InformationPipesService.prototype.pipeItemTimeSpan = /**
     * Pipe time span item in version of project
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    function (pkEntity) {
        var _this = this;
        return this.p.pkProject$.pipe(switchMap((/**
         * @param {?} pkProject
         * @return {?}
         */
        function (pkProject) {
            return _this.c.pipeSpecificFieldOfClass(DfhConfig.ClASS_PK_TIME_SPAN).pipe(switchMap((/**
             * @param {?} fieldDefs
             * @return {?}
             */
            function (fieldDefs) {
                return combineLatest(fieldDefs.map((/**
                 * @param {?} fieldDef
                 * @return {?}
                 */
                function (fieldDef) { return _this.s.inf$.statement$.by_subject_and_property$({
                    fk_property: fieldDef.property.pkProperty,
                    fk_subject_info: pkEntity
                })
                    .pipe(switchMapOr([], (/**
                 * @param {?} statements
                 * @return {?}
                 */
                function (statements) { return combineLatest(statements.map((/**
                 * @param {?} statement
                 * @return {?}
                 */
                function (statement) { return combineLatest(_this.s.inf$.time_primitive$.by_pk_entity$.key(statement.fk_object_info).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) { return !!x; }))), _this.s.pro$.info_proj_rel$.by_fk_project__fk_entity$.key(pkProject + '_' + statement.pk_entity)).pipe(map((/**
                 * @param {?} __0
                 * @return {?}
                 */
                function (_a) {
                    var _b = __read(_a, 2), infTimePrimitive = _b[0], projRel = _b[1];
                    /** @type {?} */
                    var timePrimitive = new TimePrimitive({
                        julianDay: infTimePrimitive.julian_day,
                        calendar: ((/** @type {?} */ ((projRel.calendar || 'gregorian')))),
                        duration: ((/** @type {?} */ (infTimePrimitive.duration)))
                    });
                    /** @type {?} */
                    var item = {
                        statement: statement,
                        ordNum: undefined,
                        projRel: projRel,
                        timePrimitive: timePrimitive,
                        label: _this.timePrimitivePipe.transform(timePrimitive),
                        fkClass: infTimePrimitive.fk_class
                    };
                    return item;
                }))); }))); })), map((/**
                 * @param {?} items
                 * @return {?}
                 */
                function (items) {
                    /** @type {?} */
                    var res = {
                        listDefinition: fieldDef.listDefinitions[0], items: items
                    };
                    return res;
                }))); }))).pipe(map((/**
                 * @param {?} properties
                 * @return {?}
                 */
                function (properties) {
                    /** @type {?} */
                    var props = properties.filter((/**
                     * @param {?} p
                     * @return {?}
                     */
                    function (p) { return p.items.length > 0; }));
                    /** @type {?} */
                    var timespanitem = {
                        label: '',
                        properties: props
                    };
                    return timespanitem;
                })));
            })));
        })));
    };
    // @spyTag
    // @spyTag
    /**
     * @param {?} statement
     * @return {?}
     */
    InformationPipesService.prototype.pipeItemAppellation = 
    // @spyTag
    /**
     * @param {?} statement
     * @return {?}
     */
    function (statement) {
        return this.s.inf$.appellation$.by_pk_entity$.key(statement.fk_object_info).pipe(filter((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return !!x; })), map((/**
         * @param {?} appellation
         * @return {?}
         */
        function (appellation) {
            if (!appellation)
                return null;
            /** @type {?} */
            var node = {
                ordNum: undefined,
                projRel: undefined,
                statement: statement,
                label: appellation.string,
                fkClass: appellation.fk_class
            };
            return node;
        })));
    };
    // @spyTag
    // @spyTag
    /**
     * @param {?} statement
     * @return {?}
     */
    InformationPipesService.prototype.pipeItemLanguage = 
    // @spyTag
    /**
     * @param {?} statement
     * @return {?}
     */
    function (statement) {
        return this.s.inf$.language$.by_pk_entity$.key(statement.fk_object_info).pipe(filter((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return !!x; })), map((/**
         * @param {?} language
         * @return {?}
         */
        function (language) {
            if (!language)
                return null;
            /** @type {?} */
            var node = {
                ordNum: undefined,
                projRel: undefined,
                statement: statement,
                label: language.notes,
                fkClass: language.fk_class
            };
            return node;
        })));
    };
    // @spyTag
    // @spyTag
    /**
     * @param {?} statement
     * @return {?}
     */
    InformationPipesService.prototype.pipeItemPlace = 
    // @spyTag
    /**
     * @param {?} statement
     * @return {?}
     */
    function (statement) {
        return this.s.inf$.place$.by_pk_entity$.key(statement.fk_object_info).pipe(filter((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return !!x; })), map((/**
         * @param {?} place
         * @return {?}
         */
        function (place) {
            if (!place)
                return null;
            /** @type {?} */
            var node = {
                ordNum: undefined,
                projRel: undefined,
                statement: statement,
                label: 'WGS84: ' + place.lat + '°, ' + place.long + '°',
                fkClass: place.fk_class
            };
            return node;
        })));
    };
    // @spyTag
    // @spyTag
    /**
     * @param {?} statement
     * @return {?}
     */
    InformationPipesService.prototype.pipeItemDimension = 
    // @spyTag
    /**
     * @param {?} statement
     * @return {?}
     */
    function (statement) {
        var _this = this;
        return this.s.inf$.dimension$.by_pk_entity$.key(statement.fk_object_info).pipe(filter((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return !!x; })), switchMap((/**
         * @param {?} dimension
         * @return {?}
         */
        function (dimension) {
            return _this.p.streamEntityPreview(dimension.fk_measurement_unit)
                .pipe(map((/**
             * @param {?} preview
             * @return {?}
             */
            function (preview) {
                /** @type {?} */
                var node = {
                    ordNum: undefined,
                    projRel: undefined,
                    statement: statement,
                    label: dimension.numeric_value + " " + preview.entity_label,
                    fkClass: dimension.fk_class,
                };
                return node;
            })));
        })));
    };
    // @spyTag
    // @spyTag
    /**
     * @param {?} statement
     * @return {?}
     */
    InformationPipesService.prototype.pipeItemLangString = 
    // @spyTag
    /**
     * @param {?} statement
     * @return {?}
     */
    function (statement) {
        var _this = this;
        return this.s.inf$.lang_string$.by_pk_entity$.key(statement.fk_object_info).pipe(switchMap((/**
         * @param {?} langString
         * @return {?}
         */
        function (langString) {
            if (!langString)
                return new BehaviorSubject(null);
            return _this.s.inf$.language$.by_pk_entity$.key(langString.fk_language)
                .pipe(map((/**
             * @param {?} language
             * @return {?}
             */
            function (language) {
                if (!language)
                    return null;
                /** @type {?} */
                var label = '';
                if (langString.string)
                    label = langString.string;
                else if (langString.quill_doc && langString.quill_doc.ops && langString.quill_doc.ops.length) {
                    label = langString.quill_doc.ops.map((/**
                     * @param {?} op
                     * @return {?}
                     */
                    function (op) { return op.insert; })).join('');
                }
                /** @type {?} */
                var node = {
                    ordNum: undefined,
                    projRel: undefined,
                    statement: statement,
                    label: label,
                    fkClass: langString.fk_class,
                    language: language,
                    fkLanguage: langString.fk_language
                };
                return node;
            })));
        })));
    };
    // @spyTag
    // @spyTag
    /**
     * @param {?} statement
     * @param {?} isOutgoing
     * @return {?}
     */
    InformationPipesService.prototype.pipeItemEntityPreview = 
    // @spyTag
    /**
     * @param {?} statement
     * @param {?} isOutgoing
     * @return {?}
     */
    function (statement, isOutgoing) {
        return this.p.streamEntityPreview((isOutgoing ? statement.fk_object_info : statement.fk_subject_info)).pipe(
        // filter(preview => !preview.loading && !!preview && !!preview.entity_type),
        map((/**
         * @param {?} preview
         * @return {?}
         */
        function (preview) {
            if (!preview) {
                return null;
            }
            /** @type {?} */
            var node = {
                ordNum: undefined,
                projRel: undefined,
                statement: statement,
                preview: preview,
                label: preview.entity_label || '',
                fkClass: preview.fk_class
            };
            return node;
        })));
    };
    /**
     * @param pk
     */
    // @spyTag
    /**
     * @param {?} statement
     * @param {?} pkProject
     * @return {?}
     */
    // @spyTag
    InformationPipesService.prototype.pipeItemTimePrimitive = /**
     * @param {?} statement
     * @param {?} pkProject
     * @return {?}
     */
    // @spyTag
    function (statement, pkProject) {
        var _this = this;
        if (pkProject) {
            return combineLatest(this.s.inf$.time_primitive$.by_pk_entity$.key(statement.fk_object_info).pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return !!x; }))), this.s.pro$.info_proj_rel$.by_fk_project__fk_entity$.key(pkProject + '_' + statement.pk_entity).pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return !!x; })))).pipe(map((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var _b = __read(_a, 2), infTimePrimitive = _b[0], projRel = _b[1];
                if (!infTimePrimitive)
                    return null;
                /** @type {?} */
                var timePrimitive = new TimePrimitive({
                    julianDay: infTimePrimitive.julian_day,
                    calendar: ((/** @type {?} */ ((projRel.calendar || 'gregorian')))),
                    duration: ((/** @type {?} */ (infTimePrimitive.duration)))
                });
                /** @type {?} */
                var node = {
                    ordNum: undefined,
                    projRel: undefined,
                    statement: statement,
                    timePrimitive: timePrimitive,
                    label: _this.timePrimitivePipe.transform(timePrimitive),
                    fkClass: infTimePrimitive.fk_class
                };
                return node;
            })));
        }
        else {
            return this.infRepo.time_primitive$.by_pk_entity$.key(statement.fk_object_info).pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return !!x; }))).pipe(map((/**
             * @param {?} infTimePrimitive
             * @return {?}
             */
            function (infTimePrimitive) {
                /** @type {?} */
                var timePrimitive = new TimePrimitive({
                    julianDay: infTimePrimitive.julian_day,
                    calendar: ((/** @type {?} */ ((statement.community_favorite_calendar || 'gregorian')))),
                    duration: ((/** @type {?} */ (infTimePrimitive.duration)))
                });
                /** @type {?} */
                var node = {
                    ordNum: undefined,
                    projRel: undefined,
                    statement: statement,
                    timePrimitive: timePrimitive,
                    label: _this.timePrimitivePipe.transform(timePrimitive),
                    fkClass: infTimePrimitive.fk_class
                };
                return node;
            })));
        }
    };
    /*********************************************************************
    * Pipe alternatives (not in project)
    *********************************************************************/
    // @spyTag
    /**
     * ******************************************************************
     * Pipe alternatives (not in project)
     * *******************************************************************
     * @param {?} l
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    InformationPipesService.prototype.pipeAltListLength = /**
     * ******************************************************************
     * Pipe alternatives (not in project)
     * *******************************************************************
     * @param {?} l
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    function (l, pkEntity) {
        switch (l.listType) {
            case 'appellation':
            case 'entity-preview':
            case 'language':
            case 'place':
            case 'langString':
            case 'temporal-entity':
            case 'time-span':
                return this.pipeAltListStatements(l, pkEntity).pipe(map((/**
                 * @param {?} items
                 * @return {?}
                 */
                function (items) { return items.length; })));
            default:
                console.warn('unsupported listType');
                break;
        }
    };
    // @spyTag
    // @spyTag
    /**
     * @param {?} l
     * @param {?} pkEntity
     * @return {?}
     */
    InformationPipesService.prototype.pipeAltList = 
    // @spyTag
    /**
     * @param {?} l
     * @param {?} pkEntity
     * @return {?}
     */
    function (l, pkEntity) {
        if (l.listType.appellation)
            return this.pipeAltListAppellation(l, pkEntity);
        else if (l.listType.entityPreview)
            return this.pipeAltListEntityPreview(l, pkEntity);
        else if (l.listType.language)
            return this.pipeAltListLanguage(l, pkEntity);
        else if (l.listType.place)
            return this.pipeAltListPlace(l, pkEntity);
        else if (l.listType.dimension)
            return this.pipeAltListDimension(l, pkEntity);
        else if (l.listType.langString)
            return this.pipeAltListLangString(l, pkEntity);
        else if (l.listType.temporalEntity)
            return this.pipeAltListEntityPreview(l, pkEntity);
        else
            console.warn('unsupported listType');
    };
    // @spyTag
    // @spyTag
    /**
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    InformationPipesService.prototype.pipeAltListStatements = 
    // @spyTag
    /**
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    function (listDefinition, pkEntity) {
        return (listDefinition.isOutgoing ?
            this.b.pipeAlternativeIngoingStatements(listDefinition.property.pkProperty, pkEntity) :
            this.b.pipeAlternativeIngoingStatements(listDefinition.property.pkProperty, pkEntity));
    };
    /**
    * Pipe the items in entity preview field
    */
    // @spyTag
    /**
     * Pipe the items in entity preview field
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    InformationPipesService.prototype.pipeAltListEntityPreview = /**
     * Pipe the items in entity preview field
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    function (listDefinition, pkEntity) {
        var _this = this;
        return (listDefinition.isOutgoing ?
            this.b.pipeAlternativeOutgoingStatements(listDefinition.property.pkProperty, pkEntity) :
            this.b.pipeAlternativeIngoingStatements(listDefinition.property.pkProperty, pkEntity)).pipe(switchMap((/**
         * @param {?} statements
         * @return {?}
         */
        function (statements) {
            return combineLatest(statements.map((/**
             * @param {?} r
             * @param {?} i
             * @return {?}
             */
            function (r, i) { return _this.pipeItemEntityPreview(r, listDefinition.isOutgoing); })))
                .pipe(map((/**
             * @param {?} nodes
             * @return {?}
             */
            function (nodes) { return nodes
                .filter((/**
             * @param {?} node
             * @return {?}
             */
            function (node) { return !!node; }))
                .sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            function (a, b) { return a.ordNum > b.ordNum ? 1 : -1; })); })), startWith([]));
        })));
    };
    /**
     * Pipe the alternative items in place list
     */
    // @spyTag
    /**
     * Pipe the alternative items in place list
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    InformationPipesService.prototype.pipeAltListPlace = /**
     * Pipe the alternative items in place list
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    function (listDefinition, pkEntity) {
        var _this = this;
        if (listDefinition.isOutgoing) {
            return this.b.pipeAlternativeOutgoingStatements(listDefinition.property.pkProperty, pkEntity).pipe(switchMap((/**
             * @param {?} statements
             * @return {?}
             */
            function (statements) {
                return combineLatest(statements.map((/**
                 * @param {?} r
                 * @param {?} i
                 * @return {?}
                 */
                function (r, i) { return _this.pipeItemPlace(r); })))
                    .pipe(map((/**
                 * @param {?} nodes
                 * @return {?}
                 */
                function (nodes) { return nodes.filter((/**
                 * @param {?} node
                 * @return {?}
                 */
                function (node) { return !!node && node.fkClass === listDefinition.targetClass; })); })), startWith([]));
            })));
        }
    };
    /**
     * Pipe the alternative items in dimension list
     */
    // @spyTag
    /**
     * Pipe the alternative items in dimension list
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    InformationPipesService.prototype.pipeAltListDimension = /**
     * Pipe the alternative items in dimension list
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    function (listDefinition, pkEntity) {
        var _this = this;
        if (listDefinition.isOutgoing) {
            return this.b.pipeAlternativeOutgoingStatements(listDefinition.property.pkProperty, pkEntity).pipe(switchMap((/**
             * @param {?} statements
             * @return {?}
             */
            function (statements) {
                return combineLatest(statements.map((/**
                 * @param {?} r
                 * @param {?} i
                 * @return {?}
                 */
                function (r, i) { return _this.pipeItemDimension(r); })))
                    .pipe(map((/**
                 * @param {?} nodes
                 * @return {?}
                 */
                function (nodes) { return nodes.filter((/**
                 * @param {?} node
                 * @return {?}
                 */
                function (node) { return !!node && node.fkClass === listDefinition.targetClass; })); })), startWith([]));
            })));
        }
    };
    /**
     * Pipe the alternative items in langString list
     */
    // @spyTag
    /**
     * Pipe the alternative items in langString list
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    InformationPipesService.prototype.pipeAltListLangString = /**
     * Pipe the alternative items in langString list
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    function (listDefinition, pkEntity) {
        var _this = this;
        if (listDefinition.isOutgoing) {
            return this.b.pipeAlternativeOutgoingStatements(listDefinition.property.pkProperty, pkEntity).pipe(switchMap((/**
             * @param {?} statements
             * @return {?}
             */
            function (statements) {
                return combineLatest(statements.map((/**
                 * @param {?} r
                 * @param {?} i
                 * @return {?}
                 */
                function (r, i) { return _this.pipeItemLangString(r); })))
                    .pipe(map((/**
                 * @param {?} nodes
                 * @return {?}
                 */
                function (nodes) { return nodes.filter((/**
                 * @param {?} node
                 * @return {?}
                 */
                function (node) { return !!node && node.fkClass === listDefinition.targetClass; })); })), startWith([]));
            })));
        }
    };
    /**
     * Pipe the alternative items in appellation field
     */
    // @spyTag
    /**
     * Pipe the alternative items in appellation field
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    InformationPipesService.prototype.pipeAltListAppellation = /**
     * Pipe the alternative items in appellation field
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    function (listDefinition, pkEntity) {
        var _this = this;
        if (listDefinition.isOutgoing) {
            return this.b.pipeAlternativeOutgoingStatements(listDefinition.property.pkProperty, pkEntity).pipe(switchMap((/**
             * @param {?} statements
             * @return {?}
             */
            function (statements) {
                return combineLatest(statements.map((/**
                 * @param {?} r
                 * @param {?} i
                 * @return {?}
                 */
                function (r, i) { return _this.pipeItemAppellation(r); })))
                    .pipe(map((/**
                 * @param {?} nodes
                 * @return {?}
                 */
                function (nodes) { return nodes.filter((/**
                 * @param {?} node
                 * @return {?}
                 */
                function (node) { return !!node && node.fkClass === listDefinition.targetClass; })); })), startWith([]));
            })));
        }
    };
    /**
     * Pipe the alternative items in language field
     */
    // @spyTag
    /**
     * Pipe the alternative items in language field
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    InformationPipesService.prototype.pipeAltListLanguage = /**
     * Pipe the alternative items in language field
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    function (listDefinition, pkEntity) {
        var _this = this;
        if (listDefinition.isOutgoing) {
            return this.b.pipeAlternativeOutgoingStatements(listDefinition.property.pkProperty, pkEntity).pipe(switchMap((/**
             * @param {?} statements
             * @return {?}
             */
            function (statements) {
                return combineLatest(statements.map((/**
                 * @param {?} r
                 * @param {?} i
                 * @return {?}
                 */
                function (r, i) { return _this.pipeItemLanguage(r); })))
                    .pipe(map((/**
                 * @param {?} nodes
                 * @return {?}
                 */
                function (nodes) { return nodes.filter((/**
                 * @param {?} node
                 * @return {?}
                 */
                function (node) { return !!node && node.fkClass === listDefinition.targetClass; })); })), startWith([]));
            })));
        }
    };
    /*********************************************************************
     * Pipe repo views (community favorites, where restricted by quantifiers)
     *********************************************************************/
    /**
     * Pipe repository temporal entity item in the way it is defined by the repository
     */
    /**
     * Pipe appellation list in the way it is defined by the repository
     */
    // @spyTag
    /*********************************************************************
       * Pipe repo views (community favorites, where restricted by quantifiers)
       *********************************************************************/
    /**
       * Pipe repository temporal entity item in the way it is defined by the repository
       */
    /**
     * Pipe appellation list in the way it is defined by the repository
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    InformationPipesService.prototype.pipeRepoListAppellation = /*********************************************************************
       * Pipe repo views (community favorites, where restricted by quantifiers)
       *********************************************************************/
    /**
       * Pipe repository temporal entity item in the way it is defined by the repository
       */
    /**
     * Pipe appellation list in the way it is defined by the repository
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    function (listDefinition, pkEntity) {
        var _this = this;
        if (listDefinition.isOutgoing) {
            return this.b.pipeRepoOutgoingStatementsByProperty(listDefinition.property.pkProperty, pkEntity).pipe(switchMap((/**
             * @param {?} statements
             * @return {?}
             */
            function (statements) {
                return combineLatest(statements.map((/**
                 * @param {?} r
                 * @param {?} i
                 * @return {?}
                 */
                function (r, i) { return _this.pipeItemAppellation(r); })))
                    .pipe(map((/**
                 * @param {?} nodes
                 * @return {?}
                 */
                function (nodes) { return nodes.filter((/**
                 * @param {?} node
                 * @return {?}
                 */
                function (node) { return !!node && node.fkClass === listDefinition.targetClass; })); })), startWith([]));
            })));
        }
    };
    /**
    * Pipe language list in the way it is defined by the repository
    */
    // @spyTag
    /**
     * Pipe language list in the way it is defined by the repository
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    InformationPipesService.prototype.pipeRepoListLanguage = /**
     * Pipe language list in the way it is defined by the repository
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    function (listDefinition, pkEntity) {
        var _this = this;
        if (listDefinition.isOutgoing) {
            return this.b.pipeRepoOutgoingStatementsByProperty(listDefinition.property.pkProperty, pkEntity).pipe(switchMap((/**
             * @param {?} statements
             * @return {?}
             */
            function (statements) {
                return combineLatest(statements.map((/**
                 * @param {?} r
                 * @param {?} i
                 * @return {?}
                 */
                function (r, i) { return _this.pipeItemLanguage(r); })))
                    .pipe(map((/**
                 * @param {?} nodes
                 * @return {?}
                 */
                function (nodes) { return nodes.filter((/**
                 * @param {?} node
                 * @return {?}
                 */
                function (node) { return !!node && node.fkClass === listDefinition.targetClass; })); })), startWith([]));
            })));
        }
    };
    /**
     * Pipe place list in the way it is defined by the repository
     */
    // @spyTag
    /**
     * Pipe place list in the way it is defined by the repository
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    InformationPipesService.prototype.pipeRepoListPlace = /**
     * Pipe place list in the way it is defined by the repository
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    function (listDefinition, pkEntity) {
        var _this = this;
        if (listDefinition.isOutgoing) {
            return this.b.pipeRepoOutgoingStatementsByProperty(listDefinition.property.pkProperty, pkEntity).pipe(switchMap((/**
             * @param {?} statements
             * @return {?}
             */
            function (statements) {
                return combineLatest(statements.map((/**
                 * @param {?} r
                 * @param {?} i
                 * @return {?}
                 */
                function (r, i) { return _this.pipeItemPlace(r); })))
                    .pipe(map((/**
                 * @param {?} nodes
                 * @return {?}
                 */
                function (nodes) { return nodes.filter((/**
                 * @param {?} node
                 * @return {?}
                 */
                function (node) { return !!node && node.fkClass === listDefinition.targetClass; })); })), startWith([]));
            })));
        }
    };
    /**
    * Pipe place list in the way it is defined by the repository
    */
    // @spyTag
    /**
     * Pipe place list in the way it is defined by the repository
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    InformationPipesService.prototype.pipeRepoListDimension = /**
     * Pipe place list in the way it is defined by the repository
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    function (listDefinition, pkEntity) {
        var _this = this;
        if (listDefinition.isOutgoing) {
            return this.b.pipeRepoOutgoingStatementsByProperty(listDefinition.property.pkProperty, pkEntity).pipe(switchMap((/**
             * @param {?} statements
             * @return {?}
             */
            function (statements) {
                return combineLatest(statements.map((/**
                 * @param {?} r
                 * @param {?} i
                 * @return {?}
                 */
                function (r, i) { return _this.pipeItemDimension(r); })))
                    .pipe(map((/**
                 * @param {?} nodes
                 * @return {?}
                 */
                function (nodes) { return nodes.filter((/**
                 * @param {?} node
                 * @return {?}
                 */
                function (node) { return !!node && node.fkClass === listDefinition.targetClass; })); })), startWith([]));
            })));
        }
    };
    /**
    * Pipe the items in entity preview field, connected by community favorite statements
    */
    // @spyTag
    /**
     * Pipe the items in entity preview field, connected by community favorite statements
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    InformationPipesService.prototype.pipeRepoListEntityPreview = /**
     * Pipe the items in entity preview field, connected by community favorite statements
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    function (listDefinition, pkEntity) {
        var _this = this;
        return (listDefinition.isOutgoing ?
            this.b.pipeRepoOutgoingStatementsByProperty(listDefinition.property.pkProperty, pkEntity) :
            this.b.pipeRepoIngoingStatementsByProperty(listDefinition.property.pkProperty, pkEntity)).pipe(switchMap((/**
         * @param {?} statements
         * @return {?}
         */
        function (statements) {
            return combineLatest(statements.map((/**
             * @param {?} r
             * @param {?} i
             * @return {?}
             */
            function (r, i) { return _this.pipeItemEntityPreview(r, listDefinition.isOutgoing); })))
                .pipe(map((/**
             * @param {?} nodes
             * @return {?}
             */
            function (nodes) { return nodes.filter((/**
             * @param {?} node
             * @return {?}
             */
            function (node) { return !!node && node.fkClass === listDefinition.targetClass; })); })));
        })), startWith([]));
    };
    /**
     * Pipe repo time span item
     */
    // @spyTag
    /**
     * Pipe repo time span item
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    InformationPipesService.prototype.pipeRepoItemTimeSpan = /**
     * Pipe repo time span item
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    function (pkEntity) {
        var _this = this;
        return this.p.pkProject$.pipe(switchMap((/**
         * @param {?} pkProject
         * @return {?}
         */
        function (pkProject) {
            return _this.c.pipeBasicAndSpecificFields(DfhConfig.ClASS_PK_TIME_SPAN).pipe(switchMap((/**
             * @param {?} fieldDefinitions
             * @return {?}
             */
            function (fieldDefinitions) {
                return combineLatest(fieldDefinitions.map((/**
                 * @param {?} fieldDef
                 * @return {?}
                 */
                function (fieldDef) {
                    return _this.b.pipeRepoOutgoingStatementsByProperty(fieldDef.property.pkProperty, pkEntity)
                        .pipe(switchMapOr([], (/**
                     * @param {?} statements
                     * @return {?}
                     */
                    function (statements) { return combineLatest(statements.map((/**
                     * @param {?} statement
                     * @return {?}
                     */
                    function (statement) {
                        return _this.infRepo.time_primitive$.by_pk_entity$.key(statement.fk_object_info)
                            .pipe(map((/**
                         * @param {?} infTimePrimitive
                         * @return {?}
                         */
                        function (infTimePrimitive) {
                            /** @type {?} */
                            var timePrimitive = new TimePrimitive({
                                julianDay: infTimePrimitive.julian_day,
                                calendar: ((/** @type {?} */ ((statement.community_favorite_calendar || 'gregorian')))),
                                duration: ((/** @type {?} */ (infTimePrimitive.duration)))
                            });
                            /** @type {?} */
                            var item = {
                                statement: statement,
                                ordNum: undefined,
                                projRel: undefined,
                                timePrimitive: timePrimitive,
                                label: _this.timePrimitivePipe.transform(timePrimitive),
                                fkClass: infTimePrimitive.fk_class
                            };
                            return item;
                        })));
                    }))); })), map((/**
                     * @param {?} items
                     * @return {?}
                     */
                    function (items) {
                        /** @type {?} */
                        var res = {
                            listDefinition: fieldDef.listDefinitions[0], items: items
                        };
                        return res;
                    })), startWith((/** @type {?} */ ({ listDefinition: fieldDef.listDefinitions[0], items: [] }))));
                }))).pipe(map((/**
                 * @param {?} properties
                 * @return {?}
                 */
                function (properties) {
                    /** @type {?} */
                    var timespanitem = {
                        label: '',
                        properties: properties.filter((/**
                         * @param {?} props
                         * @return {?}
                         */
                        function (props) { return props.items.length > 0; }))
                    };
                    return timespanitem;
                })));
            })));
        })));
    };
    /**
     * Pipes the label of given entity
     * This will use entity previews for getting strings of related temporal entities
     * So this may take a little while
     */
    // @spyTag
    /**
     * Pipes the label of given entity
     * This will use entity previews for getting strings of related temporal entities
     * So this may take a little while
     * @param {?} fkEntity
     * @return {?}
     */
    // @spyTag
    InformationPipesService.prototype.pipeLabelOfEntity = /**
     * Pipes the label of given entity
     * This will use entity previews for getting strings of related temporal entities
     * So this may take a little while
     * @param {?} fkEntity
     * @return {?}
     */
    // @spyTag
    function (fkEntity) {
        var _this = this;
        return this.b.pipeClassOfEntity(fkEntity).pipe(
        // get the definition of the first field
        switchMap((/**
         * @param {?} fkClass
         * @return {?}
         */
        function (fkClass) { return _this.c.pipeBasicAndSpecificFields(fkClass).pipe(
        // get the first item of that field
        switchMap((/**
         * @param {?} fieldDef
         * @return {?}
         */
        function (fieldDef) { return combineLatestOrEmpty(fieldDef && fieldDef.length ?
            fieldDef[0].listDefinitions.map((/**
             * @param {?} listDef
             * @return {?}
             */
            function (listDef) { return _this.pipeEntityProperties(listDef, fkEntity, 1); })) :
            []).pipe(map((/**
         * @param {?} props
         * @return {?}
         */
        function (props) {
            props = props.filter((/**
             * @param {?} prop
             * @return {?}
             */
            function (prop) { return prop.items.length > 0; }));
            if (props.length && props[0].items.length) {
                return props[0].items[0].label;
            }
            return '';
        }))); }))); })));
    };
    /**
     * Pipes the class label of given entity
     */
    // @spyTag
    /**
     * Pipes the class label of given entity
     * @param {?} fkEntity
     * @return {?}
     */
    // @spyTag
    InformationPipesService.prototype.pipeClassLabelOfEntity = /**
     * Pipes the class label of given entity
     * @param {?} fkEntity
     * @return {?}
     */
    // @spyTag
    function (fkEntity) {
        var _this = this;
        return this.b.pipeClassOfEntity(fkEntity).pipe(switchMap((/**
         * @param {?} pkClass
         * @return {?}
         */
        function (pkClass) { return _this.c.pipeClassLabel(pkClass); })));
    };
    /**
     * Pipes the pk_entity of the type of an entity
     */
    // @spyTag
    /**
     * Pipes the pk_entity of the type of an entity
     * @param {?} pkEntity
     * @param {?} hasTypeProperty
     * @param {?} isOutgoing
     * @return {?}
     */
    // @spyTag
    InformationPipesService.prototype.pipeTypeOfEntity = /**
     * Pipes the pk_entity of the type of an entity
     * @param {?} pkEntity
     * @param {?} hasTypeProperty
     * @param {?} isOutgoing
     * @return {?}
     */
    // @spyTag
    function (pkEntity, hasTypeProperty, isOutgoing) {
        if (isOutgoing) {
            return this.s.inf$.statement$.by_subject_and_property_indexed$({ fk_property: hasTypeProperty, fk_subject_info: pkEntity }).pipe(map((/**
             * @param {?} items
             * @return {?}
             */
            function (items) {
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
            function (items) {
                if (!items || Object.keys(items).length < 1)
                    return undefined;
                else
                    return values$1(items)[0];
            })));
        }
    };
    /**
     * @param {?} enabledIn
     * @return {?}
     */
    InformationPipesService.prototype.pipeClassesAndTypes = /**
     * @param {?} enabledIn
     * @return {?}
     */
    function (enabledIn) {
        var _this = this;
        return this.c.pipeTypeAndTypedClasses(enabledIn).pipe(switchMap((/**
         * @param {?} items
         * @return {?}
         */
        function (items) { return _this.pipeClassAndTypeNodes(items); })));
    };
    /**
     * @param {?} classes
     * @return {?}
     */
    InformationPipesService.prototype.pipeClassesAndTypesOfClasses = /**
     * @param {?} classes
     * @return {?}
     */
    function (classes) {
        var _this = this;
        return this.c.pipeTypeAndTypedClassesOfTypedClasses(classes).pipe(switchMap((/**
         * @param {?} items
         * @return {?}
         */
        function (items) { return _this.pipeClassAndTypeNodes(items); })));
    };
    /**
     * @param {?} typeAndTypedClasses
     * @return {?}
     */
    InformationPipesService.prototype.pipeClassAndTypeNodes = /**
     * @param {?} typeAndTypedClasses
     * @return {?}
     */
    function (typeAndTypedClasses) {
        var _this = this;
        return combineLatestOrEmpty(typeAndTypedClasses.map((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return _this.c.pipeClassLabel(item.typedClass).pipe(map((/**
         * @param {?} label
         * @return {?}
         */
        function (label) { return ((/** @type {?} */ ({
            label: label,
            data: { pkClass: item.typedClass, pkType: null }
        }))); })), switchMap((/**
         * @param {?} node
         * @return {?}
         */
        function (node) { return iif((/**
         * @return {?}
         */
        function () { return !!item.typeClass; }), _this.b.pipePersistentItemPksByClass(item.typeClass).pipe(switchMap((/**
         * @param {?} typePks
         * @return {?}
         */
        function (typePks) { return combineLatestOrEmpty(typePks.map((/**
         * @param {?} pkType
         * @return {?}
         */
        function (pkType) { return _this.p.streamEntityPreview(pkType).pipe(map((/**
         * @param {?} preview
         * @return {?}
         */
        function (preview) { return ((/** @type {?} */ ({
            label: preview.entity_label,
            data: { pkClass: item.typedClass, pkType: pkType }
        }))); }))); }))).pipe(sortAbc((/**
         * @param {?} n
         * @return {?}
         */
        function (n) { return n.label; }))); })), map((/**
         * @param {?} children
         * @return {?}
         */
        function (children) {
            node.children = children;
            return node;
        }))), of((/** @type {?} */ (__assign({}, node, { children: [] }))))); }))); }))).pipe(sortAbc((/**
         * @param {?} node
         * @return {?}
         */
        function (node) { return node.label; })));
    };
    /**
     * returns array of pk_class of all classes and typed classes.
     * @param classesAndTypes a object containing {classes: [], types[]}
     */
    /**
     * returns array of pk_class of all classes and typed classes.
     * @param {?} classesAndTypes a object containing {classes: [], types[]}
     * @return {?}
     */
    InformationPipesService.prototype.pipeClassesFromClassesAndTypes = /**
     * returns array of pk_class of all classes and typed classes.
     * @param {?} classesAndTypes a object containing {classes: [], types[]}
     * @return {?}
     */
    function (classesAndTypes) {
        var _this = this;
        /** @type {?} */
        var typedClasses$ = (!classesAndTypes || !classesAndTypes.types || !classesAndTypes.types.length) ?
            of((/** @type {?} */ ([]))) :
            this.b.pipeClassesOfPersistentItems(classesAndTypes.types)
                .pipe(filter((/**
             * @param {?} pks
             * @return {?}
             */
            function (pks) { return !!pks; })), switchMap((/**
             * @param {?} typeClasses
             * @return {?}
             */
            function (typeClasses) { return _this.c.pipeTypedClassesOfTypeClasses(typeClasses); })));
        return typedClasses$.pipe(map((/**
         * @param {?} typedClasses
         * @return {?}
         */
        function (typedClasses) { return uniq(__spread(typedClasses, ((classesAndTypes || { classes: [] }).classes || []))); })));
    };
    /**
     * @param {?} classesAndTypes
     * @return {?}
     */
    InformationPipesService.prototype.pipePropertyOptionsFromClassesAndTypes = /**
     * @param {?} classesAndTypes
     * @return {?}
     */
    function (classesAndTypes) {
        var _this = this;
        return this.pipeClassesFromClassesAndTypes(classesAndTypes).pipe(switchMap((/**
         * @param {?} classes
         * @return {?}
         */
        function (classes) { return _this.pipePropertyOptionsFormClasses(classes); })));
    };
    /**
     * @param {?} classes
     * @return {?}
     */
    InformationPipesService.prototype.pipePropertyOptionsFormClasses = /**
     * @param {?} classes
     * @return {?}
     */
    function (classes) {
        var _this = this;
        return combineLatestOrEmpty(classes.map((/**
         * @param {?} pkClass
         * @return {?}
         */
        function (pkClass) { return _this.s.dfh$.class$.by_pk_class$.key(pkClass).pipe(map((/**
         * @param {?} c
         * @return {?}
         */
        function (c) { return c.basic_type === 9; })), switchMap((/**
         * @param {?} isTeEn
         * @return {?}
         */
        function (isTeEn) { return _this.c.pipeSpecificAndBasicFields(pkClass)
            .pipe(map((/**
         * @param {?} classFields
         * @return {?}
         */
        function (classFields) { return classFields
            .filter((/**
         * @param {?} f
         * @return {?}
         */
        function (f) { return !!f.property.pkProperty; }))
            .map((/**
         * @param {?} f
         * @return {?}
         */
        function (f) { return ({
            isOutgoing: f.isOutgoing,
            fkPropertyDomain: f.isOutgoing ? f.sourceClass : null,
            fkPropertyRange: f.isOutgoing ? null : f.sourceClass,
            pkProperty: f.property.pkProperty
        }); })); })), switchMap((/**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            if (isTeEn) {
                // add time properties (at some time within, ...)
                DfhConfig.PROPERTY_PKS_WHERE_TIME_PRIMITIVE_IS_RANGE.map((/**
                 * @param {?} pkProperty
                 * @return {?}
                 */
                function (pkProperty) {
                    items.push({
                        pkProperty: pkProperty,
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
            function (item) { return _this.c.pipeFieldLabel(item.pkProperty, item.fkPropertyDomain, item.fkPropertyRange).pipe(map((/**
             * @param {?} label
             * @return {?}
             */
            function (label) {
                /** @type {?} */
                var isOutgoing = item.isOutgoing;
                /** @type {?} */
                var o = {
                    isOutgoing: isOutgoing,
                    label: label,
                    pk: item.pkProperty,
                    propertyFieldKey: propertyOptionFieldKey(item.pkProperty, isOutgoing)
                };
                return o;
            }))); })));
        }))); }))); }))).pipe(map((/**
         * @param {?} y
         * @return {?}
         */
        function (y) { return flatten(y); })));
    };
    /**
     * @param {?} model
     * @return {?}
     */
    InformationPipesService.prototype.pipePkClassesFromPropertySelectModel = /**
     * @param {?} model
     * @return {?}
     */
    function (model) {
        return combineLatestOrEmpty([
            this.c.pipeTargetClassesOfProperties(model.outgoingProperties, true),
            this.c.pipeTargetClassesOfProperties(model.ingoingProperties, false),
        ]).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = __read(_a, 2), out = _b[0], ing = _b[1];
            return uniq(__spread(out, ing));
        })));
    };
    /**
     * @param {?} model$
     * @return {?}
     */
    InformationPipesService.prototype.getPkClassesFromPropertySelectModel$ = /**
     * @param {?} model$
     * @return {?}
     */
    function (model$) {
        var _this = this;
        return model$.pipe(switchMap((/**
         * @param {?} model
         * @return {?}
         */
        function (model) { return combineLatestOrEmpty([
            _this.c.pipeTargetClassesOfProperties(model.outgoingProperties, true),
            _this.c.pipeTargetClassesOfProperties(model.ingoingProperties, false),
        ]).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = __read(_a, 2), out = _b[0], ing = _b[1];
            return uniq(__spread(out, ing));
        }))); })));
    };
    /**
     * @param {?} classTypes$
     * @return {?}
     */
    InformationPipesService.prototype.getPropertyOptions$ = /**
     * @param {?} classTypes$
     * @return {?}
     */
    function (classTypes$) {
        var _this = this;
        return classTypes$.pipe(
        // make sure only it passes only if data of the arrayClasses are changed (not children)
        distinctUntilChanged((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        function (a, b) {
            return equals(a, b);
        })), switchMap((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return !x ? empty() : _this.b.pipeClassesOfPersistentItems(x.types)
            .pipe(filter((/**
         * @param {?} pks
         * @return {?}
         */
        function (pks) { return !!pks; })), switchMap((/**
         * @param {?} typeClasses
         * @return {?}
         */
        function (typeClasses) { return _this.c.pipeTypedClassesOfTypeClasses(typeClasses).pipe(switchMap((/**
         * @param {?} typedClasses
         * @return {?}
         */
        function (typedClasses) {
            /** @type {?} */
            var classes = uniq(__spread(typedClasses, (x.classes || [])));
            return _this.pipePropertyOptionsFormClasses(classes);
        }))); }))); })));
    };
    InformationPipesService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    InformationPipesService.ctorParameters = function () { return [
        { type: InformationBasicPipesService },
        { type: ActiveProjectPipesService },
        { type: SchemaSelectorsService },
        { type: ConfigurationPipesService },
        { type: TimePrimitivePipe },
        { type: TimeSpanPipe },
        { type: NgRedux }
    ]; };
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
    return InformationPipesService;
}());
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
