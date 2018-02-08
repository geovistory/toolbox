'use strict';

module.exports = function(InformationLanguage) {

  InformationLanguage.findOrCreateLang = function(projectId, data) {

    const dataObject = {
      pk_entity: data.pk_entity,
      pk_language: data.pk_language,
      fk_class: data.fk_class,
      lang_type: data.lang_type,
      scope: data.scope,
      iso6392b: data.iso6392b,
      iso6392t: data.iso6392t,
      iso6391: data.iso6391,
      notes: data.notes,
    };

    return InformationLanguage.findOrCreateVersion(InformationLanguage, projectId, dataObject);

  }


  InformationLanguage.queryByString = function(searchstring, cb) {
    var sql_stmt = `
    select pk_entity, pk_language, fk_class, lang_type, "scope",iso6392b, iso6392t, iso6391, notes
    from (
      SELECT
      pk_entity, pk_language, fk_class, lang_type, "scope",iso6392b, iso6392t, iso6391, notes,
      ts_rank(to_tsvector('english', notes),
      to_tsquery($1), 1) AS score
      FROM information."language"
    ) s
    WHERE score > 0
    ORDER BY score DESC`

    var params = [];
    params.push(searchstring + ':*');

    const connector = InformationLanguage.dataSource.connector;

    connector.execute(sql_stmt, params, (err, resultObjects) => {
      console.log(resultObjects)
      var languages = [];

      if (resultObjects) {
        languages = resultObjects.map(languageRaw => {
          const languageData = connector.fromRow('InformationLanguage', languageRaw)
          return new InformationLanguage(languageData)
        })
      }

      cb(null, languages);
    });

  };
};