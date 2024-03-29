import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AnalysisTabData, IAppState, NotificationsAPIActions, ReduxMainService } from '@kleiolab/lib-redux';
import { AnalysisService as LbAnalysisService, ProAnalysis } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { ConfirmDialogComponent, ConfirmDialogData } from 'projects/app-toolbox/src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ErrorDialogComponent, ErrorDialogData } from 'projects/app-toolbox/src/app/shared/components/error-dialog/error-dialog.component';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, first, switchMap, tap } from 'rxjs/operators';
import { DialogCreateComponent, DialogCreateData, DialogCreateResult } from '../components/dialog-create/dialog-create.component';
@Injectable({
  providedIn: 'root'
})
export class GvAnalysisService<I, O> {

  results$ = new BehaviorSubject<O>(null)

  loading: boolean;
  saving: boolean;
  fkAnalysisType: number
  pkEntity: number

  constructor(
    public analysisApi: LbAnalysisService,
    private dialog: MatDialog,
    private p: ActiveProjectService,
    private not: NotificationsAPIActions,
    private dataService: ReduxMainService,
    private ngRedux: NgRedux<IAppState>
  ) { }



  registerRunAnalysis(fn, fkAnalysisType) {
    this.runAnalysis = fn
    this.fkAnalysisType = fkAnalysisType
  }
  runAnalysis() {
    throw new Error('called befor registerRunAnalysis')
  }



  createAnalysis(): Observable<number> {
    throw new Error('called befor registerCreate')
  }
  registerCreateAnalysis(fn: () => Observable<number>) {
    this.createAnalysis = fn
  }



  registerSaveAnalysis(fn: () => void) {
    this.saveAnalysis = fn
  }
  saveAnalysis() {
    throw new Error('called befor registerSaveAnalysis')
  }



  copyAnalysis(): Observable<number> {
    throw new Error('called befor registerCopy')
  }
  registerCopyAnalysis(fn: () => Observable<number>) {
    this.copyAnalysis = fn
  }


  renameAnalysis() {
    throw new Error('called befor registerRename')
  }
  registerRenameAnalysis(fn: () => void) {
    this.renameAnalysis = fn
  }

  deleteAnalysis() {
    this.callDeleteApi()
  }



