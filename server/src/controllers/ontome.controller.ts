/* eslint-disable @typescript-eslint/no-explicit-any */
import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {get, HttpErrors, param, post} from '@loopback/rest';
import {get as getHttp} from 'https';
import path from 'path';
import {indexBy} from 'ramda';
import {GeovistoryApplication} from '../application';
import {Roles} from '../components/authorization/keys';
import {applyValidator, createValidator} from '../components/json-schema-validation/json-schema-validation';
import {Postgres1DataSource} from '../datasources';
import {ApiClassProfile, ApiClassProfileList} from '../models/ontome-api/api-class-profile';
import {ApiProfile, ApiProfileList} from '../models/ontome-api/api-profile';
import {ApiPropertyProfile, ApiPropertyProfileList} from '../models/ontome-api/api-property-profile';
import {ActivationReportItem, ProfileActivationReport} from '../models/ontome-api/profile-activation-report';
import {DeactivationReportItem, ProfileDeactivationReport} from '../models/ontome-api/profile-deactivation-report';
import {SqlBuilderBase} from '../utils/sql-builders/sql-builder-base';
interface DeactivationReportQueryRow {
  category: 'property' | 'class',
  id: number,
  identifier_in_namespace: string,
  label: string
  number_of_instances: number,
  status: 'maintained' | 'deactivated'
}

const onromeUrl = process.env['ONTOME_URL'] ?? 'https://ontome.net'

export class OntoMeController {


  _profilesUrl = path.join(onromeUrl + '/api/profiles.json');

  _classesUrl = path.join(onromeUrl + '/api/classes-profile.json');

  _propertiesUrl = path.join(onromeUrl + '/api/properties-profile.json');



  constructor(
    @inject('datasources.postgres1')
    public datasource: Postgres1DataSource,
    @inject('app')
    public app: GeovistoryApplication,
  ) { }

  /**
 * Pulls data from ontome and updates tables in geovistory
 * @param fkProfile
 * @param requestedLanguage
 */
  @post('ontome/update-from-ontome', {
    responses: {
      '200': {
        description: "Pulled profile data including classes and properties from OntoMe and updated profile data in geovistory.",
      },
    },
  })
  @authenticate('basic')
  async updateProfileFromOntome(
    @param.query.number('pkProfile') pkProfile: number,
    @param.query.string('requestedLanguage') requestedLanguage: string
  ): Promise<void> {

    await this.performUpdateOfProfileData(requestedLanguage, pkProfile);

  }

  /**
   * Pulls data from ontome, updates tables in geovistory
   * and activates the profile and all its classes for given project
   */
  @post('ontome/update-profile-and-add-it-to-project', {
    responses: {
      '204': {
        description: "Pulled profile data including classes and properties from OntoMe activated profile to project.",
      },
    },
  })
  @authenticate('basic')
  @authorize({allowedRoles: [Roles.PROJECT_MEMBER]})
  async updateAndAddToProject(
    @param.query.number('pkProject') pkProject: number,
    @param.query.number('pkProfile') pkProfile: number,
    @param.query.string('requestedLanguage') requestedLanguage: string
  ): Promise<void> {

    /**
     * Update profile with all aspects (labels, classes, props, ...) for all projects
     */
    const {classes} = await this.performUpdateOfProfileData(requestedLanguage, pkProfile);

    /**
     * Add profile to project
     */
    await this.addProfileToProject(pkProject, pkProfile);

    /**
     * Add classes to project
     */
    await this.addClassesToProject(classes, pkProject);

  }

