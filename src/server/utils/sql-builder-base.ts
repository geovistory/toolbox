
/**
 * Abstract Class to be extended by sql builder
 * providing basic logic for building SQL
 */
export abstract class SqlBuilderBase {
  params: any[] = [];
  sql = '';

  addParam(val: any) {
    this.params.push(val);
    return '$' + this.params.length;
  }

  addParams(vals: any[]) {
    return vals.map(val => this.addParam(val)).join(',');
  }
}
