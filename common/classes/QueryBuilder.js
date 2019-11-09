var sqlFormatter = require('sql-formatter');

class QueryBuilder {
  constructor() {
    this.PK_HISTC8_GEOGRAPHICAL_PLACE = 363;
    this.PK_HISTC11_BUILT_WORK = 441;
    this.GEO_CLASSES = {
      [this.PK_HISTC8_GEOGRAPHICAL_PLACE]: true,
      [this.PK_HISTC11_BUILT_WORK]: true,
    };

    // Properties inherited from 'P166 was a presence of'
    // connecting E93 Presence and 'Built Work' or 'Geographical Place'
    this.P166_INHERITED_PKS = [1184, 1181];

    this.PK_E93_PRESENCE = 84;
    this.PK_P167_WAS_AT = 148;

    this.params = [];
    this.sql = '';
    this.tableAliases = [];

    // variables for the query filter part (tw1)
    this.filterWheres = [];
    this.filterFroms = [];

    // variables for the query columns part
    this.selects = [];
    this.froms = [];
    this.groupBys = [];

    this.limit = '';
    this.offset = '';
  }

  buildQuery(query, fkProject) {
    const rootTableAlias = this.addTableAlias();

    // root table where
    this.filterWheres.push(
      this.createEntityWhere(query.filter, rootTableAlias, fkProject)
    );

    // root table from
    this.filterFroms.push(`warehouse.entity_preview ${rootTableAlias}`);
    this.froms.push(`tw1 ${rootTableAlias}`);

    // create froms and wheres according to filter definition
    this.createFilterFroms(query.filter, rootTableAlias, fkProject);
    this.createFilterWheres(query.filter);

    // create froms and selects according to column definition
    this.createColumnsFroms(query.columns, rootTableAlias, fkProject);
    this.createColumnsSelects(query.columns, rootTableAlias, fkProject);
    this.createColumnGroupBys(query.columns, rootTableAlias);

    // create limit, offset
    this.createLimitAndOffset(query);

    this.sql = `
      WITH tw1 AS (
        -- apply the query filter
        SELECT DISTINCT
          t_1.pk_entity,
          t_1.entity_type,
          t_1.entity_label,
          t_1.class_label,
          t_1.type_label,
          t_1.time_span
        FROM
          ${this.joinFroms(this.filterFroms)}
        WHERE
          ${this.joinWheres(this.filterWheres, 'AND')}
      )
      SELECT
        ${this.joinSelects(this.selects)}
      FROM
        ${this.joinFroms(this.froms)}
        ${this.joinGroupBys(this.groupBys)}
        ${this.limit}
        ${this.offset}
        `;

    console.log('params', this.params);
    let forLog = this.sql;
    this.params.forEach((param, i) => {
      const replaceStr = new RegExp('\\$' + (i + 1) + '(?!\\d)', 'g');
      forLog = forLog.replace(replaceStr, param);
    });
    console.log(`
        "\u{1b}[32m Formatted and Deserialized SQL (not sent to db) "\u{1b}[0m
        ${sqlFormatter.format(forLog, { language: 'pl/sql' })}

        `);

    return {
      sql: this.sql,
      params: this.params,
    };
  }
  /**
   * if there is limit and offset provided, this function adds:
   * - a limit
   * - a offset
   * @param {*} query
   */
  createLimitAndOffset(query) {
    if (typeof query.limit === 'number' && query.limit >= 0) {
      this.limit = `LIMIT ${this.addParam(query.limit)}`;
    }

    if (typeof query.offset === 'number' && query.offset >= 0) {
      this.offset = `OFFSET ${this.addParam(query.offset)}`;
    }

    this.createFullCount();
  }

  createFullCount() {
    this.selects.push('count(*) OVER() AS full_count');
  }

  createColumnsFroms(columns, leftTableAlias, fkProject) {
    columns.forEach(column => {
      this.createColumnFroms(column, leftTableAlias, fkProject);
    });
  }

  createColumnFroms(column, leftTableAlias, fkProject, level = 0) {
    if (!column.ofRootTable) {
      let thisTableAlias;
      column.queryPath.forEach((segment, index) => {
        console.log(level);

        if (this.isRolesJoin(segment) || this.isEntitesJoin(segment)) {
          thisTableAlias = this.addTableAlias();
          segment._tableAlias = thisTableAlias;
        }

        // JOIN roles
        if (this.isRolesJoin(segment)) {
          this.joinRoles(
            segment,
            leftTableAlias,
            thisTableAlias,
            fkProject,
            this.froms
          );
        }
        // JOIN Presences
        else if (this.isGeoEntityJoin(segment)) {
          this.joinGeoEntity(
            segment,
            leftTableAlias,
            thisTableAlias,
            fkProject,
            this.froms
          );
        }
        // JOIN entities
        else if (this.isEntitesJoin(segment)) {
          this.joinEntities(
            segment,
            leftTableAlias,
            thisTableAlias,
            fkProject,
            this.froms
          );
        }
        leftTableAlias = thisTableAlias;
      });
    }
  }

