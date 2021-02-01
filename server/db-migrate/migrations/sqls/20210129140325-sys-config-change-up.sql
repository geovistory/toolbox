UPDATE system.config t1
SET config = replace(t2.config::text, 'mapsToListType', 'valueObjectType')::jsonb
FROM system.config t2
WHERE t1.pk_entity = t2.pk_entity;

UPDATE system.config t1
SET config = jsonb_set(t2.config, '{specialFields}'::text[], '{
  "incomingProperties": {
    "1761": {
      "comment": "has short title",
      "displayInBasicFields": {"position": 1}
    },
    "1111": {
      "comment": "has appellation for language",
      "displayInBasicFields": {"position": 2}
    },
    "1762": {
      "comment": "P18 has definition (is definition of)",
      "displayInBasicFields": {"position": 4}
    },
    "1760": {
      "comment": "has web address (is web addess of) – P16",
      "displayInBasicFields": {"position": 5}
    },
    "1763": {
      "comment": "P19 has comment (is comment about)",
      "displayInBasicFields": {"position": 6}
    }
  },
  "outgoingProperties": {
    "4": {
      "comment": "has time-span (When)",
      "displayInBasicFields": {"position": 1000}
    }
  },
  "hasTypeSubproperties": {
    "comment": "all subproperties of has type (dfh.api_property.is_has_type_subproperty=true)",
    "displayInBasicFields": {"position": 3}
  }
}'::jsonb, true)
FROM system.config t2
WHERE t1.pk_entity = t2.pk_entity;
