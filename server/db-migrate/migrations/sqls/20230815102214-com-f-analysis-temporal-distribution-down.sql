CREATE OR REPLACE FUNCTION commons.analysis__create_temporal_distribution(param_pk_entities integer[], param_project integer)
  RETURNS jsonb
  LANGUAGE 'plpgsql'
  COST 100 VOLATILE PARALLEL UNSAFE
  AS $BODY$
DECLARE
  res jsonb;
BEGIN
  WITH tw0 AS (
    SELECT
      first_second,
      last_second,
      pk_entity
    FROM
      war.entity_preview
    WHERE
      pk_entity = ANY (param_pk_entities)
      AND project = param_project
      AND first_second IS NOT NULL
      AND last_second IS NOT NULL
),
tw1 AS (
  SELECT
    first_second julian_second,
    pk_entity
  FROM
    tw0
  UNION
  SELECT
    last_second julian_second,
    pk_entity
  FROM
    tw0
  ORDER BY
    1
),
tw2 AS (
  SELECT DISTINCT ON (julian_second)
    julian_second
  FROM
    tw1
),
tw3 AS (
  SELECT
    julian_second,
    row_number() OVER () pk,
(row_number() OVER () + 1) fk_next
FROM tw2
),
tw4 AS (
  SELECT
    t1.julian_second x1,
    t2.julian_second x2
  FROM
    tw3 t1,
    tw3 t2
  WHERE
    t1.fk_next = t2.pk
),
tw5 AS (
  SELECT
    t1.x1,
    t1.x2,
    -- for czml we need to remove a very little ms here to that the x vals stay unique
    json_strip_nulls(json_agg(t2.pk_entity)) AS data,
    count(t2.pk_entity)
  FROM
    tw4 t1
    LEFT JOIN tw0 t2 ON t2.first_second < t1.x2
      AND t2.last_second > t1.x1
  GROUP BY
    t1.x1,
    t1.x2
  ORDER BY
    t1.x1
),
tw6 AS (
  -- select the very first point
  SELECT
    x1 x,
    0 y,
    '[]'::json AS data,
    x1,
    x2
  FROM
    tw5
  ORDER BY
    x1
  LIMIT 1
),
tw7 AS (
  -- select the very last point
  SELECT
    x2 x,
    0 y,
    '[]'::json AS data,
    x1,
    x2
  FROM
    tw5
  ORDER BY
    x1 DESC
  LIMIT 1
),
tw8 AS (
  -- first point
  SELECT
    0,
    x,
    y,
    data,
    x1,
    x2
  FROM
    tw6
  UNION ALL
  -- all other points
  SELECT
    2,
    x1 x,
    count y,
    data,
    x1,
    x2
  FROM
    tw5
  UNION ALL
  SELECT
    1,
    x2 x,
    count y,
    data,
    x1,
    x2
  FROM
    tw5
  UNION ALL
  -- last point
  SELECT
    3,
    x,
    y,
    data,
    x1,
    x2
  FROM
    tw7
  ORDER BY
    x,
    1
)
SELECT
  jsonb_agg(json_build_object('x', x, 'y', y, 'data', data)) INTO res
FROM
  tw8;
  RETURN coalesce(res, '[]'::jsonb);
END;
$BODY$;

