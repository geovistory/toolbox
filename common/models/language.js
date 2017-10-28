'use strict';

module.exports = function(Language) {

  Language.queryByString = function(searchstring, cb) {
    var sql_stmt = `
    select pk_language, lang_type, "scope",iso6392b, iso6392t, iso6391, notes
    from (
      SELECT
      pk_language, lang_type, "scope",iso6392b, iso6392t, iso6391, notes,
      ts_rank(to_tsvector('english', notes),
      to_tsquery($1), 1) AS score
      FROM commons."language"
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