  /**
   * Deactivates the profile and all its classes for given project
   */
  @post('ontome/deactivate-ontome-profile-for-geovistory-project', {
    responses: {
      '204': {
        "description": "Deactivated a OntoMe profile for a Geovistory project."
      },
    },
  })
  @authenticate('basic')
  @authorize({allowedRoles: [Roles.PROJECT_MEMBER]})
  async deactivateProfileForProject(
    @param.query.number('pkProject') pkProject: number,
    @param.query.number('pkProfile') pkProfile: number,
  ): Promise<void> {
    const params = [pkProfile, pkProject];
    const sql = 'SELECT projects.deactivate_ontome_profile_for_geovistory_project($1, $2);';
    await this.datasource.execute(sql, params)
    return
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
  @get('ontome/get-activation-report', {
    responses: {
      '200': {
        "description": "Created an activation report for the given OntoMe profile and the given Geovistory project.",
        content: {
          'application/json': {
            schema: {
              'x-ts-type': ProfileActivationReport,
            }
          }
        },
      },
    },
  })
  @authenticate('basic')
  @authorize({allowedRoles: [Roles.PROJECT_MEMBER]})
  async getActivationReport(
    @param.query.number('pkProject') pkProject: number,
    @param.query.number('pkProfile') pkProfile: number,
    @param.query.string('requestedLanguage') requestedLanguage: string
  ): Promise<ProfileActivationReport> {

    const res = await this.getDataFromApis(requestedLanguage, pkProfile)
    const q = new SqlBuilderBase()
    q.sql = `
      WITH tw1 AS (
        SELECT fk_profile
        FROM projects.dfh_profile_proj_rel
        WHERE fk_project = ${q.addParam(pkProject)}
        AND enabled = true
        UNION ALL
        SELECT jsonb_array_elements_text(config->'ontome'->'requiredOntomeProfiles')::int fk_profile
        FROM system.config
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

    const resultObjects: {
      category: 'property' | 'class',
      id: number
    }[] = await this.datasource.execute(q.sql, q.params)

    const availableClasses = indexBy(
      (item) => item.id.toString(),
      resultObjects
        .filter(item => item.category === 'class')
    );
    const availableProperties = indexBy(
      (item) => item.id.toString(),
      resultObjects
        .filter(item => item.category === 'property')
    );

    const newClasses: ActivationReportItem[] = [];
    const oldClasses: ActivationReportItem[] = [];

    if (res.classes) {
      res.classes.forEach(klass => {
        if (availableClasses[klass.classID]) {
          oldClasses.push(this.classToActivationReportItem(klass));
        } else {
          newClasses.push(this.classToActivationReportItem(klass));
        }
      });
    }

    const newProperties: ActivationReportItem[] = [];
    const oldProperties: ActivationReportItem[] = [];

    if (res.properties) {
      res.properties.forEach(property => {
        if (availableProperties[property.propertyID]) {
          oldProperties.push(this.propertyToActivationReportItem(property));
        } else {
          newProperties.push(this.propertyToActivationReportItem(property));
        }
      });
    }

    const report: ProfileActivationReport = {
      newClasses,
      oldClasses,
      newProperties,
      oldProperties,
    };

    return report;
  }


  /**
   * Creates a report showing what classes and properties
   * would be deactivated, if the given ontomeProfile
   * was deactivated for the given geovistoryProject.
   *
   * The report also shows the number of instances
   * (persistent items, temporal entities and statements)
   * being in the geovistoryProject for each class and property
   * of the given ontomeProfile.

   */
  @get('ontome/get-deactivation-report', {
    responses: {
      '200': {
        "description": "Created an deactivation report for the given OntoMe profile and the given Geovistory project.",
        content: {
          'application/json': {
            schema: {
              'x-ts-type': ProfileDeactivationReport,
            }
          }
        },
      },
    },
  })
  @authenticate('basic')
  @authorize({allowedRoles: [Roles.PROJECT_MEMBER]})
  async getDeactivationReport(
    @param.query.number('pkProject') pkProject: number,
    @param.query.number('pkProfile') pkProfile: number,
  )
  // : Promise<ProfileDeactivationReport>
  {

    const params = [pkProject, pkProfile];
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
          UNION ALL
          SELECT jsonb_array_elements_text(config->'ontome'->'requiredOntomeProfiles')::int fk_profile
          FROM system.config
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
        -- left join the number of resources in given project for each class of given profile
        ctw8 AS (

          SELECT t1.status, t1.pk_class, t2.pk_entity
          FROM
            ctw7 t1
          LEFT JOIN LATERAL (
            SELECT t2.pk_entity
            FROM information.resource t2,
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
          UNION ALL
          SELECT jsonb_array_elements_text(config->'ontome'->'requiredOntomeProfiles')::int fk_profile
          FROM system.config
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
        -- left join the number of statements in given project for each property of given profile
        ptw8 AS (
          SELECT t1.status, t1.pk_property, t2.pk_entity
          FROM
            ptw7 t1
          LEFT JOIN LATERAL (
            SELECT t2.pk_entity
            FROM information.statement t2,
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
        LEFT JOIN pgwar.v_class_preview t2
        ON t1.pk_class = t2.fk_class
        AND t2.fk_project = $1
        JOIN ctw2 t3 ON  t1.pk_class = t3.pk_class
        UNION ALL
        SELECT DISTINCT 'property' category, t1.pk_property id, t3.identifier_in_namespace, t2.label, t1.number_of_instances, t1.status
        FROM ptw9 t1
        LEFT JOIN pgwar.v_property_preview t2
        ON t1.pk_property = t2.fk_property
        AND t2.fk_project = $1
        JOIN ptw2 t3 ON  t1.pk_property = t3.pk_property;
    `;
    const resultObjects: DeactivationReportQueryRow[] = await this.datasource.execute(sql, params);
    const maintainedClasses: DeactivationReportItem[] = [];
    const deactivatedClasses: DeactivationReportItem[] = [];
    const maintainedProperties: DeactivationReportItem[] = [];
    const deactivatedProperties: DeactivationReportItem[] = [];
    resultObjects.forEach(res => {
      if (res.category === 'class') {
        if (res.status === 'maintained') {
          maintainedClasses.push(this.makeDeactivationReportItem(res));
        } else {
          deactivatedClasses.push(this.makeDeactivationReportItem(res));
        }
      } else {
        if (res.status === 'maintained') {
          maintainedProperties.push(this.makeDeactivationReportItem(res));
        } else {
          deactivatedProperties.push(this.makeDeactivationReportItem(res));
        }
      }
    });
    const report: ProfileDeactivationReport = {
      maintainedClasses,
      deactivatedClasses,
      maintainedProperties,
      deactivatedProperties,
    };
    return report

  }



  /*****************************************************************************
   * Private methods NOT exposed as REST API endpoint
   ****************************************************************************/

  private async performUpdateOfProfileData(requestedLanguage: string, fkProfile: number) {
    const lang = this.getRequestedLanguage(requestedLanguage);
    const res = await this.getDataFromApis(requestedLanguage, fkProfile)
    return this.upateApiTables(lang, fkProfile, res.timestampBeforeApiCall, res.profile, res.classes, res.properties);
  }

  private async getHttpPromise(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      getHttp(url, (res) => {
        let data = '';
        // A chunk of data has been recieved.
        res.on('data', (chunk) => {
          data += chunk;
        });
        // The whole response has been received.
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            resolve(parsed);
          } catch (error) {
            reject(error);
          }
        });
      }).on('error', (error) => {
        reject(error);
      });
    })
  }

  private async getDataFromApis(requestedLanguage: string, fkProfile: number) {
    const timestampBeforeApiCall = new Date();

    const profilesUrl = this.profilesUrl(requestedLanguage)
    const classesUrl = this.classesUrl(requestedLanguage, fkProfile)
    const propertiesUrl = this.propertiesUrl(requestedLanguage, fkProfile)
    const [profiles, classes, properties] = await Promise.all([
      this.getHttpPromise(profilesUrl),
      this.getHttpPromise(classesUrl),
      this.getHttpPromise(propertiesUrl),
    ])
    const profilesValidator = await createValidator(ApiProfileList, this.app)
    const classesValidator = await createValidator(ApiClassProfileList, this.app)
    const propertiesValidator = await createValidator(ApiPropertyProfileList, this.app)
    let prof: ApiProfile[] = [];
    let clas: ApiClassProfile[] = [];
    let props: ApiPropertyProfile[] = [];

    const errors: string[] = []
    try {
      // const p = profiles.find((x: any) => x.profileID === fkProfile);
      // prof = await applyValidator<ApiProfile[]>(removeNulls([p]), profilesValidator)
      prof = await applyValidator<ApiProfile[]>(removeNulls(profiles), profilesValidator)
    } catch (error) {
      errors.push(`ERROR Invalid response of: ${profilesUrl} ${error}`)

    }
    try {
      const classesCleaned = removeNulls(classes);
      clas = await applyValidator<ApiClassProfile[]>(classesCleaned, classesValidator)
    } catch (error) {
      errors.push(`ERROR Invalid response of: ${classesUrl} ${error}`)
    }

    try {
      props = await applyValidator<ApiPropertyProfile[]>(removeNulls(properties), propertiesValidator)
      props = props.filter((prop: any) => !!prop.propertyLabel);

    } catch (error) {
      errors.push(`ERROR Invalid response of: ${propertiesUrl} ${error}`)
    }

    if (errors.length) {
      const e = errors.join('\n')
      console.log(e)
      throw new HttpErrors.InternalServerError(e)
    }


    // find the requested profile
    const profile = prof.find(p => p.profileID === fkProfile);

    return {profile, classes: clas, properties: props, timestampBeforeApiCall}
  }




  /**
  * Update Database tables
  * - api_profile
  * - api_class
  * - api_property
  *
  * @param profile Object of the requested profile and language
  * @param classes Array of classes of the requested profile and language
  * @param properties Array of properties of the requested profile and language
  */
  async upateApiTables(
    requestedLanguage: string,
    fkProfile: number,
    timestampBeforeApiCall: Date | undefined,
    profile: ApiProfile | undefined,
    classes: ApiClassProfile[] | undefined,
    properties: ApiPropertyProfile[] | undefined
  ) {

    const q = new SqlBuilderBase()
    q.sql = `
        SELECT data_for_history.update_api_tables (
          ${q.addParam(fkProfile)},
          ${q.addParam(requestedLanguage)},
          ${q.addParam(timestampBeforeApiCall)},
          ${q.addParam(profile)},
          ${q.addParam(JSON.stringify(classes))},
          ${q.addParam(JSON.stringify(properties))}
        )
        `;


    await this.datasource.execute(q.sql, q.params);
    return {
      timestampBeforeApiCall,
      profile,
      classes,
      properties
    }
  }

  getRequestedLanguage(requestedLanguage: string): string {
    return (requestedLanguage === '{}' || !requestedLanguage) ? 'en' : requestedLanguage;
  }
  profilesUrl(requestedLanguage: string): string {
    return this._profilesUrl + `?lang=${requestedLanguage}`;
  }
  classesUrl(requestedLanguage: string, fkProfile: number): string {
    return this._classesUrl + `?lang=${requestedLanguage}&available-in-profile=${fkProfile}`;
  }
  propertiesUrl(requestedLanguage: string, fkProfile: number): string {
    return this._propertiesUrl + `?lang=${requestedLanguage}&available-in-profile=${fkProfile}`;
  }


  private async addProfileToProject(pkProject: number, pkProfile: number) {
    const q = new SqlBuilderBase();
    q.sql = `
      INSERT INTO projects.dfh_profile_proj_rel (fk_project, fk_profile, enabled)
      VALUES (${q.addParam(pkProject)}, ${q.addParam(pkProfile)}, true)
      ON CONFLICT ON CONSTRAINT unique_fk_project_fk_profile
      DO UPDATE SET enabled = true;`;

    await this.datasource.execute(q.sql, q.params);
  }
  private async addClassesToProject(classes: ApiClassProfile[] | undefined, pkProject: number) {
    if (classes?.length) {
      const q = new SqlBuilderBase();
      q.sql = `
        INSERT INTO projects.dfh_class_proj_rel (fk_project, fk_class, enabled_in_entities)
        VALUES ${classes.map(klass => `(${q.addParam(pkProject)}, ${q.addParam(klass.classID)}, true)`).join(',')}
        ON CONFLICT ON CONSTRAINT dfh_class_project_rel__class_and_project_unique
        DO UPDATE SET enabled_in_entities = true;`;

      await this.datasource.execute(q.sql, q.params);
    }
  }


  private classToActivationReportItem(i: ApiClassProfile): ActivationReportItem {
    return {
      id: i.classID,
      label: i.classLabel,
      identifierInNamespace: i.classIdentifierInNamespace,
    };
  }
  private propertyToActivationReportItem(i: ApiPropertyProfile): ActivationReportItem {
    return {
      id: i.propertyID,
      label: i.propertyLabel,
      identifierInNamespace: i.propertyIdentifierInNamespace,
    };
  }
  private makeDeactivationReportItem(i: DeactivationReportQueryRow): DeactivationReportItem {
    return {
      id: i.id,
      label: i.label,
      identifierInNamespace: i.identifier_in_namespace,
      numberOfInstances: i.number_of_instances,
    };
  }

}


export const removeNulls = (obj: any) => {
  if (Array.isArray(obj)) {
    const newArry: any[] = [];
    obj.forEach(item => {
      if (item === Object(item)) {
        newArry.push(removeNulls(item));
      }
      else if (item !== null) newArry.push(item);
    })
    return newArry
  }
  else {
    const newObj: any = {};
    Object.keys(obj).forEach((key) => {
      if (obj[key] === Object(obj[key])) {
        newObj[key] = removeNulls(obj[key]);
      }
      else if (obj[key] !== null) newObj[key] = obj[key];
    });
    return newObj;
  }
};
