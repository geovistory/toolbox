import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/context';
import {model, property} from '@loopback/repository';
import {param, post, Request, requestBody, RestBindings} from '@loopback/rest';
import {Roles} from '../components/authorization';
import {Postgres1DataSource} from '../datasources';
import {Header} from '../models/import-table-header.model';
import {ImportTable} from '../models/import-table.model';
import {SqlBuilderBase} from '../utils/sql-builder-base';

// TODO
// - securisation of communication with server
// - close after the table was uploaded, and then update the list (as it is already with texts)
// - change the name of the table into the name the user took

enum DataType {
  digital = 3287,
  column = 3291,
  string = 3292,
  number = 3293,
  label = 3295,
}

@model()
class ImportTableResponse {
  @property()
  duration?: number;

  @property()
  error?: string;

  @property()
  fk_digital?: number;
}

export class ImportTableController {

  constructor(
    @inject(RestBindings.Http.REQUEST)
    private req: Request,

    @inject('datasources.postgres1')
    public datasource: Postgres1DataSource,
  ) {}


  @authenticate('basic')
  @authorize({allowedRoles: [Roles.NAMESPACE_MEMBER]})
  @post('/import-table', {
    responses: {
      '200': {
        description: 'Import a table',
        content: {'application/json': {schema: {'x-ts-type': ImportTableResponse}}}
      },
    },
  })
  async importTable(
    @param.query.number('pkNamespace') pkNamespace: number,
    @requestBody()
    table: ImportTable
  ): Promise<ImportTableResponse> {
    const begin = new Date().getTime();

    ////// CHECKINGS //////

    //check consistency - columns name
    for (let i = 0; i < table.headers.length; i++) {
      if (!table.headers[i].colLabel || table.headers[i].colLabel === '') {
        return {error: "Inconsistency in column name <" + i + ">."};
      }
    }
    //check consistency - columns number + data dormat
    for (let i = 0; i < table.rows.length; i++) {
      //columns number
      if (table.rows[i].length !== table.headers.length) {
        return {error: "Inconsistency in columns number in row <" + i + ">."};
      }
      //data format
      for (let j = 0; j < table.rows[i].length; j++) {
        //number
        if (table.headers[j].type === 'number') {
          if (isNaN(parseFloat(table.rows[i][j] + ''))) {
            return {error: "Inconsistency in data format at cell: [" + i + ": " + j + "] ==> It should be a number."};
          }
        } else if (table.headers[j].type === 'string') {
          if (String(table.rows[i][j]) !== table.rows[i][j]) {
            return {error: "Inconsistency in data format at cell: [" + i + ": " + j + "] ==> It should be a string."};
          }
        }
      }
    }

    ////// IMPORTING //////
    let keyDigital: number, keysColumns: number[], keysRows: number[];

    try {
      await this.datasource.execute('BEGIN;');

      // first try, nothing has been done yet
      keyDigital = await createDigital(this.datasource, pkNamespace, table.tableName);
      // console.log('INFOS: Digital created');
      keysColumns = await createColumns(this.datasource, keyDigital, pkNamespace, table.headers);
      // console.log('INFOS: Columns created');
      await createTextProperty(this.datasource, keysColumns, table.headers, table.pk_language, pkNamespace);
      // console.log('INFOS: Text properties created');
      keysRows = await createRows(this.datasource, keyDigital, table.rows.length);
      // console.log('INFOS: Rows created');

      await createTablePartitionCell(this.datasource, keyDigital);
      // console.log('INFOS: Partition created');
      await this.datasource.execute('COMMIT;'); //this is necessary because we are creating a table, and we want to add element to it

      const tableToSend = table.rows.map(r => r.map(c => c + ''));
      await createCells(this.datasource, keyDigital, keysRows, keysColumns, table.headers.map(h => h.type), tableToSend);
      // console.log('INFOS: Cell creation sent');

    } catch (e) {
      await this.datasource.execute('ROLLBACK;');
      console.log(e);
      return {error: "Error occured during importation, please retry or contact support."};
    }

    await this.datasource.execute('COMMIT;');

    const end = new Date().getTime();
    const time = end - begin;

    return {
      duration: time,
      fk_digital: keyDigital
    };
  }
}

async function getDigital(datasource: Postgres1DataSource, fkNamespace: number, tableName: string): Promise<number> {
  const q = new SqlBuilderBase();
  q.sql = "SELECT pk_entity FROM data.digital WHERE (fk_namespace = " + q.addParam(fkNamespace) + " AND id_for_import_txt = " + q.addParam(tableName) + ");";
  return (await datasource.execute(q.sql, q.params))[0]?.pk_entity;
}

async function createDigital(datasource: Postgres1DataSource, fkNamespace: number, tableName: string): Promise<number> {
  const q = new SqlBuilderBase();
  q.sql = "INSERT INTO data.digital (fk_namespace, fk_system_type, id_for_import_txt, notes, metadata, \"string\" ) VALUES ("
    + q.addParam(fkNamespace) + ", "
    + q.addParam(DataType.digital) + ", "
    + q.addParam(tableName)
    + ", 'In id_for_import_txt: local file address',"
    + "NULL,"
    + "''" +
    ") RETURNING pk_entity;"
  return (await datasource.execute(q.sql, q.params))[0].pk_entity;
}

