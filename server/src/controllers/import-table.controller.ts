import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';
import { inject } from '@loopback/context';
import { model, property } from '@loopback/repository';
import { param, post, requestBody } from '@loopback/rest';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Socket } from 'socket.io';
import { Roles } from '../components/authorization';
import { Postgres1DataSource } from '../datasources';
import { ws } from '../decorators/websocket.decorator';
import { Header } from '../models/import-table-header.model';
import { ImportTable } from '../models/import-table.model';
import { SqlBuilderBase } from '../utils/sql-builders/sql-builder-base';

enum DataType {
  digital = 3287,
  value = 3291,
  string = 3292,
  number = 3293,
  label = 3295,
}

@model()
class ImportTableResponse {
  @property()
  error?: string;

  @property()
  fk_digital?: number;
}

const feedBacks: { [key: number]: BehaviorSubject<{ id: number, advancement: number, infos: string }> } = {};

@ws('/ImportTable')
export class ImportTableController {

  subscriptions: Subscription[] = [];
  subscriptionsCache: { [key: number]: true } = {};

  socket?: Socket;

  constructor(
    @inject('datasources.postgres1')
    public datasource: Postgres1DataSource,
  ) { }


  @authenticate('basic')
  @authorize({ allowedRoles: [Roles.NAMESPACE_MEMBER] })
  @post('/import-table', {
    responses: {
      '200': {
        description: 'Import a table',
        content: { 'application/json': { schema: { 'x-ts-type': ImportTableResponse } } }
      },
    },
  })
  async importTable(
    @param.query.number('pkNamespace') pkNamespace: number,
    @requestBody()
    table: ImportTable
  ): Promise<ImportTableResponse> {

    ////// CHECKINGS //////
    //check consistency - columns name
    for (let i = 0; i < table.headers.length; i++) {
      if (!table.headers[i].colLabel || table.headers[i].colLabel === '') {
        return { error: "Inconsistency in column name <" + i + ">." };
      }
    }
    //check consistency - columns number + data dormat
    for (let i = 0; i < table.rows.length; i++) {
      //columns number
      if (table.rows[i].length !== table.headers.length) {
        return { error: "Inconsistency in columns number in row <" + i + ">." };
      }
      //data format
      for (let j = 0; j < table.rows[i].length; j++) {
        //number
        if (table.headers[j].type === 'number') {
          if (isNaN(parseFloat(table.rows[i][j] + ''))) {
            return { error: "Inconsistency in data format at cell: [" + i + ": " + j + "] ==> It should be a number." };
          }
        } else if (table.headers[j].type === 'string') {
          if (String(table.rows[i][j]) !== table.rows[i][j]) {
            return { error: "Inconsistency in data format at cell: [" + i + ": " + j + "] ==> It should be a string." };
          }
        }
      }
    }

    const digital = await createDigital(this.datasource, pkNamespace, table.tableName);
    feedBacks[digital] = new BehaviorSubject({ id: digital, advancement: 0, infos: '[1/6] Digital creation ... Done' });

    await this.datasource.execute('BEGIN;');
    const keysColumns = await createColumns(this.datasource, digital, pkNamespace, table.headers);
    await createTextProperty(digital, this.datasource, keysColumns, table.headers, table.pk_language, pkNamespace);

    const keysRows = await createRows(this.datasource, digital, table.rows.length);
    await createTablePartitionCell(this.datasource, digital);
    await this.datasource.execute('COMMIT;'); //importer is necessary because we are creating a table, and we want to add element to it

    ////// IMPORTING //////
    (async function (importer, keyDigital) {

      try {
        const tableToSend = table.rows.map(r => r.map(c => c + ''));
        await createCells(importer.datasource, keyDigital, keysRows, keysColumns, table.headers.map(h => h.type), tableToSend);

      } catch (e) {
        await importer.datasource.execute('ROLLBACK;');
        console.log(e);
        feedBacks[digital].next({ id: digital, advancement: 100, infos: 'Error occured' })
        delete feedBacks[digital];
      }

      await importer.datasource.execute('COMMIT;');
      feedBacks[digital].next({ id: digital, advancement: 100, infos: "Your table has correctly been imported" });
      feedBacks[digital].complete();
      delete feedBacks[digital];

    })(this, digital)

    return {
      // eslint-disable-next-line @typescript-eslint/camelcase
      fk_digital: digital
    };
  }