  createColumnsSelects(columns, leftTableAlias, fkProject) {
    columns.forEach(column => {
      if (column.ofRootTable) {
        if (column.colName) {
          this.selects.push(
            `${leftTableAlias}.${column.colName} AS "${column.label}"`
          );
        } else if (column.defaultType === 'entity_preview') {
          column.colNames = [
            'pk_entity',
            'entity_type',
            'entity_label',
            'class_label',
            'type_label',
            'time_span',
          ];
          this.selects.push(`jsonb_build_object(
                        'pk_entity', ${leftTableAlias}.pk_entity,
                        'entity_type', ${leftTableAlias}.entity_type,
                        'entity_label', ${leftTableAlias}.entity_label,
                        'class_label', ${leftTableAlias}.class_label,
                        'type_label', ${leftTableAlias}.type_label,
                        'time_span', ${leftTableAlias}.time_span
                      ) AS "${column.label}"`);
        } else if (column.defaultType === 'temporal_distribution') {
          this.selects.push(
            `commons.analysis__create_temporal_distribution(array_agg( ${leftTableAlias}.pk_entity), ${fkProject}) as temporal_distribution`
          );
        }
      } else if (column.queryPath && column.queryPath.length) {
        // create a select for the last segment in the queryPath
        this.createColumnSelect(
          column.queryPath[column.queryPath.length - 1],
          column.label
        );
      }
    });
  }

  createColumnSelect(segment, columnLabel) {
    if (this.isRolesJoin(segment)) {
    } else if (this.isGeoEntityJoin(segment)) {
      this.selects.push(`COALESCE(json_agg( distinct jsonb_build_object(
                'pk_entity', ${segment._tableAlias}.pk_entity,
                'entity_type', ${segment._tableAlias}.entity_type,
                'entity_label', ${segment._tableAlias}.entity_label,
                'class_label', ${segment._tableAlias}.class_label,
                'type_label', ${segment._tableAlias}.type_label,
                'time_span', ${segment._tableAlias}.time_span,
                'presences', ${segment._tableAlias}.presences
              )
           ) FILTER (WHERE ${segment._tableAlias}.pk_entity IS NOT NULL), '[]') AS "${columnLabel}"`);
    } else if (this.isEntitesJoin(segment)) {
      this.selects.push(`COALESCE(json_agg( distinct jsonb_build_object(
            'pk_entity', ${segment._tableAlias}.pk_entity,
            'entity_type', ${segment._tableAlias}.entity_type,
            'entity_label', ${segment._tableAlias}.entity_label,
            'class_label', ${segment._tableAlias}.class_label,
            'type_label', ${segment._tableAlias}.type_label,
            'time_span', ${segment._tableAlias}.time_span
          )
       ) FILTER (WHERE ${segment._tableAlias}.pk_entity IS NOT NULL), '[]') AS "${columnLabel}"`);
    }
  }

  createFilterFroms(node, leftTableAlias, fkProject, level = 0) {
    if (level > 0) {
      // JOIN roles
      if (this.isRolesJoin(node)) {
        this.joinRoles(
          node,
          leftTableAlias,
          node._tableAlias,
          fkProject,
          this.filterFroms
        );
        leftTableAlias = node._tableAlias;
      }
      // JOIN entities
      else if (this.isEntitesJoin(node)) {
        this.joinEntities(
          node,
          leftTableAlias,
          node._tableAlias,
          fkProject,
          this.filterFroms
        );
        leftTableAlias = node._tableAlias;
      }
    }

    // console.log(level)

    node.children.forEach(childNode => {
      if (this.isRolesJoin(childNode) || this.isEntitesJoin(childNode)) {
        childNode._tableAlias = this.addTableAlias();
        this.createFilterFroms(childNode, leftTableAlias, fkProject, level + 1);
      } else {
        childNode._tableAlias = this.addTableAlias();
        this.createFilterFroms(childNode, leftTableAlias, fkProject, level + 1);
      }
    });
  }

  joinEntities(node, parentTableAlias, thisTableAlias, fkProject, fromsArray) {
    fromsArray.push(`
                    LEFT JOIN warehouse.entity_preview ${thisTableAlias} ON
                    (${parentTableAlias}.fk_entity = ${thisTableAlias}.pk_entity OR ${parentTableAlias}.fk_temporal_entity = ${thisTableAlias}.pk_entity)
                    AND
                     ${this.createEntityWhere(node, thisTableAlias, fkProject)}
                `);
  }