async function createColumns(datasource: Postgres1DataSource, fkDigital: number, fkNamespace: number, headers: Header[]): Promise<Array<number>> {
  let q = new SqlBuilderBase();
  q.sql = "INSERT INTO data.column (fk_digital, fk_namespace, id_for_import_txt, notes, metadata, fk_data_type, fk_column_content_type, is_imported ) VALUES"
  for (let i = 0; i < headers.length; i++) {
    // q.sql += "INSERT INTO data.column (fk_digital, fk_namespace, id_for_import_txt, notes, metadata, fk_data_type, fk_column_content_type, is_imported ) VALUES ("
    // + q.addParam(fkDigital) + ","
    // + q.addParam(fkNamespace) + ","
    // + q.addParam(headers[i].colLabel) + ","
    // + "'In field id_for_import_txt: original column label',"
    // + "('{\"importer_original_label\":\"" + q.addParam(headers[i].colLabel) + "\"}')::JSONB,"
    //   + q.addParam(headers[i].type == 'number' ? DataType.number : DataType.string) + ","
    //   + q.addParam(DataType.column) + ","
    //   + "TRUE"
    //   + ");";
    if (headers[i].colLabel == '' || !headers[i].colLabel) continue;
    const json = {"importer_original_label": headers[i].colLabel};
    q.sql += `(${q.addParam(fkDigital)}, ${q.addParam(fkNamespace)}, ${q.addParam(headers[i].colLabel)},'In field id_for_import_txt: original column label', ${q.addParam(json)}, ${q.addParam(headers[i].type == 'number' ? DataType.number : DataType.string)}, ${q.addParam(DataType.column)}, TRUE),`
  }
  await datasource.execute(q.sql.replace(/.$/, ';'), q.params); // /.$/ ==> last char of a string

  q = new SqlBuilderBase();
  q.sql = "SELECT pk_entity FROM data.column WHERE fk_digital = " + q.addParam(fkDigital) + " AND fk_namespace = " + q.addParam(fkNamespace) + " ORDER BY pk_entity ASC";
  const result = await datasource.execute(q.sql, q.params);
  return result.map((c: any) => c.pk_entity);
}

async function createTextProperty(datasource: Postgres1DataSource, colKeys: number[], headers: Header[], fkLanguage: number, fkNamespace: number): Promise<any> {
  const q = new SqlBuilderBase();
  q.sql = "INSERT INTO data.text_property(fk_entity, string, fk_language, fk_system_type, fk_namespace) VALUES "
  for (let i = 0; i < colKeys.length; i++) {
    q.sql += `(${q.addParam(colKeys[i])}, ${q.addParam(headers[i].colLabel)},  ${q.addParam(fkLanguage)},  ${q.addParam(DataType.label)},  ${q.addParam(fkNamespace)}),`;
  }
  await datasource.execute(q.sql.replace(/.$/, ';'), q.params); // /.$/ ==> last char of a string
}

async function createRows(datasource: Postgres1DataSource, fkDigital: number, rowsNb: number): Promise<Array<number>> {
  let q = new SqlBuilderBase();
  q.sql = 'INSERT INTO tables.row (fk_digital) VALUES ';
  const temp = "(" + q.addParam(fkDigital) + "),";
  for (let i = 0; i < rowsNb; i++) q.sql += temp; //perf are ok: on my pc (average) 1 million actions like this took 102 ms
  await datasource.execute(q.sql.replace(/.$/, ';'), q.params); // /.$/ ==> last char of a string

  q = new SqlBuilderBase();
  q.sql = "SELECT pk_row FROM tables.row WHERE fk_digital = " + q.addParam(fkDigital) + " ORDER BY pk_row ASC";
  const result = await datasource.execute(q.sql, q.params);
  return result.map((r: any) => r.pk_row);
}

async function createTablePartitionCell(datasource: Postgres1DataSource, fkDigital: number): Promise<any> {
  const q = new SqlBuilderBase();
  q.sql = "SELECT tables.create_cell_table_for_digital(" + q.addParam(fkDigital) + ");";
  await datasource.execute(q.sql, q.params); //since we access the same datasource, and there's no repository for tables
}

async function createCells(datasource: Postgres1DataSource, fkDigital: number, rowKeys: number[], colKeys: number[], types: ('string' | 'number')[], table: string[][]): Promise<any> {
  let q = new SqlBuilderBase();
  let nb = 0;
  const beginSQL = `INSERT INTO tables.cell_${fkDigital} (fk_digital, fk_row, fk_column,string_value, numeric_value) VALUES `;
  q.sql = beginSQL;

  for (let i = 0; i < rowKeys.length; i++) {
    for (let j = 0; j < colKeys.length; j++) {
      if (table[i][j] === '' || !table[i][j]) continue; //only cells with values are produced
      q.sql += `(${q.addParam(fkDigital)}, ${q.addParam(rowKeys[i])}, ${q.addParam(colKeys[j])}, ${q.addParam(types[j] === 'string' ? table[i][j] : null)}, ${q.addParam(types[j] === 'number' ? parseFloat(table[i][j].trim().replace(/,/g, '.')) : null)}),`
      nb++;
      if (nb * 5 % 20000 === 0) {
        await datasource.execute(q.sql.replace(/.$/, ';'), q.params); // /.$/ ==> last char of a string
        q = new SqlBuilderBase();
        q.sql = beginSQL;

        // console.log('Advancement: ' + Math.round(((i * colKeys.length + j) / (rowKeys.length * colKeys.length)) * 100) + '%');
      }

    }
  }
  if (q.sql.substring(q.sql.length - 1) === ' ') return; // if there is a values to add
  await datasource.execute(q.sql.replace(/.$/, ';'), q.params); // /.$/ ==> last char of a string
  // console.log('Advancement: 100%');
}