  /************************ WEBSOCKET ****************************/
  @ws.connect()
  connect(socket: Socket) {
    this.socket = socket;
  }

  @ws.disconnect()
  disconnect() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptionsCache = {};
  }

  @ws.subscribe('listenDigitals')
  listenDigitals(digitals: number[]) {

    const importingList = [];
    for (const dig of digitals) {
      if (feedBacks[dig] && !this.subscriptionsCache[dig]) {
        importingList.push({ id: dig, advancement: feedBacks[dig].value.advancement, infos: feedBacks[dig].value.infos });
        this.subscriptions.push(feedBacks[dig].subscribe(state => {
          if (this.socket) {
            this.socket.emit('state_' + state.id, state);
          }
          else throw new Error('Impossible error');
        }));
        this.subscriptionsCache[dig] = true;
      } else if (this.socket) this.socket.emit('state_' + dig, { id: dig, advancement: 100, infos: 'inexisting' });
      else throw new Error('Impossible error');
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    ") RETURNING pk_entity;";
  return (await datasource.execute(q.sql, q.params))[0].pk_entity;
}

async function createColumns(datasource: Postgres1DataSource, fkDigital: number, fkNamespace: number, headers: Header[]): Promise<Array<number>> {
  feedBacks[fkDigital].next({ id: fkDigital, advancement: 0, infos: '[2/6] Columns creation ...' });
  let q = new SqlBuilderBase();
  q.sql = "INSERT INTO data.column (fk_digital, fk_namespace, id_for_import_txt, notes, metadata, fk_data_type, fk_column_content_type, is_imported ) VALUES"
  for (const header of headers) {
    if (header.colLabel === '' || !header.colLabel) continue;
    const json = { "importer_original_label": header.colLabel };
    q.sql += `(${q.addParam(fkDigital)}, ${q.addParam(fkNamespace)}, ${q.addParam(header.colLabel)},'In field id_for_import_txt: original column label', ${q.addParam(json)}, ${q.addParam(header.type === 'number' ? DataType.number : DataType.string)}, ${q.addParam(DataType.value)}, TRUE),`
  }
  await datasource.execute(q.sql.replace(/.$/, ';'), q.params); // /.$/ ==> last char of a string

  q = new SqlBuilderBase();
  q.sql = "SELECT pk_entity FROM data.column WHERE fk_digital = " + q.addParam(fkDigital) + " AND fk_namespace = " + q.addParam(fkNamespace) + " ORDER BY pk_entity ASC";
  const result = await datasource.execute(q.sql, q.params);
  feedBacks[fkDigital].next({ id: fkDigital, advancement: 0, infos: '[2/6] Columns creation ... Done' });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return result.map((c: any) => c.pk_entity);
}

async function createTextProperty(digital: number, datasource: Postgres1DataSource, colKeys: number[], headers: Header[], fkLanguage: number, fkNamespace: number): Promise<void> {
  feedBacks[digital].next({ id: digital, advancement: 0, infos: '[3/6] Text properties creation ...' });
  const q = new SqlBuilderBase();
  q.sql = "INSERT INTO data.text_property(fk_entity, string, fk_language, fk_system_type, fk_namespace) VALUES "
  for (let i = 0; i < colKeys.length; i++) {
    q.sql += `(${q.addParam(colKeys[i])}, ${q.addParam(headers[i].colLabel)},  ${q.addParam(fkLanguage)},  ${q.addParam(DataType.label)},  ${q.addParam(fkNamespace)}),`;
  }
  await datasource.execute(q.sql.replace(/.$/, ';'), q.params); // /.$/ ==> last char of a string
  feedBacks[digital].next({ id: digital, advancement: 0, infos: '[3/6] Text properties creation ... Done' });
}

async function createRows(datasource: Postgres1DataSource, fkDigital: number, rowsNb: number): Promise<Array<number>> {
  feedBacks[fkDigital].next({ id: fkDigital, advancement: 0, infos: '[4/6] Rows creation ...' });
  let q = new SqlBuilderBase();
  q.sql = 'INSERT INTO tables.row (fk_digital) VALUES ';
  const temp = "(" + q.addParam(fkDigital) + "),";
  for (let i = 0; i < rowsNb; i++) q.sql += temp; //perf are ok: on my pc (average) 1 million actions like this took 102 ms
  await datasource.execute(q.sql.replace(/.$/, ';'), q.params); // /.$/ ==> last char of a string

  q = new SqlBuilderBase();
  q.sql = "SELECT pk_row FROM tables.row WHERE fk_digital = " + q.addParam(fkDigital) + " ORDER BY pk_row ASC";
  const result = await datasource.execute(q.sql, q.params);
  feedBacks[fkDigital].next({ id: fkDigital, advancement: 0, infos: '[4/6] Rows creation ... Done' });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return result.map((r: any) => r.pk_row);
}

async function createTablePartitionCell(datasource: Postgres1DataSource, fkDigital: number): Promise<void> {
  feedBacks[fkDigital].next({ id: fkDigital, advancement: 0, infos: '[5/6] Creating memory space ...' });
  const q = new SqlBuilderBase();
  q.sql = "SELECT tables.create_cell_table_for_digital(" + q.addParam(fkDigital) + ");";
  await datasource.execute(q.sql, q.params); //since we access the same datasource, and there's no repository for tables
  feedBacks[fkDigital].next({ id: fkDigital, advancement: 0, infos: '[5/6] Creating memory space ... Done' });
}

async function createCells(datasource: Postgres1DataSource, fkDigital: number, rowKeys: number[], colKeys: number[], types: ('string' | 'number')[], table: string[][]): Promise<void> {
  feedBacks[fkDigital].next({ id: fkDigital, advancement: 0, infos: '[6/6] Creating cells ... 0%' });
  let q = new SqlBuilderBase();
  let nb = 0;
  const beginSQL = `INSERT INTO tables.cell_${fkDigital} (fk_digital, fk_row, fk_column,string_value, numeric_value) VALUES `;
  q.sql = beginSQL;

  const totalNumber = rowKeys.length * colKeys.length;
  const begin = new Date().getTime();

  for (let i = 0; i < rowKeys.length; i++) {
    for (let j = 0; j < colKeys.length; j++) {
      if (table[i][j] === '' || !table[i][j]) continue; //only cells with values are produced
      q.sql += `(${q.addParam(fkDigital)}, ${q.addParam(rowKeys[i])}, ${q.addParam(colKeys[j])}, ${q.addParam(types[j] === 'string' ? table[i][j] : null)}, ${q.addParam(types[j] === 'number' ? parseFloat(table[i][j].trim().replace(/,/g, '.')) : null)}),`
      nb++;
      if (nb * 5 % 20000 === 0) {
        await datasource.execute(q.sql.replace(/.$/, ';'), q.params); // /.$/ ==> last char of a string
        q = new SqlBuilderBase();
        q.sql = beginSQL;

        const advancement = Math.round(((i * colKeys.length + j) / totalNumber) * 100);
        const eta = Math.round(((new Date().getTime() - begin) / advancement) * (100 - advancement) / (1000 * 60)); // in minutes
        feedBacks[fkDigital].next({ id: fkDigital, advancement: advancement, infos: '[6/6] Creating cells ... ' + advancement + '% (ETA: ' + (eta === Infinity ? 'Calculating...) ' : eta + ' minutes)') });
      }
    }
  }
  if (q.sql.substring(q.sql.length - 1) === ' ') return; // if there is a values to add
  await datasource.execute(q.sql.replace(/.$/, ';'), q.params); // /.$/ ==> last char of a string
  feedBacks[fkDigital].next({ id: fkDigital, advancement: 99.9, infos: '[6/6] Creating cells ... Done' }); // 99,9 to not trigger the final message.
}
