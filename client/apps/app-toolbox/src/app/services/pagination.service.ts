import { Injectable } from '@angular/core';
import { Field, StateFacade, subfieldIdToString } from '@kleiolab/lib-redux';
import { GvFieldPageReq, GvFieldPageScope, GvFieldSourceEntity, WarFieldChange, WarFieldChangeAddToStream, WarFieldChangeId } from '@kleiolab/lib-sdk-lb4';
import { FieldChangeSocket } from '@kleiolab/lib-sockets';
import { indexBy } from 'ramda';
import { Observable, Subject, interval } from 'rxjs';
import { bufferWhen, filter, first } from 'rxjs/operators';
import { fieldPageToWarFieldChangeId } from '../lib/converters/fieldPageToWarFieldChangeId';
import { fieldToFieldPage } from '../lib/converters/fieldToFieldPage';
import { fieldToGvFieldTargets } from '../lib/converters/fieldToGvFieldTargets';


interface Loader {
  refCount: number; // the number of references / subscribers that currently watch the page
  until$: Subject<any>; // an observable for that emits, as soon as the page loader is not needed anymore
  req: GvFieldPageReq;
  fieldChangeId: string;
  isUpToDateUntil?: Date; // the date, for which the loaded page data is valid (this is a date returned by the backend)
}

@Injectable({
  providedIn: 'root'
})
export class PaginationService {


  /**
   * pageLoaders maps pageIdString (crteated form GvFieldId + limit + offset)
   * to an object holding information about the state of the pageLoader
   */
  private pageLoaders = new Map<string, Loader>()

  /**
  * fieldChangeListeners maps a fieldChangeIdString (created from WarFieldChangeId)
  * to an array of pageIdString (crteated form GvFieldId + limit + offset)
  *
  * The reason behind is:
  * a field change can make trigger multiple page loaders to (re-)load
  */
  private fieldChangeListeners = new Map<string, {
    fieldChangeId: WarFieldChangeId,
    pageIds: string[]
  }>()

  addLoader$ = new Subject<{ loader: Loader, pageIdString: string, takeUntil$: Observable<any> }>()
  loadQueue$: Observable<{ loader: Loader, pageIdString: string, takeUntil$: Observable<any> }[]>

  addReloader$ = new Subject<{ loader: Loader, pageIdString: string }>()
  reloadQueue$: Observable<{ loader: Loader, pageIdString: string }[]>

  constructor(
    private state: StateFacade,
    private fieldChangeSocket: FieldChangeSocket
  ) {
    this.loadQueue$ = this.addLoader$
      // .pipe(map(x => [x]))
      .pipe(
        bufferWhen(() => interval(0)),
        filter((events) => events.length > 0)
      )
    this.reloadQueue$ = this.addReloader$
      // .pipe(map(x => [x]))
      .pipe(
        // map(r => [r])
        bufferWhen(() => interval(0)),
        filter((events) => events.length > 0)
      )
    this.subscribeToPageLoadRequests()
    this.subscribeToPageReloadRequests()

    // listen to field changes
    this.fieldChangeSocket.fromEvent<WarFieldChange>('fieldChange')
      .subscribe(fieldChange => {

        // is there a fieldChangeListener for the current fieldChange?
        const fcId = this.fieldChangeToStringId(fieldChange);
        const fieldChangedDate = new Date(fieldChange.tmsp_last_modification)
        this._reloadPagesOfField(fcId, fieldChangedDate);
      });

    // get all FieldChangeIds and send them to the
    // server so that they will be streamed. This is important for
    // when connection was lost.
    this.fieldChangeSocket.fromEvent('reconnect').subscribe(disconnect => {
      this.state.pkProject$.pipe(first()).subscribe(pkProject => {
        const addMsg: WarFieldChangeAddToStream = {
          pkProject,
          fieldIds: []
        }
        this.fieldChangeListeners.forEach(i => {
          addMsg.fieldIds.push(i.fieldChangeId)
        })
        fieldChangeSocket.emit(`${FieldChangeSocket.NAMESPACE}::addToStream`, addMsg)
      })
    })
  }

  reloadPagesOfField(id: WarFieldChangeId, fieldChangedDate?: Date) {
    this._reloadPagesOfField(this.fieldChangeToStringId(id), fieldChangedDate)
  }

