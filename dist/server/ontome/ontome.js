"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = require("https");
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
    addToProject() { }
    /**
     * Pulls data from ontome and updates tables in geovistory
     * @param fkProfile
     * @param requestedLanguage
     */
    updateProfileData(fkProfile, requestedLanguage) {
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
            if (isValid)
                this.upateApiTables(this.profile, this.classesValidated, this.propertiesValidated);
        });
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
    upateApiTables(profileData, classesData, propertiesData) {
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
        this.connector.execute(sql, params, (err, resultObjects) => {
            if (err) {
                this.cb({
                    name: `Error when updating api_profile table`,
                    message: err
                });
            }
            else {
                this.cb(false, resultObjects);
            }
        });
    }
    callOntoMeApi() {
        const a = this.fkProject;
        const b = this.connector;
        console.log(a, b);
    }
}
exports.OntoMe = OntoMe;
//# sourceMappingURL=ontome.js.map