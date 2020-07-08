'use strict';

module.exports = function(InfLanguage) {
  InfLanguage.queryByString = function(searchstring, cb) {
    let sql_stmt;
    let params = [];

    if (!searchstring) {
      sql_stmt = `
        select pk_entity, pk_language, fk_class, lang_type, "scope",iso6392b, iso6392t, iso6391, notes
        FROM information."language"
        WHERE iso6391 IN ('en','de','fr','nl','it','es')
        ORDER BY POSITION(iso6391 IN 'en, de, fr, nl, it, es');
        `;
    } else {
      sql_stmt = `
      select pk_entity, pk_language, fk_class, lang_type, "scope",iso6392b, iso6392t, iso6391, notes
      from (
        SELECT
        pk_entity, pk_language, fk_class, lang_type, "scope",iso6392b, iso6392t, iso6391, notes,
        ts_rank(to_tsvector('english', notes),
        to_tsquery($1), 1) AS score
        FROM information."language"
        ) s
        WHERE score > 0
        ORDER BY score DESC
        LIMIT 6;
        `;

      params.push(searchstring + ':*');
    }

    const connector = InfLanguage.dataSource.connector;

    connector.execute(sql_stmt, params, (err, resultObjects) => {
      // console.log(resultObjects);
      var languages = [];

      if (resultObjects) {
        languages = resultObjects.map(languageRaw => {
          const languageData = connector.fromRow('InfLanguage', languageRaw);
          return new InfLanguage(languageData);
        });
      }

      cb(null, languages);
    });
  };
};
