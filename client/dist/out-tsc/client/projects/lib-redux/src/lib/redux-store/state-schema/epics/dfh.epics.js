import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { combineEpics } from 'redux-observable-es6-compat';
import { DfhClassActionFactory, DfhLabelActionFactory, DfhProfileActionFactory, DfhPropertyActionFactory } from '../actions/dfh.actions';
import { SchemaEpicsFactory } from '../_helpers/schema-epics-factory';
let DfhEpics = class DfhEpics {
    constructor(actions, notification, profileApi, classApi, propertyApi, labelApi) {
        this.actions = actions;
        this.notification = notification;
        this.profileApi = profileApi;
        this.classApi = classApi;
        this.propertyApi = propertyApi;
        this.labelApi = labelApi;
    }
    createEpics() {
        const dfhProfileEpicsFactory = new SchemaEpicsFactory('dfh', 'profile', this.actions.profile, this.notification);
        const dfhClassEpicsFactory = new SchemaEpicsFactory('dfh', 'klass', this.actions.klass, this.notification);
        const dfhLabelEpicsFactory = new SchemaEpicsFactory('dfh', 'label', this.actions.label, this.notification);
        const dfhPropertyEpicsFactory = new SchemaEpicsFactory('dfh', 'property', this.actions.property, this.notification);
        return combineEpics(
        // Profile Loaders
        dfhProfileEpicsFactory.createLoadEpic((meta) => this.profileApi.ofProject(meta.pk), DfhProfileActionFactory.OF_PROJECT), 
        // Property Loaders
        dfhPropertyEpicsFactory.createLoadEpic((meta) => this.propertyApi.dfhPropertyControllerOfProject(meta.pk), DfhPropertyActionFactory.OF_PROJECT), 
        // Class Loaders
        dfhClassEpicsFactory.createLoadEpic((meta) => this.classApi.dfhClassControllerOfProject(meta.pk), DfhClassActionFactory.OF_PROJECT), 
        // Label Loaders
        dfhLabelEpicsFactory.createLoadEpic((meta) => this.labelApi.ofProject(meta.pk), DfhLabelActionFactory.OF_PROJECT));
    }
};
DfhEpics = tslib_1.__decorate([
    Injectable()
], DfhEpics);
export { DfhEpics };
//# sourceMappingURL=dfh.epics.js.map