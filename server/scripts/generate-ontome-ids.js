require('./__dotenv');
const {writeFileSync} = require('fs');
const prompts = require('prompts');
const fetch = require('node-fetch');
const {uniqBy, uniq, sortBy} = require('lodash');

const date = new Date();
const regexSpecialChars = /[^A-Za-z0-9]/g;

async function start() {
  // const response = await prompts([
  //   {
  //     type: 'number',
  //     name: 'profileId',
  //     message:
  //       'From which profile should the config be created? (type in the profile id)',
  //   },
  // ]);

  // fetch profiles
  const profiles = await fetchProfiles();
  const profs = profiles.map(p => profileToDfhApiProfile(p));
  const profileIds = uniq(profs.map(p => p.dfh_pk_profile));

  // fectch classes
  const classes = await fetchClasses(profileIds);
  const ks = classes.map(k => classToDfhApiClass(k));

  // fetch properties
  const properties = await fetchProperties(profileIds);
  const ps = properties.map(p => propertyToDfhApiProperty(p));

  // prepare file
  const filecontent = createFileContent(profs, ks, ps);
  createFile('./src/ontome-ids.ts', filecontent);
  createFile(
    '../client/projects/app-toolbox/src/app/ontome-ids.ts',
    filecontent,
  );
}

function createFile(filepath, filecontent) {
  // write file
  writeFileSync(filepath, filecontent);

  console.log('>  created file : ' + filepath);
}

start().catch(e => console.error(e));

async function fetchProfiles() {
  console.log(
    `>  fetching profiles selected by Project Geovistory from OntoME`,
  );
  const response = await fetch(
    'https://ontome.net/api/profiles.json?selected-by-project=6',
  );
  const profiles = await response.json();
  const response2 = await fetch(
    'https://ontome.net/api/profiles.json?selected-by-project=125',
  );
  const profiles2 = await response2.json();

  return uniqBy([...profiles, ...profiles2], p => p.profileID);
}
async function fetchClasses(profileIds) {
  const classes = [];
  for (const profileId of profileIds) {
    const classesFromProfile = await fetchClassesFromProfile(profileId);
    classes.push(...classesFromProfile);
  }
  return classes;
}
async function fetchClassesFromProfile(profileID) {
  console.log('>  fetching classes from OntoME profile ' + profileID);

  const response = await fetch(
    'https://ontome.net/api/classes-profile.json?available-in-profile=' +
      profileID,
  );
  const classes = await response.json();
  return classes;
}
async function fetchProperties(profileIds) {
  const properties = [];
  for (const profileId of profileIds) {
    const propertiesFromProfile = await fetchPropertiesFromProfile(profileId);
    properties.push(...propertiesFromProfile);
  }
  return properties;
}
async function fetchPropertiesFromProfile(profileID) {
  console.log('>  fetching properties from OntoME profile ' + profileID);

  const response = await fetch(
    'https://ontome.net/api/properties-profile.json?available-in-profile=' +
      profileID,
  );
  const properties = await response.json();
  return properties;
}

function createFileContent(dfhApiProfiles, dfhApiClasses, dfhApiProperties) {
  const content = `
/******************************************************************
 * PROFILE ID's
 ******************************************************************/

${processProfiles(dfhApiProfiles)}

/******************************************************************
 * CLASS ID's
 ******************************************************************/

${processClasses(dfhApiClasses)}

/******************************************************************
 * PROPERTY ID's
 ******************************************************************/

${processProperties(dfhApiProperties)}
  `;
  return content;
}

function toConstName(label) {
  return label
    .toUpperCase()
    .replace(regexSpecialChars, '_')
    .replace(/_+/g, '_');
}
function propConstName(l) {
  const x = `P_${l.dfh_pk_property}_${l.dfh_property_label}_ID`;
  return toConstName(x);
}

function processProperties(dfhApiProperties) {
  const uniq = uniqBy(dfhApiProperties, i => i.dfh_pk_property);
  const sorted = sortBy(uniq, i => i.dfh_pk_property);

  /**
   * PRINT PROPERTIES
   */
  // for (const p of sorted) {
  //   if (p.dfh_identity_defining) {
  //     if (!p.dfh_parent_properties.includes(1376))
  //       console.log('https://ontome.net/property/' + p.dfh_pk_property);
  //   }
  // }

  return sorted
    .map(i => `export const ${propConstName(i)} = ${i.dfh_pk_property}`)
    .join('\n');
}
function profileConstName(i) {
  const x = `PROFILE_${i.dfh_pk_profile}_${i.dfh_profile_label}_ID`;
  return toConstName(x);
}
function processProfiles(dfhApiProfiles) {
  const uniq = uniqBy(dfhApiProfiles, i => i.dfh_pk_profile);
  const sorted = sortBy(uniq, i => i.dfh_pk_profile);

  return sorted
    .map(i => `export const ${profileConstName(i)} = ${i.dfh_pk_profile}`)
    .join('\n');
}

