'use strict';
const _ = require('lodash');

const TableRemotes = require('../../dist/server/table/table-remotes')
  .TableRemotes;

module.exports = function(DatColumn) {
  /**
   * Get the columns related to the digital
   * @param {*} pkProject is needed to ensure the columns belong to a namespace of the project
   * @param {*} pkTable the pk of the digital table
   * @param {*} cb
   */
  DatColumn.ofDigital = (pkProject, pkTable) => {
    return new TableRemotes(DatColumn.app).getColumns(pkProject, pkTable);
  };
};
