import {inject} from '@loopback/context';
import {post, Request, requestBody, ResponseObject, RestBindings} from '@loopback/rest';
import {Postgres1DataSource} from '../datasources';
import {Header} from '../models/import-table-header.model';
import {ImportTable} from '../models/import-table.model';

enum DataType {
  digital = 3287,
  column = 3291,
  string = 3292,
  number = 3293,
  label = 3295,
}

const IMPORTTABLE_RESPONSE: ResponseObject = {
  description: 'Import table Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'ImporTableResponse',
        properties: {
          result: {type: 'string'}
        },
      },
    },
  },
};

export class ImportTableController {

  constructor(
    @inject(RestBindings.Http.REQUEST)
    private req: Request,

    @inject('datasources.postgres1')
    public datasource: Postgres1DataSource,
  ) {}


  @post('/import-table', {responses: {'200': IMPORTTABLE_RESPONSE, }, })
  async importTable(
    @requestBody()
    table: ImportTable
  ): Promise<object> {


    console.log(JSON.stringify(table));
    return {error: "blablabla"};

    const begin = new Date().getTime();

    ////// CHECKINGS //////

    //check consistency - columns name
    for (let i = 0; i < table.headers.length; i++) {
      if (!table.headers[i].colLabel || table.headers[i].colLabel == '') {
        return {error: "Inconsistency in column name <" + i + ">"};
      }
    }
    //check consistency - columns number + data dormat
    for (let i = 0; i < table.rows.length; i++) {
      //columns number
      if (table.rows[i].length != table.headers.length) {
        return {error: "Inconsistency in columns number in row <" + i + ">"};
      }
      //data format
      for (let j = 0; j < table.rows[i].length; j++) {
        //number
        if (table.headers[j].type == 'number') {
          if (isNaN(parseFloat(table.rows[i][j]))) {
            return {error: "Inconsistency in data format at cell: [" + i + ", " + j + "] ==> It should be a number"};
          }
        } else if (table.headers[j].type == 'string') {
          if (String(table.rows[i][j]) != table.rows[i][j]) {
            return {error: "Inconsistency in data format at cell: [" + i + ", " + j + "] ==> It should be a string"};
          }
        }
      }
    }

    ////// IMPORTING //////

    try {
      this.datasource.execute('BEGIN;');
      let key_digital: number, keys_columns: number[], keys_rows: number[];

      key_digital = await getDigital(this.datasource, table.pk_namespace, table.tableName);

      if (!key_digital) {
        // first try, nothing has been done yet
        key_digital = await createDigital(this.datasource, table.pk_namespace, table.tableName);
        keys_columns = await createColumns(this.datasource, key_digital, table.pk_namespace, table.headers);
        await createTextProperty(this.datasource, keys_columns, table.headers, table.pk_language, table.pk_namespace);
        keys_rows = await createRows(this.datasource, key_digital, table.rows.length);

        await createTablePartition_cell(this.datasource, key_digital);
        await this.datasource.execute('COMMIT;'); //this is necessary because we are creating a table, and we want to add element to it

      } else {
        return {error: "This table already exists in this namespace."}
      }

      let tableToSend = table.rows.map(r => r.map(c => c)); //CORRECTED: Because API can not receive string[][]
      await createCells(this.datasource, key_digital, keys_rows, keys_columns, table.headers.map(h => h.type), tableToSend);

    } catch (e) {
      await this.datasource.execute('ROLLBACK;');
      return {error: "Error occured during importation, please retry or contact support"};
    }

    await this.datasource.execute('COMMIT;');

    const end = new Date().getTime();
    let time = end - begin;


    return {result: true};
  }
}

async function getDigital(datasource: any, fkNamespace: number, tableName: string) {
  let sql = "SELECT pk_entity FROM data.digital WHERE (fk_namespace = " + fkNamespace + " AND id_for_import_txt = '" + tableName + "')";
  let key = (await datasource.execute(sql))[0]?.pk_entity;
  return key;
}