  /**
   *
   * @param fieldChangeId string identifying the field
   * @param fieldChangedDate
   */
  private _reloadPagesOfField(fieldChangeId: string, fieldChangedDate?: Date) {
    const fcListener = this.fieldChangeListeners.get(fieldChangeId)
    if (fcListener && fcListener.pageIds.length) {
      // iterate over all pageLoaders that are affected by the fieldChangeDate
      fcListener.pageIds.forEach(pageIdString => {
        const loader = this.pageLoaders.get(pageIdString);
        if (loader && (
          // is there no date on the page loader, or
          (!loader.isUpToDateUntil ||
            // is ther no fieldChangeDate, or
            !fieldChangedDate || // is the date of the page loader older than the fieldChangeDate?
            loader.isUpToDateUntil < fieldChangedDate))) {
          // load page
          if (loader && loader.req) {
            this.addReloader$.next({ loader, pageIdString })
          }
        }
      });
    }
  }

  /**
   * Wrapper around addPageLoader, skipping the api call
   * @param fieldPageReq
   * @param takeUntil$
   * @returns
   */
  public listenToPageUpdates(
    fieldPageReq: GvFieldPageReq,
    takeUntil$: Observable<any>,
  ) {
    return this.addPageLoader(fieldPageReq, takeUntil$, false)
  }

  /**
   *
   * @param fieldPageReq
   * @param takeUntil$
   * @param loadOnInit if true, it loads the data from Rest API when the pageLoader is added the first time
   */
  public addPageLoader(
    fieldPageReq: GvFieldPageReq,
    takeUntil$: Observable<any>,
    loadOnInit = true
  ) {
    const { pageIdString, fieldPage, pkProject } = this.parseFieldPageRequest(fieldPageReq);


    if (!this.pageLoaders.has(pageIdString)) {


      const warFieldChangeId: WarFieldChangeId = fieldPageToWarFieldChangeId(fieldPage)

      // extend stream of fieldChange
      this.extendFieldChangeStream(pkProject, warFieldChangeId);

      // add pageIdString to fieldChangeListener
      const fcIdString = this.addFieldChangeListener(warFieldChangeId, pageIdString);

      // add to internal list of field loaders
      this.addFieldLoader(pageIdString, fcIdString, fieldPageReq);

      // load the page
      if (loadOnInit) this.loadPageAndAddSubfieldListeners(pageIdString, takeUntil$);

    } else {
      this.increaseFieldLoaderRefCount(pageIdString);
    }

    const sub = takeUntil$.subscribe(() => {
      const loader = this.pageLoaders.get(pageIdString)
      if (loader.refCount === 1) {
        this.removeFieldLoaderAndFieldChangeListener(loader, pageIdString, pkProject);
      } else {
        this.decreaseFieldLoaderRefCount(pageIdString, loader);
      }
      sub.unsubscribe()
    })
    return this.pageLoaders.get(pageIdString)

  }


  private decreaseFieldLoaderRefCount(pageIdString: string, loader: {
    refCount: number; // the number of references / subscribers that currently watch the page
    // the number of references / subscribers that currently watch the page
    until$: Subject<any>; // an observable for that emits, as soon as the page loader is not needed anymore
    // an observable for that emits, as soon as the page loader is not needed anymore
    req: GvFieldPageReq;
    fieldChangeId: string;
    isUpToDateUntil?: Date; // the date, for which the loaded page data is valid (this is a date returned by the backend)
  }) {
    this.pageLoaders.set(pageIdString, {
      ...loader,
      until$: loader.until$,
      refCount: loader.refCount - 1
    });
  }

  private removeFieldLoaderAndFieldChangeListener(loader: {
    refCount: number; // the number of references / subscribers that currently watch the page
    // the number of references / subscribers that currently watch the page
    until$: Subject<any>; // an observable for that emits, as soon as the page loader is not needed anymore
    // an observable for that emits, as soon as the page loader is not needed anymore
    req: GvFieldPageReq;
    fieldChangeId: string;
    isUpToDateUntil?: Date; // the date, for which the loaded page data is valid (this is a date returned by the backend)
  }, pageIdString: string, pkProject: number) {
    loader.until$.next(undefined);
    // remove the page from the fieldChangeListener
    const fcListener = this.fieldChangeListeners.get(loader.fieldChangeId);
    const pageIds = fcListener.pageIds.filter(pageId => pageId !== pageIdString);
    if (pageIds.length === 0) {
      // remove the fieldChangeListener
      this.fieldChangeListeners.delete(loader.fieldChangeId);
      // remove fieldChangeListerner from stream
      const msg: WarFieldChangeAddToStream = { pkProject, fieldIds: [fcListener.fieldChangeId] };
      this.fieldChangeSocket.emit(`${FieldChangeSocket.NAMESPACE}::removeFromStream`, msg);
    }
    else {
      this.fieldChangeListeners.set(loader.fieldChangeId, { ...fcListener, pageIds });
    }
    this.pageLoaders.delete(pageIdString);
  }

