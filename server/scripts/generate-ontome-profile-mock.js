require('./__dotenv');
const {writeFileSync} = require('fs');
const prompts = require('prompts');
const fetch = require('node-fetch');

const date = new Date();
const regexSpecialChars = /[^A-Za-z0-9]/g

async function start() {
  const response = await prompts([
    {
      type: 'number',
      name: 'profileId',
      message:
        'From which profile should the mockdata be created? (type in the profile id)',
    },
  ]);

  // fetch data
  const profile = await fetchProfile(response.profileId);
  const classes = await fetchClasses(response.profileId);
  const properties = await fetchProperties(response.profileId);
  // transform data
  const p = profileToDfhApiProfile(profile);
  const ks = classes.map(k => classToDfhApiClass(k));
  const ps = properties.map(p => propertyToDfhApiProperty(p));
  // prepare file
  const filename = createFilename(response.profileId, profile.profileLabel);
  const filepath = './src/__tests__/helpers/data/ontomeProfiles/' + filename;
  const filecontent = createFileContent(p, ks, ps);
  // write file
  writeFileSync(filepath, filecontent);

  console.log('>  created file : ' + filepath);
}

start().catch(e => console.error(e));
function createFilename(profileId, profileName) {
  const YYYY = date.getFullYear();
  const m = date.getMonth() + 1;
  const mm = m < 10 ? '0' + m : m;
  const d = date.getDate();
  const dd = d < 10 ? '0' + d : d;
  const pname = profileName
    .toLowerCase()
    .replace(regexSpecialChars, '-')
    .substring(0, 15);
  return `profile-${profileId}-${pname}-${YYYY}-${mm}-${dd}.ts`.replace(
    /-+/g,
    '-',
  );;
}

function createConstName(profileId, profileName) {
  const YYYY = date.getFullYear();
  const m = date.getMonth() + 1;
  const mm = m < 10 ? '0' + m : m;
  const d = date.getDate();
  const dd = d < 10 ? '0' + d : d;
  const pname = profileName
    .toUpperCase()
    .replace(regexSpecialChars, '_')
    .substring(0, 15);
  return `PROFILE_${profileId}_${pname}_${YYYY}_${mm}_${dd}`.replace(
    /\_+/g,
    '_',
  );
}

async function fetchProfile(profileId) {
  console.log(`>  fetching profile ${profileId} from OntoME`);
  const response = await fetch('https://ontome.net/api/profiles.json');
  const profiles = await response.json();

  const profile = profiles.find(p => p.profileID == profileId);

  if (!profile) throw new Error(`profile with id ${profileId} not found`);
  return profile;
}

async function fetchClasses(profileID) {
  console.log('>  fetching classes from OntoME profile ' + profileID);

  const response = await fetch(
    'https://ontome.net/api/classes-profile.json?available-in-profile=' +
      profileID,
  );
  const classes = await response.json();
  return classes;
}

async function fetchProperties(profileID) {
  console.log('>  fetching properties from OntoME profile ' + profileID);

  const response = await fetch(
    'https://ontome.net/api/properties-profile.json?available-in-profile=' +
      profileID,
  );
  const properties = await response.json();
  return properties;
}

function createFileContent(dfhApiProfile, dfhApiClasses, dfhApiProperties) {
  const constName = createConstName(
    dfhApiProfile.dfh_pk_profile,
    dfhApiProfile.dfh_profile_label,
  );
  const mock = {
    profile: dfhApiProfile,
    classes: dfhApiClasses,
    properties: dfhApiProperties,
  };
  const content = `import {OntomeProfileMock} from '../gvDB/local-model.helpers';

  export const ${constName}: OntomeProfileMock =${JSON.stringify(
    mock,
    null,
    2,
  )}`;
  return content;
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
  };
}