  /**
   * Saves an ProAnalysis in the persistent data layer.
   *
   * @param analysis_definition
   * @return an Observable emitting the pkEntity of the created ProAnalysis in case of success
   */
  callCreateApi(analysis_definition: I): Observable<number> {
    const pkEntity$ = new Subject<number>();

    const dialogData: DialogCreateData = {
      title: 'Save Analysis',
      okBtnText: 'Save',
    }
    const d = this.dialog.open<DialogCreateComponent, DialogCreateData, DialogCreateResult>(
      DialogCreateComponent,
      { data: dialogData })
    d.afterClosed().pipe(first()).subscribe((dialogResult) => {
      if (dialogResult) {

        this.p.pkProject$.pipe(first()).subscribe(pkProject => {
          this.saving = true;
          const proAnalysis: ProAnalysis = {
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
              }))
              this.pkEntity = data.pro.analysis[0].pk_entity;
              pkEntity$.next(data.pro.analysis[0].pk_entity)
              // dialog.close();
            }, error => {
              this.saving = false;

              // dialog.close();
              const errorDialogData: ErrorDialogData = {
                title: 'Oops, something went wrong ...',
                subtitle: 'There was an error when saving the analysis. Sorry!',
                errorReport: {
                  title: error.name,
                  json: error.message
                }
              }
              this.dialog.open(ErrorDialogComponent, {
                data: errorDialogData
              });

              // alert(`Ooops. Something went wrong: ${error}`)
            })
        })
      }
    })
    return pkEntity$;
  }

  /**
   * Updates an ProAnalysis in the persistent data layer.
   *
   * @param analysis_definition
   * @return an Observable emitting the pkEntity of the created ProAnalysis in case of success
   */
  callSaveApi(analysis_definition: I) {

    this.p.pro$.analysis$.by_pk_entity$.key(this.pkEntity.toString())
      .pipe(first())
      .subscribe(proAnalysis => {
        this.saving = true;
        proAnalysis = {
          ...proAnalysis,
          analysis_definition
        };
        this.upsert(proAnalysis, proAnalysis.fk_project)
          .subscribe((data) => {
            this.saving = false;
            this.ngRedux.dispatch(this.not.addToast({
              type: 'success',
              options: {
                title: 'Success',
                msg: `Analysis has been saved.`
              }
            }))
          }, error => {
            this.saving = false;

            const errorDialogData: ErrorDialogData = {
              title: 'Oops, something went wrong ...',
              subtitle: 'There was an error when saving the analysis. Sorry!',
              errorReport: {
                title: error.name,
                json: error.message
              }
            }
            this.dialog.open(ErrorDialogComponent, {
              data: errorDialogData
            });
          })
      })
  }




  /**
   * Creates a copy of a ProAnalysis in the persistent data layer.
   *
   * @param analysis_definition
   * @return an Observable emitting the pkEntity of the created ProAnalysis in case of success
   */
  callCopyApi(analysis_definition: I): Observable<number> {
    const pkEntity$ = new Subject<number>();
    this.p.pro$.analysis$.by_pk_entity$.key(this.pkEntity.toString())
      .pipe(first())
      .subscribe(currentData => {

        const dialogData: DialogCreateData = {
          title: 'Create a copy of this analysis',
          okBtnText: 'Save Copy',
          name: currentData.name + ' (copy)',
          description: currentData.description
        }
        const d = this.dialog.open<DialogCreateComponent, DialogCreateData, DialogCreateResult>(
          DialogCreateComponent,
          { data: dialogData })
        d.afterClosed().pipe(first()).subscribe((dialogResult) => {
          if (dialogResult) {

            this.saving = true;
            const proAnalysis = {
              fk_analysis_type: this.fkAnalysisType,
              fk_project: currentData.fk_project,
              analysis_definition,
              name: dialogResult.name,
              description: dialogResult.description
            } as ProAnalysis;
            this.upsert(proAnalysis, currentData.fk_project).subscribe((data) => {
              this.saving = false;
              this.ngRedux.dispatch(this.not.addToast({
                type: 'success',
                options: {
                  title: 'Success',
                  msg: `Analysis has been saved. Name: '${data.pro.analysis[0].name}'`
                }
              }))
              // this.pkEntity = data.pro.analysis[0].pk_entity;
              // pkEntity$.next(data.pro.analysis[0].pk_entity)
              this.p.addTab<AnalysisTabData>({
                active: true,
                component: 'analysis',
                icon: 'analysis',
                pathSegment: 'analysisDetails',
                data: {
                  pkEntity: data.pro.analysis[0].pk_entity,
                  fkAnalysisType: this.fkAnalysisType
                }
              })
              // dialog.close();
            }, error => {
              this.saving = false;

              // dialog.close();
              const errorDialogData: ErrorDialogData = {
                title: 'Oops, something went wrong ...',
                subtitle: 'There was an error when saving the analysis. Sorry!',
                errorReport: {
                  title: error.name,
                  json: error.message
                }
              }
              this.dialog.open(ErrorDialogComponent, {
                data: errorDialogData
              });

              // alert(`Ooops. Something went wrong: ${error}`)
            })
          }
        })
      })

    return pkEntity$;
  }



  /**
   * Rename an ProAnalysis in the persistent data layer.
   *
   * @param analysis_definition
   */
  callRenameApi(analysis_definition: I) {
    this.p.pro$.analysis$.by_pk_entity$.key(this.pkEntity.toString())
      .pipe(first())
      .subscribe(currentData => {
        const dialogData: DialogCreateData = {
          title: 'Change name and description',
          okBtnText: 'Save',
          name: currentData.name,
          description: currentData.description
        }
        const d = this.dialog.open<DialogCreateComponent, DialogCreateData, DialogCreateResult>(
          DialogCreateComponent,
          { data: dialogData })
        d.afterClosed().pipe(first()).subscribe((dialogResult) => {
          if (dialogResult) {
            this.saving = true;
            const proAnalysis = {
              ...currentData,
              analysis_definition,
              name: dialogResult.name,
              description: dialogResult.description
            } as ProAnalysis;
            this.upsert(proAnalysis, currentData.fk_project)
              .subscribe((data) => {
                this.saving = false;
                this.ngRedux.dispatch(this.not.addToast({
                  type: 'success',
                  options: {
                    title: 'Success',
                    msg: `Analysis has been saved. Name: '${data.pro.analysis[0].name}'`
                  }
                }))
              }, error => {
                this.saving = false;

                const errorDialogData: ErrorDialogData = {
                  title: 'Oops, something went wrong ...',
                  subtitle: 'There was an error when saving the analysis. Sorry!',
                  errorReport: {
                    title: error.name,
                    json: error.message
                  }
                }
                this.dialog.open(ErrorDialogComponent, {
                  data: errorDialogData
                });
              })
          }
        })
      })
  }



  private upsert(proAnalysis: ProAnalysis, pkProject: number) {
    return this.dataService.upsertProjectAnalisis(pkProject, [proAnalysis])
  }

  /**
   * Delete a ProAnalysis in the persistent data layer.
   */
  callDeleteApi(): Observable<boolean> {
    const deleted$ = new Subject<boolean>();

    const dialogData: ConfirmDialogData = {
      title: 'Delete Analysis',
      paragraphs: ['Do you really want to delete this analysis?'],
      yesBtnText: 'Delete',
      yesBtnColor: 'warn',
      noBtnText: 'Cancel',
    }
    const d = this.dialog.open<ConfirmDialogComponent, ConfirmDialogData, any>(
      ConfirmDialogComponent,
      { data: dialogData })
    d.afterClosed().pipe(first()).subscribe((dialogResult) => {
      if (dialogResult) {

        this.p.pro$.analysis$.by_pk_entity$.key(this.pkEntity.toString())
          .pipe(first())
          .subscribe(proAnalysis => {
            this.saving = true;
            this.dataService.deleteProjectAnalisis(proAnalysis.fk_project, [proAnalysis.pk_entity])
              .pipe(first(x => !!x)).subscribe((deleted) => {
                this.saving = false;
                this.ngRedux.dispatch(this.not.addToast({
                  type: 'success',
                  options: {
                    title: 'Success',
                    msg: `Analysis has been deleted.`
                  }
                }))

              }, error => {
                this.saving = false;

                // dialog.close();
                const errorDialogData: ErrorDialogData = {
                  title: 'Oops, something went wrong ...',
                  subtitle: 'There was an error when deleting the analysis. Sorry!',
                  errorReport: {
                    title: error.name,
                    json: error.message
                  }
                }
                this.dialog.open(ErrorDialogComponent, {
                  data: errorDialogData
                });

                // alert(`Ooops. Something went wrong: ${error}`)
              })
          })
      }
    })

    return deleted$
  }



  callRunApi(apiCall: (fkProject: number) => Observable<O>) {
    this.loading = true;
    this.p.pkProject$.pipe(switchMap(fkProject => apiCall(fkProject)))
      .subscribe((r: O) => {
        this.results$.next(r);
        this.loading = false;
        // dialog.close();
      }, error => {
        this.loading = false;

        // dialog.close();
        const d: ErrorDialogData = {
          title: 'Oops, something went wrong ...',
          subtitle: 'There was an error when creating the analysis. Sorry!',
          errorReport: {
            title: error.name,
            json: error.message
          }
        }
        this.dialog.open(ErrorDialogComponent, {
          data: d
        });

        // alert(`Ooops. Something went wrong: ${error}`)
      })
  }

  callDownloadApi<DownloadResult>(apiCall: (fkProject: number) => Observable<DownloadResult>) {
    return this.p.pkProject$
      .pipe(first(pkProject => !!pkProject))
      .pipe(
        tap(() => this.loading = true),
        switchMap(pkProject => apiCall(pkProject)
          .pipe(
            catchError((error) => {
              this.loading = false;
              const d: ErrorDialogData = {
                title: 'Oops, something went wrong ...',
                subtitle: 'There was an error when downloading the data. Sorry!',
                errorReport: {
                  title: error.name,
                  json: error.message
                }
              }
              this.dialog.open(ErrorDialogComponent, {
                data: d
              });
              return of<DownloadResult>()
            })
          )
        ),
        tap(() => this.loading = false)
      )

  }

}