async function createDigital(datasource: any, fkNamespace: number, tableName: string) {
  let sql = '';
  sql = "INSERT INTO data.digital (fk_namespace, fk_system_type, id_for_import_txt, notes, metadata, \"string\" ) VALUES ("
    + fkNamespace + ", "
    + DataType.digital + " , '"
    + tableName
    + "', 'In id_for_import_txt: local file address',"
    + "NULL,"
    + "''" +
    ") RETURNING pk_entity "
  let result = (await datasource.execute(sql))[0].pk_entity;
  return result
}

async function createColumns(datasource: any, fkDigital: number, fkNamespace: number, headers: Header[]) {
  let sql = '';
  for (let i = 0; i < headers.length; i++) {
    sql += "INSERT INTO data.column (fk_digital, fk_namespace, id_for_import_txt, notes, metadata, fk_data_type, fk_column_content_type, is_imported ) VALUES ("
      + fkDigital + ","
      + fkNamespace + ","
      + "'" + headers[i].colLabel + "',"
      + "'In field id_for_import_txt: original column label',"
      + "('{\"importer_original_label\":\"" + headers[i].colLabel + "\"}')::JSONB,"
      + (headers[i].type == 'number' ? DataType.number : DataType.string) + ","
      + "'" + DataType.column + "',"
      + "TRUE"
      + ");";
  }

  await datasource.execute(sql);

  let result = await datasource.execute('SELECT pk_entity FROM data.column WHERE fk_digital = ' + fkDigital + ' AND fk_namespace = ' + fkNamespace + " ORDER BY pk_entity ASC");
  let keys = result.map((c: any) => c.pk_entity);
  return keys;
}

async function createTextProperty(datasource: any, colKeys: number[], headers: Header[], fkLanguage: number, fkNamespace: number) {
  let sql = '';
  for (let i = 0; i < colKeys.length; i++) {
    sql += "INSERT INTO data.text_property(fk_entity, string, fk_language, fk_system_type, fk_namespace) VALUES("
      + colKeys[i] + ","
      + "'" + headers[i].colLabel + "',"
      + fkLanguage + ","
      + DataType.label + ","
      + fkNamespace
      + ");";
  }
  await datasource.execute(sql);
  return;
}

async function createRows(datasource: any, fkDigital: number, rowsNb: number) {
  let sql = "";
  let temp = "INSERT INTO tables.row (fk_digital) VALUES (" + fkDigital + ");";
  for (let i = 0; i < rowsNb; i++) sql += temp; //perf are ok: on my pc (average) 1 million actions like this took 102 ms

  await datasource.execute(sql);

  let result = await datasource.execute("SELECT pk_row FROM tables.row WHERE fk_digital = " + fkDigital + " ORDER BY pk_row ASC");
  let keys = result.map((r: any) => r.pk_row);

  return keys;
}

async function createTablePartition_cell(datasource: any, fkDigital: number) {
  let sql = "";
  sql = "SELECT tables.create_cell_table_for_digital(" + fkDigital + ");";
  await datasource.execute(sql); //since we access the same datasource, and there's no repository for tables
}

async function createCells(datasource: any, fkDigital: number, rowKeys: number[], colKeys: number[], types: ('string' | 'number')[], table: string[][]) {
  let sql = "";
  let nb = 0;
  for (let i = 0; i < rowKeys.length; i++) {
    for (let j = 0; j < colKeys.length; j++) {
      if (table[i][j] == '' || !table[i][j]) continue; //only cells with values are produced

      let fieldName = types[j] == 'string' ? 'string_value' : 'numeric_value';
      sql += "INSERT INTO tables.cell_" + fkDigital + " (fk_digital, fk_row, fk_column," + fieldName + ") VALUES("
        + fkDigital + ","
        + rowKeys[i] + ","
        + colKeys[j] + ","
        + "'" + table[i][j] + "');\n";
      nb++;
      if (nb % 200000 == 0) {
        await datasource.execute(sql);
        sql = "";
      }
    }
  }
  await datasource.execute(sql);
}