  joinGeoEntity(node, parentTableAlias, thisTableAlias, fkProject, fromsArray) {
    const has_presence = thisTableAlias + '_has_presence';
    const presence = thisTableAlias + '_presence';
    const was_at = thisTableAlias + '_was_at';
    const place = thisTableAlias + '_place';

    fromsArray.push(`

            -- PEIT GEO ENTITY
            LEFT JOIN (
                SELECT
                ${thisTableAlias}.*,
                (
                    SELECT jsonb_agg(${presence})
                    -- ROLE P166 HAS PRESENCE
                    FROM warehouse.v_roles_per_project_and_repo ${has_presence}
                    -- E93 PRESENCE
                    LEFT JOIN (
                        SELECT ${presence}.pk_entity, ${presence}.fk_project, ${presence}.fk_class, ${presence}.time_span,
                        (
                            --SELECT COALESCE(
                            --  json_agg(
                            --      distinct jsonb_build_object(
                            --        'lat',
                            --        ${place}.lat,
                            --        'long',
                            --        ${place}.long
                            --      )
                            --  )
                            --   FILTER ( WHERE ${place}.pk_entity IS NOT NULL ),
                            --'[]'
                            --) AS place
                            SELECT
                            jsonb_build_object(
                              'lat',
                              ${place}.lat,
                              'long',
                              ${place}.long
                            ) place
                            FROM
                            -- ROLE P167 WAS AT
                            warehouse.v_roles_per_project_and_repo ${was_at}
                            -- PLACE
                            JOIN information.v_place ${place} ON ${was_at}.fk_entity = ${place}.pk_entity

                            WHERE ${was_at}.fk_project = ${this.addParam(
      fkProject
    )}
                            AND ${presence}.pk_entity = ${was_at}.fk_temporal_entity
                            AND ${was_at}.fk_property IN (${this.addParam(
      this.PK_P167_WAS_AT
    )}) -- ROLE P167 WAS AT
                            LIMIT 1
                        )  AS was_at
                        FROM warehouse.entity_preview ${presence}
                        WHERE ${presence}.fk_project = ${this.addParam(
      fkProject
    )}
                        AND ${presence}.fk_class IS NOT NULL
                        AND ${presence}.fk_class IN (${this.addParam(
      this.PK_E93_PRESENCE
    )}) -- E93 Presence
                    ) AS ${presence} ON ${presence}.pk_entity = ${has_presence}.fk_temporal_entity
                    WHERE ${has_presence}.fk_project = ${this.addParam(
      fkProject
    )}
                    AND (
                    (
                        ${thisTableAlias}.pk_entity = ${has_presence}.fk_entity
                        AND ${has_presence}.fk_property IN (${this.addParams(
      this.P166_INHERITED_PKS
    )})
                    )
                    )
                ) as presences
                FROM warehouse.entity_preview ${thisTableAlias}
                WHERE ${thisTableAlias}.fk_project = ${this.addParam(fkProject)}
                AND ${this.createEntityWhere(node, thisTableAlias, fkProject)}


        ) AS ${thisTableAlias} ON ${parentTableAlias}.fk_entity = ${thisTableAlias}.pk_entity
        `);
  }

  joinRoles(node, parentTableAlias, thisTableAlias, fkProject, fromsArray) {
    const topLevelWheres = [];
    topLevelWheres.push(`
                ${thisTableAlias}.fk_project = ${this.addParam(fkProject)}
                `);
    const secondLevelWheres = [];
    if (node.data.ingoingProperties.length) {
      secondLevelWheres.push(`
                    (${parentTableAlias}.pk_entity = ${thisTableAlias}.fk_entity AND ${thisTableAlias}.fk_property IN (${this.addParams(
        node.data.ingoingProperties
      )}))
                    `);
    }
    if (node.data.outgoingProperties.length) {
      secondLevelWheres.push(`
                    (${parentTableAlias}.pk_entity = ${thisTableAlias}.fk_temporal_entity AND ${thisTableAlias}.fk_property IN (${this.addParams(
        node.data.outgoingProperties
      )}))
                    `);
    }
    if (secondLevelWheres.length) {
      topLevelWheres.push(`(
                         ${this.joinWheres(secondLevelWheres, 'OR')}
                    )`);
    }
    fromsArray.push(`
                LEFT JOIN warehouse.v_roles_per_project_and_repo ${thisTableAlias} ON
                 ${this.joinWheres(topLevelWheres, 'AND')}
                `);
  }