  private increaseFieldLoaderRefCount(pageIdString: string) {
    const loader = this.pageLoaders.get(pageIdString);
    this.pageLoaders.set(pageIdString, {
      ...loader,
      until$: loader.until$,
      refCount: loader.refCount + 1
    });
  }

  private addFieldLoader(pageIdString: string, fcIdString: string, fieldPageReq: GvFieldPageReq) {
    this.pageLoaders.set(pageIdString, {
      fieldChangeId: fcIdString,
      refCount: 1,
      until$: new Subject<void>(),
      req: fieldPageReq
    });
  }

  private addFieldChangeListener(warFieldChangeId: WarFieldChangeId, pageIdString: string) {
    const fcIdString = this.fieldChangeToStringId(warFieldChangeId);
    const fcListener = this.fieldChangeListeners.get(fcIdString);
    const pageIds = fcListener ? fcListener.pageIds : [];
    this.fieldChangeListeners.set(fcIdString, {
      fieldChangeId: warFieldChangeId,
      pageIds: [...pageIds, pageIdString]
    });
    return fcIdString;
  }

  private extendFieldChangeStream(pkProject: number, warFieldChangeId: WarFieldChangeId) {
    const addMsg: WarFieldChangeAddToStream = {
      pkProject,
      fieldIds: [warFieldChangeId]
    };
    this.fieldChangeSocket.emit(`${FieldChangeSocket.NAMESPACE}::extendStream`, addMsg);
  }


  /**
   * Flattens the fieldPageReq and returns individual parameters that are easier to consume
   * than from the nested object.
   */
  private parseFieldPageRequest(fieldPageReq: GvFieldPageReq) {
    const fieldPage = fieldPageReq.page;
    const pkProject = fieldPageReq.pkProject;
    const fieldTargets = fieldPageReq.targets;
    const limit = fieldPage.limit;
    const offset = fieldPage.offset;
    const scope = fieldPage.scope;
    const source = fieldPage.source;
    const subfieldIdString = subfieldIdToString(fieldPage);
    const pageIdString = subfieldIdString + '_' + limit + '_' + offset;

    return { pageIdString, fieldPage, pkProject, fieldTargets, source, scope, limit, offset };
  }

  subscribeToPageReloadRequests() {
    this.reloadQueue$.subscribe((items) => {
      const reqs = items.map(item => item.loader.req)
      const options = indexBy((i) => i.pageIdString, items)
      this.state.data.loadFieldPage(reqs).pipe(first()).subscribe(
        res => {
          res.subfieldPages.forEach(fieldpage => {
            const { pageIdString } = this.parseFieldPageRequest(fieldpage.req)
            const item = options[pageIdString]
            // set the isUpToDateUntil of the loader
            if (item) {
              this.pageLoaders.set(pageIdString, {
                ...item.loader,
                isUpToDateUntil: new Date(res.subfieldPages[0].validFor)
              })
            }
          })

        }
      );
    })
  }
  subscribeToPageLoadRequests() {
    this.loadQueue$.subscribe((items) => {
      const reqs = items.map(item => item.loader.req)
      const options = indexBy((i) => i.pageIdString, items)
      this.state.data.loadFieldPage(reqs).pipe(first()).subscribe(
        res => {
          res.subfieldPages.forEach(fieldpage => {
            const { pageIdString } = this.parseFieldPageRequest(fieldpage.req)
            const item = options[pageIdString]
            if (item) {
              // set the isUpToDateUntil of the loader
              this.pageLoaders.set(pageIdString, {
                ...item.loader,
                isUpToDateUntil: new Date(res.subfieldPages[0].validFor)
              })
            }
          })

        }
      );
    })
  }
  private loadPageAndAddSubfieldListeners(pageIdString: string, takeUntil$: Observable<any>) {
    const loader = this.pageLoaders.get(pageIdString)
    if (loader && loader.req) {
      this.addLoader$.next({ loader, pageIdString, takeUntil$ })
    }

  }

  public addPageLoaderFromField(
    pkProject: number,
    field: Field,
    source: GvFieldSourceEntity,
    limit,
    offset,
    takeUntil$: Observable<any>,
    scope: GvFieldPageScope,
  ) {
    const req: GvFieldPageReq = {
      pkProject,
      targets: fieldToGvFieldTargets(field),
      page: fieldToFieldPage(field, source, scope, limit, offset),
    }
    return this.addPageLoader(req, takeUntil$)
  }


  private fieldChangeToStringId(i: WarFieldChangeId): string {
    return `${i.fk_project || 0}_${i.fk_source_info || 0}_${i.fk_source_tables_cell || 0}_${i.fk_property || 0}_${i.is_outgoing}`
  }
}
