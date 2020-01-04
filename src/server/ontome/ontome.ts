import { get } from 'https';
import { indexBy } from 'ramda';
import { combineLatest, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiProfile, ApiProfileList } from '../../common';
import { ApiClassProfile, ApiClassProfileList } from '../../common/interfaces/api-class-profile-list.interface';
import { ApiPropertyProfile, ApiPropertyProfileList } from '../../common/interfaces/api-property-profile-list.interface';
import { ActivationReportItem, ProfileActivationReport } from '../../common/interfaces/profile-activation-report.interface';
import { DeactivationReportItem, ProfileDeactivationReport } from '../../common/interfaces/profile-deactivation-report.interface';
import { isValidApiClassProfileList } from '../../common/validators/api-class-profile-list.validator';
import { isValidApiProfileList } from '../../common/validators/api-profile-list.validator';
import { isValidApiPropertyProfileList } from '../../common/validators/api-property-profile-list.validator';
import { ErrorObj } from '../analysis/analysis';
type Callback = (err: ErrorObj | false, res?: any) => void;
interface DeactivationReportQueryRow {
  category: 'property' | 'class',
  id: number,
  identifier_in_namespace: string,
  label: string
  number_of_instances: number,
  status: 'maintained' | 'deactivated'
}

export class OntoMe {
  timestampBeforeApiCall: Date | undefined;

  _profilesUrl = 'https://ontome.dataforhistory.org/api/profiles.json';
  get profilesUrl(): string {
    return this._profilesUrl + `?lang=${this.requestedLanguage}`;
  }
  profilesParsed: any;
  profilesValidated: ApiProfileList | undefined;
  profile: ApiProfile | undefined;

  _classesUrl = 'https://ontome.dataforhistory.org/api/classes-profile.json';
  get classesUrl(): string {
    return this._classesUrl + `?lang=${this.requestedLanguage}&available-in-profile=${this.fkProfile}`;
  }
  classesParsed: any;
  classesValidated: ApiClassProfileList | undefined;

  _propertiesUrl = 'https://ontome.dataforhistory.org/api/properties-profile.json';
  get propertiesUrl(): string {
    return this._propertiesUrl + `?lang=${this.requestedLanguage}&available-in-profile=${this.fkProfile}`;
  }
  propertiesParsed: any;
  propertiesValidated: ApiPropertyProfileList | undefined;

  error$ = new Subject()


  private _requestedLanguage: any;
  set requestedLanguage(x: string) {
    this._requestedLanguage = x
  }
  get requestedLanguage(): string {
    return (this._requestedLanguage === '{}' || !this._requestedLanguage) ? 'en' : this._requestedLanguage
  }

  private fkProfile: number | undefined;

  constructor(
    private cb: Callback,
    private connector: any,
  ) {
    this.cb = (err, res) => {
      if (err) this.error$.next();
      cb(err, res)
    }

  }