  createEntityWhere(filter, tableAlias, fkProject) {
    const whereProject = `${tableAlias}.fk_project = ${this.addParam(
      fkProject
    )}`;

    const classOrTypeWheres = [];
    if (filter.data && filter.data.classes && filter.data.classes.length) {
      classOrTypeWheres.push(
        `${tableAlias}.fk_class IN (${this.addParams(filter.data.classes)})`
      );
    }
    if (filter.data && filter.data.types && filter.data.types.length) {
      classOrTypeWheres.push(
        `${tableAlias}.fk_type IN (${this.addParams(filter.data.types)})`
      );
    }

    const topLevelWheres = [];
    topLevelWheres.push(whereProject);
    topLevelWheres.push(`${tableAlias}.fk_class IS NOT NULL`);
    if (classOrTypeWheres.length) {
      topLevelWheres.push(` ( ${this.joinWheres(classOrTypeWheres, 'OR')} )`);
    }

    return `
        ${this.joinWheres(topLevelWheres, 'AND')}
        `;
  }

  createFilterWheres(node, level = 0) {
    let nodeWheres = [];
    console.log(level);

    node.children.forEach(childNode => {
      let childNodeWheres;
      // climb into the tree up to the leaf
      if (childNode.children.length) {
        childNodeWheres = this.createFilterWheres(childNode, level + 1);
      }

      // create the where clause for the entity table
      if (childNode.data.classes || childNode.data.types) {
        nodeWheres.push(`${childNode._tableAlias}.pk_entity IS NOT NULL`);
      }

      // create the where clause for the role table
      if (
        childNode.data.ingoingProperties ||
        childNode.data.outgoingProperties
      ) {
        const equals =
          childNode.data.operator === 'IS'
            ? 'IS NOT NULL'
            : childNode.data.operator === 'IS NOT'
            ? 'IS NULL'
            : 'IS NOT NULL'; // DEFAULT

        nodeWheres.push(`${childNode._tableAlias}.fk_entity ${equals}`);
      }

      if (childNodeWheres) {
        let childrenSql;
        // if we are in a subgroup node
        if (childNode.data.subgroup) {
          // join the wheres of this subgroup's children
          childrenSql = childNodeWheres.join(`
                        ${childNode.data.operator}
                    `);
        } else {
          // get the first childNodeWhere of childNodeWheres
          childrenSql = childNodeWheres.join('');
        }

        nodeWheres.push(`
                    (  -- subgroup
                        ${childrenSql}
                    )
                `);
      }
    });

    if (level === 0 && nodeWheres.length > 0) {
      this.filterWheres.push(`
            -- filter wheres
            (
                ${nodeWheres.join(`
                    AND
                `)}
            )`);
    }

    return nodeWheres;
  }

  /**
   * Returns true, if given node is for joining roles
   * @param {*} node
   */
  isRolesJoin(node) {
    if (!node || typeof node.data !== 'object') return false;
    return node.data.ingoingProperties || node.data.outgoingProperties;
  }
  /**
   * Returns true, if given node is for joining entities
   * @param {*} node
   */
  isEntitesJoin(node) {
    if (!node || typeof node.data !== 'object' || !node.data.classes)
      return false;
    return node.data.classes || node.data.types;
  }

  /**
   * Returns true, if given node is for joining GeoEntities (and no other classes)
   * @param {*} node
   */
  isGeoEntityJoin(node) {
    if (this.isEntitesJoin(node)) {
      const classes = node.data.classes;
      // const types = node.data.types;

      const geoClasses = classes.filter(pk => !!this.GEO_CLASSES[pk]);
      // const noTypes = (!types || !types.length);

      // if all selected classes are GeoClasses and no types are selected
      if (
        geoClasses.length > 0 &&
        geoClasses.length === classes.length
        //  && noTypes
      ) {
        return true;
      }
    }

    return false;
  }

  createColumnGroupBys(columns, parentTableAlias) {
    columns.forEach(column => {
      if (column.ofRootTable && !column.preventGroupBy) {
        if (column.colNames) {
          column.colNames.forEach(name => {
            this.groupBys.push(`${parentTableAlias}.${name}`);
          });
        } else {
          this.groupBys.push(`${parentTableAlias}.${column.colName}`);
        }
      }
    });
  }

  // generic

  addParam(val) {
    this.params.push(val);
    return '$' + this.params.length;
  }

  addParams(vals) {
    return vals.map(val => this.addParam(val)).join(',');
  }

  joinWheres(wheres, operation) {
    return wheres.join(`
            ${operation}
        `);
  }
  joinFroms(froms) {
    return froms.join(`
        `);
  }
  joinSelects(selects) {
    return selects.join(`,
        `);
  }

  joinGroupBys(groupBys) {
    return !!groupBys && groupBys.length
      ? `GROUP BY
      ${groupBys.join(`,
        `)}
      `
      : '';
  }

  addTableAlias(prefix) {
    const alias = (prefix || 't') + '_' + (this.tableAliases.length + 1);
    this.tableAliases.push(alias);
    return alias;
  }
}
module.exports = QueryBuilder;
