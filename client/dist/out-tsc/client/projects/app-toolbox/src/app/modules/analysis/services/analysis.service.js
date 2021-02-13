import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ConfirmDialogComponent } from 'projects/app-toolbox/src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ErrorDialogComponent } from 'projects/app-toolbox/src/app/shared/components/error-dialog/error-dialog.component';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { catchError, first, switchMap, tap } from 'rxjs/operators';
import { DialogCreateComponent } from '../components/dialog-create/dialog-create.component';
let GvAnalysisService = class GvAnalysisService {
    constructor(analysisApi, dialog, p, s, not, ngRedux) {
        this.analysisApi = analysisApi;
        this.dialog = dialog;
        this.p = p;
        this.s = s;
        this.not = not;
        this.ngRedux = ngRedux;
        this.results$ = new BehaviorSubject(null);
    }
    registerRunAnalysis(fn, fkAnalysisType) {
        this.runAnalysis = fn;
        this.fkAnalysisType = fkAnalysisType;
    }
    runAnalysis() {
        throw new Error('called befor registerRunAnalysis');
    }
    createAnalysis() {
        throw new Error('called befor registerCreate');
    }
    registerCreateAnalysis(fn) {
        this.createAnalysis = fn;
    }
    registerSaveAnalysis(fn) {
        this.saveAnalysis = fn;
    }
    saveAnalysis() {
        throw new Error('called befor registerSaveAnalysis');
    }
    copyAnalysis() {
        throw new Error('called befor registerCopy');
    }
    registerCopyAnalysis(fn) {
        this.copyAnalysis = fn;
    }
    renameAnalysis() {
        throw new Error('called befor registerRename');
    }
    registerRenameAnalysis(fn) {
        this.renameAnalysis = fn;
    }
    deleteAnalysis() {
        this.callDeleteApi();
    }
    /**
     * Saves an ProAnalysis in the persistent data layer.
     *
     * @param analysis_definition
     * @return an Observable emitting the pkEntity of the created ProAnalysis in case of success
     */
    callCreateApi(analysis_definition) {
        const pkEntity$ = new Subject();
        const dialogData = {
            title: 'Save Analysis',
            okBtnText: 'Save',
        };
        const d = this.dialog.open(DialogCreateComponent, { data: dialogData });
        d.afterClosed().pipe(first()).subscribe((dialogResult) => {
            if (dialogResult) {
                this.p.pkProject$.pipe(first()).subscribe(pkProject => {
                    this.saving = true;
                    const proAnalysis = {
                        fk_analysis_type: this.fkAnalysisType,
                        fk_project: pkProject,
                        analysis_definition,
                        name: dialogResult.name,
                        description: dialogResult.description
                    };
                    this.upsert(proAnalysis, pkProject)
                        .subscribe((data) => {
                        this.saving = false;
                        this.ngRedux.dispatch(this.not.addToast({
                            type: 'success',
                            options: {
                                title: 'Success',
                                msg: `Analysis has been saved. Name: '${data.pro.analysis[0].name}'`
                            }
                        }));
                        this.pkEntity = data.pro.analysis[0].pk_entity;
                        pkEntity$.next(data.pro.analysis[0].pk_entity);
                        // dialog.close();
                    }, error => {
                        this.saving = false;
                        // dialog.close();
                        const errorDialogData = {
                            title: 'Oops, something went wrong ...',
                            subtitle: 'There was an error when saving the analysis. Sorry!',
                            errorReport: {
                                title: error.name,
                                json: error.message
                            }
                        };
                        this.dialog.open(ErrorDialogComponent, {
                            data: errorDialogData
                        });
                        // alert(`Ooops. Something went wrong: ${error}`)
                    });
                });
            }
        });
        return pkEntity$;
    }
    /**
     * Updates an ProAnalysis in the persistent data layer.
     *
     * @param analysis_definition
     * @return an Observable emitting the pkEntity of the created ProAnalysis in case of success
     */
    callSaveApi(analysis_definition) {
        this.p.pro$.analysis$.by_pk_entity$.key(this.pkEntity.toString())
            .pipe(first())
            .subscribe(proAnalysis => {
            this.saving = true;
            proAnalysis = Object.assign({}, proAnalysis, { analysis_definition });
            this.upsert(proAnalysis, proAnalysis.fk_project)
                .subscribe((data) => {
                this.saving = false;
                this.ngRedux.dispatch(this.not.addToast({
                    type: 'success',
                    options: {
                        title: 'Success',
                        msg: `Analysis has been saved.`
                    }
                }));
            }, error => {
                this.saving = false;
                const errorDialogData = {
                    title: 'Oops, something went wrong ...',
                    subtitle: 'There was an error when saving the analysis. Sorry!',
                    errorReport: {
                        title: error.name,
                        json: error.message
                    }
                };
                this.dialog.open(ErrorDialogComponent, {
                    data: errorDialogData
                });
            });
        });
    }
    /**
     * Creates a copy of a ProAnalysis in the persistent data layer.
     *
     * @param analysis_definition
     * @return an Observable emitting the pkEntity of the created ProAnalysis in case of success
     */
    callCopyApi(analysis_definition) {
        const pkEntity$ = new Subject();
        this.p.pro$.analysis$.by_pk_entity$.key(this.pkEntity.toString())
            .pipe(first())
            .subscribe(currentData => {
            const dialogData = {
                title: 'Create a copy of this analysis',
                okBtnText: 'Save Copy',
                name: currentData.name + ' (copy)',
                description: currentData.description
            };
            const d = this.dialog.open(DialogCreateComponent, { data: dialogData });
            d.afterClosed().pipe(first()).subscribe((dialogResult) => {
                if (dialogResult) {
                    this.saving = true;
                    const proAnalysis = {
                        fk_analysis_type: this.fkAnalysisType,
                        fk_project: currentData.fk_project,
                        analysis_definition,
                        name: dialogResult.name,
                        description: dialogResult.description
                    };
                    this.upsert(proAnalysis, currentData.fk_project).subscribe((data) => {
                        this.saving = false;
                        this.ngRedux.dispatch(this.not.addToast({
                            type: 'success',
                            options: {
                                title: 'Success',
                                msg: `Analysis has been saved. Name: '${data.pro.analysis[0].name}'`
                            }
                        }));
                        // this.pkEntity = data.pro.analysis[0].pk_entity;
                        // pkEntity$.next(data.pro.analysis[0].pk_entity)
                        this.p.addTab({
                            active: true,
                            component: 'analysis-detail',
                            icon: 'analysis',
                            pathSegment: 'analysisDetails',
                            data: {
                                pkEntity: data.pro.analysis[0].pk_entity,
                                fkAnalysisType: this.fkAnalysisType
                            }
                        });
                        // dialog.close();
                    }, error => {
                        this.saving = false;
                        // dialog.close();
                        const errorDialogData = {
                            title: 'Oops, something went wrong ...',
                            subtitle: 'There was an error when saving the analysis. Sorry!',
                            errorReport: {
                                title: error.name,
                                json: error.message
                            }
                        };
                        this.dialog.open(ErrorDialogComponent, {
                            data: errorDialogData
                        });
                        // alert(`Ooops. Something went wrong: ${error}`)
                    });
                }
            });
        });
        return pkEntity$;
    }
    /**
     * Rename an ProAnalysis in the persistent data layer.
     *
     * @param analysis_definition
     */
    callRenameApi(analysis_definition) {
        this.p.pro$.analysis$.by_pk_entity$.key(this.pkEntity.toString())
            .pipe(first())
            .subscribe(currentData => {
            const dialogData = {
                title: 'Change name and description',
                okBtnText: 'Save',
                name: currentData.name,
                description: currentData.description
            };
            const d = this.dialog.open(DialogCreateComponent, { data: dialogData });
            d.afterClosed().pipe(first()).subscribe((dialogResult) => {
                if (dialogResult) {
                    this.saving = true;
                    const proAnalysis = Object.assign({}, currentData, { analysis_definition, name: dialogResult.name, description: dialogResult.description });
                    this.upsert(proAnalysis, currentData.fk_project)
                        .subscribe((data) => {
                        this.saving = false;
                        this.ngRedux.dispatch(this.not.addToast({
                            type: 'success',
                            options: {
                                title: 'Success',
                                msg: `Analysis has been saved. Name: '${data.pro.analysis[0].name}'`
                            }
                        }));
                    }, error => {
                        this.saving = false;
                        const errorDialogData = {
                            title: 'Oops, something went wrong ...',
                            subtitle: 'There was an error when saving the analysis. Sorry!',
                            errorReport: {
                                title: error.name,
                                json: error.message
                            }
                        };
                        this.dialog.open(ErrorDialogComponent, {
                            data: errorDialogData
                        });
                    });
                }
            });
        });
    }
    upsert(proAnalysis, pkProject) {
        return this.s.storeGv(this.analysisApi.analysisControllerBulkUpsert(pkProject, [proAnalysis]), pkProject);
    }
    /**
     * Delete a ProAnalysis in the persistent data layer.
     */
    callDeleteApi() {
        const deleted$ = new Subject();
        const dialogData = {
            title: 'Delete Analysis',
            paragraphs: ['Do you really want to delete this analysis?'],
            yesBtnText: 'Delete',
            yesBtnColor: 'warn',
            noBtnText: 'Cancel',
        };
        const d = this.dialog.open(ConfirmDialogComponent, { data: dialogData });
        d.afterClosed().pipe(first()).subscribe((dialogResult) => {
            if (dialogResult) {
                this.p.pro$.analysis$.by_pk_entity$.key(this.pkEntity.toString())
                    .pipe(first())
                    .subscribe(proAnalysis => {
                    this.saving = true;
                    this.p.pro$.analysis.delete([proAnalysis], proAnalysis.fk_project)
                        .resolved$.pipe(first(x => !!x)).subscribe((deleted) => {
                        this.saving = false;
                        this.ngRedux.dispatch(this.not.addToast({
                            type: 'success',
                            options: {
                                title: 'Success',
                                msg: `Analysis has been deleted.`
                            }
                        }));
                    }, error => {
                        this.saving = false;
                        // dialog.close();
                        const errorDialogData = {
                            title: 'Oops, something went wrong ...',
                            subtitle: 'There was an error when deleting the analysis. Sorry!',
                            errorReport: {
                                title: error.name,
                                json: error.message
                            }
                        };
                        this.dialog.open(ErrorDialogComponent, {
                            data: errorDialogData
                        });
                        // alert(`Ooops. Something went wrong: ${error}`)
                    });
                });
            }
        });
        return deleted$;
    }
    callRunApi(apiCall) {
        this.loading = true;
        this.p.pkProject$.pipe(switchMap(fkProject => apiCall(fkProject)))
            .subscribe((r) => {
            this.results$.next(r);
            this.loading = false;
            // dialog.close();
        }, error => {
            this.loading = false;
            // dialog.close();
            const d = {
                title: 'Oops, something went wrong ...',
                subtitle: 'There was an error when creating the analysis. Sorry!',
                errorReport: {
                    title: error.name,
                    json: error.message
                }
            };
            this.dialog.open(ErrorDialogComponent, {
                data: d
            });
            // alert(`Ooops. Something went wrong: ${error}`)
        });
    }
    callDownloadApi(apiCall) {
        return this.p.pkProject$
            .pipe(first(pkProject => !!pkProject))
            .pipe(tap(() => this.loading = true), switchMap(pkProject => apiCall(pkProject)
            .pipe(catchError((error) => {
            this.loading = false;
            const d = {
                title: 'Oops, something went wrong ...',
                subtitle: 'There was an error when downloading the data. Sorry!',
                errorReport: {
                    title: error.name,
                    json: error.message
                }
            };
            this.dialog.open(ErrorDialogComponent, {
                data: d
            });
            return of();
        }))), tap(() => this.loading = false));
    }
};
GvAnalysisService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], GvAnalysisService);
export { GvAnalysisService };
//# sourceMappingURL=analysis.service.js.map