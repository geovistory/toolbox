import {
  bind, Binding,
  BindingScope, Component,
  ContextTags,
  ProviderMap
} from '@loopback/core';
import {QueryBindings} from './keys';
import {QTableColumns} from './q-table-columns';



@bind({tags: {[ContextTags.KEY]: QueryBindings.COMPONENT}})
export class QueryComponent implements Component {
  providers: ProviderMap;
  bindings: Binding<unknown>[];

  constructor(
  ) {
    this.setupBindings();
  }

  private setupBindings() {
    this.bindings = [
      Binding.bind(QueryBindings.qTableColumns).toClass(QTableColumns).inScope(BindingScope.SINGLETON),
    ];
  }
}