  /**
   * Pulls data from ontome, updates tables in geovistory
   * and activates the profile and all its classes for given project
   * @param geovistoryProjectId
   * @param ontomeProfileId
   * @param requestedLanguage
   */
  addProfileToProject(geovistoryProjectId: number, ontomeProfileId: number, requestedLanguage: string) {

    const callback = (err: any) => {
      if (err) {
        this.cb({
          name: `Error when updating api_profile table`,
          message: err
        });
      }
      else {
        // add the profile and its classes to the geovistory project
        const call1$ = new Subject();
        const call2$ = new Subject();

        combineLatest(call1$, call2$).subscribe(
          success => {
            this.cb(false, success)
          },
          error => {
            this.cb({
              name: `Error when adding profile and classes to project`,
              message: error
            })
          }
        )

        /**
         * Add profile to project
         */
        const params1: any[] = [];
        const addParam1 = (param: any) => {
          params1.push(param);
          return '$' + params1.length;
        }
        const sql1 = `
        INSERT INTO projects.dfh_profile_proj_rel (fk_project, fk_profile, enabled)
        VALUES (${addParam1(geovistoryProjectId)}, ${addParam1(ontomeProfileId)}, true)
        ON CONFLICT ON CONSTRAINT unique_fk_project_fk_profile
        DO UPDATE SET enabled = true;`

        this.connector.execute(sql1, params1, (err: any, resultObjects: any) => {
          if (err) call1$.error(err)
          else call1$.next(resultObjects)
        })

        /**
         * Add classes to project
         */
        if (this.classesValidated && this.classesValidated.length) {

          const params2: any[] = [];
          const addParam2 = (param: any) => {
            params2.push(param);
            return '$' + params2.length;
          }
          const sql2 = `
          INSERT INTO projects.dfh_class_proj_rel (fk_project, fk_class, enabled_in_entities)
          VALUES ${this.classesValidated.map(klass => {
            return `(${addParam2(geovistoryProjectId)}, ${addParam2(klass.classID)}, true)`
          }).join(',')}
          ON CONFLICT ON CONSTRAINT dfh_class_project_rel__class_and_project_unique
          DO UPDATE SET enabled_in_entities = true;`

          this.connector.execute(sql2, params2, (err: any, resultObjects: any) => {
            if (err) call2$.error(err)
            else call2$.next(resultObjects)
          })
        }
        else {
          call2$.next()
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
  deactivateProfileForProject(geovistoryProjectId: number, ontomeProfileId: number) {
    const params = [ontomeProfileId, geovistoryProjectId];
    const sql = `SELECT projects.deactivate_ontome_profile_for_geovistory_project($1, $2);`;

    this.connector.execute(sql, params, (err: any) => {
      if (err) {
        this.cb({
          name: `Error while getting the activation report`,
          message: err
        })
      }
      else {
        this.cb(false, true)
      }
    })


  }


  /**
   * Pulls data from ontome and updates tables in geovistory
   * @param fkProfile
   * @param requestedLanguage
   */
  updateProfileData(fkProfile: number, requestedLanguage: string) {

    const callback = (err: any, resultObjects: any) => {
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



  private performUpdateOfProfileData(requestedLanguage: string, fkProfile: number, callback: (err: any, resultObjects: any) => void) {
    this.requestedLanguage = requestedLanguage;
    this.fkProfile = fkProfile;
    this.getDataFromApis().pipe(takeUntil(this.error$)).subscribe(() => {
      // TEMPORARY
      if (this.propertiesParsed) {
        // Remove
        this.propertiesParsed = this.propertiesParsed.filter((prop: any) => !!prop.propertyLabel);
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
  getActivationReport(geovistoryProjectId: number, ontomeProfileId: number, requestedLanguage: string) {
    this.requestedLanguage = requestedLanguage
    this.fkProfile = ontomeProfileId;

    this.getDataFromApis().pipe(
      takeUntil(this.error$)
    ).subscribe(() => {

      // TEMPORARY
      if (this.propertiesParsed) {
        // Remove
        this.propertiesParsed = this.propertiesParsed.filter((prop: any) => !!prop.propertyLabel)
      }
      // END TEMPORARY

      let isValid = true;
      if (isValid) isValid = this.validateDataFromProfilesApi(this.profilesParsed);
      if (isValid) isValid = this.validateDataFromClassProfileApi(this.classesParsed)
      if (isValid) isValid = this.validateDataFromPropertiesProfileApi(this.propertiesParsed)


      if (this.profilesValidated) {
        this.findRequestedProfile(this.profilesValidated);
      }

      if (isValid && this.classesValidated && this.propertiesValidated) {

        const params: any[] = [];
        const addParam = (param: any) => {
          params.push(param);
          return '$' + params.length;
        }

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

        this.connector.execute(sql, params, (err: any, resultObjects: {
          category: 'property' | 'class',
          id: number
        }[]) => {
          if (err) {
            this.cb({
              name: `Error while getting the activation report`,
              message: err
            })
          }
          else {

            const availableClasses = indexBy(
              (item) => item.id.toString(),
              resultObjects
                .filter(item => item.category === 'class')
            )
            const availableProperties = indexBy(
              (item) => item.id.toString(),
              resultObjects
                .filter(item => item.category === 'property')
            )

            const newClasses: ActivationReportItem[] = [];
            const oldClasses: ActivationReportItem[] = [];

            if (this.classesValidated) {
              this.classesValidated.forEach(klass => {
                if (availableClasses[klass.classID]) {
                  oldClasses.push(this.classToActivationReportItem(klass))
                } else {
                  newClasses.push(this.classToActivationReportItem(klass))
                }
              })
            }

            const newProperties: ActivationReportItem[] = [];
            const oldProperties: ActivationReportItem[] = [];

            if (this.propertiesValidated) {
              this.propertiesValidated.forEach(property => {
                if (availableProperties[property.propertyID]) {
                  oldProperties.push(this.propertyToActivationReportItem(property))
                } else {
                  newProperties.push(this.propertyToActivationReportItem(property))
                }
              })
            }

            const report: ProfileActivationReport = {
              newClasses,
              oldClasses,
              newProperties,
              oldProperties
            }

            this.cb(false, report)
          }
        });
      }

    })

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
  getDeactivationReport(geovistoryProjectId: number, ontomeProfileId: number) {
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

    this.connector.execute(sql, params, (err: any, resultObjects: DeactivationReportQueryRow[]) => {
      if (err) {
        this.cb({
          name: `Error while getting the activation report`,
          message: err
        })
      }
      else {
        const maintainedClasses: DeactivationReportItem[] = [];
        const deactivatedClasses: DeactivationReportItem[] = [];
        const maintainedProperties: DeactivationReportItem[] = [];
        const deactivatedProperties: DeactivationReportItem[] = [];
        resultObjects.forEach(res => {
          if (res.category == 'class') {
            if (res.status == 'maintained') {
              maintainedClasses.push(this.makeDeactivationReportItem(res))
            } else {
              deactivatedClasses.push(this.makeDeactivationReportItem(res))
            }
          } else {
            if (res.status == 'maintained') {
              maintainedProperties.push(this.makeDeactivationReportItem(res))
            } else {
              deactivatedProperties.push(this.makeDeactivationReportItem(res))
            }
          }
        })
        const report: ProfileDeactivationReport = {
          maintainedClasses,
          deactivatedClasses,
          maintainedProperties,
          deactivatedProperties
        }
        this.cb(false, report)
      }
    })


  }



  private classToActivationReportItem(i: ApiClassProfile): ActivationReportItem {
    return {
      id: i.classID,
      label: i.classLabel,
      identifierInNamespace: i.classIdentifierInNamespace
    }
  }
  private propertyToActivationReportItem(i: ApiPropertyProfile): ActivationReportItem {
    return {
      id: i.propertyID,
      label: i.propertyLabel,
      identifierInNamespace: i.propertyIdentifierInNamespace
    }
  }

  private makeDeactivationReportItem(i: DeactivationReportQueryRow): DeactivationReportItem {
    return {
      id: i.id,
      label: i.label,
      identifierInNamespace: i.identifier_in_namespace,
      numberOfInstances: i.number_of_instances,
    }
  }
  /**
   * Calls Api
   */
  private getDataFromApis(): Observable<any> {

    this.timestampBeforeApiCall = new Date();

    const profilesApi$ = new Subject()
    const classesApi$ = new Subject()
    const propertiesApi$ = new Subject()

    // Profiles API
    get(this.profilesUrl, (res) => {
      let data = '';
      // A chunk of data has been recieved.
      res.on('data', (chunk) => {
        data += chunk;
      });
      // The whole response has been received.
      res.on('end', () => {
        try {
          this.profilesParsed = JSON.parse(data);
          profilesApi$.next()
        } catch (error) {
          this.cb(error);
        }
      });
    }).on('error', (error) => {
      this.cb(error);
    });

    // Classes Profile API
    get(this.classesUrl, (res) => {
      let data = '';
      // A chunk of data has been recieved.
      res.on('data', (chunk) => {
        data += chunk;
      });
      // The whole response has been received.
      res.on('end', () => {
        try {
          this.classesParsed = JSON.parse(data);
          classesApi$.next()
        } catch (error) {
          this.cb(error);
        }
      });
    }).on('error', (error) => {
      this.cb(error);
    });

    // Properties Profile API
    get(this.propertiesUrl, (res) => {
      let data = '';
      // A chunk of data has been recieved.
      res.on('data', (chunk) => {
        data += chunk;
      });
      // The whole response has been received.
      res.on('end', () => {
        try {
          this.propertiesParsed = JSON.parse(data);
          propertiesApi$.next()
        } catch (error) {
          this.cb(error);
        }
      });
    }).on('error', (error) => {
      this.cb(error);
    });



    return combineLatest([profilesApi$, classesApi$, propertiesApi$])
  }

  /**
   * Validates data from Profiles Api
   */
  private validateDataFromProfilesApi(parsed: any): boolean {
    const validation = isValidApiProfileList(parsed);
    if (validation.error) {
      this.cb({
        name: `Data from "${this.profilesUrl}" does not match schema expected by Geovistory`,
        message: validation.error,
      });
      return false;

    }
    else {
      this.profilesValidated = parsed as ApiProfileList;
      return true;

    }
  }

  /**
    * Validates data from Classes Profile Api
    */
  private validateDataFromClassProfileApi(parsed: any): boolean {
    const validation = isValidApiClassProfileList(parsed);
    if (validation.error) {
      this.cb({
        name: `Data from "${this.classesUrl}" does not match schema expected by Geovistory`,
        message: validation.error,
      });
      return false;
    }
    else {
      this.classesValidated = parsed as ApiClassProfileList;
      return true;

    }
  }


  /**
    * Validates data from Properties Profile Api
    */
  private validateDataFromPropertiesProfileApi(parsed: any): boolean {
    const validation = isValidApiPropertyProfileList(parsed);
    if (validation.error) {
      this.cb({
        name: `Data from "${this.propertiesUrl}" does not match schema expected by Geovistory`,
        message: validation.error,
      });
      return false;

    }
    else {
      this.propertiesValidated = parsed as ApiPropertyProfileList;
      return true;

    }
  }


  private findRequestedProfile(data: ApiProfile[]) {
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
  upateApiTables(
    profileData: ApiProfile | undefined,
    classesData: ApiClassProfileList | undefined,
    propertiesData: ApiPropertyProfileList | undefined,
    callback: (err: any, resultObjects: any) => void
  ) {
    let sql;
    const params: any[] = [];
    const addParam = (param: any) => {
      params.push(param);
      return '$' + params.length;
    }

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

