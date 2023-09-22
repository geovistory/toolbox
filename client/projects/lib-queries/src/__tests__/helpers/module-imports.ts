import { ReduxModule } from '@kleiolab/lib-redux';
import { SdkLb4Module } from '@kleiolab/lib-sdk-lb4';
import { SocketsModule } from '@kleiolab/lib-sockets';
import { DateTimeModule } from '@kleiolab/lib-utils';
import { ReduxQueriesModule } from '../../lib/queries/module/redux-queries.module';

export const moduleImports = [
  SdkLb4Module,
  SocketsModule,
  ReduxModule,
  ReduxQueriesModule,
  DateTimeModule
]
