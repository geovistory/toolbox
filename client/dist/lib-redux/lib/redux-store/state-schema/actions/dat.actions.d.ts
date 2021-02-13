import { NgRedux } from '@angular-redux/store';
import { DatChunk, DatColumn, DatDigital, DatNamespace, DatTextProperty } from '@kleiolab/lib-sdk-lb3';
import { DatClassColumnMapping } from '@kleiolab/lib-sdk-lb4';
import { IAppState } from '../../root/models/model';
import { ChunkSlice, ClassColumnMappingSlice, ColumnSlice, DigitalSlice, NamespaceSlice, TextPropertySlice } from '../models/dat.models';
import { ActionResultObservable, LoadActionMeta, SchemaActionsFactory } from '../_helpers/schema-actions-factory';
export declare class DigitalActionsFactory extends SchemaActionsFactory<DigitalSlice, DatDigital> {
    ngRedux: NgRedux<IAppState>;
    static readonly LOAD_VERSION = "LOAD_VERSION";
    /**
     * Load a version. if entityVersion omitted, latest version is returned.
     */
    loadVersion: (pkEntity: number, entityVersion?: number) => ActionResultObservable<DatDigital>;
    constructor(ngRedux: NgRedux<IAppState>);
    createActions(): DigitalActionsFactory;
}
export interface LoadChunksOfDigitalAction extends LoadActionMeta {
    pkDigital: number;
}
export declare class ChunkActionsFactory extends SchemaActionsFactory<ChunkSlice, DatChunk> {
    ngRedux: NgRedux<IAppState>;
    static readonly CHUNKS_OF_DIGITAL = "CHUNKS_OF_DIGITAL";
    /**
     * Load a version. if entityVersion omitted, latest version is returned.
     */
    loadChunksOfDigital: (pkDigital: number, pk: number) => ActionResultObservable<DatChunk>;
    constructor(ngRedux: NgRedux<IAppState>);
    createActions(): ChunkActionsFactory;
}
export interface LoadColumnsOfTableAction extends LoadActionMeta {
    pkDigital: number;
}
export declare class ColumnActionsFactory extends SchemaActionsFactory<ColumnSlice, DatColumn> {
    ngRedux: NgRedux<IAppState>;
    static readonly COLUMNS_OF_TABLE = "COLUMNS_OF_TABLE";
    /**
     * Load a version. if entityVersion omitted, latest version is returned.
     */
    loadColumnsOfTable: (pkDigital: number, pk: number) => ActionResultObservable<DatColumn>;
    constructor(ngRedux: NgRedux<IAppState>);
    createActions(): ColumnActionsFactory;
}
export declare class DatActions {
    ngRedux: NgRedux<IAppState>;
    digital: DigitalActionsFactory;
    chunk: ChunkActionsFactory;
    column: ColumnActionsFactory;
    class_column_mapping: SchemaActionsFactory<ClassColumnMappingSlice, DatClassColumnMapping>;
    namespace: SchemaActionsFactory<NamespaceSlice, DatNamespace>;
    text_property: SchemaActionsFactory<TextPropertySlice, DatTextProperty>;
    constructor(ngRedux: NgRedux<IAppState>);
}