function classConstName(l) {
  const x = `C_${l.dfh_pk_class}_${l.dfh_class_label}_ID`;
  return toConstName(x);
}

function processClasses(dfhApiClasses) {
  const uniq = uniqBy(dfhApiClasses, i => i.dfh_pk_class);
  const sorted = sortBy(uniq, i => i.dfh_pk_class);

  return sorted
    .map(i => `export const ${classConstName(i)} = ${i.dfh_pk_class}`)
    .join('\n');
}

function profileToDfhApiProfile(profile) {
  return {
    // "pk_entity": 3725,
    removed_from_api: false,
    requested_language: 'en',
    tmsp_last_dfh_update: '2020-01-27T08:03:06.045+00:00',
    is_enabled_in_profile: undefined,
    dfh_pk_profile: profile.profileID,
    dfh_profile_label: profile.profileLabel,
    dfh_project_label: profile.ownedByProjectLabel,
    dfh_owned_by_project: profile.ownedByProjectID,
    dfh_profile_definition: profile.profileDefinition,
    dfh_date_profile_published: undefined,
    dfh_date_profile_deprecated: undefined,
    dfh_project_label_language: profile.ownedByProjectLabelLanguage,
    dfh_profile_label_language: profile.profileLabelLanguage,
    dfh_profile_definition_language: profile.profileDefinitionLanguage,
    dfh_is_ongoing_forced_publication: profile.isOngoingForcedPublication,
    dfh_is_root_profile: profile.isRootProfile,
    dfh_fk_root_profile: profile.fkRootProfile,
  };
}

function classToDfhApiClass(c) {
  return {
    tmsp_last_modification: '2021-03-25T20:06:37.47053+00:00',
    // "pk_entity": 4929,
    dfh_pk_class: c.classID,
    dfh_basic_type: c.entityBasicType,
    dfh_fk_profile: c.profileID,
    dfh_class_label: c.classLabel,
    dfh_fk_namespace: c.namespaceID,
    dfh_namespace_uri: c.namespaceURI,
    dfh_profile_label: c.profileLabel,
    dfh_namespace_label: c.namespaceLabel,
    dfh_basic_type_label: c.entityBasicTypeLabel,
    dfh_class_scope_note: c.classScopeNote,
    dfh_class_label_language: c.classLabelLanguage,
    dfh_profile_label_language: c.profileLabelLanguage,
    dfh_namespace_label_language: c.namespaceLabelLanguage,
    dfh_class_scope_note_language: c.classScopeNoteLanguage,
    dfh_class_identifier_in_namespace: c.classIdentifierInNamespace,
    dfh_profile_association_type: c.profileAssociationType,
    dfh_parent_classes: c.parentClasses,
    dfh_ancestor_classes: c.ancestorClasses,
  };
}

function propertyToDfhApiProperty(p) {
  return {
    removed_from_api: false,
    requested_language: 'en',
    tmsp_last_dfh_update: '2020-03-05T14:05:26.714+00:00',
    is_enabled_in_profile: null,
    dfh_pk_property: p.propertyID,
    dfh_property_label_language: p.propertyLabelLanguage,
    dfh_property_label: p.propertyLabel,
    dfh_property_inverse_label: p.propertyInverseLabel,
    dfh_property_scope_note_language: p.propertyScopeNoteLanguage,
    dfh_property_scope_note: p.propertyScopeNote,
    dfh_is_inherited: p.isInherited,
    dfh_property_domain: p.propertyDomain,
    dfh_domain_instances_min_quantifier: p.domainInstancesMinQuantifier,
    dfh_domain_instances_max_quantifier: p.domainInstancesMaxQuantifier,
    dfh_property_range: p.propertyRange,
    dfh_range_instances_min_quantifier: p.rangeInstancesMinQuantifier,
    dfh_range_instances_max_quantifier: p.rangeInstancesMaxQuantifier,
    dfh_identity_defining: p.identityDefining,
    dfh_is_has_type_subproperty: p.isHasTypeSubproperty,
    dfh_property_identifier_in_namespace: p.propertyIdentifierInNamespace,
    dfh_namespace_uri: p.namespaceURI,
    dfh_fk_namespace: p.namespaceID,
    dfh_namespace_label_language: p.namespaceLabelLanguage,
    dfh_namespace_label: p.namespaceLabel,
    dfh_profile_association_type: p.profileAssociationType,
    dfh_fk_profile: p.profileID,
    dfh_profile_label: p.profileLabel,
    dfh_profile_label_language: p.profileLabelLanguage,
    dfh_parent_properties: p.parentProperties,
    dfh_ancestor_properties: p.ancestorProperties || [],
  };
}
