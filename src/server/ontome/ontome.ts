import { get } from 'https';
import { combineLatest, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiProfile, ApiProfileList } from '../../common';
import { ApiClassProfileList } from '../../common/interfaces/api-class-profile-list.interface';
import { isValidApiClassProfileList } from '../../common/validators/api-class-profile-list.validator';
import { isValidApiProfileList } from '../../common/validators/api-profile-list.validator';
import { ErrorObj } from '../analysis/analysis';
import { ApiPropertyProfileList } from '../../common/interfaces/api-property-profile-list.interface';
import { isValidApiPropertyProfileList } from '../../common/validators/api-property-profile-list.validator';
type Callback = (err: ErrorObj | false, res?: any) => void;

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
    return this._requestedLanguage || 'en'
  }

  private fkProfile: number | undefined;
  private fkProject: number | undefined;

  constructor(
    private cb: Callback,
    private connector: any,
  ) {
    this.cb = (err, res) => {
      if (err) this.error$.next();
      cb(err, res)
    }

  }

  addToProject() { }


  /**
   * Pulls data from ontome and updates tables in geovistory
   * @param fkProfile
   * @param requestedLanguage
   */
  updateProfileData(fkProfile: number, requestedLanguage: string) {
    this.requestedLanguage = requestedLanguage
    this.fkProfile = fkProfile;

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

      if (isValid) this.upateApiTables(this.profile, this.classesValidated, this.propertiesValidated)

    })


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
    propertiesData: ApiPropertyProfileList | undefined
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

    this.connector.execute(sql, params, (err: any, resultObjects: any) => {
      if (err) {
        this.cb({
          name: `Error when updating api_profile table`,
          message: err
        })
      }
      else {

        this.cb(false, resultObjects)
      }
    });
  }

  callOntoMeApi() {
    const a = this.fkProject
    const b = this.connector;
    console.log(a, b)
  }

}

