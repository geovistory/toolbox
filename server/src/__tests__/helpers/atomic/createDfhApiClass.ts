import {values} from 'lodash';
import {keys} from 'ramda';
import {TestDbFactory} from '../TestDbFactory';
import {DfhApiClass, NewDfhApiClass} from '../data/gvDB/local-model.helpers';
import {templateExisting, templateNew} from './dfh-api-class.helper';

/**
 * These helpers are independent of any loopback 4 repository
 * beacause loopack does not access the table data_for_history.api_class
 * directly (it uses data_for_history.v_class instead).
 */

export async function createDfhApiClass(item: Partial<NewDfhApiClass> = {}) {
  const x: NewDfhApiClass = {...templateNew, ...item};
  const sql = `
    WITH tw1 AS(
      INSERT INTO data_for_history.api_class (${keys(x).join(',')})
      VALUES (${keys(x).map((k, i) => '$' + (i + 1)).join(',')})
      RETURNING *
    )
    SELECT ${keys(templateExisting).join(',')}
    FROM tw1;
  `;
  const res: DfhApiClass[] = await TestDbFactory.datasource.execute(sql, values(x));
  return res[0];
}
