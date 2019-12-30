"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = require("https");
const ramda_1 = require("ramda");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const api_class_profile_list_validator_1 = require("../../common/validators/api-class-profile-list.validator");
const api_profile_list_validator_1 = require("../../common/validators/api-profile-list.validator");
const api_property_profile_list_validator_1 = require("../../common/validators/api-property-profile-list.validator");
class OntoMe {
    constructor(cb, connector) {
        this.cb = cb;
        this.connector = connector;
        this._profilesUrl = 'https://ontome.dataforhistory.org/api/profiles.json';
        this._classesUrl = 'https://ontome.dataforhistory.org/api/classes-profile.json';
        this._propertiesUrl = 'https://ontome.dataforhistory.org/api/properties-profile.json';
        this.error$ = new rxjs_1.Subject();
        this.cb = (err, res) => {
            if (err)
                this.error$.next();
            cb(err, res);
        };
    }
    get profilesUrl() {
        return this._profilesUrl + `?lang=${this.requestedLanguage}`;
    }
    get classesUrl() {
        return this._classesUrl + `?lang=${this.requestedLanguage}&available-in-profile=${this.fkProfile}`;
    }
    get propertiesUrl() {
        return this._propertiesUrl + `?lang=${this.requestedLanguage}&available-in-profile=${this.fkProfile}`;
    }
    set requestedLanguage(x) {
        this._requestedLanguage = x;
    }
    get requestedLanguage() {
        return this._requestedLanguage || 'en';
    }
    /**
     * Pulls data from ontome, updates tables in geovistory
     * and activates the profile and all its classes for given project
     * @param geovistoryProjectId
     * @param ontomeProfileId
     * @param requestedLanguage
     */
    addProfileToProject(geovistoryProjectId, ontomeProfileId, requestedLanguage) {
        const callback = (err) => {
            if (err) {
                this.cb({
                    name: `Error when updating api_profile table`,
                    message: err
                });
            }
            else {
                // add the profile and its classes to the geovistory project
                const call1$ = new rxjs_1.Subject();
                const call2$ = new rxjs_1.Subject();
                rxjs_1.combineLatest(call1$, call2$).subscribe(success => {
                    this.cb(false, success);
                }, error => {
                    this.cb({
                        name: `Error when adding profile and classes to project`,
                        message: error
                    });
                });
                /**
                 * Add profile to project
                 */
                const params1 = [];
                const addParam1 = (param) => {
                    params1.push(param);
                    return '$' + params1.length;
                };
                const sql1 = `
        INSERT INTO projects.dfh_profile_proj_rel (fk_project, fk_profile, enabled)
        VALUES (${addParam1(geovistoryProjectId)}, ${addParam1(ontomeProfileId)}, true)
        ON CONFLICT ON CONSTRAINT unique_fk_project_fk_profile
        DO UPDATE SET enabled = true;`;
                this.connector.execute(sql1, params1, (err, resultObjects) => {
                    if (err)
                        call1$.error(err);
                    else
                        call1$.next(resultObjects);
                });
                /**
                 * Add classes to project
                 */
                if (this.classesValidated && this.classesValidated.length) {
                    const params2 = [];
                    const addParam2 = (param) => {
                        params2.push(param);
                        return '$' + params2.length;
                    };
                    const sql2 = `
          INSERT INTO projects.dfh_class_proj_rel (fk_project, fk_class, enabled_in_entities)
          VALUES ${this.classesValidated.map(klass => {
                        return `(${addParam2(geovistoryProjectId)}, ${addParam2(klass.classID)}, true)`;
                    }).join(',')}
          ON CONFLICT ON CONSTRAINT dfh_class_project_rel__class_and_project_unique
          DO UPDATE SET enabled_in_entities = true;`;
                    this.connector.execute(sql2, params2, (err, resultObjects) => {
                        if (err)
                            call2$.error(err);
                        else
                            call2$.next(resultObjects);
                    });
                }
                else {
                    call2$.next();
                }
            }
        };
        this.performUpdateOfProfileData(requestedLanguage, ontomeProfileId, callback);
    }
    /**
     * Deactivates the profile and all its classes for given project
     * @param geovistoryProjectId
     * @param ontomeProfileId
     */
    deactivateProfileForProject(geovistoryProjectId, ontomeProfileId) {
        const params = [ontomeProfileId, geovistoryProjectId];
        const sql = `SELECT projects.deactivate_ontome_profile_for_geovistory_project($1, $2);`;
        this.connector.execute(sql, params, (err) => {
            if (err) {
                this.cb({
                    name: `Error while getting the activation report`,
                    message: err
                });
            }
            else {
                this.cb(false, true);
            }
        });
    }
    /**
     * Pulls data from ontome and updates tables in geovistory
     * @param fkProfile
     * @param requestedLanguage
     */
    updateProfileData(fkProfile, requestedLanguage) {
        const callback = (err, resultObjects) => {
            if (err) {
                this.cb({
                    name: `Error when updating api_profile table`,
                    message: err
                });
            }
            else {
                this.cb(false, resultObjects);
            }
        };
        this.performUpdateOfProfileData(requestedLanguage, fkProfile, callback);
    }
    performUpdateOfProfileData(requestedLanguage, fkProfile, callback) {
        this.requestedLanguage = requestedLanguage;
        this.fkProfile = fkProfile;
        this.getDataFromApis().pipe(operators_1.takeUntil(this.error$)).subscribe(() => {
            // TEMPORARY
            if (this.propertiesParsed) {
                // Remove
                this.propertiesParsed = this.propertiesParsed.filter((prop) => !!prop.propertyLabel);
            }
            // END TEMPORARY
            let isValid = true;
            if (isValid)
                isValid = this.validateDataFromProfilesApi(this.profilesParsed);
            if (isValid)
                isValid = this.validateDataFromClassProfileApi(this.classesParsed);
            if (isValid)
                isValid = this.validateDataFromPropertiesProfileApi(this.propertiesParsed);
            if (this.profilesValidated) {
                this.findRequestedProfile(this.profilesValidated);
            }
            if (isValid) {
                this.upateApiTables(this.profile, this.classesValidated, this.propertiesValidated, callback);
            }
        });
    }
    /**
     * Pulls profile data from ontome and compares those classes and properties with
     * the classes and properties enabled by the given geovistory project
     *
     * It returns an activation report with info about:
     * - the classes from ontome, not yet available in project's profiles
     * - the classes from ontomy, already available in project's profiles
     *
     * - the properties from ontome, not yet available in project's profiles
     * - the properties from ontomy, already available in project's profiles
     *
     */
    getActivationReport(geovistoryProjectId, ontomeProfileId, requestedLanguage) {
        this.requestedLanguage = requestedLanguage;
        this.fkProfile = ontomeProfileId;
        this.getDataFromApis().pipe(operators_1.takeUntil(this.error$)).subscribe(() => {
            // TEMPORARY
            if (this.propertiesParsed) {
                // Remove
                this.propertiesParsed = this.propertiesParsed.filter((prop) => !!prop.propertyLabel);
            }
            // END TEMPORARY
            let isValid = true;
            if (isValid)
                isValid = this.validateDataFromProfilesApi(this.profilesParsed);
            if (isValid)
                isValid = this.validateDataFromClassProfileApi(this.classesParsed);
            if (isValid)
                isValid = this.validateDataFromPropertiesProfileApi(this.propertiesParsed);
            if (this.profilesValidated) {
                this.findRequestedProfile(this.profilesValidated);
            }
            if (isValid && this.classesValidated && this.propertiesValidated) {
                const params = [];
                const addParam = (param) => {
                    params.push(param);
                    return '$' + params.length;
                };
                // Gets a table with the ids  classes and properties enabled by geovistoryProjectId
                const sql = `
            WITH tw1 AS (
              SELECT fk_profile
              FROM projects.dfh_profile_proj_rel
              WHERE fk_project = ${addParam(geovistoryProjectId)}
              AND enabled = true
              UNION
              SELECT 5 as fk_profile -- GEOVISTORY BASICS
            )
            SELECT DISTINCT
              'class' category, t3.pk_class as id
            FROM
              tw1 t1,
              data_for_history.api_class t2,
              data_for_history.v_class t3
            WHERE t1.fk_profile = t2.dfh_fk_profile
            AND t3.pk_class = t2.dfh_pk_class
            UNION ALL
            SELECT DISTINCT
              'property' category, t3.pk_property as id
            FROM
              tw1 t1,
              data_for_history.api_property t2,
              data_for_history.v_property t3
            WHERE t1.fk_profile = t2.dfh_fk_profile
            AND t3.pk_property = t2.dfh_pk_property;
        `;
                // logSql(sql, params);
                this.connector.execute(sql, params, (err, resultObjects) => {
                    if (err) {
                        this.cb({
                            name: `Error while getting the activation report`,
                            message: err
                        });
                    }
                    else {
                        const availableClasses = ramda_1.indexBy((item) => item.id.toString(), resultObjects
                            .filter(item => item.category === 'class'));
                        const availableProperties = ramda_1.indexBy((item) => item.id.toString(), resultObjects
                            .filter(item => item.category === 'property'));
                        const newClasses = [];
                        const oldClasses = [];
                        if (this.classesValidated) {
                            this.classesValidated.forEach(klass => {
                                if (availableClasses[klass.classID]) {
                                    oldClasses.push(this.classToActivationReportItem(klass));
                                }
                                else {
                                    newClasses.push(this.classToActivationReportItem(klass));
                                }
                            });
                        }
                        const newProperties = [];
                        const oldProperties = [];
                        if (this.propertiesValidated) {
                            this.propertiesValidated.forEach(property => {
                                if (availableProperties[property.propertyID]) {
                                    oldProperties.push(this.propertyToActivationReportItem(property));
                                }
                                else {
                                    newProperties.push(this.propertyToActivationReportItem(property));
                                }
                            });
                        }
                        const report = {
                            newClasses,
                            oldClasses,
                            newProperties,
                            oldProperties
                        };
                        this.cb(false, report);
                    }
                });
            }
        });
    }
    /**
     * Creates a report showing what classes and properties
     * would be deactivated, if the given ontomeProfile
     * was deactivated for the given geovistoryProject.
     *
     * The report also shows the number of instances
     * (persistent items, temporal entities and roles)
     * being in the geovistoryProject for each class and property
     * of the given ontomeProfile.
     * @param geovistoryProjectId
     * @param ontomeProfileId
     */
    getDeactivationReport(geovistoryProjectId, ontomeProfileId) {
        const params = [geovistoryProjectId, ontomeProfileId];
        const sql = `
        /**
        * CLASSES
        */
        -- select class profile relations
        WITH ctw1 AS (
          SELECT DISTINCT t1.dfh_pk_class fk_class, t1.dfh_fk_profile fk_profile
          FROM data_for_history.api_class t1
        ),
        -- select the classes of given profile
        ctw2 AS (
          SELECT pk_class, identifier_in_namespace
          FROM
            data_for_history.v_class t1,
            ctw1 t2
          WHERE
            t1.pk_class = t2.fk_class
          AND
            t2.fk_profile = $2
        ),
        -- select the profiles the project would have without given profile
        ctw3 AS (
          SELECT DISTINCT fk_profile
          FROM projects.dfh_profile_proj_rel
          WHERE fk_project = $1
          AND fk_profile != $2
          AND enabled = true
          UNION
          SELECT 5 as fk_profile -- GEOVISTORY BASICS
        ),
        -- select the classes of the profiles of the project except the deactivation-profile
        ctw4 AS (
          SELECT DISTINCT pk_class, identifier_in_namespace
          FROM
            data_for_history.v_class t1,
            ctw1 t2,
            ctw3 t3
          WHERE
            t1.pk_class = t2.fk_class
          AND
            t2.fk_profile = t3.fk_profile
        ),
        -- select the classes that would be deactivated
        ctw5 AS (
          SELECT pk_class
          FROM ctw2
          EXCEPT
          SELECT pk_class
          FROM ctw4
        ),
        -- select the classes of the deactiation-profile that would stay
        -- activated for given project, beacause they are in other activated profiles
        ctw6 AS (
          SELECT pk_class
          FROM ctw2
          EXCEPT
          SELECT pk_class
          FROM ctw5
        ),
        -- union the classes of the deactivation profile and add info
        -- if class will be deactivated or maintained
        ctw7 AS (
          SELECT 'deactivated' status, pk_class
          FROM ctw5
          UNION ALL
          SELECT 'maintained' status, pk_class
          FROM ctw6
        ),
        -- left join the number of entities in given project for each class of given profile
        ctw8 AS (
          SELECT t1.status, t1.pk_class, t2.pk_entity
          FROM
            ctw7 t1
          LEFT JOIN LATERAL (
            SELECT t2.pk_entity
            FROM information.temporal_entity t2,
              projects.info_proj_rel t3
            WHERE t1.pk_class = t2.fk_class
            AND t2.pk_entity = t3.fk_entity
            AND t3.fk_project = $1
            AND t3.is_in_project = true
          ) t2 ON TRUE
          UNION ALL
            SELECT t1.status, t1.pk_class, t2.pk_entity
          FROM
            ctw7 t1
          LEFT JOIN LATERAL (
            SELECT t2.pk_entity
            FROM information.persistent_item t2,
              projects.info_proj_rel t3
            WHERE t1.pk_class = t2.fk_class
            AND t2.pk_entity = t3.fk_entity
            AND t3.fk_project = $1
            AND t3.is_in_project = true
          ) t2 ON TRUE
        ),
        ctw9 AS (
          SELECT status, pk_class, count(pk_entity) number_of_instances
          FROM ctw8
          GROUP BY status, pk_class
        ),


        /**
        * PROPERTIES
        */
        -- select property profile relations
        ptw1 AS (
          SELECT DISTINCT t1.dfh_pk_property fk_property, t1.dfh_fk_profile fk_profile
          FROM data_for_history.api_property t1
        ),
        -- select the properties of given profile
        ptw2 AS (
          SELECT pk_property, identifier_in_namespace
          FROM
            data_for_history.v_property t1,
            ptw1 t2
          WHERE
            t1.pk_property = t2.fk_property
          AND
            t2.fk_profile = $2
        ),
        -- select the profiles the project would have without given profile
        ptw3 AS (
          SELECT DISTINCT fk_profile
          FROM projects.dfh_profile_proj_rel
          WHERE fk_project = $1
          AND fk_profile != $2
          AND enabled = true
          UNION
          SELECT 5 as fk_profile -- GEOVISTORY BASICS
        ),
        -- select the properties of the profiles of the project except the deactivation-profile
        ptw4 AS (
          SELECT DISTINCT pk_property, identifier_in_namespace
          FROM
            data_for_history.v_property t1,
            ptw1 t2,
            ptw3 t3
          WHERE
            t1.pk_property = t2.fk_property
          AND
            t2.fk_profile = t3.fk_profile
        ),
        -- select the properties that would be deactivated
        ptw5 AS (
          SELECT pk_property
          FROM ptw2
          EXCEPT
          SELECT pk_property
          FROM ptw4
        ),
        -- select the properties of the deactiation-profile that would stay
        -- activated for given project, beacause they are in other activated profiles
        ptw6 AS (
          SELECT pk_property
          FROM ptw2
          EXCEPT
          SELECT pk_property
          FROM ptw5
        ),
        -- union the properties of the deactivation profile and add info
        -- if property will be deactivated or maintained
        ptw7 AS (
          SELECT 'deactivated' status, pk_property
          FROM ptw5
          UNION ALL
          SELECT 'maintained' status, pk_property
          FROM ptw6
        ),
        -- left join the number of roles in given project for each property of given profile
        ptw8 AS (
          SELECT t1.status, t1.pk_property, t2.pk_entity
          FROM
            ptw7 t1
          LEFT JOIN LATERAL (
            SELECT t2.pk_entity
            FROM information.role t2,
              projects.info_proj_rel t3
            WHERE t1.pk_property = t2.fk_property
            AND t2.pk_entity = t3.fk_entity
            AND t3.fk_project = $1
            AND t3.is_in_project = true
          ) t2 ON TRUE
        ),
        ptw9 AS (
          SELECT status, pk_property, count(pk_entity) number_of_instances
          FROM ptw8
          GROUP BY status, pk_property
        )
        SELECT DISTINCT 'class' category, t1.pk_class id, t3.identifier_in_namespace, t2.label, t1.number_of_instances, t1.status
        FROM ctw9 t1
        LEFT JOIN war.v_class_preview t2
        ON t1.pk_class = t2.fk_class
        AND t2.fk_project = $1
        JOIN ctw2 t3 ON  t1.pk_class = t3.pk_class
        UNION ALL
        SELECT DISTINCT 'property' category, t1.pk_property id, t3.identifier_in_namespace, t2.label, t1.number_of_instances, t1.status
        FROM ptw9 t1
        LEFT JOIN war.v_property_preview t2
        ON t1.pk_property = t2.fk_property
        AND t2.fk_project = $1
        JOIN ptw2 t3 ON  t1.pk_property = t3.pk_property;
    `;
        this.connector.execute(sql, params, (err, resultObjects) => {
            if (err) {
                this.cb({
                    name: `Error while getting the activation report`,
                    message: err
                });
            }
            else {
                const maintainedClasses = [];
                const deactivatedClasses = [];
                const maintainedProperties = [];
                const deactivatedProperties = [];
                resultObjects.forEach(res => {
                    if (res.category == 'class') {
                        if (res.status == 'maintained') {
                            maintainedClasses.push(this.makeDeactivationReportItem(res));
                        }
                        else {
                            deactivatedClasses.push(this.makeDeactivationReportItem(res));
                        }
                    }
                    else {
                        if (res.status == 'maintained') {
                            maintainedProperties.push(this.makeDeactivationReportItem(res));
                        }
                        else {
                            deactivatedProperties.push(this.makeDeactivationReportItem(res));
                        }
                    }
                });
                const report = {
                    maintainedClasses,
                    deactivatedClasses,
                    maintainedProperties,
                    deactivatedProperties
                };
                this.cb(false, report);
            }
        });
    }
    classToActivationReportItem(i) {
        return {
            id: i.classID,
            label: i.classLabel,
            identifierInNamespace: i.classIdentifierInNamespace
        };
    }
    propertyToActivationReportItem(i) {
        return {
            id: i.propertyID,
            label: i.propertyLabel,
            identifierInNamespace: i.propertyIdentifierInNamespace
        };
    }
    makeDeactivationReportItem(i) {
        return {
            id: i.id,
            label: i.label,
            identifierInNamespace: i.identifier_in_namespace,
            numberOfInstances: i.number_of_instances,
        };
    }
    /**
     * Calls Api
     */
    getDataFromApis() {
        this.timestampBeforeApiCall = new Date();
        const profilesApi$ = new rxjs_1.Subject();
        const classesApi$ = new rxjs_1.Subject();
        const propertiesApi$ = new rxjs_1.Subject();
        // Profiles API
        https_1.get(this.profilesUrl, (res) => {
            let data = '';
            // A chunk of data has been recieved.
            res.on('data', (chunk) => {
                data += chunk;
            });
            // The whole response has been received.
            res.on('end', () => {
                try {
                    this.profilesParsed = JSON.parse(data);
                    profilesApi$.next();
                }
                catch (error) {
                    this.cb(error);
                }
            });
        }).on('error', (error) => {
            this.cb(error);
        });
        // Classes Profile API
        https_1.get(this.classesUrl, (res) => {
            let data = '';
            // A chunk of data has been recieved.
            res.on('data', (chunk) => {
                data += chunk;
            });
            // The whole response has been received.
            res.on('end', () => {
                try {
                    this.classesParsed = JSON.parse(data);
                    classesApi$.next();
                }
                catch (error) {
                    this.cb(error);
                }
            });
        }).on('error', (error) => {
            this.cb(error);
        });
        // Properties Profile API
        https_1.get(this.propertiesUrl, (res) => {
            let data = '';
            // A chunk of data has been recieved.
            res.on('data', (chunk) => {
                data += chunk;
            });
            // The whole response has been received.
            res.on('end', () => {
                try {
                    this.propertiesParsed = JSON.parse(data);
                    propertiesApi$.next();
                }
                catch (error) {
                    this.cb(error);
                }
            });
        }).on('error', (error) => {
            this.cb(error);
        });
        return rxjs_1.combineLatest([profilesApi$, classesApi$, propertiesApi$]);
    }
    /**
     * Validates data from Profiles Api
     */
    validateDataFromProfilesApi(parsed) {
        const validation = api_profile_list_validator_1.isValidApiProfileList(parsed);
        if (validation.error) {
            this.cb({
                name: `Data from "${this.profilesUrl}" does not match schema expected by Geovistory`,
                message: validation.error,
            });
            return false;
        }
        else {
            this.profilesValidated = parsed;
            return true;
        }
    }
    /**
      * Validates data from Classes Profile Api
      */
    validateDataFromClassProfileApi(parsed) {
        const validation = api_class_profile_list_validator_1.isValidApiClassProfileList(parsed);
        if (validation.error) {
            this.cb({
                name: `Data from "${this.classesUrl}" does not match schema expected by Geovistory`,
                message: validation.error,
            });
            return false;
        }
        else {
            this.classesValidated = parsed;
            return true;
        }
    }
    /**
      * Validates data from Properties Profile Api
      */
    validateDataFromPropertiesProfileApi(parsed) {
        const validation = api_property_profile_list_validator_1.isValidApiPropertyProfileList(parsed);
        if (validation.error) {
            this.cb({
                name: `Data from "${this.propertiesUrl}" does not match schema expected by Geovistory`,
                message: validation.error,
            });
            return false;
        }
        else {
            this.propertiesValidated = parsed;
            return true;
        }
    }
    findRequestedProfile(data) {
        this.profile = data.find(profile => profile.profileID === this.fkProfile);
    }
    /**
     * Update Database tables
     * - api_profile
     * - api_class
     * - api_property
     *
     * @param profileData Object of the requested profile and language
     * @param classesData Array of classes of the requested profile and language
     * @param propertiesData Array of properties of the requested profile and language
     */
    upateApiTables(profileData, classesData, propertiesData, callback) {
        let sql;
        const params = [];
        const addParam = (param) => {
            params.push(param);
            return '$' + params.length;
        };
        sql = `
      SELECT data_for_history.update_api_tables (
        ${addParam(this.fkProfile)},
        ${addParam(this.requestedLanguage)},
        ${addParam(this.timestampBeforeApiCall)},
        ${addParam(profileData)},
        ${addParam(JSON.stringify(classesData))},
        ${addParam(JSON.stringify(propertiesData))}
      )
      `;
        // logSql(sql, params);
        this.connector.execute(sql, params, callback);
    }
}
exports.OntoMe = OntoMe;
//# sourceMappingURL=ontome.js.map