import { NgRedux } from '@angular-redux/store';
import { IAppState, SchemaService } from '@kleiolab/lib-redux';
import { InfLanguage, ProProject, WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { EntityPreviewSocket } from '@kleiolab/lib-sockets';
import { Observable } from 'rxjs';
import { SchemaSelectorsService } from './schema-selectors.service';
export declare class ActiveProjectPipesService {
    private ngRedux;
    private s;
    private entityPreviewSocket;
    private schemaService;
    pkProject$: Observable<number>;
    requestedEntityPreviews: {
        [pkEntity: number]: boolean;
    };
    constructor(ngRedux: NgRedux<IAppState>, s: SchemaSelectorsService, entityPreviewSocket: EntityPreviewSocket, schemaService: SchemaService);
    pipeActiveProject(): Observable<ProProject>;
    pipeActiveDefaultLanguage(): Observable<InfLanguage>;
    /**
     * Loads a data unit preview, if it is not yet available in state or if
     * forceReload is true;
     *
     * @param pkEntity
     * @param forceReload
     */
    streamEntityPreview(pkEntity: number, forceReload?: boolean): Observable<WarEntityPreview>;
    /**
     * Adds the entity previews to the streamed entity previews (for ws communication)
     * @param object
     * @param pkProject
     */
    private extendEntityPreviewStream;
}
