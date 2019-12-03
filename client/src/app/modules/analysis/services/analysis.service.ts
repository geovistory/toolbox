import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActiveProjectService, ProAnalysis, ProAnalysisApi, IAppState, AnalysisTabData } from 'app/core';
import { ErrorDialogComponent, ErrorDialogData } from 'app/shared/components/error-dialog/error-dialog.component';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { NgRedux } from '@angular-redux/store';
import { NotificationsAPIActions } from 'app/core/notifications/components/api/notifications.actions';
import { DialogCreateComponent, DialogCreateData, DialogCreateResult } from '../components/dialog-create/dialog-create.component';
import { ConfirmDialogData, ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService<I, O> {

  results$ = new BehaviorSubject<O>(null)

  loading: boolean;
  saving: boolean;
  fkAnalysisType: number
  pkEntity: number

  constructor(
    private analysisApi: ProAnalysisApi,
    private dialog: MatDialog,
    private p: ActiveProjectService,
    private not: NotificationsAPIActions,
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


  callRunApi(q: I) {
    this.p.pkProject$.pipe(first()).subscribe(pkProject => {
      this.loading = true;

      this.analysisApi.run(pkProject, this.fkAnalysisType, q).subscribe((r: O) => {
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
    })
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
          const proAnalysis = {
            fk_analysis_type: this.fkAnalysisType,
            fk_project: pkProject,
            analysis_definition,
            name: dialogResult.name,
            description: dialogResult.description
          } as ProAnalysis;
          this.p.pro$.analysis.upsert([proAnalysis], pkProject)
            .resolved$.pipe(first(x => !!x)).subscribe((data) => {
              this.saving = false;
              this.ngRedux.dispatch(this.not.addToast({
                type: 'success',
                options: {
                  title: 'Success',
                  msg: `Analysis has been saved. Name: '${data.items[0].name}'`
                }
              }))
              this.pkEntity = data.items[0].pk_entity;
              pkEntity$.next(data.items[0].pk_entity)
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
        this.p.pro$.analysis.upsert([proAnalysis], proAnalysis.fk_project)
          .resolved$.pipe(first(x => !!x)).subscribe((data) => {
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
            this.p.pro$.analysis.upsert([proAnalysis], currentData.fk_project)
              .resolved$.pipe(first(x => !!x)).subscribe((data) => {
                this.saving = false;
                this.ngRedux.dispatch(this.not.addToast({
                  type: 'success',
                  options: {
                    title: 'Success',
                    msg: `Analysis has been saved. Name: '${data.items[0].name}'`
                  }
                }))
                this.pkEntity = data.items[0].pk_entity;
                pkEntity$.next(data.items[0].pk_entity)
                this.p.addTab<AnalysisTabData>({
                  active: true,
                  component: 'analysis-detail',
                  icon: 'analysis',
                  pathSegment: 'analysisDetails',
                  data: {
                    pkEntity: data.items[0].pk_entity,
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
            this.p.pro$.analysis.upsert([proAnalysis], currentData.fk_project)
              .resolved$.pipe(first(x => !!x)).subscribe((data) => {
                this.saving = false;
                this.ngRedux.dispatch(this.not.addToast({
                  type: 'success',
                  options: {
                    title: 'Success',
                    msg: `Analysis has been saved. Name: '${data.items[0].name}'`
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
            this.p.pro$.analysis.delete([proAnalysis], proAnalysis.fk_project)
              .resolved$.pipe(first(x => !!x)).subscribe((deleted) => {
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


  callDownloadApi(q: I, fileType: string) {
    this.p.pkProject$.pipe(first()).subscribe(pkProject => {
      this.loading = true;

      this.analysisApi.runAndExport(pkProject, this.fkAnalysisType, q, fileType).subscribe((r: O) => {
        this.loading = false;

        const data = r as any;

        if (fileType === 'json') {
          const blob = new Blob([data], {
            type: 'text/json'
          });
          saveAs(blob, `table-export-${new Date().getTime()}.json`)

        } else if (fileType === 'csv') {
          const blob = new Blob([data], {
            type: 'text/comma-separated-values'
          });
          saveAs(blob, `table-export-${new Date().getTime()}.csv`)
        }


      }, error => {
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
      })
    })

  }


}
