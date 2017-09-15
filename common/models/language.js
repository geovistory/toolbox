'use strict';

module.exports = function(Language) {

  Language.status = function(searchstring, cb) {
    var sql_stmt = `
    select pk_language, part2b, part2t, part1,"scope","type", ref_name, "comment", french_name, display
    from (
      SELECT
      pk_language, part2b, part2t, part1,"scope","type", ref_name, "comment", french_name, display,
      ts_rank(to_tsvector('english', ref_name),
      to_tsquery($1), 1) AS score
      FROM external_data."language"
    ) s
    WHERE score > 0
    ORDER BY score DESC`

    var params = [];
    params.push(searchstring + ':*');

    const connector = Language.dataSource.connector;

    connector.execute(sql_stmt, params, (err, resultObjects) => {
      console.log(resultObjects)
      var languages = [];

      if (resultObjects){
        languages = resultObjects.map(languageRaw => {
          const languageData = connector.fromRow('Language', languageRaw)
          return new Language(languageData)
        })
      }

      cb(null, languages);
    });

  };
};
