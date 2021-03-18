import { ReduxModule } from '@kleiolab/lib-redux';
import { SdkLb3Module } from '@kleiolab/lib-sdk-lb3';
import { SdkLb4Module } from '@kleiolab/lib-sdk-lb4';
import { SocketsModule } from '@kleiolab/lib-sockets';
import { DateTimeModule } from '@kleiolab/lib-utils';
import { ReduxQueriesModule } from '../../lib/queries/module/redux-queries.module';

export const moduleImports = [
  SdkLb3Module.forRoot(),
  SdkLb4Module,
  SocketsModule.forRoot({ baseUrl: '' }),
  ReduxModule.forRoot(),
  ReduxQueriesModule,
  DateTimeModule
]
